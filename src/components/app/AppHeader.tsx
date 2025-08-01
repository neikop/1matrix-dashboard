import { Center, Flex, Image } from "@chakra-ui/react"
import { AppSidebar } from "components/app"
import { Link } from "react-router"
import { privateRoute } from "routes"

const AppHeader = () => {
  return (
    <Flex alignItems="stretch" gap={4} gridArea="header" justifyContent="space-between" px={6} shadow="sm">
      <Flex alignItems="center" gap={10} mdDown={{ flex: 1, justifyContent: "space-between" }}>
        <Center borderRadius={4} p={2}>
          <Link to={privateRoute.home.path}>
            <Image h={10} src="/1matrix.png" />
          </Link>
        </Center>
        <AppSidebar />
      </Flex>

      <Center smDown={{ bottom: 0, h: 16, left: 0, position: "fixed", right: 0, shadow: "sm" }}>
        {/*  */}
        {/*  */}
      </Center>
    </Flex>
  )
}

export default AppHeader
