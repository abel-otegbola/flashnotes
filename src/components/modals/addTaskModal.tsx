'use client';
import { useState } from "react";
import { todo } from "../../interface/todo";
import { CloseCircle } from "@solar-icons/react";
import Input from "../input/input";
import Button from "../button/button";
import { Formik } from "formik";
import { useUser } from "../../context/authContext";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: todo) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
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

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newTask: todo = {
      id: Date.now().toString(),
      userId: user?.id || "",
      userEmail: user?.email || "",
      title: form.title,
      description: form.description,
      comments: form.comments || "0",
      category: form.category,
      assignee: form.assignee,
      invites: form.invites ? form.invites.split(",").map((i) => i.trim()) : [],
      status: form.status as todo["status"],
      priority: form.priority as todo["priority"],
      dueDate: form.dueDate,
      createdAt: new Date().toISOString(),
    };

    onAdd(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#101010] rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <CloseCircle size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-2">Add New Task</h2>
        <Formik
            initialValues={{ title: "", description: "", category: "", assignee: "", invites: "", status: "", priority: "", dueDate: "" }}
            onSubmit={(values, { setSubmitting }) => {
                
                setSubmitting(false);
            }}
        >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">

                    <Input name="title" value={values.title} onChange={handleChange} placeholder="Task Title" className="" />
                    <textarea name="description" value={values.description} onChange={handleChange} placeholder="Description" className=" min-h-[80px]" />
                    <Input name="category" value={values.category} onChange={handleChange} placeholder="Category (e.g. Design, Dev)" className="" />
                    <Input name="assignee" value={values.assignee} onChange={handleChange} placeholder="Assignee (optional)" className="" />
                    <Input name="invites" value={values.invites} onChange={handleChange} placeholder="Invites (comma-separated emails)" className="" />

                    <div className="flex flex-col sm:flex-row gap-2">
                    <select name="status" value={values.status} onChange={handleChange} className=" flex-1">
                        <option value="upcoming">Upcoming</option>
                        <option value="in progress">In Progress</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="suspended">Suspended</option>
                    </select>

                    <select name="priority" value={values.priority} onChange={handleChange} className=" flex-1">
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    </div>

                    <Input type="date" name="dueDate" value={values.dueDate} onChange={handleChange} className="" />

                    <Button
                    onClick={handleSubmit}
                    className="bg-black text-white rounded-md p-2 mt-3 hover:bg-dark-bg-secondary dark:hover:bg-dark-bg-secondary transition"
                    >
                    Add Task
                    </Button>
                </form>
            )}
        </Formik>
      </div>
    </div>
  );
}
