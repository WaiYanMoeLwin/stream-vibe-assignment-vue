/* eslint-disable @typescript-eslint/no-explicit-any */

import { isImage } from "~/utils/server-utils";


export default defineCachedEventHandler(async (event) => {
    const query = getQuery(event);
    const id = query.id as string;
    const seasonNumber = query.seasonNumber ? query.seasonNumber as string : undefined;
    if (typeof id !== 'string' || !id.trim()) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid id parameter'
        });
    }
    if (seasonNumber && (typeof seasonNumber !== 'string' || !seasonNumber.trim())) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid seasonNumber parameter'
        });
    }

    const config = useRuntimeConfig(event);
    const apikey = config.apiKey;
    const omdb = (params: Record<string, string | number>) => 
        $fetch('https://www.omdbapi.com/', {
            query: { apikey, ...params }
        });

    const contentDetails: any = await omdb(seasonNumber ? { i: id, Season: seasonNumber } : { i: id });
    if (contentDetails.Response === 'True' && contentDetails.Poster ) {
        if (!(await isImage(contentDetails.Poster))) {
            contentDetails.Poster = '/images/general-placeholder.jpg'; // Set a default poster path
        }
    }

    return contentDetails;
}, {
    maxAge: 60 * 60 * 24 * 7, // Cache for 7 days
    getKey: (event) => String(getQuery(event).id) // Use the id as the cache key
});