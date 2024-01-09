"use client";

import { searchRepo } from "@/app/(user)/actions";
import { RepoType } from "@/constants/types";
import { GITHUB_BASE_URL } from "@/constants/url";
import useSession from "@/hooks/useSession";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import SearchRepoCard from "./SearchRepoCard";
import SelectRepoBranch from "./SelectRepoBranch";

const SearchGithubRepo: React.FC = () => {

  const [search, setSearch] = useState("");
  const [result, setResult] = useState<RepoType[]>([]);
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
  const [repo, setRepo] = useState<RepoType>();
  const {
    accessToken,
    user: { github_username },
  } = useSession();

  const closeModalCleanup = () => {
    setSearch("");
    setResult([]);
    setRepo(undefined);
  };

  useEffect(() => {
    if (search.length < 1) {
      setResult([]);
      return;
    }
    (async () => {
      try {
        const repo = await searchRepo({ github_username, accessToken, search });
        setResult(repo.items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [search, github_username, accessToken]);

  return (
    <>
      <Button onPress={onOpen}>Connect your Repository</Button>
      <Modal
        size={"4xl"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => onClose()}
        motionProps={{
          onAnimationComplete: () => {
            if (!isOpen) {
              closeModalCleanup();
            }
          },
        }}
        className="min-h-96"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Connect Repository
            </ModalHeader>
            {repo ? (
              <SelectRepoBranch repo={repo} onClose={onClose}/>
            ) : (
              <>
                <ModalBody>
                  <Input
                    name="repo"
                    type="text"
                    placeholder="Search your Repositories"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </ModalBody>
                <SearchRepoCard repos={result} setRepo={setRepo} />
              </>
            )}
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchGithubRepo;
