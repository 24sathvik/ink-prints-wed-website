"use client";

import { useState, useEffect, useCallback } from 'react';

export function useRecentlyViewed() {
    const [recentIds, setRecentIds] = useState<string[]>([]);

    useEffect(() => {
        // Load from local storage
        const stored = localStorage.getItem('recentlyViewed');
        if (stored) {
            setRecentIds(JSON.parse(stored));
        }
    }, []);

    const addProduct = useCallback((id: string) => {
        setRecentIds(prev => {
            const newIds = [id, ...prev.filter(pid => pid !== id)].slice(0, 8); // Keep max 8
            localStorage.setItem('recentlyViewed', JSON.stringify(newIds));
            return newIds;
        });
    }, []);

    return { recentIds, addProduct };
}
