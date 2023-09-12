
let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
//Đăng xuất
document.getElementById("btnLogout").addEventListener("click", function () {
    //Xử lý logout
    //1. Xóa item có tên userLogin trong localStorage
    localStorage.removeItem("userLogin");

    //User đăng xuất đang hoạt động --> điều hướng sang trang Login
    window.location.href = "project_Login.html";
})

// thống kê khóa học
// let arrCourse=[];
// function totalCourse() {
//     let course = JSON.parse(localStorage.getItem("studentManagement")) || [];
//     course.forEach(function () {
//         arrCourse.push = ({
//             courseId: courseId.value,
//             courseName: courseName.value,
//             courseTime: courseTime.value,
//             status: isActive == true ? "Hoạt động" : "Không hoạt động",
//             arrClass: []
//         });
//     }) 
//     console.log("skg", arrCourse);
// }
// totalCourse();
// let course = document.getElementById("khoaHoc");
// course.innerHTML += arrCourse.length.toString();


//tổng số lớp học
let arrClass = [];
function getArrClass() {
    
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    arrCourse.forEach((course) => {       
            return arrClass.push({
                courseId: courseId.value,
                classId: classId.value,
                className: className.value,
                lecturer: teacher.value,
                description: describe.value,
                totalNumber: number.value,
                status: isstatus.value,
                arrStudent: []
                }) 
            });
          
        };

console.log("skg", arrClass);
let lopHoc = document.getElementById("lopHoc");
lopHoc.innerHTML += arrClass.length.toString();






















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

//tổng số sinh viên đang hoc
let choLop = 0;
for (let i = 0; i < arrStudent.length; i++) {
    if (arrStudent[i].status == "Đang chờ") {
        choLop += 1;
    }
  }
let lopCho = document.getElementById("choLop");
lopCho.innerHTML += choLop.toString();

//tổng số chờ lớp
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



