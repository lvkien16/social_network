export interface IPost {
    _id: string;
    owner: string;
    content: string;
    visibility: string;
    images: string[];
    likes: string[];
    createdAt: string;
    profilePicture: string;
    name: string;
}