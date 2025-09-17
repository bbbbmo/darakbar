import SubTitleText from "@/components/SubTitleText";
import { Button, Card } from "flowbite-react";
import { HiOutlineCamera, HiOutlineUpload } from "react-icons/hi";

export default function MenuFeedbackCard() {
  return (
    <Card className="flex flex-col items-center border-neutral-600 bg-neutral-800 py-8">
      <div className="flex w-full justify-center">
        <HiOutlineCamera size={40} className="text-gray-400" />
      </div>
      <SubTitleText
        title="메뉴가 최신이 아닌가요?"
        className="w-full justify-center text-center"
      />
      <p className="mt-4 flex flex-col gap-2 text-gray-400">
        <span>최신 메뉴판을 업로드해서 다른 사용자들에게 도움을 주세요</span>
      </p>
      <div className="flex w-full justify-center">
        <Button className="flex w-40 items-center gap-2">
          <HiOutlineUpload size={20} />
          메뉴판 업로드
        </Button>
      </div>
    </Card>
  );
}
