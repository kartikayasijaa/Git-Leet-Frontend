import { Card, Flex, Select, Text } from "@chakra-ui/react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useCardVariant } from "../hooks/useCardVariant";
import { useEffect, useState } from "react";
import { BranchType } from "../utils/types";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSelectedBranch } from "../Redux/repoSlice";

const RepoBranch = () => {
  const { selectedRepo, selectedBranch } = useAppSelector((s) => s.repo);
  const { cardVariant } = useCardVariant();
  const [branch, setBranch] = useState<BranchType[]>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!selectedRepo || !selectedRepo.id) return;

    (async () => {
      try {
        const res = await fetch(
          selectedRepo.branches_url.replace("{/branch}", "")
        );
        if (!res.ok) {
          throw new Error("Error fetching branches");
        }
        const data = (await res.json()) as BranchType[];
        setBranch(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedRepo]);
  return (
    <>
      <Flex
        width={{ base: "100%", sm: "80%", md: "70%", lg: "50%" }}
        margin={"auto"}
        alignItems={"center"}
        gap={2}
      >
        <Card variant={cardVariant} boxShadow={"md"} padding={5} width={"70%"}>
          <Flex direction={"column"}>
            <Text>{selectedRepo.name}</Text>
            <Text fontSize="xs" display={{ base: "none", sm: "block" }}>
              {selectedRepo.html_url}
            </Text>
          </Flex>
        </Card>
        <Select
          value={selectedBranch}
          onChange={(e) => dispatch(setSelectedBranch(e.target.value))}
          placeholder={"Select Branch"}
          width={"30%"}
        >
          {branch &&
            branch.length > 0 &&
            branch.map((b) => (
              <option key={b.name} value={b.name} style={{ padding: "10px" }}>
                {b.name}
              </option>
            ))}
        </Select>
      </Flex>
    </>
  );
};

export default RepoBranch;
