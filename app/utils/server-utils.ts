
export async function isImage(url: string): Promise<boolean> {
    if (!url || url === 'N/A') {
        return false;
    }
    try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok && res.headers.get('content-type')?.startsWith('image/') || false;
    } catch (error) {
        console.error('Error checking image URL:', error);
        return false;
    }
}