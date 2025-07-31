import { Container, SimpleGrid } from "@chakra-ui/react"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        <ChainInfoCard blockNumber={41231} chainName="BCOS" nodes={4} />
        <ChainInfoCard blockNumber={241124} chainName="ETH Testnet" nodes={6} />
      </SimpleGrid>
    </Container>
  )
}

export default Home
