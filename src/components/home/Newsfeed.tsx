"use client"

import React from 'react'
import Story from './Story'
import CreatePost from './CreatePost'
import { useAppSelector } from "@/redux/store";

export default function Newsfeed() {
  const {currentUser} = useAppSelector((state) => state.user);
  return (
    <>
      {/* post a story */}
      <Story />

      {/* create a new post */}
      <CreatePost currentUser={currentUser} />

      {/* newsfeed */}
    </>

  )
}
