import axios from "axios";

const upload = async (file) => {
	// eslint-disable-next-line
	const data = new FormData();
	data.append("file", file);
	data.append("upload_preset", "fiverr");

	try {
		const res = await axios.post(
			"https://api.cloudinary.com/v1_1/dz5izi0p8/image/upload",
			data,
		);

		const { url } = res.data;
		// console.log(res);
		return url;
	} catch (err) {
		// eslint-disable-next-line
		console.log(err);
	}
};

export default upload;
