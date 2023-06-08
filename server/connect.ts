import mongoose from 'mongoose';

type DBInput = {
  db: string;
};

export default ({ db }: DBInput) => {
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((err) => {
        console.error('Failed to connect to database: ', err);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on('disconnected', connect);
};
