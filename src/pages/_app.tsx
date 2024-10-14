import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { MantineProvider } from "@mantine/core";
import { theme } from "theme";
import { Layout } from "@/components/AppShell/Layout";
import { createClient } from "@/lib/supabase/component";
import { config } from "@/config";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { Notifications } from "@mantine/notifications";

export default function App({ Component, pageProps }: AppProps) {
  const supabase = createClient();
  const [queryClient] = useState(() => new QueryClient());
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Head>
        <title>{config.appName}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link
          rel="shortcut icon"
          href="/favicon.svg"
        />
      </Head>
      <SessionContextProvider
        initialSession={pageProps.initialSession}
        supabaseClient={supabase}
      >
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </HydrationBoundary>
        </QueryClientProvider>
      </SessionContextProvider>
    </MantineProvider>
  );
}
