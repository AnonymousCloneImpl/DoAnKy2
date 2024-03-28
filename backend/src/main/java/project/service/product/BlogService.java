package project.service.product;

import org.springframework.stereotype.Service;
import project.entity.product.Blog;

import java.util.Optional;

@Service
public interface BlogService {
	Optional<Blog> getBlogByProductId(Long id);
}
