// js/app.js
import { 
    renderCards, 
    renderAccordion, 
    createTourCard, 
    createHotelCard, 
    createBlogPostCard, 
    createFAQItem,
    createDestinationCard,
    createSkeletonCard,
    createSkeletonBlogCard,
    createSkeletonDestinationCard,
    renderSkeletons
} from './components.js';

import { 
    setupMobileMenuToggle, 
    setupSearchTabs, 
    setupTourSearch, 
    setupHotelSearch, 
    setupBlogSearch,
    setupSubscriptionForm, 
    setupAccordion, 
    setupContactForm,
    setFooterYear,
    setTourData,
    setHotelData,
    setBlogData
} from './handlers.js';

// Import the new Slider class
import { Slider } from './slider.js';

// Import the chatbot functionality
import './chatbot.js';

// --- Global Data Fetcher ---
const fetchData = async (file) => {
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

// --- Dynamic Data Loaders with Loading States ---
const loadBlogPosts = async () => {
    const containerId = 'blog-posts-container';
    renderSkeletons(containerId, createSkeletonBlogCard, 3);
    
    try {
        const blogs = await fetchData('blogs');
        setTimeout(() => {
            renderCards(blogs, containerId, createBlogPostCard);
            // Set global data for blog search
            setBlogData(blogs);
        }, 800); // Simulate network delay for better UX
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById(containerId).innerHTML = '<p class="col-span-full text-center text-xl text-gray-500">Failed to load blog posts. Please try again later.</p>';
    }
};

const loadPackages = async () => {
    const containerId = 'featured-tours-container';
    renderSkeletons(containerId, createSkeletonCard, 4);
    
    try {
        const packages = await fetchData('packages');
        setTimeout(() => {
            // Only first 4 for featured section
            renderCards(packages.slice(0, 4), containerId, createTourCard);
        }, 800); // Simulate network delay for better UX
    } catch (error) {
        console.error('Error loading packages:', error);
        document.getElementById(containerId).innerHTML = '<p class="col-span-full text-center text-xl text-gray-500">Failed to load tour packages. Please try again later.</p>';
    }
};

const loadAllPackages = async () => {
    const containerId = 'search-results-container';
    renderSkeletons(containerId, createSkeletonCard, 8);
    
    try {
        const packages = await fetchData('packages');
        setTimeout(() => {
            renderCards(packages, containerId, createTourCard);
            // Set global data for handlers (like search)
            setTourData(packages);
        }, 800); // Simulate network delay for better UX
    } catch (error) {
        console.error('Error loading all packages:', error);
        document.getElementById(containerId).innerHTML = '<p class="col-span-full text-center text-xl text-gray-500">Failed to load tour packages. Please try again later.</p>';
    }
};

const loadHotels = async () => {
    const containerId = 'hotels-container';
    renderSkeletons(containerId, createSkeletonCard, 4);
    
    try {
        const hotels = await fetchData('hotels');
        setTimeout(() => {
            renderCards(hotels, containerId, createHotelCard);
            // Set global data for hotel search
            setHotelData(hotels);
        }, 800); // Simulate network delay for better UX
    } catch (error) {
        console.error('Error loading hotels:', error);
        document.getElementById(containerId).innerHTML = '<p class="col-span-full text-center text-xl text-gray-500">Failed to load hotels. Please try again later.</p>';
    }
};

const loadDestinations = async () => {
    const containerId = 'destinations-container';
    renderSkeletons(containerId, createSkeletonDestinationCard, 6);
    
    try {
        const destinations = await fetchData('destinations');
        setTimeout(() => {
            renderCards(destinations, containerId, createDestinationCard);
        }, 800); // Simulate network delay for better UX
    } catch (error) {
        console.error('Error loading destinations:', error);
        document.getElementById(containerId).innerHTML = '<p class="col-span-full text-center text-xl text-gray-500">Failed to load destinations. Please try again later.</p>';
    }
};

const loadFAQ = async () => {
    const containerId = 'faq-accordion-container';
    // Show loading state for accordion
    document.getElementById(containerId).innerHTML = '<div class="p-4 text-center text-gray-500">Loading FAQs...</div>';
    
    try {
        const faq = await fetchData('faq');
        setTimeout(() => {
            renderAccordion(faq, containerId, createFAQItem);
        }, 800); // Simulate network delay for better UX
    } catch (error) {
        console.error('Error loading FAQ:', error);
        document.getElementById(containerId).innerHTML = '<p class="p-4 text-center text-xl text-gray-500">Failed to load FAQs. Please try again later.</p>';
    }
};

const loadHeroSlides = async () => {
    try {
        const heroSlides = await fetchData('hero');
        if (document.getElementById('hero-slider')) {
            new Slider({
                element: '#hero-slider',
                data: heroSlides,
                autoPlay: true,
                interval: 5000,
                showDots: true,
                showArrows: true
            });
        }
    } catch (error) {
        console.error('Error loading hero slides:', error);
    }
};

const loadToursSlider = async () => {
    try {
        const tours = await fetchData('packages');
        if (document.getElementById('tours-slider')) {
            new Slider({
                element: '#tours-slider',
                data: tours,
                autoPlay: false,
                interval: 5000,
                showDots: false,
                showArrows: true
            });
        }
    } catch (error) {
        console.error('Error loading tours slider:', error);
    }
};

const loadHotelsSlider = async () => {
    try {
        const hotels = await fetchData('hotels');
        if (document.getElementById('hotels-slider')) {
            new Slider({
                element: '#hotels-slider',
                data: hotels,
                autoPlay: false,
                interval: 5000,
                showDots: false,
                showArrows: true
            });
        }
    } catch (error) {
        console.error('Error loading hotels slider:', error);
    }
};

const loadTestimonialsSlider = async () => {
    try {
        const testimonials = await fetchData('reviews');
        if (document.getElementById('testimonials-slider')) {
            new Slider({
                element: '#testimonials-slider',
                data: testimonials,
                autoPlay: true,
                interval: 5000,
                showDots: true,
                showArrows: false
            });
        }
    } catch (error) {
        console.error('Error loading testimonials slider:', error);
    }
};

// --- Initialization Function ---
const initializeApp = async () => {
    // 1. Load all data with loading states
    await Promise.all([
        loadBlogPosts(),
        loadPackages(),
        loadAllPackages(),
        loadHotels(),
        loadDestinations(),
        loadFAQ(),
        loadHeroSlides(),
        loadToursSlider(),
        loadHotelsSlider(),
        loadTestimonialsSlider()
    ]);

    // 2. Setup Event Handlers
    setupMobileMenuToggle();
    setupSearchTabs();
    setupTourSearch();
    setupHotelSearch();
    setupBlogSearch();
    setupSubscriptionForm();
    setupAccordion();
    setupContactForm();
    setFooterYear();
};

document.addEventListener('DOMContentLoaded', initializeApp);