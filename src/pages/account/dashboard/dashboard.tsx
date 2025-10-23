import { Link } from "react-router-dom"
import Input from "../../../components/input/input"
import { Formik } from "formik";
import Button from "../../../components/button/button";
import { ArrowRight } from "@solar-icons/react";
import VoiceInput from "../../../components/voiceInput/voiceInput";
import { useState } from "react";
import { convertTextToTasks } from "../../../services/gemini";
import { todo } from "../../../interface/todo";
import { useTasks } from "../../../context/tasksContext";
import { useUser } from "../../../context/authContext";

function Dashboard() {
  const { tasks, loading } = useTasks();
  const { user } = useUser();

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;

  const recent = tasks.slice(0, 5);

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-dark-bg border border-gray-500/[0.1] md:rounded-[10px] md:px-[8%] py-8 px-6 h-full mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Welcome back, {user?.name || user?.email}</h1>
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

      <div className="p-4 rounded-lg border border-border-gray-100 dark:border-gray-700 bg-bg-gray-100 dark:bg-dark-bg-secondary/50">
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
              <div key={t.$id} className="p-3 rounded-md bg-white dark:bg-dark-bg border border-border-gray-100 dark:border-gray-700">
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
  )
}

export default Dashboard