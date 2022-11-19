import useBackbone from "./useBackbone";
import { useInterval } from "solidjs-hooks";
import { createSignal, onMount } from "solid-js";

export default function useId() {
  const backbone = useBackbone();

  const [id, setId] = createSignal<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);

  let authenticateManual = backbone.id?.authenticate;
  let authenticate = backbone.user;
  let signObject = backbone.id?.signObject;
  let registerApp = backbone.id?.registerApp;

  onMount(() => {
    backbone.events.on("id:authenticated", () => {
      setIsAuthenticated(true);
    });
  });

  useInterval(
    async () => {
      //@ts-ignore
      const response = await backbone.id.getId();
      if (response) setId(response);
    },
    isAuthenticated() && !id() ? 50 : null
  );

  return {
    authenticateManual,
    authenticate,
    id,
    isAuthenticated,
    signObject,
    registerApp,
  };
}
