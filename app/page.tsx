import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
export default function Home() {
  return (
    <div className='flex flex-col gap-4'>
      <h1>Dashboard</h1>
      <Button className='w-fit'>Hola</Button>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}
