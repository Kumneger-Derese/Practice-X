import { Router } from 'express';
import { protect } from '../middleware/protect.js';
import { upload } from '../middleware/upload.js';
import {
  deleteVideo,
  getVideo,
  updateVideo,
  uploadVideo,
} from '../controller/videoController.js';

const videoRouter = Router();

videoRouter.use(protect);

videoRouter.post('/upload', upload.single('video'), uploadVideo);
videoRouter.put('/update', upload.single('video'), updateVideo);
videoRouter.get('/:publicId', getVideo);
videoRouter.delete('/delete', deleteVideo);

export default videoRouter;
