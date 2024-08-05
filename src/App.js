import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPokemonUsers from "./components/ListPokemonUsers";
import AddPokemonWithOwnerSelection from "./components/AddPokemonWithOwnerSelection";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import EditPokemon from "./components/EditPokemon";
import AddPokemon from "./components/AddPokemon";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/pokemons" element={<ListPokemonUsers />} />
        <Route
          path="/pokemons/add-with-owner-selection"
          element={<AddPokemonWithOwnerSelection />}
        />
        <Route path="/pokemons/add" element={<AddPokemon />} />
        <Route path="/pokemons/edit/:id" element={<EditPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
