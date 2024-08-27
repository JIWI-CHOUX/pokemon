import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const PokemonListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const EmptyCardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const EmptyCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 150px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 24px;
  color: #888;
`;

const PokemonCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  text-align: center;
  width: 150px;
  cursor: pointer;
  position: relative;

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Button = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 20px 0;

  &:hover {
    background-color: #c82333;
  }
`;

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [addedPokemons, setAddedPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const pokemonsWithImages = await Promise.all(data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            ...pokemon,
            image: pokemonData.sprites.front_default
          };
        }));

        setPokemons(pokemonsWithImages);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setError('Error fetching pokemons');
      }
    };

    fetchPokemons();
  }, []);

  const handleAddPokemon = (pokemon, e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    if (!addedPokemons.find(p => p.name === pokemon.name) && addedPokemons.length < 6) {
      setAddedPokemons(prev => [pokemon, ...prev]); // 추가된 포켓몬 상태를 업데이트
    }
  };

  const handleRemovePokemon = (pokemonName) => {
    setAddedPokemons(prev => prev.filter(p => p.name !== pokemonName));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>

      <EmptyCardContainer>
        {Array.from({ length: 6 }).map((_, index) => {
          const pokemon = addedPokemons[index];
          return (
            <EmptyCard key={`empty-${index}`}>
              {pokemon ? (
                <PokemonCard>
                  <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={pokemon.image} alt={pokemon.name} />
                    <h3>{pokemon.name}</h3>
                  </Link>
                  <button onClick={() => handleRemovePokemon(pokemon.name)}>Remove</button>
                </PokemonCard>
              ) : (
                '+'
              )}
            </EmptyCard>
          );
        })}
        {addedPokemons.length > 0 && (
          <Button onClick={() => setAddedPokemons([])}>
            Remove All Added Pokemons
          </Button>
        )}
      </EmptyCardContainer>

     
      <PokemonListContainer>
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
            </Link>
            <button onClick={(e) => handleAddPokemon(pokemon, e)}>Add</button>
          </PokemonCard>
        ))}
      </PokemonListContainer>
    </div>
  );
};

export default PokemonList;
