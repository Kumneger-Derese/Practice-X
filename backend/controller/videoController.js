import fs from 'node:fs/promises';
import ApiError from '../utils/ApiError.js';
import { cloudinary } from '../config/cloudinary.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { extractVideoMetadata } from '../utils/videoMetadata.js';

//* upload video to cloudinary and return metadata
const uploadVideo = asyncHandler(async (req, res, next) => {
  const file = req.file;

  if (!file) {
    return next(new ApiError('Video file not provided.', 400));
  }

  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: 'video',
    folder: 'parcticex/videos',
  });

  await fs.unlink(file.path); // delete local temp file

  res.status(201).json(extractVideoMetadata(result));
});

//* update video in cloudinary and return metatdata
const updateVideo = asyncHandler(async (req, res, next) => {
  const file = req.file;
  const oldPublicId = req.body.publicId;

  if (!oldPublicId) {
    return next(new ApiError('Old video public ID not provided.', 400));
  }

  if (!file) {
    return next(new ApiError('Video file not provided.', 400));
  }

  // upload new
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: 'video',
    folder: 'parcticex/videos',
  });

  await fs.unlink(file.path);

  // delete old
  if (oldPublicId) {
    await cloudinary.uploader.destroy(oldPublicId, {
      resource_type: 'video',
    });
  }

  if (!result) {
    return next(new ApiError('Video not updated.', 400));
  }

  res.status(200).json(extractVideoMetadata(result));
});

//*return metatdata video in cloudinary
const getVideo = asyncHandler(async (req, res, next) => {
  const { publicId } = req.params;

  const result = await cloudinary.api.resource(publicId, {
    resource_type: 'video',
  });

  res.status(200).json(extractVideoMetadata(result));
});

//*delete video in cloudinary
const deleteVideo = asyncHandler(async (req, res, next) => {
  const { publicId } = req.body;

  if (publicId) {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });
  }

  res
    .status(200)
    .json({ message: 'Video Deeleted successfully.', public_id: publicId });
});

export { uploadVideo, updateVideo, getVideo, deleteVideo };
