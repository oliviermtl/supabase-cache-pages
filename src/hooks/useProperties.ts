// This hook return the properties from the database.

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useOffsetInfiniteScrollQuery } from "@supabase-cache-helpers/postgrest-swr";

export const useProperties = () => {
  const supabase = useSupabaseClient();
  const { data, loadMore, isValidating, isLoading } =
    useOffsetInfiniteScrollQuery(
      supabase.from("properties").select(
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
      ),
      { revalidateOnFocus: false, pageSize: 10 }
    );

  return {
    data,
    isValidating,
    isLoading,
    loadMore,
  };
};
