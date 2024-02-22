package project.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.order.entity.LastGeneratedOrderCode;
import project.order.repository.LastGeneratedOrderCodeRepository;

@Component
@Transactional
public class AutoGenerateOderCodeUtils {
    private static final StringBuilder PREFIX = new StringBuilder("ANS");
    private static final int NUM_CODE_LENGTH = 10;
    private final int[] codeIndexes = new int[NUM_CODE_LENGTH];
    private final char[] numberList = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};

    private final LastGeneratedOrderCodeRepository lastOrderRepo;

    @Autowired
    public AutoGenerateOderCodeUtils(LastGeneratedOrderCodeRepository lastOrderRepo) {
        this.lastOrderRepo = lastOrderRepo;
        loadLastGeneratedCode();
    }

    public String autoGenerateCode() {
        StringBuilder code = new StringBuilder();
        code.append(PREFIX);
        for (int index : codeIndexes) {
            code.append(numberList[index]);
        }
        incrementCodeIndexes();
        saveLastGeneratedCode(code.toString());
        return code.toString();
    }

    private void incrementCodeIndexes() {
        for (int i = NUM_CODE_LENGTH - 1; i >= 0; i--) {
            if (codeIndexes[i] < numberList.length - 1) {
                codeIndexes[i]++;
                break;
            } else {
                codeIndexes[i] = 0;
            }
        }
    }

    private void loadLastGeneratedCode() {
        LastGeneratedOrderCode lastGeneratedOrderCode = lastOrderRepo.findById(1L).orElse(null);
        if (lastGeneratedOrderCode != null) {
            String code = lastGeneratedOrderCode.getCode();
            if (code.length() == PREFIX.length() + NUM_CODE_LENGTH) {
                for (int i = 0; i < NUM_CODE_LENGTH; i++) {
                    codeIndexes[i] = code.charAt(i + PREFIX.length()) - '0';
                }
                incrementCodeIndexes();
            }
        }
    }

    private void saveLastGeneratedCode(String code) {
        LastGeneratedOrderCode lastGeneratedCodeEntity = lastOrderRepo.findById(1L).orElse(new LastGeneratedOrderCode());
        lastGeneratedCodeEntity.setId(1L);
        lastGeneratedCodeEntity.setCode(code);
        lastOrderRepo.save(lastGeneratedCodeEntity);
    }
}
