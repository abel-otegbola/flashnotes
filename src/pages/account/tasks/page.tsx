'use client';
import { useState } from "react";
import { AddCircle } from "@solar-icons/react";
import TodoCard from "../../../components/cards/todoCard";
import AddTaskModal from "../../../components/modals/addTaskModal";
import { todo } from "../../../interface/todo";
import Button from "../../../components/button/button";
import { useTasks } from "../../../context/tasksContext";

const sections = [
  { key: "todo", title: "Todo", filter: "upcoming", color: "yellow" },
  { key: "inProgress", title: "In Progress", filter: "in progress", color: "blue" },
  { key: "reviewed", title: "Reviewed", filter: "pending", color: "orange" },
  { key: "completed", title: "Completed", filter: "completed", color: "green" },
  { key: "suspended", title: "Suspended", filter: "suspended", color: "red" },
] as const;

const colorClasses: Record<string, string> = {
  yellow: "border-yellow-200/[0.4] dark:border-gray-500/[0.2]",
  blue: "border-blue-200/[0.4] dark:border-gray-500/[0.2]",
  orange: "border-orange-200/[0.4] dark:border-gray-500/[0.2]",
  green: "border-green-200/[0.4] dark:border-gray-500/[0.2]",
  red: "border-red-200/[0.4] dark:border-gray-500/[0.2]",
};

function Tasks() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [showModal, setShowModal] = useState(false);
    const { tasks, loading, addTask } = useTasks();

    const handleAddTask = async (task: todo) => {
        await addTask(task);
        setShowModal(false);
    };

    const toggleSection = (key: string) =>
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="flex flex-col gap-6 bg-white dark:bg-dark-bg md:rounded-[10px] p-6 py-10 h-full mb-4">
            <div className="flex justify-between gap-6">
                <div>
                    <h1 className="font-medium md:text-[24px] text-[18px] leading-[120%]">
                        Your Tasks
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {tasks.length} total tasks
                    </p>
                </div>
                <>
                    <Button
                        onClick={() => setShowModal(true)}
                        className="text-dark"
                        variant="secondary"
                        disabled={loading}
                    > 
                        + New Task
                    </Button>

                    <AddTaskModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onAdd={handleAddTask}
                    />
                </>
            </div>

            {/* Task Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {sections.map(({ key, title, filter, color }) => {
                    const count = tasks.filter((t) => t.status === filter).length;
                    return (
                        <div 
                            key={key} 
                            className={`p-4 rounded-lg border ${colorClasses[color]} bg-bg-gray-100 dark:bg-dark-bg-secondary/50`}
                        >
                            <p className="text-gray-400 text-xs mb-1">{title}</p>
                            <p className="text-2xl font-bold">{count}</p>
                        </div>
                    );
                })}
            </div>

        <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-4 items-start">
            {sections.map(({ key, title, filter, color }) => (
            <div key={key} className="flex flex-col gap-2">
                <button
                onClick={() => toggleSection(key)}
                className={`flex items-center justify-between w-full border p-2 pl-4 
                    font-medium rounded-full md:cursor-default transition-all duration-200 bg-white dark:bg-[#101010]
                    ${colorClasses[color]}`}
                >
                {title}
                <AddCircle
                    size={20}
                    className={`md:hidden transition-transform ${
                    openSections[key] ? "rotate-45" : ""
                    }`}
                />
                </button>

                <div
                className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 
                    ${openSections[key] ? "max-h-[2000px]" : "max-h-0 md:max-h-none"}
                `}
                >
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : tasks.filter((t) => t.status === filter).length === 0 ? (
                    <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                    No tasks in {title.toLowerCase()}
                    </div>
                ) : (
                    tasks
                    .filter((t) => t.status === filter)
                    .map((task) => (
                        <TodoCard key={task.id} {...task} />
                    ))
                )}
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default Tasks;
