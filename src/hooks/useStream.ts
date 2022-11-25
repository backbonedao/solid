import type { API } from "@backbonedao/types";
import { createMemo, createSignal } from "solid-js";
import useAPI from "./useAPI";

export default function useStream() {
  const [stream, setStream] = createSignal(
    [] as Awaited<ReturnType<API["getAll"]>>
  );
  const change = createMemo(() => stream()[stream().length - 1]);

  const { API } = useAPI();

  API.onAdd(async () => setStream(await API.getAll()));

  return { stream, change };
}
