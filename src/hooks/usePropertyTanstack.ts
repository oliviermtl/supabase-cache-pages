import { supabase } from "@/lib/supabase/fetch";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

export const useProperty = (slug: any) => {
  return useQuery(getPropertyBySlug(slug));
};

function getPropertyBySlug(slug: any) {
  const properties = supabase
    .from("properties")
    .select(
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
    )
    .eq("slug", `properties/${slug}`)
    .throwOnError()
    .single();

  return properties;
}
