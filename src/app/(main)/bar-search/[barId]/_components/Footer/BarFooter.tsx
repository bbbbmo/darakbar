"use client";

import { TabItem, Tabs, TabsRef } from "flowbite-react";
import { useRef } from "react";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";
import ReviewTab from "./Review/ReviewTab";
import PhotoTab from "./PhotoTab";
import FeedbackTab from "./FeedbackTab";

export default function BarFooter() {
  const tabsRef = useRef<TabsRef>(null);

  return (
    <Tabs
      aria-label="Default tabs"
      ref={tabsRef}
      className="border-neutral-600"
      theme={basicTheme.tabs}
      variant="fullWidth"
    >
      <TabItem active title="리뷰">
        <ReviewTab />
      </TabItem>
      <TabItem title="사진">
        <PhotoTab />
      </TabItem>
      <TabItem title="피드백">
        <FeedbackTab />
      </TabItem>
    </Tabs>
  );
}
