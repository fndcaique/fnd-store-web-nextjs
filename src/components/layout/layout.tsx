import ModalServiceWrapper from '../modal/modal-service-wrapper';
import Header from './header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModalServiceWrapper />
      <div className='h-full'>
        <Header />
        {children}
      </div>
    </>
  );
}
