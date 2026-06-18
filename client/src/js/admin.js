import { auth, db } from "./firebase-config.js";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, where, query } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js';
import { checkSession } from './check-session.js';

let userSession = JSON.parse(localStorage.getItem('user_session'));
checkSession();

document.addEventListener("DOMContentLoaded", async () => {
    try {
        if (!userSession) {
            alert("Vui lòng đăng nhập để truy cập!");
            window.location.href = "./index.html";
            return;
        }

        const email = userSession.user.email;
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            alert("Không tìm thấy người dùng!");
            window.location.href = "./index.html";
            return;
        }

        querySnapshot.forEach((doc) => {
            const user = doc.data();
            if (user.role_id !== 1) {
                alert("Bạn không có quyền truy cập!");
                window.location.href = "./index.html";
            }
        });

        await loadProducts();

    } catch (err) {
        console.error("Lỗi khi thêm sản phẩm:", err);
        alert("Có lỗi xảy ra khi thêm sản phẩm!");
    }
})


// Hiển thị sản phẩm 
async function loadProducts() {
    try {
        const productTableBody = document.getElementById("product-list");
        let htmls = "";
        let index = 1;
        const querySnapshot = await getDocs(collection(db, "products"));

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            htmls += `
        <tr class="product-item text-center">
          <th>${index}</th>
          <td><img src="${product.imageUrl}" alt="${product.name}"></td>
          <td>${product.name}</td>
          <td>${product.price.toLocaleString('vi-VN')} VND</td>
          <td>
            <button class="btn btn-danger btn-sm btn-delete-product rounded-sm" data-id="${doc.id}">Xóa</button>
          </td>
        </tr>
      `;
            index++;
        });

        productTableBody.innerHTML = htmls;

        document.querySelectorAll(".btn-delete-product").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const productId = btn.getAttribute("data-id");
                if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                    try {
                        await deleteDoc(doc(db, "products", productId));
                        alert("Xóa sản phẩm thành công!");
                        await loadProducts();
                    } catch (error) {
                        console.error("Lỗi khi xóa sản phẩm:", error);
                        alert("Có lỗi xảy ra khi xóa sản phẩm!");
                    }
                }
            });
        });
    } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
    }
}

// Thêm sản phẩm 
document.getElementById('product-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const productName = document.getElementById("product_name").value;
  const productPrice = document.getElementById("product_price").value;

  if (!productName || !productPrice) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name: productName,
      price: parseFloat(productPrice),
      imageUrl: "",
      createdAt: serverTimestamp(),
    });

    alert("Thêm sản phẩm thành công!");
    document.getElementById("product-form").reset();
    await loadProducts();
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    alert("Có lỗi xảy ra khi thêm sản phẩm!");
  }
});

loadProducts();