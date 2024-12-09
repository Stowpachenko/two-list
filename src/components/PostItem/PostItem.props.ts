export interface PostItemProps {
  id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void;
}
