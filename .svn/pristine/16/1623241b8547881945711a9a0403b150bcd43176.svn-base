package com.globits.mtyt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.mtyt.domain.ChoMeo;
import com.globits.mtyt.dto.ChoMeoDto;
@Repository
public interface ChoMeoRepository extends JpaRepository<ChoMeo,Long> {
	@Query("select new com.globits.mtyt.dto.ChoMeoDto(cs) from ChoMeo cs")
	List<ChoMeoDto> getAll();
}
