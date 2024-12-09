import { PostItemProps } from "./PostItem.props";

const PostItem: React.FC<PostItemProps> = ({
  id,
  title,
  description,
  onDelete,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default PostItem;
