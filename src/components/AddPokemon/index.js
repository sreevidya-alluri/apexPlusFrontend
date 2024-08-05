import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPokemon } from '../../api'; // Ensure this is correctly imported
import './index.css'; // Import the CSS file

const AddPokemon = () => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonAbility, setPokemonAbility] = useState('');
    const [noOfPokemon, setNoOfPokemon] = useState('');
    const [pokemonOwnerName, setPokemonOwnerName] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [abilityList, setAbilityList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
                const data = await response.json();
                const pokemonList = data.results;
                setPokemons(pokemonList);
            } catch (error) {
                console.error('Failed to fetch pokemons:', error);
            }
        };

        fetchPokemons();
    }, []);

    const handlePokemonNameChange = async (e) => {
        const name = e.target.value;
        setPokemonName(name);

        if (name) {
            const pokemon = pokemons.find(p => p.name === name);
            if (pokemon) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
                    const data = await response.json();
                    const abilities = data.abilities.map(ab => ab.ability.name);
                    setAbilityList(abilities);
                    if (abilities.length === 1) {
                        setPokemonAbility(abilities[0]);
                    } else {
                        setPokemonAbility('');
                    }
                } catch (error) {
                    console.error('Failed to fetch abilities:', error);
                }
            }
        } else {
            setAbilityList([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pokemonName && pokemonAbility && noOfPokemon && pokemonOwnerName) {
            const newPokemon = {
                ownerName: pokemonOwnerName,
                name: pokemonName,
                ability: pokemonAbility,
                noOfPokemon: parseInt(noOfPokemon, 10)
            };

            try {
                await addPokemon(newPokemon);
                navigate('/pokemons');
            } catch (err) {
                console.error('Failed to add Pokémon:', err);
            }
        } else {
            console.error('Please fill all fields.');
        }
    };

    return (
        <div className='add-box'>
        <form className="add-pokemon-form" onSubmit={handleSubmit}>
           
                <label htmlFor="pokemon-owner">Pokémon Owner Name:</label>
                <select
                    id="pokemon-owner"
                    name="pokemonOwnerName"
                    value={pokemonOwnerName}
                    onChange={(e) => setPokemonOwnerName(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Pokémon</option>
                    {pokemons.map((pokemon) => (
                        <option key={pokemon.name} value={pokemon.name}>
                            {pokemon.name}
                        </option>
                    ))}
                </select>
         
            <div>
                <label htmlFor="pokemon-name">Pokémon Name:</label>
                <input
                    type="text"
                    id="pokemon-name"
                    name="pokemonName"
                    value={pokemonName}
                    onChange={handlePokemonNameChange}
                    list="pokemon-names"
                    required
                />
                <datalist id="pokemon-names">
                    {pokemons.map((pokemon) => (
                        <option key={pokemon.name} value={pokemon.name} />
                    ))}
                </datalist>
            </div>
            <div>
                <label htmlFor="pokemon-ability">Pokémon Ability:</label>
                {abilityList.length > 1 ? (
                    <select
                        id="pokemon-ability"
                        name="pokemonAbility"
                        value={pokemonAbility}
                        onChange={(e) => setPokemonAbility(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Ability</option>
                        {abilityList.map((ability) => (
                            <option key={ability} value={ability}>
                                {ability}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        id="pokemon-ability"
                        name="pokemonAbility"
                        value={pokemonAbility}
                        onChange={(e) => setPokemonAbility(e.target.value)}
                        readOnly={abilityList.length === 1}
                        required
                    />
                )}
            </div>
            <div>
                <label htmlFor="no-of-pokemon">Number of Pokémon:</label>
                <input
                    type="number"
                    id="no-of-pokemon"
                    name="noOfPokemon"
                    value={noOfPokemon}
                    onChange={(e) => setNoOfPokemon(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Pokémon</button>
        </form>
        </div>
    );
};

export default AddPokemon;
