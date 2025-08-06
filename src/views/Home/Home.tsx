"use client"
import { Container, SimpleGrid } from "@chakra-ui/react"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        <ChainInfoCard chainId="1matrix-stressnet" chainName="ETH Testnet" dataCenters={"..."} />
        <ChainInfoCard chainId="bcos-testnet-2" chainName="BCOS" dataCenters={"..."} />
        <ChainInfoCard chainId="1mtx-devnet" chainName="ETH Devnet" dataCenters={"..."} />
      </SimpleGrid>
    </Container>
  )
}

export default Home
