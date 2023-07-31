import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../components/form/button';
import FormikField from '../components/form/formik-field';
import Input from '../components/form/input';
import InputMask from '../components/form/input-mask';
import Textarea from '../components/form/teaxtarea';
import Container from '../components/layout/container';
import Page from '../components/layout/page';
import { cpfMask, removeMask } from '../utils/mask';

export default function ComponentsPage() {
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().min(4).required()
    }),
    onSubmit: (values) => {
      alert(values);
    }
  });
  return (
    <Page className='flex flex-col'>
      <Container className='flex flex-col gap-6 divide-y-2 pb-16'>
        <section className='flex flex-col gap-4'>
          <h1 className='text-2xl'>Button</h1>
          <h2 className='text-xl'>neutral - primary - accent - danger</h2>

          <p>sm</p>
          <div className='flex items-baseline gap-2'>
            <Button sm>Click me</Button>

            <Button sm primary>
              Click me
            </Button>

            <Button sm accent>
              Click me
            </Button>

            <Button sm danger>
              Click me
            </Button>
          </div>
          <div className='flex items-baseline gap-2'>
            <Button sm outline>
              Click me
            </Button>

            <Button sm outline primary>
              Click me
            </Button>

            <Button sm outline accent>
              Click me
            </Button>

            <Button sm outline danger>
              Click me
            </Button>
          </div>

          <p>md</p>
          <div className='flex items-baseline gap-2'>
            <Button>Click me</Button>

            <Button primary>Click me</Button>

            <Button accent>Click me</Button>

            <Button danger>Click me</Button>
          </div>
          <div className='flex items-baseline gap-2'>
            <Button outline>Click me</Button>

            <Button outline primary>
              Click me
            </Button>

            <Button outline accent>
              Click me
            </Button>

            <Button outline danger>
              Click me
            </Button>
          </div>

          <p>lg</p>
          <div className='flex items-baseline gap-2'>
            <Button lg>Click me</Button>

            <Button lg primary>
              Click me
            </Button>

            <Button lg accent>
              Click me
            </Button>

            <Button lg danger>
              Click me
            </Button>
          </div>
          <div className='flex items-baseline gap-2'>
            <Button lg outline>
              Click me
            </Button>

            <Button lg outline primary>
              Click me
            </Button>

            <Button lg outline accent>
              Click me
            </Button>

            <Button lg outline danger>
              Click me
            </Button>
          </div>
        </section>
        <section className='flex flex-col gap-4'>
          <h1 className='text-2xl'>Input</h1>
          <Input />
        </section>
        <section className='flex flex-col gap-4'>
          <h1 className='text-2xl'>InputMask</h1>
          <InputMask mask={cpfMask} removeMask={removeMask} />
        </section>
        <section className='flex flex-col gap-4'>
          <h1 className='text-2xl'>Textarea</h1>
          <Textarea />
        </section>
        <section className='flex flex-col gap-4'>
          <h1 className='text-2xl'>FormikField</h1>
          <FormikField name='name' label='Name' formik={formik} />
          <FormikField
            name='address'
            label='Address'
            component={Textarea}
            formik={formik}
          />
        </section>
      </Container>
    </Page>
  );
}
