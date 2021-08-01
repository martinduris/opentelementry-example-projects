package com.openteletry.example.core.db.repository;

import com.openteletry.example.core.db.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

  @Modifying
  @Query(
    value = "insert into transaction (id, amount, account_id) values (nextval('transaction_id_seq'), :amount, :accountId)",
    nativeQuery = true)
  @Transactional
  void createTransactionWithNativeQuery(@Param("amount") Double amount, @Param("accountId") Integer accountId);

  @Modifying
  @Query(
    value = "insert into transaction (id, amount, account_id) values (nextval('transaction_id_seq'), :amount, :accountId)",
    nativeQuery = true)
  @Transactional
  void createTransactionWithNativeQueryFailing(@Param("amount") String amount, @Param("accountId") Integer accountId);

}
