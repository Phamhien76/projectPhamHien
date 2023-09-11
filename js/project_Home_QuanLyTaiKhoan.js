let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
//Đăng xuất
document.getElementById("btnLogout").addEventListener("click",function(){
        //Xử lý logout
    //1. Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");

    //User đăng xuất đang hoạt động --> điều hướng sang trang Login
    window.location.href="project_Login.html";   
})
