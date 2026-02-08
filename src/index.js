import { dotenv} from "./config/env.js";
import connectDB from './db/db.js';
import { app } from './app.js';
import { v2 as cloudinary } from "cloudinary";
// dotenv.config({ path: './.env' });



connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on https://localhost:${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
})

console.log("Cloudinary sees key:", cloudinary.config().api_key);








// one way to connect DB and start server
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("Error", (err) => {
//             console.log("ERRR: ", err);
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         throw error;
//     }
// })()