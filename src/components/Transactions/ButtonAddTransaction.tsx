import { ActionIcon } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

export default function ButtonAddTransaction() {
  const colorScheme = useColorScheme();
  const shadowColor =
    colorScheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
  return (
    <ActionIcon
      radius={"md"}
      size={"lg"}
      style={{
        position: "fixed",
        right: 30,
        bottom: 100,
        boxShadow: `0 1px 2px ${shadowColor}`,
      }}
    >
      <IconPlus />
    </ActionIcon>
  );
}
