package com.globits.mtyt.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_ho_so")
@XmlRootElement
public class HoSo extends BaseObject{
	@Column(name="ma_ho_so")
	private String maHoSo;
	@Column(name="ten_thu_tuc")
	private String tenThuTuc;	
	@Column(name="chu_ho_so")
	private String chuHoSo;
	@Column(name="dia_chi")
	private String diaChi;
	@Column(name="dien_thoai")
	private String dienThoai;
	@Column(name="email")
	private String email;
	@Column(name="ngay_nop_ho_so")
	private Date ngayNopHoSo;
	@Column(name="trang_thai")
	private int trangThai;
	@Column(name="so_hoa_don")
	private String soHoaDon;
	@Column(name="so_tien")
	private double soTien;
	@Column(name="nguoi_nop_tien")
	private String nguoiNopTien;
	@Column(name="ngay_nop_tien")
	private Date ngayNopTien;
	@Column(name="phuong_thuc_thanh_toan")
	private int phuongThucThanhToan;
	@Column(name="ghi_chu")
	private String ghiChu;
	
	@OneToMany(mappedBy = "hoSo", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval=true)
	private Set<ChePham> danhSachChePham;
	
	public String getMaHoSo() {
		return maHoSo;
	}
	public void setMaHoSo(String maHoSo) {
		this.maHoSo = maHoSo;
	}
	public String getTenThuTuc() {
		return tenThuTuc;
	}
	public void setTenThuTuc(String tenThuTuc) {
		this.tenThuTuc = tenThuTuc;
	}
	public String getChuHoSo() {
		return chuHoSo;
	}
	public void setChuHoSo(String chuHoSo) {
		this.chuHoSo = chuHoSo;
	}
	public String getDiaChi() {
		return diaChi;
	}
	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}
	public String getDienThoai() {
		return dienThoai;
	}
	public void setDienThoai(String dienThoai) {
		this.dienThoai = dienThoai;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getNgayNopHoSo() {
		return ngayNopHoSo;
	}
	public void setNgayNopHoSo(Date ngayNopHoSo) {
		this.ngayNopHoSo = ngayNopHoSo;
	}
	public int getTrangThai() {
		return trangThai;
	}
	public void setTrangThai(int trangThai) {
		this.trangThai = trangThai;
	}
	public String getSoHoaDon() {
		return soHoaDon;
	}
	public void setSoHoaDon(String soHoaDon) {
		this.soHoaDon = soHoaDon;
	}
	public double getSoTien() {
		return soTien;
	}
	public void setSoTien(double soTien) {
		this.soTien = soTien;
	}
	public String getNguoiNopTien() {
		return nguoiNopTien;
	}
	public void setNguoiNopTien(String nguoiNopTien) {
		this.nguoiNopTien = nguoiNopTien;
	}
	public Date getNgayNopTien() {
		return ngayNopTien;
	}
	public void setNgayNopTien(Date ngayNopTien) {
		this.ngayNopTien = ngayNopTien;
	}
	public int getPhuongThucThanhToan() {
		return phuongThucThanhToan;
	}
	public void setPhuongThucThanhToan(int phuongThucThanhToan) {
		this.phuongThucThanhToan = phuongThucThanhToan;
	}
	public Set<ChePham> getDanhSachChePham() {
		return danhSachChePham;
	}
	public void setDanhSachChePham(Set<ChePham> danhSachChePham) {
		this.danhSachChePham = danhSachChePham;
	}
	public String getGhiChu() {
		return ghiChu;
	}
	public void setGhiChu(String ghiChu) {
		this.ghiChu = ghiChu;
	}
	
}
