"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import {
  Sparkles,
  PlusCircle,
  X,
  Loader2,
} from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };
    onChange([...entries, formattedEntry]);
    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }
    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(),
    });
  };

  return (
    <div className="space-y-6">
      {entries.map((item, index) => (
        <Card
          key={index}
          className="bg-muted/5 border border-white/10 backdrop-blur-lg shadow-sm"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-semibold text-white/90">
                  {item.title}
                  <span className="font-normal text-gray-400">
                    {" "}
                    @ {item.organization}
                  </span>
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.current
                    ? `${item.startDate} – Present`
                    : `${item.startDate} – ${item.endDate}`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4 text-gray-400 hover:text-red-500 transition" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-2 text-sm text-white/90 whitespace-pre-wrap leading-relaxed">
            {item.description}
          </CardContent>
        </Card>
      ))}

      {isAdding && (
        <Card className="bg-muted/5 border border-white/10 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-white">Add {type}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Title / Position"
                {...register("title")}
                className="bg-white/5 border-white/10 text-white"
              />
              <Input
                placeholder="Organization / Company"
                {...register("organization")}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="month"
                {...register("startDate")}
                className="bg-white/5 border-white/10 text-white"
              />
              <Input
                type="month"
                disabled={current}
                {...register("endDate")}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
              />
              <label htmlFor="current" className="text-white text-sm">
                Current {type}
              </label>
            </div>

            <Textarea
              placeholder={`Describe this ${type.toLowerCase()}...`}
              className="h-28 bg-white/5 border-white/10 text-white"
              {...register("description")}
            />

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")}
              className="text-indigo-400 hover:text-indigo-300"
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full border-white/10 text-white"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}
