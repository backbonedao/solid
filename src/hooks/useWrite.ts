import { createSignal } from "solid-js";
import useBackbone from "./useBackbone";

export default function useWrite() {
  const backbone = useBackbone();

  const [loading, setLoading] = createSignal(true);
  const [success, setSuccess] = createSignal(false);

  const write = async ({ key, value }: { key: string; value: any }) => {
    if (backbone.app?.backboneReactPut) {
      await backbone.app.backboneReactPut({ key, value }).then(() => {
        setSuccess(true);
        setLoading(false);
        return true;
      });
    } else {
      console.error(
        "backbone-react is missing dependencies in src/app/api.js, learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi"
      );
      setSuccess(false);
      setLoading(false);
      return false;
    }
  };

  return { write, loading, success };
}
