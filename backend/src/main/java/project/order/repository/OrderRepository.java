package project.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.order.dto.OrderDto;
import project.order.entity.Order;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.customerPhone = :number")
    List<OrderDto> getByCustomerPhone(@Param("number") String number);
//    public void sendEmail(Order order);
    List<OrderDto> findByCustomerPhone(String phone);
}
