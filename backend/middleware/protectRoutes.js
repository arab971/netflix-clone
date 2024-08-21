import jwt from "jsonwebtoken";
import env from "dotenv";
import User from "../database/Schema.js";
env.config();

export const protection = async (req, res,userId, next) => {
	try {
		const token= req.cookies.User._id;
	
		
			const permision = req.cookie(User._id);


			

		const decoded = jwt.verify(token, process.env.JWT_SECRET,);
		
		// if (!decoded) {
		// 	return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		// }

		const user = await User.findById(decoded.userId).select("-password");
		
		if (!user) {
			return res.status(404).json({ success: false, message: "There is no user of this id" });
		
		}
 req.user = user

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ success: false, message: error.message });
	}}