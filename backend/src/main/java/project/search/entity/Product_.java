package project.search.entity;


import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import project.product.entity.Product;
import project.order.entity.Address;

import javax.annotation.processing.Generated;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Product.class)
public class Product_ {
    public static volatile SingularAttribute<Product, Address> address;
    public static volatile SingularAttribute<Product, String> name;
    public static volatile SingularAttribute<Product, String> id;
    public static final String NAME = "name";
    public static final String ID = "id";
}
