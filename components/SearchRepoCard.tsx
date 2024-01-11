import { RepoType } from "@/constants/types";
import { Card, CardHeader, Image, Link } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export default function SearchRepoCard({
  repos,
  setRepo,
}: {
  repos: RepoType[];
  setRepo: Dispatch<SetStateAction<RepoType | undefined>>;
}) {
  return (
    <div className="overflow-y-scroll h-96">
      {repos &&
        repos.length > 0 &&
        repos.map((r, idx) => (
          <Card key={idx} className="m-auto my-4 w-11/12 cursor-pointer">
            <CardHeader onClick={() => setRepo(r)} className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{r.name}</p>
                <p className="text-small text-default-500">{r.html_url}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
