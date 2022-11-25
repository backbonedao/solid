import { createEffect, createSignal, onMount } from "solid-js";
import useAPI from "./useAPI";
import useStream from "./useStream";

export default function useRead(
  key: string,
  options: { reactive: boolean } = { reactive: false }
) {
  const [data, setData] = createSignal<any>();
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(false);

  const { API } = useAPI();
  const { change } = useStream();

  onMount(async () => {
    const response = await API.get(key);

    if (response) setData(response);
    else {
      console.error(`Error: failed to read value from key: ${key}`);
      setError(true);
    }

    setLoading(false);
  });

  if (options.reactive) {
    createEffect(() => {
      const { key: changedKey, value } = change();

      if (changedKey === key) setData(value);
    });
  }

  return { data, loading, error };
}
