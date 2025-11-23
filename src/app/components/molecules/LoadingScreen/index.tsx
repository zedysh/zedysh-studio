import style from "./LoadingScreen.module.scss";

const LoadingScreen = () => (
  <div className={style.container}>
    <div className={style.loader}></div>
  </div>
);

export default LoadingScreen;
