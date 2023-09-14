let arrUserSystems = JSON.parse(localStorage.getItem("userSystems")) || [];
//Đăng xuất
document.getElementById("btnLogout").addEventListener("click", function () {
    //Xử lý logout
    //1. Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");

    //User đăng xuất đang hoạt động --> điều hướng sang trang Login
    window.location.href = "project_Login.html";
})


// Render leen bang
function renderUser() {
    arrUserSystems = JSON.parse(localStorage.getItem("userSystems"));
    let newUserStystem = {
        email: email,
        password: password,
        fullName: fullName,
        status: isstatus
    }
    arrUserSystems.push(newUserStystem);
}


// 7.PHAN TRANG
let recordsPerPage = 3;
let currentPage = 1;

function renderDataPage(page) {
    let totalPage = getTotalPage();

    // 2. Render dữ liệu của page trên table
    if (page == 1) {
        page = 1;
    };
    if (page > totalPage) {
        page = totalPage;
    };
    //1.2. Render danh sách trang
    let pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    for (let index = 1; index <= totalPage; index++) {
        pagination.innerHTML += `
            <li class="page-item"><a class="page-link" href="javascript:clickPage('${index}')" id="listPage">${index}</a></li>
        `
    }

    //1.3. Nếu ở trang 1 thì ẩn Preview, trang cuối thì ẩn Next
    if (page == 1) {
        document.getElementById("preview").style.visibility = "hidden";
    } else {
        document.getElementById("preview").style.visibility = "visible";
    };

    if (page == totalPage) {
        document.getElementById("next").style.visibility = "hidden";
    } else {
        document.getElementById("next").style.visibility = "visible";
    };

    //2.2. Tính được indexForm và indexTo
    let indexForm = (page - 1) * recordsPerPage;
    let indexTo = page * recordsPerPage;
    if (indexTo > arrUserSystems.length) {
        indexTo = arrUserSystems.length;
    }


    //2.3. Render dữ liệu của arrUserSystems từ indexForm đến indexTo lên table
    let listCourseData = document.getElementById("listUser");
    listCourseData.innerHTML = "";

    for (let index = indexForm; index < indexTo; index++) {
        listCourseData.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${arrUserSystems[index].email}</td>
            <td>${arrUserSystems[index].password}</td>
            <td>${arrUserSystems[index].fullName}</td>
            <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#khoa" onclick="lockYes('${arrUserSystems[index].fullName
            }')">Khóa</button>                    
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#moKhoa" onclick="unlockYes('${arrUserSystems[index].fullName
            }')">Mở khóa</button>
            </td>
            </tr>
            `;
    }
}
// Function tính tổng số trang theo dữ liệu
function getTotalPage() {
    return Math.ceil(arrUserSystems.length / recordsPerPage);
}

// Hàm render dữ liệu theo trang khi click vào các trang
function clickPage(page) {
    currentPage = page;
    // let listPage = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    renderDataPage(currentPage);
}
// Hàm previewPage
function previewPage() {
    currentPage--;
    // render lại dữ liệu lên table
    let listPage = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    renderDataPage(currentPage, listPage);
}
// Hàm nextPage
function nextPage() {
    currentPage++;
    let listPage = localStorage.getItem("userSystems") ? JSON.parse(localStorage.getItem("userSystems")) : [];
    renderDataPage(currentPage, listPage);

}
window.onload = function () {
    renderDataPage(1);
};


// 2. TÌM KIẾM
function btnSearchUser() {
    //1. Lấy dữ liệu hiện lưu trữ ở localStorage
    let listCourseData = JSON.parse(localStorage.getItem("userSystems")) || [];
    //2. Lấy dữ liệu trên ô input search
    let courseSeach = document.getElementById("searchUser").value;
    //3. Tìm kiếm dữ liệu trên arrCategories
    arrUserSystems = listCourseData.filter(element => element.fullName.toLowerCase().includes(courseSeach.toLowerCase()));
    //4. render dữ liệu lên table
    renderDataPage(1);

};

//4.SĂP XẾP
//Thực hiện sắp xếp dữ liệu
function orderUser() {
    //1.  Lấy dữ liệu hiện lưu trữ ở localStorage
    let listUser = JSON.parse(localStorage.getItem("userSystems")) || [];
    //2. Lấy giá trị sắp xếp
    let sortData = document.getElementById("orderUser").value;
    if (sortData != "") {
        if (sortData == "tangdan") {
            //Sắp xếp theo tên danh mục tăng dần
            arrUserSystems = listUser.sort((a, b) => (a.fullName > b.fullName) ? 1 : (a.fullName < b.fullName) ? -1 : 0);
        } else {
            //Sắp xếp theo tên danh mục giảm dần
            arrUserSystems = listUser.sort((a, bF) => (a.fullName > b.fullName) ? -1 : (a.fullName < b.fullName) ? 1 : 0);
        }
        renderDataPage(1);

    }
};
// KHOA

function lockYes(fullName) {

    let lock = document.getElementById("lock");
    lock.innerHTML = `<p>Bạn có chắc chắn muốn khóa tài khoản có tên là ${fullName} không ?</p> `
}
function lockButton() {
    renderUser();
    for (let i = 0; i < arrUserSystems.length; i++) {
        if(arrUserSystems[i].fullName=fullName)
        arrUserSystems[i].status = false
    }
}

// MO KHOA
function unlockYes(fullName) {

    let unlock = document.getElementById("unlock");
    unlock.innerHTML = `<p>Bạn có chắc chắn muốn mở khóa tài khoản có tên là ${fullName} không ?</p>`

}
function unlockButton() {
    renderUser();
    for (let i = 0; i < arrUserSystems.length; i++) {
        if(arrUserSystems[i].fullName=fullName)
        arrUserSystems[i].status =true
    }
};