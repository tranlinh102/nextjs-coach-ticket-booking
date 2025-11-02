"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  // State: dữ liệu nội bộ quản lý danh sách nhiệm vụ
  const [todos, setTodos] = useState([
    { id: 1, text: "Học Next.js" },
    { id: 2, text: "Làm bài tập" },
    { id: 3, text: "Thực hành ví dụ " },
  ]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Danh sách Nhiệm vụ
      </h1>
      <ul className="space-y-2">
        {todos.map((todo) => (
          // Truyền dữ liệu xuống component con qua props
          <TodoItem key={todo.id} text={todo.text} />
        ))}
      </ul>
    </div>
  );
}
