import Properties from "@/components/Properties";
import { Stack } from "@mantine/core";
import { ColorSchemeToggle } from "components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "components/Welcome/Welcome";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Stack>
        <Link href="/tanstack">Tanstack</Link>
        <Link href="/swr">SWR</Link>
      </Stack>
      <ColorSchemeToggle />
    </>
  );
}
