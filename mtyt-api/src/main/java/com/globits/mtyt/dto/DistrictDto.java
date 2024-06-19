package com.globits.mtyt.dto;

import com.globits.mtyt.domain.District;
import com.globits.mtyt.domain.Province;

public class DistrictDto {
	private Long id;
	private String tenHuyen;
	private Long danSo;
	private ProvinceDto province;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTenHuyen() {
		return tenHuyen;
	}
	public void setTenHuyen(String tenHuyen) {
		this.tenHuyen = tenHuyen;
	}
	public Long getDanSo() {
		return danSo;
	}
	public void setDanSo(Long danSo) {
		this.danSo = danSo;
	}
	
	
	public ProvinceDto getProvince() {
		return province;
	}
	public void setProvince(ProvinceDto province) {
		this.province = province;
	}
	public DistrictDto()
	{
		
	}
	
	public DistrictDto(District entity)
	{
		this.id=entity.getId();
		this.tenHuyen = entity.getTenHuyen();
		this.danSo = entity.getDanSo();
		this.province = new ProvinceDto(entity.getProVince(),true);
	}

}
