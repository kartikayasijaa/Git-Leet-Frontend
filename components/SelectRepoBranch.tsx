import { getBranch, updateRepo } from "@/app/(user)/actions";
import { BranchType, RepoType } from "@/constants/types";
import useSession from "@/hooks/useSession";
import { Button, ButtonGroup, Card, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function SelectRepoBranch({
  repo,
  onClose,
}: {
  repo: RepoType;
  onClose: () => void;
}) {
  const {
    accessToken,
    user: { github_username, userId },
    setGithub,
  } = useSession();
  const [branches, setBranches] = useState<BranchType[]>([]);
  const [selectedBranch, setSelectBranch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (selectedBranch.length === 0) return;
    setLoading(true);
    try {
      const r = await updateRepo(
        userId,
        accessToken,
        repo.name,
        selectedBranch
      );
      setGithub(r.github_repo);
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getBranch({ accessToken, github_username, repo });
        setBranches(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [repo]);

  return (
    <div className="flex flex-col justify-center gap-12 relative">
      <div className="flex justify-center items-center my-8 mt-10">
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">{repo.name}</p>
              <p className="text-small text-default-500">{repo.html_url}</p>
            </div>
          </CardHeader>
        </Card>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectBranch(e.target.value)}
          className="w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select Branch</option>
          {branches &&
            branches.map((b, idx) => (
              <option key={idx} value={b.name}>
                {b.name}
              </option>
            ))}
        </select>
      </div>

      <div className="absolute bottom-[-120px] right-4 flex gap-2">
        <Button
          color={`danger`}
          variant={`faded`}
          onClick={onClose}
          size="md"
          className="w-28"
        >
          Cancel
        </Button>
        <Button
          color="success"
          onClick={handleConnect}
          size="md"
          className="w-28"
          isLoading={loading}
        >
          Connect
        </Button>
      </div>
    </div>
  );
}
