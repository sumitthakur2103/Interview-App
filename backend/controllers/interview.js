import express from "express";
import client from "../services/aiService.js";
import { systemPrompt } from "../utils/systemPrompt.js";
let history = [];
const startInterview = async (req, res) => {
    const prompt = `
${systemPrompt}
Start the interview with first question.
`;

    const result = await client.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });
    const text = result.text;

    history.push({
        role: "assistant",
        content: text
    });

    res.json({ message: text });
    console.log("------------------------");
    console.log(history);
};

const nextStep = async (req, res) => {
    const userAnswer = req.body.answer;
    history.push({
        role: "user",
        content: userAnswer
    });
    const historyText = history
        .map(h => `${h.role}: ${h.content}`)
        .join("\n");

    const prompt = `
${systemPrompt}

Conversation so far:
${historyText}

Continue the interview.
`;
    const result = await client.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });
    const text = result.text;
    history.push({
        role: "assistant",
        content: text
    });
    res.json({ message: text });
    console.log("------------------------");
    console.log(history);
}

const endInterview = async (req, res) => {
    const historyText = history
        .map(h => `${h.role}: ${h.content}`)
        .join("\n");

    const prompt = `
${systemPrompt}

Conversation:
${historyText}

Now give final summary, strengths, weaknesses, improvements.
`;
    const result = await client.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });
    const text = result.text;
    res.json({ message: text });
    history = [];
    console.log("------------------------");
    console.log(history);
    console.log("Interview ended");
}

export { startInterview, nextStep, endInterview };