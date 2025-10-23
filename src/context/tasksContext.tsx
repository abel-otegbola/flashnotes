'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ID, Query } from "appwrite";
import { databases } from "../appwrite/appwrite";
import { todo } from '../interface/todo';
import toast from "react-hot-toast";
import { useUser } from './authContext';
import { User } from '../interface/auth';

type TasksContextValues = {
    tasks: todo[];
    loading: boolean;
    error: string | null;
    addTask: (task: Omit<todo, '$id' | 'id' | '$createdAt'>) => Promise<todo | null>;
    addMultipleTasks: (tasks: Omit<todo, '$id' | 'id' | '$createdAt'>[]) => Promise<todo[] | null>;
    updateTask: (taskId: string, updates: Partial<todo>) => Promise<todo | null>;
    deleteTask: (taskId: string) => Promise<boolean>;
    getTasks: (userEmail: string) => Promise<void>;
    getTaskById: (taskId: string) => todo | undefined;
    filterTasksByStatus: (status: todo['status']) => todo[];
    filterTasksByCategory: (category: string) => todo[];
}

export const TasksContext = createContext({} as TasksContextValues);

export function useTasks() {
  return useContext(TasksContext);
}

// Appwrite configuration - Update these with your actual values
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'YOUR_DATABASE_ID';
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID || 'YOUR_TASKS_COLLECTION_ID';

const TasksProvider = ({ children }: { children: ReactNode}) => {
    const [tasks, setTasks] = useState<todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get all tasks for the current user
    const getTasks = async (userEmail: string) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                TASKS_COLLECTION_ID,
                [
                    Query.equal('userEmail', userEmail),
                    Query.limit(100)
                ]
            );

            setTasks(response.documents as unknown as todo[]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks';
            setError(errorMessage);
            toast.error(errorMessage);
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    // Add a single task
    const addTask = async (task: Omit<todo, '$id' | 'id' | '$createdAt'>): Promise<todo | null> => {
        setLoading(true);
        setError(null);
        
        try {            
            const taskData: any = {
                title: task.title,
                description: task.description,
                category: task.category,
                status: task.status || 'pending',
                priority: task.priority || 'medium',
                comments: task.comments || '0',
                userId: task.userId,
                userEmail: task.userEmail
            };

            // Only add optional fields if they exist
            if (task.dueDate) taskData.dueDate = task.dueDate;
            if (task.assignee) taskData.assignee = task.assignee;
            if (task.invites) taskData.invites = task.invites;

            const response = await databases.createDocument(
                DATABASE_ID,
                TASKS_COLLECTION_ID,
                ID.unique(),
                taskData
            );
            
            const newTask = response as unknown as todo;
            setTasks(prev => [newTask, ...prev]);
            toast.success('Task created successfully!');
            return newTask;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
            setError(errorMessage);
            toast.error(errorMessage);
            console.error('Error creating task:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Add multiple tasks at once
    const addMultipleTasks = async (tasksToAdd: Omit<todo, '$id' | 'id' | '$createdAt'>[]): Promise<todo[] | null> => {
        setLoading(true);
        setError(null);
        
        try {            
            const createdTasks: todo[] = [];
            
            // Create tasks sequentially to avoid rate limiting
            for (const task of tasksToAdd) {
                const taskData: any = {
                    title: task.title,
                    description: task.description,
                    category: task.category,
                    status: task.status || 'pending',
                    priority: task.priority || 'medium',
                    comments: task.comments || '0',
                    userId: task.userId,
                    userEmail: task.userEmail
                };

                // Only add optional fields if they exist
                if (task.dueDate) taskData.dueDate = task.dueDate;
                if (task.assignee) taskData.assignee = task.assignee;
                if (task.invites) taskData.invites = task.invites;

                const response = await databases.createDocument(
                    DATABASE_ID,
                    TASKS_COLLECTION_ID,
                    ID.unique(),
                    taskData
                );
                
                createdTasks.push(response as unknown as todo);
            }
            
            setTasks(prev => [...createdTasks, ...prev]);
            toast.success(`${createdTasks.length} tasks created successfully!`);
            return createdTasks;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create tasks';
            setError(errorMessage);
            toast.error(errorMessage);
            console.error('Error creating tasks:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Update a task
    const updateTask = async (taskId: string, updates: Partial<todo>): Promise<todo | null> => {
        setLoading(true);
        setError(null);
        
        try {
            // Remove $createdAt and $updatedAt from updates as they're auto-managed by Appwrite
            const { $createdAt, $updatedAt, ...updateData } = updates as any;

            const response = await databases.updateDocument(
                DATABASE_ID,
                TASKS_COLLECTION_ID,
                taskId,
                updateData
            );
            
            const updatedTask = response as unknown as todo;
            setTasks(prev => prev.map(task => task.$id === taskId ? updatedTask : task));
            toast.success('Task updated successfully!');
            return updatedTask;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
            setError(errorMessage);
            toast.error(errorMessage);
            console.error('Error updating task:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Delete a task
    const deleteTask = async (taskId: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                TASKS_COLLECTION_ID,
                taskId
            );

            setTasks(prev => prev.filter(task => task.$id !== taskId));
            toast.success('Task deleted successfully!');
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
            setError(errorMessage);
            toast.error(errorMessage);
            console.error('Error deleting task:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Get a task by ID
    const getTaskById = (taskId: string): todo | undefined => {
        return tasks.find(task => task.$id === taskId);
    };

    // Filter tasks by status
    const filterTasksByStatus = (status: todo['status']): todo[] => {
        return tasks.filter(task => task.status === status);
    };

    // Filter tasks by category
    const filterTasksByCategory = (category: string): todo[] => {
        return tasks.filter(task => task.category === category);
    };

    const value: TasksContextValues = {
        tasks,
        loading,
        error,
        addTask,
        addMultipleTasks,
        updateTask,
        deleteTask,
        getTasks,
        getTaskById,
        filterTasksByStatus,
        filterTasksByCategory
    };

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
