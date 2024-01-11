import { Github } from "@/components/Github";
import LeetcodeModal from "@/components/LeetcodeModal";
import PushButton from "@/components/PushButton";

const User = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-10">
      <LeetcodeModal />
      <Github />
      <PushButton />
    </div>
  );
};

export default User;
