"use client"

import { useState } from 'react';
import { IEvent } from '@/types/event';
import { IUser } from '@/types/user';
import { FaCaretRight } from "react-icons/fa";
import { CiLocationOn, CiHeart, CiCalendarDate, CiPaperplane } from "react-icons/ci";
import { PiChatCircleThin, PiShareFatThin, PiUsersThin } from "react-icons/pi";
import Link from "next/link";
import { LuDot } from "react-icons/lu";
import { useFormattedDate } from "@/hooks/userFormattedDate";
import { IoIosMore } from "react-icons/io";
import axios from "axios"
import { IoMdHeart } from "react-icons/io";

export default function Event({ event, currentUser }: { event: IEvent, currentUser: IUser }) {
    const [followers, setFollowers] = useState<string[]>(event.followers as string[]);
    const [likes, setLikes] = useState<string[]>(event.likes as string[]);
    const formatDate = useFormattedDate();

    const handleFollowEvent = async (eventId: string) => {
        try {
            const res = await axios.post(`/api/event/follow-event/${eventId}/${currentUser.username}`);
            if (res.status !== 200) {
                return;
            }
            setFollowers(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleLikeEvent = async (eventId: string) => {
        try {
            const res = await axios.post(`/api/event/like-event/${eventId}/${currentUser.username}`);
            if (res.status !== 200) {
                return;
            }
            setLikes(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-white rounded-lg p-5 pb-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={event.profilePicture} alt="Profile Picture" className="h-10 w-10 object-cover rounded-full" />
                    <FaCaretRight />
                    <div>
                        <div className="flex items-center">
                            <Link href={`/profile/${event.owner}`} className="font-semibold hover:text-primary">{event.name}</Link>
                            <LuDot className="text-sm" />
                            <p className="text-sm">{event.attendees.charAt(0).toUpperCase() + event.attendees.slice(1)}</p>
                        </div>
                        <p className="text-xs">{formatDate(event.createdAt as string)}</p>
                    </div>
                </div>
                <div>
                    <button type="button" className="p-2 hover:bg-third rounded">
                        <IoIosMore />
                    </button>
                </div>
            </div>

            <div className="flex gap-5 items-center mt-2 pb-4">
                <img src={event.image} alt="" className='w-[150px] h-[150px] rounded-lg object-cover' />
                <div>
                    <Link href={`/event/${event._id}`} className="font-bold text-xl hover:text-primary">{event.title}</Link>
                    <div className="flex my-2 items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                            <CiCalendarDate />
                            <span>
                                {formatDate(event.date as string)}
                            </span>
                            <span>
                                {event.time as string}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CiLocationOn />
                            <span>
                                {event.location}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <PiUsersThin />
                            <span>
                                {followers.length}
                            </span>
                        </div>
                    </div>
                    {
                        currentUser?.username !== event.owner && (
                            <>
                                {
                                    followers.includes(currentUser.username) ? (
                                        <div>
                                            <button onClick={() => handleFollowEvent(event._id)} type="button" className="px-3 py-1 border bg-primary text-white rounded hover:bg-white hover:text-primary border-primary">Following</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button onClick={() => handleFollowEvent(event._id)} type="button" className="px-3 py-1 border bg-primary text-white rounded hover:bg-white hover:text-primary border-primary">Follow</button>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            <div className="flex justify-between border-y">
                <button type="button" onClick={() => handleLikeEvent(event._id)} className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
                    {likes.includes(currentUser.username) ? (
                        <>
                            <IoMdHeart className="text-pink-500" />
                            <p>Liked</p>
                        </>
                    ) : (
                        <>
                            <CiHeart />
                            <p>Like</p>
                        </>
                    )}
                    <p>({likes.length})</p>
                </button>
                <div className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
                    <PiChatCircleThin />
                    <p>Comment</p>
                </div>
                <div className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
                    <PiShareFatThin />
                    <p>Share</p>
                </div>
                <div className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
                    <CiPaperplane />
                    <p>Send</p>
                </div>
            </div>
        </div>
    )
}
