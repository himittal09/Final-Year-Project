import mongoose from 'mongoose';

(<any>mongoose).Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
        console.log('\x1b[32m%s\x1b[0m', `Successfully connected to database: ${process.env.DB}`);
    }, (error: Error) => {
        console.error('\x1b[31m%s\x1b[0m', `MongoDB connection error. Please make sure MongoDB is running. ${error}`);
        process.exit(1);
});

mongoose.set('useCreateIndex', true);

export default mongoose;