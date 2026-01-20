import { renderCards, renderAccordion, createTourCard, createHotelCard, createBlogPostCard } from './components.js';
import { setupMobileMenuToggle, setupHeroSlider, setupSearchTabs, setupTourSearch, setupSubscriptionForm, setupAccordion, setFooterYear, setTourData } from './handlers.js';
const fetchData = async (file) => {
    try {
        const response = await fetch(`./data/${file}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error(`Could not fetch data from ${file}.json:`, error);
        return [];
    }
};
const initializeApp = async () => {
    const [tours, hotels, blogs, faq] = await Promise.all([
        fetchData('tours'),
        fetchData('hotels'),
        fetchData('blogs'),
        fetchData('faq')
    ]);
    setTourData(tours);
    renderCards(tours.slice(0, 4), 'featured-tours-container', createTourCard);
    renderCards(tours, 'search-results-container', createTourCard);
    renderCards(hotels, 'hotels-container', createHotelCard);
    renderCards(blogs, 'blog-posts-container', createBlogPostCard);
    renderAccordion(faq, 'faq-accordion-container');
    setupMobileMenuToggle();
    setupHeroSlider();
    setupSearchTabs();
    setupTourSearch();
    setupSubscriptionForm();
    setupAccordion();
    setFooterYear();
};
document.addEventListener('DOMContentLoaded', initializeApp);
//# sourceMappingURL=app.js.map