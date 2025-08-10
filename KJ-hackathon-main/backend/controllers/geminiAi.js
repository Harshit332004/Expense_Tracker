import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.API_KEY)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const AImodel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const genAI2 = new GoogleGenerativeAI(process.env.API_KEY2);

const AImodel2 = genAI2.getGenerativeModel({ model: "gemini-1.5-flash" })

export {AImodel, AImodel2}