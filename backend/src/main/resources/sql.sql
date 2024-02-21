-- huunghia.blog_type definition

CREATE TABLE `blog_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.last_generated_oder_code definition

CREATE TABLE `last_generated_oder_code` (
  `id` bigint NOT null AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.model definition

CREATE TABLE `model` (
  `id` int NOT NULL,
  `model_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.payment_type definition

CREATE TABLE `payment_type` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.product definition

CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `brand_id` bigint NOT NULL,
  `model` varchar(255) NOT NULL,
  `blog_id` int NOT NULL,
  `category_id` int NOT NULL,
  `color_id` int NOT NULL,
  `model_id` bigint NOT NULL,
  `product_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_jmivyxk9rmgysrmsqw15lqr5b` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.color definition

CREATE TABLE `color` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsgsuxxoc1h5pskbjpch4id2ec` (`product_id`),
  CONSTRAINT `FKsgsuxxoc1h5pskbjpch4id2ec` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.address definition

CREATE TABLE `address` (
  `id` bigint NOT NULL,
  `address_line` varchar(255) DEFAULT NULL,
  `district_provincial_city` varchar(255) DEFAULT NULL,
  `house_number` varchar(255) DEFAULT NULL,
  `province_central_cities` varchar(255) DEFAULT NULL,
  `street_number` varchar(255) DEFAULT NULL,
  `ward_town` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `user_info_id` bigint DEFAULT NULL,
  `is_default` bit(1) NOT NULL,
  `address_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK420ijtqsk8b6hjit83m6agxbo` (`user_info_id`),
  KEY `FKcrirtakf5a84osyt7a1nkxm9j` (`address_id`),
  CONSTRAINT `FK420ijtqsk8b6hjit83m6agxbo` FOREIGN KEY (`user_info_id`) REFERENCES `user_info` (`id`),
  CONSTRAINT `FKcrirtakf5a84osyt7a1nkxm9j` FOREIGN KEY (`address_id`) REFERENCES `user_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.blog definition

CREATE TABLE `blog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `title` varchar(500) NOT NULL,
  `content` text NOT NULL,
  `brand_id` int DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_lhod5klvg7e33vgfupg8uda28` (`brand_id`),
  UNIQUE KEY `UK_qi52xohpbjcbboeey0btpxju9` (`product_id`),
  CONSTRAINT `FKo4s3h3vqu0l2u964rln33xa2v` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKs1xc77unttaj2cv5xrqiagi1w` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.blog_content definition

CREATE TABLE `blog_content` (
  `id` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `blog_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK38te1ppbgb5ixnjih84x7ked0` (`blog_id`),
  CONSTRAINT `FK38te1ppbgb5ixnjih84x7ked0` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.brand definition

CREATE TABLE `brand` (
  `id` int NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `blog_id` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blog_id` (`blog_id`),
  CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.cart definition

CREATE TABLE `cart` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl70asp4l4w0jmbm1tqyofho4o` (`user_id`),
  CONSTRAINT `FKl70asp4l4w0jmbm1tqyofho4o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.cart_item definition

CREATE TABLE `cart_item` (
  `id` bigint NOT NULL,
  `cart` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `cart_id` bigint DEFAULT NULL,
  `product_id_id` bigint DEFAULT NULL,
  `cart_item_id` bigint DEFAULT NULL,
  `order_item_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ik6oddrdutre01c0owso5h65q` (`product_id_id`),
  KEY `FK1uobyhgl1wvgt1jpccia8xxs3` (`cart_id`),
  KEY `FKjf5jd3pbctwr3xerd2hlsa6m1` (`order_item_id`),
  KEY `FK2b2927ut6yqto6af6bw84cil6` (`cart_item_id`),
  KEY `FKjcyd5wv4igqnw413rgxbfu4nv` (`product_id`),
  CONSTRAINT `FK1uobyhgl1wvgt1jpccia8xxs3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FK2b2927ut6yqto6af6bw84cil6` FOREIGN KEY (`cart_item_id`) REFERENCES `order_item` (`id`),
  CONSTRAINT `FK7su3ckahtopnf77c8usrigj1c` FOREIGN KEY (`product_id_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK8s4qghll1qqydjnyok8whw26h` FOREIGN KEY (`cart_item_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKjcyd5wv4igqnw413rgxbfu4nv` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKjf5jd3pbctwr3xerd2hlsa6m1` FOREIGN KEY (`order_item_id`) REFERENCES `order_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.order_item definition

CREATE TABLE `order_item` (
  `id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`),
  CONSTRAINT `FK3dyxgu1onw2rppukkdmneqqsy` FOREIGN KEY (`product_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.orders definition

CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_code` varchar(25) NOT NULL,
  `order_date` varchar(255) DEFAULT NULL,
  `order_status` varchar(50) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `shipping_address_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `quantity` bigint DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `ship_address_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_5e50womyxp3u9tys9a8a8iu1q` (`ship_address_id`),
  KEY `user_id` (`user_id`),
  KEY `shipping_address_id` (`shipping_address_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `FKsfjua99gtjp9ws5aavy4lxlbx` FOREIGN KEY (`ship_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`shipping_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.payment_method definition

CREATE TABLE `payment_method` (
  `id` int NOT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `is_default` bit(1) DEFAULT NULL,
  `payment_type` int NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `payment_method_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9qgi86n91j5kxnymanelaa1ag` (`user_id`),
  KEY `FKdaqv0x20rprgmifgdhhfy3vl5` (`payment_method_id`),
  CONSTRAINT `FK9qgi86n91j5kxnymanelaa1ag` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKdaqv0x20rprgmifgdhhfy3vl5` FOREIGN KEY (`payment_method_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.`user` definition

CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_47dq8urpj337d3o65l3fsjph3` (`cart_id`),
  CONSTRAINT `FKtqa69bib34k2c0jhe7afqsao6` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- huunghia.user_info definition

CREATE TABLE `user_info` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `address_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_25i7k773g58yro3pwdscmq2ql` (`address_id`),
  UNIQUE KEY `UK_hixwjgx0ynne0cq4tqvoawoda` (`user_id`),
  CONSTRAINT `FKn8pl63y4abe7n0ls6topbqjh2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKnoqtjbqb8et14k5f54flsdram` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;