export interface House {
    id: number,
    user_id: number,
    title: string,
    description: string,
    rooms: number,
    beds: number,
    bathrooms: number,
    square: number,
    visible: boolean,
    country: string,
    region: string,
    city: string,
    address: string,
    lat: string,
    lon: string,
    price: string,
    facilities?: Facilities[],
    photos?: Photos[],
    created_at: string,
    updated_at: string,
}

export interface Photos {
    id: number,
    apartment_id: number,
    image_url: string,
}

/**
 * 
 */
export interface PaginateHouses {
    current_page: number,
    data: House[]
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: Links[]
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string|null,
    to: number,
    total: number,
}

export interface PaginateMessages {
    current_page: number,
    data: Messages[]
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: Links[]
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string|null,
    to: number,
    total: number,
}

export interface Links {
    active: boolean;
    label: string | null;
    url: string | null;
}

export interface Facilities {
    id: number,
    name: string,
}

export interface Regions {
    id: number,
    name: string,
}

export interface Messages{
    id: number,
    apartment_id: number,
    email: string,
    message_content: string,
    name: string,
    surname: string,
    created_at: Date,
    updated_at: Date,
    is_read: boolean,
}