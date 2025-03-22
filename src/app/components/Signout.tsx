"use client";
import { Button } from "@/components/ui/button";
import { SignOut } from "../actions";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function SignInButton() {
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await SignOut();
        setLoading(false);
      }}
    >
      <Button
        type="submit"
        variant="default"
        className="flex items-center"
        disabled={loading}
      >
        {loading ? (
          <>
            Logging out. <ClipLoader />
          </>
        ) : (
          "Sign Out"
        )}
      </Button>
    </form>
  );
}
