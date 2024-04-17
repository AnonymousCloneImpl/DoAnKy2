package project.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class CacheInitializer implements CommandLineRunner {
	private final RedisTemplate<String, Object> redisTemplate;

	@Autowired
	public CacheInitializer(RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	@Override
	public void run(String... args) {
		clearAllCaches();
	}

	private void clearAllCaches() {
		Set<String> cacheKeys = redisTemplate.keys("*");
		if (cacheKeys != null) {
			redisTemplate.delete(cacheKeys);
		}
	}
}
