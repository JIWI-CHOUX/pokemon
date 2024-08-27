import React from 'react';

const PokemonCard = ({ pokemon, onAdd, onRemove, onClick }) => {
  if (!pokemon) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '8px',
          height: '150px',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer'
        }}
        onClick={onClick}
      >
        <span style={{ fontSize: '24px', color: '#999' }}>+ 추가하기</span>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        cursor: 'pointer'
      }}
      onClick={() => onClick(pokemon)}
    >
      <img src={pokemon.image} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
      <h3>{pokemon.name}</h3>
      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          pokemon ? onRemove(pokemon) : onAdd(pokemon);
        }}
      >
        {pokemon ? '삭제하기' : '추가하기'}
      </button>
    </div>
  );
};

export default PokemonCard;
