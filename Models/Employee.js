function Employee () {
    this.maNhanVien = "";
    this.tenNhanVien = "";
    this.chucVu = "";
    this.heSoChucVu ="";
    this.luongCoBan = "";
    this.soGioLamTrongThang = "";
    this.tinhLuong = function () {
        return (Number(this.luongCoBan)*Number(this.soGioLamTrongThang)*Number(this.heSoChucVu));
    };
    this.xepLoai = function () {
        if (this.soGioLamTrongThang > 120){
            return "Xuất sắc"
        } else if (this.soGioLamTrongThang >= 100 && this.soGioLamTrongThang <= 120) {
            return "Giỏi"
        } else if (this.soGioLamTrongThang >= 80 && this.soGioLamTrongThang < 100) {
            return "Khá"
        } else if (this.soGioLamTrongThang >= 50 && this.soGioLamTrongThang < 80){
            return "Trung bình"
        }
    };
}