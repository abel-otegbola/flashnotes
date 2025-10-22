import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required("Password is required"),
})

export const registerSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    name: Yup.string().required("name is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*\d).{7,}$/,
            "Password must be at least 7 characters long and contain at least one number"
        ),
})