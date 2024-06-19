package com.globits.mtyt.dto;

import java.util.HashSet;
import java.util.Set;

import com.globits.mtyt.domain.District;
import com.globits.mtyt.domain.Province;

public class ProvinceDto {
	 private Long id;
	 private String maTinh;
	 private String tenTinh;
	 private Float dienTich;
	 private Long danSo;
	 private Set<DistrictDto> danhSachHuyen;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
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
	public Set<DistrictDto> getDanhSachHuyen() {
		return danhSachHuyen;
	}
	public void setDanhSachHuyen(Set<DistrictDto> danhSachHuyen) {
		this.danhSachHuyen = danhSachHuyen;
	}
	 
	 
	 public ProvinceDto()
	 {
		 
	 }
	 
	 public ProvinceDto(Province entity)
	 {
		 this.id = entity.getId();
		 this.maTinh = entity.getMaTinh();
		 this.tenTinh= entity.getTenTinh();
		 this.dienTich= entity.getDienTich();
		 this.danSo= entity.getDanSo();
		 if(entity.getDanhSachHuyen() != null && entity.getDanhSachHuyen().size()> 0)
		 {
			 this.danhSachHuyen = new HashSet<DistrictDto>();
			 for(District district : entity.getDanhSachHuyen())
			 {
				 DistrictDto dto = new DistrictDto();
				 dto.setDanSo(district.getDanSo());
				 dto.setId(district.getId());
				 dto.setTenHuyen(district.getTenHuyen());
				 this.danhSachHuyen.add(dto);
			 }
		 }
	 }
	 
	 public ProvinceDto(Province entity, boolean simple)
	 {
		 this.id= entity.getId();
		 this.danSo= entity.getDanSo();
		 this.maTinh= entity.getMaTinh();
		 this.dienTich= entity.getDienTich();
		 this.tenTinh = entity.getTenTinh();
	 }
	 
}
