package com.globits.mtyt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.mtyt.domain.ChePham;
import com.globits.mtyt.dto.ChePhamDto;
@Repository
public interface ChePhamRepository extends JpaRepository<ChePham, Long> {
	@Query("select new com.globits.mtyt.dto.ChePhamDto(cs) from ChePham cs where cs.hoSo.id=?1 ")
	List<ChePhamDto> getListChePhamByHoSoId( Long hosoId);
}
