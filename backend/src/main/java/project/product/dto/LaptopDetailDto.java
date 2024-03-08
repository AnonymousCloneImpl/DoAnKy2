package project.product.dto;

import jakarta.persistence.*;

public class LaptopDetailDto {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String material;
	private String dimensions;
}
