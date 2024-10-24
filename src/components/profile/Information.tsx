"use client"

import { useState } from "react";
import { MdEdit } from "react-icons/md";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import EditProfile from "./EditProfile";
import { IUser } from "@/types/user"
import axios from 'axios'

Modal.setAppElement('#root');

export default function Information({ user, currentUser, navigation, setNavigation, setUser }: { user: IUser, currentUser: IUser, navigation: string, setNavigation: (value: string) => void, setUser: (value: IUser) => void }) {
  const tabs = ["Feed", "Posts", "Friends", "Users", "About"];
  const [profilePictureModalIsOpen, setProfilePictureIsOpen] = useState(false);
  const [editProfileModalIsOpen, setEditProfileIsOpen] = useState(false);
  const [followers, setFollowers] = useState<string[]>(user.followers as string[]);
  const [following, setFollowing] = useState<string[]>(user.following as string[]);

  const handleChangeNavigation = (tab: string) => {
    setNavigation(tab);
  }

  const openProfilePictureModal = () => setProfilePictureIsOpen(true);
  const closeProfilePictureModal = () => setProfilePictureIsOpen(false);

  const openEditProfileModal = () => setEditProfileIsOpen(true);
  const closeEditProfileModal = () => setEditProfileIsOpen(false);

  const handleFollowUser = async (username: string) => {
    try {
        const res = await axios.post(`/api/user/follow-user/${username}/${currentUser.username}`);
        if (res.status !== 200) {
            return;
        }
        setFollowers(res.data);
    } catch (err) {
        console.log(err);
    }
}

  return (
    <div className="bg-white rounded-lg">
      <div className="h-48 rounded-tl-lg rounded-tr-lg bg-[url('https://marketplace.canva.com/EAEmGBdkt5A/3/0/1600w/canva-blue-pink-photo-summer-facebook-cover-gy8LiIJTTGw.jpg')]">
      </div>
      <div className="sm:flex justify-between px-4 items-center">
        <div className="sm:flex gap-2">
          <div className="-mt-10 flex justify-center sm:block">
            <img onClick={openProfilePictureModal} src={user?.profilePicture} alt="" className="w-24 h-24 border rounded-full hover:cursor-pointer" />
          </div>
          <div className="mt-2">
            <div className="flex justify-center sm:block">
              <p className="font-semibold">
                {user?.name}
              </p>
            </div>
            <div className="flex gap-2 items-center justify-center sm:justify-start">
              <p className="text-secondary text-sm text-center hover:text-primary hover:cursor-pointer">
                {followers.length}
                {followers.length > 1 ? " Followers" : " Follower"}
              </p>
              <p className="text-secondary text-sm text-center hover:text-primary hover:cursor-pointer">
                {following.length} Following
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:start mt-3 sm:mt-0">
          {
            currentUser?.username === user?.username ? (
              <button onClick={openEditProfileModal} className="border  border-primary bg-primary py-1 px-2 text-white rounded hover:bg-white hover:text-primary flex items-center gap-2 justify-center">
                <MdEdit />
                Edit profile
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                <button onClick={() => handleFollowUser(user.username)} className="border border-primary bg-primary py-1 px-4 text-white rounded hover:bg-white hover:text-primary flex items-center gap-2 justify-center">
                  {followers.includes(currentUser.username) ? "Following" : "Follow"}
                </button>
                <button className="border border-secondary hover:border-primary bg-white py-1 px-2 text-secondary rounded hover:text-primary flex items-center gap-2 justify-center">
                  Message
                </button>
              </div>
            )
          }
        </div>
      </div>
      <div className="flex items-center gap-5 px-4 mt-5 border-t py-5 text-secondary font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleChangeNavigation(tab)}
            className={`${navigation === tab ? "border-b-2 border-primary text-primary" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* profile picture modal */}
      <Modal
        isOpen={profilePictureModalIsOpen}
        onRequestClose={closeProfilePictureModal}
        className="w-full mt-20 lg:mt-16 max-h-[calc(100vh-70px)] md:w-2/3 lg:w-[40%] mx-4 lg:mx-0 rounded-md bg-white"
        overlayClassName="fixed lg:mt-0 inset-0 bg-black bg-opacity-50 flex justify-center items-start lg:items-center"
      >
        <div>
          <div className="py-3 flex px-2 justify-end items-center">
            <button onClick={closeProfilePictureModal} className="text-secondary hover:text-black">
              <IoMdClose className="text-2xl" />
            </button>
          </div>
          <div className="px-2 overflow-y-auto">
            <img src={user?.profilePicture} alt="" className="w-full h-auto" />
          </div>
        </div>
      </Modal>

      {/* edit profile modal */}
      <EditProfile
        user={user}
        setUser={setUser}
        editProfileModalIsOpen={editProfileModalIsOpen}
        closeEditProfileModal={closeEditProfileModal}
        currentUser={currentUser}
      />

    </div >
  )
}
