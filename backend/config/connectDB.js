import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Databese connection Established!');
  } catch (error) {
    console.log('Databese connection Failed!', error.message);
  }
};

export default connectDB;
