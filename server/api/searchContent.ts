/* eslint-disable @typescript-eslint/no-explicit-any */
import { isImage } from '@/utils/server-utils';

export default defineCachedEventHandler(async (event) => {
    const query = getQuery(event);
    const searchTerm = query.keyword as string;
    if (typeof searchTerm !== 'string' || !searchTerm.trim()) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid searchTerm parameter'
        });
    }

    const config = useRuntimeConfig(event);
    const apikey = config.apiKey;
    const omdb = (params: Record<string, string | number>) => 
        $fetch('https://www.omdbapi.com/', {
            query: { apikey, ...params }
        });

    const searchResults: any = await omdb({ s: searchTerm });

    if (searchResults.Response === 'True') {
        // Check if poster is available for each result, if not, set a default poster
        searchResults.Search.forEach(async (result: any) => {
            if (!(await isImage(result.Poster))) {
                result.Poster = '/images/general-placeholder.jpg'; // Set a default poster path
            }
        });
    }

    return searchResults;
}, {
    name: 'omdb-search-cache',
    maxAge: 60 * 60 * 24 * 7, // Cache for 7 days
    getKey: (event) => String(getQuery(event).keyword) // Use the keyword as the cache key
});