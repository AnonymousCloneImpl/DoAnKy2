package project.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import project.redis.service.RedisService;

@RestController
public class TestController {
    @Autowired
    private RedisService redisService;

    @GetMapping("/testRedis")
    public String testRedis() {
        try {
            String key = "myKey";
            String value = "myValue";
            redisService.set(key, value);
            return "Got value from Redis: " + redisService.get("myKey");
        } catch (Exception e) {
            return "An error occurred: " + e.getMessage();
        }
    }
}
