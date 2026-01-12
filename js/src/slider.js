// src/slider.js
export class Slider {
    constructor(options) {
        this.element = document.querySelector(options.element);
        this.data = options.data || [];
        this.autoPlay = options.autoPlay !== false; // default true
        this.intervalTime = options.interval || 5000;
        this.showDots = options.showDots !== false; // default true
        this.showArrows = options.showArrows !== false; // default true
        this.currentIndex = 0;
        this.slideInterval = null;
        
        // Create slider structure
        this.createSliderStructure();
        
        // Render initial slides
        this.renderSlides();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start autoplay if enabled
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }
    
    createSliderStructure() {
        if (!this.element) return;
        
        this.element.innerHTML = `
            <div class="slider-wrapper relative w-full overflow-hidden">
                <div class="slides-container flex transition-transform duration-500 ease-in-out" style="transform: translateX(0%);">
                    <!-- Slides will be inserted here -->
                </div>
                
                ${this.showArrows ? `
                <button class="slider-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition" aria-label="Previous slide">
                    <i class="fas fa-angle-left w-5 h-5"></i>
                </button>
                <button class="slider-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition" aria-label="Next slide">
                    <i class="fas fa-angle-right w-5 h-5"></i>
                </button>
                ` : ''}
                
                ${this.showDots ? `
                <div class="slider-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    <!-- Dots will be inserted here -->
                </div>
                ` : ''}
            </div>
        `;
        
        this.slidesContainer = this.element.querySelector('.slides-container');
        this.dotsContainer = this.element.querySelector('.slider-dots');
    }
    
    renderSlides() {
        if (!this.slidesContainer) return;
        
        // Render slides
        this.slidesContainer.innerHTML = this.data.map((slide, index) => {
            // Check if this is a testimonial slide (different structure)
            if (slide.review) {
                // Testimonial slide (using "review" property)
                const stars = Array(slide.rating).fill().map(() => `<i class="fas fa-star text-yellow-500"></i>`).join('');
                
                // Check if this is a video testimonial
                if (slide.videoUrl) {
                    return `
                        <div class="slide-item w-full flex-shrink-0 px-4">
                            <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
                                <div class="flex justify-center mb-6">
                                    <div class="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500">
                                        <video class="w-full h-full object-cover" autoplay muted loop playsinline onerror="this.parentElement.innerHTML='<img src=${slide.avatar} alt=${slide.name} class=w-full h-full object-cover>'">
                                            <source src="${slide.videoUrl}" type="video/mp4">
                                            <img src="${slide.avatar}" alt="${slide.name}" class="w-full h-full object-cover">
                                        </video>
                                    </div>
                                </div>
                                <p class="text-xl md:text-2xl italic text-gray-700 mb-6">"${slide.review}"</p>
                                <div class="flex justify-center mb-4">
                                    ${stars}
                                </div>
                                <h3 class="text-xl font-bold text-gray-900">${slide.name}</h3>
                                <p class="text-gray-600">${slide.role}</p>
                                ${slide.destination ? `<p class="text-gray-500 mt-2">Visited: ${slide.destination}</p>` : ''}
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="slide-item w-full flex-shrink-0 px-4">
                            <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
                                <div class="flex justify-center mb-6">
                                    <img src="${slide.avatar}" alt="${slide.name}" class="w-20 h-20 rounded-full object-cover border-4 border-yellow-500">
                                </div>
                                <p class="text-xl md:text-2xl italic text-gray-700 mb-6">"${slide.review}"</p>
                                <div class="flex justify-center mb-4">
                                    ${stars}
                                </div>
                                <h3 class="text-xl font-bold text-gray-900">${slide.name}</h3>
                                <p class="text-gray-600">${slide.role}</p>
                                ${slide.destination ? `<p class="text-gray-500 mt-2">Visited: ${slide.destination}</p>` : ''}
                            </div>
                        </div>
                    `;
                }
            } else if (slide.duration) {
                // Tour slide
                const starIcons = Array(Math.floor(slide.rating)).fill().map(() => `<i class="fas fa-star w-4 h-4"></i>`).join('');
                
                // Check if this tour has a video
                if (slide.videoUrl) {
                    return `
                        <div class="slide-item w-full flex-shrink-0 px-4">
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto">
                                <div class="relative">
                                    <video class="w-full h-56 object-cover" autoplay muted loop playsinline onerror="this.parentElement.innerHTML='<img src=${slide.imageUrl} alt=${slide.name} class=w-full h-56 object-cover>'">
                                        <source src="${slide.videoUrl}" type="video/mp4">
                                        <img src="${slide.imageUrl}" alt="${slide.name}" class="w-full h-56 object-cover">
                                    </video>
                                    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                                </div>
                                <div class="p-6">
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">${slide.name}</h3>
                                    <p class="text-sm text-gray-500 mb-3">${slide.duration}</p>
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center text-yellow-500">${starIcons}
                                            <span class="text-sm font-semibold text-gray-700 ml-1">${slide.rating}</span>
                                        </div>
                                        <p class="text-2xl font-bold text-yellow-600">$${slide.price}</p>
                                    </div>
                                    <button class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">Book Now</button>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="slide-item w-full flex-shrink-0 px-4">
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto">
                                <img src="${slide.imageUrl}" alt="${slide.name}" class="w-full h-56 object-cover" />
                                <div class="p-6">
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">${slide.name}</h3>
                                    <p class="text-sm text-gray-500 mb-3">${slide.duration}</p>
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center text-yellow-500">${starIcons}
                                            <span class="text-sm font-semibold text-gray-700 ml-1">${slide.rating}</span>
                                        </div>
                                        <p class="text-2xl font-bold text-yellow-600">$${slide.price}</p>
                                    </div>
                                    <button class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-md">Book Now</button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            } else if (slide.location) {
                // Hotel slide
                const starIcons = Array(Math.floor(slide.rating)).fill().map(() => `<i class="fas fa-star w-4 h-4"></i>`).join('');
                
                // Check if this hotel has a video
                if (slide.videoUrl) {
                    return `
                        <div class="slide-item w-full flex-shrink-0 px-4">
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto">
                                <div class="relative">
                                    <video class="w-full h-56 object-cover" autoplay muted loop playsinline onerror="this.parentElement.innerHTML='<img src=${slide.imageUrl} alt=${slide.name} class=w-full h-56 object-cover>'">
                                        <source src="${slide.videoUrl}" type="video/mp4">
                                        <img src="${slide.imageUrl}" alt="${slide.name}" class="w-full h-56 object-cover">
                                    </video>
                                    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                                </div>
                                <div class="p-6">
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">${slide.name}</h3>
                                    <p class="text-sm text-gray-500 mb-3">${slide.location}</p>
                                    <div class="flex items-center text-yellow-500 mb-4">
                                        ${starIcons}
                                        <span class="text-sm font-semibold text-gray-700 ml-2">${slide.rating.toFixed(1)}</span>
                                    </div>
                                    <p class="text-2xl font-bold text-yellow-600">$${slide.price.toFixed(0)} <span class="text-sm font-normal text-gray-500">/ night</span></p>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="slide-item w-full flex-shrink-0 px-4">
                            <div class="bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto">
                                <img src="${slide.imageUrl}" alt="${slide.name}" class="w-full h-56 object-cover" />
                                <div class="p-6">
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">${slide.name}</h3>
                                    <p class="text-sm text-gray-500 mb-3">${slide.location}</p>
                                    <div class="flex items-center text-yellow-500 mb-4">
                                        ${starIcons}
                                        <span class="text-sm font-semibold text-gray-700 ml-2">${slide.rating.toFixed(1)}</span>
                                    </div>
                                    <p class="text-2xl font-bold text-yellow-600">$${slide.price.toFixed(0)} <span class="text-sm font-normal text-gray-500">/ night</span></p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            } else {
                // Hero slide (default)
                // Check if this is a video hero slide
                if (slide.videoUrl) {
                    return `
                        <div class="slide-item w-full flex-shrink-0 relative">
                            <div class="absolute inset-0">
                                <video class="w-full h-full object-cover" autoplay muted loop playsinline onerror="this.parentElement.innerHTML='<img src=${slide.bg} alt=${slide.title} class=w-full h-full object-cover>'">
                                    <source src="${slide.videoUrl}" type="video/mp4">
                                    <img src="${slide.bg}" alt="${slide.title}" class="w-full h-full object-cover">
                                </video>
                                <div class="absolute inset-0 bg-black bg-opacity-40"></div>
                            </div>
                            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                                <div class="text-white z-10 w-full md:w-1/2">
                                    <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4">${slide.title}</h1>
                                    <p class="text-xl sm:text-2xl font-light mb-2">${slide.subtitle}</p>
                                    <p class="text-lg mb-8 max-w-lg">${slide.description}</p>
                                    <a href="${slide.ctaLink}" class="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md text-lg">${slide.ctaText}</a>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="slide-item w-full flex-shrink-0 relative">
                            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${slide.bg}');">
                                <div class="absolute inset-0 bg-black bg-opacity-40"></div>
                            </div>
                            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                                <div class="text-white z-10 w-full md:w-1/2">
                                    <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4">${slide.title}</h1>
                                    <p class="text-xl sm:text-2xl font-light mb-2">${slide.subtitle}</p>
                                    <p class="text-lg mb-8 max-w-lg">${slide.description}</p>
                                    <a href="${slide.ctaLink}" class="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md text-lg">${slide.ctaText}</a>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        }).join('');
        
        // Render dots if enabled
        if (this.showDots && this.dotsContainer) {
            this.dotsContainer.innerHTML = this.data.map((_, index) => `
                <button class="w-3 h-3 rounded-full transition-all duration-300 ${index === this.currentIndex ? 'bg-yellow-500 w-6' : 'bg-white opacity-60'}"
                        data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
            `).join('');
        }
        
        // Update slider width
        this.updateSliderPosition();
    }
    
    updateSliderPosition() {
        if (!this.slidesContainer) return;
        const translateX = -this.currentIndex * 100;
        this.slidesContainer.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        if (this.showDots && this.dotsContainer) {
            const dots = this.dotsContainer.querySelectorAll('button');
            dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('bg-yellow-500', 'w-6');
                    dot.classList.remove('bg-white', 'opacity-60');
                } else {
                    dot.classList.remove('bg-yellow-500', 'w-6');
                    dot.classList.add('bg-white', 'opacity-60');
                }
            });
        }
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.data.length;
        this.updateSliderPosition();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
        this.updateSliderPosition();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSliderPosition();
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        if (this.autoPlay) {
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, this.intervalTime);
        }
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    setupEventListeners() {
        // Arrow buttons
        if (this.showArrows) {
            const prevBtn = this.element.querySelector('.slider-prev');
            const nextBtn = this.element.querySelector('.slider-next');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                    if (this.autoPlay) {
                        this.resetAutoPlay();
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                    if (this.autoPlay) {
                        this.resetAutoPlay();
                    }
                });
            }
        }
        
        // Dot navigation
        if (this.showDots && this.dotsContainer) {
            this.dotsContainer.addEventListener('click', (e) => {
                const dot = e.target.closest('button');
                if (dot && dot.dataset.index) {
                    this.goToSlide(parseInt(dot.dataset.index));
                    if (this.autoPlay) {
                        this.resetAutoPlay();
                    }
                }
            });
        }
        
        // Keyboard support
        this.addKeyboardSupport();
        
        // Touch/swipe support
        this.addSwipeSupport();
        
        // Pause autoplay on hover
        if (this.autoPlay) {
            this.element.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            this.element.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }
    
    addKeyboardSupport() {
        this.element.setAttribute('tabindex', '0');
        this.element.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.prevSlide();
                    if (this.autoPlay) {
                        this.resetAutoPlay();
                    }
                    break;
                case 'ArrowRight':
                    this.nextSlide();
                    if (this.autoPlay) {
                        this.resetAutoPlay();
                    }
                    break;
            }
        });
    }
    
    addSwipeSupport() {
        let startX = 0;
        let endX = 0;
        
        this.element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.element.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        this.element.addEventListener('touchend', () => {
            const threshold = 50; // Minimum swipe distance
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - prev slide
                    this.prevSlide();
                }
                
                if (this.autoPlay) {
                    this.resetAutoPlay();
                }
            }
        });
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}