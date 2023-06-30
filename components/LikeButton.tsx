import { useState } from 'react';

interface LikeButtonProps {
  initialValue: boolean;
  onClick: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialValue, onClick }) => {
  const [liked, setLiked] = useState(initialValue);

  const handleButtonClick = () => {
    setLiked((prevLiked) => !prevLiked);
    onClick();
  };

  return (
    <button
      className={`text-white rounded-lg px-4 py-2 mt-2 ${liked ? 'bg-red-500' : 'bg-blue-500'}`}
      onClick={handleButtonClick}
    >
      {liked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;
