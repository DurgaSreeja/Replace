// src/slider.test.js
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Mock the DOM
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const dom = new JSDOM(html);
global.document = dom.window.document;
global.window = dom.window;

// Import the Slider class
import { Slider } from './slider.js';

describe('Slider Component', () => {
    let slider;
    let testData;
    
    beforeEach(() => {
        // Create a test container
        const container = document.createElement('div');
        container.id = 'test-slider';
        document.body.appendChild(container);
        
        // Test data
        testData = [
            {
                id: 1,
                title: "Test Slide 1",
                subtitle: "Subtitle 1",
                description: "Description 1",
                bg: "https://example.com/image1.jpg",
                ctaText: "Learn More",
                ctaLink: "#"
            },
            {
                id: 2,
                title: "Test Slide 2",
                subtitle: "Subtitle 2",
                description: "Description 2",
                bg: "https://example.com/image2.jpg",
                ctaText: "Explore",
                ctaLink: "#"
            }
        ];
        
        // Initialize slider
        slider = new Slider({
            element: '#test-slider',
            data: testData,
            autoPlay: false,
            showDots: true,
            showArrows: true
        });
    });
    
    afterEach(() => {
        // Clean up
        const container = document.getElementById('test-slider');
        if (container) {
            container.remove();
        }
    });
    
    test('should create slider structure', () => {
        const sliderElement = document.getElementById('test-slider');
        expect(sliderElement).toBeTruthy();
        expect(sliderElement.querySelector('.slider-wrapper')).toBeTruthy();
        expect(sliderElement.querySelector('.slides-container')).toBeTruthy();
        expect(sliderElement.querySelector('.slider-prev')).toBeTruthy();
        expect(sliderElement.querySelector('.slider-next')).toBeTruthy();
        expect(sliderElement.querySelector('.slider-dots')).toBeTruthy();
    });
    
    test('should render slides correctly', () => {
        const slidesContainer = document.querySelector('.slides-container');
        const slides = slidesContainer.querySelectorAll('.slide-item');
        expect(slides.length).toBe(2);
    });
    
    test('should navigate to next slide', () => {
        const initialIndex = slider.currentIndex;
        slider.nextSlide();
        expect(slider.currentIndex).toBe((initialIndex + 1) % testData.length);
    });
    
    test('should navigate to previous slide', () => {
        // Move to second slide first
        slider.nextSlide();
        expect(slider.currentIndex).toBe(1);
        
        // Then go back to first
        slider.prevSlide();
        expect(slider.currentIndex).toBe(0);
    });
    
    test('should go to specific slide', () => {
        slider.goToSlide(1);
        expect(slider.currentIndex).toBe(1);
    });
});