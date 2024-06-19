package com.globits.mtyt.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_che_pham")
@XmlRootElement
public class ChePham extends BaseObject{
	@Column(name="ten_thuong_mai")
	private String tenThuongMai;
	@Column(name="ham_luong_hoat_chat")
	private float hamLuongHoatChat;	
	@Column(name="tac_dung")
	private String tacDung;
	@Column(name="don_vi_tinh")
	private String donViTinh;
	@Column(name="so_luong")
	private String soLuong;	
	@Column(name="ten_dia_chi_nha_san_xuat")
	private String tenDiaChiNhaSanXuat;
	
	@ManyToOne
	@JoinColumn(name="ho_so_id")
	private HoSo hoSo;//Loại văn bản
	
	public String getTenThuongMai() {
		return tenThuongMai;
	}
	public void setTenThuongMai(String tenThuongMai) {
		this.tenThuongMai = tenThuongMai;
	}
	public float getHamLuongHoatChat() {
		return hamLuongHoatChat;
	}
	public void setHamLuongHoatChat(float hamLuongHoatChat) {
		this.hamLuongHoatChat = hamLuongHoatChat;
	}
	public String getTacDung() {
		return tacDung;
	}
	public void setTacDung(String tacDung) {
		this.tacDung = tacDung;
	}
	public String getDonViTinh() {
		return donViTinh;
	}
	public void setDonViTinh(String donViTinh) {
		this.donViTinh = donViTinh;
	}
	public String getSoLuong() {
		return soLuong;
	}
	public void setSoLuong(String soLuong) {
		this.soLuong = soLuong;
	}
	public String getTenDiaChiNhaSanXuat() {
		return tenDiaChiNhaSanXuat;
	}
	public void setTenDiaChiNhaSanXuat(String tenDiaChiNhaSanXuat) {
		this.tenDiaChiNhaSanXuat = tenDiaChiNhaSanXuat;
	}
	public HoSo getHoSo() {
		return hoSo;
	}
	public void setHoSo(HoSo hoSo) {
		this.hoSo = hoSo;
	}
		
}
