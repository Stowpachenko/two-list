import { useState, useEffect } from "react";

export function useFetchData<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const responseData = await fetchFunction();
        if (isMounted) {
          setData(responseData);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError((err as Error).message || "Error");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction]);

  return { data, loading, error, setData };
}
