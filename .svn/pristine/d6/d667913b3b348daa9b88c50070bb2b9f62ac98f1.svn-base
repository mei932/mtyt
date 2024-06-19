package com.globits.mtyt.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.globits.core.service.GenericService;
import com.globits.mtyt.domain.HoSo;
import com.globits.mtyt.dto.HoSoDto;

public interface HoSoService  extends GenericService<HoSo, Long>{
	HoSo findById(Long id);

	Page<HoSoDto> getListHoSo(int pageIndex, int pageSize);
	HoSoDto confirmOrPaymentHoSo(HoSoDto dto, int trangThai);
	HoSoDto remove(Long id);
	boolean removeList(List<HoSoDto>ids);
	HoSoDto createOrUpdate(HoSoDto dto, Long hosoId);
}
