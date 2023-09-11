let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

document.getElementById("btnLogin").addEventListener("click", function (even) {
    //ngăn ko cho tải lại form
    even.preventDefault();
    //lấy thông tin các tài khoản có trong hệ thống
    let userSystems = JSON.parse(localStorage.getItem("userSystems")) || [];
    //2. Lấy value trên form đăng nhập: email, password
    let email = emailInput.value;
    let password = passwordInput.value;
    //3. Kiểm tra email và passwrord có trùng với tài khoản hệ thống đang ở trạng thái hoạt động
    let uerLogin = userSystems.findIndex(uer => uer.email == email && uer.password == password)
     //4. Điều hướng trang sang trang thích hợp
     if(uerLogin==-1){
        emailInput.value="";
        passwordInput.value="";
        alert("Email hoặc password không chính xác")
     }else{
        //Kiểm tra trạng thái user
        if (userSystems[uerLogin].status) {
            //set thông tin người dùng đăng nhập vào localStorage
            localStorage.setItem("userLogin",email);
            //User đăng nhập đang hoạt động --> điều hướng sang trang chủ
            window.location.href="project_HomePage.html";            
        }else{
            alert("Tài khoản đăng nhập đang bị khóa")
        }
     }

})