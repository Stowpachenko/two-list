export interface ApiPostItem {
  id: number;
  title: string;
  description?: string;
  number?: number;
  category?: string;
}

export const fetchPosts = async (): Promise<ApiPostItem[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
