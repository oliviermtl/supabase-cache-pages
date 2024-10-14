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
  const { data, error } = await supabase.from("properties").select(
    `
    id,
    slug,
    sku,
    type,
    ownership,
    price,
    currency,
    area_1,
    area_2,
    created_at,
    images: properties_images (
      file: media (
        filename
      )
    ),
    properties_locales (
      title
    ),
    properties_spaces (
      properties_spaces_locales (
        title,
        value
      )
    ),
    properties_plans (
      properties_plans_locales (
        title,
        value
      )
    )
    `
  );
  if (error) {
    throw error;
  }
  return data;
};
