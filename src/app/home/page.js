"use client";

import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoDetail from '../components/TodoDetail';
import CreateTodoForm from '../components/CreateTodoForm';

export default function HomePage() {
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleTodoSelect = (todoId) => {
    setSelectedTodoId(todoId);
  };

  const refreshTodos = () => {
    // Increment to trigger useEffect dependency
    setRefresh(prev => prev + 1);
  };

  const handleTodoDelete = (todoId) => {
    if (selectedTodoId === todoId) {
      setSelectedTodoId(null);
    }
    refreshTodos();
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <CreateTodoForm onTodoCreated={refreshTodos} />
            
            <h2 className="text-xl font-bold mb-4">My Todos</h2>
            <TodoList 
              onTodoSelect={handleTodoSelect}
              selectedTodoId={selectedTodoId}
              onRefresh={refreshTodos}
              key={refresh} // Force refresh when needed
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow h-full min-h-[400px]">
            <TodoDetail 
              todoId={selectedTodoId} 
              onUpdate={refreshTodos}
              onDelete={handleTodoDelete}
            />
          </div>
        </div>
      </div>
    </main>
  );
}