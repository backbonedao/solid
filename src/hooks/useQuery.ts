import type { Query } from "@backbonedao/types";
import { createSignal, onMount } from "solid-js";
import useAPI from "./useAPI";

export default function useQuery(params: Query) {
  const [data, setData] = createSignal<any>();
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(false);

  const { API } = useAPI();

  onMount(async () => {
    const response = await API.query(params);

    if (response) setData(response);
    else {
      console.error(`Error: failed to query values`);
      setError(true);
    }

    setLoading(false);
  });

  return { loading, data, error };
}
