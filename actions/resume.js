"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  const resume = await db.resume.upsert({
    where: { userId: user.id },
    update: { content },
    create: { userId: user.id, content },
  });

  revalidatePath("/resume");
  return resume;
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  return db.resume.findUnique({ where: { userId: user.id } });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { industryInsight: true },
  });
  if (!user) throw new Error("User not found");

  // 1️⃣ Generate from scratch if blank
  if (type === "summary" && (!current || !current.trim())) {
    const prompt = `
As an expert resume writer for a ${user.industry} professional, write a concise, one‑paragraph professional summary that:
1. Uses strong action verbs  
2. Highlights top achievements or strengths  
3. Aligns with industry‑specific keywords  
Return only the paragraph.
    `;
    const res = await model.generateContent(prompt);
    return res.response.text().trim();
  }

  if (type === "skills" && (!current || !current.trim())) {
    const prompt = `
As an expert resume writer for a ${user.industry} professional, generate a comma‑separated list of key skills and technical competencies most relevant to this industry.
Return only the list.
    `;
    const res = await model.generateContent(prompt);
    return res.response.text().trim();
  }

  // 2️⃣ Existing logic for education, project, experience & improvement
  let prompt;
  if (type === "education") {
    prompt = `As an expert educational consultant, improve this Education entry.
Make it concise and achievement‑focused:
"${current}"
Format as a single paragraph without extra explanations.
    `;
  } else if (type === "project") {
    prompt = `
You are a technical project showcase writer. Improve this Project description:
"${current}"
Highlight key technologies, deliverables, and outcomes in one paragraph.
    `;
  } else {
    prompt = `
As an expert resume writer for a ${user.industry} professional, improve this ${type} section:
"${current}"

Requirements:
1. Use action verbs
2. Include metrics and results where possible
3. Highlight relevant technical skills
4. Keep it concise but detailed
5. Focus on achievements over responsibilities
6. Use industry-specific keywords

Format the response as a single paragraph without any additional text or explanations.
    `;
  }

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
