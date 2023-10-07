import { FC, ReactNode } from "react";
import { Header } from "../Header";
import { Loader } from "../UI/Loader";

interface LayoutProps {
  children: ReactNode;
  loading?: boolean;
  headerText?: string;
  linkTo?: string;
  isAdmin?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  children,
  loading = false,
  headerText = "kCalc",
  linkTo,
  isAdmin = false,
}) => {
  return (
    <>
      <Header text={headerText} linkTo={linkTo} isAdmin={isAdmin} />
      {loading && <Loader />}
      {!loading && children}
    </>
  );
};
