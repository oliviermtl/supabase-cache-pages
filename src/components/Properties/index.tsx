import { useProperties } from "@/hooks/useProperties";
import { Button, Card, Stack, Text, Tooltip } from "@mantine/core";
import Link from "next/link";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
function Properties() {
  const { data, isValidating, isLoading, loadMore } = useProperties();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  useEffect(() => {
    if (inView) {
      console.log("inView");
      loadMore && loadMore();
    }
  }, [inView]);

  return (
    <Stack gap={10}>
      Properties
      {data &&
        data.map((p: any, i: any) => (
          <Link
            key={`${p.id}`}
            href={`/${p.slug}`}
          >
            <Card
              key={i}
              shadow="md"
              padding="xl"
              style={{ minHeight: "300px" }}
            >
              {p.id}
            </Card>
          </Link>
        ))}
      <Stack
        ref={ref}
        style={{ minHeight: "80px" }}
        py="32px"
        mb="32px"
        gap="18px"
      >
        <Button
          onClick={() => loadMore && loadMore()}
          disabled={!loadMore || isValidating}
          variant="default"
        >
          {isLoading ? "Loading" : isValidating ? "Validating" : "Load More"}
        </Button>
      </Stack>
    </Stack>
  );
}

export default Properties;
