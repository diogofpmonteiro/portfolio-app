"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const useAnonymousLogin = () => {
  const [isAnonymousLoginPending, startAnonymousTransition] = useTransition();

  const router = useRouter();

  const signInAnonymously = async () => {
    startAnonymousTransition(async () => {
      await authClient.signIn.anonymous({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in anonymously, you will be redirected..");
            router.push("/");
          },
          onError: () => {
            toast.error("Failed to sign in anonymously");
          },
        },
      });
    });
  };

  return {
    signInAnonymously,
    isAnonymousLoginPending,
  };
};
