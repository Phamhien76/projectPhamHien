// 1. KHAI BAO
//Lấy giá trị trong biểu mẫu thêm mới
let courseId = document.getElementById("courseId")
let classId = document.getElementById("classId");
let studentId = document.getElementById("studentId");
let studentName = document.getElementById("studenName");
let year = document.getElementById("yearBirth");
let address = document.getElementById("address");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let isstatus = document.getElementById("status");
let nam = document.getElementById("male").checked;


//Lấy giá trị trong biểu mẫu sửa
let editCourseId = document.getElementById("editCourseI")
let editClassId = document.getElementById("editClassId");
let editStudentId = document.getElementById("editStudentId");
let editStudentName = document.getElementById("editStudenName");
let editYear = document.getElementById("editYearBirth");
let editAddress = document.getElementById("editAddress");
let editEmail = document.getElementById("editEmail");
let editStatus = document.getElementById("editStatus");
let editPhone = document.getElementById("editPhone");
let editNam = document.getElementById("editMale").checked;




// Lấy dữ liệu hiện lưu trữ ở localStorage vào mãng sinh viên.
let arrStudent = [];
let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
//
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
                status: studentItem.tatus,
                className: classItem.className,
                courseName: course.courseName, 
            });
        })

    });
});


// cap nhat arrStudent vào studentManagement

function updateArrStudent() {
    // save storage...
    for (let index = 0; index < arrCourse.length; index++) {
        const course = arrCourse[index];
        for (let j = 0; j < course.arrClass.length; j++) {
            const classItem = course.arrClass[j];
            for (let y = 0; y < classItem.arrStudent.length; y++) {
                let studentItem = classItem.arrStudent[y];
                if (studentItem.studentId == idTargetStdent) {
                    studentItem.studentId = idTargetStdent;
                    studentItem.studentName = editClassName.value;
                    studentItem.address = editAddress.value;
                    studentItem.email = editEmail.value;
                    studentItem.phone = editNumber.value;
                    studentItem.status = editStatus.value;
                    studentItem.year = editYear.value;
                    studentItem.sex = editNam.value;
                }
            }
        }
    }

    localStorage.setItem("studentManagement", JSON.stringify(arrCourse))
}

//2. THÊM MỚI
//cho option vào mã khóa học lớp hoc thêm mới
function renderOptionIdCourse() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let optionIdCourse = document.getElementById("courseId");
    arrCourse.forEach((option) => {
        optionIdCourse.innerHTML += ` <option value="${option.courseId}">${option.courseId}</option>`
    })

}

function renderOptionIdClass() {
    let arrClass = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let optionIdClass = document.getElementById("classId");
    arrClass.forEach((course) => {
        course.arrClass.forEach((classItem) => {
            optionIdClass.innerHTML += `<option value="${classItem.classId}">${classItem.classId}</option> `
        })
    })

};
// thực hiện nút thêm mới
function loadDataSelectOption() {
    renderOptionIdCourse();
    renderOptionIdClass();

}
//listClass.html += "";
document.getElementById("btnCreateStudent").addEventListener("click", function () {
    let newStudent = {
        courseId: courseId.value,
        classId: classId.value,
        studentId: studentId.value,
        studentName: studentName.value,
        address: address.value,
        email: email.value,
        phone: phone.value,
        sex: nam == true ? "Nam" : "Nữ",
        year: year.value,
        status: isstatus.value,
    };
    arrCourse.forEach((course) => {
        course.arrClass.forEach((classItem) => {
            classItem.arrStudent.forEach((studentItem) => {
                if (studentItem.studentId == newStudent.studentId)
                    classItem.arrStudent.push(newStudent)
            })
        })
    });
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

    //    làm rỗng o input

    courseId.value = "";
    classId.value = "";
    studentId.value = "";
    studentName.value = "";
    address.value = "";
    email.value = "";
    phone.value = "";
    nam.checked = true;
    year.value = "";
    isstatus.value = "";
    renderDataPage(currentPage)
    renderOptionIdCourse()

});

//5.SỬA
//cho option vào mã khóa học thêm mới
function renderEditOptionIdCourse() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let editOptionIdCourse = document.getElementById("editCourseId");
    arrCourse.forEach((option) => {
        editOptionIdCourse.innerHTML += ` <option value="${option.courseId}">${option.courseId}</option>`
    })

}

function renderEditOptionIdClass() {
    let arrClass = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let optionIdClass = document.getElementById("editClassId");
    arrClass.forEach((course) => {
        course.arrClass.forEach((classItem) => {
            optionIdClass.innerHTML += `<option value="${classItem.classId}">${classItem.classId}</option> `
        })
    })

};
//thực hiện nút sửa
function editStudent(studentId) {
    // Luu classId khi ấn Edit
    idTargetStdent = studentId;
    renderEditOptionIdCourse();
    renderEditOptionIdClass();
    arrCourse.forEach((course) => {
        course.arrClass.forEach((classItem) => {
            classItem.arrStudent.forEach((studentItem) => {
                if (studentItem.studentId == studentId) {
                    editStudentId.value = studentItem.studentId;
                    editStudentName.value = studentItem.studentName;
                    editYear.value = studentItem.year;
                    editAddress.value = studentItem.address;
                    editEmail.value = studentItem.email ;
                    editStatus.value = studentItem.status;
                    editPhone.value = studentItem.phone;
                    editNam.value = studentItem.sex;
            
                }

            })
        })

    });

}


function updateStudent() {
    updateArrStudent()
    // Xoa idTargetClass
    idTargetClass = "";

    // resetData();
    getArrClass();
    renderDataPage(currentPage)

    // myModal.hide();
    window.onload = function () { renderData() }

};

// // 6.XÓA
// function deleteClass01(index) {
//     idDeleteClass = index;
//     let deleteClass = document.getElementById("deleteClass");
//     deleteClass.innerHTML = ` Bạn có muốn xóa khóa học ${index} ?`
// }
// function deleteClass02() {
//     for (let i = 0; i < arrCourse.length; i++) {
//         // const course = arrCourse[i];
//         for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
//             const classItem = arrCourse[i].arrClass[j];
//             if (classItem.classId == idDeleteClass) {
//                 arrClass.splice(j, 1);
//             }
//         }
//     }
//     localStorage.setItem("studentManagement", JSON.stringify(arrCourse))
//     renderDataPage(currentPage);
// };

// // 3. TÌM KIẾM
// function btnSearchClass() {
//     let arrCourse = JSON.parse(localStorage.getItem("studentManagement"));
//     //2. Lấy dữ liệu trên ô input search
//     let classSearch = document.getElementById("searchClass");
//     let valueSearch = classSearch.value.toLowerCase();
//     let classItem = [];
//     for (let i = 0; i <= arrCourse.length; i++) {
//         for (let j = 0; j <= arrCourse[i]?.arrClass?.length; j++) {
//             classItem.push(arrCourse[i].arrClass[j]);        
//         }
//     }
//     let classItemfilter = classItem.filter(element => element?.classId?.toLowerCase().includes(valueSearch));
//     //4. render dữ liệu lên table
//     let listClassData = document.getElementById("listClass");
//     listClassData.innerHTML = "";
//     for (let index = 0; index < classItemfilter.length; index++) {
//         listClassData.innerHTML += `
//             <tr>
//             <td>${index + 1}</td>
//             <td>${classItemfilter[index]?.classId}</td>
//             <td>${classItemfilter[index]?.className}</td>
//             <td>${classItemfilter[index]?.lecturer}</td>
//             <td>${classItemfilter[index]?.description}</td>
//             <td>${classItemfilter[index]?.totalNumber}</td>
//             <td>${classItemfilter[index]?.status}</td>
//             <td>${classItemfilter[index]?.courseName}</td>
//             <td>            
//             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newEditClass" onclick="editClass('${arrClass[index].classId
//             }')">Sửa</button>                    
//             <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteClassModal" onclick="deleteClass01('${arrClass[index].classId
//             }')">Xóa</button></td>
//             </tr>
//             `;
//     }

// };

// //4.SĂP XẾP
// function orderClass () {
//     //1.  Lấy dữ liệu hiện lưu trữ ở localStorage
//     let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
//     let classSearch=[];
//     //2. Lấy giá trị sắp xếp
//     let sortData = document.getElementById("orderClass").value;
//     for (let i = 0; i <= arrCourse.length; i++) {
//         for (let j = 0; j <= arrCourse[i]?.arrClass?.length; j++) {
//             classSearch.push(arrCourse[i].arrClass[j]);        
//         }
//     }
//     if (sortData != "") {
//         if (sortData == "tangdan") {
//             //Sắp xếp theo tên danh mục tăng dần
//             arrClass =  classSearch.sort((a, b) => (a.classId > b.classId) ? 1 : (a.classId < b.classId) ? -1 : 0);
//         } else {
//             //Sắp xếp theo tên danh mục giảm dần
//             arrClass =  classSearch.sort((a, b) => (a.classId > b.classId) ? -1 : (a.classId < b.classId) ? 1 : 0);
//         }
//         //render lại dữ liệu
//        //4. render dữ liệu lên table
//        let listClassData = document.getElementById("listClass");
//        listClassData.innerHTML = "";
//        for (let index = 0; index < classSearch.length; index++) {
//            listClassData.innerHTML += `
//                <tr>
//                <td>${index + 1}</td>
//                <td>${classSearch[index]?.classId}</td>
//                <td>${classSearch[index]?.className}</td>
//                <td>${classSearch[index]?.lecturer}</td>
//                <td>${classSearch[index]?.description}</td>
//                <td>${classSearch[index]?.totalNumber}</td>
//                <td>${classSearch[index]?.status}</td>
//                <td>${classSearch[index]?.courseName}</td>
//                <td>            
//                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newEditClass" onclick="editClass('${arrClass[index].classId
//                }')">Sửa</button>                    
//                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteClassModal" onclick="deleteClass01('${arrClass[index].classId
//                }')">Xóa</button></td>
//                </tr>
//                `;
//        }
//     }
// };

// 7.PHAN TRANG
let recordsPerPage = 5;
let currentPage = 1;

function renderDataPage(page) {
    //1.1. Tính được tổng số trang cần render
    let totalPage = getTotalPage();
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
    if (indexTo > arrStudent.length) {
        indexTo = arrStudent.length;
    }

    let listStudentData = document.getElementById("listStudent");
    listStudentData.innerHTML = "";
    let no = 0;

    for (let index = indexForm; index < indexTo; index++) {
        let studentItem = arrStudent[index];
        
        listStudentData.innerHTML += `
                     <tr>
                     <td>${no += 1}</td>
                     <td>${studentItem.studentId}</td>
                     <td>${studentItem.studentName}</td>
                     <td>${studentItem.year}</td>
                     <td>${studentItem.address}</td>
                     <td>${studentItem.email}</td>
                     <td>${studentItem.phone}</td>
                     <td>${studentItem.sex}</td>
                     <td>${studentItem.status}</td>
                     <td>${studentItem.className}</td>
                     <td>${studentItem.courseName}</td>
                     <td>
                     <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newEditStudent" onclick="editStudent('${studentItem.studentId
            }')">Sửa</button>                    
                     <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteStudentModal" onclick="deleteStudent01('${studentItem.studentId
            }')">Xóa</button>
                     </td>
                     </tr>
                     `;

    }

}


// Function tính tổng số trang theo dữ liệu
function getTotalPage() {
    return Math.ceil(arrStudent.length / recordsPerPage);

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
    let listPage = localStorage.getItem("arrClass") ? JSON.parse(localStorage.getItem("arrClass")) : [];
    renderDataPage(currentPage, listPage);

}
// Hàm nextPage
function nextPage() {
    currentPage++;
    let listPage = localStorage.getItem("arrClass") ? JSON.parse(localStorage.getItem("arrClasst")) : [];
    renderDataPage(currentPage, listPage);


}
window.onload = function () {
    renderDataPage(1);

}