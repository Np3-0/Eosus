import { model } from "../config/firebase";

export default async function promptAI(prompt: string) { 
    console.log(prompt);
    const res = await model.generateContent(prompt);
    const data = res.response;
    console.log(data.text());
}