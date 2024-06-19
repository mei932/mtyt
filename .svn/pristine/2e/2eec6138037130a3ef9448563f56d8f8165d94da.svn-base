package com.globits.mtyt.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.mtyt.domain.ChoMeo;
import com.globits.mtyt.dto.ChoMeoDto;
import com.globits.mtyt.repository.ChoMeoRepository;
import com.globits.mtyt.service.ChoMeoService;


@Service
public class ChoMeoServiceImpl extends GenericServiceImpl<ChoMeo, Long> implements ChoMeoService  {
	@Autowired
	ChoMeoRepository choMeoRepository;

	@Override
	public List<ChoMeoDto> getAll() {

		return choMeoRepository.getAll();
	}

	@Override
	public ChoMeoDto addChoMeo(ChoMeoDto dto) {
		ChoMeo chomeo = new ChoMeo();
		chomeo.setAges(dto.getAges());
		chomeo.setWeight(dto.getWeight());
		chomeo.setNumberOfFeet(dto.getNumberOfFeet());
		
		choMeoRepository.save(chomeo);
		return dto;

	}

	@Override
	public ChoMeoDto remove(ChoMeoDto dto) {
		ChoMeo chomeo = new ChoMeoDto().convertChoMeoDto(dto);
		choMeoRepository.delete(chomeo);
		return dto;
	}

	@Override
	public boolean removeList(List<ChoMeoDto> dtos) {
		if (dtos != null && dtos.size() > 0) {
			for (ChoMeoDto  item : dtos) {
				
				this.choMeoRepository.delete(item.getId());
				return true;
			}
		}
		return false;
		
	}

}
