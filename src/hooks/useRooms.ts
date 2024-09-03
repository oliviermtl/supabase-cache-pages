// This hook return the rooms from the database.

import { getRooms } from "@/lib/supabase/fetch";
import { useQuery } from "@tanstack/react-query";

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
  });
};
