package com.globits.mtyt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.globits.mtyt.domain.District;

import com.globits.mtyt.dto.DistrictDto;

public interface DistrictRepository extends JpaRepository<District, Long> {
	@Query("select new com.globits.mtyt.dto.DistrictDto(cs) from District cs where cs.proVince.id=?1 ")
	List<DistrictDto> getListDistrictById( Long districtId);
}
