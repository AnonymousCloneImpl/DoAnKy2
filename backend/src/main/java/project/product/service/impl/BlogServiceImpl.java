package project.product.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.product.entity.Blog;
import project.product.repository.BlogRepository;
import project.product.service.BlogService;

import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    BlogRepository blogRepo;

    @Override
    public Optional<Blog> getBlogByProductId(Long id) {
        return blogRepo.findByProductId(id);
    }
}
