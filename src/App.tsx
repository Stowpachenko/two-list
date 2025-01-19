import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import AddPostForm from "./components/AddPostForm/AddPostForm";
import PostList from "./components/PostList/PostList";
import { postReducer } from "./reducers/postReducer";
import { ApiPostItem } from "./service/apiService";
import { useFetchData } from "./hooks/useFetchData";

const initialPosts: ApiPostItem[] = JSON.parse(
  localStorage.getItem("posts") || "[]"
);

function App(): JSX.Element {
  const [posts, dispatch] = useReducer(postReducer, initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchPosts = async (): Promise<ApiPostItem[]> => {
    try {
      const response = await axios.get<ApiPostItem[]>(
        "https://fakestoreapi.com/products"
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка загрузки постов:", error);
      return [];
    }
  };

  const { data, loading, error } = useFetchData(fetchPosts);

  useEffect(() => {
    if (data && posts.length === 0) {
      dispatch({ type: "SET_POSTS", payload: data });
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: {
    title: string;
    description?: string;
    category?: string;
  }) => {
    const newPost: ApiPostItem = {
      id: Date.now(),
      ...post,
    };
    dispatch({ type: "ADD_POST", payload: newPost });
  };

  const removePost = (id: number) => {
    dispatch({ type: "REMOVE_POST", payload: id });
  };

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="App">
      <AddPostForm onAddPost={addPost} />

      <h1>Список постов</h1>

      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}

      <div>
        <button onClick={() => setSelectedCategory(null)}>Все категории</button>
        {[...new Set(posts.map((post) => post.category))]
          .filter(Boolean)
          .map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category!)}
            >
              {category}
            </button>
          ))}
      </div>

      <PostList posts={filteredPosts} onDelete={removePost} />
    </div>
  );
}

export default App;
