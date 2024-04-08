package project.service.product;

import org.springframework.stereotype.Service;
import project.entity.product.Producer;

import java.util.List;

@Service
public interface ProducerService {
  List<Producer> getAll();

  List<Producer> findProducersByProductType(String type);
}
