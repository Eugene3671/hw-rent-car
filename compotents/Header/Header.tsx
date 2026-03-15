import Link from "next/link";
import css from "./Header.module.css";
import Icon from "../ui/Icon/Icon";
export default function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Link href={"/"}>
          <Icon width={"104"} height={"16"} name="logo" />
        </Link>
        <nav>
          <ul className={css.navList}>
            <li>
              {" "}
              <Link href={"/"} className={css.navItem}>
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link href={"/catalog"} className={css.navItem}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
