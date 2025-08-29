import mongoose from 'mongoose';



const connect_to_db = (mongo_URL) => {
    try {
        mongoose.connect(mongo_URL).then(() => console.log("connected to db"));
    } catch (error) {
        console.log("error connecting to db: ", error);
    }
}
export default connect_to_db;

