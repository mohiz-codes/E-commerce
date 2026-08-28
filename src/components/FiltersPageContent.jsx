import { FaChevronLeft, FaChevronRight, FaSlidersH } from "react-icons/fa";
import { useEffect, useState } from "react";
import ClothItems from "./ClothItems";
import { getProducts } from "../lib/api.js";

const COLORS = ["Black", "White", "Blue", "Green", "Red", "Navy"];
const SIZES = ["Small", "Medium", "Large", "X-Large", "30", "32", "34", "36"];
const CLOTHING_TYPES = ["T-shirts", "Shirts", "Hoodie", "Jeans", "Shorts"];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];
const PAGE_SIZE = 8;

function Filters({ initialFilters = {}, title = "Shop" }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = new URLSearchParams({ sort, page: String(page), limit: String(PAGE_SIZE) });
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value != null) query.set(key, String(value));
    });

    setLoading(true);
    setError("");
    getProducts(`?${query}`)
      .then((data) => {
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setPages(data.pages || 0);
      })
      .catch(() => {
        setProducts([]);
        setTotal(0);
        setPages(0);
        setError("We couldn't load the catalogue. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [filters, page, sort]);

  function updateFilter(key, value) {
    setPage(1);
    setFilters((current) => ({ ...current, [key]: current[key] === value ? "" : value }));
  }

  function clearFilters() {
    setPage(1);
    setFilters({});
  }

  const hasFilters = Object.values(filters).some(Boolean);
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1).filter((number) => number === 1 || number === pages || Math.abs(number - page) <= 1);

  return (
    <section className="mx-auto flex w-full max-w-[1240px] gap-7 px-4 pb-20 md:px-0">
      <aside className="hidden h-fit w-[270px] shrink-0 rounded-[20px] border border-[#0000001A] p-6 lg:block">
        <div className="flex items-center justify-between border-b border-[#0000001A] pb-5">
          <span className="text-xl font-bold">Filters</span>
          <FaSlidersH className="text-[#00000080]" />
        </div>
        <FilterGroup title="Clothing type">
          {CLOTHING_TYPES.map((type) => <FilterOption key={type} active={filters.clothingType === type} onClick={() => updateFilter("clothingType", type)}>{type}</FilterOption>)}
        </FilterGroup>
        <FilterGroup title="Dress style">
          {DRESS_STYLES.map((style) => <FilterOption key={style} active={filters.dressStyle === style} onClick={() => updateFilter("dressStyle", style)}>{style}</FilterOption>)}
        </FilterGroup>
        <FilterGroup title="Colour">
          <div className="flex flex-wrap gap-2.5">
            {COLORS.map((color) => <button key={color} type="button" onClick={() => updateFilter("color", color)} aria-label={`Filter by ${color}`} className={`h-8 w-8 rounded-full border-2 ${filters.color === color ? "border-black ring-2 ring-black ring-offset-2" : "border-[#00000020]"}`} style={{ backgroundColor: color.toLowerCase() }} />)}
          </div>
        </FilterGroup>
        <FilterGroup title="Size">
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => <button key={size} type="button" onClick={() => updateFilter("size", size)} className={`rounded-full px-3 py-2 text-xs font-medium transition-colors ${filters.size === size ? "bg-black text-white" : "bg-[#F0F0F0] text-[#00000099] hover:bg-[#E3E3E3]"}`}>{size}</button>)}
          </div>
        </FilterGroup>
        {hasFilters && <button type="button" onClick={clearFilters} className="mt-6 w-full rounded-full border border-black py-3 text-sm font-semibold transition-colors hover:bg-black hover:text-white">Clear filters</button>}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-7 flex flex-col gap-4 border-b border-[#0000001A] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00000080]">Collection</p>
            <h1 className="mt-1 text-3xl font-bold sm:text-[32px]">{title}</h1>
            <p className="mt-1 text-sm text-[#00000099]">{loading ? "Finding the best pieces..." : `${total} ${total === 1 ? "product" : "products"} found`}</p>
          </div>
          <label className="flex items-center gap-2 text-sm text-[#00000099]">Sort by
            <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} className="rounded-lg border border-[#0000001A] bg-white px-3 py-2 font-medium text-black outline-none focus:border-black">
              <option value="newest">Newest</option>
              <option value="rating">Highest rated</option>
              <option value="priceAsc">Price: low to high</option>
              <option value="priceDesc">Price: high to low</option>
            </select>
          </label>
        </div>

        {hasFilters && <div className="mb-5 flex flex-wrap items-center gap-2 text-sm"><span className="text-[#00000099]">Active:</span>{Object.entries(filters).filter(([, value]) => value).map(([key, value]) => <button key={key} type="button" onClick={() => updateFilter(key, value)} className="rounded-full bg-[#F0F0F0] px-3 py-1.5 font-medium hover:bg-[#E3E3E3]">{value} ×</button>)}</div>}
        {error && <p className="rounded-2xl bg-red-50 p-5 text-sm text-red-700">{error}</p>}
        {loading && <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="animate-pulse"><div className="aspect-square rounded-[20px] bg-[#F0F0F0]" /><div className="mt-4 h-5 w-3/4 rounded bg-[#F0F0F0]" /><div className="mt-3 h-4 w-1/2 rounded bg-[#F0F0F0]" /></div>)}</div>}
        {!loading && !error && products.length > 0 && <ClothItems products={products} />}
        {!loading && !error && products.length === 0 && <div className="rounded-[24px] border border-dashed border-[#00000033] px-6 py-16 text-center"><h2 className="text-xl font-bold">No pieces match these filters</h2><p className="mt-2 text-sm text-[#00000099]">Try another style, size, or colour.</p><button type="button" onClick={clearFilters} className="mt-5 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">Clear filters</button></div>}

        {pages > 1 && <nav className="mt-10 flex items-center justify-between border-t border-[#0000001A] pt-5" aria-label="Catalogue pages"><button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="flex items-center gap-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-35"><FaChevronLeft /> Previous</button><div className="flex gap-1">{pageNumbers.map((number, index) => <span key={number} className="flex items-center">{index > 0 && number - pageNumbers[index - 1] > 1 && <span className="px-1 text-[#00000080]">…</span>}<button type="button" onClick={() => setPage(number)} aria-current={number === page ? "page" : undefined} className={`h-9 min-w-9 rounded-lg px-2 text-sm font-semibold ${number === page ? "bg-black text-white" : "hover:bg-[#F0F0F0]"}`}>{number}</button></span>)}</div><button type="button" disabled={page === pages} onClick={() => setPage((current) => current + 1)} className="flex items-center gap-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-35">Next <FaChevronRight /></button></nav>}
      </div>
    </section>
  );
}

function FilterGroup({ title, children }) {
  return <div className="border-b border-[#0000001A] py-5 last:border-0"><h2 className="mb-4 font-bold">{title}</h2><div className="flex flex-col gap-2">{children}</div></div>;
}

function FilterOption({ active, onClick, children }) {
  return <button type="button" onClick={onClick} className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${active ? "bg-black font-semibold text-white" : "text-[#00000099] hover:bg-[#F0F0F0]"}`}>{children}<FaChevronRight className="text-xs" /></button>;
}

export default Filters;
