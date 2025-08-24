import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer">
        Email
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href="https://upwork.com" target="_blank" rel="noopener noreferrer">
        Upwork
      </a>
      <a href="https://behance.net" target="_blank" rel="noopener noreferrer">
        Behance
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
    </footer>
  );
}
