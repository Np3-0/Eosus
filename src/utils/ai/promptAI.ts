import { model } from "../../config/firebase";

export default async function promptAI(prompt: string[]) {
    const labeled = prompt.map((msg, i) => {
        if (i % 2 === 0) return `User: ${msg}`;
        return `AI: ${msg}`;
    });

    if (labeled.length > 0) {
        labeled[labeled.length - 1] = prompt[prompt.length - 1]; 
    }

    const res = await model.generateContent(labeled);
    const data = res.response;
    return data.text();
}