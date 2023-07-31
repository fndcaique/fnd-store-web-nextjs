import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Button from '../components/form/button';
import FormMessages from '../components/form/form-messages';
import FormikField from '../components/form/formik-field';
import Page from '../components/layout/page';
import { handleLogin } from '../store/reducers/user';

const formLoginSchema = Yup.object().shape({
  username: Yup.string().required(FormMessages.required),
  password: Yup.string().required(FormMessages.required)
});

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: formLoginSchema,
    onSubmit: ({ username, password }) => {
      dispatch(
        handleLogin({
          username,
          password
        })
      );
    }
  });

  return (
    <Page className='flex items-center justify-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='border-neutral border rounded p-8 flex flex-col gap-4 items-center w-[400px]'
      >
        <h1 className='text-4xl'>Entrar</h1>
        <FormikField
          name='username'
          label='Email ou nome de usuário'
          placeholder='seu email ou nome de usuário'
          formik={formik}
        />
        <FormikField
          name='password'
          label='Senha'
          type='password'
          placeholder='your password ****'
          formik={formik}
        />
        <Button primary type='submit'>
          Entrar
        </Button>
      </form>
    </Page>
  );
}
