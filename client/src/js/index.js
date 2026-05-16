import { getProductList } from "./get-products.js";

document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".product-list");
    getProductList(productContainer, 4);
});