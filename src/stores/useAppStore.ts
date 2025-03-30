import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice";
import { createFavoriteSlice, FavoriteSliceType } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
})))