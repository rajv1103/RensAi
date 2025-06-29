import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "rensai",
  name: "RensAi",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
