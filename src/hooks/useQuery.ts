import { createSignal } from "solid-js";
import useBackbone from "./useBackbone";

export default function useQuery() {
  const backbone = useBackbone();

  const [data, setData] = createSignal<any>();
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(false);

  const query = async ({
    gt,
    gte,
    lt,
    lte,
    limit,
    stream,
    reverse,
    include_meta,
  }) => {
    if (backbone.app?.backboneReactQuery) {
      const response = await backbone.app.backboneReactQuery({
        gt,
        gte,
        lt,
        lte,
        limit,
        stream,
        reverse,
        include_meta,
      });

      if (response) setData(response);
      else {
        console.error(`Error: failed to query values`);
        setError(true);
      }
      setLoading(false);
    } else {
      console.error(
        "backbone-react is missing dependencies in src/app/api.js, learn more at https://github.com/backbonedao/backbone-react/blob/main/README.md#useapi"
      );
      setError(true);
      setLoading(false);
    }
  };

  return { query, loading, data, error };
}
