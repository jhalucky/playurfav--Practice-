import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = Schema(
    {
      thumbnail: {
        type: String,
        required: true
      },

      id: {
        type: String
      },

      title: {
        type: String,
        required: true,

      },
      
      description:{
        type: String,
        
      },

      views: {
        type: Number,
        required: true,
        default: 0  
      },

      videoFile: {
        type: String,
        required: true
      },

      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      isPublished: {
        type: Boolean,
        default: true
      }

    }, {timestamps: true}
)

export const Videos = mongoose.model("Video", videoSchema)