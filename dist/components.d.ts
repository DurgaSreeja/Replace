import { Tour, Hotel, Blog, FAQ } from './types';
export declare const createTourCard: (tour: Tour) => string;
export declare const createHotelCard: (hotel: Hotel) => string;
export declare const createBlogPostCard: (post: Blog) => string;
export declare const createFAQItem: (item: FAQ, index: number) => string;
export declare const renderCards: <T>(data: T[], containerId: string, cardCreationFn: (item: T) => string) => void;
export declare const renderAccordion: (data: FAQ[], containerId: string) => void;
//# sourceMappingURL=components.d.ts.map