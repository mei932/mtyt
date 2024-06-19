package com.globits.mtyt.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.globits.core.service.GenericService;
import com.globits.mtyt.domain.Province;
import com.globits.mtyt.dto.HoSoDto;
import com.globits.mtyt.dto.ProvinceDto;

public interface ProvinceService extends GenericService<Province, Long> {
	Province findById(Long id);
	
	Page<ProvinceDto> getListProvince(int pageIndex, int pageSize);
	ProvinceDto confirmOrPaymentProvince(ProvinceDto dto, int trangThai);
	ProvinceDto remove(Long id);
	boolean removeList(List<ProvinceDto>ids);
	ProvinceDto createOrUpdate(ProvinceDto dto, Long maTinhId);
	
	
}
