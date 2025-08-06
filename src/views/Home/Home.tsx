"use client"
import { Container, SimpleGrid } from "@chakra-ui/react"
import { ChainID } from "common/enum"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        <ChainInfoCard chainId={ChainID.TESTNET} chainName="ETH Testnet" />
        <ChainInfoCard chainId={ChainID.BCOS} chainName="BCOS" />
        <ChainInfoCard chainId={ChainID.DEVNET} chainName="ETH Devnet" />
      </SimpleGrid>
    </Container>
  )
}

export default Home
