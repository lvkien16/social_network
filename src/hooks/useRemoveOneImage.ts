import { storage } from "@/firebase/config";
import { deleteObject, ref } from "firebase/storage";

export const removeOneImage = async (image: string) => {
    const imageRef = ref(storage, image);
    await deleteObject(imageRef);

    return;
}