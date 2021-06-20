import mongoose from 'mongoose';
import postMessage from '../models/postMessages.js'


// get post function
export const getPosts = async (req, res) => {
    try {
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// create post function
export const createPost = async (req, res) => {
    const post = req.body;
    console.log("request called");
    const newPost = new postMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: ErrorEvent.message });
    }
}



export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id");
    const updatedPost = await postMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}



export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id");
    await postMessage.findByIdAndRemove(_id);
    res.json({ message: "post deleted successfully" });
}


export const likePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id");
    const post = await postMessage.findById(_id);
    const updatedPost = await postMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatedPost);

}