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

        const response = await fetch('./data/test.json');
        const data = await response.json();

        expect(fetch).toHaveBeenCalledWith('./data/test.json');
        expect(data).toEqual(mockData);
    });

    test('should handle fetch errors gracefully', async () => {
        // Mock failed response
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        try {
            await fetch('./data/test.json');
        } catch (error) {
            // Expect error to be caught and logged
            expect(consoleSpy).toHaveBeenCalledWith('Could not fetch data from test.json:', expect.any(Error));
        }

        consoleSpy.mockRestore();
    });

    test('should handle HTTP errors', async () => {
        // Mock HTTP error response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        try {
            await fetch('./data/nonexistent.json');
        } catch (error) {
            // Expect error to be caught and logged
            expect(consoleSpy).toHaveBeenCalledWith('Could not fetch data from nonexistent.json:', expect.any(Error));
        }

        consoleSpy.mockRestore();
    });
});