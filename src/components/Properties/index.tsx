import { useProperties } from "@/hooks/useProperties";
import { Stack, Text, Tooltip } from "@mantine/core";
import React from "react";

function Properties() {
  const { data, error } = useProperties();

  console.log(data);
  return (
    <Stack gap={0}>
      Properties
      {data &&
        data.map((p: any, i: any) => (
          <Tooltip
            label={JSON.stringify(p)}
            position="top"
            key={`${p.property_id}`}
          >
            <Text>
              <h1>{p.property_id}</h1>
            </Text>
          </Tooltip>
        ))}
    </Stack>
  );
}

export default Properties;
