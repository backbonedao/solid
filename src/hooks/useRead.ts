import { createEffect, createSignal, onMount } from "solid-js";
import useAPI from "./useAPI";
import useStream from "./useStream";

export default function useRead(
  key: string,
  options: { reactive: boolean } = { reactive: false }
) {
  const [data, setData] = createSignal<any>();
  const [loading, setLoading] = createSignal(true);

  const { API } = useAPI();
  const { change } = useStream();

  onMount(async () => {
    setData(await API.get(key));
    setLoading(false);
  });

  if (options.reactive) {
    createEffect(() => {
      const changed = change();

      if (changed && changed.key === key) setData(changed.value);
    });
  }

  return { data, loading };
}
