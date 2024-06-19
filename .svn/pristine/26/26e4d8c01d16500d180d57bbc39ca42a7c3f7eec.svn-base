package com.globits.mtyt.dto;

import java.util.Date;

import javax.persistence.Column;

import com.globits.mtyt.domain.ChePham;

public class ChePhamDto {
	
	private Long id;
	
	private String tenThuongMai;
	
	private float hamLuongHoatChat;	
	
	private String tacDung;
	
	private String donViTinh;
	
	private String soLuong;	
	
	private String tenDiaChiNhaSanXuat;
	
	private HoSoDto hoso;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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
	
	public HoSoDto getHoso() {
		return hoso;
	}

	public void setHoso(HoSoDto hoso) {
		this.hoso = hoso;
	}
	public ChePhamDto() {
		
	}
	public ChePhamDto(ChePham entity) {
		this.id = entity.getId();
		this.tenDiaChiNhaSanXuat = entity.getTenDiaChiNhaSanXuat();
		this.donViTinh = entity.getDonViTinh();
		this.hamLuongHoatChat = entity.getHamLuongHoatChat();
		this.soLuong = entity.getSoLuong();
		this.tacDung = entity.getTacDung();
		this.tenThuongMai = entity.getTenThuongMai();		
		this.hoso = new HoSoDto(entity.getHoSo(),true);
	}
}
