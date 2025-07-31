import { Container, SimpleGrid } from "@chakra-ui/react"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={2} gap={6}>
        <ChainInfoCard />
        <ChainInfoCard />
      </SimpleGrid>
    </Container>
  )
}

export default Home
