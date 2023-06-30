import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../../components/header';
import Footer from '../../components/footer';

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

const CharacterDetailsPage = () => {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const characterId = window.location.pathname.split('/').pop();
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, []);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
        <img src={character.image} alt={character.name} className="w-full md:w-1/2" />
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
          <p className="text-lg">Status: {character.status}</p>
          <p className="text-lg">Species: {character.species}</p>
          <p className="text-lg">Gender: {character.gender}</p>
          <p className="text-lg">Origin: {character.origin.name}</p>
          <p className="text-lg">Location: {character.location.name}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CharacterDetailsPage;

