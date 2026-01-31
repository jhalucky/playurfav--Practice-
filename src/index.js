import dotenv from 'dotenv';
import connectDB from './db/db.js';
import { app } from './app.js';

dotenv.config({ path: './.env' });



connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on https://localhost:${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
})







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