import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState([])

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
  }, [])
  return (
    <div>
      <Navbar />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <ul>
          {people.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
