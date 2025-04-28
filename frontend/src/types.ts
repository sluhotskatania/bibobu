// Тип для туру
export type Tour = {
    _id: string;
    title: string;
    description: string;
    minimumAge: number;
    category: string;
    price: number;
    likes: number;
    image?: string;
};

// Тип для відгуку
export type Feedback = {
    _id: string;
    userId: string;
    tourId: string;
    text: string;
    rating: number;
};

// Тип для користувача
export type User = {
    _id: string;
    name: string;
    email: string;
    role?: "admin" | "user";
    boughtTours?: string[];
    likedTours?: string[];
    bio?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
};

// Тип для стану Redux
export type RootState = {
    tours: {
        items: Tour[];
        currentTour: Tour | null;
        isLoading: boolean;
        error: string | null;
    };
    feedbacks: {
        items: Feedback[];
        isLoading: boolean;
        error: string | null;
    };
    likes: {
        likedTours: string[];
        isLoading: boolean;
        error: string | null;
    };
    profile: {
        data: User | null;
        isLoading: boolean;
        error: string | null;
    };
};