// js/app.ts
import { 
    renderCards, 
    renderAccordion, 
    createTourCard, 
    createHotelCard, 
    createBlogPostCard, 
    createFAQItem
} from './components.js';

import { 
    setupMobileMenuToggle, 
    setupHeroSlider, 
    setupSearchTabs, 
    setupTourSearch, 
    setupSubscriptionForm, 
    setupAccordion, 
    setFooterYear,
    setTourData
} from './handlers.js';

import { Tour, Hotel, Blog, FAQ } from './types';

// --- Global Data Fetcher ---
const fetchData = async (file: string): Promise<any[]> => {
    try {
        const response = await fetch(`./data/${file}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Could not fetch data from ${file}.json:`, error);
        return [];
    }
};

// --- Initialization Function ---
const initializeApp = async () => {
    // 1. Fetch all data
    const [tours, hotels, blogs, faq] = await Promise.all([
        fetchData('tours') as Promise<Tour[]>,
        fetchData('hotels') as Promise<Hotel[]>,
        fetchData('blogs') as Promise<Blog[]>,
        fetchData('faq') as Promise<FAQ[]>
    ]);

    // 2. Set global data for handlers (like search)
    setTourData(tours);

    // 3. Render Initial Content
    // Only first 4 for featured section
    renderCards(tours.slice(0, 4), 'featured-tours-container', createTourCard); 
    // All for the dynamic search section
    renderCards(tours, 'search-results-container', createTourCard); 
    renderCards(hotels, 'hotels-container', createHotelCard);
    renderCards(blogs, 'blog-posts-container', createBlogPostCard);
    renderAccordion(faq, 'faq-accordion-container');


    // 4. Setup Event Handlers
    setupMobileMenuToggle();
    setupHeroSlider();
    setupSearchTabs();
    setupTourSearch();
    setupSubscriptionForm();
    setupAccordion();
    setFooterYear();
};

document.addEventListener('DOMContentLoaded', initializeApp);