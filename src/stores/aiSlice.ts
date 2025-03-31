import { StateCreator } from "zustand"
import AIService from "../services/AIService"

export type AISlice = {
    recipe: string
    isgenerating: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
    recipe: '',
    isgenerating: false,
    generateRecipe: async (prompt) => {
        set({recipe: '', isgenerating: true})
        const data = await AIService.generateRecipe(prompt)

        for await (const textPart of data) {
            set((state => ({
                recipe: state.recipe + textPart
            })))
        }  

        set({isgenerating: false})
    }
})