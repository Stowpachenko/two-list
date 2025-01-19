// export interface AddPostFormProps {
//   onAddPost: (post: {
//     title: string;
//     description: string;
//     category?: string;
//     number?: number;
//   }) => void;
// }

export interface AddPostFormProps {
  onAddPost: (post: {
    title: string;
    description: string;
    category: string;
    number?: number;
  }) => void;
  categories: Category[];
  onSetCategory: (categoryId: string | undefined) => void;
}

export interface Category {
  id: string;
  name: string;
}
