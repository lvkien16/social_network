"use client"

import { IoPersonRemoveSharp } from "react-icons/io5";
import { BiSolidMessageRounded } from "react-icons/bi";

export default function Friends() {
    return (
        <div className="bg-white rounded-lg mt-4 lg:mt-8 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Friends</h2>
                    <span className="secondary text-sm bg-third px-1 rounded">250</span>
                </div>
                <a href="/friends" className="text-secondary hover:text-primary hover:underline">
                    See all friends
                </a>
            </div>
            <div className="flex flex-wrap justify-between mt-3">
                <div className="w-[48%]">
                    <div className="border p-4 rounded-lg">
                        <div className="flex justify-center">
                            <img src="https://themes.stackbros.in/social_r/assets/03-UJBpqOsq.jpg" alt="" className="rounded-full w-14 h-14 lg:w-24 lg:h-24" />
                        </div>
                        <p className="mt-2 text-sm lg:text-base font-semibold text-center">
                            Lo Van Kien
                        </p>
                        <p className="text-xs lg:text-sm text-secondary text-center mt-1">5 mutual friends</p>
                        <div className="mt-2 flex justify-center gap-1 lg:gap-2">
                        <button className="bg-red-500 rounded text-sm lg:text-base py-1 px-3 lg:px-4 border text-white hover:text-primary hover:bg-white">
                        <IoPersonRemoveSharp />
                        </button>
                            <button className="bg-primary rounded text-sm lg:text-base py-1 px-3 lg:px-4 border text-white hover:text-primary hover:bg-white">
                            <BiSolidMessageRounded />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-[48%]">
                    <div className="border p-4 rounded-lg">
                        <div className="flex justify-center">
                            <img src="https://themes.stackbros.in/social_r/assets/03-UJBpqOsq.jpg" alt="" className="rounded-full w-14 h-14 lg:w-24 lg:h-24" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
