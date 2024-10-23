"use client"

import Information from "@/components/home/Information";
import Newsfeed from "@/components/home/Newsfeed";
import WhoToFollow from "@/components/home/WhoToFollow";


export default function Home() {

  return (
    <>
      <div className="flex gap-4 xl:gap-8">
        <div className="bg-white hidden lg:block w-3/12 h-screen rounded-lg">
          {/* change to group or fanpage */}
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
