package project.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.product.entity.Blog;

import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
	Optional<Blog> findById(Long id);
}
