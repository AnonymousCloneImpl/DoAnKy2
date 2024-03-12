//package project.redis.service.impl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.redis.core.HashOperations;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Service;
//import project.redis.service.RedisService;
//
//import java.util.*;
//import java.util.concurrent.TimeUnit;
//
//@Service
//public class RedisServiceImpl implements RedisService {
//    private final RedisTemplate<String, Object> redisTemplate;
//    private final HashOperations<String, String, Object> hashOperations;
//
//    @Autowired
//    public RedisServiceImpl(RedisTemplate<String, Object> redisTemplate) {
//        this.redisTemplate = redisTemplate;
//        this.hashOperations = redisTemplate.opsForHash();
//    }
//
//    @Override
//    public void set(String key, Object value) {
//        redisTemplate.opsForValue().set(key, value);
//    }
//
//    @Override
//    public Object get(String key) {
//        return redisTemplate.opsForValue().get(key);
//    }
//
//    @Override
//    public void setTimeToLive(String key, long timeOutInDays) {
//        redisTemplate.expire(key, timeOutInDays, TimeUnit.DAYS);
//    }
//
//    @Override
//    public void hashSet(String key, String field, Object value) {
//        hashOperations.put(key, field, value);
//    }
//
//    @Override
//    public Object hashGet(String key, String field) {
//        return hashOperations.get(key, field);
//    }
//
//    @Override
//    public boolean hasExist(String key, String field) {
//        return hashOperations.hasKey(key, field);
//    }
//
//    @Override
//    public Map<String, Object> getField(String key) {
//        return hashOperations.entries(key);
//    }
//
//    @Override
//    public List<Object> hashGetByFieldPrefix(String key, String filedPrefix) {
//        List<Object> objectList = new ArrayList<>();
//        Map<String, Object> hashEntries = hashOperations.entries(key);
//        for (Map.Entry<String, Object> entry : hashEntries.entrySet()) {
//            if (entry.getKey().startsWith(filedPrefix)) {
//                objectList.add(entry.getValue());
//            }
//        }
//        return objectList;
//    }
//
//    @Override
//    public Set<String> getFieldPrefixes(String key) {
//        return hashOperations.entries(key).keySet();
//    }
//
//    @Override
//    public void delete(String key) {
//        redisTemplate.delete(key);
//    }
//
//    @Override
//    public void delete(String key, String field) {
//        hashOperations.delete(key, field);
//    }
//
//    @Override
//    public void delete(String key, List<String> fieldList) {
//        hashOperations.delete(key, fieldList);
//    }
//}