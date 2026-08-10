import Header  from '../components/header.jsx'
import Navbar from '../components/navbar.jsx'
import Hero from '../components/hero.jsx'
import NewArrivals from '../components/ClothingSection.jsx'
import { newProducts } from '../lib/Data.js'
import ClothingSection from '../components/ClothingSection.jsx'
import { topProducts } from '../lib/Data.js'
import BrowseByaStyle from '../components/BrowseByStyle.jsx'
import Review from '../components/ReviewCard.jsx'
import ReviewSection from '../components/ReviewsSection.jsx'
import Footer from '../components/footer.jsx'

function Home() {
    return(
        <>
    <Header/>
    <Hero/>
    <ClothingSection title={'New Arrival'} products={newProducts} />
    <ClothingSection title={'TOP SELLING'} products={topProducts} />
    <BrowseByaStyle/>
    <ReviewSection/>
        </>
    )
}
export default Home