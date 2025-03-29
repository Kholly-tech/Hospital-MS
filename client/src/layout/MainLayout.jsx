// layouts/MainLayout.jsx
import React from 'react';
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/ui/app-sidebar";

export function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 min-w-[1000px]">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}