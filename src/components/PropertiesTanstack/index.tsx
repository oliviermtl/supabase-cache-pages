import { useProperties } from "@/hooks/usePropertiesTanstack";
import { Button, Card, Select, Stack, Text, Tooltip } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocalStorage } from "@mantine/hooks";

function PropertiesTanstack() {
  const [type, setType] = useLocalStorage({
    key: "type",
    defaultValue: "Land",
  });

  const toggleType = (e: string | null) => {
    if (e !== null) {
      setType(() => e);
    }
  };

  const { data, isLoading, fetchNextPage: loadMore } = useProperties(type);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  useEffect(() => {
    if (inView) {
      loadMore && loadMore();
    }
  }, [inView]);

  if (!data || data.pages.length === 0) {
    return <p>no data yet.</p>;
  }

  const pages = data.pages.flat();

  return (
    <Stack gap={10}>
      Properties
      <Select
        data={["Land", "Villa Rental", "Villa / House / Apartment"]}
        value={type}
        onChange={toggleType}
      />
      {pages?.map((p: any, i: any) => {
        return (
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
              {p.type}
            </Card>
          </Link>
        );
      })}
      <Stack
        ref={ref}
        style={{ minHeight: "80px" }}
        py="32px"
        mb="32px"
        gap="18px"
      >
        <Button
          onClick={() => loadMore && loadMore()}
          disabled={!loadMore || isLoading}
          variant="default"
        >
          {isLoading ? "Loading" : "Load More"}
        </Button>
      </Stack>
    </Stack>
  );
}

export default PropertiesTanstack;
