"use client";
import { Button } from "@/components/ui/button";
import Fileupload from "@/components/ui/general/Fileupload";
import { UserButton, useUser } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute  top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-col text-center items-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-bold">Chat with PDF</h1>
            <UserButton afterSwitchSessionUrl="/" />
          </div>

          {isSignedIn && isLoaded && user && (
            <div className="flex mt-2">
              <Button>Go to Chats</Button>
            </div>
          )}

          <p className="max-w-xl mt-2 text-lg  text-slate-600">
            Create your account and join with students,researchers and educators
            to chat with PDFs.
          </p>
          <div className="w-full mt-4">
            {isSignedIn && isLoaded && user ? (
              <Fileupload />
            ) : (
              <Link href={"/sign-in"}>
                <Button>
                  Sign Up <LogInIcon />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
