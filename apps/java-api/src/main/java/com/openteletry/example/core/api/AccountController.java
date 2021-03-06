package com.openteletry.example.core.api;

import com.openteletry.example.core.db.model.Account;
import com.openteletry.example.core.db.repository.AccountRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import java.util.List;

@RestController
public class AccountController {

  @Resource
  private AccountRepository accountRepository;

  @GetMapping("/api/account")
  public List<Account> accounts() {
    return accountRepository.findAll();
  }

}
