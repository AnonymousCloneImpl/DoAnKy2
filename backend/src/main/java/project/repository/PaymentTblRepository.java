package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.entity.payment.PaymentTbl;

@Repository
public interface PaymentTblRepository extends JpaRepository<PaymentTbl, Long> {
}
