"use client"

import Information from "@/components/home/Information.component";
import Newsfeed from "@/components/home/Newsfeed.component";
import WhoToFollow from "@/components/home/WhoToFollow.component";

export default function Home() {
  return (
    <>
      <div className="flex gap-4 xl:gap-8">
        <div className="bg-white hidden lg:block w-3/12 h-screen rounded-lg">
          <Information />
        </div>
        <div className="w-full md:w-8/12 lg:w-6/12">
          <Newsfeed />
        </div>
        <div className="bg-white hidden md:block lg:w-3/12 w-4/12 ">
          <WhoToFollow />
        </div>
      </div>
    </>
  );
}
