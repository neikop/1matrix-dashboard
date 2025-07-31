import { Box, Button, Card, GridItem, GridItemProps, SimpleGrid, Stack, Text, TextProps } from "@chakra-ui/react"
import { PropsWithChildren, ReactNode } from "react"
import { IoMdOpen } from "react-icons/io"

import InfoChart from "./InfoChart"

type InfoGridItemProps = {
  label?: ReactNode
  value?: ReactNode
  valueProps?: TextProps
} & GridItemProps

const InfoGridItem = ({ label, value, valueProps, ...gridItemProps }: InfoGridItemProps) => {
  return (
    <GridItem borderRadius={4} borderWidth={1} px={2} py={1} {...gridItemProps}>
      <Stack gap={0}>
        <Text fontSize="sm">{label}</Text>
        <Text color="fg.success" fontSize={40} fontWeight="bold" textAlign="center" {...valueProps}>
          {value}
        </Text>
      </Stack>
    </GridItem>
  )
}

const ChainInfoCard = () => {
  return (
    <Card.Root variant="elevated">
      <Card.Header
        backgroundColor="bg.muted"
        borderBottomWidth={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        py={4}
      >
        <Card.Title>ETH Testnet</Card.Title>
        <Button colorPalette="purple" variant="text">
          View
          <IoMdOpen />
        </Button>
      </Card.Header>
      <Card.Body>
        <Stack gap={6}>
          <SimpleGrid columns={6} gap={2}>
            <InfoGridItem colSpan={3} label="Nodes" value={4} />
            <InfoGridItem colSpan={3} label="Block" value={12423123} valueProps={{ color: "fg.warning" }} />
            <InfoGridItem colSpan={2} label="TPS" value={0} />
            <InfoGridItem colSpan={2} label="Block Time (s)" value={"4.00"} />
            <InfoGridItem colSpan={2} label="Finality Time (ms)" value={"350"} valueProps={{ color: "fg.warning" }} />

            {/* <GridItem colSpan={3}>
              <Stack>
                <Text>Tx Processing</Text>
                <SimpleGrid columns={4} gap={2}>
                  <Stack>
                    <Text>Label</Text>
                    <Text>0</Text>
                  </Stack>
                  <Stack>
                    <Text>Label</Text>
                    <Text>0</Text>
                  </Stack>
                  <Stack>
                    <Text>Label</Text>
                    <Text>0</Text>
                  </Stack>
                  <Stack>
                    <Text>Label</Text>
                    <Text>0</Text>
                  </Stack>
                </SimpleGrid>
              </Stack>
              <Stack>
                <Text>Tx Pending</Text>
                <SimpleGrid columns={4} gap={2}>
                  <Stack>
                    <Text>Label</Text>
                    <Text>0</Text>
                  </Stack>
                  <Stack>
                    <Text>Label</Text>
                    <Text>0</Text>
                  </Stack>
                  <Stack>
                    <Text>Label</Text>
                    <Text>0</Text>
                  </Stack>
                  <Stack>
                    <Text>Label</Text>
                    <Text>0</Text>
                  </Stack>
                </SimpleGrid>
              </Stack>
            </GridItem> */}
          </SimpleGrid>
          <Box h={320}>
            <InfoChart />
          </Box>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

export default ChainInfoCard
