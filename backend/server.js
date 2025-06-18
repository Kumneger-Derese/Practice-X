import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import connectDB from './config/connectDB.js';
import userRouter from './routes/userRoutes.js';
import skillRouter from './routes/skillRoutes.js';
import videoRouter from './routes/videoRoutes.js';
import reviewRouter from './routes/reviewRoute.js';
import progressRouter from './routes/progressRoute.js';
import practiceTaskRouter from './routes/taskRoutes.js';
import {
  errorConverter,
  errorHandler,
  notFound,
} from './middleware/errorHandler.js';

connectDB();

const app = express();
const port = process.env.PORT || 4200;

//* app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL }));

//* Api endpoints
app.use('/api/users', userRouter);
app.use('/api/skills', skillRouter);
app.use('/api/tasks', practiceTaskRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/progress', progressRouter);
app.use('/api/videos', videoRouter);

//* Error handler middleware
app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
