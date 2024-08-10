/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title,
  useMatches,
} from "@mantine/core";
import { useSession } from "@supabase/auth-helpers-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconUser, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import Login from "../Auth/Login";
import Signout from "../Auth/Signout";
import Footer from "./Footer";
import { IconColorSchemeToggle } from "../ColorSchemeToggle/IconColorSchemeToggle";

export function Layout({ children }: any) {
  const session = useSession();
  const [opened, { toggle, close, open }] = useDisclosure();
  const [openedSide, { toggle: toggleSide, open: openSide, close: closeSide }] =
    useDisclosure();
  const [
    visible,
    { toggle: toggleOverlay, open: openOverlay, close: closeOverlay },
  ] = useDisclosure(false);

  const matches = useMediaQuery("(min-width:47em)");
  useEffect(() => {
    if (matches) {
      close();
      closeSide();
      closeOverlay();
    }
  }, [matches]);

  useEffect(() => {
    if (!opened && !openSide) closeOverlay();
  }, [opened, openedSide]);

  const toggleSidePanel = () => {
    toggleSide();
    openedSide ? closeOverlay() : openOverlay();
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: !opened, mobile: !opened },
      }}
      aside={{
        width: 360,
        breakpoint: "md",
        collapsed: { desktop: !openedSide, mobile: !openedSide },
      }}
      padding="xs"
    >
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
          justify="space-between"
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: "pink", to: "yellow" }}
          >
            $69Money{" "}
          </Text>

          <Group>
            <IconColorSchemeToggle />
            <ActionIcon
              onClick={toggleSidePanel}
              variant="subtle"
            >
              <IconUser />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        p="md"
        hiddenFrom="sm"
      >
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              h={28}
              mt="sm"
              animate={false}
            />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Box
          pos="relative"
          style={{ height: "calc(100vh - 86px)" }}
        >
          <LoadingOverlay
            visible={visible}
            loaderProps={{ children: " " }}
          />

          {children}
        </Box>
      </AppShell.Main>
      <AppShell.Aside
        p="md"
        style={{ maxWidth: "360px", zIndex: 1000 }}
      >
        <Stack>
          <Group justify="space-between">
            <Flex
              flex={1}
              justify={"center"}
            >
              <Text
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
              >
                $69Money
              </Text>
            </Flex>
            <ActionIcon
              variant="subtle"
              onClick={toggleSidePanel}
            >
              <IconX />
            </ActionIcon>
          </Group>
          <Divider />
          {!session ? <Login /> : <Signout />}
        </Stack>
      </AppShell.Aside>
      <AppShell.Footer p="md">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
