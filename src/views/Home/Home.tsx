"use client"
import { Container, SimpleGrid } from "@chakra-ui/react"
import { ChainID } from "common/enum"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        <ChainInfoCard
          chainId={ChainID.TESTNET}
          chainName="Alpha"
          description="Permissioned L1 based on Ethereum, PoS consensus: the most popular, reliable, robust & stable blockchain protocol"
        />
        <ChainInfoCard
          chainId={ChainID.BCOS}
          chainName="Beta"
          description="Permissioned L1 based on Fisco Bcos, rpBFT consensus, one of the fastest blockchains"
        />
        <ChainInfoCard
          chainId={ChainID.COSMOS}
          chainName="Gamma"
          description="Public L1 based on Comos SDK, CometBFT consensus: the most customizable blockchain SDK"
        />
        <ChainInfoCard
          chainId={ChainID.DEVNET}
          chainName="Delta"
          description="Public L1 based on Ethereum, PoS consensus: the most popular, reliable, robust & stable blockchain protocol"
        />
        <ChainInfoCard
          chainId={ChainID.QUORUM}
          chainName="Quorum"
          // description=""
        />
        <ChainInfoCard
          chainId={ChainID.SONIC}
          chainName="Sonic"
          // description=""
        />
      </SimpleGrid>
    </Container>
  )
}

export default Home
