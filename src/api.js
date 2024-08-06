import axios from 'axios';

// Set up Axios defaults
axios.defaults.baseURL = 'https://apex-plus-backend-xxx.vercel.app';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Define API base URL
const API_BASE_URL = 'https://apex-plus-backend-xxx.vercel.app';

// Helper function to handle errors
const handleError = (error) => {
  console.error('API Error:', error.response || error.message || error);
  throw error; // Re-throw the error to be handled by the calling function
};

// Function to get all Pokémon
export const getPokemons = async () => {
  try {
    const response = await axios.get('/api/pokemons');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to add a new Pokémon
export const addPokemon = async (pokemon) => {
  try {
    const response = await axios.post('/api/pokemons', pokemon);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to update an existing Pokémon
export const updatePokemon = async (id, pokemon) => {
  try {
    const response = await axios.put(`/api/pokemons/${id}`, pokemon);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to delete a Pokémon by ID
export const deletePokemon = async (id) => {
  try {
    const response = await axios.delete(`/api/pokemons/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get a Pokémon by ID
export const getPokemonById = async (id) => {
  try {
    const response = await axios.get(`/api/pokemons/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Example function for getting users, if needed
export const getUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
