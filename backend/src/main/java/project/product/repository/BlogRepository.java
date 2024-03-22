package project.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.product.entity.Blog;

import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
	@Query("select b.* from Blog b " +
		"join Product p on b.product.id = p.id " +
		"where p.id = :id")
	Optional<Blog> findByProductId(@Param("id") Long id);
}
