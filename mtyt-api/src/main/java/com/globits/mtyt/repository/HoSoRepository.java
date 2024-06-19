package com.globits.mtyt.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.mtyt.domain.HoSo;
import com.globits.mtyt.dto.HoSoDto;
@Repository
public interface HoSoRepository extends JpaRepository<HoSo, Long> {
	@Query("select u from HoSo u  where u.id = ?1")
	HoSo findById(Long id);
	@Query("select new com.globits.mtyt.dto.HoSoDto(cs) from HoSo cs  ")
	Page<HoSoDto> getListHoSo( Pageable pageable);
	@Query("select u from HoSo u  where u.maHoSo = ?1")
	HoSo findByMaHoSo(String maHoSo);
	
}
