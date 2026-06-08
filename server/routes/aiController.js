import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateBlogContent = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.json({ success: false, message: "A title is required to generate content." });
    }

    try {
        // Initialize the SDK using your API key
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // FIXED: Updated the identifier model string to a universally supported version
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Write an engaging, high-quality blog post body content based on the title: "${title}". Do not include the title in the response, just provide the informative paragraphs. Keep it around 100-150 words.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        res.json({ success: true, content: generatedText });

    } catch (error) {
        console.error("Gemini AI Generation Error:", error);
        res.json({ success: false, message: "AI Content generation failed.", error: error.message });
    }
};