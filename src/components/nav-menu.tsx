'use client';

import { type ComponentPropsWithRef, useState } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/utils/cn';

import { Link } from './link';

interface Props {
  menu: {
    title: string;
    layout?: string;
    href?: string;
    sections?: {
      title: string;
      href: string;
      description: string;
    }[];
  }[];
}

export function NavMenu({ menu }: Props) {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <NavigationMenu value={value} onValueChange={setValue}>
      <NavigationMenuList>
        {menu.map((item) => {
          const title = item.title.toLowerCase();
          return (
            <NavigationMenuItem value={title} key={title}>
              {!item.sections ? (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={item.href ?? ''} target='_blank'>
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTriggerWithFixedUX
                    onKeyboardOpen={() => setValue((value) => (value === title ? undefined : title))}
                  >
                    {item.title}
                  </NavigationMenuTriggerWithFixedUX>
                  <NavigationMenuContent>
                    {item.layout === 'side' ? (
                      <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                        <li className='row-span-3'>
                          <NavigationMenuLink asChild>
                            <Link
                              className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                              href={item.sections[0].href}
                            >
                              <div className='mb-2 mt-4 text-lg font-medium'>{item.sections[0].title}</div>
                              <p className='leading-tight text-muted-foreground'>{item.sections[0].description}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {item.sections.slice(1).map((section) => (
                          <ListItem key={section.title} href={section.href} title={section.title}>
                            {section.description}
                          </ListItem>
                        ))}
                      </ul>
                    ) : item.layout === 'column' ? (
                      <ul className='grid gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[500px] xl:w-[600px]'>
                        {item.sections.map((section) => (
                          <ListItem key={section.title} title={section.title} href={section.href} target='_blank'>
                            {section.description}
                          </ListItem>
                        ))}
                      </ul>
                    ) : (
                      <ul className='grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[600px]'>
                        {item.sections.map((section) => (
                          <ListItem key={section.title} title={section.title} href={section.href} target='_blank'>
                            {section.description}
                          </ListItem>
                        ))}
                      </ul>
                    )}
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = ({ className, title, children, href, ref, ...props }: ComponentPropsWithRef<'a'>) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
          href={href ?? '#'}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

const NavigationMenuTriggerWithFixedUX = ({
  onKeyboardOpen,
  ...props
}: React.ComponentProps<typeof NavigationMenuTrigger> & {
  onKeyboardOpen?: (e: KeyboardEvent | PointerEvent) => void;
}) => {
  return (
    <NavigationMenuTrigger
      {...props}
      onClick={(e) => {
        // the menu should open on click on touch screens
        // in some browsers onClick can be triggered by PointerEvent
        if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType !== 'mouse') {
          return;
        }
        // prevent the default behavior for mouse users
        e.preventDefault();
      }}
      // the menu should open on click on touch screens
      onPointerDown={(e) => onKeyboardOpen?.(e)}
      onKeyDown={(e) => {
        // reimplement the default behavior for keyboard users
        if (e.key === 'Enter' || e.key === ' ') {
          return onKeyboardOpen?.(e);
        }
      }}
    />
  );
};
