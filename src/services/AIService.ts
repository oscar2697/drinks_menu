import { streamText } from "ai"
import { openRouter } from "../lib/ai"

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openRouter('')
        })
    }
}