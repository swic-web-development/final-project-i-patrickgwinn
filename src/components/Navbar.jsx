import React from 'react'
import { Menu, Container } from 'semantic-ui-react'

export default function Navbar() {
  return (
    <Menu>
      <Container>
        <Menu.Item name="star wars API" />
        <Menu.Item name="people" />
      </Container>
    </Menu>
  )
}
