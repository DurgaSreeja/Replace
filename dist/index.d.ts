export interface Tour {
    id: number;
    name: string;
    price: number;
    duration: string;
    rating: number;
    imageUrl: string;
}
export interface Hotel {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    imageUrl: string;
}
export interface Blog {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    imageUrl: string;
}
export interface FAQ {
    title: string;
    content: string;
}
export interface Slide {
    title: string;
    subtitle: string;
    bg: string;
}
export interface Tab {
    name: string;
}
export declare const createTourCard: (tour: Tour) => string;
export declare const createHotelCard: (hotel: Hotel) => string;
export declare const createBlogPostCard: (post: Blog) => string;
export declare const createFAQItem: (item: FAQ, index: number) => string;
export declare const renderCards: <T>(data: T[], containerId: string, cardCreationFn: (item: T) => string) => void;
export declare const renderAccordion: (data: FAQ[], containerId: string) => void;
export declare const setTourData: (data: Tour[]) => void;
export declare const setupMobileMenuToggle: () => void;
export declare const setupHeroSlider: () => void;
export declare const setupSearchTabs: () => void;
export declare const setupTourSearch: () => void;
export declare const setupSubscriptionForm: () => void;
export declare const setupAccordion: () => void;
export declare const setFooterYear: () => void;
//# sourceMappingURL=index.d.ts.map