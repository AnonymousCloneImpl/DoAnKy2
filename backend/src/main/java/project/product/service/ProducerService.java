package project.product.service;

import org.springframework.stereotype.Service;
import project.product.entity.Producer;

import java.util.List;

@Service
public interface ProducerService {
	List<Producer> getAll();
}
