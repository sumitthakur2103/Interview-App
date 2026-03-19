import express from "express";
import client from "../services/aiService.js";

const generateInterview = async (req, res) => {
    try {
        const response = await client.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "what is react js written in short",
        });
        res.send(response.text);
    }
    catch (e) {
        console.log(e);
    }

};

export { generateInterview };