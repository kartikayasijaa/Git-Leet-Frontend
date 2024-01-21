import LeetcodeModal from "../components/Modals/LeetcodeModal";
import GithubRepoModal from "../components/Modals/GithubRepoModal";
import { VStack } from "@chakra-ui/react";
import PushButton from "../components/PushButton";

const Home = () => {
  // const { github_repo, leetcode_username } = useAppSelector((s) => s.user.user);
  return (
    <>
    <VStack height="70vh" align="center" justify="center" spacing={10}>
      <LeetcodeModal />
      <GithubRepoModal />
      <PushButton />
    </VStack>
    </>
  );
};

export default Home;
