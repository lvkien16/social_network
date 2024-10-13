"use client";

import { CiHeart, CiLocationOn, CiMail } from "react-icons/ci";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { PiBagSimpleLight } from "react-icons/pi";
import { useFormattedDate } from "@/hooks/userFormattedDate";

interface IUser {
  username: string;
  name: string;
  friends: string[];
  followers: string[];
  following: string[];
  profilePicture: string;
  email: string;
  biography?: string;
  createdAt: string;
  birthday?: string;
  livesIn?: string;
  status?: string;
  work?: string;
  blocked?: string[];
  hiddenInfo?: string[]
}

export default function About({ user, currentUser }: { user: IUser, currentUser: IUser }) {
  const formatDate = useFormattedDate();

  return (
    <>
      <div className="p-4 bg-white rounded-lg">
        <div>
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-secondary">{!user.biography && user?.username === currentUser?.username ? "No bio yet" : user.biography}</p>
          <div className="mt-3">
            <div className="flex items-center gap-1 text-secondary">
              <LiaBirthdayCakeSolid />
              <span className="text-sm">Birthday:</span>
              <span className="font-semibold text-sm">
                {user?.username === currentUser?.username && user?.birthday ? (
                  formatDate(user.birthday as string)
                ) : (
                  user?.username !== currentUser?.username && (!user?.birthday || user?.hiddenInfo?.includes("birthday")) ? (
                    "Hidden"
                  ) : (
                    user?.birthday ? formatDate(user.birthday as string) : ""
                  )
                )}
              </span>

            </div>
            <div className="">
              <div className="flex items-center gap-1 text-secondary mt-1">
                <CiHeart />
                <span className="text-sm">Status:</span>
                <span className="font-semibold text-sm">
                  {user?.username === currentUser?.username && user?.status ? (
                    user.status
                  ) : (
                    user?.username !== currentUser?.username && (!user?.status || user?.hiddenInfo?.includes("status")) ? (
                      "Hidden"
                    ) : (
                      user.status
                    )
                  )}
                </span>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-1 text-secondary mt-1">
                <PiBagSimpleLight />
                <span className="text-sm">Work:</span>
                <span className="font-semibold text-sm">
                  {user?.username === currentUser?.username && user?.work ? (
                    user.work
                  ) : (
                    user?.username !== currentUser?.username && (!user?.work || user?.hiddenInfo?.includes("work")) ? (
                      "Hidden"
                    ) : (
                      user.work
                    )
                  )}
                </span>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-1 text-secondary mt-1">
                <CiLocationOn />
                <span className="text-sm">Joined on:</span>
                <span className="font-semibold text-sm">
                  {user?.username === currentUser?.username && user?.createdAt ? (
                    formatDate(user.createdAt)
                  ) : (
                    user?.username !== currentUser?.username && (!user?.createdAt || user?.hiddenInfo?.includes("createdAt")) ? (
                      "Hidden"
                    ) : (
                      formatDate(user.createdAt as string)
                    )
                  )}
                </span>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-1 text-secondary mt-1">
                <CiLocationOn />
                <span className="text-sm">Lives in:</span>
                <span className="font-semibold text-sm">
                  {user?.username === currentUser?.username && user?.livesIn ? (
                    user.livesIn
                  ) : (
                    user?.username !== currentUser?.username && (!user?.livesIn || user?.hiddenInfo?.includes("livesIn")) ? (
                      "Hidden"
                    ) : (
                      user.livesIn
                    )
                  )}
                </span>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-1 text-secondary mt-1">
                <CiMail />
                <span className="text-sm">Email:</span>
                <span className="font-semibold text-sm">
                  {user?.username === currentUser?.username && user?.email ? (
                    user.email
                  ) : (
                    user?.username !== currentUser?.username && (!user?.email || user?.hiddenInfo?.includes("email")) ? (
                      "Hidden"
                    ) : (
                      user.email
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
