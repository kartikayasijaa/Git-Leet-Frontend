import {
  Flex,
} from "@chakra-ui/react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSelectedRepo } from "../Redux/repoSlice";
import RepoCard from "./Cards/RepoCard";

const RepoSearchResult = () => {
  const {
    repoSearchResult: { items },
  } = useAppSelector((s) => s.repo);
  const dispatch = useAppDispatch();

  return (
    <Flex direction={"column"} gap={2} marginY={5}>
      {items &&
        items.map((item) => (
          <RepoCard
            key={item.id}
            repo={item}
            onClick={() => dispatch(setSelectedRepo(item))}
            cursor="pointer"
          />
        ))}
    </Flex>
  );
};

export default RepoSearchResult;
