import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const DetailContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const PokemonImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const PokemonDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
        setError('Error fetching pokemon details');
      }
    };

    fetchPokemonDetails();
  }, [name]);

  const handleBack = () => {
    navigate(-1); // 뒤로가기
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DetailContainer>
      {pokemon ? (
        <>
          <BackButton onClick={handleBack}>Back to List</BackButton>
          <h1>{pokemon.name}</h1>
          <PokemonImage src={pokemon.sprites?.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </DetailContainer>
  );
};

export default PokemonDetails;
