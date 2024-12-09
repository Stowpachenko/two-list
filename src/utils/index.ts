import { ApiPostItem } from "../service/apiService";

// update index
export const updateIndexes = (posts: ApiPostItem[]): ApiPostItem[] => {
  return posts.map((post, index) => ({ ...post, index: index + 1 }));
};

// 2 list
export const splitPosts = (
  posts: ApiPostItem[]
): [ApiPostItem[], ApiPostItem[]] => {
  const half = Math.floor(posts.length / 2);
  return [posts.slice(0, half), posts.slice(half)];
};
