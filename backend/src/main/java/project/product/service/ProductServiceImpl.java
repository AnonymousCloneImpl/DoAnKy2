package project.product.service;


import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.product.dto.BlogDto;
import project.product.dto.ProductDto;
import project.product.entity.Blog;
import project.product.entity.Product;
import project.product.repository.BlogRepository;
import project.product.repository.ColorRepository;
import project.product.repository.ProductRepository;
import project.search.dto.ProductSummaryDto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private ColorRepository colorRepo;
	@Autowired
	private BlogRepository blogRepo;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Product> getAll() {
		return productRepo.findAll();
	}

	@Override
	public List<ProductSummaryDto> getByProductType(String type, Long limit) {
		List<Product> productList = productRepo.getByProductType(type, limit);

		List<ProductSummaryDto> productSummaryDtoList = productList.stream()
				.map(product -> modelMapper.map(product, ProductSummaryDto.class))
				.toList();

		for (ProductSummaryDto p : productSummaryDtoList) {
			p.setImage(p.getImage().split("\\|")[0]);
		}

		return productSummaryDtoList;
	}

	@Override
	public Optional<ProductDto> getById(long id) {
		Optional<Blog> blogOptional = blogRepo.findById(id);
		Blog blog = blogOptional.get();
		BlogDto blogDto = new BlogDto();
		BeanUtils.copyProperties(blog, blogDto);

		String BlogImageStr = blog.getImage();
		String BlogContentStr = blog.getContent();
		if (BlogImageStr != null) {
			blogDto.setImageList(List.of(BlogImageStr.split("\\|")));
			blogDto.setContentList(List.of(BlogContentStr.split("\\|")));
		}

		Optional<Product> productOptional = productRepo.findById(id);
		List<Product> similarProductList;
		if (productOptional.isPresent()) {
			Product product = productOptional.get();
			ProductDto productDto = new ProductDto();
			BeanUtils.copyProperties(product, productDto);
			similarProductList = productRepo.findTop10SimilarByType(product.getType(), product.getId(), PageRequest.of(0, 10));

			String imageString = product.getImage();
			if (imageString != null) {
				productDto.setImageList(List.of(imageString.split("\\|")));
				productDto.setBlog(blogDto);
				productDto.setSimilarProductList(similarProductList);
			}
			return Optional.of(productDto);
		} else {
			return Optional.empty();
		}
	}

	@Override
	public List<Product> getByName(Specification<Product> spec, String name) {
		return productRepo.findAll(nameLike(name));
	}

	@Override
	public boolean existById(long id) {
		return productRepo.existsById(id);
	}

	@Override
	public void deleteById(long id) {
		productRepo.deleteById(id);
	}

	@Override
	public Product insert(ProductDto productDto) {
		Product product = modelMapper.map(productDto, Product.class);
		return productRepo.save(product);
	}

	@Override
	public Product updateById(Long id, ProductDto productDto) {
		Product product = productRepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));

		modelMapper.map(productDto, product);
		return productRepo.save(product);
	}

	@Override
	public Specification<Product> nameLike(String name) {
		return (root, query, criteriaBuilder)
				-> criteriaBuilder.like(root.get("name"), "%" + name + "%");
	}
}
