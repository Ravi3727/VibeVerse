import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const allComments = await Comment.aggregate([
      {
        $match: {
          video: new mongoose.Types.ObjectId(videoId),
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: parseInt(limit, 10),
      },
    ]);
    return res
      .status(200)
      .json(new ApiResponse(200, { allComments }, "Success"));
  } catch (e) {
    throw new ApiError(400, e.message);
  }
})

const addComment = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { videoId } = req.params;
    if (!content) {
      throw new ApiError(400, "content is required to comment!");
    }

    if (!videoId.trim()) {
      throw new ApiError(400, "video id is required or invalid!")
    }

    const video = await Video.findById(videoId)
    if (!video) {
      throw new ApiError(404, "video not found to comment!");
    }



    const newComment = await Comment.create({
      content,
      video: new mongoose.Types.ObjectId(videoId),
      owner: req.user?._id,
    });

    if (!newComment) {
      throw new ApiError(500, "Error while creating comment!");
    }
    return res
      .status(201)
      .json(new ApiResponse(201, newComment, "comment added to video!"));
  } catch (error) {
    console.log("Comment added to video error " + error.message);
  }
})

const updateComment = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;
    let comment = await Comment.findByIdAndUpdate(commentId);

    // console.log(" content of comment " + content);
    // console.log("Comment id " + commentId);
    const user = req.user._id;
    // console.log("owner of comment " + comment.owner);
    // console.log("Actual user " + user)
    // console.log(comment.owner.toString() === user.toString());
    if (comment.owner.toString() !== user.toString()) {
      throw new ApiError(400, "Cannot modify others comment");
    }
    else {
      comment.content = content;
      comment = await comment.save();
      return res
        .status(201)
        .json(new ApiResponse(200, comment, "Commented updated successfull"));
    }
  } catch (error) {
    throw new ApiError(
      500,
      error.message
    );
  }
})

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const user = req.user._id;
    const { commentId } = req.params;
    // console.log(`Comment ID: ${commentId}`);
    // console.log(`User ID: ${user}`);

    const comment = await Comment.findById(commentId);
    // console.log(`Comment found: ${comment}`);

    if (!comment) {
      throw new ApiError(400, "No comment found");
    }
    if (comment.owner.toString() !== user.toString()) {
      throw new ApiError(400, "Invalid user");
    }

    // Delete comment
    await Comment.deleteOne({ _id: commentId });
    return res.status(201).json(new ApiResponse(201, "Comment deleted"));
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    throw new ApiError(500, "Something went wrong while deleting the comment");
  }
});


export {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment
}