
import { AddCircle } from "@solar-icons/react";
import TodoCard from "../../../components/cards/todoCard";
import { todoData } from "../../../data/todo";

function Tasks() {

  return (
    <div className="flex flex-col gap-6 bg-white md:rounded-[10px] p-6 py-10 h-full mb-4">
      <h1 className="font-medium md:text-[24px] text-[18px] leading-[120%]">
        Your Tasks
      </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 items-start">
        <div className="flex flex-col gap-2">
            <button className="flex items-center justify-between w-full border border-gray-100 p-2 pl-4 font-medium rounded-full">
                Todo
                <AddCircle size={20} />
            </button>
            <div className="flex flex-col gap-4">
                {
                    todoData.filter(t => t.status === "upcoming").map(todo => (
                        <TodoCard key={todo.title} {...todo} />
                    ))
                }
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <button className="flex items-center justify-between w-full border border-gray-100 p-2 pl-4 font-medium rounded-full">
                In Progress
                <AddCircle size={20} />
            </button>
            <div className="flex flex-col gap-4">
                {
                    todoData.filter(t => t.status === "in progress").map(todo => (
                        <TodoCard key={todo.title} {...todo} />
                    ))
                }
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <button className="flex items-center justify-between w-full border border-gray-100 p-2 pl-4 font-medium rounded-full">
                Reviewed
                <AddCircle size={20} />
            </button>
            <div className="flex flex-col gap-4">
                {
                    todoData.filter(t => t.status === "pending").map(todo => (
                        <TodoCard key={todo.title} {...todo} />
                    ))
                }
            </div>
        </div>
        
        <div className="flex flex-col gap-2">
            <button className="flex items-center justify-between w-full border border-gray-100 p-2 pl-4 font-medium rounded-full">
                Completed
                <AddCircle size={20} />
            </button>
            <div className="flex flex-col gap-4">
                {
                    todoData.filter(t => t.status === "completed").map(todo => (
                        <TodoCard key={todo.title} {...todo} />
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks