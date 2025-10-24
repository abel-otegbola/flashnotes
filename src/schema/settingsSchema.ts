import * as Yup from 'yup';

export const settingsSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .required('Display name is required'),
});
