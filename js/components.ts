// js/components.ts

import { Tour, Hotel, Blog, FAQ } from './types';

// Helper function to create HTML for a tour card
export const createTourCard = (tour: Tour): string => {
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

// Helper function to create HTML for a hotel card
export const createHotelCard = (hotel: Hotel): string => {
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

// Helper function to create HTML for a blog post card
export const createBlogPostCard = (post: Blog): string => {
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

// Helper function to create HTML for an FAQ item
export const createFAQItem = (item: FAQ, index: number): string => {
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

export const renderCards = <T,>(data: T[], containerId: string, cardCreationFn: (item: T) => string): void => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = data.map(cardCreationFn).join('');
    }
};

export const renderAccordion = (data: FAQ[], containerId: string): void => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = data.map(createFAQItem).join('');
    }
};