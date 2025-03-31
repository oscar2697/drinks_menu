import Loader from "../components/Loader"
import { useAppStore } from "../stores/useAppStore"
import { useState, useEffect } from "react"

const GenerateAI = () => {
    const showNotification = useAppStore(state => state.showNotification)
    const generateRecipe = useAppStore(state => state.generateRecipe)
    const recipe = useAppStore(state => state.recipe)
    const isgenerating = useAppStore(state => state.isgenerating)

    const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        if (recipe) {
            setShowResult(true)
        }
    }, [recipe])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)
        const prompt = form.get('prompt') as string

        if(prompt.trim() === '') {
            showNotification({
                text: "No empty searches allowed! Let's shake up a drink idea!",
                error: true
            })
            return
        }

        setShowResult(false) 
        await generateRecipe(prompt)
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-600 mb-6">
                    Sips & Scripts: AI-Generated Drinks
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-3 py-4"
                >
                    <div className="relative">
                        <input
                            name="prompt"
                            id="prompt"
                            className="border bg-white p-4 rounded-lg w-full border-slate-300 focus:outline-none focus:slate-amber-500"
                            placeholder="Thirsty? Enter an ingredient to create a recipe!"
                        />

                        <button
                            type="submit"
                            aria-label="Generate Recipe"
                            className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-slate-500 p-2 rounded-full text-white ${isgenerating ? 'opacity-50' : 'hover:bg-slate-600'}`}
                            disabled={isgenerating}
                        >
                            {isgenerating ? (
                                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle 
                                        className="opacity-25" 
                                        cx="12" cy="12" r="10" 
                                        stroke="currentColor" strokeWidth="4"
                                    ></circle>

                                    <path 
                                        className="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" 
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                        d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </form>

                {isgenerating && (
                    <div className="flex flex-col items-center justify-center py-6">
                        <Loader />
                        <p className="text-gray-500 mt-4">Creating your recipe...</p>
                    </div>
                )}

                {recipe && !isgenerating && (
                    <div 
                        className={`mt-6 transition-all duration-500 ${showResult ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="bg-slate-100 p-6 rounded-lg border border-slate-200">
                            <div className="recipe-container">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                                    {recipe.split('\n')[0]}
                                </h2>

                                <div className="recipe-content">
                                    {recipe.split('\n').slice(1).map((line, index) => {
                                        if (line.toLowerCase().includes('ingredients:') || 
                                            line.toLowerCase().includes('instructions:') || 
                                            line.toLowerCase().includes('garnish:') ||
                                            line.toLowerCase().includes('glass:')) {
                                            return (
                                                <h3 key={index} className="text-xl font-bold mt-4 mb-2 text-slate-700">
                                                    {line}
                                                </h3>
                                            )
                                        }

                                        if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                                            return (
                                                <p key={index} className="ml-4 mb-1">
                                                    • {line.trim().substring(1).trim()}
                                                </p>
                                            )
                                        }

                                        return (
                                            <p key={index} className="mb-2">
                                                {line}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(recipe)
                                    showNotification({
                                        text: 'Recipe copied to clipboard!',
                                        error: false
                                    })
                                }}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-800"
                            >
                                Copy Recipe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GenerateAI