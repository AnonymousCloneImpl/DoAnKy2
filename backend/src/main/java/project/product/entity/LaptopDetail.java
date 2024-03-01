package project.product.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "laptop_detail")
public class LaptopDetail extends ProductDetail {
    private String cpu;
    private String ram;
    @Column(name = "screen_size")
    private String screenSize;
    @Column(name = "screen_resolution")
    private String screenResolution;
    private String storage;
    @Column(name = "graphics_card")
    private String graphicsCard;
    private String ports;
    private String os;
}
