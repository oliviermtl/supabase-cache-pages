import { supabase } from "@/lib/supabase/fetch";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProperties = (type: string | null) => {
  return useInfiniteQuery({
    queryKey: ["properties", type],
    queryFn: ({ pageParam }) => getProperties(pageParam, type),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number | undefined = lastPage?.length
        ? allPages?.length
        : undefined;

      return nextPage;
    },
  });
};

const getProperties = async (page: any, type: string | null) => {
  try {
    const range = getRange(page, 5);
    let propertiesQuery = supabase
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

      .range(range[0], range[1]);

    if (type) {
      let { data: properties, error: _error } = await propertiesQuery.eq(
        "type",
        type
      );
      if (_error) {
        throw _error;
      }
      return properties;
    }
    let { data: properties, error: _error } = await propertiesQuery;
    if (_error) {
      throw _error;
    }
    return properties;
  } catch (error) {
    throw error;
  }
};

function getRange(page: number, limit: number) {
  const from = page * limit;
  const to = from + limit - 1;

  return [from, to];
}
