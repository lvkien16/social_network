"use client"

import { useAppSelector } from '@/redux/store'
import React, { ChangeEvent, useState } from 'react'
import { AiFillPicture } from 'react-icons/ai';
import { BsCalendar2EventFill } from 'react-icons/bs';
import { FaSmile } from "react-icons/fa";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { MdPhotoLibrary } from 'react-icons/md';
import { MdDelete } from "react-icons/md";
import Select from 'react-select'
import { ClipLoader, BeatLoader } from "react-spinners";
import { storage } from "@/firebase/config";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import axios from "axios";

Modal.setAppElement('#root');

export default function CreatePost() {
    const { currentUser } = useAppSelector((state) => state.user);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState<{ url: string; path: string }[]>([]);
    const [loadingImages, setLoadingImages] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [visibility, setVisibility] = useState<string>("");

    const options = [
        { value: 'public', label: 'Public' },
        { value: 'followers', label: 'Followers' },
        { value: 'friends', label: 'Friends' },
        { value: 'private', label: 'Private' }
    ]

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleContentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setContent(event.target.value);
    };

    const handleChangeVisibility = (selectedOption: any) => {
        setVisibility(selectedOption.value);
    }

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;
        if (files) {
            setLoadingImages(true);
            const uploadedImages: { url: string; path: string }[] = [];

            for (const file of Array.from(files)) {
                const storageRef = ref(storage, `images/${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                uploadedImages.push({ url, path: `images/${file.name}` });
            }

            setImages((prevImages) => [...uploadedImages, ...prevImages]);
            setLoadingImages(false);
        }
    };

    const removeImage = async (path: string) => {
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);

        setImages((prevImages) =>
            prevImages.filter((image) => image.path !== path)
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (images.length === 0) {
            setError("Images are required");
            setLoading(false);
            return;
        }
        if (!visibility) {
            setError("Visibility is required!!")
            setLoading(false);
            return;
        }
        try {
            const res = await axios.post("/api/post/create-post", {
                type: "post",
                owner: currentUser?.username,
                content: content ? content : "",
                visibility,
                images: images.map((image) => image.url)
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (res.status !== 201) {
                setLoading(false);
                setError(res.data.message || "Something went wrong");
                return;
            }
            setLoading(false);
            setIsOpen(false);
        } catch (error) {
            setError("An unexpected error occured.");
        }

    }

    return (
        <div className="bg-white mt-4 lg:mt-8 p-5 rounded-md">
            <div className="flex gap-2 items-center">
                <img src={currentUser?.profilePicture} alt="" className="w-14 h-14 rounded-full " />
                <button onClick={openModal} className="text-secondary w-full p-2 rounded-full hover:text-primary flex justify-start bg-third">What's on your mind?</button>
            </div>
            <div className="flex gap-5 mt-3 items-center">
                <button onClick={openModal} className="flex items-center gap-1 bg-third text-secondary hover:text-primary text-sm p-2 rounded-md">
                    <AiFillPicture color="#0CBC87" />
                    Photo/Video
                </button>
                <button className="flex items-center gap-1 bg-third text-secondary hover:text-primary text-sm p-2 rounded-md">
                    <BsCalendar2EventFill color="#D6293E" />
                    Event
                </button>
                <button className="flex items-center gap-1 bg-third text-secondary hover:text-primary text-sm p-2 rounded-md">
                    <FaSmile color="#F7C32E" />
                    Feeling
                </button>
            </div>
            {/* photo */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="w-full md:w-1/2 lg:w-1/3 rounded-md bg-white"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div>
                    <div className="py-5 border-b flex px-2 justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Create post</h2>
                        <button onClick={closeModal} className="text-secondary hover:text-black">
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>
                    <form className="px-2" onSubmit={handleSubmit}>
                        <div className="mt-3 flex gap-3">
                            <img src={currentUser?.profilePicture} className="h-12 w-12 rounded-full" alt="" />
                            <textarea onChange={handleContentChange} value={content} rows={3} placeholder="What's on your mind?" className="flex items-center px-2 outline-none w-full resize-none" />
                        </div>
                        <div className="flex justify-center mt-3">
                            <label htmlFor="imagesforpost" className="hover:cursor-pointer bg-third w-1/2 text-secondary py-10 rounded-md hover:text-primary text-center">
                                <span className="flex justify-center">
                                    <MdPhotoLibrary className="text-3xl" />
                                </span>
                                <span className="text-center font-semibold">
                                    Add photo/video
                                </span>
                            </label>
                            <input
                                id="imagesforpost"
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                hidden
                            />
                        </div>
                        <div className="mt-3 flex gap-3 items-center">
                            <Select onChange={handleChangeVisibility} name='visibility' placeholder="Visibility" options={options} />
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                        {loadingImages ? (
                            <div className="flex justify-center pt-3">
                                <ClipLoader color="#3795BD" />
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={image.url}
                                            alt={`Uploaded ${index}`}
                                            className="w-24 h-24 object-cover border"
                                        />
                                        <div
                                            onClick={() => removeImage(image.path)}
                                            className="flex justify-center items-center bg-gray-200 opacity-0 group group-hover:opacity-100 transition duration-500 ease-in-out absolute top-0 bottom-0 right-0 left-0 bg-opacity-60 hover:cursor-pointer"
                                        >
                                            <MdDelete className="text-3xl text-red-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-center mt-3 mb-5">
                            <button type="submit" className="font-semibold bg-primary text-white w-full py-2 border border-primary rounded-md hover:text-primary hover:bg-white">
                                {loading ? <BeatLoader /> : "Post"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
