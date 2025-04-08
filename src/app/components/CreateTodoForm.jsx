"use client";

import { useState } from 'react';
import { createTodo } from '../services/api';

const CreateTodoForm = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await createTodo({ title, description });
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Reset form
      setTitle('');
      setDescription('');
      
      if (onTodoCreated) {
        onTodoCreated();
      }
    } catch (error) {
      setError('Failed to create todo. Please try again.');
      console.error('Error creating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-black border-b pb-3">Create New Todo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
            placeholder="What needs to be done?"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
            placeholder="Add details about this task..."
            rows={4}
          />
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Todo created successfully!
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setDescription('');
              setError('');
            }}
            className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
          >
            Clear form
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className={`bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-sm transition duration-200 flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Todo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodoForm;