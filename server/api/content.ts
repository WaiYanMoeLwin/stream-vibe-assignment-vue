/* eslint-disable @typescript-eslint/no-explicit-any */
import { isImage } from '@/utils/server-utils';

export default defineCachedEventHandler(async (event) => {
    const query = getQuery(event);
    const title = query.title as string;
    if (typeof title !== 'string' || !title.trim()) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid title parameter'
        });
    }
    
    const config = useRuntimeConfig(event);
    const apikey = config.apiKey;
    // const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;
    const omdb = (params: Record<string, string | number>) => 
        $fetch('https://www.omdbapi.com/', {
            query: { apikey, ...params }
        })


    const contentDetails: any = await omdb({ t: title });

    if (contentDetails.Response === 'True') {
        // Check if poster is available, if not, set a default poster
        if (!(await isImage(contentDetails.Poster))) {
            contentDetails.Poster = '/images/general-placeholder.jpg'; // Set a default poster path
        }
    }

    return contentDetails;
}, {
    maxAge: 60 * 60 * 24 * 7, // Cache for 7 days
    getKey: (event) => String(getQuery(event).title) // Use the title as the cache key
})