import style from "./AboutUs.module.scss";

export default function AboutUs() {
  return (
    <div>
      <div>
        <h1>Labels</h1>
      </div>

      <div className={style.artistsSection}>
        <h1>Artists</h1>

        <div className={style.artistsList}>
          {/* {artistsList.map((artist) => (
            <span key={artist} className={style.artistName}>
              {artist}
            </span>
          ))} */}
        </div>
      </div>

      <div>
        <h1>Services</h1>
      </div>
    </div>
  );
}
