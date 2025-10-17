"use client";

import { useState, useRef, useEffect } from "react";
import { ChatLine, MenuDots, Pen, TrashBinMinimalistic } from "@solar-icons/react";
import { todo } from "../../interface/todo";

function TodoCard({ title, description, comments, category, status }: todo) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const statusColors: Record<
    string,
    { border: string; bg: string; text: string }
  > = {
    upcoming: {
      border: "border-blue-400/30",
      bg: "bg-blue-400/[0.1]",
      text: "text-blue-500",
    },
    "in progress": {
      border: "border-yellow-400/30",
      bg: "bg-yellow-400/[0.1]",
      text: "text-yellow-500",
    },
    pending: {
      border: "border-orange-400/30",
      bg: "bg-orange-400/[0.1]",
      text: "text-orange-500",
    },
    completed: {
      border: "border-green-400/30",
      bg: "bg-green-400/[0.1]",
      text: "text-green-500",
    },
    suspended: {
      border: "border-red-400/30",
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
    <div
      className={`relative flex flex-col border-l-4 ${color.border} rounded-[10px] border border-gray-100 overflow-hidden transition-all hover:shadow-sm`}
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
              onClick={() => setOpenMenu(!openMenu)}
              className="rotate-[90deg] text-gray-500 hover:text-gray-700"
            >
              <MenuDots size={16} color="currentColor" />
            </button>

            {openMenu && (
              <div className="absolute right-0 top-6 bg-white border border-gray-100 rounded-lg shadow-md w-32 z-20 animate-fadeIn">
                <button
                  onClick={() => alert(`Edit: ${title}`)}
                  className="flex items-center gap-2 w-full text-left text-sm p-2 hover:bg-gray-50 text-gray-700"
                >
                  <Pen size={14} /> Edit
                </button>
                <button
                  onClick={() => alert(`Delete: ${title}`)}
                  className="flex items-center gap-2 w-full text-left text-sm p-2 hover:bg-red-50 text-red-500"
                >
                  <TrashBinMinimalistic size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <h2 className="font-semibold text-[12px]">{title}</h2>
        <p className="text-[10px] text-gray-600">{description}</p>
      </div>

      <div className="flex justify-between gap-4 flex-wrap p-2 px-4 border-t border-gray-100">
        <div className="flex ml-2">
          <span className="border-2 border-white -ml-2 p-2 w-6 h-6 rounded-full bg-gray-100"></span>
          <span className="border-2 border-white -ml-2 p-2 w-6 h-6 rounded-full bg-gray-100"></span>
        </div>
        <p className="text-[12px] flex gap-1 items-center text-gray-500">
          <ChatLine size={12} color="currentColor" />
          {comments}
        </p>
      </div>
    </div>
  );
}

export default TodoCard;
