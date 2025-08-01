import { Container, SimpleGrid } from "@chakra-ui/react"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        <ChainInfoCard chainId="1matrix-stressnet" chainName="ETH Testnet" dataCenters={1} />
        <ChainInfoCard chainId="bcos-testnet" chainName="BCOS" dataCenters={2} />
        <ChainInfoCard chainId="1mtx-devnet" chainName="ETH Devnet" dataCenters={3} />
      </SimpleGrid>
    </Container>
  )
}

export default Home
