package jeopardyApp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jeopardyApp.repo.PlayerRepo;
import jeopardyApp.repo.QuestionsRepo;
import jeopardyApp.service.JeopardyService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
public class WebLayerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JeopardyService jeopardyService;

    @MockBean
    private PlayerRepo playerRepo;

    @MockBean
    private QuestionsRepo questionsRepo;

    @Test
    public void saveUsersTest() throws Exception {
        List<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);
        ids.add(3);
        String[] users = new String[]{"1, 2, 3"};
        when(jeopardyService.savePlayers(users)).thenReturn(ids);

        this.mockMvc.perform(post("http://localhost:8080/baseURL/saveUsers", 1).content(objectMapper.writeValueAsString(users))
                .contentType("application/json")).andDo(print())
                .andExpect(status().isOk()).andExpect(content().string("[1,2,3]"));
    }
}
