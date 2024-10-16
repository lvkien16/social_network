"use client"

import About from '@/components/profile/About'
import Information from '@/components/profile/Information'
import axios from "axios";
import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import Friends from '@/components/profile/Friends';

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

export default function Profile() {
  const [user, setUser] = useState<IUser>({
    username: "",
    name: "",
    friends: [],
    followers: [],
    following: [],
    profilePicture: "",
    email: "",
    biography: "",
    createdAt: "",
    birthday: "",
    livesIn: "",
    status: "",
    work: "",
    blocked: [],
    hiddenInfo: [],
  });
  const [error, setError] = useState<string>("");
  const { username } = useParams() as { username: string };
  const { currentUser } = useAppSelector((state => state.user));
  const [navigation, setNavigation] = useState<string>("Feed");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/get-user/${username}/${currentUser.username}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status !== 200) {
          setError(res.data.message || "Something went wrong");
          return;
        }

        setError("");
        setUser(res.data);


      } catch (err) {
        setError("An unexpected error occurred.");
        return;
      }
    }
    fetchUser();

  }, [username]);

  return (
    <div className="flex gap-4 xl:gap-8">
      <div className="w-full md:w-2/3">
        <Information
          user={user}
          setUser={setUser}
          currentUser={currentUser}
          navigation={navigation}
          setNavigation={setNavigation}
        />
      </div>
      <div className="hidden md:block md:w-1/3">
        <About user={user} currentUser={currentUser} />
        <Friends />
      </div>
    </div>
  )
}