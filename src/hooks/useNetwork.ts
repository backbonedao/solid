import { createSignal } from "solid-js";
import { useInterval } from "solidjs-hooks";
import useBackbone from "./useBackbone";

export default function useNetwork() {
  const backbone = useBackbone();

  const getConnectionId = backbone.app.network.getConnectionId;
  const getNetwork = backbone.app.network.getNetwork;

  const [connectionId, setConnectionId] = createSignal(getConnectionId());
  const [network, setNetwork] = createSignal(getNetwork());

  useInterval(
    () => {
      if (!connectionId()) setConnectionId(getConnectionId());
      if (!network()) setNetwork(getNetwork());
    },
    !connectionId() || !network() ? 50 : null
  );

  return {
    connect: backbone.app.network.connect,
    disconnect: backbone.app.network.disconnect,
    connectionId,
    network,
  };
}
