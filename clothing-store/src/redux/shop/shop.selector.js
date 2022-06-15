import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollection = categoryID => createSelector(
    [selectCollections],
    collections => collections.find(collection => collection.routeName === categoryID)
)