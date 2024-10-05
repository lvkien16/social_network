"use client";

import Link from "next/link";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosSearch } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { usePathname } from "next/navigation";
import { GoBell } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import Logo from '@/public/images/Logo.jpg';
import { useAppSelector } from "@/redux/store";

function Header() {
  const pathname = usePathname();
  const { currentUser } = useAppSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isClearSearchInput, setIsClearSearchInput] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchInput("");
  }

  useEffect(() => {
    setIsClearSearchInput(searchInput.length > 0);
  }, [searchInput]);

  return (
    currentUser && (
      <div className="z-50 flex justify-between items-center px-4 xl:px-44 h-16 w-screen bg-white fixed shadow">
        <div className="w-2/6 h-full flex items-center gap-3 lg:gap-3">
          <Link href="/">
            <img src={Logo.src} alt="Logo" className="w-8 lg:w-10 h-8 lg:h-10" />
          </Link>
          <form className="hidden md:flex items-stretch relative">
            <input
            onChange={handleChange}
            value={searchInput}
              type="text"
              name="search"
              placeholder="Search..."
              className="py-1 border px-8 rounded bg-third outline-none w-36 lg:w-56"
            />
            <button type="submit" className="absolute top-0 bottom-0 flex items-center rounded-br rounded-tr justify-center text-secondary px-2 hover:text-black">
              <IoIosSearch />
            </button>
            {isClearSearchInput && 
            (
              <span onClick={handleClearSearchInput} className="absolute top-0 bottom-0 right-0 flex items-center justify-center text-secondary px-2 hover:text-black">
              <IoMdClose />
            </span>
            )
            }
          </form>

          <div className="md:hidden">
            <button className="flex items-center bg-third justify-center text-secondary border py-1 px-2 rounded hover:text-black">
              <IoIosSearch />
            </button>
          </div>
        </div>

        <div className="w-2/6 lg:w-3/6 text-secondary">
          <ul className="flex gap-2 sm:hidden justify-center items-center">
            <li
              className={` ${pathname === "/" ? "bg-primary text-white" : ""
                }  hover:bg-primary hover:text-white rounded`}
            >
              <Link href="/" className="py-1 px-3 block">
                <IoHomeOutline />
              </Link>
            </li>
            <li
              className={`${pathname === "/messages" ? "bg-primary text-white" : ""
                }  hover:bg-primary hover:text-white rounded`}
            >
              <Link href="/messages" className="py-1 px-3 block">
                <FiMessageCircle />
              </Link>
            </li>
            <li
              className={` ${pathname === "/friends" ? "bg-primary text-white" : ""
                }  hover:bg-primary hover:text-white rounded`}
            >
              <Link href="/friends" className="px-3 py-1 block">
                <LiaUserFriendsSolid />
              </Link>
            </li>
          </ul>
          <ul className="sm:flex gap-2 hidden justify-center items-center font-semibold">
            <li
              className={`p-1 ${pathname === "/" ? "bg-primary text-white" : ""
                }  hover:bg-primary hover:text-white rounded`}
            >
              <Link href="/" className="flex gap-2 items-center">
                <IoHomeOutline /> Home
              </Link>
            </li>
            <li
              className={`p-1 ${pathname === "/messages" ? "bg-primary text-white" : ""
                }  hover:bg-primary hover:text-white rounded`}
            >
              <Link href="/messages" className="flex gap-2 items-center">
                <FiMessageCircle /> Message
              </Link>
            </li>
            <li
              className={`p-1 ${pathname === "/friends" ? "bg-primary text-white" : ""
                }  hover:bg-primary hover:text-white rounded`}
            >
              <Link href="/friends" className="flex gap-2 items-center">
                <LiaUserFriendsSolid /> Friends
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-2/6 lg:w-1/6 flex justify-end items-center">
          <div className="flex gap-2 lg:gap-5 items-center justify-end">
            <div className="relative">
              <button className="bg-third font-semibold text-secondary border rounded py-1 px-2 lg:p-2 hover:text-black">
                <GoBell />
              </button>
              <GoDotFill className="absolute -top-1 text-red-500 -right-1" />
            </div>
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="relative flex rounded border text-sm focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="Profile Picture"
                    src={currentUser.profilePicture || Logo.src}
                    className="h-8 lg:w-10 w-8 lg:h-10 rounded-full"
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
