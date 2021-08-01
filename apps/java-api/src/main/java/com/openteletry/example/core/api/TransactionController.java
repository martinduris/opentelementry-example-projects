package com.openteletry.example.core.api;

import com.openteletry.example.core.api.request.TransactionCreate;
import com.openteletry.example.core.db.model.Account;
import com.openteletry.example.core.db.model.Transaction;
import com.openteletry.example.core.db.repository.AccountRepository;
import com.openteletry.example.core.db.repository.TransactionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import javax.annotation.Resource;
import javax.persistence.EntityNotFoundException;
import java.text.MessageFormat;
import java.util.List;

@RestController
public class TransactionController {

  @Resource
  private AccountRepository accountRepository;

  @Resource
  private TransactionRepository transactionRepository;

  @GetMapping("/api/account/{id}/transaction")
  public List<Transaction> accountTransactions(
    @PathVariable(name = "id") final Integer accountId
  ) {
    try {
      final Account account = accountRepository.getById(accountId);
      return account.getTransactions();
    } catch (EntityNotFoundException e) {
      // TODO fix "Whitelabel Error Page"
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        MessageFormat.format("Account {0} not found", accountId),
        e
      );
    }
  }

  @PostMapping("/api/account/{id}/transaction")
  public void createTransaction(
    @PathVariable(name = "id") final Integer accountId,
    @RequestBody final TransactionCreate transactionCreate
  ) {
    if (transactionCreate.getAmountAsString() == null) {
      transactionRepository.createTransactionWithNativeQuery(transactionCreate.getAmount(), accountId);
    } else {
      transactionRepository.createTransactionWithNativeQueryFailing(transactionCreate.getAmountAsString(), accountId);
    }
  }

}
