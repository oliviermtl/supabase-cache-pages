import Properties from "@/components/Properties";
import PropertiesTanstack from "@/components/PropertiesTanstack";
import { ColorSchemeToggle } from "components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "components/Welcome/Welcome";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <PropertiesTanstack />
      <ColorSchemeToggle />
    </>
  );
}
