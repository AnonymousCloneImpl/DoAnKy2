package project.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.order.dto.OrderDto;
import project.order.entity.Order;
import project.product.entity.Product;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.customerPhone = :number")
    List<OrderDto> getByCustomerPhone(@Param("number") String number);
    @Query(nativeQuery = true,
        value = "select * from orders o where o.customer_phone = :phone")
    List<Order> findByCustomerPhone(String phone);
    @Query(nativeQuery = true,
        value = "select * from product p \n" +
            "join order_item oi on p.id = oi.product_id\n" +
            "join orders o on o.id = oi.order_id\n" +
            "where o.id = :id")
    List<Product> findByOrderId(Long id);
}
