import Notification from "../models/notification.medel.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    let { text, img } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    console.log("Request body:", req.body);
    console.log("User ID:", userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text or img" });
    }

    const newPost = new Post({
      user: userId,
      text,
      // img,
    });

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      // const img = uploadedResponse.secure_url;
      console.log("Cloudinary response:", uploadedResponse);
      newPost.img = uploadedResponse.secure_url;
    }

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in createPost controller:", error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    const result = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in deletePost controller", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById(postId);
    if (!postId) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = { user: userId, text };
    post.comments.push(comment);

    const result = await post.save();

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in commentOnPost controller", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;

    // 게시물을 찾아서 해당 댓글을 삭제
    const post = await Post.findOne({ "comments._id": commentId }); // 해당 댓글을 포함한 게시물 찾기

    if (!post) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const commentToDelete = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (!commentToDelete) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (commentToDelete.user.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this comment" });
    }

    // 삭제 권한이 있으면 댓글 삭제
    // await post.updateOne({ $pull: { comments: { _id: commentId } } });

    // res.status(200).json({ message: "Comment deleted successfully" });

    // Remove the comment from the comments array
    post.comments = post.comments.filter(
      ({ _id }) => _id.toString() !== commentId
    );

    // Save the updated post
    const result = await post.save();

    // Return the updated comments array
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in deleteComment controller", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      //unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      //결과
      const updatedLikes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedLikes);
    } else {
      //like post
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await notification.save();

      const updatedLikes = post.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    console.log("Error in likeUnlikePost controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    if (posts.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getAllPosts controller", error);
    res.status(500).json({ error: "Intenal Server Error" });
  }
};

export const getLikedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const likedPosts = await Post.find({
      _id: { $in: user.likedPosts },
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(likedPosts);
  } catch (error) {
    console.log("Error in getLikedPosts controller", error);
    res.status(500).json({ error: "Intenal Server Error" });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const following = user.following;
    const feedPosts = await Post.find({ user: { $in: following } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(feedPosts);
  } catch (error) {
    console.log("Error in getFollowingPosts controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!posts) {
      return res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getUserPosts controller", error);
    res.status(500).json({ error: "Intenal Server Error" });
  }
};
