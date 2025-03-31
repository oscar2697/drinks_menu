import { streamText } from "ai"
import { openRouter } from "../lib/ai"

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openRouter('huggingfaceh4/zephyr-7b-beta:free'),
            prompt,
            system: 'You are a bartender with 50 years of experience, and you just served a drink to James Bond',
            temperature: 1
        })
        return result.textStream
    }
}