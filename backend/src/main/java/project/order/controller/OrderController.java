package project.order.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.order.utils.AutoGenerateOderCodeUtils;
import project.order.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
  @Autowired
  private OrderService orderService;
  @Autowired
  private ModelMapper modelMapper;
  @Autowired
  private AutoGenerateOderCodeUtils autoGenerateOrderCodeUtils;
}
