package com.globits.mtyt.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.globits.mtyt.dto.ChoMeoDto;
import com.globits.mtyt.service.ChoMeoService;

@RestController
@RequestMapping("/api/chomeo")

public class RestChoMeoController {
	@Autowired
	private ChoMeoService choMeoService;
	
	@RequestMapping(value="/getAll",method=RequestMethod.GET)
	private List<ChoMeoDto> getAll(){
		
		return choMeoService.getAll();
	}
	@RequestMapping(value="/add",method=RequestMethod.POST)
	private ChoMeoDto addChoMeo(@RequestBody  ChoMeoDto dto) {		
		return choMeoService.addChoMeo(dto);		
	}
	
	@RequestMapping(value = "/removeList", method = RequestMethod.DELETE)
	public boolean removeHoSok(@RequestBody List<ChoMeoDto> dtos) {
		boolean hs =choMeoService.removeList(dtos);
		return hs;
	}


}
