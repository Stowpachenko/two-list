import React from "react";
import styles from "./PostList.module.css";
import MyButton from "../ui/MyButton/MyButton";

interface ApiPostItem {
  id: number;
  category?: string;
  title: string;
  description?: string;
}

interface PostListProps {
  posts: ApiPostItem[];
  onDelete: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.postItem} key={post.id}>
          <div className={styles.postContent}>
            {post.category && (
              <div className={styles.postCategory}>{post.category}</div>
            )}
            <div className={styles.postTitle}>
              {post.id}. {post.title}
            </div>
            <div className={styles.postDescription}>{post.description}</div>
          </div>
          <MyButton
            onClick={() => onDelete(post.id)}
            className={styles.deleteButton}
          >
            Удалить
          </MyButton>
        </div>
      ))}
    </div>
  );
};

export default PostList;
