package com.globits.mtyt.service.impl;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.globits.mtyt.domain.District;
import com.globits.core.service.impl.GenericServiceImpl;

import com.globits.mtyt.domain.Province;
import com.globits.mtyt.dto.DistrictDto;
import com.globits.mtyt.dto.ProvinceDto;
import com.globits.mtyt.repository.DistrictRepository;
import com.globits.mtyt.repository.ProvinceRepository;
import com.globits.mtyt.service.ProvinceService;

@Service
public class ProvinceServiceImpl extends GenericServiceImpl<Province, Long> implements ProvinceService {
	@Autowired
	ProvinceRepository provinceRepository;	
	@Autowired
	DistrictRepository districtRepository;
	@Override
	public Page<ProvinceDto> getListProvince(int pageIndex, int pageSize) {
		Pageable pageable = new PageRequest(pageIndex - 1, pageSize);
		return provinceRepository.getListProvince(pageable);
	}

	@Override
	public ProvinceDto confirmOrPaymentProvince(ProvinceDto dto, int trangThai) {
		
		return null;
	}

	@Override
	public ProvinceDto remove(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean removeList(List<ProvinceDto> ids) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public ProvinceDto createOrUpdate(ProvinceDto dto, Long maTinhId) {
		Province pr = null ;
		if(maTinhId!=null)
		{
			pr = provinceRepository.findById(maTinhId);
		}
		if(pr == null && dto.getId() != null)
		{
			pr = provinceRepository.findById(dto.getId());
		}
		
	
		if(dto.getDienTich() != null)
		{
			pr.setDienTich(dto.getDienTich());
		}
		
		if(dto.getTenTinh() != null)
		{
			pr.setTenTinh(dto.getTenTinh());
		}
		
		if(dto.getMaTinh() != null)
		{
			pr.setMaTinh(dto.getMaTinh());
		}
		if(dto.getDanSo() != null) {
			pr.setDanSo(dto.getDanSo());
		}
		if(dto.getDanhSachHuyen() != null )
		{
			Iterator<DistrictDto> iters = dto.getDanhSachHuyen().iterator();
			HashSet<District> districts = new HashSet<District>();
			while(iters.hasNext())
			{
				DistrictDto childDto = iters.next();
				District child = null;
				if(child== null )
				{
					child = new District();
				}
				if(childDto.getDanSo()  != null)
				{
					child.setDanSo(childDto.getDanSo());
					
				}
				
				if(childDto.getTenHuyen() != null)
				{
					childDto.setTenHuyen(childDto.getTenHuyen());
				}
				
				if(childDto.getId() != null)
				{
					child = districtRepository.findOne(childDto.getId());
				}
				
				if(pr != null)
				{
					child.setProVince(pr);
				}
				districts.add(child);
				
			}
			if(pr.getDanhSachHuyen() != null)
			{
				pr.getDanhSachHuyen().clear();
				pr.getDanhSachHuyen().addAll(districts);
				
			}else {
				pr.setDanhSachHuyen(districts);
			}
			
		}
		
		pr = provinceRepository.save(pr);
		return new ProvinceDto(pr);
	}

}
	
