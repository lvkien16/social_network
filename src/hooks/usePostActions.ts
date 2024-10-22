"use client"

import axios from 'axios';

export const useHandleLikePost = async (postId: string, username: string) => {
    try {
        const res = await axios.post(`/api/post/like-post/${postId}/${username}`);
        if (res.status !== 200) {
            return;
        }
        return res.data;
    } catch (err) {
        console.log(err)
    }
}