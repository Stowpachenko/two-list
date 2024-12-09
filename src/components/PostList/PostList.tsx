import React from "react";
import styles from "./PostList.module.css";
import MyButton from "../ui/MyButton/MyButton";

interface PostList {
  id: number;
  title: string | undefined;
  description?: string;
}

interface PostsItem {
  posts: PostList[];
  onDelete: (id: number) => void;
}

const PostList: React.FC<PostsItem> = ({ posts, onDelete }) => {
  return (
    <div className={styles.container}>
      {posts.map((post, index) => (
        <div className={styles.postItem} key={post.id}>
          <div className={styles.postContent}>
            <div className={styles.postTitle}>
              {/* {index + 1}. {post.title} */}
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
