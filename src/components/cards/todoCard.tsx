import { ChatLine, MenuDots } from "@solar-icons/react"
import { todo } from "../../interface/todo"

function TodoCard({ title, description, comments, category }: todo) {
  return (
    <div className="flex flex-col border border-gray-100 rounded-[10px]">
        <div className="flex flex-col gap-3 p-4">
            <div className="flex justify-between gap-4">
                <p className="p-1 px-3 font-medium rounded-full bg-green-400/[0.09] text-green-400 text-[10px] w-fit">{category}</p>
                <button className="rotate-[90deg]"><MenuDots size={16} color="currentColor" /></button>
            </div>
            <h2 className="font-semibold">{title}</h2>
            <p className="text-[12px]">{description}</p>
        </div>
        <div className="flex justify-between gap-4 flex-wrap p-2 px-4 border-t border-gray-100">
            <div className="flex ml-2">
                <span className="border-2 border-white -ml-2 p-2 w-6 h-6 rounded-full bg-gray-100"></span>
                <span className="border-2 border-white -ml-2 p-2 w-6 h-6 rounded-full bg-gray-100"></span>
            </div>
            <p className="text-[12px] flex gap-1 items-center">
                <ChatLine size={12} color="currentColor" />
                {comments}
            </p>
        </div>
    </div>
  )
}

export default TodoCard