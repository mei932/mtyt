package com.globits.mtyt.domain;

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
@Table(name = "tbl_Tinh")
@XmlRootElement
public class Province extends BaseObject {
	@Column(name = "ma_tinh")
	private String maTinh;
	
	@Column(name = "ten_tinh")
	private String tenTinh;
	
	@Column(name = "dien_tich")
	private Float dienTich;
	
	@Column(name = "dan_so")
	private Long danSo;
	
	@OneToMany(mappedBy = "proVince",cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval=true)
	private Set<District> danhSachHuyen;

	public String getMaTinh() {
		return maTinh;
	}

	public void setMaTinh(String maTinh) {
		this.maTinh = maTinh;
	}

	public String getTenTinh() {
		return tenTinh;
	}

	public void setTenTinh(String tenTinh) {
		this.tenTinh = tenTinh;
	}

	public Float getDienTich() {
		return dienTich;
	}

	public void setDienTich(Float dienTich) {
		this.dienTich = dienTich;
	}

	public Long getDanSo() {
		return danSo;
	}

	public void setDanSo(Long danSo) {
		this.danSo = danSo;
	}

	public Set<District> getDanhSachHuyen() {
		return danhSachHuyen;
	}

	public void setDanhSachHuyen(Set<District> danhSachHuyen) {
		this.danhSachHuyen = danhSachHuyen;
	}
	

}
