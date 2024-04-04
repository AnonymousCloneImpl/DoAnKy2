package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import project.entity.payment.PaymentTbl;

import java.time.LocalDateTime;

@Repository
public interface PaymentTblRepository extends JpaRepository<PaymentTbl, Long> {
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "UPDATE payment p SET p.payment_id  = :paymentCode, p.updated_at = :updatedAt WHERE p.id = :id")
	void updatePaymentCodeById(@Param("id") Long id, @Param("paymentCode") String paymentCode, @Param("updatedAt") LocalDateTime updatedAt);

	@Modifying
	@Transactional
	@Query("UPDATE PaymentTbl p SET p.state = :state, p.updatedAt = :updatedAt WHERE p.paymentId = :paymentCode")
	void updatePaymentCodeById(@Param("paymentCode") String paymentCode, @Param("state") String state, @Param("updatedAt") LocalDateTime updatedAt);

	@Modifying
	@Transactional
	@Query("UPDATE PaymentTbl p SET p.state = :state, p.failureReason = :failureReason, p.updatedAt = :updatedAt WHERE p.paymentId = :paymentCode")
	void updatePaymentCodeById(@Param("paymentCode") String paymentCode, @Param("state") String state, @Param("failureReason") String failureReason, @Param("updatedAt") LocalDateTime updatedAt);

	PaymentTbl findByOrderCode(@Param("orderCode") String orderCode);
}
