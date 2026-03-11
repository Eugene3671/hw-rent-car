import { ReactNode } from "react";
import styles from "./page.module.css";
import Header from "@/compotents/Header/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
}
