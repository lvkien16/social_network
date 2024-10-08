"use client"

import React from 'react'
import Story from './Story.component'
import CreatePost from './CreatePost.component'

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
