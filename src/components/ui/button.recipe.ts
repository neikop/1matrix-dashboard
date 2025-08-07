/* eslint-disable perfectionist/sort-objects */
import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  base: {
    cursor: "pointer",
    fontWeight: 600,
  },
  defaultVariants: {
    variant: "subtle",
  },
  variants: {
    variant: {
      ghost: {
        borderWidth: 0,
      },
      subtle: {
        borderWidth: 0,
      },
      text: {
        border: "none",
        height: "unset",
        minWidth: "unset",
        padding: 0,
        color: "gray.800",
        _hover: {
          color: "black",
        },
      },
    },
  },
  compoundVariants: [
    {
      colorPalette: "cyan",
      variant: "text",
      css: {
        color: "cyan.500",
        _hover: {
          color: "cyan.600",
        },
      },
    },
    {
      colorPalette: "blue",
      variant: "text",
      css: {
        color: "blue.500",
        _hover: {
          color: "blue.600",
        },
      },
    },
  ],
})
