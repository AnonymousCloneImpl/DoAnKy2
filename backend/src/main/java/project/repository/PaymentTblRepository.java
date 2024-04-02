package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.entity.payment.PaymentTbl;

@Repository
public interface PaymentTblRepository extends JpaRepository<PaymentTbl, Long> {
	@Modifying
	@Query("UPDATE PaymentTbl p SET p.paymentId = :paymentCode WHERE p.id = :id")
	void updatePaymentCodeById(@Param("id") Long id, @Param("paymentCode") String paymentCode);

	@Modifying
	@Query("UPDATE PaymentTbl p SET p.state = :state WHERE p.paymentId = :paymentCode")
	void updatePaymentCodeById(@Param("paymentCode") String paymentCode, @Param("state") String state);

	@Modifying
	@Query("UPDATE PaymentTbl p SET p.state = :state, p.failureReason = :failureReason WHERE p.paymentId = :paymentCode")
	void updatePaymentCodeById(@Param("paymentCode") String paymentCode, @Param("state") String state, @Param("failureReason") String failureReason);
}
