import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadOneImage = async (file: File, type: string, username: string) => {
    if (!file) return;
    const storageRef = ref(storage, `images/${type}/${username}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return url;
}

export const uploadManyImages = async (files: File[], type: string, username: string) => {
    if (!files.length) return;

    const uploadedImages: string[] = [];

    for (const file of Array.from(files)) {
        const storageRef = ref(storage, `images/${type}/${username}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        uploadedImages.push(url);
    }
    return uploadedImages;
}