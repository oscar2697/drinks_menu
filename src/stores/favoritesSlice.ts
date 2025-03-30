import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoriteSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFavorites: () => void
}

export const createFavoriteSlice : StateCreator<FavoriteSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))

            createNotificationSlice(set, get, api).showNotification({text: 'Successfully removed from favorites', error: false})
        } else {
            set((state) => ({ 
                favorites: [...state.favorites, recipe]
            }))

            createNotificationSlice(set, get, api).showNotification({text: 'Added to favorites', error: false})
        }

        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFavorites: () => {
        const storeFavorites = localStorage.getItem('favorites')
        
        if(storeFavorites) {
            set({
                favorites: JSON.parse(storeFavorites)
            })
        }
    }
})