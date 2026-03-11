import Button from "../ui/Button/Button";
import css from "./Home.module.css";
export default function HomePage() {
  return (
    <section className={css.home}>
      <div className={`container ${css.homeContainer}`}>
        <picture className={css.bgPicture}>
          <img
            src="/img/bg-home.jpg"
            srcSet="/img/bg-home.jpg 1x, /img/bg-home@2x.jpg 2x"
            alt="car in track"
            className={css.bgImage}
          />
        </picture>
        <div className={css.content}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.description}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Button href="/catalog" className={css.button}>
            View Catalog
          </Button>
        </div>
      </div>
    </section>
  );
}
