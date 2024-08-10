import {
  ActionIcon,
  Button,
  Group,
  useMantineColorScheme,
} from "@mantine/core";

import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function IconColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const Icon = colorScheme === "dark" ? IconSun : IconMoonStars;
  return (
    <ActionIcon
      radius={"md"}
      variant="subtle"
      onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
    >
      <Icon />
    </ActionIcon>
  );
}
