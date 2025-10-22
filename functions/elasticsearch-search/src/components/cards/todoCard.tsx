"use client";

import { useState, useRef, useEffect } from "react";
import { ChatLine, MenuDots, Pen, TrashBinMinimalistic } from "@solar-icons/react";
import { todo } from "../../interface/todo";
import TaskDetailsModal from "../modals/taskDetailsModal";

function TodoCard(task: todo) {
  const { title, description, comments, category, status } = task;
  const [openMenu, setOpenMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const statusColors: Record<
    string,
    { border: string; bg: string; text: string }
  > = {
    upcoming: {
      border: "border-blue-400/10",
      bg: "bg-blue-400/[0.1]",
      text: "text-blue-500",
    },
    "in progress": {
      border: "border-yellow-400/10",
      bg: "bg-yellow-400/[0.1]",
      text: "text-yellow-500",
    },
    pending: {
      border: "border-orange-400/10",
      bg: "bg-orange-400/[0.1]",
      text: "text-orange-500",
    },
    completed: {
      border: "border-green-400/10",
      bg: "bg-green-400/[0.1]",
      text: "text-green-500",
    },
    suspended: {
      border: "border-red-400/10",
      bg: "bg-red-400/[0.1]",
      text: "text-red-500",
    },
  };

  const color = statusColors[status] || statusColors.upcoming;

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        onClick={() => setShowDetails(true)}
        className={`relative flex flex-col border-l-4 ${color.border} rounded-[10px] border border-gray-100/10 bg-white dark:bg-[#101010] overflow-hidden transition-all hover:shadow-md cursor-pointer`}
      >
        <div className="flex flex-col gap-3 p-4">
          <div className="flex justify-between gap-4 items-start">
            <p
              className={`p-1 px-3 font-medium rounded-full text-[10px] w-fit ${color.bg} ${color.text}`}
            >
              {category}
            </p>

            <div className="relative" ref={menuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(!openMenu);
                }}
                className="rotate-[90deg] text-gray-500 hover:text-gray-700"
              >
                <MenuDots size={16} color="currentColor" />
              </button>

              {openMenu && (
                <div className="absolute right-0 top-6 bg-white dark:bg-dark-bg-secondary border border-gray-100 dark:border-gray-700 rounded-lg shadow-md w-32 z-20 animate-fadeIn">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(true);
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-2 w-full text-left text-sm p-2 hover:bg-gray-50 dark:hover:bg-dark-bg text-gray-700 dark:text-gray-300"
                  >
                    <Pen size={14} /> Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete task: ${title}?`)) {
                        // Delete handled in modal
                      }
                      setOpenMenu(false);
                    }}
                    className="flex items-center gap-2 w-full text-left text-sm p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                  >
                    <TrashBinMinimalistic size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <h2 className="font-semibold text-[12px]">{title}</h2>
          <p className="text-[10px] text-gray-400 line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between gap-4 flex-wrap p-2 px-4 border-t border-gray-100 dark:border-gray-500/[0.2]">
          <div className="flex ml-2">
            <span className="border-2 border-white -ml-2 p-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-500/[0.2] dark:border-[#151515]"></span>
            <span className="border-2 border-white -ml-2 p-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-500/[0.2] dark:border-[#151515]"></span>
          </div>
          <p className="text-[12px] flex gap-1 items-center text-gray-500">
            <ChatLine size={12} color="currentColor" />
            {comments}
          </p>
        </div>
      </div>

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        task={task}
      />
    </>
  );
}

export default TodoCard;
