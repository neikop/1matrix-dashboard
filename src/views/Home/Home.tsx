"use client"
import { Container, SimpleGrid } from "@chakra-ui/react"
import { ChainID } from "common/enum"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap={6}>
        <ChainInfoCard
          chainId={ChainID.TESTNET}
          chainName="1Matrix Alpha"
          description="Permissioned L1 based on Ethereum, PoS consensus: the most popular, reliable, robust & stable blockchain protocol"
          maxTps={10000}
        />
        <ChainInfoCard
          chainId={ChainID.BCOS}
          chainName="1Matrix Beta"
          description="Permissioned L1 based on Fisco Bcos, rpBFT consensus, one of the fastest blockchains"
          maxTps={250000}
          note={7}
        />
        <ChainInfoCard
          chainId={ChainID.COSMOS}
          chainName="1Matrix Gamma"
          description="Public L1 based on Comos SDK, CometBFT consensus: the most customizable blockchain SDK"
          maxTps={10000}
          note={7}
        />
        <ChainInfoCard
          chainId={ChainID.DEVNET}
          chainName="1Matrix Delta"
          description="Permissioned L1 based on Hyperledger Fabric, RAFT-based, designed for enterprise"
          maxTps={20000}
        />
        <ChainInfoCard
          chainId={ChainID.QUORUM}
          chainName="1Matrix Epsilon"
          description="Permissioned L1 based on Quorum, qBFT consensus, designed for enterprise and banking"
          maxTps={10000}
          note={7}
        />
        <ChainInfoCard
          chainId={ChainID.SONIC}
          chainName="1Matrix Zeta"
          description="Public L1 based on Sonic, aBFT consensus,  one of the fastest blockchains with DAG architecture"
          maxTps={100000}
          note={7}
        />
      </SimpleGrid>
    </Container>
  )
}

export default Home
