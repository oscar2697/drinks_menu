import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice";
import { createFavoriteSlice, FavoriteSliceType } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";
import { AISlice, createAISlice } from "./aiSlice";

export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a),
})))