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
