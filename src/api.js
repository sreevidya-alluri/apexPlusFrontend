// api.js
import axios from 'axios';

const API_BASE_URL = 'https://apex-plus-backend-h013cyr9t-sree-vidyas-projects.vercel.app/';

export const getPokemons = () => {
  return axios.get(`${API_BASE_URL}/api/pokemons`);
};

export const addPokemon = (pokemon) => {
  return axios.post(`${API_BASE_URL}/api/pokemons`, pokemon);
};

export const updatePokemon = (id, pokemon) => {
  return axios.put(`${API_BASE_URL}/api/pokemons/${id}`, pokemon);
};

export const deletePokemon = (id) => {
  return axios.delete(`${API_BASE_URL}/api/pokemons/${id}`);
};

export const getPokemonById = (id) => {
  return axios.get(`${API_BASE_URL}/api/pokemons/${id}`);
};

// Example function for getting users, if needed
export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/api/users`);
};
