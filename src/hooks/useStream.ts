import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import useAPI from "./useAPI";

export default function useStream() {
  const [stream, setStream] = createStore([] as any[]);
  const change = createMemo(() => stream[stream.length - 1]);

  const { API } = useAPI();

  API.onAdd(async () => {
    setStream(await API.getAll());
  });

  return { stream, change };
}
