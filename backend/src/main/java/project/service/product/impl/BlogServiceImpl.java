package project.service.product.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.entity.product.Blog;
import project.repository.BlogRepository;
import project.service.product.BlogService;

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
