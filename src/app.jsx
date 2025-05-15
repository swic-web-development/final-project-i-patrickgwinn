import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import SearchBar from './components/SearchBar.jsx'

export default function App() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPokemon, setFilteredPokemon] = useState([])

  useEffect(() => {
    async function fetchPokemon() {
      try {
        // Fetch the first 151 pokemon (original generation)
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        const data = await res.json()
        // Add the name property to each pokemon object
        const results = data.results.map((pokemon) => ({
          ...pokemon,
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        }))
        setPokemon(results)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, []) // This effect should only run once on component mount

  useEffect(() => {
    // This effect should run whenever searchTerm or pokemon changes
    if (searchTerm === '') {
      setFilteredPokemon(pokemon)
    } else {
      const filtered = pokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredPokemon(filtered)
    }
  }, [searchTerm, pokemon])

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
          <ul className="pokemon-list">
            {filteredPokemon.map((poke) => (
              <li key={poke.name}>{poke.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
