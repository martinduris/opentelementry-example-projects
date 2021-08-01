package com.openteletry.example.core.api.request;

public class TransactionCreate {

  Double amount;
  String amountAsString;

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public String getAmountAsString() {
    return amountAsString;
  }

  public void setAmountAsString(String amountAsString) {
    this.amountAsString = amountAsString;
  }
}
