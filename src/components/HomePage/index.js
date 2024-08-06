import React, { useEffect, useState, useRef } from 'react';
import { getPokemons } from '../../api'; // Ensure this function is correctly implemented

const HomePage = () => {
    const [owners, setOwners] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [pokemonStates, setPokemonStates] = useState({});
    const containerRef = useRef(null);

    // Fetch Pokémon owners from the API
    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
                const data = await response.json();
                const ownerNames = data.results.map(pokemon => pokemon.name);
                setOwners(ownerNames);
                if (ownerNames.length > 0) {
                    setSelectedOwner(ownerNames[0]); // Set default selection
                }
            } catch (error) {
                console.error('Failed to fetch owners:', error);
            }
        };

        fetchOwners();
    }, []);

    // Fetch Pokémon when selectedOwner changes
    useEffect(() => {
        if (selectedOwner) {
            const fetchPokemons = async () => {
                try {
                    const response = await getPokemons();
                    const userPokemons = response.data.filter(pokemon => pokemon.ownerName === selectedOwner);
                    setPokemons(userPokemons);

                    setPokemonStates(userPokemons.reduce((acc, pokemon) => {
                        acc[pokemon._id] = {
                            isMoving: false,
                            isVisible: true,
                            position: {
                                x: pokemon.initialPositionX,
                                y: pokemon.initialPositionY
                            },
                            speed: pokemon.speed || 1
                        };
                        return acc;
                    }, {}));
                } catch (error) {
                    console.error('Failed to fetch Pokémon data:', error);
                }
            };

            fetchPokemons();
        }
    }, [selectedOwner]);

    // Move Pokémon within the container
    useEffect(() => {
        const interval = setInterval(() => {
            setPokemonStates(prevState => {
                const newState = { ...prevState };
                const container = containerRef.current;

                if (container) {
                    Object.keys(newState).forEach(id => {
                        const pokemon = newState[id];
                        if (pokemon.isMoving && pokemon.isVisible) {
                            pokemon.position.x += pokemon.speed || 0;
                            pokemon.position.y += pokemon.speed || 0;

                            // Check boundaries
                            if (pokemon.position.x < 0 || pokemon.position.x > container.clientWidth ||
                                pokemon.position.y < 0 || pokemon.position.y > container.clientHeight) {
                                pokemon.isVisible = false;
                            }
                        }
                    });
                }

                return newState;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const handlePokemonGo = (id) => {
        setPokemonStates(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                isMoving: true
            }
        }));
    };

    const handlePokemonFlee = (id) => {
        setPokemonStates(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                isVisible: !prevState[id].isVisible
            }
        }));
    };

    const handlePokemonCease = (id) => {
        setPokemonStates(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                isMoving: false
            }
        }));
    };

    return (
        <div>
            <h1>Pokémon Owners</h1>
            <div>
                <label htmlFor="owner-select">Select Owner:</label>
                <select
                    id="owner-select"
                    value={selectedOwner}
                    onChange={(e) => setSelectedOwner(e.target.value)}
                >
                    {owners.map((owner, index) => (
                        <option key={index} value={owner}>
                            {owner}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h2>Pokémon Details</h2>
                <div ref={containerRef} className="pokemon-container" style={{ position: 'relative', width: '100%', height: '600px', border: '1px solid black' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Pokemon Name</th>
                                <th>Ability</th>
                                <th>Number of Pokémon</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemons.map(pokemon => (
                                <tr key={pokemon._id}>
                                    <td>{pokemon.name}</td>
                                    <td>{pokemon.ability}</td>
                                    <td>{pokemon.noOfPokemon}</td>
                                    <td>
                                        <button onClick={() => handlePokemonGo(pokemon._id)}>Go</button>
                                        <button onClick={() => handlePokemonFlee(pokemon._id)}>Flee</button>
                                        <button onClick={() => handlePokemonCease(pokemon._id)}>Cease</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {/* Optional: Render Pokémon based on pokemonStates */}
                        {pokemons.map(pokemon => {
                            const state = pokemonStates[pokemon._id] || {};
                            return (
                                <div
                                    key={pokemon._id}
                                    style={{
                                        position: 'absolute',
                                        left: state.position?.x,
                                        top: state.position?.y,
                                        visibility: state.isVisible ? 'visible' : 'hidden'
                                    }}
                                >
                                    {pokemon.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
