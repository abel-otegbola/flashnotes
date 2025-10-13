import { Formik } from "formik";
import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../../components/button/button";
import LoadingIcon from "../../../assets/icons/loading";
import { AuthContext } from "../../../context/authContext";
import { registerSchema } from "../../../schema/auth";
import Input from "../../../components/input/input";
import LogoIcon from "../../../assets/icons/logo";
import { Letter, User } from "@solar-icons/react";
import BlurReveal from "../../../components/animations/blurReveal";

export default function Waitlist() {
  const { signUp, loading } = useContext(AuthContext);
  const [URLSearchParams] = useSearchParams()
  const callbackURL = URLSearchParams.get("callbackURL") || ""

  return (
    <div className="min-h-[400px] flex justify-between">

      <div className="bg-gray-100 md:w-[50%] h-screen md:block hidden"></div>

      <div className="flex md:w-[50%] h-auto w-full items-center justify-center">
        <div className="sm:w-[400px] md:mx-0 mx-auto w-full p-6">
          <div className="flex flex-col justify-center gap-6 md:p-[5%] md:py-[5%] py-[80px]">
            <div className="flex flex-col gap-2">
              <BlurReveal preset="slide-right">
                <div className="flex gap-2 items-center">
                  <LogoIcon />
                  <p className="bg-[#E9FFEE] text-[#40A65B] text-[10px] px-2 py-1 rounded-full">Coming soon</p>
                </div>
              </BlurReveal>

              <BlurReveal preset="slide-up">
                <h1 className="font-bold md:text-[20px] text-[16px] text-dark-500">Get early access</h1>
              </BlurReveal>
              <BlurReveal preset="slide-up">
                <p className="text-gray">Be one of the first to create a profile and claim a premium username </p>
              </BlurReveal>
            </div>
            <Formik
              initialValues={{ email: "", username: "" }}
              validationSchema={registerSchema}
              onSubmit={(values, { setSubmitting }) => {
                signUp(values.email, values.username, callbackURL || "/dashboard");
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
                    <Input
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      type="text"
                      error={touched.username ? errors.username : ""}
                      label="Username"
                      placeholder="Your username"
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
                  
                  <BlurReveal preset="slide-up">
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
              <BlurReveal preset="zoom">
                <img src="/users.png" alt="users" width={220} height={36} className="" />
              </BlurReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

