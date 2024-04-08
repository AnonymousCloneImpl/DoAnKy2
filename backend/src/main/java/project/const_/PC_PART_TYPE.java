package project.const_;

public enum PC_PART_TYPE {
  CPU("cpu"),
  CPU_COOLER("cpu cooler"),
  MOTHER_BOARD("mother board"),
  MEMORY("memory"),
  STORAGE("storage"),
  GPU("gpu"),
  CASE("case"),
  CASE_FAN("case fan"),
  PSU("psu"),
  MONITOR("monitor"),
  KEYBOARD("keyboard"),
  MOUSE("mouse"),
  ;
  public final String val;

  PC_PART_TYPE(String type) {
    this.val = type;
  }
}
