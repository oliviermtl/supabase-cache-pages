import { SupabaseSignOut } from "@/lib/supabase/auth";
import { Button } from "@mantine/core";
import React from "react";

export default function Signout() {
  const handleSignout = async () => {
    await SupabaseSignOut();
  };

  return <Button onClick={handleSignout}>Sign Out</Button>;
}
