import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/profile', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;

export default mongoose;