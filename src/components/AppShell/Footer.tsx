import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Footer() {
  return (
    <Group justify="space-around">
      <Element icon={<IconHome />} label="Home" page="/" />
    </Group>
  );
}

const Element = ({
  icon,
  label,
  page,
}: {
  icon: React.ReactNode;
  label: string;
  page: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${page.toLowerCase()}`);
  };
  return (
    <Stack align="center" gap={3}>
      <ActionIcon onClick={handleClick} variant="subtle">
        {icon}
      </ActionIcon>
      <Text style={{ fontSize: "0.6rem" }}> {label}</Text>
    </Stack>
  );
};
