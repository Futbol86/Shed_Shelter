import {PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_TYPES, PRODUCT_CATEGORY_GABLE_CARPORTS} from "../../../../../constants";

export const isSkillionCarport = (productId) => {
    const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(productId));
    if (currentProduct) {
        return (currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS);
    }
    return false;
};

export const isCarport = (productId) => {
    const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(productId));
    if (currentProduct) {
        const isCarport = (currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
            currentProduct.categoryId === PRODUCT_CATEGORY_GABLE_CARPORTS);
        return isCarport;
    }
    return false;
};