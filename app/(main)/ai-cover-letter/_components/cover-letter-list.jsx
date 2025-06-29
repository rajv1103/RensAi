"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card className="bg-muted/5 border border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">
            No Cover Letters Yet
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {coverLetters.map((letter) => (
        <Card
          key={letter.id}
          className="bg-muted/5 border border-white/10 shadow-sm hover:shadow-md transition"
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent font-bold">
                  {letter.jobTitle} at {letter.companyName}
                </CardTitle>
                <CardDescription className="text-sm text-gray-400">
                  Created {format(new Date(letter.createdAt), "PPP")}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                  className="hover:text-indigo-400"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background border border-white/10 shadow-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Delete Cover Letter?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-sm text-muted-foreground">
                        This action cannot be undone. This will permanently delete your cover
                        letter for <strong>{letter.jobTitle}</strong> at{" "}
                        <strong>{letter.companyName}</strong>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {letter.jobDescription}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
