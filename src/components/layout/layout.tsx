import Header from './header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
      <Header />
      {children}
    </div>
  );
}
