import { Button } from "flowbite-react";

type BasicBtnProps = {
  text: string;
  onClick: () => void;
};

export default function BasicBtn({ text, onClick }: BasicBtnProps) {
  return (
    <Button className="!btn-primary" onClick={onClick}>
      {text}
    </Button>
  );
}
