import { useFetchData } from "./hooks/useFetchData";
import { usePosts } from "./hooks/usePosts";
import { updateIndexes, splitPosts } from "./utils";
import PostList from "./components/PostList/PostList";
import AddPostForm from "./components/AddPostForm/AddPostForm";
import { fetchPosts, ApiPostItem } from "./service/apiService";
import { useMemo } from "react";

function App(): JSX.Element {
  const { data, loading, error, setData } =
    useFetchData<ApiPostItem[]>(fetchPosts);
  const { sortedPosts, setSearchQuery, searchQuery, sortBy, setSortBy } =
    usePosts(data);

  const [posts1, posts2] = useMemo(
    () => splitPosts(sortedPosts),
    [sortedPosts]
  );

  const addPost = (post: ApiPostItem, listKey: "posts1" | "posts2") => {
    setData((prev) => {
      const updatedPosts =
        listKey === "posts1" ? [...posts1, post] : [...posts2, post];
      const combinedPosts =
        listKey === "posts1"
          ? [...updatedPosts, ...posts2]
          : [...posts1, ...updatedPosts];

      return updateIndexes(combinedPosts);
    });
  };

  const removePost = (id: number, listKey: "posts1" | "posts2") => {
    setData((prev) => {
      const updatedPosts =
        listKey === "posts1"
          ? posts1.filter((post) => post.id !== id)
          : posts2.filter((post) => post.id !== id);
      const combinedPosts =
        listKey === "posts1"
          ? [...updatedPosts, ...posts2]
          : [...posts1, ...updatedPosts];

      return updateIndexes(combinedPosts);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <AddPostForm
        onAddPost={(post) =>
          addPost(
            {
              id: Date.now(),
              title: post.title,
              description: post.description,
              number: post.number ?? 0,
            },
            "posts1"
          )
        }
      />

      <div className="filters">
        <label>
          Поиск:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Искать по"
          />
        </label>

        <label>
          Сортировать по:
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "title" | "description" | "number")
            }
          >
            <option value="number">Номер поста</option>
            <option value="title">Заголовок</option>
            <option value="description">Описание</option>
          </select>
        </label>
      </div>

      <h1>Список постов 1</h1>
      <PostList posts={posts1} onDelete={(id) => removePost(id, "posts1")} />

      <h1>Список постов 2</h1>
      <PostList posts={posts2} onDelete={(id) => removePost(id, "posts2")} />
    </div>
  );
}

export default App;
