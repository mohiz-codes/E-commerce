import { Link } from "react-router-dom";
import style1 from "../assets/st1.png";
import style2 from "../assets/st2.png";
import style3 from "../assets/st3.png";
import style4 from "../assets/st4.png";

const styles = [
  { name: "Casual", image: style1 },
  { name: "Formal", image: style2 },
  { name: "Party", image: style3 },
  { name: "Gym", image: style4 }
];

function BrowseByStyle() {
  return (
    <section className="mx-auto flex max-w-[1240px] flex-col items-center gap-[64px] rounded-[40px] bg-[#F0F0F0] py-[70px]">
      <h2 className="integral-font text-5xl font-bold leading-[1] tracking-0">BROWSE BY DRESS STYLE</h2>

      <div className="flex flex-wrap justify-center gap-[20px]">
        {styles.map((style) => (
          <Link
            key={style.name}
            to={`/productType?dressStyle=${encodeURIComponent(style.name)}`}
            className="group block overflow-hidden focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
            aria-label={`Shop ${style.name} clothing`}
          >
            <img src={style.image} alt={`${style.name} style`} className="transition duration-300 group-hover:scale-105" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BrowseByStyle;
