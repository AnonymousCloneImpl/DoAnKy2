package project.product.service;

import org.springframework.stereotype.Service;
import project.product.entity.Blog;

import java.util.Optional;

@Service
public interface BlogService {
    Optional<Blog> getBlogByProductId(Long id);
}
