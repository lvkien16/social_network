"use client"

import React, { useState } from 'react'
import axios from "axios"
import Link from "next/link";
import { useFormattedDate } from "@/hooks/userFormattedDate";
import { PiChatCircleThin, PiShareFatThin } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import { CiHeart, CiPaperplane } from "react-icons/ci";
import { FaCaretRight } from "react-icons/fa";
import { IPost } from '@/types/post';
import { IUser } from '@/types/user';
import { IoMdHeart } from "react-icons/io";

export default function Post({post, currentUser}: {post: IPost, currentUser: IUser}) {
    const [likes, setLikes] = useState<string[]>(post.likes as string[]);
    const formatDate = useFormattedDate();

    const handleLikePost = async (postId: string) => {
        try {
            const res = await axios.post(`/api/post/like-post/${postId}/${currentUser.username}`);
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
                    <img src={post.profilePicture} alt="Profile Picture" className="h-10 w-10 object-cover rounded-full" />
                    <FaCaretRight />
                    <div>
                        <div className="flex items-center">
                            <Link href={`/profile/${post.owner}`} className="font-semibold hover:text-primary">{post.name}</Link>
                            <LuDot className="text-sm" />
                            <p className="text-sm">{post.visibility.charAt(0).toUpperCase() + post.visibility.slice(1)}</p>
                        </div>
                        <p className="text-xs">{formatDate(post.createdAt as string)}</p>
                    </div>
                </div>
                <div>
                    <button type="button" className="p-2 hover:bg-third rounded">
                        <IoIosMore />
                    </button>
                </div>
            </div>

            <div className="gap-5 items-center mt-2 pb-4">
                <p className="pb-3 text-md text-secondary">{post.content}</p>
                {
                    post.images.map((image: string, index: number) => (
                        <img key={index} src={image} alt="Image" className="w-full h-[350px] object-cover rounded" />
                    ))
                }

            </div>
            <div className="flex justify-between border-y">
            <button type="button" onClick={() => handleLikePost(post._id)} className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
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
