// import React, { useRef, useState } from "react";
// import MyInput from "../ui/MyInput/MyInput";
// import MyButton from "../ui/MyButton/MyButton";
// import { AddPostFormProps } from "./AddPostForm.props";
// import styles from "./AddPostForm.module.css";

import { useState } from "react";

// const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost }) => {
//   const titleRef = useRef<HTMLInputElement>(null);
//   const descriptionRef = useRef<HTMLInputElement>(null);
//   const numberRef = useRef<HTMLInputElement>(null);
//   const categoryRef = useRef<HTMLInputElement>(null);

//   const [formState, setFormState] = useState({
//     title: "",
//     description: "",
//     number: "",
//     category: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     const postNumber = parseInt(formState.number, 10);

//     if (onAddPost) {
//       onAddPost({
//         title: formState.title,
//         description: formState.description,
//         category: formState.category,
//         number: !isNaN(postNumber) ? postNumber : undefined,
//       });
//     }

//     setFormState({ title: "", description: "", number: "", category: "" });
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <MyInput
//         name="title"
//         ref={titleRef}
//         type="text"
//         placeholder="Название поста"
//         value={formState.title}
//         onChange={handleChange}
//       />
//       <MyInput
//         name="description"
//         ref={descriptionRef}
//         type="text"
//         placeholder="Описание поста"
//         value={formState.description}
//         onChange={handleChange}
//       />
//       <MyInput
//         name="number"
//         ref={numberRef}
//         type="number"
//         placeholder="Номер поста"
//         value={formState.number}
//         onChange={handleChange}
//       />
//       <MyInput
//         name="category"
//         ref={categoryRef}
//         type="text"
//         placeholder="Категория поста"
//         value={formState.category}
//         onChange={handleChange}
//       />
//       <MyButton type="submit">Создать пост</MyButton>
//     </form>
//   );
// };

// export default AddPostForm;
// import React, { useRef, useState } from "react";
// import MyInput from "../ui/MyInput/MyInput";
// import MyButton from "../ui/MyButton/MyButton";
// import { AddPostFormProps } from "./AddPostForm.props";
// import styles from "./AddPostForm.module.css";

// interface Category {
//   id: string;
//   name: string;
// }

// // interface AddPostFormProps {
// //   onAddPost: (post: {
// //     title: string;
// //     description: string;
// //     category: string;
// //     number?: number;
// //   }) => void;
// //   categories: Category[];
// //   onSetCategory: (categoryId: string | undefined) => void;
// // }

// const AddPostForm: React.FC<AddPostFormProps> = ({
//   onAddPost,
//   categories,
//   onSetCategory,
// }) => {
//   const titleRef = useRef<HTMLInputElement>(null);
//   const descriptionRef = useRef<HTMLInputElement>(null);
//   const numberRef = useRef<HTMLInputElement>(null);
//   const categoryRef = useRef<HTMLSelectElement>(null);

//   const [formState, setFormState] = useState({
//     title: "",
//     description: "",
//     number: "",
//     category: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ): void => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({ ...prev, [name]: value }));

//     if (name === "category") {
//       onSetCategory(value || undefined); // Устанавливаем текущую категорию
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     const postNumber = parseInt(formState.number, 10);

//     onAddPost({
//       title: formState.title,
//       description: formState.description,
//       category: formState.category,
//       number: !isNaN(postNumber) ? postNumber : undefined,
//     });

//     setFormState({ title: "", description: "", number: "", category: "" });
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <MyInput
//         name="title"
//         ref={titleRef}
//         type="text"
//         placeholder="Название поста"
//         value={formState.title}
//         onChange={handleChange}
//       />
//       <MyInput
//         name="description"
//         ref={descriptionRef}
//         type="text"
//         placeholder="Описание поста"
//         value={formState.description}
//         onChange={handleChange}
//       />
//       <MyInput
//         name="number"
//         ref={numberRef}
//         type="number"
//         placeholder="Номер поста"
//         value={formState.number}
//         onChange={handleChange}
//       />

//       {/* Выбор категории */}
//       <select
//         name="category"
//         ref={categoryRef}
//         value={formState.category}
//         onChange={handleChange}
//       >
//         <option value="">Выберите категорию</option>
//         {categories.map((category) => (
//           <option key={category.id} value={category.id}>
//             {category.name}
//           </option>
//         ))}
//       </select>

//       <MyButton type="submit">Создать пост</MyButton>
//     </form>
//   );
// };

// export default AddPostForm;

// import React, { useState } from "react";
import { useFetchCategories } from "../../hooks/useFetchCategories";

interface AddPostFormProps {
  onAddPost: (post: {
    title: string;
    description: string;
    category: string;
    number: number;
  }) => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost }) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    category: "",
    number: "",
  });

  const { categories, loading, error } = useFetchCategories();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const number = parseInt(formState.number, 10);

    if (!isNaN(number)) {
      onAddPost({
        title: formState.title,
        description: formState.description,
        category: formState.category,
        number,
      });

      setFormState({ title: "", description: "", category: "", number: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Название поста"
        value={formState.title}
        onChange={handleChange}
      />
      <input
        name="description"
        type="text"
        placeholder="Описание поста"
        value={formState.description}
        onChange={handleChange}
      />
      <input
        name="number"
        type="number"
        placeholder="Номер поста"
        value={formState.number}
        onChange={handleChange}
      />

      {loading && <p>Загрузка категорий...</p>}
      {error && <p>Ошибка при загрузке категорий: {error}</p>}

      <select
        name="category"
        value={formState.category}
        onChange={handleChange}
      >
        <option value="">Выберите категорию</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button type="submit">Добавить пост</button>
    </form>
  );
};

export default AddPostForm;
