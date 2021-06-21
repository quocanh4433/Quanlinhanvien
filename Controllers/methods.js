// Xử lí render dữ liệu ra màn hình
//===================================================
function renderTable (array) {
    var content = "";
    for (var index = 0; index < array.length; index++){
        //Mỗi lần duyệt lấy ra 1 đối tượng
        var arrRender = array[index];

        // Tạo lại đối tượng
        var employee = new Employee();
        employee.maNhanVien = arrRender.maNhanVien;
        employee.tenNhanVien = arrRender.tenNhanVien;
        employee.chucVu = arrRender.chucVu;
        employee.heSoChucVu = arrRender.heSoChucVu;
        employee.luongCoBan = arrRender.luongCoBan;
        employee.soGioLamTrongThang = arrRender.soGioLamTrongThang;

        // Từ dữ liệu trên tạo ra 1 chuỗi html
        var trEmployee = `
            <tr> 
                <td>${employee.maNhanVien}</td>
                <td>${employee.tenNhanVien}</td>
                <td>${employee.chucVu}</td>
                <td>${employee.luongCoBan}</td>
                <td>${employee.tinhLuong()}</td>
                <td>${employee.soGioLamTrongThang}</td>
                <td>${employee.xepLoai()}</td>
                <td><button onclick="xoaNhanVien('${employee.maNhanVien}')" class="btn btn-danger">Delete</button></td>
                <td><button onclick="chinhSua('${employee.maNhanVien}')" class="btn btn-primary">Edit</button></td>
            </tr>
        `;
        content += trEmployee;
    };
    // Dom đến tbody trên giao diện để gán innerHTML vào
    document.querySelector('#tbl-employee').innerHTML = content
}
