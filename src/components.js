// js/components.js

// Helper function to create HTML for a tour card
export const createTourCard = (tour) => {
    const starIcons = Array(Math.floor(tour.rating)).fill().map(() => `<i class="fas fa-star w-4 h-4"></i>`).join('');
    
    // Check if this tour has a video
    if (tour.videoUrl) {
        return `
            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
                <div class="relative">
                    <video class="w-full h-40 object-cover" autoplay muted loop playsinline onerror="this.parentElement.innerHTML='<img src=${tour.imageUrl} alt=${tour.name} class=w-full h-40 object-cover>'">
                        <source src="${tour.videoUrl}" type="video/mp4">
                        <img src="${tour.imageUrl}" alt="${tour.name}" class="w-full h-40 object-cover">
                    </video>
                    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
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
    } else {
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
    }
};

// Helper function to create HTML for a hotel card
export const createHotelCard = (hotel) => {
    const starIcons = Array(Math.floor(hotel.rating)).fill().map(() => `<i class="fas fa-star w-4 h-4"></i>`).join('');
    
    // Check if this hotel has a video
    if (hotel.videoUrl) {
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                <div class="relative">
                    <video class="w-full h-48 object-cover" autoplay muted loop playsinline onerror="this.parentElement.innerHTML='<img src=${hotel.imageUrl} alt=${hotel.name} class=w-full h-48 object-cover>'">
                        <source src="${hotel.videoUrl}" type="video/mp4">
                        <img src="${hotel.imageUrl}" alt="${hotel.name}" class="w-full h-48 object-cover">
                    </video>
                    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
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
    } else {
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
    }
};

// Helper function to create HTML for a blog post card
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

// Helper function to create HTML for a destination highlight card
export const createDestinationCard = (destination) => {
    // Check if this destination has a video
    if (destination.videoUrl) {
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="relative">
                    <video class="w-full h-48 object-cover" autoplay muted loop playsinline onerror="this.parentElement.innerHTML='<img src=${destination.imageUrl} alt=${destination.name} class=w-full h-48 object-cover>'">
                        <source src="${destination.videoUrl}" type="video/mp4">
                        <img src="${destination.imageUrl}" alt="${destination.name}" class="w-full h-48 object-cover">
                    </video>
                    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
                <div class="p-4">
                    <h4 class="text-xl font-bold text-gray-900 mb-2">${destination.name}</h4>
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">${destination.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-semibold text-yellow-600">${destination.toursCount} tours</span>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-500 text-sm"></i>
                            <span class="text-sm font-semibold text-gray-700 ml-1">${destination.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src="${destination.imageUrl}" alt="${destination.name}" class="w-full h-48 object-cover" />
                <div class="p-4">
                    <h4 class="text-xl font-bold text-gray-900 mb-2">${destination.name}</h4>
                    <p class="text-sm text-gray-600 mb-3 line-clamp-2">${destination.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-semibold text-yellow-600">${destination.toursCount} tours</span>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-500 text-sm"></i>
                            <span class="text-sm font-semibold text-gray-700 ml-1">${destination.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Helper function to create HTML for an FAQ item
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

// Skeleton loading components
export const createSkeletonCard = () => {
    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div class="bg-gray-300 h-40 w-full"></div>
            <div class="p-4">
                <div class="h-6 bg-gray-300 rounded mb-2"></div>
                <div class="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
                <div class="flex justify-between items-center">
                    <div class="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div class="h-6 bg-gray-300 rounded w-1/4"></div>
                </div>
                <div class="h-10 bg-gray-300 rounded mt-4"></div>
            </div>
        </div>
    `;
};

export const createSkeletonBlogCard = () => {
    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            <div class="bg-gray-300 h-48 w-full"></div>
            <div class="p-4">
                <div class="h-5 bg-gray-300 rounded mb-3"></div>
                <div class="h-4 bg-gray-300 rounded mb-2"></div>
                <div class="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
                <div class="flex justify-between items-center text-xs mt-3 border-t pt-3">
                    <div class="h-3 bg-gray-300 rounded w-1/4"></div>
                    <div class="h-3 bg-gray-300 rounded w-1/6"></div>
                </div>
            </div>
        </div>
    `;
};

export const createSkeletonDestinationCard = () => {
    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div class="bg-gray-300 h-48 w-full"></div>
            <div class="p-4">
                <div class="h-6 bg-gray-300 rounded mb-2"></div>
                <div class="h-4 bg-gray-300 rounded mb-3"></div>
                <div class="flex justify-between items-center">
                    <div class="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div class="h-4 bg-gray-300 rounded w-1/4"></div>
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

// Render skeleton loaders
export const renderSkeletons = (containerId, skeletonFn, count = 4) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = Array(count).fill().map(skeletonFn).join('');
    }
};