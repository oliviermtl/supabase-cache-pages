// This hook return the properties from the database.

import { getProperties } from "@/lib/supabase/fetch";
import { useQuery } from "@tanstack/react-query";

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: () => getProperties(),
  });
};
