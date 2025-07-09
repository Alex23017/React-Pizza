import { calcTotalPrice } from "./calcTotalPrice";

export const getLocalStorage = () => {
    const data = localStorage.getItem("storage");
    let items = [];

    try {
        items = data ? JSON.parse(data) : [];
        if (!Array.isArray(items)) {
            throw new Error("Invalid storage format");
        }
    } catch (error) {
        console.warn("Failed to parse localStorage 'storage':", error);
        items = []; // fallback to empty array
    }

    const totalPrice = calcTotalPrice(items);

    return {
        items,
        totalPrice,
    };
};
