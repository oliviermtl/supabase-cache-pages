import { Title, Text, Anchor } from "@mantine/core";
import classes from "./welcome.module.css";
import { config } from "@/config";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center">
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          {config.appName}
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        {config.appDescription}
      </Text>
    </>
  );
}
