import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


const createPlaylist = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    console.error('Name or description missing');
    return next(new ApiError(400, 'Please fill all the fields'));
  }
  try {
    const userId = req.user._id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

  // console.log(typeof (userObjectId));

    const newPlaylist = await Playlist.create({
      title: title,
      description: description || "",
      owner: userObjectId,
      videos: []
    });

    res.status(201).json(new ApiResponse(201, newPlaylist, 'Playlist created'));
  } catch (error) {

    console.error(`Error creating playlist: ${error.message}`);
    return next(new ApiError(500, 'Something went wrong', error.message));
  }
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // console.log("playlist controller userId : " + userId);

  // Validate the userId
  const userObjectId = new mongoose.Types.ObjectId(userId);

  // console.log(typeof (userObjectId));


  try {
    if (!userObjectId) {
      throw new ApiError(400, "UserId not provided");
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, "User id is not valid");
    }

    const userExisted = await User.findById(userObjectId);
    if (!userExisted) {
      throw new ApiError(400, "User does not exist");
    }

    const userAllPlaylists = await Playlist.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userObjectId),
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          owner: 1,
          videos: {
            $cond: {
              if: { $eq: ["$owner", new mongoose.Types.ObjectId(userObjectId)] },
              then: "$videos",
              else: {
                $filter: {
                  input: '$videos',
                  as: 'videoArray',
                  cond: { $eq: ['$$videoArray.isPublished', true] }
                }
              }
            }
          },
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    if (!userAllPlaylists.length) {
      throw new ApiError(400, "User does not have playlists");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        userAllPlaylists,
        "User all playlists"
      )
    );
  } catch (error) {
    console.log(typeof (userObjectId));
    console.error(`Error fetching playlists: ${error.message}`);
    throw new ApiError(500, "Something went wrong", error.message);
  }
});
const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  try {
    const playList = await Playlist.findById(playlistId);
    if (!playList) {
      throw new ApiError(404, "PlayList doesnot exist");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, playList, "Playlist fetched"));
  } catch (error) {
    console.error(`Error creating playlist: ${error.message}`);
    throw new ApiError(500, "something went wrong", error.message);
  }
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new ApiError(404, "Playlist not found!");
    }

    // Using $addToSet to ensure uniqueness in the videos array
    const result = await Playlist.updateOne(
      { _id: playlistId, videos: { $ne: videoId } },
      { $addToSet: { videos: videoId } }
    );

    if (result.nModified === 0) {
      throw new ApiError(401, "This Video is already in the playlist!");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, null, "Video added to playlist"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (playlist.videos.includes(playlistId)) {
      let index = playlist.video.indexOf(videoId);
      playlist.videos.splice(index, 1);
      return res
        .status(201)
        .json(new ApiResponse(200, null, "Video removed from playlist"));
    } else {
      console.log("Not Found");
      throw new ApiError(404, "Video Not Found In this playlist");
    }
  } catch (error) {
    throw new ApiError(500, "something went wrong", error.message);
  }
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  try {
    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
      throw new ApiError(404, "Playlist not found!");
    }
    return res.status(201).json(new ApiResponse(200, null, "Playlist deleted"));
  } catch (error) {
    throw new ApiError(500, "something went wrong", error.message);
  }
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  if (!name || !description) {
    throw new ApiError(400, "Please fill all the fields");
  }
  try {
    const playlist = await Playlist.findOneAndUpdate(
      { _id: playlistId },
      { $set: { name, description } },
      { new: true }
    );
    if (!playlist) {
      throw new ApiError(404, "Playlist not found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, playlist, "Playlist updated"));
  } catch (error) {
    throw new ApiError(500, "something went wrong", error.message);
  }
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
