import jwt from "jsonwebtoken";
import env from "dotenv";
import User from "../database/Schema.js";
env.config();

 const ProtectionRoutes = async (req, res, next) => {
	
	try {
		const token = req.cookies["netflix_cookie"];

		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized - Need to login or signup first" });
		}

		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}
		const data = await User.findOne(decoded.userId).select("-password");
		
		if (!data) {
			 res.status(404).json({ success: false, message: "User not found" });
			 return null;
		}
		

		next();	
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}	
 }
export default ProtectionRoutes