
export const MAX_ZOOM: number = 13;

/**
 * 
 */
export const REGIONS = [
    'Abruzzo',
    'Basilicata',
    'Calabria',
    'Campania',
    'Emilia-Romagna',
    'Friuli Venezia Giulia',
    'Lazio',
    'Liguria',
    'Lombardia',
    'Marche',
    'Molise',
    'Piemonte',
    'Puglia',
    'Sardegna',
    'Sicilia',
    'Toscana',
    'Trentino-Alto Adige',
    'Umbria',
    'Valle d\'Aosta',
    'Veneto',
];

/**
 * 
 */
export const variablesDashboard = {
    HOUSES: "houses",
    STATISTIC: "statistic",
    MESSAGES: "messages",
    MESSAGE: "message",
    PROFILE: "profile",
    SETTINGS: "settings",
    HOME: "home",
    CREATE_UPDATE: "createUpdate",
    PHOTO: "photo",
    SPONSORSHIPS:"sponsorships"
}

export const MONTHS = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
];

export const WEEK = [
    "Domenica",
    "Lunedi",
    "Martedi",
    "Mercoledi",
    "Giovedi",
    "Venerdi",
    "Sabato",    
];

export type YearStat = {
    month: number;
    total: number;
}
export type MonthStat = {
    day: number;
    total: number;
}


export const DEFAULT_PROPERTIES_YEAR: YearStat[] = [
    { month: 1, total: 0 },
    { month: 2, total: 0 },
    { month: 3, total: 0 },
    { month: 4, total: 0 },
    { month: 5, total: 0 },
    { month: 6, total: 0 },
    { month: 7, total: 0 },
    { month: 8, total: 0 },
    { month: 9, total: 0 },
    { month: 10, total: 0 },
    { month: 11, total: 0 },
    { month: 12, total: 0 },
]
export const DEFAULT_PROPERTIES_MONTH: MonthStat[] = [
    { day: 1, total: 0 },
    { day: 2, total: 0 },
    { day: 3, total: 0 },
    { day: 4, total: 0 },
    { day: 5, total: 0 },
    { day: 6, total: 0 },
    { day: 7, total: 0 },
]