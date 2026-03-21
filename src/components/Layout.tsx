import '@/styles/Layout.css';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <Sidebar />
      </aside>
      <div className="layout__content">
        <Header />
        <main className="layout__main">{children}</main>
      </div>
    </div>
  );
}
