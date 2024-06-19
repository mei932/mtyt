package com.globits.mtyt.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.globits.mtyt.dto.HoSoDto;
import com.globits.mtyt.dto.ProvinceDto;
import com.globits.mtyt.service.ProvinceService;

@RestController
@RequestMapping("/api/province")
public class RestProvinceController {
	@Autowired
	private ProvinceService provinceService;
	@RequestMapping(method = RequestMethod.POST)
	public ProvinceDto saveProvince(@RequestBody ProvinceDto dto) {
		return provinceService.createOrUpdate(dto,null);
	}
}
