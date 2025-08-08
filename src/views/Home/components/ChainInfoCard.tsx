import {
  Button,
  Card,
  Center,
  Flex,
  GridItem,
  GridItemProps,
  Separator,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  TextProps,
} from "@chakra-ui/react"
import { ChainID } from "common/enum"
import { SlideNumber } from "components/SlideNumber"
import { useGrafana } from "hooks/useGrafana"
import { ReactNode, useEffect } from "react"
import { IoMdOpen } from "react-icons/io"

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
          <Text as="div" color="fg.success" fontSize={36} fontWeight="bold" textAlign="center" {...valueProps}>
            {value}
          </Text>
        </Center>
      </Stack>
    </GridItem>
  )
}

type Props = {
  chainId: ChainID
  chainName: string
  dataCenters?: number | string
  description?: string
  maxTps?: number
}

const ChainInfoCard = ({ chainId, chainName, dataCenters = 3, description, maxTps }: Props) => {
  const data = useGrafana({ chainId })

  useEffect(() => {
    if (Object.values(data).length) {
      console.log(chainName, Object.values(data))
    }
  }, [chainName, data])

  return (
    <Card.Root variant="elevated">
      <Card.Header
        alignItems="flex-start"
        backgroundColor="bg.muted"
        borderBottomWidth={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        py={4}
      >
        <Stack gap={0} w="full">
          <Flex alignItems="flex-start" justifyContent="space-between">
            <Card.Title color="purple.600">{chainName}</Card.Title>
            <Button colorPalette="blue" display="none" variant="text">
              <Text fontWeight="semibold">View</Text>
              <IoMdOpen />
            </Button>

            <Tag.Root colorPalette="blue" px={2} py={1} rounded="full" size="md">
              <Tag.Label fontWeight="medium" letterSpacing="1px">
                Testnet
              </Tag.Label>
            </Tag.Root>
          </Flex>
          <Text color="textSecondary" fontSize="sm">
            {description}
          </Text>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Stack gap={6}>
          <SimpleGrid columns={{ base: 1, lg: 4 }} gap={2}>
            <InfoGridItem colSpan={1} label="Nodes" value={data.node} valueProps={{ color: "fg.success" }} />
            <InfoGridItem colSpan={1} label="Data Centers" value={dataCenters} />
            <InfoGridItem
              colSpan={2}
              label="Block"
              value={<SlideNumber size="lg" value={data.blocknumber} />}
              valueProps={{ color: "fg.warning" }}
            />
          </SimpleGrid>

          <Stack>
            <Flex alignItems="center" justifyContent="space-between">
              <Text>Max TPS</Text>
              <Text as="div" color="fg.warning" fontSize="2xl">
                <SlideNumber value={maxTps ?? data.maxTps} />
              </Text>
            </Flex>
            <Separator />
            <Flex alignItems="center" justifyContent="space-between">
              <Text>Live TPS</Text>
              <Text as="div" color="fg.info" fontSize="2xl">
                <SlideNumber value={data.tps} />
              </Text>
            </Flex>
            <Separator />
            <Flex alignItems="center" justifyContent="space-between">
              <Text>Block Time</Text>
              <Text as="div" color="fg.success" fontSize="2xl">
                <SlideNumber value={data.blocktime} />
              </Text>
            </Flex>
            <Separator />
            <Flex alignItems="center" justifyContent="space-between">
              <Text>Finality Time</Text>
              <Text as="div" color="fg.success" fontSize="2xl">
                <SlideNumber value={data.finality} />
              </Text>
            </Flex>
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

export default ChainInfoCard
