import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Button from '../components/form/button';
import Checkbox from '../components/form/checkbox';
import FormMessages from '../components/form/form-messages';
import FormikField from '../components/form/formik-field';
import Input from '../components/form/input';
import InputMask from '../components/form/input-mask';
import Radio from '../components/form/radio';
import Select from '../components/form/select';
import Textarea, { TextareaProps } from '../components/form/teaxtarea';
import Container from '../components/layout/container';
import Page from '../components/layout/page';
import Modal from '../components/modal/modal';
import { ModalController, ModalService } from '../services/modal.service';
import { cpfMask, removeMask } from '../utils/mask';

const numbersText = [
  'Zero',
  'Um',
  'Dois',
  'Três',
  'Quatro',
  'Cinco',
  'Seis',
  'Sete',
  'Oito',
  'Novo',
  'Dez'
];

export default function ComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalControllers, setModalControllers] = useState<ModalController[]>(
    []
  );
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      address: '',
      graduated: false,
      prefer: 'frontend'
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(FormMessages.email)
        .required(FormMessages.required),
      name: Yup.string().required(FormMessages.required),
      address: Yup.string()
        .min(4, FormMessages.minLength(4))
        .max(32, FormMessages.maxLength(32))
        .required(FormMessages.required)
    }),
    onSubmit: (values) => {
      alert(values);
    }
  });

  const createModalWithModalService = () => {
    const componentProps: TextareaProps = {
      placeholder: 'Textarea criado com modal service'
    };

    const modal = ModalService.create({
      component: Textarea,
      componentProps
    });

    modal.onDidDismiss(({ data }) => console.log({ data }));

    setModalControllers((controllers) => [...controllers, modal]);

    setTimeout(() => {
      modal.dismiss('destroy');
    }, 10000);
  };
  return (
    <Page>
      <Container className='flex flex-col-reverse gap-7 divide-y-2 pb-16'>
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
          <div className='flex flex-wrap items-baseline gap-2'>
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
          <div className='flex flex-wrap items-baseline gap-2'>
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
          <FormikField
            name='email'
            label='Email'
            helperText='Informe o seu melhor email'
            placeholder='email@exemplo.com'
            formik={formik}
          />
          <FormikField name='name' label='Name' formik={formik} />
          <FormikField
            name='address'
            label='Address'
            component={Textarea}
            formik={formik}
            counter
            maxLength={32}
          />
          <div className='flex gap-4'>
            <FormikField
              marker
              name='graudated'
              label='Graduated'
              component={Checkbox}
              formik={formik}
            />
            <FormikField
              marker
              name='graudated2'
              label='Graduated2'
              component={Checkbox}
              formik={formik}
            />
          </div>
          <div className='flex gap-4'>
            <FormikField
              marker
              name='prefer'
              id='frontend'
              value='frontend'
              label='Front-end'
              component={Radio}
              formik={formik}
            />
            <FormikField
              marker
              name='prefer'
              id='backend'
              value='backend'
              label='Back-end'
              component={Radio}
              formik={formik}
            />
          </div>

          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        </section>

        <section className='flex flex-col gap-4'>
          <h1 className='text-2xl'>Checkbox</h1>
          <Checkbox name='checkbox' label='Checkbox' />
        </section>

        {/* <section className='flex flex-col gap-4'>
          <h1 className='text-2xl'>Switch</h1>
          <Switch label='Switch' />
        </section> */}

        <section className='flex flex-col gap-4'>
          <h1 className='text-2xl'>Radio</h1>

          <Radio name='radio' label='Radio 1' />
          <Radio name='radio' defaultChecked label='Radio 2' />
        </section>

        <section className='flex flex-col gap-4 mt-6'>
          <h1 className='text-2xl'>Select</h1>
          <Select
            onChange={(e) => console.log(e)}
            options={Array.from({ length: 5 }).map((_, index) => ({
              value: index,
              label: `Option ${index}`
            }))}
          ></Select>
          <h1 className='text-2xl'>Select with placeholder</h1>
          <Select
            onChange={(e) => console.log(e)}
            options={Array.from({ length: 5 }).map((_, index) => ({
              value: index,
              label: `Option ${index}`
            }))}
            placeholder='Selecione'
          ></Select>
          <h1 className='text-2xl'>Select multiple</h1>
          <Select
            onChange={(e) => console.log(e)}
            // actions
            multiple
            options={Array.from({ length: 5 }).map((_, index) => ({
              value: index,
              label: `Option ${index}`
            }))}
          ></Select>
          <h1 className='text-2xl'>Select multiple with placeholder</h1>
          <Select
            onChange={(e) => console.log(e)}
            // actions
            multiple
            options={Array.from({ length: 5 }).map((_, index) => ({
              value: index,
              label: `Option ${index}`
            }))}
            placeholder='Selecione'
          ></Select>
          <h1 className='text-2xl'>Select multiple with actions</h1>
          <Select
            onChange={(e) => console.log(e)}
            actions
            multiple
            options={Array.from({ length: 5 }).map((_, index) => ({
              value: index,
              label: `Option ${index}`
            }))}
            placeholder='Selecione'
          ></Select>
          <h1 className='text-2xl'>Select multiple with actions and search</h1>
          <Select
            onChange={(e) => console.log(e)}
            multiple
            actions
            search
            options={numbersText.map((numberText) => ({
              value: numberText,
              label: numberText
            }))}
            placeholder='Selecione'
          ></Select>
          <h1 className='text-2xl'>
            Select multiple with actions, search and marker
          </h1>
          <Select
            onChange={(e) => console.log(e)}
            multiple
            actions
            search
            marker
            options={numbersText.map((numberText) => ({
              value: numberText,
              label: numberText
            }))}
            placeholder='Selecione'
          ></Select>
        </section>
        <section className='flex flex-col items-start gap-4'>
          <h1 className='text-2xl'>Modal</h1>
          <Button onClick={() => setModalOpen((state) => !state)}>
            Open modal
          </Button>
          <Modal open={modalOpen} onDismiss={() => setModalOpen(false)}>
            Conteúdo do modal
          </Modal>
          <Button onClick={() => createModalWithModalService()}>
            Create modal with modal service
          </Button>
          {modalControllers.map((controller) => (
            <div key={controller.id} className='flex gap-4'>
              <Button onClick={controller.present}>
                Open modal {controller.id.replace(/\D+/g, '')}
              </Button>
              <Button onClick={controller.destroy}>
                Destroy modal {controller.id.replace(/\D+/g, '')}
              </Button>
            </div>
          ))}
        </section>
      </Container>
    </Page>
  );
}
