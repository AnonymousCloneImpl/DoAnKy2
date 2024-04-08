package project.const_;

public enum ORDER_STATUS {
  WAITING("Waiting"),
  PREPARING("Preparing"),
  DELIVERY("Delivery"),
  COMPLETE("Complete");
  public final String val;

  ORDER_STATUS(String type) {
    this.val = type;
  }
}
