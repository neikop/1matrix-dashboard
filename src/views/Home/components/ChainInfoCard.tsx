import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  GridItem,
  GridItemProps,
  Separator,
  SimpleGrid,
  Stack,
  Text,
  TextProps,
} from "@chakra-ui/react"
import { SlideNumber } from "components/common"
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
      <Stack gap={0} h="full">
        <Text fontSize="sm">{label}</Text>
        <Center flex={1}>
          <Text color="fg.success" fontSize={36} fontWeight="bold" textAlign="center" {...valueProps}>
            {value}
          </Text>
        </Center>
      </Stack>
    </GridItem>
  )
}

type Props = {
  chainName: string
}

const ChainInfoCard = ({ chainName }: Props) => {
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
        <Card.Title>{chainName}</Card.Title>
        <Button colorPalette="purple" variant="text">
          View
          <IoMdOpen />
        </Button>
      </Card.Header>
      <Card.Body>
        <Stack gap={6}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={2}>
            <InfoGridItem label="Nodes" value={4} />
            <InfoGridItem
              label="Block"
              value={<SlideNumber autoIncrease cooldown={4000} size="lg" value={123123} />}
              valueProps={{ color: "fg.warning" }}
            />
          </SimpleGrid>

          <Stack>
            <Flex alignItems="center" justifyContent="space-between">
              <Text>TPS</Text>
              <Text as="div" color="fg.success" fontSize="2xl">
                <SlideNumber autoRandom cooldown={2500} value={4000} />
              </Text>
            </Flex>
            <Separator />
            <Flex alignItems="center" justifyContent="space-between">
              <Text>Block Time (s)</Text>
              <Text as="div" color="fg.success" fontSize="2xl">
                4.00
              </Text>
            </Flex>
            <Separator />
            <Flex alignItems="center" justifyContent="space-between">
              <Text>Finality Time (ms)</Text>
              <Text as="div" color="fg.warning" fontSize="2xl">
                <SlideNumber autoRandom cooldown={10000} value={350} />
              </Text>
            </Flex>
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

export default ChainInfoCard
