import { createSignal, onMount } from "solid-js";
import useAPI from "./useAPI";

export default function useWrite(params: { key: string; value }) {
  const [loading, setLoading] = createSignal(true);
  const [success, setSuccess] = createSignal(false);

  const { API } = useAPI();

  onMount(async () => {
    setSuccess(await API.put(params));
    setLoading(false);
  });

  return { loading, success };
}
