import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    emailVisibility: {
      type: String,
      default: "Private",
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://firebasestorage.googleapis.com/v0/b/sleepant-social.appspot.com/o/images%2Fdefault-profile-picture.webp?alt=media&token=8d72a111-81ac-4403-9156-dc6b17e230e5"
    },
    coverPicture: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    blocked: {
      type: Array,
      default: [],
    },
    birthday: {
      type: Date,
      default: "",
    },
    birthdayVisibility: {
      type: String,
      default: "Private",
    },
    biography: {
      type: String,
      default: "",
    },
    livesIn: {
      type: String,
      default: "",
    },
    livesInVisibility: {
      type: String,
      default: "Private",
    },
    status: {
      type: String,
      default: "",
    },
    statusVisibility: {
      type: String,
      default: "Private",
    },
    work: {
      type: String,
      default: "",
    },
    workVisibility: {
      type: String,
      default: "Private",
    },
  }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;