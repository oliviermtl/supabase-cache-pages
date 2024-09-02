import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { MantineProvider } from "@mantine/core";
import { theme } from "theme";
import { Layout } from "@/components/AppShell/Layout";
import { createClient } from "@/lib/supabase/component";
import { config } from "@/config";

export default function App({ Component, pageProps }: AppProps) {
  const supabase = createClient();
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>{config.appName}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <SessionContextProvider
        initialSession={pageProps.initialSession}
        supabaseClient={supabase}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
    </MantineProvider>
  );
}
