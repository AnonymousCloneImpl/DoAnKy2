package project.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.common.AutoGenerateOderCodeUtils;

@Configuration
public class AppConfig {
    @Autowired
    AutoGenerateOderCodeUtils autoGenerateOderCodeUtils;
    
    @Bean
    public String autoGenerateOrderCode() {
	return autoGenerateOderCodeUtils.autoGenerateCode();
    }
    
    @Bean
    public ModelMapper modelMapper() {
	return new ModelMapper();
    }
}
