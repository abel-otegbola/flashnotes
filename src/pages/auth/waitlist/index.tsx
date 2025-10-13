import { Formik } from "formik";
import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../../components/button/button";
import LoadingIcon from "../../../assets/icons/loading";
import { AuthContext } from "../../../context/authContext";
import { registerSchema } from "../../../schema/auth";
import Input from "../../../components/input/input";
import LogoIcon from "../../../assets/icons/logo";
import { Letter, Lock, User } from "@solar-icons/react";
import BlurReveal from "../../../components/animations/blurReveal";

export default function Waitlist() {
  const { joinWaitlist, loading } = useContext(AuthContext);
  const [URLSearchParams] = useSearchParams()
  const callbackURL = URLSearchParams.get("callbackURL") || ""

  return (

      <div className="flex md:w-[55%] h-screen w-full items-center justify-center">
        <div className="sm:w-[400px] md:mx-0 mx-auto w-full p-6">
          <div className="flex flex-col justify-center gap-6 md:p-[5%]">
            <div className="flex flex-col gap-2">
              <BlurReveal preset="slide-right">
                <div className="flex gap-2 items-center">
                  <LogoIcon />
                  <p className="bg-[#E9FFEE] text-[#40A65B] text-[10px] px-2 py-1 rounded-full">Coming soon</p>
                </div>
              </BlurReveal>

              <BlurReveal preset="slide-left">
                <h1 className="font-bold md:text-[20px] text-[16px] text-dark-500">Get early access</h1>
              </BlurReveal>
              <BlurReveal preset="slide-left">
                <p className="text-gray">Be one of the first to create a profile and claim a premium name </p>
              </BlurReveal>
            </div>
            <Formik
              initialValues={{ email: "", name: "", password: "" }}
              validationSchema={registerSchema}
              onSubmit={(values, { setSubmitting }) => {
                joinWaitlist(values.name, values.email, values.password, callbackURL || "/dashboard");
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
                    <Input
                      name="name" 
                      value={values.name}
                      onChange={handleChange}
                      type="text"
                      error={touched.name ? errors.name : ""}
                      label="Username"
                      placeholder="Your name"
                      leftIcon={<User weight="Outline" />}
                    />

                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                      error={touched.email ? errors.email : ""}
                      label="Email Address"
                      placeholder="Enter your email"
                      leftIcon={<Letter weight="Outline" />}
                    />

                    <Input
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      type="password"
                      error={touched.password ? errors.password : ""}
                      label="Password"
                      placeholder="Enter your password"
                      leftIcon={<Lock weight="Outline" />}
                    />
                  
                  <BlurReveal preset="slide-left">
                    <Button type="submit" className="w-full">
                      {isSubmitting || loading ? <LoadingIcon color="white" className="animate-spin w-[20px]" /> : "Join waitlist"}
                    </Button>
                  </BlurReveal>
                </form>

              )}
            </Formik>

            <div className="py-4 flex flex-col gap-4">
              <BlurReveal preset="slide-right">
                <p>Join over 10+ users</p>
              </BlurReveal>
              <img src="/users.png" alt="users" width={220} height={36} className="" />
            </div>
          </div>
        </div>
      </div>
  );
}

