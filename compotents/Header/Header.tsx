import Link from "next/link";
import css from "./Header.module.css";
export default function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Link href={"/"}>
          <svg width={"104"} height={"16"}>
            <use href="/icons.svg/#icon-logo" />
          </svg>
        </Link>
        <nav>
          <ul className={css.navList}>
            <li>
              {" "}
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              {" "}
              <Link href={"/catalog"}>Catalog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
