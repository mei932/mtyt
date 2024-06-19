package com.globits.mtyt.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.globits.mtyt.domain.HoSo;
import com.globits.mtyt.dto.HoSoDto;
import com.globits.mtyt.service.HoSoService;
import com.globits.mtyt.service.impl.HoSoServiceImpl;

@RestController
@RequestMapping("/api/hoso")
public class RestHoSoController {
	@Autowired
	private HoSoService hoSoService;
	
	@RequestMapping(value = "/{hoSoId}", method = RequestMethod.GET)
	public HoSoDto getHoSoById(@PathVariable("hoSoId") String hoSoId) {
		HoSo hs=hoSoService.findById(new Long(hoSoId));
		return new HoSoDto(hs);
	}

	
	@RequestMapping(value = "/{pageIndex}/{pageSize}", method = RequestMethod.GET)
	public Page<HoSoDto> getHoSos(@PathVariable int pageIndex, @PathVariable int pageSize) {
		return hoSoService.getListHoSo(pageIndex, pageSize);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public HoSoDto saveHoSo(@RequestBody HoSoDto dto) {
		return hoSoService.createOrUpdate(dto,null);
	}
	
	@RequestMapping(value = "/{trangThai}",method = RequestMethod.POST)
	public HoSoDto confirmOrPaymentHoSo(@RequestBody HoSoDto dto,@PathVariable int trangThai) {
		return hoSoService.confirmOrPaymentHoSo(dto, trangThai);
	}	
	
	@RequestMapping(value = "/{hoSoId}", method = RequestMethod.DELETE)
	public HoSoDto removeHoSok(@PathVariable("hoSoId") String hoSoId) {
		HoSoDto hs = hoSoService.remove(new Long(hoSoId));
		return hs;
	}
	@RequestMapping(value = "/removeList", method = RequestMethod.DELETE)
	public boolean removeHoSok(@RequestBody List<HoSoDto> dtos) {
		boolean hs = hoSoService.removeList(dtos);
		return hs;
	}
}
