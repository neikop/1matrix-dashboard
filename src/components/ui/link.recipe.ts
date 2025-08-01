/* eslint-disable perfectionist/sort-objects */
import { defineRecipe } from "@chakra-ui/react"

export const linkRecipe = defineRecipe({
  base: {},
  defaultVariants: {
    colorPalette: "blue",
  },
  compoundVariants: [
    {
      colorPalette: "cyan",
      css: {
        color: "cyan.500",
        _hover: {
          color: "cyan.600",
        },
      },
    },
    {
      colorPalette: "blue",
      css: {
        color: "blue.500",
        _hover: {
          color: "blue.600",
        },
      },
    },
  ],
})
