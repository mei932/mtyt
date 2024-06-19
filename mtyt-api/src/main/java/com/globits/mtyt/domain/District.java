package com.globits.mtyt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import com.globits.core.domain.BaseObject;

@Entity
@Table(name = "tbl_Huyen")
@XmlRootElement
public class District  extends BaseObject {
	@Column(name = "ten_huyen")
	private String tenHuyen;
	@Column(name = "dan_so")
	private Long danSo;
	
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

	public Province getProVince() {
		return proVince;
	}

	public void setProVince(Province proVince) {
		this.proVince = proVince;
	}

	@ManyToOne
	@JoinColumn(name = "tinh_id")
	private Province proVince;
	
}
