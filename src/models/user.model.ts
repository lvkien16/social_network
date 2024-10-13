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
          password: {
            type: String,
            required: true,
          },
          profilePicture: {
            type: String,
            default: "https://firebasestorage.googleapis.com/v0/b/social-network-88b1e.appspot.com/o/images%2Fdefault-profile-picture.webp?alt=media&token=d524bcd1-9adb-43d9-9ab6-a65043f97bd3 "
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
          biography: {
            type: String,
            default: "",
          },
          livesIn: {
            type: String,
            default: "",
          },
          status: {
            type: String,
            default: "",
          },
          work: {
            type: String,
            default: "",
          },
          hiddenInfo: {
            type: Array,
            default: [],
          }
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;