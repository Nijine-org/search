import { string, object } from 'yup';
const tokenFormValidation = object().shape({
  token: string().required('Token is required'),
  name: string().required('Name is required'),
});

export { tokenFormValidation };
