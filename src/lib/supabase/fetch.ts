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

export const getProperties = async () => {
  const { data, error } = await supabase
    .from("properties_view_materialized")
    .select("*");
  if (error) {
    throw error;
  }
  return data;
};
