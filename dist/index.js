export const createTourCard = (tour) => {
    const starIcons = Array(Math.floor(tour.rating)).fill(0).map(() => `<i class="fas fa-star w-4 h-4"></i>`).join('');
    return `
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
            <img src="${tour.imageUrl}" alt="${tour.name}" class="w-full h-40 object-cover" />
            <div class="p-4">
                <h3 class="text-xl font-bold text-gray-900 mb-1 truncate">${tour.name}</h3>
                <p class="text-sm text-gray-500 mb-2">${tour.duration}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center text-yellow-500">${starIcons}
                        <span class="text-sm font-semibold text-gray-700 ml-1">${tour.rating}</span>
                    </div>
                    <p class="text-2xl font-bold text-yellow-600">$${tour.price}</p>
                </div>
                <button class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-3 rounded-lg transition duration-300 shadow-md w-full mt-4 text-sm">Book Now</button>
            </div>
        </div>
    `;
};
export const createHotelCard = (hotel) => {
    const starIcons = Array(Math.floor(hotel.rating)).fill(0).map(() => `<i class="fas fa-star w-4 h-4"></i>`).join('');
    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src="${hotel.imageUrl}" alt="${hotel.name}" class="w-full h-48 object-cover" />
            <div class="p-4 flex-grow">
                <h4 class="text-xl font-bold text-gray-900 mb-1 truncate">${hotel.name}</h4>
                <p class="text-sm text-gray-500 mb-2 truncate">${hotel.location}</p>
                <div class="flex items-center text-yellow-500 mb-3">
                    ${starIcons}
                    <span class="text-sm font-semibold text-gray-700 ml-2">${hotel.rating.toFixed(1)}</span>
                </div>
            </div>
            <div class="p-4 border-t bg-gray-50">
                <p class="text-xl font-bold text-yellow-600">$${hotel.price.toFixed(0)} <span class="text-sm font-normal text-gray-500">/ night</span></p>
            </div>
        </div>
    `;
};
export const createBlogPostCard = (post) => {
    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <img src="${post.imageUrl}" alt="${post.title}" class="w-full h-48 object-cover" />
            <div class="p-4">
                <h4 class="text-lg font-bold text-gray-900 hover:text-yellow-600 transition truncate">${post.title}</h4>
                <p class="text-sm text-gray-600 mt-2 line-clamp-2">${post.excerpt}</p>
                <div class="flex justify-between items-center text-xs text-gray-400 mt-3 border-t pt-3">
                    <span>By: ${post.author}</span>
                    <span>${post.date}</span>
                </div>
            </div>
        </div>
    `;
};
export const createFAQItem = (item, index) => {
    return `
        <div class="border-b border-gray-200">
            <button class="accordion-header flex justify-between items-center w-full p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
                    aria-expanded="false" aria-controls="accordion-content-${index}">
                <span>${item.title}</span>
                <i class="fas fa-chevron-down w-4 h-4 text-gray-500 transition-transform duration-300"></i>
            </button>
            <div id="accordion-content-${index}" class="accordion-content overflow-hidden">
                <div class="p-4 text-gray-600 bg-gray-50">
                    ${item.content}
                </div>
            </div>
        </div>
    `;
};
export const renderCards = (data, containerId, cardCreationFn) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = data.map(cardCreationFn).join('');
    }
};
export const renderAccordion = (data, containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = data.map(createFAQItem).join('');
    }
};
let ALL_TOURS = [];
export const setTourData = (data) => {
    ALL_TOURS = data;
};
export const setupMobileMenuToggle = () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'fas fa-bars w-6 h-6';
                }
                else {
                    icon.className = 'fas fa-times w-6 h-6';
                }
            }
        });
    }
};
export const setupHeroSlider = () => {
    const slidesData = [
        { title: "Unlock your Wanderlust.", subtitle: "Book Your Next Journey", bg: "url('https://via.placeholder.com/1920x600/0000FF/FFFFFF?text=Tropical+Beach+Hero')" },
        { title: "Discover Hidden Gems.", subtitle: "Adventure Awaits You", bg: "url('https://via.placeholder.com/1920x600/FF5733/FFFFFF?text=Mountain+Adventure+Hero')" },
        { title: "Luxury Stays Made Easy.", subtitle: "Your Dream Vacation Starts Here", bg: "url('https://via.placeholder.com/1920x600/33FF57/FFFFFF?text=City+View+Hero')" },
    ];
    const container = document.getElementById('slides-container');
    const dotsContainer = document.getElementById('slider-dots');
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    let currentIndex = 0;
    let slideInterval = null;
    if (!container)
        return;
    const renderSlides = () => {
        container.innerHTML = slidesData.map((slide, index) => `
            <div class="slide-item absolute inset-0 w-full h-full bg-cover bg-center ${index === currentIndex ? 'opacity-100' : 'opacity-0'}"
                 style="background-image: ${slide.bg};" aria-hidden="${index !== currentIndex}">
                <div class="absolute inset-0 bg-black bg-opacity-40"></div>
                <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div class="text-white z-10 w-full md:w-1/2">
                        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4">${slide.title}</h1>
                        <p class="text-xl sm:text-2xl font-light">${slide.subtitle}</p>
                    </div>
                </div>
            </div>
        `).join('');
        renderDots();
    };
    const renderDots = () => {
        if (!dotsContainer)
            return;
        dotsContainer.innerHTML = slidesData.map((_, index) => `
            <button class="w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-yellow-500 w-6' : 'bg-white opacity-60'}"
                    data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
        `).join('');
        dotsContainer.querySelectorAll('button').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const target = e.target;
                const index = target.dataset.index;
                if (index !== undefined) {
                    moveToSlide(parseInt(index));
                }
                resetAutoSlide();
            });
        });
    };
    const moveToSlide = (index) => {
        currentIndex = index;
        renderSlides();
    };
    const nextSlide = () => {
        let newIndex = (currentIndex + 1) % slidesData.length;
        moveToSlide(newIndex);
    };
    const startAutoSlide = () => {
        slideInterval = setInterval(nextSlide, 5000);
    };
    const resetAutoSlide = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        startAutoSlide();
    };
    if (nextButton) {
        nextButton.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    }
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            let newIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
            moveToSlide(newIndex);
            resetAutoSlide();
        });
    }
    renderSlides();
    startAutoSlide();
};
export const setupSearchTabs = () => {
    const tabsContainer = document.getElementById('search-tabs');
    const formContainer = document.getElementById('search-form-container');
    const tabs = ['Tours', 'Hotels', 'Flights'];
    let activeTab = 'Tours';
    if (!tabsContainer || !formContainer)
        return;
    const getSearchFormHTML = (type) => {
        let fields = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Destination" required class="p-3 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
                <input type="date" required class="p-3 border rounded-lg text-gray-400 focus:ring-yellow-500 focus:border-yellow-500" />
        `;
        if (type === 'Hotels') {
            fields += `<input type="number" placeholder="Guests" min="1" class="p-3 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />`;
        }
        else if (type === 'Flights') {
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
        formContainer.classList.add('bg-white');
        formContainer.innerHTML = getSearchFormHTML(activeTab);
        tabsContainer.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target;
                const tab = target.dataset.tab;
                if (tab) {
                    activeTab = tab;
                }
                renderTabs();
            });
        });
    };
    renderTabs();
};
export const setupTourSearch = () => {
    const searchInput = document.getElementById('tour-search-input');
    const resultsContainer = document.getElementById('search-results-container');
    if (!searchInput || !resultsContainer)
        return;
    const filterTours = (searchTerm) => {
        const term = searchTerm.toLowerCase();
        const filtered = ALL_TOURS.filter(tour => tour.name.toLowerCase().includes(term));
        if (filtered.length > 0) {
            resultsContainer.innerHTML = filtered.map(createTourCard).join('');
        }
        else {
            resultsContainer.innerHTML = `<p class="col-span-full text-center text-xl text-gray-500">No tours found matching "${searchTerm}".</p>`;
        }
    };
    searchInput.addEventListener('input', (e) => {
        const target = e.target;
        filterTours(target.value);
    });
};
export const setupSubscriptionForm = () => {
    const form = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('subscribe-email');
    const messageDiv = document.getElementById('subscribe-message');
    if (!form)
        return;
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };
    if (!emailInput || !messageDiv)
        return;
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
        setTimeout(() => {
            messageDiv.classList.remove('hidden');
            messageDiv.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-green-100 text-green-700';
            messageDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Thank you for subscribing! Check your inbox.';
            emailInput.value = '';
        }, 1000);
    });
};
export const setupAccordion = () => {
    const faqContainer = document.getElementById('faq-accordion-container');
    if (!faqContainer)
        return;
    faqContainer.addEventListener('click', (e) => {
        const target = e.target;
        const header = target.closest('.accordion-header');
        if (!header)
            return;
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            header.setAttribute('aria-expanded', 'false');
            if (content) {
                content.classList.remove('open');
            }
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        }
        else {
            faqContainer.querySelectorAll('.accordion-header').forEach(otherHeader => {
                otherHeader.setAttribute('aria-expanded', 'false');
                const otherContent = otherHeader.nextElementSibling;
                if (otherContent) {
                    otherContent.classList.remove('open');
                }
                const otherIcon = otherHeader.querySelector('i');
                if (otherIcon) {
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            header.setAttribute('aria-expanded', 'true');
            if (content) {
                content.classList.add('open');
            }
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
        }
    });
};
export const setFooterYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
    }
};
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
//# sourceMappingURL=index.js.map