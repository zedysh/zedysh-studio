import styles from "./page.module.scss";
import Logo from "./components/atoms/Logo";
import Footer from "./components/organisms/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Logo />

        <ul>
          <li>Services</li>
          <li>
            Projects with videos and logos
            <ul>
              <li>blender screenshots</li>
              <li>analytics</li>
            </ul>
          </li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}
