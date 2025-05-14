import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import SearchBar from './components/SearchBar.jsx'

export default function App() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPeople, setFilteredPeople] = useState([])

  useEffect(() => {
    async function fetchPeople() {
      const res = await fetch('https://swapi.tech/api/people/?format=json')
      const data = await res.json()
      setPeople(data.results)
    }

    fetchPeople()
      .then(() => setLoading(false))
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, []) // This effect should only run once on component mount

  useEffect(() => {
    // This effect should run whenever searchTerm or people changes
    if (searchTerm === '') {
      setFilteredPeople(people)
    } else {
      const filtered = people.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredPeople(filtered)
    }
  }, [searchTerm, people])

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
          <ul className="people-list">
            {filteredPeople.map((person) => (
              <li key={person.name}>{person.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
