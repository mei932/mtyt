package com.globits.mtyt.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.globits.mtyt.domain.Province;
import com.globits.mtyt.dto.ProvinceDto;



public interface ProvinceRepository extends JpaRepository< Province,Long> {
	@Query("select u from Province u  where u.id = ?1")
	Province findById(Long id);
	@Query("select new com.globits.mtyt.dto.ProvinceDto(cs) from Province cs  ")
	Page<ProvinceDto> getListProvince( Pageable pageable);
	@Query("select u from Province u  where u.maTinh = ?1")
	Province findByMaTinh(String maTinh);
}
