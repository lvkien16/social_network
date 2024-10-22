"use client"

import React from 'react'
import { IUser } from '@/types/user';

import Event from '@/components/profile/Event'
import Post from '@/components/profile/Post'

export default function Feed({ combinedAndSortedItems, currentUser }: { combinedAndSortedItems: any, currentUser: IUser }) {
    return (
        <div>
            {combinedAndSortedItems.map((item: any) => (
                <div key={item._id} >
                    {item.content ? (
                        <div className='my-4 lg:my-8'>
                            <Post post={item} currentUser={currentUser} />
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
