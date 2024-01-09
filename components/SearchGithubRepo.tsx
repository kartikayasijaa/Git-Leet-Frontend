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

const SearchGithubRepo = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<RepoType[]>([]);
  const [repo, setRepo] = useState<RepoType>();
  const {
    accessToken,
    user: { github_username },
  } = useSession();
  useEffect(() => {
    if (search.length < 1) {
      setResult([]);
      return
    }
    (async () => {
      try {
        const repo = await searchRepo({ github_username, accessToken, search });
        console.log(repo.items);
        setResult(repo.items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [search, github_username, accessToken]);
  return (
    <>
      <Button onPress={onOpen}>Connect your Repository</Button>
      <Modal size={"4xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Connect Repository
              </ModalHeader>
              {console.log(repo)}
              {repo ? (
                <SelectRepoBranch />
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
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchGithubRepo;
