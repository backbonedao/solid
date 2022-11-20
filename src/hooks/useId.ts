import useBackbone from "./useBackbone";
import { useInterval } from "solidjs-hooks";
import { createSignal, onMount } from "solid-js";
import useEvents from "./useEvents";

export default function useId() {
  const backbone = useBackbone();

  const [id, setId] = createSignal<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  const { listen } = useEvents();
  listen("id:authenticated", () => setIsAuthenticated(true));

  useInterval(
    async () => {
      const response = await backbone.id?.getId();
      if (response) setId(response);
    },
    isAuthenticated() && !id() ? 50 : null
  );

  return {
    authenticate: backbone.user,
    id,
    isAuthenticated,
  };
}
