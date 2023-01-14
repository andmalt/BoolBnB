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
    price: number,
    photos?:Photos,
}

export interface Photos {
    id: number,
    apartment_id: number,
    image_url: string
}