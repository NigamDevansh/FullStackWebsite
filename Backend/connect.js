import mongoose from "mongoose";
const connect = async function connectToMongoDB(URL) {
	try {
		await mongoose.connect(URL);
		console.log("MongoDb Connected");
	} catch (error) {
		console.log(error);
	}
};

export default connect;
