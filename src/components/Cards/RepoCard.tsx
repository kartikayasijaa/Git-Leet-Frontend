import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Text,
} from "@chakra-ui/react";
import { RepoType } from "../../utils/types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useCardVariant } from "../../hooks/useCardVariant";

interface RepoCardProps {
  repo: RepoType;
  onClick?: () => void;
  cursor?: string;
}

const RepoCard = ({ repo, onClick, cursor }: RepoCardProps) => {
  const { cardVariant } = useCardVariant();
  
  const { github_avatar_url } = useAppSelector((s) => s.user.user);

  return (
    <>
      <Card
        variant={cardVariant}
        boxShadow={"md"}
        onClick={onClick}
        cursor={cursor}
      >
        <CardBody padding={3}>
          <Flex alignItems={"center"} gap={2}>
            <Avatar src={github_avatar_url} />
            <Box>
              <Text fontSize={"medium"} fontWeight={"600"}>
                {repo.name}
              </Text>
              <Text fontSize={"xs"}>{repo.html_url}</Text>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default RepoCard;
