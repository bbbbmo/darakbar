"use client";

import Stars from "@/components/Stars";
import Tags from "@/components/Tags";
import { Avatar, Card } from "flowbite-react";
import Image from "next/image";
import { BiLike } from "react-icons/bi";

export type Review = {
  id: number;
  userName: string;
  profileImageUrl: string | null;
  visitDate: string;
  rating: number;
  comment: string;
  createdAt: string;
  likeCount: number;
  imageUrl: string | null;
  tags: string[];
};

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="border-neutral-600 bg-neutral-800 py-4">
      <Avatar img={review.profileImageUrl || ""} rounded>
        <div className="space-y-1 font-medium dark:text-white">
          <div>{review.userName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Stars rating={review.rating} />
            <span>{review.visitDate} 방문</span>
          </div>
        </div>
      </Avatar>
      <p>{review.comment}</p>
      {review.imageUrl && (
        <Image
          src={review.imageUrl}
          alt={review.userName}
          width={100}
          height={100}
        />
      )}
      <Tags tags={review.tags} />
      <div>
        <span>
          <BiLike size={16} />
          {review.likeCount}개
        </span>
        <span>{review.createdAt}</span>
        span
      </div>
    </Card>
  );
}
