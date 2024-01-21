import { useColorMode } from "@chakra-ui/react";

export const useCardVariant = () => {
  const { colorMode } = useColorMode();
  const cardVariant = colorMode === "light" ? "filled" : "outline";
  return { cardVariant };
};
