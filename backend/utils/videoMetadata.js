// Helper to extract metadata

import { cloudinary } from '../config/cloudinary.js';

const extractVideoMetadata = (uploadResult) => ({
  public_id: uploadResult.public_id,
  secure_url: uploadResult.secure_url,
  duration: uploadResult.duration,
  width: uploadResult.width,
  height: uploadResult.height,
  thumbnail_url: cloudinary.url(`${uploadResult.public_id}.jpg`, {
    resource_type: 'video',
    format: 'jpg',
    transformation: [{ width: 300, height: 200, crop: 'thumb' }],
  }),
});

export { extractVideoMetadata };
