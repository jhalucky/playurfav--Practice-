import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessAndRefreshTokens = async (req, res) => {
    try {
       const user = await User.findById(userId)
       const accessToken = user.generateAccessTokens()
       const refreshToken = user.generateRefreshTokens()

       user.refreshToken = refreshToken
       await user.save({ vaidateBeforeSave: false})

       return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Error while generating tokens")
    }
}

const registerUser = asyncHandler( async(req, res) => {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

   const {fullName, username, email, password} = req.body;

   console.log("email: ", email)

   if ([fullName, username, email, password].some((field) => 
    field?.trim() === "")) 
   {
    throw new ApiError(400, "fullname is required")
   } 

   const existedUser = await User.findOne({
    $or : [{username}, {email}]
   }) 

   if (existedUser) {
    throw new ApiError(409, "User with this username or email already exists")
   }

   const avatarLocalPath = req.files?.avatar?.[0]?.path;
   const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

   if (!avatarLocalPath) {
    throw new ApiError(401, "Avatar is required")
   }
   console.log("AVATAR PATH:", avatarLocalPath);


   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!avatar?.url) {
    throw new ApiError(400, "Avatar is required")
   }

   const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select("-password -refreshToken")
   
   if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
   )

})


const loginUser = asyncHandler( async(req, res) => {
    // login User -> data
    // username or email
    // find the user
    // password
    // access and refersh tokens
    // send cookies

    const {email, username, password} = req.body

    if (!username || !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    })

    if (!user) {
        throw new ApiError(404, "user doesn't exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpsOnly : true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

    const logOutUser = asyncHandler( async(req, res) => {
        
    })
})
export {registerUser, loginUser}