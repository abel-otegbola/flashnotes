import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useTasks } from "../../../context/tasksContext";
import { useUser } from "../../../context/authContext";
import Calendar from "react-calendar";
import { ArrowLeft, ArrowRight, CalendarDate } from "@solar-icons/react";
import TasksList from "../../../components/ui/tasksList";
import TasksPerDay from "../../../components/charts/TasksPerDay";
import { todo } from "../../../interface/todo";
import TaskDetailsModal from "../../../components/modals/taskDetailsModal";

function Dashboard() {
  const { tasks, loading, getTasks } = useTasks();
  const { user } = useUser();
  const [selectedTask, setSelectedTask] = useState<todo | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[string, string]>(["Thu Sep 18 2025 00:00:00 GMT+0100 (West Africa Standard Time)", "Fri Sep 19 2025 23:59:59 GMT+0100 (West Africa Standard Time)"]);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;

  const recent = tasks.slice(0, 5);

  useEffect(() => {
    getTasks(user?.email || "");
  }, [user]);
  
  const openTaskDetails = (task: todo) => {
      setSelectedTask(task);
      setDetailsOpen(true);
  };
  
  const closeTaskDetails = () => {
      setDetailsOpen(false);
      setSelectedTask(null);
  };

  return (
    <div className="flex sm:flex-row flex-col gap-4 mb-4">
    <div className="flex flex-1 flex-col gap-6 bg-white dark:bg-dark-bg border border-gray-500/[0.1] md:rounded-[10px] px-6 py-4 h-full mb-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-semibold text-2xl">Welcome back, {user.name}</h1>
          <p className="text-sm text-gray-500">Here's a quick overview of your tasks</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-dark rounded-lg">
            <div className="text-xs text-gray-500">Total</div>
            <div className="font-bold text-xl">{total}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-dark rounded-lg">
            <div className="text-xs text-gray-500">Completed</div>
            <div className="font-bold text-xl">{completed}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-dark rounded-lg">
            <div className="text-xs text-gray-500">Pending</div>
            <div className="font-bold text-xl">{pending}</div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Recent tasks</h2>
          <Link to={"/account/tasks"} className="text-primary">View all</Link>
        </div>
        {/* Task Details Modal (for list/grid/calendar clicks) */}
        {selectedTask && (
          <TaskDetailsModal
              isOpen={detailsOpen}
              onClose={closeTaskDetails}
              task={selectedTask}
          />
        )}

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : recent.length === 0 ? (
          <div className="text-gray-500">No tasks yet. Create one using the Create button.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {recent.map((task) => (
              <div 
                key={task.$id}
                onClick={() => openTaskDetails(task)}
                role="button"
                tabIndex={0}
                className="md:grid md:grid-cols-12 flex flex-col gap-4 px-4 py-3 border border-gray-500/[0.2] rounded-lg hover:shadow-md transition-shadow bg-bg-gray-100 dark:bg-dark-bg-secondary/50 cursor-pointer"
              >
                {/* Mobile Layout */}
                <div className="md:col-span-4 flex flex-col gap-1">
                    <h3 className="font-semibold text-sm">{task.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 md:line-clamp-1">{task.description}</p>
                </div>
                
                {/* Desktop Layout - Remaining columns */}
                <div className="md:col-span-2 flex items-center md:justify-start">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
                        {task.category}
                    </span>
                </div>
                <div className="md:col-span-2 flex items-center md:justify-start">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        task.status === 'in progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        task.status === 'suspended' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        task.status === 'pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                        {task.status}
                    </span>
                </div>
                <div className="md:col-span-2 flex items-center md:justify-start">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                        {task.priority || 'medium'}
                    </span>
                </div>
                <div className="md:col-span-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                </div>
                                </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Tasks per day chart */}
      <div>
        <TasksPerDay days={14} />
      </div>
    </div>

      <div className="p-4 sm:w-[320px] w-full border border-primary/[0.12] bg-white dark:bg-dark-bg rounded-[10px]">
        <div className="flex py-2 justify-between items-center gap-2">
            <p className="font-semibold 2xl:text-[20px] text-[16px]">Calendar</p>
            <div className="p-[6px] rounded-[5px] bg-[#A2A1A81A] hover:bg-gray-500/[0.06]">
                <CalendarDate color="currentColor" size={20} />
            </div>
        </div>
        <Calendar
            defaultValue={dateRange}
            selectRange={true}
            onChange={(value) => {
                if (Array.isArray(value) && value[0] && value[1]) {
                    setDateRange([
                        value[0].toString(),
                        value[1].toString()
                    ]);
                }
            }}
            nextLabel={<ArrowRight color="#fff" size={20} />}
            prevLabel={<ArrowLeft color="#fff" size={20} />}
        />
        <div className="flex flex-col gap-6 py-2">
            <TasksList tasks={tasks} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard