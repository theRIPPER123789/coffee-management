import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const inpEmail = document.querySelector("#email");
const inpPwd = document.querySelector("#password");
const loginFrom = document.querySelector("#login-form");

const handleLogin = function(event) {
    event.preventDefault();

    let email = inpEmail.value;
    let password = inpPwd.value; 

    if(!email || !password){
        alert("Vui lòng điền đủ thông tin");
        return;
    }

    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential.user;

        const userSession = {
            user: {
                email: user.email
            },
            expiry: new Date().getTime() + 2*60*60*1000 // 2 giờ sau
        };

        localStorage.setItem('user_session', JSON.stringify(userSession));
        alert("Đăng nhập thành công");
        window.location.href = 'index.html';
    })
    .catch(e =>{
        alert("lỗi"+e.message);
    });
}
loginFrom.addEventListener('submit', handleLogin);