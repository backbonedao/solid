import { createSignal, onMount } from "solid-js";
import useBackbone from "./useBackbone";
import { Manifest } from "@backbonedao/types";

export default function useMeta() {
  const backbone = useBackbone();

  const [meta, setMeta] = createSignal<Manifest | undefined>();

  async function fetch() {
    setMeta(await backbone.app.meta._getMeta("manifest"));
  }

  onMount(fetch);

  return {
    meta,
    refetch: fetch,
  };
}
