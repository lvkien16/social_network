"use lient"

import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'

export default function Story() {
    return (
        <div className='flex gap-4 h-40'>
            <div className="min-h-full min-w-32 bg-white rounded-md">
                <button className="h-full w-full">
                    <span className="flex justify-center">
                        <CiCirclePlus className='text-3xl' />
                    </span>
                    <span className="text-center">
                        Post a story
                    </span>
                </button>
            </div>
            <div className="flex gap-4 overflow-x-auto overflow-y-hidden h-40">
                <div className="h-full w-32">
                    <button className="h-full w-full relative">
                        <img src="https://themes.stackbros.in/social_r/assets/02-BK-gsEJw.jpg" alt="" className='min-h-full w-full rounded-md' />
                        <span className="absolute bottom-1 left-0 right-0 font-semibold text-white">Lo Van Kien</span>
                    </button>
                </div>
                <div className="h-full w-32">
                    <button className="h-full min-w-full relative">
                        <img src="https://themes.stackbros.in/social_r/assets/02-BK-gsEJw.jpg" alt="" className='min-h-full min-w-full rounded-md' />
                        <span className="absolute bottom-1 left-0 right-0 font-semibold text-white">Lo Van Kien</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
