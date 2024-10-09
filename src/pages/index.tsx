import Properties from "@/components/Properties";
import { ColorSchemeToggle } from "components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "components/Welcome/Welcome";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Properties />
      <ColorSchemeToggle />
    </>
  );
}
