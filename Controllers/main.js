var validation = new Validation();

// Lấy dữ liệu từ sever
//===================================================
function layDuLieuNhanVien () {
    var promise = axios ({
        url : "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
        method: "GET",
        responseType: "json"
    })

    promise.then(function (result) {
        renderTable(result.data)
    });

    promise.catch(function (error) {
        console.log('Error: ', error.data)
    });
}
layDuLieuNhanVien()

// Đưa dữ liệu nhân viên lên sever
//===================================================
document.querySelector('#addEmlpoyee').onclick = function themDuLieuNhanVien() {
    // Lấy dữ liệu khi người dùng nhập vào
    var nhanVien = new Employee();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    // Lấy tên chức vụ và value tương ứng
    var selectChucVu = document.querySelector('#chucVu');
    var viTriOption = selectChucVu.selectedIndex;
    nhanVien.chucVu = selectChucVu[viTriOption].innerHTML
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;

    // -------------------Validation-------------------------
    var valid = true;
    // Validation 
    //(1). Bắt buộc
    valid &= validation.isEmpty(nhanVien.maNhanVien, "#error_required_maNhanVien", 'Mã nhân viên' )
    & validation.isEmpty(nhanVien.tenNhanVien, "#error_required_tenNhanVien", "Tên nhân viên")
    & validation.isEmpty(nhanVien.luongCoBan, "#error_required_luongCoBan", "Lương cơ bản")
    & validation.isEmpty(nhanVien.soGioLamTrongThang, "#error_required_soGioLamTrongThang", "Số giờ làm việc trong tháng")
    //(2). Chỉ chứa ký tự
    valid &= validation.allLetter(nhanVien.tenNhanVien, "#error_allLetter_tenNhanVien", 'Tên nhân viên' )
    //(3). Chỉ chứa gía trị trong khoảng
    valid &= validation.checkValue(nhanVien.luongCoBan, "#error_value_luongCoBan", 1000000, 20000000, 'Lương cơ bản')
    & validation.checkValue(nhanVien.soGioLamTrongThang, "#error_value_soGioLamTrongThang", 50, 150, 'Số giờ làm trong tháng')
    //(4). Độ dài trong khoảng
    valid &= validation.checkLength(nhanVien.maNhanVien, "#error_length_maNhanVien", 4, 6, 'Mã nhân viên')

    if (!valid){
        return;
    }
    // -------------------End - Validation-------------------------
    var promise = axios ({
        url : "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
        method: "POST", 
        data: nhanVien,
    })

    promise.then(function (result) {
        layDuLieuNhanVien()
    });

    promise.catch(function (error) {
        console.log('Error: ', error.response.data)
    });
}

// Xóa dữ liệu nhân viên trên sever
//===================================================
function xoaNhanVien(maNVClick) {
    var promise = axios ({
        url : `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNVClick}`,
        method: "DELETE"
    })

    promise.then(function (result) {
        layDuLieuNhanVien()
    });

    promise.catch(function (error) {
        console.log('Error: ', error.response.data)
    });
}

// Chỉnh sửa dữ liệu nhân viên trên sever
//===================================================
function chinhSua(maNVClick) {
    // Khóa thẻ
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#addEmlpoyee').disabled = true;

    var promise = axios ({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNVClick}`,
        methos: "GET",
    })

    promise.then(function (result) {
        var nhanVien = result.data
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;
        // Lấy tên chức vụ và value tương ứng
        var selectChucVu = document.querySelector('#chucVu');
        var viTriOption = selectChucVu.selectedIndex;
        selectChucVu[viTriOption].innerHTML = nhanVien.chucVu
        document.querySelector('#chucVu').value = nhanVien.heSoChucVu
    });

    promise.catch(function (error) {
        console.log('Error: ', error.response.data)
    });
}

// Cập nhật thông tin lên sever
//===================================================
document.querySelector('#updateEmlpoyee').onclick = function () {
    // Mở khóa thẻ
    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#addEmlpoyee').disabled = false;
    
    var nhanVienUpdate = new Employee();
    nhanVienUpdate.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVienUpdate.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVienUpdate.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVienUpdate.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    // Lấy tên chức vụ và value tương ứng
    var selectChucVu = document.querySelector('#chucVu');
    var viTriOption = selectChucVu.selectedIndex;
    nhanVienUpdate.chucVu = selectChucVu[viTriOption].innerHTML
    nhanVienUpdate.heSoChucVu = document.querySelector('#chucVu').value;

    var promise = axios ({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVienUpdate.maNhanVien}`,
        method: "PUT",
        data: nhanVienUpdate,
    });

    promise.then(function (result) {
        layDuLieuNhanVien()
    });

    promise.catch(function (error) {
        console.log('Error cập nhật liệu thất bại:', error.response.data)
    });
};


