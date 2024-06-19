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
import com.globits.mtyt.service.HoSoService;
import com.globits.mtyt.utils.MTYTConstant;

@Service
public class HoSoServiceImpl extends GenericServiceImpl<HoSo, Long> implements HoSoService {
	@Autowired
	HoSoRepository hoSoRepository;
	@Autowired
	ChePhamRepository chePhamRepository;

	@Override
	public Page<HoSoDto> getListHoSo(int pageIndex, int pageSize) {
		Pageable pageable = new PageRequest(pageIndex - 1, pageSize);
		return hoSoRepository.getListHoSo(pageable);
	}

	@Override
	public HoSoDto createOrUpdate(HoSoDto dto,Long hosoId) {
		HoSo hs = null;
		if(hosoId!=null) {
			hs = hoSoRepository.findById(hosoId);
		}
		
		if (hs == null && dto.getId() != null) {
			hs = hoSoRepository.findById(dto.getId());
		}

		if (hs == null) {
			hs = new HoSo();
			hs.setTrangThai(MTYTConstant.HoSoTrangThai.taoMoi.getValue());
		}
		if (dto.getMaHoSo() != null) {
			hs.setMaHoSo(dto.getMaHoSo());
		}
		if (dto.getChuHoSo() != null) {
			hs.setChuHoSo(dto.getChuHoSo());
		}
		if (dto.getDiaChi() != null) {
			hs.setDiaChi(dto.getDiaChi());
		}
		if (dto.getDienThoai() != null) {
			hs.setDienThoai(dto.getDienThoai());
		}
		if (dto.getNgayNopHoSo() != null) {
			hs.setNgayNopHoSo(dto.getNgayNopHoSo());
		}
		if (dto.getNgayNopTien() != null) {
			hs.setNgayNopTien(dto.getNgayNopTien());
		}
		hs.setSoTien(dto.getSoTien());
		if (dto.getEmail() != null) {
			hs.setEmail(dto.getEmail());
		}
		if (dto.getNguoiNopTien() != null) {
			hs.setNguoiNopTien(dto.getNguoiNopTien());
		}
		if (dto.getSoHoaDon() != null) {
			hs.setSoHoaDon(dto.getSoHoaDon());
		}
		if (dto.getTenThuTuc() != null) {
			hs.setTenThuTuc(dto.getTenThuTuc());
		}

		if (dto.getDanhSachChePham() != null) {
			Iterator<ChePhamDto> iters = dto.getDanhSachChePham().iterator();
			HashSet<ChePham> chePhams = new HashSet<ChePham>();
			while (iters.hasNext()) {
				ChePhamDto childDto = iters.next();
				ChePham child = null;
				if (childDto.getId() != null) {
					child = chePhamRepository.findOne(childDto.getId());
				}

				if (child == null) {
					child = new ChePham();
					// child.setCreateDate(currentDate);
					// child.setCreatedBy(currentUserName);
				}
				if (childDto.getDonViTinh() != null)
					child.setDonViTinh(childDto.getDonViTinh());
				child.setHamLuongHoatChat(childDto.getHamLuongHoatChat());

				if (childDto.getSoLuong() != null)
					child.setSoLuong(childDto.getSoLuong());
				if (childDto.getTacDung() != null) {
					child.setTacDung(childDto.getTacDung());
				}
				if (childDto.getTenDiaChiNhaSanXuat() != null) {
					child.setTenDiaChiNhaSanXuat(childDto.getTenDiaChiNhaSanXuat());
				}
				if (childDto.getTenThuongMai() != null) {
					child.setTenThuongMai(childDto.getTenThuongMai());
				}
				if (hs != null) {
					child.setHoSo(hs);
				}

				chePhams.add(child);
			}
			if (hs.getDanhSachChePham() != null) {
				hs.getDanhSachChePham().clear();
				hs.getDanhSachChePham().addAll(chePhams);
			} else {
				hs.setDanhSachChePham(chePhams);
			}
		}

		hs = hoSoRepository.save(hs);

		return new HoSoDto(hs);
	}

	@Override
	public HoSoDto confirmOrPaymentHoSo(HoSoDto dto, int trangThai) {
		HoSo hs = null;
		if (dto.getId() != null) {
			hs = hoSoRepository.findById(dto.getId());
		}
		if (hs == null && dto.getMaHoSo() != null) {
			hs = hoSoRepository.findByMaHoSo(dto.getMaHoSo());
		}
		if (hs != null && trangThai == MTYTConstant.HoSoTrangThai.xacNhan.getValue()) {
			hs.setTrangThai(MTYTConstant.HoSoTrangThai.xacNhan.getValue());
			hs.setPhuongThucThanhToan(dto.getPhuongThucThanhToan());
			hs = hoSoRepository.save(hs);
			return new HoSoDto(hs);

		} else if (hs != null && trangThai == MTYTConstant.HoSoTrangThai.nopTra.getValue()) {
			hs.setTrangThai(MTYTConstant.HoSoTrangThai.nopTra.getValue());
			hs.setGhiChu(dto.getGhiChu());
			hs = hoSoRepository.save(hs);
			return new HoSoDto(hs);
		}
		return null;
	}

	@Override
	public HoSoDto remove(Long id) {
		HoSo hs = null;
		if (id != null) {
			hs = hoSoRepository.findById(id);
			if (hs != null) {
				hoSoRepository.delete(hs);
				return new HoSoDto(hs);
			}
		}
		return null;
	}

	@Override
	public boolean removeList(List<HoSoDto> dtos) {
		if (dtos != null && dtos.size() > 0) {
			for (HoSoDto item : dtos) {
				remove(item.getId());
				return true;
			}
		}
		return false;
	}

}
