import { Link } from "react-router-dom"
import style1 from "../assets/st1.png"
import style2 from "../assets/st2.png"
import style3 from "../assets/st3.png"
import style4 from "../assets/st4.png"



function BrowseByaStyle() {
    

    return(
       
        
    <div className="max-w-[1240px] mx-auto rounded-[40px] flex flex-col items-center gap-[64px] bg-[#F0F0F0] py-[70px]">
    
    <h1 className="integral-font font-bold text-5xl leading-[1] tracking-0 ">BROWSE BY DRESS STYLE</h1>
    <div className="flex flex-wrap justify-center gap-[20px] ">
        
    <Link to="/productType" > <img src={style1} alt="img"/> </Link>
        <img src={style2} alt="img" />
        <img src={style3} alt="img" />
        <img src={style4} alt="img" />
    </div>
    </div>
    )

}

export default BrowseByaStyle