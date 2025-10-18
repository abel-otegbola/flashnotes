import { Link } from "react-router-dom"
import Input from "../../../components/input/input"
import { Formik } from "formik";
import Button from "../../../components/button/button";
import { ArrowRight } from "@solar-icons/react";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-[#151515] md:rounded-[10px] md:px-[16.66%] py-[10%] px-6 h-full mb-4">
      <h1 className="font-medium md:text-[40px] text-[20px] bg-gradient-to-r bg-clip-text text-transparent from-black dark:from-white to-primary leading-[120%]">
        Hi there, Abel <br />
        What do you want to do today?
      </h1>

      <div className="flex justify-between gap-4">
        <p className="text-gray-400">Continue from where you stopped yesterday and add today’s tasks</p>
        <Link to={"tasks"} className="text-primary">View all</Link>
      </div>

      <div className="flex flex-col gap-2 p-4 rounded-[10px] border border-gray-100 dark:border-gray-500/[0.3]">
        <div className="flex gap-2 w-full">
          <Formik
                initialValues={{ search: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="flex-1">
                    <textarea placeholder="Start speaking or writing..." onChange={handleChange} className="border-none w-full h-[100px] outline-none" name="search" value={values.search} />
                </form>
                )
            }
            </Formik>
          <p>Audio</p>
        </div>

        <div className="flex justify-between items-end">
          <p>0/1000</p>
          <Button className="rounded-full" size="small">
            Generate tasks
            <span className="bg-white rounded-full p-2 text-primary md:-mr-2 -mr-1"><ArrowRight color="currentColor" size={12}/></span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard