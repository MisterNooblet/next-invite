import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting connection to Atlas.');
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 50000,
    } as ConnectOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`${err}`);
  }
};

export default connectDB;
