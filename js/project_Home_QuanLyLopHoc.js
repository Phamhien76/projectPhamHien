// 1. KHAI BAO
//Lấy giá trị trong biểu mẫu thêm mới
let classId = document.getElementById("classId");
let className = document.getElementById("className");
let teacher = document.getElementById("teacher");
let describe = document.getElementById("describe");
let number = document.getElementById("number");
let isstatus = document.getElementById("status");
let courseId = document.getElementById("courseId")


//Lấy giá trị trong biểu mẫu sửa
let editClassId = document.getElementById("editClassId");
let editClassName = document.getElementById("editClassName");
let editTeacher = document.getElementById("editTeacher");
let editDescribe = document.getElementById("editDescribe");
let editNumber = document.getElementById("editNumber");
let editStatus = document.getElementById("editStatus");
let editCourseId = document.getElementById("editCourseId")


let idTargetClass = "";
let idDeleteClass = "";



//1. Lấy dữ liệu hiện lưu trữ ở localStorage
// truy cập danh sách khóa học
let listClass = document.getElementById("listClass");

let arrClass = [];
let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
arrCourse.forEach((course) => {
    let classArrCourse = course.arrClass.map((classItem) => {
        return {
            courseName: course.courseName,
            courseId: course.courseId,
            ...classItem,
        };
    });
    arrClass = arrClass.concat(classArrCourse);
});


// Lay arrClass tu studentManagement
function getArrClass() {
    arrClass = [];
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    arrCourse.forEach((course) => {
        let classArrCourse = course.arrClass.map((classItem) => {
            return {
                courseName: course.courseName,
                courseId: course.courseId,
                ...classItem,
            };
        });
        arrClass = arrClass.concat(classArrCourse);
    });
};

// Luu arrClass vao studentManagement
function saveArrClass() {
    // save storage...
    for (let index = 0; index < arrCourse.length; index++) {
        const course = arrCourse[index];
        for (let j = 0; j < course.arrClass.length; j++) {
            const classItem = course.arrClass[j];
            if (classItem.classId == idTargetClass) {
                classItem.classId = idTargetClass;
                classItem.className = editClassName.value;
                classItem.lecturer = editTeacher.value;
                classItem.description = editDescribe.value;
                classItem.totalNumber = editNumber.value;
                classItem.status = editStatus.value;
            }
        }
    }

    localStorage.setItem("studentManagement", JSON.stringify(arrCourse))
}

//2. THEM MỚI
//cho option vào mã khóa học thêm mới
function renderOptionIdCourse() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let optionIdCourse = document.getElementById("courseId");
    arrCourse.forEach((option) => {
        optionIdCourse.innerHTML += ` <option value="${option.courseId}">${option.courseId}</option>`
    })
}
function loadDataSelectOption() {
    renderOptionIdCourse();
}
// thực hiện nút thêm mới
//listClass.html += "";
document.getElementById("btnCreateClass").addEventListener("click", function () {
    let newClass = {
        courseId: courseId.value,
        classId: classId.value,
        className: className.value,
        lecturer: teacher.value,
        description: describe.value,
        totalNumber: number.value,
        status: isstatus.value,
        arrStudent: []

    };
    arrCourse.forEach(function (course) {
        if (course.courseId == newClass.courseId) {
            course.arrClass.push(newClass);
        }
    })
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

    getArrClass();
    console.log("=>", arrCourse);
    classId.value = "";
    className.value = "";
    teacher.value = "";
    describe = "";
    number.value = "";
    isstatus.value = "";
    courseId.value = "";
    renderDataPage(currentPage);
    renderOptionIdCourse()

});

//5.SỬA
//ediCourseId
//cho option vào mã khóa học thêm mới
function renderEditOptionIdCourse() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let editOptionIdCourse = document.getElementById("ediCourseId");
    arrCourse.forEach((option) => {
       editOptionIdCourse.innerHTML += ` <option value="${option.courseId}">${option.courseId}</option>`
    })
}
//thực hiện nút thêm mới
function editClass(classId) {
    // Luu classId khi ấn Edit
    idTargetClass = classId;
    arrCourse.forEach(function (course) {
        course.arrClass.forEach((classItem) => {
            if (classItem.classId == classId) {
                courseId.value = classItem.courseId;
                editClassId.value = classItem.classId;
                editClassName.value = classItem.className;
                editTeacher.value = classItem.lecturer;
                editDescribe.value = classItem.description;
                editNumber.value = classItem.totalNumber;
                editStatus.value = classItem.status;
            };
        })
    })
    renderEditOptionIdCourse();
};

function updateClass() {  
    saveArrClass();
    // Xoa idTargetClass
    idTargetClass = "";

    // resetData();
    getArrClass();
    renderDataPage(currentPage)
    
    // myModal.hide();
    window.onload = function () { renderData() }
};

// 6.XÓA
function deleteClass01(index, className) {
    idDeleteClass = index;
    let deleteClass = document.getElementById("deleteClass");
    deleteClass.innerHTML = ` Bạn có chắc là muốn xóa lớp học ${className} không?`
}
function deleteClass02() {
    for (let i = 0; i < arrCourse.length; i++) {
        // const course = arrCourse[i];
        for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
            const classItem = arrCourse[i].arrClass[j];
            if (classItem.classId == idDeleteClass) {
                arrClass.splice(j, 1);
            }
        }
    }
    localStorage.setItem("studentManagement", JSON.stringify(arrCourse))
    renderDataPage(currentPage);
};

// 3. TÌM KIẾM
function btnSearchClass() {
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement"));
    //2. Lấy dữ liệu trên ô input search
    let classSearch = document.getElementById("searchClass");
    let valueSearch = classSearch.value.toLowerCase();
    let classItem = [];
    for (let i = 0; i <= arrCourse.length; i++) {
        for (let j = 0; j <= arrCourse[i]?.arrClass?.length; j++) {
            classItem.push(arrCourse[i].arrClass[j]);        
        }
    }
    let classItemfilter = classItem.filter(element => element?.classId?.toLowerCase().includes(valueSearch));
    //4. render dữ liệu lên table
    let listClassData = document.getElementById("listClass");
    listClassData.innerHTML = "";
    for (let index = 0; index < classItemfilter.length; index++) {
        listClassData.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${classItemfilter[index]?.classId}</td>
            <td>${classItemfilter[index]?.className}</td>
            <td>${classItemfilter[index]?.lecturer}</td>
            <td>${classItemfilter[index]?.description}</td>
            <td>${classItemfilter[index]?.totalNumber}</td>
            <td>${classItemfilter[index]?.status}</td>
            <td>${classItemfilter[index]?.courseName}</td>
            <td>            
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newEditClass" onclick="editClass('${arrClass[index].classId
            }')">Sửa</button>                    
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteClassModal" onclick="deleteClass01('${arrClass[index].classId
            }')">Xóa</button></td>
            </tr>
            `;
    }

};

//4.SĂP XẾP
function orderClass () {
    //1.  Lấy dữ liệu hiện lưu trữ ở localStorage
    let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let classSearch=[];
    //2. Lấy giá trị sắp xếp
    let sortData = document.getElementById("orderClass").value;
    for (let i = 0; i <= arrCourse.length; i++) {
        for (let j = 0; j <= arrCourse[i]?.arrClass?.length; j++) {
            classSearch.push(arrCourse[i].arrClass[j]);        
        }
    }
    if (sortData != "") {
        if (sortData == "tangdan") {
            //Sắp xếp theo tên danh mục tăng dần
            arrClass =  classSearch.sort((a, b) => (a.classId > b.classId) ? 1 : (a.classId < b.classId) ? -1 : 0);
        } else {
            //Sắp xếp theo tên danh mục giảm dần
            arrClass =  classSearch.sort((a, b) => (a.classId > b.classId) ? -1 : (a.classId < b.classId) ? 1 : 0);
        }
        //render lại dữ liệu
       //4. render dữ liệu lên table
       let listClassData = document.getElementById("listClass");
       listClassData.innerHTML = "";
       for (let index = 0; index < classSearch.length; index++) {
           listClassData.innerHTML += `
               <tr>
               <td>${index + 1}</td>
               <td>${classSearch[index]?.classId}</td>
               <td>${classSearch[index]?.className}</td>
               <td>${classSearch[index]?.lecturer}</td>
               <td>${classSearch[index]?.description}</td>
               <td>${classSearch[index]?.totalNumber}</td>
               <td>${classSearch[index]?.status}</td>
               <td>${classSearch[index]?.courseName}</td>
               <td>            
               <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newEditClass" onclick="editClass('${arrClass[index].classId
               }')">Sửa</button>                    
               <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteClassModal" onclick="deleteClass01('${arrClass[index].classId
               }')">Xóa</button></td>
               </tr>
               `;
       }
    }
};




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
    if (indexTo > arrClass.length) {
        indexTo = arrClass.length;
    }


    //2.3. Render dữ liệu của arrclass từ indexForm đến indexTo lên table
    let listClassData = document.getElementById("listClass");
    listClassData.innerHTML = "";

    for (let index = indexForm; index < indexTo; index++) {   
        listClassData.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${arrClass[index].classId}</td>
            <td>${arrClass[index].className}</td>
            <td>${arrClass[index].lecturer}</td>
            <td>${arrClass[index].description}</td>
            <td>${arrClass[index].totalNumber}</td>
            <td>${arrClass[index].status}</td>
            <td>${arrClass[index].courseName}</td>
            <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newEditClass" onclick="editClass('${arrClass[index].classId
            }')">Sửa</button>                    
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteClassModal" onclick="deleteClass01('${arrClass[index].classId
            }','${arrClass[index].className}')">Xóa</button>
            </td>
            </tr>
            `;
    }
}
// Function tính tổng số trang theo dữ liệu
function getTotalPage() {
    return Math.ceil(arrClass.length / recordsPerPage);
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
};