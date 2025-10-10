"use client";

import FormOption from "@/components/Forms/FormOption";
import Stars from "@/components/Stars";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { mockReviews } from "../../../mocks/reviews.mocks";

export default function ReviewTab() {
  const rating = 4.5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(mockReviews.length / 5);

  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div className="px-4">
      <section className="mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold">{rating}</span>
          <Stars rating={rating} size={24} />
        </div>
        <div className="flex items-center justify-between">
          <span>리뷰 {mockReviews.length}개</span>
          <FormOption
            className="min-w-28"
            options={["최신순", "평점순", "좋아요순"]}
          />
        </div>
      </section>
      <div className="flex flex-col gap-4">
        {mockReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <div className="mt-4 flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}
