"use client"

import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { IComment } from '@/types/comment';
import Link from "next/link";
import { IUser } from '@/types/user';
import { BsFillSendFill } from "react-icons/bs";
import { useHandleCommentEvent } from "@/hooks/useEventActions";

export default function Comment({ eventId, comment, currentUser, setComments, comments }: { eventId: string, comment: IComment, currentUser: IUser, setComments: Dispatch<SetStateAction<IComment[]>>, comments: IComment[] }) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyingForm, setReplyingForm] = useState<string>("");

  const openReplying = () => setIsReplying(!isReplying);

  const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await useHandleCommentEvent(eventId, currentUser.username, replyingForm, comment._id, currentUser.profilePicture, currentUser.name);
    setReplyingForm("");
    setComments([result, ...comments]);
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyingForm(e.target.value);
  };

  return (
    <>
      <div className="flex gap-3 mb-2">
        <img src={comment.profilePicture} alt="" className="w-6 h-6 border rounded-full" />
        <div>
          <div className="bg-third pb-2 pt-1 rounded min-w-[220px] px-2">
            <Link href={`/profile/${comment.username}`} className="font-semibold hover:text-primary">{comment.name}</Link>
            <p>{comment.comment}</p>
          </div>
          <div className="mt-1 text-sm flex font-semibold justify-between">
            <button className="hover:text-primary">Like(0)</button>
            <button type="button" onClick={openReplying} className="hover:text-primary">{isReplying ? "Replying" : "Reply"}</button>
            <button className="hover:text-primary">Show 2 replies</button>
          </div>
        </div>
      </div>
      {
        isReplying && (
          <div className="mb-8">
            <form onSubmit={handleSendComment} className="flex">
              <img src={currentUser.profilePicture} alt="" className="items-center w-10 h-10 rounded-full border mr-3" />
              <textarea required rows={1} name="comment" onChange={handleChange} value={replyingForm} placeholder="Add a comment..." className="flex items-center resize-none w-full outline-none px-2 bg-third text-secondary border rounded-l border-r-0" />
              <button type="submit" className="px-3 py-1 bg-third text-secondary rounded-r hover:bg-third hover:text-primary">
                <BsFillSendFill />
              </button>
            </form>
          </div>
        )
      }
    </>
  )
}
