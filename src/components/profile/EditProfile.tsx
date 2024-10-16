"use client"

import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Modal from 'react-modal';
import { ClipLoader, BeatLoader } from "react-spinners";
import { IUser } from "@/types/user"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase/config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { editProfileStatus } from '@/redux/user/userSlice';
import { useAppDispatch } from "@/redux/store";

export default function EditProfile({ user, editProfileModalIsOpen, closeEditProfileModal, currentUser, setUser }: { user: IUser, editProfileModalIsOpen: boolean, closeEditProfileModal: () => void, currentUser: IUser, setUser: (value: IUser) => void }) {
    const [formEdit, setFormEdit] = useState({
        name: user.name || "",
        biography: user.biography || "",
        birthday: user.birthday?.substring(0, 10) || "",
        birthdayVisibility: user.birthdayVisibility || "Private",
        work: user.work || "",
        workVisibility: user.workVisibility || "Private",
        livesIn: user.livesIn || "",
        livesInVisibility: user.livesInVisibility || "Private",
        status: user.status || "",
        statusVisibility: user.statusVisibility || "Private",
        email: user.email || "",
        emailVisibility: user.emailVisibility || "Private",
        enterPassword: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [imageEdit, setImageEdit] = useState<string>(user.profilePicture || "");
    const [isRequiredStatus, setIsRequiredStatus] = useState<boolean>(false);
    const [isRequiredLivesIn, setIsRequiredLivesIn] = useState<boolean>(false);
    const [isRequiredWork, setIsRequiredWork] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            setFormEdit({
                name: user.name || "",
                biography: user.biography || "",
                birthday: user.birthday?.substring(0, 10) || "",
                birthdayVisibility: user.birthdayVisibility || "Private",
                work: user.work || "",
                workVisibility: user.workVisibility || "Private",
                livesIn: user.livesIn || "",
                livesInVisibility: user.livesInVisibility || "Private",
                status: user.status || "",
                statusVisibility: user.statusVisibility || "Private",
                email: user.email || "",
                emailVisibility: user.emailVisibility || "Private",
                enterPassword: ""
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormEdit({ ...formEdit, [e.target.name]: e.target.value })
    }

    const handleChangeProfilePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLoading(true);
            const uploadedImage: { url: string, path: string } = { url: "", path: "" };
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            uploadedImage.url = url;
            uploadedImage.path = `images/${file.name}`;

            setImageEdit(uploadedImage.url);
            setLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const data = { ...formEdit, profilePicture: imageEdit };
        try {
            const res = await axios.put(`/api/user/edit-profile/${currentUser.username}`, data);
            if (res.status !== 200) {
                toast.error(res.data.message || "Something went wrong");
                setLoading(false);
                return;
            }
            closeEditProfileModal();
            toast.success("Profile updated successfully");
            setLoading(false);
            dispatch(editProfileStatus(res.data));
            setUser(res.data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong");
                return;
            } else {
                console.log("Unexpected error:", error);
                toast.error("An unexpected error occurred.");
            }
            setLoading(false);
        }
    }

    console.log(formEdit)

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
                    <form className="px-2" onSubmit={handleSubmit}>
                        <div className="mt-3 flex gap-1 items-center">
                            <div className="min-w-[30%]">Profile picture:</div>
                            <div>
                                {
                                    loading ? (
                                        <div className="h-24 w-24 flex items-center justify-center rounded-full border">
                                            <ClipLoader color="#3795BD" />
                                        </div>
                                    ) : (
                                        <img src={imageEdit ? imageEdit : user?.profilePicture} className="h-24 w-24 rounded-full border" alt="" />
                                    )
                                }
                            </div>
                            <label htmlFor="profilePicture-edit" className="bg-primary text-white hover:text-primary border border-primary hover:cursor-pointer hover:bg-white px-3 py-1 rounded">Change</label>
                            <input onChange={handleChangeProfilePicture} multiple hidden type="file" id="profilePicture-edit" />
                        </div>

                        <div className="mt-3">
                            <div className="flex gap-1 items-center">
                                <label htmlFor="name-edit" className="min-w-[30%]">Name:</label>
                                <input value={formEdit.name} onChange={handleChange} id="name-edit" name="name" className="py-1 w-full flex items-center border outline-none px-1 rounded text-sm" />
                            </div>
                            <div className="flex mt-2 gap-1 items-center">
                                <label htmlFor="biography-edit" className="min-w-[30%]">Biography:</label>
                                <input value={formEdit.biography} onChange={handleChange} id="biography-edit" name="biography" className="p-1 flex items-center w-full border outline-none rounded text-sm" />
                            </div>
                            <div className="flex mt-2 items-center gap-1">
                                <label htmlFor="birthday-edit" className='min-w-[30%]'>Birthday:</label>
                                <input type="Date" value={formEdit.birthday} required id="birthday-edit" onChange={handleChange} name="birthday" className="outline-none border rounded py-1 px-2 w-full" />
                                <select name="birthdayVisibility" onChange={handleChange} value={formEdit.birthdayVisibility} className='border rounded px-2 py-1'>
                                    <option value="Public">Public</option>
                                    <option value="Folowers">Folowers</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                            <div className="mt-2 flex gap-1 items-center">
                                <label htmlFor="status-edit" className='min-w-[30%]'>Status:</label>
                                <select onChange={handleChange} value={formEdit.status} name="status" id="status-edit" className='border py-1 px-2 rounded w-full'>
                                    <option value="" hidden disabled>Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="In a relationship">In a relationship</option>
                                </select>
                                <select name="statusVisibility" required={isRequiredStatus ? true : false} onChange={handleChange} value={formEdit.statusVisibility} className='border rounded px-2 py-1'>
                                    <option value="Public">Public</option>
                                    <option value="Folowers">Folowers</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                            <div className="mt-2 flex gap-1 items-center">
                                <label htmlFor='work-edit' className='min-w-[30%]'>Work:</label>
                                <input name='work' value={formEdit.work} id="work-edit" onChange={handleChange} className="p-1 w-full flex items-center border outline-none rounded text-sm" />
                                <select name="workVisibility" required={isRequiredWork ? true : false} onChange={handleChange} value={formEdit.workVisibility} className='border rounded px-2 py-1'>
                                    <option value="Public">Public</option>
                                    <option value="Folowers">Folowers</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                            <div className="mt-2 flex gap-1 items-center">
                                <label htmlFor='livesIn-edit' className="min-w-[30%]">Lives in:</label>
                                <input name='livesIn' value={formEdit.livesIn} id="livesIn-edit" onChange={handleChange} className="p-1 w-full border outline-none flex items-center rounded text-sm" />
                                <select name="livesInVisibility" required={isRequiredLivesIn ? true : false} onChange={handleChange} value={formEdit.livesInVisibility} className='border rounded px-2 py-1'>
                                    <option value="Public">Public</option>
                                    <option value="Folowers">Folowers</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                            <div className="mt-2 flex gap-1 items-center">
                                <label htmlFor='email-edit' className="min-w-[30%]">Email:</label>
                                <input name='email' type="email" id="email-edit" required value={formEdit.email} onChange={handleChange} className="w-full border p-1 outline-none rounded text-sm" />
                                <select name="emailVisibility" required onChange={handleChange} value={formEdit.emailVisibility} className='border rounded px-2 py-1'>
                                    <option value="Public">Public</option>
                                    <option value="Folowers">Folowers</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                            <div className="mt-2 flex gap-1 items-center">
                                <label htmlFor='password-edit' className="min-w-[30%]">Enter password:</label>
                                <input name='enterPassword' type="password" id="password-edit" required value={formEdit.enterPassword} onChange={handleChange} className="w-full border p-1 outline-none rounded text-sm" />
                            </div>
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
