export const fetchCharacters = async (page: number) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching characters:', error);
      return [];
    }
  };
  
  export const fetchCharacterById = async (id: number) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching character:', error);
      return null;
    }
  };
  