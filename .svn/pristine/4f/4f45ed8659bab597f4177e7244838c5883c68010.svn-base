package com.globits.mtyt.service.impl;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.mtyt.domain.ChePham;
import com.globits.mtyt.domain.HoSo;
import com.globits.mtyt.dto.ChePhamDto;
import com.globits.mtyt.dto.HoSoDto;
import com.globits.mtyt.repository.ChePhamRepository;
import com.globits.mtyt.repository.HoSoRepository;
import com.globits.mtyt.service.ChePhamService;
import com.globits.mtyt.service.HoSoService;
import com.globits.mtyt.utils.MTYTConstant;

@Service
public class ChePhamServiceImpl extends GenericServiceImpl<ChePham, Long> implements ChePhamService {
	
	@Autowired
	ChePhamRepository chePhamRepository;
	@Autowired
	HoSoRepository hoSoRepository;
	
	@Override
	public ChePhamDto saveOrUpdate(ChePhamDto chephamDto,Long id) {
		if(chephamDto!=null) {
			ChePham chepham = null;
			if(id!=null && id>0L) {
				chepham = chePhamRepository.findOne(id);
			}
			if(chepham==null && chephamDto.getId()!=null && chephamDto.getId()>0L) {
				chepham = chePhamRepository.findOne(chephamDto.getId());
			}
			if(chepham==null) {
				chepham = new ChePham();
			}
			chepham.setDonViTinh(chephamDto.getDonViTinh());
			chepham.setHamLuongHoatChat(chephamDto.getHamLuongHoatChat());
			chepham.setSoLuong(chephamDto.getSoLuong());
			chepham.setTacDung(chephamDto.getTacDung());
			chepham.setTenDiaChiNhaSanXuat(chephamDto.getTenDiaChiNhaSanXuat());
			chepham.setTenThuongMai(chephamDto.getTenThuongMai());
			if(chephamDto.getHoso()!=null && chephamDto.getHoso().getId()!=null && chephamDto.getHoso().getId()>0) {
				HoSo hs = hoSoRepository.findOne(chephamDto.getHoso().getId());
				chepham.setHoSo(hs);
			}
			chepham = chePhamRepository.save(chepham);
			return new ChePhamDto(chepham);
		}
		return null;
	}
}
