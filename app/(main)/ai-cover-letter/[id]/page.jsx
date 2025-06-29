import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview.jsx";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex flex-col space-y-4">
        <Link href="/ai-cover-letter">
          <Button
            variant="ghost"
            className="gap-2 text-indigo-400 hover:text-indigo-300 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>

      <div className="rounded-xl border border-white/10 bg-muted/5 backdrop-blur shadow-md p-6">
        <CoverLetterPreview content={coverLetter?.content} />
      </div>
    </div>
  );
}
