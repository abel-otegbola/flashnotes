import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useTasks } from "../../../context/tasksContext";
import { useUser } from "../../../context/authContext";
import Calendar from "react-calendar";
import { ArrowLeft, ArrowRight, CalendarDate } from "@solar-icons/react";
import TasksList from "../../../components/ui/tasksList";

function Dashboard() {
  const { tasks, loading, getTasks } = useTasks();
  const { user } = useUser();
  const [dateRange, setDateRange] = useState<[string, string]>(["Thu Sep 18 2025 00:00:00 GMT+0100 (West Africa Standard Time)", "Fri Sep 19 2025 23:59:59 GMT+0100 (West Africa Standard Time)"]);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;

  const recent = tasks.slice(0, 5);

  useEffect(() => {
    getTasks(user?.email || "");
  }, [user]);

  return (
    <div className="flex gap-4 mb-4">
    <div className="flex flex-1 flex-col gap-6 bg-white dark:bg-dark-bg border border-gray-500/[0.1] md:rounded-[10px] px-6 py-4 h-full mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Welcome back, {user.name}</h1>
          <p className="text-sm text-gray-500">Here's a quick overview of your tasks</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg">
            <div className="text-xs text-gray-500">Total</div>
            <div className="font-bold text-xl">{total}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg">
            <div className="text-xs text-gray-500">Completed</div>
            <div className="font-bold text-xl">{completed}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg">
            <div className="text-xs text-gray-500">Pending</div>
            <div className="font-bold text-xl">{pending}</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-border-gray-100 dark:border-gray-500/[0.2] bg-bg-gray-100 dark:bg-dark-bg-secondary/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Recent tasks</h2>
          <Link to={"/account/tasks"} className="text-primary">View all</Link>
        </div>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : recent.length === 0 ? (
          <div className="text-gray-500">No tasks yet. Create one using the Create button.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {recent.map((t) => (
              <div key={t.$id} className="p-3 rounded-md bg-white dark:bg-dark-bg border border-border-gray-100 dark:border-gray-500/[0.2] dark:bg-dark-secondary">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{t.title}</div>
                    {t.description && <div className="text-sm text-gray-500">{t.description}</div>}
                  </div>
                  <div className="text-xs text-gray-400">{t.priority || '—'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

      <div className="p-4 sm:w-[320px] border border-primary/[0.12] bg-white dark:bg-dark-bg rounded-[10px]">
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