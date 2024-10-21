"use client"

import About from '@/components/profile/About';
import Information from '@/components/profile/Information';
import axios from "axios";
import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import Friends from '@/components/profile/Friends';
import CreatePost from '@/components/home/CreatePost';
import { IUser } from '@/types/user';
import { IPost } from '@/types/post';
import { IEvent } from '@/types/event';
import Feed from '@/components/profile/Feed';

export default function Profile() {
  const [user, setUser] = useState<IUser>({
    name: "",
    username: "",
    email: "",
    profilePicture: "",
    followers: [],
    following: [],
    friends: [],
    blocked: [],
    birthday: "",
    birthdayVisibility: "",
    biography: "",
    livesIn: "",
    livesInVisibility: "",
    status: "",
    statusVisibility: "",
    work: "",
    workVisibility: "",
    createdAt: "",

  });
  const [posts, setPosts] = useState<IPost[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/post/get-posts/${username}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (res.status !== 200) {
          setError(res.data.message || "Something went wrong");
          return;
        }
        setError("");
        setPosts(res.data);
      } catch (err) {
        setError("An unexpected error occurred.");
        return;
      }
    };
    fetchPosts();
  }, [username]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`/api/event/get-events/${username}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (res.status !== 200) {
          setError(res.data.message || "Something went wrong");
          return;
        }
        setError("");
        setEvents(res.data);
      } catch (err) {
        setError("An unexpected error occurred.");
        return;
      }
    };
    fetchEvents();
  }, [username]);

  const combinedAndSortedItems = [...posts, ...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
        {
          currentUser?.username === username && (
            <CreatePost
              currentUser={currentUser}
            />
          )
        }
        <Feed
        combinedAndSortedItems={combinedAndSortedItems}
        currentUser={currentUser}
        />
      </div>
      <div className="hidden md:block md:w-1/3">
        <About user={user} currentUser={currentUser} />
        <Friends />
      </div>
    </div>
  )
}