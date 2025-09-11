import { Badge } from "flowbite-react";

type TagsProps = {
  tags: string[];
};

export default function Tags({ tags }: TagsProps) {
  const colors = [
    "failure",
    "indigo",
    "success",
    "warning",
    "info",
    "Dark",
    "pink",
    "purple",
  ];

  return (
    <div className="flex flex-row gap-2">
      {tags.map((tag: string, index: number) => {
        const color = colors[index % colors.length];
        return (
          <Badge key={tag} color={color}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}
