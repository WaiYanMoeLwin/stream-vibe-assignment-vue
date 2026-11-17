export const formatNumberWithUnit = (value: number): string => {
    const units = ['', 'K', 'M', 'B', 'T'];
    let unitIndex = 0;

    while (value >= 1000 && unitIndex < units.length - 1) {
        value /= 1000;
        unitIndex++;
    }

    return `${value.toFixed(2)}${units[unitIndex]}`;
}

export const formatRuntime = (runtime: string): string => {
    let formattedRuntime = runtime; // Default to the original string
    // Type safe version of the runtime formatting logic
    if (runtime.match(/(\d+)\sh\s*(\d+)\smin/)) {
        const hoursMatch = runtime.match(/(\d+)\sh/);
        const minutesMatch = runtime.match(/(\d+)\smin/);
        if (hoursMatch && minutesMatch) {
            const hours = hoursMatch[1] ? parseInt(hoursMatch[1]) : 0;
            const minutes = minutesMatch[1] ? parseInt(minutesMatch[1]) : 0;
            formattedRuntime = `${hours}h ${minutes}m`;
        }
    } else if (runtime.match(/(\d+).*min/)) {
        const minutesMatch = runtime.match(/(\d+).*min/);
        if (minutesMatch) {
            const minutes = minutesMatch[1] ? parseInt(minutesMatch[1]) : 0;
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            formattedRuntime = hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}min`;
        }
    }
    return formattedRuntime;
}

export const normalizeRating = (rating: string): number | null => {
    // Normalize rating to 5-point scale
    if (rating.includes('/')) {
        const [value, scale] = rating.split('/').map(Number);
        return (value! / scale!) * 5;
    } else if (rating.includes('%')) {
        const value = parseFloat(rating.replace('%', ''));
        return (value / 100) * 5;
    } else {
        const value = parseFloat(rating) / 10 * 5;
        return isNaN(value) ? null : value;
    }
}

export const contentInfosByList = {
    'trending': {
        'movie': ['runtime', 'views'],
        'series': ['runtime', 'seasons'],
    },
    'newReleases': {
        'movie': ['release-date'],
        'series': ['runtime', 'seasons'],
    },
    'mustWatch': {
        'movie': ['runtime', 'rating'],
        'series': ['runtime', 'rating'],
    }
}

export const contentInfos = {
    runtime: {
        label: 'Runtime',
        icon: '/images/icons/clock.svg',
        value: (content: ContentItem) => content.runtime ? formatRuntime(content.runtime) : 'N/A',
    },
    releaseDate: {
        label: 'Release Date',
        icon: null,
        value: (content: ContentItem) => content.releaseDate ? 'Released at ' + content.releaseDate : 'N/A',
    },
    views: {
        label: 'Views',
        icon: '/images/icons/eye.svg',
        value: (content: ContentItem) => content.imdbVotes ? formatNumberWithUnit(content.imdbVotes) : 'N/A',
    },
    seasons: {
        label: 'Seasons',
        icon: '/images/icons/stacks.svg',
        value: (content: ContentItem) => content.totalSeasons ? content.totalSeasons.toString() : 'N/A',
    },
    rating: {
        label: 'Rating',
        icon: ['/images/icons/star-empty.svg', '/images/icons/star-half-filled.svg', '/images/icons/star-filled.svg'],
        value: (content: ContentItem) => content.imdbRating ? normalizeRating(content.imdbRating)?.toString() || 'N/A' : 'N/A',

    }
}