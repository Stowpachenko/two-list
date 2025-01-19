import { useState, useEffect } from "react";

export function useFetchCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products: { category: string }[] = await response.json();
        if (isMounted) {
          const uniqueCategories = Array.from(
            new Set(products.map((product) => product.category))
          );
          setCategories(uniqueCategories);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            (err as Error).message || "Error occurred while fetching categories"
          );
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
}
