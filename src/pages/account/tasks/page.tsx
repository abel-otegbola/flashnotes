'use client';
import { useState } from "react";
import { AddCircle } from "@solar-icons/react";
import TodoCard from "../../../components/cards/todoCard";
import { todoData } from "../../../data/todo";
import AddTaskModal from "../../../components/modals/addTaskModal";
import { todo } from "../../../interface/todo";
import Button from "../../../components/button/button";

const sections = [
  { key: "todo", title: "Todo", filter: "upcoming", color: "yellow" },
  { key: "inProgress", title: "In Progress", filter: "in progress", color: "blue" },
  { key: "reviewed", title: "Reviewed", filter: "pending", color: "orange" },
  { key: "completed", title: "Completed", filter: "completed", color: "green" },
  { key: "suspended", title: "Suspended", filter: "suspended", color: "red" },
] as const;

const colorClasses: Record<string, string> = {
  yellow: "border-yellow-200 bg-yellow-50/70",
  blue: "border-blue-200 bg-blue-50/70",
  orange: "border-orange-200 bg-orange-50/70",
  green: "border-green-200 bg-green-50/70",
  red: "border-red-200 bg-red-50/70",
};

function Tasks() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState(todoData);

    const handleAddTask = (task: todo) => {
        setTasks((prev) => [...prev, task]);
    };

    const toggleSection = (key: string) =>
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="flex flex-col gap-6 bg-white md:rounded-[10px] p-6 py-10 h-full mb-4">
            <div className="flex justify-between gap-6">
                <h1 className="font-medium md:text-[24px] text-[18px] leading-[120%]">
                    Your Tasks
                </h1>
                <>
                    <Button
                        onClick={() => setShowModal(true)}
                        className="text-dark"
                        variant="secondary"
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

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 items-start">
            {sections.map(({ key, title, filter, color }) => (
            <div key={key} className="flex flex-col gap-2">
                <button
                onClick={() => toggleSection(key)}
                className={`flex items-center justify-between w-full border p-2 pl-4 
                    font-medium rounded-full md:cursor-default transition-all duration-200 
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
                {todoData
                    .filter((t) => t.status === filter)
                    .map((todo) => (
                    <TodoCard key={todo.title} {...todo} />
                    ))}
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default Tasks;
