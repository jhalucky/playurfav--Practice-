import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.models.js"

const registerUser = asyncHandler( async(req, res) => {
   const {fullName, username, email, password} = req.body;

   console.log("email: ", email)

   if ([fullName, username, email, password].some((field) => 
    field?.trim === "")) 
   {
    throw new ApiError(400, "fullname is required")
   } 

   const existedUser = User.findOne({
    $or : [{username}, {email}]
   })

   if (existedUser) {
    throw new ApiError(409, "User with this username or email already exists")
   }
})

export {registerUser}