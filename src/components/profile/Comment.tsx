"use client"

import React, { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { IComment } from '@/types/comment';
import Link from "next/link";
import { IUser } from '@/types/user';
import { BsFillSendFill } from "react-icons/bs";
import { useHandleCommentEvent, useLikeCommentEvent } from "@/hooks/useEventActions";
import axios from 'axios'
import ReplyComment from '@/components/profile/ReplyComment';

export default function Comment({ eventId, comment, currentUser, setComments, comments }: { eventId: string, comment: IComment, currentUser: IUser, setComments: Dispatch<SetStateAction<IComment[]>>, comments: IComment[] }) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyingForm, setReplyingForm] = useState<string>("");
  const [replyingComments, setReplyingComments] = useState<IComment[]>([]);
  const [isShowReplyingComment, setIsShowReplyingComment] = useState<boolean>(false);
  const [likesOfComment, setLikesOfComment] = useState<string[]>(comment.likes as string[]);

  const openReplying = (replyingTo: string) => {
    setIsReplying(!isReplying);
    setReplyingForm(`@${replyingTo} `);
  };
  

  const openShowRepying = () => setIsShowReplyingComment(!isShowReplyingComment);

  const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: IComment = await useHandleCommentEvent(eventId, currentUser.username, replyingForm, comment._id, currentUser.profilePicture, currentUser.name);
    setReplyingForm("");
    setComments([result, ...comments]);
    setReplyingComments([result, ...replyingComments]);
    setIsReplying(false)
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyingForm(e.target.value);
  };


  useEffect(() => {
    const fetchReplyComments = async () => {
      try {
        const res = await axios.get(`/api/eventcomment/get-replycomments/${comment._id}`);
        if (res.status !== 200) {
          return;
        }
        setReplyingComments(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchReplyComments();
  }, [comment]);

  const handleLikeComment = async (commentId: string) => {
    const result = await useLikeCommentEvent(commentId, currentUser.username);
    setLikesOfComment(result);
  }

  return (
    <>
      <div className="flex gap-3 mb-2">
        <img src={comment.profilePicture} alt="" className="w-6 h-6 border rounded-full" />
        <div>
          <div className="bg-third pb-2 pt-1 rounded min-w-[220px] px-2">
            <Link href={`/profile/${comment.username}`} className="font-semibold hover:text-primary">{comment.name}</Link>
            <p>{comment.comment}</p>
          </div>
          <div className="mt-1 text-sm flex font-semibold justify-end gap-3">
            <button className={`${likesOfComment.includes(currentUser.username) ? "text-primary hover:text-black" : "hover:text-primary"}`} onClick={() => handleLikeComment(comment._id)}>
              {likesOfComment.includes(currentUser.username) ? "Liked" : "Like"}({likesOfComment.length})
              </button>
            <button type="button" onClick={() => openReplying(comment.name)} className="hover:text-primary">{isReplying ? "Replying" : "Reply"}</button>
            {
              replyingComments && replyingComments.length > 0 && (
                <button type="button" onClick={openShowRepying} className="hover:text-primary">{isShowReplyingComment ? "Hide" : "Show"} {replyingComments.length} {replyingComments.length > 1 ? "replies" : "reply"}</button>
              )
            }
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
      {
        isShowReplyingComment && replyingComments.map((replyingComment) => (
          <div key={replyingComment._id} className="mb-3 ml-10">
            <ReplyComment
              replyingComment={replyingComment}
              currentUser={currentUser}
              eventId={eventId}
              comment={comment}
              comments={comments}
              setComments={setComments}
              setReplyingComments={setReplyingComments}
              replyingComments={replyingComments}
            />
          </div>
        ))
      }

    </>
  )
}
