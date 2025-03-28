"use client";
import { SignIn } from "../actions";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await SignIn("google");
        setLoading(false);
      }}
    >
      <Button
        variant="default"
        type="submit"
        className="flex items-center"
        disabled={loading}
      >
        {loading ? (
          <>
            Signing In. <ClipLoader />
          </>
        ) : (
          "Sign in with Google"
        )}
      </Button>
    </form>
  );
}
