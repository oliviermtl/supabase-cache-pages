import React from "react";
import { useProperty } from "../../hooks/usePropertyTanstack";
import { useParams } from "next/navigation";

function Property() {
  const params = useParams();

  const { data: property } = useProperty(params?.slug);

  if (!property) return <div>Loading...</div>;
  return <div>{JSON.stringify(property)}</div>;
}

export default Property;
