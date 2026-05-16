import {db} from './firebase-config.js';
import { collection, query, orderBy, limit, getDocs, doc, getDoc, addDoc, updateDoc, where} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";
import {checkSession} from './check_session.js';

// Hiển thị danh sách sản phẩm
export async function getProductList(container, limitCount) {
    let htmls = '';
    try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(limitCount));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productId = doc.id;
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
            htmls += `
                 <div class="product-item col-md-3 col-6">
                    <div class="content p-2">
                        <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid rounded">
                        <div class="text p-2">
                            <div class="d-flex justify-content-between flex-column align-items-center">
                                <h5 class="mb-2 text-uppercase">${product.name}</h5>
                                <p class="mb-3">Giá: <span class="fs-6 fw-semibold text-danger">${formattedPrice}</span></p>
                            </div>
                            <button class="btn btn-primary btn-order mt-2 w-100" data-id="${productId}">Đặt hàng</button>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = htmls;

        // Thêm sự kiện cho các nút "Đặt hàng"
        let btnOrder = document.querySelectorAll('.btn-order');
        btnOrder.forEach(btn => {
            btn.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                checkSession(); 
                //showOrderForm(productId);
            });
        });
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm: ", error);
    }
}