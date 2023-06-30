import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';
import LikeButton from '../components/LikeButton';

interface Character {
  id: number;
  name: string;
  image: string;
  liked: boolean;
}

const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [likedCharacters, setLikedCharacters] = useLocalStorage<Record<number, boolean>>(
    'likedCharacters',
    {}
  );

  const pageSize = 24;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        const data = await response.json();

        const updatedCharacters = data.results.map((character: Character) => ({
          ...character,
          liked: likedCharacters?.[character.id] || false,
        }));

        setCharacters(updatedCharacters);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, likedCharacters]);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleLike = (id: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) => {
        if (character.id === id) {
          const liked = !character.liked;

          setLikedCharacters((prevLikedCharacters = {}) => ({
            ...prevLikedCharacters,
            [character.id]: liked,
          }));

          return {
            ...character,
            liked,
          };
        }
        return character;
      })
    );
  };

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map((character: Character) => (
          <div
            key={character.id}
            className="card bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer"
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-auto"
              onClick={() => router.push(`/details/${character.id}`)}
            />
            <h3 className="text-lg font-semibold mt-2">{character.name}</h3>
            <LikeButton
              initialValue={character.liked}
              onClick={() => handleLike(character.id)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 2 && (
          <>
            <button
              className="pagination-button pagination-inactive"
              onClick={() => handlePagination(1)}
            >
              1
            </button>
            {currentPage > 3 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        {currentPage > 1 && (
          <button
            className="pagination-button pagination-inactive"
            onClick={() => handlePagination(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button className="pagination-button pagination-active">{currentPage}</button>
        {currentPage < totalPages && (
          <button
            className="pagination-button pagination-inactive"
            onClick={() => handlePagination(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
        {currentPage !== totalPages && (
          <button
            className="pagination-button pagination-inactive"
            onClick={() => handlePagination(totalPages)}
          >
            {totalPages}
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
