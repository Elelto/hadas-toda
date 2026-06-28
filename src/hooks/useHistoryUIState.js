import { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook to manage temporary UI states (modals, lightboxes, drawers)
 * integrates with the Browser History API via React Router so the Back button 
 * closes the UI state instead of navigating away.
 *
 * @param {string} key - A unique key for this UI state in the location state object
 * @param {any} initialValue - Initial state value (typically false or null)
 * @returns {[any, function]} - [state, setState] tuple, similar to useState
 */
export function useHistoryUIState(key, initialValue = null) {
  const navigate = useNavigate();
  const location = useLocation();

  // The state is derived directly from the router's location.state
  const currentState = location.state && location.state[key] !== undefined 
    ? location.state[key] 
    : initialValue;
  
  // Keep refs for the latest values to avoid stale closures in setState without 
  // changing the setState function identity on every render.
  const latestRef = useRef({ state: currentState, location });
  useEffect(() => {
    latestRef.current = { state: currentState, location };
  });

  const setState = useCallback((valOrFn) => {
    const { state, location } = latestRef.current;
    const val = typeof valOrFn === 'function' ? valOrFn(state) : valOrFn;

    if (val === initialValue) {
       // We are closing the UI state
       // Only navigate back if the state was actually open in the history
       if (location.state && location.state[key] !== undefined) {
         navigate(-1);
       }
    } else {
       // We are opening or updating the UI state
       const isCurrentlyOpen = location.state && location.state[key] !== undefined;
       
       navigate(location.pathname + location.search + location.hash, {
         state: { ...location.state, [key]: val },
         // If it's already open, replace the state so we don't add multiple entries 
         // for updates (e.g. going to next image in lightbox)
         replace: isCurrentlyOpen
       });
    }
  }, [navigate, key, initialValue]);

  return [currentState, setState];
}
