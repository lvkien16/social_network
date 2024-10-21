"use client"

import React from 'react'
import { useFormattedDate } from "@/hooks/userFormattedDate";
import Link from "next/link";
import { CiLocationOn, CiHeart, CiCalendarDate, CiPaperplane } from "react-icons/ci";
import { FaCaretRight } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { IoIosMore } from "react-icons/io";
import { PiChatCircleThin, PiShareFatThin } from "react-icons/pi";
import { IUser } from '@/types/user';
import axios from "axios"
import Event from '@/components/profile/Event'

export default function Feed({ combinedAndSortedItems, currentUser }: { combinedAndSortedItems: any, currentUser: IUser }) {
    const formatDate = useFormattedDate();

    
    return (
        <div>
            {combinedAndSortedItems.map((item: any) => (
                <div key={item._id} >
                    {item.content ? (
                        <div className='my-4 lg:my-8'>
                            <div className="bg-white rounded-lg p-5 pb-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={item.profilePicture} alt="Profile Picture" className="h-10 w-10 object-cover rounded-full" />
                                        <FaCaretRight />
                                        <div>
                                            <div className="flex items-center">
                                                <Link href={`/profile/${item.owner}`} className="font-semibold hover:text-primary">{item.name}</Link>
                                                <LuDot className="text-sm" />
                                                <p className="text-sm">{item.visibility.charAt(0).toUpperCase() + item.visibility.slice(1)}</p>
                                            </div>
                                            <p className="text-xs">{formatDate(item.createdAt as string)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button" className="p-2 hover:bg-third rounded">
                                            <IoIosMore />
                                        </button>
                                    </div>
                                </div>

                                <div className="gap-5 items-center mt-2 pb-4">
                                    <p className="pb-3 text-md text-secondary">{item.content}</p>
                                    {
                                        item.images.map((image: string, index: number) => (
                                            <img key={index} src={image} alt="Image" className="w-full h-[350px] object-cover rounded" />
                                        ))
                                    }
                                    
                                </div>
                                <div className="flex justify-between border-y">
                                    <div className="py-3 flex gap-1 items-center w-1/4 justify-center hover:bg-third cursor-pointer text-secondary hover:text-primary">
                                        <CiHeart />
                                        <p>Like</p>
                                        <p>({item.likes.length})</p>
                                    </div>
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
                        </div>
                    ) : (
                        <div className='mt-4 lg:mt-8'>
                            <Event event={item} currentUser={currentUser} />
                        </div>
                    )}
                </div>
            ))}
        </div>

    )
}
