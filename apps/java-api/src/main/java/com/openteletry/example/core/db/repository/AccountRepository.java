package com.openteletry.example.core.db.repository;

import com.openteletry.example.core.db.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {

}
