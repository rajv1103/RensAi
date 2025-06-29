import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  LogIn,
  Rocket,
  Sparkles,
  Briefcase,
  Target,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="flex items-center mx-auto px-auto  fixed top-0 w-full h-20 border-b bg-background/80 backdrop-blur-md z-50 shadow-sm supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <nav className="container mx-auto  h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo1.png"
            alt="Sensai Logo"
            width={200}
            height={150}
            className="h-12 py-1 object-contain transition-transform duration-200 hover:scale-105"
          />
        </Link>

        {/* Center Floating Icons */}
        <div className="hidden md:flex items-center space-x-5 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Rocket className="w-4 h-4 text-purple-400 animate-float" />
            <span className="font-serif text-lg ml-3">Gear Up</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-float" />
            <span className="font-serif text-lg  ml-3">Shine</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4 text-blue-400 animate-float" />
            <span className="font-serif text-lg  ml-3">Hire</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-pink-400 animate-float" />
            <span className="font-serif text-lg ml-3 ">Conquer</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 text-purple-400 border-purple-400 hover:bg-purple-100 hover:scale-105 transition-all"
              >
                <LayoutDashboard className="h-4 w-4 text-lg text-purple-400" />
                Industry Insights
              </Button>

              <Button
                variant="ghost"
                className="md:hidden w-10 h-10 p-0 text-purple-600 hover:bg-purple-100 transition-all"
              >
                <LayoutDashboard className="h-4 w-4 text-purple-500" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 text-purple-400 border border-purple-400/100 hover:bg-purple-50 hover:ring-1 hover:ring-purple-400 hover:scale-105 transition-all">
                  <StarsIcon className="h-4 w-4 text-purple-500" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4 text-purple-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 py-1 shadow-lg">
                <DropdownMenuItem asChild className="hover:bg-muted/20">
                  <Link
                    href="/resume"
                    className="flex items-center gap-2 px-3 py-2"
                  >
                    <FileText className="h-4 w-4" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-muted/20">
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2 px-3 py-2"
                  >
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-muted/20">
                  <Link
                    href="/interview"
                    className="flex items-center gap-2 px-3 py-2"
                  >
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-14 h-14", // Changed from w-10 h-10
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
