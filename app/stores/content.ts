import { defineStore } from "pinia";

const useContentStore = defineStore("content",{
    state: () => ({
        content: {} as Record<string, ContentItem>,
        genres: {} as Record<string, Genre>,
    }),
    persist: {
        key: 'content-store',
        storage: localStorage,
    },
    getters: {
        getContentById: (state) => {
            return (id: string) => state.content[id];
        },
        getTrendingContent: (state) => {
            return (type: 'movie' | 'series' | 'both') => {
                const allContent = Object.values(state.content);
                const filteredContent = type === 'both' ? allContent : allContent.filter(item => item.type === type);
                return filteredContent.sort((a, b) => b.imdbVotes - a.imdbVotes).slice(0, 10);
            }
        },
        getNewReleases: (state) => {
            return (type: 'movie' | 'series' | 'both') => {
                const allContent = Object.values(state.content);
                const filteredContent = type === 'both' ? allContent : allContent.filter(item => item.type === type);
                return filteredContent.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 10);
            }
        },
        getMustWatchContent: (state) => {
            return (type: 'movie' | 'series' | 'both') => {
                const allContent = Object.values(state.content);
                const filteredContent = type === 'both' ? allContent : allContent.filter(item => item.type === type);
                return filteredContent.sort((a, b) => b.imdbRating.localeCompare(a.imdbRating)).slice(0, 10);
            }
        },
        trailers: (state) => {
            const allContent = Object.values(state.content);
            const shuffledContent = allContent.toSorted(() => Math.random() - 0.5);
            return shuffledContent.slice(0, 5);
        }
    },
    actions: {
        async loadContent() {
            if (this.content && Object.keys(this.content).length > 0) {
                // Content is already loaded, no need to fetch again
                console.log("Used cached content data at: ", new Date().toISOString());
                return;
            }
            console.log("Loading content data at: ", new Date().toISOString());
            // Load mock content data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mockData: any[] = await $fetch("http://localhost:3000/temp/mock-movie-data.json");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await Promise.allSettled(mockData.map(async (item: any) => {
                // Fetch additional details for each content item
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data: any  = await $fetch('http://localhost:3000/api/content?title=' + encodeURIComponent(item.id));
                
                if (data) {
                    const contentDetails = toContentItem(data, item);
                    this.content[contentDetails.id] = contentDetails;

                    // If the content is a series, fetch season details
                    if (contentDetails.type === 'series' && contentDetails.totalSeasons) {
                        const seasonDetails = await fetchSeasonDetails(contentDetails);
                        
                        this.content[contentDetails.id]!.seasons = seasonDetails;
                    }
                }
            }));
            console.log("Content data loaded at: ", new Date().toISOString());
            const genres: Record<string, Genre> = {};
            for (const contentItem of Object.values(this.content)) {
                for (const genre of contentItem.genre) {
                    if (!genres[genre]) {
                        genres[genre] = { name: genre, movies: [], series: [] };
                        if (contentItem.type === 'movie') {
                            genres[genre].movies.push(contentItem.id);
                        } else if (contentItem.type === 'series') {
                            genres[genre].series.push(contentItem.id);
                        }
                    } else {
                        if (contentItem.type === 'movie') {
                            genres[genre].movies.push(contentItem.id);
                        } else if (contentItem.type === 'series') {
                            genres[genre].series.push(contentItem.id);
                        }
                    }
                }
            }
            this.genres = genres;
        },
    },
});

async function fetchSeasonDetails(content: ContentItem): Promise<Record<number, SeasonItem>> {
    const { id, totalSeasons } = content;
    const seasonDetails: Record<number, SeasonItem> = {};

    await Promise.allSettled(Array.from({ length: totalSeasons || 0 }, (_, i) => i + 1).map(async (seasonNumber) => {
        await $fetch('http://localhost:3000/api/contentById', {
            query: { id, seasonNumber }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).then(async (seasonData: any) => {
            if (seasonData && seasonData.Episodes) {
                seasonDetails[seasonNumber] = { seasonNumber, episodes: {} };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await Promise.allSettled(seasonData.Episodes.map(async (episode: any) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const episodeDetails: any = await $fetch('http://localhost:3000/api/contentById', {
                        query: { id: episode.imdbID }
                    });
                    if (episodeDetails && seasonDetails[seasonNumber]) {
                        if (seasonDetails[seasonNumber].episodes[episode.Episode]) {
                            return; // Skip if episode already exists
                        }
                        seasonDetails[seasonNumber].episodes[episode.Episode] = {
                            episodeNumber: episode.Episode,
                            title: episodeDetails.Title,
                            plot: episodeDetails.Plot,
                            runtime: episodeDetails.Runtime,
                            poster: episodeDetails.Poster
                        };
                    }
                }));
            }
        });
    }));
    return seasonDetails;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toContentItem(fetchedData: any, mockData: any): ContentItem {
    return {
        id: fetchedData.imdbID,
        title: fetchedData.Title,
        plot: fetchedData.Plot,
        year: fetchedData.Year,
        releaseDate: fetchedData.Released,
        genre: fetchedData.Genre.split(',').map((g: string) => g.trim()),
        director: fetchedData.Director.split(',').map((d: string) => d.trim()).map((name: string) => ({
            name,
            country: fetchedData.Country // Assume the director's country is the same as the content's country as there is no direct mapping in the OMDB API for director's country
        })),
        actors: fetchedData.Actors.split(',').map((a: string) => a.trim()),
        language: fetchedData.Language.split(',').map((l: string) => l.trim()),
        country: fetchedData.Country,
        poster: fetchedData.Poster,
        rating: fetchedData.Ratings.map((r: { Source: string; Value: string }) => ({
            source: r.Source,
            value: r.Value
        })),
        runtime: fetchedData.Runtime,
        type: fetchedData.Type,
        imdbRating: fetchedData.imdbRating,
        imdbVotes: parseInt(fetchedData.imdbVotes.replace(/,/g, '')),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        music: mockData.music.map((m: any) => ({ // Mock data for music
            name: m.name,
            country: m.country
        })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reviews: mockData.reviews.map((r: any) => ({ // Mock data for reviews
            id: r.id,
            name: r.name,
            rating: r.rating,
            country: r.country,
            review: r.text
        })),
        totalSeasons: fetchedData.totalSeasons ? parseInt(fetchedData.totalSeasons) : undefined,
    }
}

export interface ContentItem {
    id: string;
    title: string;
    plot: string;
    year: string;
    releaseDate: string;
    genre: string[];
    director: {
        name: string;
        country: string;
    }[];
    actors: string[];
    language: string[];
    country: string;
    poster: string;
    rating: {
        source: string;
        value: string;
    }[];
    runtime: string;
    type: string;
    imdbRating: string;
    imdbVotes: number;
    music?: {
        name: string;
        country: string;
    }[];
    reviews?: {
        id: string;
        name: string;
        rating: number;
        country: string;
        review: string;
    }[],
    totalSeasons?: number;
    seasons?: Record<number, SeasonItem>;
}

export interface SeasonItem {
    seasonNumber: number;
    episodes: Record<number, EpisodeItem>;
}

export interface EpisodeItem {
    episodeNumber: number;
    title: string;
    plot: string;
    runtime: string;
    poster: string;
}

export interface Genre {
    name: string;
    movies: string[];
    series: string[];
}

export default useContentStore;