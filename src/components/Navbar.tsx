import {
  Button,
  Flex,
  Box,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { GITHUB_AUTH_REDIRECT } from "../utils/url";
import { useAppSelector } from "../hooks/useAppSelector";
import { MoonIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isAuthenticated } = useAppSelector((s) => s.user);
  const { toggleColorMode } = useColorMode();
  // if(isLoading) return <div>Loading...</div>
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingY={5}
        paddingX={{ base: 2, sm: 5, md: 10, lg: 20}}
        h={'70px'}
      >
        <Box>
          <Heading>GitLeet</Heading>
        </Box>
        <Flex gap={2} alignItems={"center"}>
          <Button
            size={{ base: "sm", sm: "md" }}
            variant={`ghost`}
            onClick={toggleColorMode}
          >
            <MoonIcon />
          </Button>
          {!isAuthenticated ? (
            <Button
              size={{ base: "sm", sm: "md" }}
              variant={"outline"}
              as="a"
              href={GITHUB_AUTH_REDIRECT}
            >
              Login
            </Button>
          ) : null}
        </Flex>
      </Flex>
      <hr />
    </>
  );
};

export default Navbar;
