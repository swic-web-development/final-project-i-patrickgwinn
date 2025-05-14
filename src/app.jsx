import React, { useState, useEffect } from 'react'

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
}
