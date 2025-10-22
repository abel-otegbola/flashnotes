'use client';
import { useState, useEffect } from "react";
import { todo } from "../../interface/todo";
import { CloseCircle, Calendar, User, Flag, TrashBinTrash } from "@solar-icons/react";
import Button from "../button/button";
import { useUser } from "../../context/authContext";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (task: Omit<todo, '$id' | 'id' | '$createdAt'>) => void;
  onUpdate?: (taskId: string, updates: Partial<todo>) => void;
  onDelete?: (taskId: string) => void;
  task?: todo | null; // If task is provided, we're in edit mode
  mode?: 'add' | 'edit';
}

export default function AddTaskModal({ 
  isOpen, 
  onClose, 
  onAdd, 
  onUpdate,
  onDelete,
  task = null,
  mode = 'add'
}: AddTaskModalProps) {
  const { user } = useUser()
  const [form, setForm] = useState({
    title: "",
    description: "",
    comments: "",
    category: "",
    assignee: "",
    invites: "",
    status: "upcoming",
    priority: "medium",
    dueDate: "",
  });

  const [newAssignee, setNewAssignee] = useState("");
  const [assigneesList, setAssigneesList] = useState<string[]>([]);

  // Populate form when editing
  useEffect(() => {
    if (task && mode === 'edit') {
      setForm({
        title: task.title || "",
        description: task.description || "",
        comments: task.comments || "0",
        category: task.category || "",
        assignee: task.assignee || "",
        invites: task.invites?.join(", ") || "",
        status: task.status || "upcoming",
        priority: task.priority || "medium",
        dueDate: task.dueDate || "",
      });
      setAssigneesList(task.invites || []);
    } else {
      // Reset form for add mode
      setForm({
        title: "",
        description: "",
        comments: "",
        category: "",
        assignee: "",
        invites: "",
        status: "upcoming",
        priority: "medium",
        dueDate: "",
      });
      setAssigneesList([]);
    }
  }, [task, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAssignee = () => {
    if (!newAssignee.trim()) return;
    if (assigneesList.includes(newAssignee.trim())) {
      alert("This assignee is already added");
      return;
    }
    setAssigneesList([...assigneesList, newAssignee.trim()]);
    setNewAssignee("");
  };

  const handleRemoveAssignee = (email: string) => {
    setAssigneesList(assigneesList.filter(e => e !== email));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    if (mode === 'edit' && task && onUpdate) {
      // Update existing task
      const updates: Partial<todo> = {
        title: form.title,
        description: form.description,
        comments: form.comments || "0",
        category: form.category,
        assignee: form.assignee,
        invites: assigneesList,
        status: form.status as todo["status"],
        priority: form.priority as todo["priority"],
        dueDate: form.dueDate,
      };
      onUpdate(task.$id, updates);
    } else if (mode === 'add' && onAdd) {
      // Create new task
      const newTask: Omit<todo, '$id' | 'id' | '$createdAt'> = {
        userId: user?.id || "",
        userEmail: user?.email || "",
        title: form.title,
        description: form.description,
        comments: form.comments || "0",
        category: form.category,
        assignee: form.assignee,
        invites: assigneesList,
        status: form.status as todo["status"],
        priority: form.priority as todo["priority"],
        dueDate: form.dueDate,
      };
      onAdd(newTask);
    }
    onClose();
  };

  const handleDelete = () => {
    if (task && onDelete) {
      if (window.confirm("Are you sure you want to delete this task?")) {
        onDelete(task.$id);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#101010] rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#101010] border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">{mode === 'edit' ? 'Edit Task' : 'Add New Task'}</h2>
          <div className="flex items-center gap-2">
            {mode === 'edit' && onDelete && (
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                title="Delete Task"
              >
                <TrashBinTrash size={20} />
              </button>
            )}
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg-secondary rounded-lg transition-colors"
            >
              <CloseCircle size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-dark-bg-secondary">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title" 
              value={form.title} 
              onChange={handleChange} 
              placeholder="Task Title" 
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg outline-none focus:ring-2 focus:ring-primary" 
            />
          </div>

          {/* Description */}
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-dark-bg-secondary">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              placeholder="Task description" 
              className="w-full min-h-[100px] p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg outline-none focus:ring-2 focus:ring-primary" 
            />
          </div>

          {/* Task Details Grid */}
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-dark-bg-secondary">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <span>📁</span> Category
                </label>
                <input
                  name="category" 
                  value={form.category} 
                  onChange={handleChange} 
                  placeholder="e.g. Design, Dev" 
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <span>📊</span> Status
                </label>
                <select 
                  name="status" 
                  value={form.status} 
                  onChange={handleChange} 
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg outline-none"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="in progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <Flag size={16} /> Priority
                </label>
                <select 
                  name="priority" 
                  value={form.priority} 
                  onChange={handleChange} 
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Due Date
                </label>
                <input
                  type="date" 
                  name="dueDate" 
                  value={form.dueDate} 
                  onChange={handleChange} 
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Assignees Section */}
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-dark-bg-secondary">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
              <User size={16} /> Assignees
            </label>

            {/* Main Assignee */}
            <div className="mb-3">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Main Assignee</label>
              <input
                name="assignee" 
                value={form.assignee} 
                onChange={handleChange} 
                placeholder="Enter email address (optional)" 
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Add Additional Assignee */}
            <div className="mb-3">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Additional Assignees</label>
              <div className="flex gap-2">
                <input
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  placeholder="Enter email address"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAssignee();
                    }
                  }}
                  className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg outline-none focus:ring-2 focus:ring-primary"
                />
                <Button onClick={handleAddAssignee} size="small">
                  Add
                </Button>
              </div>
            </div>

            {/* Assignees List */}
            <div className="space-y-2">
              {assigneesList.map((email, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{email}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveAssignee(email)}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors"
                  >
                    <CloseCircle size={16} />
                  </button>
                </div>
              ))}
              {assigneesList.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">No additional assignees</p>
              )}
            </div>
          </div>

          {/* Metadata for Edit Mode */}
          {mode === 'edit' && task && (
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-dark-bg-secondary">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div>
                  <span className="font-medium">Created:</span> {new Date(task.$createdAt).toLocaleString()}
                </div>
                {task.$updatedAt && (
                  <div>
                    <span className="font-medium">Updated:</span> {new Date(task.$updatedAt).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-[#101010] border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === 'edit' ? 'Save Changes' : 'Add Task'}
          </Button>
        </div>
      </div>
    </div>
  );
}
