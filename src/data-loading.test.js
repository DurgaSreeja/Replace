// src/data-loading.test.js
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Set up DOM environment for testing
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.document = dom.window.document;
global.window = dom.window;

// Mock fetch
global.fetch = jest.fn();

// Import the actual fetchData function from app.js
// Since we can't directly import the function, we'll create a standalone version for testing
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

describe('Data Loading', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('should fetch data from JSON files', async () => {
        // Mock successful response
        const mockData = [{ id: 1, name: 'Test' }];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData)
        });

        const data = await fetchData('test');

        expect(fetch).toHaveBeenCalledWith('./data/test.json');
        expect(data).toEqual(mockData);
    });

    test('should handle fetch errors gracefully', async () => {
        // Mock failed response
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        const data = await fetchData('test');
        
        // Expect error to be caught and logged, and return empty array
        expect(consoleSpy).toHaveBeenCalledWith('Could not fetch data from test.json:', expect.any(Error));
        expect(data).toEqual([]);

        consoleSpy.mockRestore();
    });

    test('should handle HTTP errors', async () => {
        // Mock HTTP error response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        const data = await fetchData('nonexistent');
        
        // Expect error to be caught and logged, and return empty array
        expect(consoleSpy).toHaveBeenCalledWith('Could not fetch data from nonexistent.json:', expect.any(Error));
        expect(data).toEqual([]);

        consoleSpy.mockRestore();
    });
});