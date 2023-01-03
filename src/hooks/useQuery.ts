import type { Query } from "@backbonedao/types";
import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import useAPI from "./useAPI";
import useStream from "./useStream";

export default function useQuery(
  params: Query,
  options: { reactive: boolean } = { reactive: false }
) {
  const [data, setData] = createSignal<any>();
  const [loading, setLoading] = createSignal(true);

  const { API } = useAPI();
  const { change } = useStream();

  onMount(async () => {
    setData(await API.query(params));
    setLoading(false);
  });

  if (options.reactive) {
    createEffect(async () => {
      const changed = change();

      if (changed) {
        API.query(params).then((result) => {
          if (JSON.stringify(result) !== JSON.stringify(data())) {
            setData(result);
          }
        });
      }
    });
  }

  return {
    loading,
    data,
  };
}
