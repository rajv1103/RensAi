import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="max-w-6xl py-2 mx-auto space-y-8">
      {/* Header + Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
          My Cover Letters
        </h1>

        <Link href="/ai-cover-letter/new">
          <Button className="text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 shadow-md">
            <Plus className="h-6 w-6 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      {/* Cover Letter List */}
      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
