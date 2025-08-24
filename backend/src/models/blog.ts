import mongoose,{Document,Schema, trusted} from "mongoose"

export interface IBlog extends Document{
    title:string;
    content:string;
    author:mongoose.Types.ObjectId;
}

const blogSchema = new Schema<IBlog>(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {timestamps:true}
)

export const Blog = mongoose.model<IBlog>('Blog',blogSchema)