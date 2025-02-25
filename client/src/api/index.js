import axios from "axios";

const API=axios.create({
    baseURL: "https://k-genai.onrender.com/api",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/", data);
export const GenerateImage= async (data) => await API.post("/generate-image/", data);
//call this function in the ImageForm component to generate the image