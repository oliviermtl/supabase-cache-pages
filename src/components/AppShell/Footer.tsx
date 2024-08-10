import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import {
  IconBuildingStore,
  IconChartPie,
  IconClipboardList,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Footer() {
  return (
    <Group justify="space-around">
      <Element
        icon={<IconChartPie />}
        label="Categories"
      />
      <Element
        icon={<IconBuildingStore />}
        label="Shops"
      />
      <Element
        icon={<IconClipboardList />}
        label="Transactions"
      />
    </Group>
  );
}

const Element = ({ icon, label }: { icon: React.ReactNode; label: string }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${label.toLowerCase()}`);
  };
  return (
    <Stack
      align="center"
      gap={3}
    >
      <ActionIcon
        onClick={handleClick}
        variant="subtle"
      >
        {icon}
      </ActionIcon>
      <Text style={{ fontSize: "0.6rem" }}> {label}</Text>
    </Stack>
  );
};
