import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, addPokemon } from '../../api';
import "./index.css"; // Import the CSS file

const AddPokemonWithOwnerSelection = () => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonAbility, setPokemonAbility] = useState('');
    const [noOfPokemon, setNoOfPokemon] = useState(1);
    const [users, setUsers] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
                if (response.data.length > 0) {
                    setSelectedOwner(response.data[0].name); // Default to the first user
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pokemonName && pokemonAbility && noOfPokemon && selectedOwner) {
            const newPokemon = {
                ownerName: selectedOwner,
                name: pokemonName,
                ability: pokemonAbility,
                noOfPokemon: parseInt(noOfPokemon)
            };

            try {
                await addPokemon(newPokemon);
                navigate('/pokemons'); // Redirect to the Pokémon list page
            } catch (err) {
                setError('Failed to add Pokémon. Please try again.');
            }
        } else {
            setError('Please fill all fields.');
        }
    };

    return (
        <form className="add-pokemon-form" onSubmit={handleSubmit}>
            <div>
                <label>Owner Name:</label>
                <select value={selectedOwner} onChange={(e) => setSelectedOwner(e.target.value)}>
                    {users.map((user) => (
                        <option key={user._id} value={user.name}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Pokémon Name:</label>
                <input type="text" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} required />
            </div>
            <div>
                <label>Pokémon Ability:</label>
                <input type="text" value={pokemonAbility} onChange={(e) => setPokemonAbility(e.target.value)} required />
            </div>
            <div>
                <label>Number of Pokémon:</label>
                <input type="number" value={noOfPokemon} onChange={(e) => setNoOfPokemon(e.target.value)} required />
            </div>
            <button type="submit">Add Pokémon</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default AddPokemonWithOwnerSelection;
