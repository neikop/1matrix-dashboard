import { Container, SimpleGrid } from "@chakra-ui/react"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        <ChainInfoCard chainName="BCOS" />
        <ChainInfoCard chainName="ETH Testnet" />
      </SimpleGrid>
    </Container>
  )
}

export default Home
