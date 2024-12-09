export interface AddPostFormProps {
  onAddPost: (post: {
    title: string;
    description: string;
    number?: number;
  }) => void;
}
