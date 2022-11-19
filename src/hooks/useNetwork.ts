import { createSignal } from "solid-js";
import { useInterval } from "solidjs-hooks";
import useBackbone from "./useBackbone";

export default function useNetwork() {
  const backbone = useBackbone();

  const connect = backbone.app.network.connect;
  const disconnect = backbone.app.network.disconnect;

  const [connectionId, setConnectionId] = createSignal(
    backbone.app.network.getConnectionId()
  );
  const [network, setNetwork] = createSignal(backbone.app.network.getNetwork());

  useInterval(
    () => {
      if (!connectionId())
        setConnectionId(backbone.app.network.getConnectionId());
      if (!network()) setNetwork(backbone.app.network.getNetwork());
    },
    !connectionId() || !network() ? 50 : null
  );

  return { connect, disconnect, connectionId, network };
}
