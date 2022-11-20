import { createSignal, onMount } from "solid-js";
import useAPI from "./useAPI";

export default function useRead(key: string) {
  const [data, setData] = createSignal<any>();
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(false);

  const { API } = useAPI();

  onMount(async () => {
    const response = await API.get(key);

    if (response) setData(response);
    else {
      console.error(`Error: failed to read value from key: ${key}`);
      setError(true);
    }

    setLoading(false);
  });

  return { data, loading, error };
}
