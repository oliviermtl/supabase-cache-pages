import { createClient } from "@/lib/supabase/component";

export const supabase = createClient();

export const getCurrentUser = async () => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1);
  if (error) {
    throw error;
  }
  return data;
};

export const getRooms = async () => {
  const { data, error } = await supabase.from("rooms").select("*");
  if (error) {
    throw error;
  }
  return data;
};
