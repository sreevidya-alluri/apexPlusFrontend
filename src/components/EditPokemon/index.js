import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { updatePokemon, getPokemonById } from '../../api';
import './index.css'

const EditPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await getPokemonById(id);
        setPokemon(response.data);
        setPokemonAbility(response.data.ability);
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error);
        setError('Failed to fetch Pokémon data. Please try again.');
      }
    };

    if (location.state && location.state.pokemon) {
      setPokemon(location.state.pokemon);
      setPokemonAbility(location.state.pokemon.ability);
    } else if (id) {
      fetchPokemon();
    }
  }, [id, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pokemon) {
      try {
        await updatePokemon(id, {
          ...pokemon,
          ability: pokemonAbility
        });
        navigate('/pokemons');
      } catch (err) {
        setError('Failed to update Pokémon. Please try again.');
      }
    } else {
      setError('Pokémon data is missing.');
    }
  };

  const handleChange = (e) => {
    setPokemon({ ...pokemon, [e.target.name]: e.target.value });
  };

  return (
    pokemon && (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ownerName">Pokémon Owner Name:</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={pokemon.ownerName}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="name">Pokémon Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={pokemon.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ability">Pokémon Ability:</label>
          <input
            type="text"
            id="ability"
            name="ability"
            value={pokemonAbility}
            onChange={(e) => setPokemonAbility(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="initialPositionX">Initial Position X:</label>
          <input
            type="number"
            id="initialPositionX"
            name="initialPositionX"
            value={pokemon.initialPositionX}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="initialPositionY">Initial Position Y:</label>
          <input
            type="number"
            id="initialPositionY"
            name="initialPositionY"
            value={pokemon.initialPositionY}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Pokémon</button>
        {error && <p>{error}</p>}
      </form>
    )
  );
};

export default EditPokemon;
