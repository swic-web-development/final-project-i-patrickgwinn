import React from 'react'
import { Menu, Container } from 'semantic-ui-react'

export default function Navbar() {
  return (
    <Menu>
      <Container>
        <Menu.Item name="Pokemon API" />
        <Menu.Item name="First 151 Pokemon" />
      </Container>
    </Menu>
  )
}
