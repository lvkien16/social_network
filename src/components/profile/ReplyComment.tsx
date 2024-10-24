"use client"

import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { IComment } from '@/types/comment';
import { IUser } from '@/types/user';
import Link from "next/link";
import { useHandleCommentEvent, useLikeCommentEvent } from "@/hooks/useEventActions";
import { BsFillSendFill } from "react-icons/bs";

export default function ReplyComment(
  {
  replyingComment,
  currentUser,
  eventId,
  comment,
  comments,
  setComments,
  setReplyingComments,
  replyingComments
}: {
  replyingComment: IComment,
  currentUser: IUser,
  eventId: string,
  comment: IComment,
  comments: IComment[],
  setComments: Dispatch<SetStateAction<IComment[]>>,
  setReplyingComments: Dispatch<SetStateAction<IComment[]>>,
  replyingComments: IComment[]}
) {
  const [replyingReplyId, setReplyingReplyId] = useState<string | null>(null);
  const [replyingReply, setReplyingReply] = useState<string>("");
  const [likesOfCommentReply, setLikesOfCommentReply] = useState<string[]>(replyingComment.likes as string[]);

  const openReplyingReply = (replyingTo: string, commentId: string) => {
    if (replyingReplyId === commentId) {
      setReplyingReplyId(null);
    } else {
      setReplyingReplyId(commentId);
      setReplyingReply(`@${replyingTo} `);
    }
  };
  
  const handleChangeReplying = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyingReply(e.target.value);
  }

  const handleSendReplying = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: IComment = await useHandleCommentEvent(eventId, currentUser.username, replyingReply, comment._id, currentUser.profilePicture, currentUser.name);
    setReplyingReply("");
    setComments([result, ...comments]);
    setReplyingComments([result, ...replyingComments]);
    setReplyingReplyId(null)
  }

  const handleLikeComment = async (commentId: string) => {
    const result = await useLikeCommentEvent(commentId, currentUser.username);
    setLikesOfCommentReply(result);
  }

  return (
    <>
        <div className="flex gap-3 mb-2">
              <img src={replyingComment.profilePicture} alt="" className="w-6 h-6 border rounded-full" />
              <div>
                <div className="bg-third pb-2 pt-1 rounded min-w-[180px] px-2">
                  <Link href={`/profile/${replyingComment.username}`} className="font-semibold hover:text-primary">{replyingComment.name}</Link>
                  <p>{replyingComment.comment}</p>
                </div>
                <div className="mt-1 text-sm flex font-semibold justify-end gap-3">
                <button className={`${likesOfCommentReply.includes(currentUser.username) ? "text-primary hover:text-black" : "hover:text-primary"}`} onClick={() => handleLikeComment(replyingComment._id)}>
              {likesOfCommentReply.includes(currentUser.username) ? "Liked" : "Like"}({likesOfCommentReply.length})
              </button>
                  <button type="button" onClick={() => openReplyingReply(replyingComment.name, replyingComment._id)} className="hover:text-primary">{replyingReplyId === replyingComment._id ? "Replying" : "Reply"}</button>
                </div>
              </div>
            </div>
            {
              replyingReplyId === replyingComment._id && (
                <div className="mb-8">
                  <form onSubmit={handleSendReplying} className="flex">
                    <img src={currentUser.profilePicture} alt="" className="items-center w-10 h-10 rounded-full border mr-3" />
                    <textarea required rows={1} name="comment" onChange={handleChangeReplying} value={replyingReply} placeholder="Add a comment..." className="flex items-center resize-none w-full outline-none px-2 bg-third text-secondary border rounded-l border-r-0" />
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
