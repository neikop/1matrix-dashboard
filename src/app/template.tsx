import { Box, Grid } from "@chakra-ui/react"
import { AppHeader } from "components/app"
import { PropsWithChildren } from "react"

const Template = ({ children }: PropsWithChildren) => {
  return (
    <Grid as="main" gridTemplateRows="64px 1fr" h="100vh" templateAreas={`"header" "main"`}>
      <AppHeader />
      <Box gridArea="main" px={{ md: 6 }} py={6}>
        {children}
      </Box>
    </Grid>
  )
}

export default Template
