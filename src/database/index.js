import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/profile', {
    useNewUrlParser: true,
    useUnifedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;

export default mongoose;