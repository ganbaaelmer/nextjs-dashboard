//React's "use client" directive to the top of the file, then import usePathname() from next/navigation
"use client"; 

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

//Component to link between pages in your application. <Link> allows you to do client-side navigation with JavaScript.
import Link from 'next/link';

//A common UI pattern is to show an active link to indicate to the user what page they are currently on. To do this, 
//you need to get the user's current path from the URL. Next.js provides a hook called usePathname() that you can use to check the path and implement this pattern.
import { usePathname } from 'next/navigation';

//You can use the clsx library introduced in the chapter on CSS styling to conditionally apply class names when the link is active.
// the link should be displayed with blue text and a light blue background.
import clsx from 'clsx';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  //show an active link to indicate to the user what page they are currently on. assign the path to a variable called pathname
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
            >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
