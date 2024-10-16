export interface IUser {
  username: string;
  name: string;
  friends: string[];
  followers: string[];
  following: string[];
  profilePicture: string;
  email: string;
  emailVisibility?: string;
  biography?: string;
  createdAt: string;
  birthday?: string;
  birthdayVisibility?: string;
  livesIn?: string;
  livesInVisibility?: string;
  status?: string;
  statusVisibility?: string;
  work?: string;
  workVisibility?: string;
  blocked?: string[]
}