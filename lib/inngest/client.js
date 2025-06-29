import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "rensai",
  name: "RensAi",
  signingKey: process.env.INNGEST_SIGNING_KEY,
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
