"use client";
import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";
import { TodoProvider } from "./TodoProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TodoProvider>
        {children}
        <Toaster />
      </TodoProvider>
    </ThemeProvider>
  );
};

export default Providers;
