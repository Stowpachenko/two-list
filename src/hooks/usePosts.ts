// import { useState, useMemo } from "react";
// import { ApiPostItem } from "../service/apiService";

// export function usePosts(data: ApiPostItem[] | null) {
//   const [sortBy, setSortBy] = useState<"number" | "description" | "title">(
//     "number"
//   );
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const posts = useMemo(() => {
//     return (data ?? []).map((post, i) => ({
//       ...post,
//       index: i + 1,
//       number: post.number ?? 0,
//     }));
//   }, [data]);

//   const filteredPosts = useMemo(() => {
//     return posts.filter((post) => {
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
//           false);
//       return matchesSearch;
//     });
//   }, [posts, searchQuery]);

//   const sortedPosts = useMemo(() => {
//     const key: "title" | "description" | "number" = sortBy;

//     return [...filteredPosts].sort((a, b) => {
//       if (key === "number") {
//         return a.number - b.number;
//       }
//       const aValue = a[key] ?? "";
//       const bValue = b[key] ?? "";
//       return aValue.localeCompare(bValue);
//     });
//   }, [filteredPosts, sortBy]);

//   return {
//     posts,
//     sortedPosts,
//     sortBy,
//     searchQuery,
//     setSortBy,
//     setSearchQuery,
//   };
// }

import { useState, useMemo } from "react";
import { ApiPostItem } from "../service/apiService";

export function usePosts(data: ApiPostItem[] | null) {
  const [sortBy, setSortBy] = useState<
    "number" | "description" | "title" | "category"
  >("number");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const posts = useMemo(() => {
    return (data ?? []).map((post, i) => ({
      ...post,
      index: i + 1,
      number: post.number ?? 0,
    }));
  }, [data]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false) ||
        (post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false);
      return matchesSearch;
    });
  }, [posts, searchQuery]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (sortBy === "number") {
        return a.number - b.number;
      }

      const aValue = a[sortBy] ?? "";
      const bValue = b[sortBy] ?? "";

      return aValue.localeCompare(bValue);
    });
  }, [filteredPosts, sortBy]);

  return {
    posts,
    sortedPosts,
    sortBy,
    searchQuery,
    setSortBy,
    setSearchQuery,
  };
}
