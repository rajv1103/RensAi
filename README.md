


# 🚀 Rens AI

Rens AI is an intelligent career companion that helps users grow professionally with personalized tools. It offers AI-powered interview prep, résumé and cover letter builders, industry insights, and a tailored dashboard. Built with modern tech, it’s designed to empower your journey—whether you’re job-hunting or leveling up.

## ✨ Features
 Rens AI equips you with everything you need to prep, polish, and push forward in your career:
  - 🧠 **Interview Prep** – Practice industry-specific questions with smart guidance to boost your confidence  
  - 📄 **Resume Builder** – Create standout, modern résumés effortlessly with customizable templates  
  - ✉️ **Cover Letter Generator** – Tailor persuasive cover letters in just a few clicks  
  - 🌐 **Saved Industry Insights** – Get curated content and trend updates based on your goals  
  - 🧭 **Personalized Dashboard** – Keep track of your growth and stay aligned with career milestones  
- 🔐 **Authentication & Authorization** using Clerk
- 🧠 **AI-Powered Insights** via Gemini API integration
- ⚙️ **Event-Driven Workflows** with Inngest
- 🌈 **Sleek, Responsive UI** using Tailwind CSS and animated components
- 🗃️ **Prisma ORM** for type-safe, atomic database operations
- 🔒 Secure environment handling with scoped API routes and middleware

## 🧩 Tech Stack

| Technology    | Purpose                                 |
|---------------|------------------------------------------|
| Next.js       | Full-stack React framework (App Router) |
| Clerk         | Authentication and user management       |
| Prisma        | ORM and database client                  |
| Inngest       | Event orchestration and background jobs  |
| Gemini API    | Intelligent industry insight generation  |
| Tailwind CSS  | Styling and animations                   |
| Vercel        | Deployment and hosting                   |

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rens-ai.git
   cd rens-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```env
   DATABASE_URL=...
   CLERK_SECRET_KEY=...
   CLERK_PUBLISHABLE_KEY=...
   GEMINI_API_KEY=...
   INNGEST_SIGNING_KEY=...
   ```

4. **Generate and migrate Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run your app**
   ```bash
   npm  run dev
   ```

## 📡 API Routes

- `POST /api/inngest` – Inngest serve endpoint
- `GET /api/health` – Healthcheck (optional)
- Custom routes protected via Clerk middleware

## 🌐 Deployment

Deployed via Vercel. Add all environment variables in your project settings and enable production & preview builds.

---

## 📌 Contributing

If you're making Rens AI even smarter—welcome aboard! Open a pull request or start a discussion.

## 🧠 Future Ideas

- Multi-tenant onboarding workflow
- Real-time insight streaming
- Admin dashboard with role-based access

## 📝 License

MIT © 2025 Rens AI



