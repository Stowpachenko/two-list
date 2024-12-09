import React, { useRef, useState } from "react";
import MyInput from "../ui/MyInput/MyInput";
import MyButton from "../ui/MyButton/MyButton";
import { AddPostFormProps } from "./AddPostForm.props";
import styles from "./AddPostForm.module.css";

const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const postNumber = parseInt(formState.number, 10);

    if (onAddPost) {
      onAddPost({
        title: formState.title,
        description: formState.description,
        number: !isNaN(postNumber) ? postNumber : undefined,
      });
    }

    setFormState({ title: "", description: "", number: "" });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <MyInput
        name="title"
        ref={titleRef}
        type="text"
        placeholder="Название поста"
        value={formState.title}
        onChange={handleChange}
      />
      <MyInput
        name="description"
        ref={descriptionRef}
        type="text"
        placeholder="Описание поста"
        value={formState.description}
        onChange={handleChange}
      />
      <MyInput
        name="number"
        ref={numberRef}
        type="number"
        placeholder="Номер поста"
        value={formState.number}
        onChange={handleChange}
      />
      <MyButton type="submit">Создать пост</MyButton>
    </form>
  );
};

export default AddPostForm;
