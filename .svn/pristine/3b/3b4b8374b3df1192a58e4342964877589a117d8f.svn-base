package com.globits.mtyt.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;

import com.globits.mtyt.domain.ChePham;
import com.globits.mtyt.domain.HoSo;

public class HoSoDto {
	private Long id;
	
	private String maHoSo;
	
	private String tenThuTuc;	
	
	private String chuHoSo;
	
	private String diaChi;
	
	private String dienThoai;
	
	private String email;
	
	private Date ngayNopHoSo;
	
	private int trangThai;
	
	private String ghiChu;
	
	private String soHoaDon;
	
	private double soTien;
	
	private String nguoiNopTien;
	
	private Date ngayNopTien;
	
	private int phuongThucThanhToan;
	
	private Set<ChePhamDto> danhSachChePham;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
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
	

	public String getGhiChu() {
		return ghiChu;
	}

	public void setGhiChu(String ghiChu) {
		this.ghiChu = ghiChu;
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
		
	public Set<ChePhamDto> getDanhSachChePham() {
		return danhSachChePham;
	}

	public void setDanhSachChePham(Set<ChePhamDto> danhSachChePham) {
		this.danhSachChePham = danhSachChePham;
	}

	public HoSoDto() {
		
	}
	
	public HoSoDto(HoSo entity) {
		this.id = entity.getId();
		this.chuHoSo = entity.getChuHoSo();
		this.diaChi = entity.getDiaChi();
		this.dienThoai = entity.getDienThoai();
		this.email = entity.getEmail();
		this.maHoSo = entity.getMaHoSo();
		this.ngayNopHoSo = entity.getNgayNopHoSo();
		this.ngayNopTien = entity.getNgayNopTien();
		this.nguoiNopTien = entity.getNguoiNopTien();
		this.phuongThucThanhToan = entity.getPhuongThucThanhToan();
		this.soHoaDon = entity.getSoHoaDon();
		this.soTien = entity.getSoTien();
		this.tenThuTuc = entity.getTenThuTuc();
		this.trangThai = entity.getTrangThai();
		this.ghiChu=entity.getGhiChu();
		if(entity.getDanhSachChePham()!=null && entity.getDanhSachChePham().size()>0) {
			this.danhSachChePham = new HashSet<ChePhamDto>();
			for (ChePham chePham : entity.getDanhSachChePham()) {
				ChePhamDto dto = new ChePhamDto();
				dto.setDonViTinh(chePham.getDonViTinh());
				dto.setHamLuongHoatChat(chePham.getHamLuongHoatChat());
				dto.setId(chePham.getId());
				dto.setSoLuong(chePham.getSoLuong());
				dto.setTacDung(chePham.getTacDung());
				dto.setTenDiaChiNhaSanXuat(chePham.getTenDiaChiNhaSanXuat());
				dto.setTenThuongMai(chePham.getTenThuongMai());
				this.danhSachChePham.add(dto);
			}
		}
	}
	
	public HoSoDto(HoSo entity, boolean simple) {
		this.id = entity.getId();
		this.chuHoSo = entity.getChuHoSo();
		this.diaChi = entity.getDiaChi();
		this.dienThoai = entity.getDienThoai();
		this.email = entity.getEmail();
		this.maHoSo = entity.getMaHoSo();
		this.ngayNopHoSo = entity.getNgayNopHoSo();
		this.ngayNopTien = entity.getNgayNopTien();
		this.nguoiNopTien = entity.getNguoiNopTien();
		this.phuongThucThanhToan = entity.getPhuongThucThanhToan();
		this.soHoaDon = entity.getSoHoaDon();
		this.soTien = entity.getSoTien();
		this.tenThuTuc = entity.getTenThuTuc();
		this.trangThai = entity.getTrangThai();		
		this.ghiChu=entity.getGhiChu();
	}
}
