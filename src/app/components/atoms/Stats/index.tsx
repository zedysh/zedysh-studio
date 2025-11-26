import style from "./Stats.module.scss";

const stats = [
  { count: "11", label: "Labels" },
  { count: "58", label: "Artists" },
  { count: "126", label: "Projects" },
  { count: "8+", label: "Years" },
];

interface IStat {
  count: string;
  label: string;
}

function Stat({ count, label }: IStat) {
  return (
    <div>
      <div className={style.stat}>
        <h3>{`[ ${count} ]`}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <div className={style.stats}>
      {stats.map((stat, index) => (
        <Stat key={index} count={stat.count} label={stat.label} />
      ))}
    </div>
  );
}
