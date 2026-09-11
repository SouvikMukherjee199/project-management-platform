import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// const healthCheck = (req,res,next) => {
// try {
//     res.status(200).json(
//         new ApiResponse(200, {message: "Server is running fine"})
        
//     )
    
// } catch (error) {
//     next(error)
// }
// }

const healthCheck = asyncHandler(async(req,res)=>{
 res.status(200).json(
    new ApiResponse(200, {message: "Server is working fine"})
 )   
})


export default healthCheck;

