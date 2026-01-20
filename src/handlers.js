// js/handlers.js
import { renderCards, createTourCard, createHotelCard, createBlogPostCard } from './components.js';

// Data placeholders that will be filled by app.js
let ALL_TOURS = [];
let ALL_HOTELS = [];
let ALL_BLOGS = [];

// Helper function to set tour data from app.js
export const setTourData = (data) => {
    ALL_TOURS = data;
};

// Helper function to set hotel data from app.js
export const setHotelData = (data) => {
    ALL_HOTELS = data;
};

// Helper function to set blog data from app.js
export const setBlogData = (data) => {
    ALL_BLOGS = data;
};

// Debounce function for performance optimization
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Text highlighting function
const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
};

// --- 4.1. Mobile Menu Toggle ---
export const setupMobileMenuToggle = () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars w-6 h-6';
            } else {
                icon.className = 'fas fa-times w-6 h-6';
            }
        });
    }
};

// --- 4.3. Hero Tabs and Search Form Logic ---
export const setupSearchTabs = () => {
    const tabsContainer = document.getElementById('search-tabs');
    const formContainer = document.getElementById('search-form-container');
    const tabs = ['Tours', 'Hotels', 'Flights'];
    let activeTab = 'Tours';

    if (!tabsContainer || !formContainer) return;

    const getSearchFormHTML = (type) => {
        let fields = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Destination" required class="p-3 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
                <input type="date" required class="p-3 border rounded-lg text-gray-400 focus:ring-yellow-500 focus:border-yellow-500" />
        `;
        if (type === 'Hotels') {
            fields += `<input type="number" placeholder="Guests" min="1" class="p-3 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />`;
        } else if (type === 'Flights') {
            fields += `<input type="text" placeholder="Return Destination" class="p-3 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />`;
        }
        fields += `</div>`;

        return `
            <form class="space-y-4">
                <h4 class="text-2xl font-bold text-gray-900 mb-4">Find your best ${type}</h4>
                ${fields}
                <button type="submit" class="w-full justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">Search ${type}</button>
            </form>
        `;
    };

    const renderTabs = () => {
        tabsContainer.innerHTML = tabs.map(tab => `
            <button class="tab-button px-6 py-2 font-semibold transition duration-300 ${activeTab === tab ? 'bg-yellow-500 text-gray-900 rounded-t-lg shadow-inner' : 'bg-gray-700 text-white opacity-80 hover:bg-gray-600 rounded-t-lg'}"
                    data-tab="${tab}">
                ${tab}
            </button>
        `).join('');

        formContainer.classList.add('bg-white'); // Ensure form background is white
        formContainer.innerHTML = getSearchFormHTML(activeTab);

        tabsContainer.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                activeTab = e.target.dataset.tab;
                renderTabs();
            });
        });
    };

    renderTabs();
};

// --- 4.4. Search Functionality (Tour Filtering) ---
export const setupTourSearch = () => {
    const searchInput = document.getElementById('tour-search-input');
    const resultsContainer = document.getElementById('search-results-container');
    
    if (!searchInput || !resultsContainer) return;

    const filterTours = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        const filtered = ALL_TOURS.filter(tour =>
            tour.name.toLowerCase().includes(term) ||
            (tour.description && tour.description.toLowerCase().includes(term)) ||
            tour.duration.toLowerCase().includes(term)
        );
        
        if (filtered.length > 0) {
            resultsContainer.innerHTML = filtered.map(createTourCard).join('');
        } else {
            resultsContainer.innerHTML = `<p class="col-span-full text-center text-xl text-gray-500 py-8">No tours found matching "${searchTerm}".</p>`;
        }
    };

    // Debounced search
    const debouncedSearch = debounce((searchTerm) => {
        filterTours(searchTerm);
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
};

// --- 4.5. Subscribe Form Validation ---
export const setupSubscriptionForm = () => {
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('subscribe-email');
    const messageDiv = document.getElementById('subscribe-message');

    if (!form) return;

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        messageDiv.classList.add('hidden');
        messageDiv.textContent = '';
        
        if (!email) {
            messageDiv.classList.remove('hidden');
            messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
            messageDiv.innerHTML = 'Error: Email is required.';
            return;
        }

        if (!isValidEmail(email)) {
            messageDiv.classList.remove('hidden');
            messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
            messageDiv.innerHTML = 'Error: Please enter a valid email address.';
            return;
        }

        // Simulate API submission delay
        setTimeout(() => {
            messageDiv.classList.remove('hidden');
            messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-green-100 text-green-700';
            messageDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Thank you for subscribing! Check your inbox.';
            emailInput.value = ''; // Clear input on success
            
            // Store in localStorage
            const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            subscribers.push({
                email: email,
                subscribedAt: new Date().toISOString()
            });
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
        }, 1000);
    });
};

// --- 4.6. Enhanced Accordion Functionality ---
export const setupAccordion = () => {
    const faqContainer = document.getElementById('faq-accordion-container');

    if (!faqContainer) return;

    faqContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const content = header.nextElementSibling;
        const icon = header.querySelector('i');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        // Close all others (only one item open at a time)
        faqContainer.querySelectorAll('.accordion-header').forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.setAttribute('aria-expanded', 'false');
                otherHeader.nextElementSibling.classList.remove('open');
                otherHeader.querySelector('i').style.transform = 'rotate(0deg)';
            }
        });

        // Toggle the clicked one
        if (isExpanded) {
            header.setAttribute('aria-expanded', 'false');
            content.classList.remove('open');
            icon.style.transform = 'rotate(0deg)';
        } else {
            header.setAttribute('aria-expanded', 'true');
            content.classList.add('open');
            icon.style.transform = 'rotate(180deg)';
        }
    });
};

// --- 4.7. Footer Year ---
export const setFooterYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
};

// --- 4.8. Contact Form Validation ---
export const setupContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const messageInput = document.getElementById('contact-message');
    const messageDiv = document.getElementById('contact-message-response');

    // Validation functions
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const isValidPhone = (phone) => {
        // Simple phone validation (10-15 digits, allowing spaces, dashes, parentheses)
        return /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(phone);
    };

    const isValidName = (name) => {
        // Name should be at least 2 characters and not exceed 50
        return name.length >= 2 && name.length <= 50;
    };

    const isValidMessage = (message) => {
        // Message should be at least 10 characters and not exceed 500
        return message.length >= 10 && message.length <= 500;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous messages
        if (messageDiv) {
            messageDiv.classList.add('hidden');
            messageDiv.textContent = '';
        }

        // Get values
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Validate required fields
        if (!name) {
            if (messageDiv) {
                messageDiv.classList.remove('hidden');
                messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
                messageDiv.innerHTML = 'Error: Name is required.';
            }
            return;
        }

        if (!isValidName(name)) {
            if (messageDiv) {
                messageDiv.classList.remove('hidden');
                messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
                messageDiv.innerHTML = 'Error: Name must be between 2 and 50 characters.';
            }
            return;
        }

        if (!email) {
            if (messageDiv) {
                messageDiv.classList.remove('hidden');
                messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
                messageDiv.innerHTML = 'Error: Email is required.';
            }
            return;
        }

        if (!isValidEmail(email)) {
            if (messageDiv) {
                messageDiv.classList.remove('hidden');
                messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
                messageDiv.innerHTML = 'Error: Please enter a valid email address.';
            }
            return;
        }

        if (phone && !isValidPhone(phone)) {
            if (messageDiv) {
                messageDiv.classList.remove('hidden');
                messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
                messageDiv.innerHTML = 'Error: Please enter a valid phone number.';
            }
            return;
        }

        if (!message) {
            if (messageDiv) {
                messageDiv.classList.remove('hidden');
                messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
                messageDiv.innerHTML = 'Error: Message is required.';
            }
            return;
        }

        if (!isValidMessage(message)) {
            if (messageDiv) {
                messageDiv.classList.remove('hidden');
                messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-100 text-red-700';
                messageDiv.innerHTML = 'Error: Message must be between 10 and 500 characters.';
            }
            return;
        }

        // If all validations pass, submit the form
        // Store in localStorage
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push({
            name: name,
            email: email,
            phone: phone,
            message: message,
            submittedAt: new Date().toISOString()
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Show success message
        if (messageDiv) {
            messageDiv.classList.remove('hidden');
            messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-green-100 text-green-700';
            messageDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Thank you for your message! We will get back to you soon.';
        }

        // Clear form
        form.reset();
    });
};

// --- 4.9. Hotel Search Functionality ---
export const setupHotelSearch = () => {
    const searchInput = document.getElementById('hotel-search-input');
    const resultsContainer = document.getElementById('hotels-search-results');
    
    if (!searchInput || !resultsContainer) return;

    const filterHotels = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        const filtered = ALL_HOTELS.filter(hotel =>
            hotel.name.toLowerCase().includes(term) ||
            hotel.location.toLowerCase().includes(term)
        );
        
        if (filtered.length > 0) {
            resultsContainer.innerHTML = filtered.map(createHotelCard).join('');
        } else {
            resultsContainer.innerHTML = `<p class="col-span-full text-center text-xl text-gray-500 py-8">No hotels found matching "${searchTerm}".</p>`;
        }
    };

    // Debounced search
    const debouncedSearch = debounce((searchTerm) => {
        filterHotels(searchTerm);
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
};

// --- 4.10. Blog Search Functionality ---
export const setupBlogSearch = () => {
    const searchInput = document.getElementById('blog-search-input');
    const resultsContainer = document.getElementById('blog-search-results');
    
    if (!searchInput || !resultsContainer) return;

    const filterBlogs = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        const filtered = ALL_BLOGS.filter(blog =>
            blog.title.toLowerCase().includes(term) ||
            blog.excerpt.toLowerCase().includes(term) ||
            blog.author.toLowerCase().includes(term)
        );
        
        if (filtered.length > 0) {
            resultsContainer.innerHTML = filtered.map(createBlogPostCard).join('');
        } else {
            resultsContainer.innerHTML = `<p class="col-span-full text-center text-xl text-gray-500 py-8">No blog posts found matching "${searchTerm}".</p>`;
        }
    };

    // Debounced search
    const debouncedSearch = debounce((searchTerm) => {
        filterBlogs(searchTerm);
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
};