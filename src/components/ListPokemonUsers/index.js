import React, { useEffect, useState } from "react";
import { getPokemons, deletePokemon } from "../../api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";

const ListPokemonUsers = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await getPokemons();
        setPokemons(response.data || []);
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
      }
    };

    fetchPokemons();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePokemon(id);
      setPokemons(pokemons.filter((pokemon) => pokemon.id !== id));
    } catch (error) {
      console.error("Failed to delete Pokémon", error);
    }
  };

  return (
    <div id="list-pokemon-container">
      <h1>List of Pokémon Users</h1>
      <button>Delete all</button>
      <table>
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Pokémon Name</th>
            <th>Pokémon Ability</th>
            <th>No. of Pokémon</th>
            <th>Add Pokémon</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.ownerName}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.ability}</td>
              <td>1</td>
              <td>
                <Link to="/pokemons/add">
                  <FaPlus />
                </Link>
              </td>
              <td>
                <Link to={`/pokemons/edit/${pokemon.id}`} state={{ pokemon }}>
                  <FaEdit />
                </Link>
              </td>
              <td>
                <FaTrash onClick={() => handleDelete(pokemon.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPokemonUsers;
