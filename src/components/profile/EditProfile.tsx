"use client"

import React from 'react'
import { IoMdClose } from "react-icons/io";
import Modal from 'react-modal';
import { ClipLoader, BeatLoader } from "react-spinners";
import { IUser } from "@/types/user"

export default function EditProfile({ user, editProfileModalIsOpen, closeEditProfileModal, currentUser }: { user: IUser, editProfileModalIsOpen: boolean, closeEditProfileModal: () => void, currentUser: IUser }) {
    return (
        <>
            <Modal
                isOpen={editProfileModalIsOpen}
                onRequestClose={closeEditProfileModal}
                className="w-full md:w-1/2 lg:w-1/3 rounded-md bg-white"
                overlayClassName="fixed mt-16 lg:mt-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div>
                    <div className="py-5 border-b flex px-2 justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Edit profile</h2>
                        <div className="py-3 flex px-2 justify-end items-center">
                            <button onClick={closeEditProfileModal} className="text-secondary hover:text-black">
                                <IoMdClose className="text-2xl" />
                            </button>
                        </div>
                    </div>
                    <form className="px-2">
                        <div className="mt-3 flex justify-center gap-3 items-center">
                            <div>
                                <img src={currentUser?.profilePicture} className="h-24 w-24 rounded-full border" alt="" />
                            </div>
                            <label htmlFor="" className="bg-primary text-white hover:text-primary border border-primary hover:cursor-pointer hover:bg-white px-3 py-1 rounded">Change</label>
                        </div>

                        <div className="mt-3">
                            <div className="flex gap-2 justify-start items-start">
                                <label htmlFor="">Biography:</label>
                                <textarea cols={2} className="resize-none w-full border outline-none px-1 rounded text-sm" />
                            </div>
                            <div className="flex mt-1 gap-2 justify-start items-start">
                                <label htmlFor="">Birthday:</label>
                                <input type="Date" className="outline-none" />
                            </div>
                            <div className="mt-1">
                            <label htmlFor="">Biography:</label>
                            <select name="" id="">
                                <option value="">Single</option>
                                <option value="">Married</option>
                                <option value="">In a relationship</option>
                            </select>
                            </div>
                            <div className="mt-1">
                                <label htmlFor=''>Work:</label>
                                <textarea cols={2} className="resize-none w-full border outline-none px-1 rounded text-sm" />
                            </div>
                            <div className=""></div>
                            <div className=""></div>
                        </div>

                        <div className="flex justify-center mt-3 mb-5">
                            <button type="submit" className="font-semibold bg-primary text-white w-full py-2 border border-primary rounded-md hover:text-primary hover:bg-white">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </Modal >
        </>
    )
}
