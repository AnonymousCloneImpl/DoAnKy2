package project.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

@Component
public class CacheInitializer implements CommandLineRunner {
  @Autowired
  private CacheManager cacheManager;

  @Override
  public void run(String... args) throws Exception {
    clearAllCaches();
  }

  private void clearAllCaches() {
    cacheManager.getCacheNames().forEach(cacheName -> cacheManager.getCache(cacheName).clear());
  }
}
