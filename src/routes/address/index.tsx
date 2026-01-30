import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";

export const Route = createFileRoute("/address/")({
  component: AddressScreen,
});

type AddressResult = {
  label: string;
  lat: number;
  long: number;
};

function AddressScreen() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AddressResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return <div>Hello "/address/"!</div>;
}
