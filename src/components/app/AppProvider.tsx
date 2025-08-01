"use client"
import { ChakraProvider, Theme } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { chakraSystem } from "components/ui/theme"
import { queryClient } from "configs/queryClient"
import { PropsWithChildren, useEffect, useState } from "react"

const AppProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={chakraSystem}>
        {isReady && (
          <Theme appearance="light">
            {/*  */}
            {children}
          </Theme>
        )}
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
