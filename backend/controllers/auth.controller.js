import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
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

    const passwordRegex =
      /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "비밀번호는 6자 이상이어야 하며, 숫자/소문자/특수문자를 모두 포함해야 합니다.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        emai: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        coverImg: newUser.coverImg,
      });
    } else {
      res.status(400).json({ error: "사용자 정보가 유효하지 않습니다." });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ error: "internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCheck = await bcrypt.compare(password, user?.password || "");
    if (!user || !passwordCheck) {
      return res
        .status(400)
        .json({ error: "이메일 또는 비밀번호를 확인해주세요" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      emai: user.email,
      followers: user.followers,
      following: user.following,
      coverImg: user.coverImg,
    });
  } catch (error) {
    console.log("Error in lgoin controller", error.message);
    return res.status(500).json({ error: "internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfuly" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
};
