package com.todo.api.todo;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping
    public List<Todo> listTodos(Authentication authentication) {
        UUID userId = UUID.fromString(authentication.getName());
        return todoRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @PostMapping
    public Todo createTodo(Authentication authentication, @Valid @RequestBody CreateTodoRequest request) {
        UUID userId = UUID.fromString(authentication.getName());
        Todo todo = new Todo();
        todo.setUserId(userId);
        todo.setTitle(request.title());
        return todoRepository.save(todo);
    }

    @PatchMapping("/{id}/toggle")
    public Todo toggleTodo(Authentication authentication, @PathVariable UUID id) {
        UUID userId = UUID.fromString(authentication.getName());
        Todo todo = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));
        todo.setCompleted(!todo.isCompleted());
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(Authentication authentication, @PathVariable UUID id) {
        UUID userId = UUID.fromString(authentication.getName());
        if (!todoRepository.existsByIdAndUserId(id, userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found");
        }
        todoRepository.deleteById(id);
    }
}