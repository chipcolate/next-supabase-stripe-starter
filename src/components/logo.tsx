import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href='/' className='flex w-fit items-center gap-2'>
      <Image src='/logo.png' width={40} height={40} priority quality={100} alt='Codename logo mark' />
      <span className='font-alt text-xl'>{'<Codename>'}</span>
    </Link>
  );
}
