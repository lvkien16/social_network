"use client"

import axios from 'axios';

export const useHandleLikeEvent = async (eventId: string, username: string) => {
    try {
        const res = await axios.post(`/api/event/like-event/${eventId}/${username}`);
        if (res.status !== 200) {
            return;
        }
        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export const useHandleFollowEvent = async (eventId: string, username: string) => {
    try {
        const res = await axios.post(`/api/event/follow-event/${eventId}/${username}`);
        if (res.status !== 200) {
            return;
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const useHandleCommentEvent = async (eventId: string, username: string, comment: string, replyingTo: string, profilePicture: string, name: string) => {
    try {
        const res = await axios.post(`/api/eventcomment/create/${eventId}/${username}`, { comment, replyingTo, profilePicture, name });
        if (res.status !== 201) {
            return;
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
}