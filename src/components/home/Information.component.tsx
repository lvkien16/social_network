"use client";

import { useAppSelector } from "@/redux/store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdEdit } from "react-icons/md";

export default function Information() {
  const {currentUser} = useAppSelector(state => state.user);
  return (
    <>
      <div className="flex justify-center pt-2">
        <Menu as="div" className="relative">
          <div>
            <div className="relative flex rounded-full border">
              <img
                alt="Profile picture"
                src={currentUser.profilePicture}
                className="w-16 h-16"
              />
            </div>
          </div>
        </Menu>
      </div>
      <div className="flex justify-center py-3">
        <span className="font-semibold">{currentUser.name}</span>
      </div>
      <div className="flex justify-between pb-3 text-secondary">
        <button className="text-sm w-1/3">
          <p>{currentUser.following?.length || 0}</p>
          <p>Following</p>
        </button>
        <button className="text-sm w-1/3 border-x">
          <p>{currentUser.followers?.length || 0}</p>
          <p>
            {currentUser.followers && currentUser.followers?.length > 1
              ? "Followers"
              : "Follower"}
          </p>
        </button>
        <button className="text-sm w-1/3">
          <p>1</p>
          <p>Post</p>
        </button>
      </div>
      <hr/>
    </>
  );
}
