import { Title, Text, Anchor } from "@mantine/core";
import classes from "./Welcome.module.css";

export function Welcome() {
  return (
    <>
      <Title
        className={classes.title}
        ta="center"
      >
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          $69Money
        </Text>
      </Title>
      <Text
        c="dimmed"
        ta="center"
        size="lg"
        maw={580}
        mx="auto"
        mt="xl"
      >
        Try not to get broke, and don&apos;t forget to save!
      </Text>
    </>
  );
}
