package com.openteletry.example.core.db.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

@Entity
@Table(name = "transaction")
public class Transaction {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne
  @JoinColumn(name="account_id")
  @JsonIgnore
  private Account account;

  private Double amount;

  public Integer getId() {
    return id;
  }

  public Account getAccount() {
    return account;
  }

  public Double getAmount() {
    return amount;
  }
}
