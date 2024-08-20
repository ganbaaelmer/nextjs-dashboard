//you're importing the <SideNav /> component into your layout. Any components you import into this file will be part of the layout.
import SideNav from '@/app/ui/dashboard/sidenav';

//Implementing Partial Prerendering
export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}