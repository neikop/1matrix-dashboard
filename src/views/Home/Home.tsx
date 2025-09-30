"use client"
import { Container, SimpleGrid } from "@chakra-ui/react"
import { ChainID } from "common/enum"

import { ChainInfoCard } from "./components"

const Home = () => {
  return (
    <Container maxWidth="vw">
      <SimpleGrid columns={{ "2xlDown": 2, base: 3, lgDown: 1 }} gap={6}>
        <ChainInfoCard
          chainId={ChainID.ALPHA}
          chainName="1Matrix Alpha"
          description="Permissioned L1 based on Ethereum, PoS consensus: the most popular, reliable, robust & stable blockchain protocol"
          maxTps={10000}
        />
        <ChainInfoCard
          chainId={ChainID.BETA}
          chainName="1Matrix Beta"
          description="Permissioned L1 based on Fisco Bcos, rpBFT consensus, one of the fastest blockchains"
          maxTps={250000}
        />
        <ChainInfoCard
          chainId={ChainID.GAMMA}
          chainName="1Matrix Gamma"
          description="Public L1 based on Comos SDK, CometBFT consensus: the most customizable blockchain SDK"
          maxTps={10000}
        />
        <ChainInfoCard
          chainId={ChainID.TCBCHAIN}
          chainName="1Matrix TCBChain"
          description="Permissioned L1 based on Ethereum, PoS consensus: the most popular, reliable, robust & stable blockchain protocol with lower blocktime"
          maxTps={10000}
        />
        <ChainInfoCard
          chainId={ChainID.EPSILON}
          chainName="1Matrix Epsilon"
          description="Permissioned L1 based on Quorum, qBFT consensus, designed for enterprise and banking"
          maxTps={10000}
        />
        <ChainInfoCard
          chainId={ChainID.ZETA}
          chainName="1Matrix Zeta"
          description="Public L1 based on Sonic, aBFT consensus, one of the fastest blockchains with DAG architecture"
          maxTps={100000}
        />
      </SimpleGrid>
    </Container>
  )
}

export default Home
