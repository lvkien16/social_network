"use client"

import { useState, ChangeEvent, useEffect } from 'react';
import { IEvent } from '@/types/event';
import { IUser } from '@/types/user';
import { FaCaretRight } from "react-icons/fa";
import { CiLocationOn, CiHeart, CiCalendarDate, CiPaperplane } from "react-icons/ci";
import { PiChatCircleThin, PiShareFatThin, PiUsersThin } from "react-icons/pi";
import Link from "next/link";
import { LuDot } from "react-icons/lu";
import { useFormattedDate } from "@/hooks/userFormattedDate";
import { IoIosMore } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useHandleLikeEvent, useHandleFollowEvent, useHandleCommentEvent } from "@/hooks/useEventActions";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import Comment from "@/components/profile/Comment";
import { IComment } from '@/types/comment';

export default function Event({ event, currentUser }: { event: IEvent, currentUser: IUser }) {
    const [followers, setFollowers] = useState<string[]>(event.followers as string[]);
    const [likes, setLikes] = useState<string[]>(event.likes as string[]);
    const [commentForm, setCommentForm] = useState<string>("");
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentModalIsOpen, setCommentModalIsOpen] = useState<boolean>(false);
    const formatDate = useFormattedDate();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/api/eventcomment/get-comment/${event._id}`);
                if (res.status !== 200) {
                    return;
                }
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchComments();
    }, [event]);

    const handleFollowEvent = async (eventId: string) => {
        const result = await useHandleFollowEvent(eventId, currentUser.username);
        setFollowers(result);
    }

    const handleLikeEvent = async (eventId: string) => {
        const result = await useHandleLikeEvent(eventId, currentUser.username);
        setLikes(result);
    }

    const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await useHandleCommentEvent(event._id, currentUser.username, commentForm, "", currentUser.profilePicture, currentUser.name);
        setCommentForm("");
        setComments([result, ...comments]);
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentForm(e.target.value);
    };

    const openCommentModal = () => setCommentModalIsOpen(true);
    const closeCommentModal = () => setCommentModalIsOpen(false);

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
                <button type="button" onClick={openCommentModal} className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
                    <PiChatCircleThin />
                    <p>Comment</p>
                </button>
                <div className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
                    <PiShareFatThin />
                    <p>Share</p>
                </div>
                <div className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
                    <CiPaperplane />
                    <p>Send</p>
                </div>
            </div>
            <div className="py-5">
                <form onSubmit={handleSendComment} className="flex">
                    <img src={currentUser.profilePicture} alt="" className="items-center w-10 h-10 rounded-full border mr-3" />
                    <textarea required rows={1} name="comment" onChange={handleChange} value={commentForm} placeholder="Add a comment..." className="flex items-center resize-none w-full outline-none px-2 bg-third text-secondary border rounded-l border-r-0" />
                    <button type="submit" className="px-3 py-1 bg-third text-secondary rounded-r hover:bg-third hover:text-primary">
                        <BsFillSendFill />
                    </button>
                </form>
            </div>


            <Modal
                isOpen={commentModalIsOpen}
                onRequestClose={closeCommentModal}
                className="w-full mx-4 md:px-0 md:w-2/3 lg:w-1/2 rounded-md bg-white z-50"
                overlayClassName="fixed mt-0 z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="h-[95vh] relative">

                    <div className="py-5 bg-white fixed w-full md:w-2/3 lg:w-1/2 border-b flex px-2 justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Comments</h2>
                        <button onClick={closeCommentModal} className="text-secondary hover:text-black">
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>
                    <div className="h-[calc(95vh-50px)] pt-[68px] overflow-y-auto">
                        <div className="flex gap-5 border-b items-center mt-2 pb-4 px-2">
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
                        <div className="px-2">
                            <p className="py-2 text-secondary text-md font-semibold">{comments.length} Comments </p>
                            <div>
                                {
                                    comments.map((comment) => (
                                        comment.replyingTo === "" && (
                                            <div key={comment._id} className="mb-8">
                                                <Comment
                                                    eventId={event._id}
                                                    comment={comment}
                                                    currentUser={currentUser}
                                                    setComments={setComments}
                                                    comments={comments}
                                                />
                                            </div>
                                        )
                                    ))
                                }

                            </div>
                        </div>
                        <div className="py-1 absolute bottom-0 w-full px-2">
                            <form onSubmit={handleSendComment} className="flex">
                                <img src={currentUser.profilePicture} alt="" className="items-center w-10 h-10 rounded-full border mr-3" />
                                <textarea required rows={1} name="comment" onChange={handleChange} value={commentForm} placeholder="Add a comment..." className="flex items-center resize-none w-full outline-none px-2 bg-third text-secondary border rounded-l border-r-0" />
                                <button type="submit" className="px-3 py-1 bg-third text-secondary rounded-r hover:bg-third hover:text-primary">
                                    <BsFillSendFill />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal >
        </div>
    )
}
