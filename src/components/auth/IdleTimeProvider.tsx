"use client";

import { useEffect, useCallback } from 'react';

// 5 minutes in milliseconds for the idle timeout
const IDLE_TIMEOUT_MS = 5 * 60 * 1000;

export function IdleTimerProvider({ children }: { children: React.ReactNode }) {

    const handleIdle = useCallback(async () => {
        // Show an alert to the user. In a real app, you might use a modal.
        alert("You have been logged out due to inactivity.");

        // Call the logout API to clear the server-side session/cookie
        await fetch('/api/logout', { method: 'POST' });

        // Force a full page reload to the sign-in page to clear all state
        window.location.href = '/signin';
    }, []);

    useEffect(() => {
        let idleTimer: NodeJS.Timeout;

        const resetIdleTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(handleIdle, IDLE_TIMEOUT_MS);
        };

        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

        // Set up event listeners to reset the timer on user activity
        events.forEach(event => window.addEventListener(event, resetIdleTimer));

        // Initialize the timer
        resetIdleTimer();

        // Cleanup function to remove listeners when the component unmounts
        return () => {
            events.forEach(event => window.removeEventListener(event, resetIdleTimer));
            clearTimeout(idleTimer);
        };
    }, [handleIdle]);

    return <>{children}</>;
}