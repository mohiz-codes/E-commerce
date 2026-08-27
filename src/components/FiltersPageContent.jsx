import { FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { Filter } from "../assets/SVGs";
import PriceSlider from "./Slider";
import Clothitem from "./ClothItems";
import { useEffect, useState } from "react";
import { getProducts } from "../lib/api.js";

function Filters({ initialFilters = {} }) {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const query = new URLSearchParams({ sort, ...filters });
    getProducts(`?${query}`)
      .then((data) => setProducts(data.products))
      .catch(() => setProducts([]));
  }, [sort, filters]);

  const colours = [
    "#00C12B",
    "#F50606",
    "#F5DD06",
    "#06CAF5",
    "#063AF5",
    "#7D06F5",
    "#F506A4",
    "white",
    "black",
  ];

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Length",
    "4X-Length",
  ];

  const clothType = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

  const DressStyle = ["Casual", "Formal", "Party", "Gym"];
  return (

      <section className="max-w-[1240px] w-full flex mx-auto gap-4 pb-[80px]">
        {/*this is the main Filter div*/}
        <div className="max-w-[295px] border-1 rounded-[20px] border-[#0000001A] gap-6 w-full px-[24px] py-[32px]  items-center flex flex-col">
          {/*this is the first div*/}
          <div className="w-full flex justify-between">
            <span className="font-bold text-[20px] leading-[1] tracking-0">
              Filters
            </span>
            <Filter />
          </div>
          {/*this is the cloths type shirt,pant etc div*/}
          <div className="w-full flex flex-col gap-4">
            {clothType.map((type) => (
              <div key={type} className=" flex justify-between">
                <span onClick={() => setFilters({ ...filters, clothingType: type })} className="text-[#00000099] cursor-pointer">
                  {type}
                </span>
                <FaChevronRight className="text-[#00000099]" />
              </div>
            ))}

            <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9] " />
          </div>
          {/*this is the price range div*/}
          <div className="w-full flex flex-col gap-5">
            <div className="flex w-full justify-between">
              <span className="text-[20px] font-bold leading-[1] tracking-0">
                Price
              </span>
              <FaChevronUp />
            </div>
            <PriceSlider onChange={([minPrice, maxPrice]) => setFilters({ ...filters, minPrice, maxPrice })} />
          </div>
          <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9] " />

          {/*this is the colours div*/}
          <div className="flex flex-col w-full gap-4">
            <div className="flex w-full justify-between">
              <span className="font-[700] text-[20px] leading-[1] tracking-0">
                Colours
              </span>
              <FaChevronUp />
            </div>

            {/*this is the first row of colours div*/}
            <div className="flex flex-wrap gap-3 w-full">
              {colours.map((colour, index) => (
                <div
                  key={index}
                  onClick={() => setFilters({ ...filters, color: colour })}
                  style={{ backgroundColor: colour }}
                  className="w-[37px] h-[37px] border-1 border-[#00000033] rounded-[50%] bg-[#00C12B] cursor-pointer"
                ></div>
              ))}
              </div>
              


              <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9] " />
              {/*this is the size div*/}
              <div className="flex flex-col w-full gap-4">
                <div className="flex w-full justify-between">
                  <span className="font-[700] text-[20px] leading-[1] tracking-0">
                    Size
                  </span>
                  <FaChevronUp />
                </div>

                {/*this is the sizes available div*/}

                <div className="flex flex-wrap w-full gap-2 text-[14px] ">
                  {sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setFilters({ ...filters, size })}
                      className="px-[20px] py-[10px] bg-[#F0F0F0] text-[#00000099] rounded-[62px] "
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9] " />
              {/*this is the dressing style div*/}
              <div className="flex flex-col w-full gap-4">
                <div className="flex w-full justify-between">
                  <span className="font-[700] text-[20px] leading-[1] tracking-0">
                    Dress Style
                  </span>
                  <FaChevronUp />
                </div>

                <div className="w-full flex flex-col gap-4">
                  {DressStyle.map((style) => (
                    <div key={style} onClick={() => setFilters({ ...filters, dressStyle: style })} className="flex justify-between cursor-pointer">
                      <span className="text-[#00000099]">{style}</span>
                      <FaChevronRight className="text-[#00000099]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        

        {/*this is the right  div*/}
        
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between ">
            <span className="font-bold text-[32px] font-[700] leading-1 tracking-0">
              {filters.sale === "true" ? "On Sale" : filters.section === "new-arrivals" ? "New Arrivals" : "Shop"}
            </span>

            <div className="flex gap-4">
              <div>
                <span className="font-[400] text-[#00000099]">
                  Showing {products.length} Products
                </span>
              </div>
              <div>
                <span className="font-[400] text-[#00000099]">Sort by:</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          {/*this is the product div*/}
          <div className="flex ">
            <Clothitem products={products} />
          </div>
          
          <hr className="max-w-[1240px] mx-auto w-full border-t border-[#D9D9D9] py-5 " />
          <div className="flex w-full justify-between relative px-[14px] py-[8px]">
            <div className="flex items-center w-[110px]">
              <FaChevronLeft className="absolute  left-[-8px]" />
              <button className="">Previous</button>
            </div>
            <div>
              <button className="rounded-[8px] p-[12px]">1</button>
              <button className="rounded-[8px] p-[12px]">2</button>
              <button className="rounded-[8px] p-[12px]">3</button>
              <button className="rounded-[8px] p-[12px]">...</button>
              <button className="rounded-[8px] p-[12px]">8</button>
              <button className="rounded-[8px] p-[12px]">9</button>
              <button className="rounded-[8px] p-[12px]">10</button>
            </div>

            <div className="flex items-center w-[86px]">
              <FaChevronRight className="absolute  right-[15px]" />
              <button className="">Next</button>
            </div>
          </div>
        </div>
      </section>
   
  );
}

export default Filters;
