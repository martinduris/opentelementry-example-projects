package com.openteletry.example.core.db.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "account")
public class Account {

  public enum Bank {
    SANTANDER("SANTANDER"),
    WELLS_FARGO("WELLS_FARGO"),
    CITY_BANK("CITY_BANK"),
    DEUTSCHE_BANK("DEUTSCHE_BANK");

    public final String name;

    private Bank(String name) {
      this.name = name;
    }
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String accountNumber;

  @Enumerated(EnumType.STRING)
  private Bank bank;

  private Double amount;

  @OneToMany(mappedBy = "account", fetch = FetchType.LAZY)
  @JsonIgnore
  private final List<Transaction> transactions = new ArrayList<>();

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getAccountNumber() {
    return accountNumber;
  }

  public void setAccountNumber(String accountNumber) {
    this.accountNumber = accountNumber;
  }

  public Bank getBank() {
    return bank;
  }

  public void setBank(Bank bank) {
    this.bank = bank;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public List<Transaction> getTransactions() {
    return transactions;
  }
}
