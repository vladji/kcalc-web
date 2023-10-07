import { FC, ReactNode } from "react";
import { Header } from "../Header";

interface LayoutProps {
  children: ReactNode;
  headerText?: string;
}

export const Layout: FC<LayoutProps> = ({ children, headerText = "kCalc" }) => {
  return (
    <>
      <Header text={headerText} />
      {children}
    </>
  );
};
