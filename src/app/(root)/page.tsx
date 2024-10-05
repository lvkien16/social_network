"use client"

import Information from "@/components/home/Information.component";
import Newsfeed from "@/components/home/Newsfeed.component";

export default function Home() {
  return (
    <>
      <div className="flex gap-10">
        <div className="bg-white w-1/4 h-screen rounded-lg">
          <Information />
        </div>
        <div className="bg-white w-1/2">
          <Newsfeed />
        </div>
        <div className="bg-white w-1/4">c</div>
      </div>
    </>
  );
}
