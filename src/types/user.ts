export interface IUser {
    username: string;
    name: string;
    friends: string[];
    followers: string[];
    following: string[];
    profilePicture: string;
    email: string;
    biography?: string;
    createdAt: string;
    birthday?: string;
    livesIn?: string;
    status?: string;
    work?: string;
    blocked?: string[]
  }