package project.redis.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public interface RedisService {
    void set(String key, Object value);
    Object get(String key);
    void setTimeToLive(String key, long timeOutInDays);
    void hashSet(String key, String field, Object value);
    Object hashGet(String key, String field);
    boolean hasExist(String key, String field);
    Map<String, Object> getField(String key);
    List<Object> hashGetByFieldPrefix(String key, String filedPrefix);
    Set<String> getFieldPrefixes(String key);
    void delete(String key);
    void delete(String key, String field);
    void delete(String key, List<String> fieldList);
}
