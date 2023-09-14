// ĐANG XUAT
let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
//Đăng xuất
document.getElementById("btnLogout").addEventListener("click", function () {
    //Xử lý logout
    //1. Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");

    //User đăng xuất đang hoạt động --> điều hướng sang trang Login
    window.location.href = "project_Login.html";
})


// 1. KHAI BAO
//Lấy giá trị trong biểu mẫu thêm mới
let courseId = document.getElementById("courseId");
let courseName = document.getElementById("courseName");
let courseTime = document.getElementById("courseTime");

let editCourseId = document.getElementById("editCourseId");
let editCourseName = document.getElementById("editCourseName");
let editCourseTime = document.getElementById("editCourseTime");
let isActive = document.getElementById("editActive");


let idTargetCourse = "";
let idDeleteCourse = "";

// //1. Lấy dữ liệu hiện lưu trữ ở localStorage
let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
// truy cập danh sách khóa học
let listCourse = document.getElementById("listCourse");

function resetData() {

    editCourseId.value = "";
    editCourseName.value = "";
    editCourseTime.value = "";
    isActive.checked = true ? "Hoạt động" : "Không hoạt động";

}

//2. THEM MỚI
//thêm value thêm mới vào listCourse
listCourse.html += "";
document.getElementById("btnCreateCourse").addEventListener("click", function () {
    //lấy giá trị status
    let isActive = document.getElementById("active").checked;
    // //1. Lấy dữ liệu arrCourse từ localStorage

    //tạo object để đưa dữ liệu từ modal vào danh sách
    let newCourse = {
        courseId: courseId.value,
        courseName: courseName.value,
        courseTime: courseTime.value,
        status: isActive == true ? "Hoạt động" : "Không hoạt động",
        arrClass: []
    };
    //3. push dư liệu thêm mới vào arrCourse
    arrCourse.push(newCourse);
    //4. Đẩy arrCourse vào localStorage
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    //5. Đóng modal-Biểu mẫu
    courseId.value = "";
    courseName.value = "";
    courseTime.value = "";
    isActive.checked = true;
    //newCourseModal.hide();
    //6. render lại dữ liệu
    renderDataPage(currentPage);

});

// 3. TÌM KIẾM
// 1. thực hiện seach dữ liệu
document.getElementById("btnSearchCourseName").addEventListener("click", function () {
    //1. Lấy dữ liệu hiện lưu trữ ở localStorage
    let listCourseData = JSON.parse(localStorage.getItem("studentManagement")) || [];
    //2. Lấy dữ liệu trên ô input search
    let courseSeach = document.getElementById("searchCourseName").value;
    //3. Tìm kiếm dữ liệu trên arrCategories
    arrCourse = listCourseData.filter(element => element.courseId.toLowerCase().includes(courseSeach.toLowerCase()));
    //4. render dữ liệu lên table
    renderDataPage(1);

});

//4.SĂP XẾP
//Thực hiện sắp xếp dữ liệu
document.getElementById("orderCourse").addEventListener("change", function () {
    //1.  Lấy dữ liệu hiện lưu trữ ở localStorage
    let listCourseData = JSON.parse(localStorage.getItem("studentManagement")) || [];
    //2. Lấy giá trị sắp xếp
    let sortData = document.getElementById("orderCourse").value;
    console.log("=>", arrCourse);
    if (sortData != "") {

        //3.Lấy ra tiêu chí sắp xếp

        //4. thực hiện sắp sếp

        if (sortData == "tangdan") {
            //Sắp xếp theo tên danh mục tăng dần
            arrCourse = listCourseData.sort((a, b) => (a.courseId > b.courseId) ? 1 : (a.courseId < b.courseId) ? -1 : 0);
        } else {
            //Sắp xếp theo tên danh mục giảm dần
            arrCourse = listCourseData.sort((a, b) => (a.courseId > b.courseId) ? -1 : (a.courseId < b.courseId) ? 1 : 0);
        }

        //render lại dữ liệu
        renderDataPage(1);

    }
});
//5.SỬA
function editCourse(idCourse) {
    arrCourse.forEach(function (course) {
        if (course.courseId == idCourse) {
            editCourseId.value = course.courseId;
            editCourseName.value = course.courseName;
            editCourseTime.value = course.courseTime;
            isActive.checked = course.status;
        }
        localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
        idTargetCourse = idCourse;
        
    })
    renderDataPage(currentPage);

};
function updateCourse() {
    let editCourse = {
        arrClass: [],
        courseId: idTargetCourse,
        courseName: editCourseName.value,
        courseTime: editCourseTime.value,
        status: isActive.checked
    }

    arrCourse.forEach(function (course) {
        if (course.courseId == idTargetCourse) {
            course.arrClass = editCourse.arrClass;
            course.courseId = editCourse.courseId;
            course.courseName = editCourse.courseName,
                course.courseTime = editCourse.courseTime,
                course.status = editCourse.status
        }
    })

    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    resetData();
    renderDataPage(currentPage);

    // window.onload = function () { renderData() }

};

// 6.XÓA
function deleteCourse01(idCourse) {
    idDeleteCourse = idCourse;
}
function deleteCourse02() {

    let deleteCourse = document.getElementById("deleteCourse");
    deleteCourse.innerText = ` Bạn có muốn xóa khóa học ${idDeleteCourse} ?`
    arrCourse.forEach(function (course, index) {
        if (course.courseId == idDeleteCourse) {
            arrCourse.splice(index, 1);
        }
    })
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    renderDataPage(currentPage);


};


// 7.PHAN TRANG
//Function thực hiện render dữ liệu theo trang
//Định nghĩa số dữ liệu trên trang
let recordsPerPage = 5;
let currentPage = 1;

function renderDataPage(page) {
    //Hiển thị dữ liệu cho page
    //1. Render danh sách trang
    //1.1. Tính được tổng số trang cần render
    let totalPage = getTotalPage();

    // 2. Render dữ liệu của page trên table
    // 2.1. Kiểm tra page
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
    if (indexTo > arrCourse.length) {
        indexTo = arrCourse.length;
    }


    //2.3. Render dữ liệu của arrCourse từ indexForm đến indexTo lên table
    let listCourseData = document.getElementById("listCourse");
    listCourseData.innerHTML = "";

    for (let index = indexForm; index < indexTo; index++) {
        listCourseData.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${arrCourse[index].courseId}</td>
            <td>${arrCourse[index].courseName}</td>
            <td>${arrCourse[index].courseTime}</td>
            <td>${arrCourse[index].status ? "Hoạt động" : "Không hoạt động"}</td>
            <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newEditCourse" onclick="editCourse('${arrCourse[index].courseId
            }')">Sửa</button>                    
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete" onclick="deleteCourse01('${arrCourse[index].courseId
            }')">Xóa</button>
            </td>
            </tr>
            `;
    }
}
// Function tính tổng số trang theo dữ liệu
function getTotalPage() {
    return Math.ceil(arrCourse.length / recordsPerPage);
}

// Hàm render dữ liệu theo trang khi click vào các trang
function clickPage(page) {
    currentPage = page;
    // let listPage = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    renderDataPage(currentPage);
}
// Hàm previewPage
function previewPage() {
    currentPage--;
    // render lại dữ liệu lên table
    let listPage = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    renderDataPage(currentPage, listPage);
}
// Hàm nextPage
function nextPage() {
    currentPage++;
    let listPage = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
    renderDataPage(currentPage, listPage);

}






window.onload = function () {
    renderDataPage(1);
};