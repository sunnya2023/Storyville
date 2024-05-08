import bcrypt from "bcrypt";
import { geerateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailRegex =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "유효하지 않은 이메일입니다." });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: " 이미 사용중입니다." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "이미 가입된 이메일입니다." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "비밀번호는 6자 이상으로 작성해주세요" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      geerateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        emai: newUser.email,
        followers: newUser.followers,
        followings: newUser.followings,
        coverImg: newUser.coverImg,
      });
    } else {
      res.status(400).json({ error: "사용자 정보가 유효하지 않습니다." });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "internal Server Error" });
  }
};
export const logout = async (req, res) => {
  res.json({
    data: "You hit the logout ",
  });
};
