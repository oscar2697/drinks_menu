import { streamText } from "ai"
import { openRouter } from "../lib/ai"

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openRouter('deepseek/deepseek-chat-v3-0324:free'),
            prompt
        })
        return result.textStream
    }
}