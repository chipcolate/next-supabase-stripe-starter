import { IoMenu } from 'react-icons/io5';

import { AccountMenu } from '@/components/account-menu';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { env } from '@/env.mjs';
import { getSession } from '@/features/account/controllers/get-session';

import { signOut } from '../app/(auth)/auth-actions';

import { Link } from './link';
import { NavMenu } from './nav-menu';

const menu = [
  {
    title: 'Shop',
    layout: 'side',
    sections: [
      {
        title: 'Magic',
        description: 'Generate endless models based on your input.',
        href: '/magic',
      },
      {
        title: 'Market',
        description: 'All ready-to-print products in our store are listed here.',
        href: '/market',
      },
      {
        title: 'Custom',
        description: 'Customizabile pre-defined models.',
        href: '/custom',
      },
      {
        title: 'Pro',
        description: 'Discover our pro services.',
        href: '/pro',
      },
    ],
  },
  {
    title: 'About',
    layout: 'row',
    sections: [
      {
        title: 'Features',
        href: '/features',
        description: 'A list of all the features of Your Next Store.',
      },
      {
        title: 'Where to buy',
        href: env.NEXT_PUBLIC_URL,
        description: 'Join our community and get the latest news about our products.',
      },
    ],
  },
  {
    title: 'Documentation',
    href: '/docs',
  },
];

export default async function Nav() {
  const session = await getSession();

  return (
    <header className='flex items-center justify-between py-8'>
      <div className='flex gap-4'>
        <Logo />
        <div className='sm:mr-auto'>
          <NavMenu menu={menu} />
        </div>
      </div>

      {/* <div className='flex items-center justify-start gap-x-6'>
        <SearchNav />
        <CartSummaryNav />
      </div> */}

      <div className='relative flex items-center gap-6'>
        {session ? (
          <AccountMenu signOut={signOut} />
        ) : (
          <>
            <Button variant='sexy' className='hidden flex-shrink-0 lg:flex' asChild>
              <Link href='/signup'>Get started for free</Link>
            </Button>
            <Sheet>
              <SheetTrigger className='block lg:hidden'>
                <IoMenu size={28} />
              </SheetTrigger>
              <SheetContent className='w-full bg-black'>
                <SheetHeader>
                  <Logo />
                  <SheetDescription className='py-8'>
                    <Button variant='sexy' className='flex-shrink-0' asChild>
                      <Link href='/signup'>Get started for free</Link>
                    </Button>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>
    </header>
  );
}
