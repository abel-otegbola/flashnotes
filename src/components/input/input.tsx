'use client'
import { Eye, EyeClosed } from "@solar-icons/react";
import { Field } from "formik";
import { ReactNode, InputHTMLAttributes, useState } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    type?: string;
    value?: string | number;
    error?: string | undefined;
    placeholder?: string;
    leftIcon?: ReactNode;
}

export default function Input({ className, disabled, label, name, value, type, onChange, error, placeholder, leftIcon, ...props }: inputProps) {
    const [focus, setFocus] = useState(false)
    const [show, setShow] = useState(false)


    return (
        <div>
            { label ? <label htmlFor={name} className={`text-[12px] font-medium duration-300 ${focus ? "text-primary" : ""}`}>{label}</label> : "" }

            <div className={`flex items-center gap-1 relative bg-white dark:bg-transparent dark:text-gray w-full border rounded-[6px] p-1 mt-1 duration-500 
                ${error && !focus ? "border-red-500 text-red-500 " : "border-gray-100"}
                ${focus ? "border-primary shadow-input-active" : ""}
                ${className}
            `}>
                <span className={`${!focus ? "opacity-[0.4]": "text-primary"} ${leftIcon ? "pl-2" : ""}`}>{ leftIcon }</span>
                <Field
                    className={`sm:p-2 p-[6px] w-full outline-none bg-transparent
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    id={name}
                    type={type === "password" && show ? "text" : type}
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onChange}
                    { ...props }
                />

                { type === "password" ? 
                    <span tabIndex={1} className="p-2 cursor-pointer" title="toggle show password" aria-checked={show} onClick={() => setShow(!show)}>{ show ? <Eye /> : <EyeClosed /> }</span>
                : "" }
            </div>
                { error && !focus ? <p className="p1-1 text-[10px] bg-white text-red-500 backdrop-blur-sm">{error}</p> : "" }
        </div>
    )
}