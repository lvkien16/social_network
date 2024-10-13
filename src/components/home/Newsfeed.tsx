"use client"

import React from 'react'
import Story from './Story'
import CreatePost from './CreatePost'

export default function Newsfeed() {
  return (
    <>
      {/* post a story */}
      <Story />

      {/* create a new post */}
      <CreatePost />

      {/* newsfeed */}
    </>

  )
}
