"use client";

import Link from "next/link";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosSearch } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { usePathname } from "next/navigation";
import { GoBell } from "react-icons/go";
import Logo from '@/public/images/Logo.jpg';
import { useAppSelector } from "@/redux/store";

function Header() {
  const pathname = usePathname();
  const { currentUser } = useAppSelector((state) => state.user);

  console.log(currentUser?.name);

  return (
    currentUser && (
    <div className="z-50 flex justify-between items-center px-4 sm:px-8 h-16 w-screen bg-secondary fixed">
      <div className="w-1/6 h-full flex items-center">
        <Link href="/">
          <img src={Logo.src} alt="Logo" className="w-10 h-10" />
        </Link>
      </div>
      <div className="w-3/6 text-primary">
        <ul className="flex gap-2 md:hidden justify-center items-center">
          <li
            className={` ${pathname === "/" ? "bg-primary text-secondary" : ""
              }  hover:bg-primary hover:text-secondary rounded`}
          >
            <Link href="/" className="py-1 px-3 block">
              <IoHomeOutline />
            </Link>
          </li>
          <li
            className={`${pathname === "/messages" ? "bg-primary text-secondary" : ""
              }  hover:bg-primary hover:text-secondary rounded`}
          >
            <Link href="/messages" className="py-1 px-3 block">
              <FiMessageCircle />
            </Link>
          </li>
          <li
            className={` ${pathname === "/friends" ? "bg-primary text-secondary" : ""
              }  hover:bg-primary hover:text-secondary rounded`}
          >
            <Link href="/friends" className="px-3 py-1 block">
              <LiaUserFriendsSolid />
            </Link>
          </li>
        </ul>
        <ul className="md:flex gap-2 hidden justify-center items-center font-semibold">
          <li
            className={`p-1 ${pathname === "/" ? "bg-primary text-secondary" : ""
              }  hover:bg-primary hover:text-secondary rounded`}
          >
            <Link href="/" className="flex gap-2 items-center">
              <IoHomeOutline /> Home
            </Link>
          </li>
          <li
            className={`p-1 ${pathname === "/messages" ? "bg-primary text-secondary" : ""
              }  hover:bg-primary hover:text-secondary rounded`}
          >
            <Link href="/messages" className="flex gap-2 items-center">
              <FiMessageCircle /> Message
            </Link>
          </li>
          <li
            className={`p-1 ${pathname === "/friends" ? "bg-primary text-secondary" : ""
              }  hover:bg-primary hover:text-secondary rounded`}
          >
            <Link href="/friends" className="flex gap-2 items-center">
              <LiaUserFriendsSolid /> Friends
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-2/6 flex justify-between items-center">
        <form className="hidden md:flex items-stretch">
          <input
            type="text"
            placeholder="Search"
            className="py-1 border border-r-0 rounded-bl rounded-tl border-primary px-1 bg-transparent text-primary outline-none w-32 lg:w-40"
          />
          <button className="flex items-center rounded-br rounded-tr justify-center text-primary border border-primary md:px-2 lg:px-3 hover:bg-primary hover:text-secondary">
            <IoIosSearch />
          </button>
        </form>

        <div className="md:hidden">
          <button className="flex items-center justify-center text-primary border border-primary p-1 rounded-full hover:bg-primary hover:text-secondary">
            <IoIosSearch />
          </button>
        </div>

        <div className="flex gap-2 items-center justify-end">
          <div>
            <button className="font-semibold text-primary border border-primary rounded-full p-1 hover:bg-primary hover:text-secondary">
              <GoBell />
            </button>
          </div>
          <Menu as="div" className="relative">
            <div>
              <MenuButton className="relative flex rounded-full border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-white">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt="Profile Picture"
                  src={currentUser.profilePicture || Logo.src}
                  className="h-8 w-8 rounded-full"
                />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <Link
                  href={`/profile/${currentUser?.username}`}
                  className="w-full text-center block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Your Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="#"
                  className="w-full text-center block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Settings
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className="w-full block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Log out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
    )
  );
}

export default Header;
