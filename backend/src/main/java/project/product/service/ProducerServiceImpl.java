package project.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.product.entity.Producer;
import project.product.repository.ProducerRepository;
import project.product.repository.ProductRepository;

import java.util.List;

@Service
public class ProducerServiceImpl implements ProducerService {
	@Autowired
	private ProducerRepository producerRepository;

	@Override
	public List<Producer> getAll() {
		return producerRepository.findAll();
	}
}
