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
            default: "https://static.vecteezy.com/system/resources/previews/027/187/637/non_2x/sticker-cute-little-ant-cartoon-free-png.png"
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
          birthday: {
            type: Date,
          },
          biography: {
            type: String,
            default: "",
          }
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;