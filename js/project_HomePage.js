
let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
//Đăng xuất
document.getElementById("btnLogout").addEventListener("click", function () {
    //Xử lý logout
    //1. Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");

    //User đăng xuất đang hoạt động --> điều hướng sang trang Login
    window.location.href = "project_Login.html";
})

// khóa học
let arrCourse = [];
function totalCourse() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];

    let course = document.getElementById("khoaHoc");
    course.innerHTML += arrCourse.length.toString();
}
totalCourse();


// tổng số lớp học
let arrClass = [];
function getArrClass() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    arrCourse.forEach((course) => {
        course.arrClass.forEach((classItem) => {
            arrClass.push({
                courseId: classItem.courseId,
                classId: classItem.classId,
                className: classItem.className,
                lecturer: classItem.teacher,
                description: classItem.describe,
                totalNumber: classItem.number,
                status: classItem.isstatus,
                arrStudent: []
            })

        })
    });
};
getArrClass();
let lopHoc = document.getElementById("lopHoc");
lopHoc.innerHTML += arrClass.length.toString();

//lớp đang hoạt động
let lopHoatDong = 0;
for (let i = 0; i < arrClass.length; i++) {
    if (arrClass[i].status == "Hoạt Động") {
        lopHoatDong += 1;
    }
}
let lopHoatDong1 = document.getElementById("lopHoatDong");
lopHoatDong1.innerHTML += arrClass.length.toString();

// lớp kết thúc
let lopKetThuc = 0;
for (let i = 0; i < arrClass.length; i++) {
    if (arrClass[i].status == "Kết thúc") {
        lopKetThuc += 1;
    }
}
let lopKetThuc1 = document.getElementById("lopKetThuc");
lopKetThuc1.innerHTML += arrClass.length.toString();

// lớp chờ
let choLop = 0;
for (let i = 0; i < arrClass.length; i++) {
    if (arrClass[i].status == "Chờ lớp") {
        choLop += 1;
    }
}
let choLop1 = document.getElementById("lopCho");
choLop1.innerHTML += arrClass.length.toString();

//tổng số sinh viên
let total = JSON.parse(localStorage.getItem("studentManagement")) || [];
let arrStudent = [];
function totalStuden() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    arrCourse.forEach((course) => {
        course.arrClass.forEach((classItem) => {
            classItem.arrStudent.forEach((studentItem) => {
                arrStudent.push({
                    studentId: studentItem.studentId,
                    studentName: studentItem.studentName,
                    year: studentItem.year,
                    address: studentItem.address,
                    email: studentItem.email,
                    phone: studentItem.phone,
                    sex: studentItem.sex,
                    status: studentItem.status,
                    className: classItem.className,
                    courseName: course.courseName,
                });
            })
        });
    });
}
totalStuden();
let tex = document.getElementById("totalStudent");
tex.innerHTML += arrStudent.length.toString();

//tổng số chờ lớp
let lopCho = 0;
for (let i = 0; i < arrStudent.length; i++) {
    if (arrStudent[i].status == "Đang chờ") {
        lopCho += 1;
    }
}
let lopCho1 = document.getElementById("choLop");
lopCho1.innerHTML += choLop.toString();

//tổng số đang hoc
let dangHoc = 0;
for (let i = 0; i < arrStudent.length; i++) {
    if (arrStudent[i].status == "Đang học") {
        dangHoc += 1;
    }
}
let lopDangHoc = document.getElementById("dangHoc");
lopDangHoc.innerHTML += dangHoc.toString();

//tổng số bỏ lưu
let baoLuu = 0;
for (let i = 0; i < arrStudent.length; i++) {
    if (arrStudent[i].status == "Bảo lưu") {
        baoLuu += 1;
    }
}
let baoLuu2 = document.getElementById("baoLuu");
baoLuu2.innerHTML += baoLuu.toString();

//tổng số SV tốt nghiệp
let totNghiep = 0;
for (let i = 0; i < arrStudent.length; i++) {
    if (arrStudent[i].status == "Đã tốt nghiệp") {
        totNghiep += 1;
    }
}
let totNghiep2 = document.getElementById("totNghiep");
totNghiep2.innerHTML += totNghiep.toString();



