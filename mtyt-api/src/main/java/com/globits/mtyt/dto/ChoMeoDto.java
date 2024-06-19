package com.globits.mtyt.dto;


import java.util.List;

import com.globits.mtyt.domain.ChoMeo;

public class ChoMeoDto {
//	private List<ChoMeo> myList;
	private int numberOfFeet;
	private int ages;
	private float weight;
	private Long id;

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

//	public List<ChoMeo> getMyList() {
//		return myList;
//	}
//
//	public void setMyList(List<ChoMeo> myList) {
//		this.myList = myList;
//	}

	public int getNumberOfFeet() {
		return numberOfFeet;
	}

	public void setNumberOfFeet(int numberOfFeet) {
		this.numberOfFeet = numberOfFeet;
	}

	public int getAges() {
		return ages;
	}

	public void setAges(int ages) {
		this.ages = ages;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

	public ChoMeoDto() {
	}

	public ChoMeoDto(ChoMeo entity) {
		this.numberOfFeet = entity.getNumberOfFeet();
		this.ages = entity.getAges();
		this.weight = entity.getWeight();
		this.id=entity.getId();

	}
	public ChoMeo convertChoMeoDto(ChoMeoDto dto) {
		ChoMeo chomeo= new ChoMeo();
		chomeo.setId(dto.getId());
		chomeo.setAges(dto.getAges());
		chomeo.setNumberOfFeet(dto.getNumberOfFeet());
		chomeo.setWeight(dto.getWeight());
		return chomeo;
		
		
	}

}
