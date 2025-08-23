let canvasContainer = null;
let div = null;  // Declare the div variable
let resizeObserver = null;
let resizeTimeout;

/**
 * Loads or reloads a canvas in the specified container
 * @param {string} id - The ID of the container element
 * @returns {HTMLCanvasElement | null} The created canvas element or null if container not found
 */
export function loadCanvas(id) {
    try {
        // Save container id on first load
        canvasContainer = id;
        
        // Get container element
        const container = document.getElementById(id);
        if (!container) {
            console.error(`Container with id "${id}" not found`);
            return null;
        }
        
        // Store reference to container
        div = container;
        
        // Remove any existing canvas
        container.innerHTML = '';
        
        // Create and append a new canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'main-canvas';
        updateCanvasSize(canvas);
        container.appendChild(canvas);
        
        // Set up responsive resizing
        setupResizeObserver(container, canvas);
        
        return canvas;
    } catch (error) {
        console.error('Error in loadCanvas:', error);
        return null;
    }
}

/**
 * Updates the canvas size based on its container
 * @param {HTMLCanvasElement} canvas - The canvas element to resize
 */
function updateCanvasSize(canvas) {
    if (!canvas || !canvas.parentElement) return;
    
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    
    // Set canvas size to match container
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Optional: Maintain aspect ratio if needed
    // const size = Math.min(rect.width, rect.height);
    // canvas.width = size;
    // canvas.height = size;
}

/**
 * Sets up a ResizeObserver to handle container resizing
 * @param {HTMLElement} container - The container element
 * @param {HTMLCanvasElement} canvas - The canvas element to resize
 */
function setupResizeObserver(container, canvas) {
    // Clean up previous observer if it exists
    if (resizeObserver) {
        resizeObserver.disconnect();
    }
    
    // Create new observer
    resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target === container) {
                updateCanvasSize(canvas);
            }
        }
    });
    
    // Start observing the container
    resizeObserver.observe(container);
}

// Handle window resize as a fallback
const handleResize = () => {
    if (div) {
        const canvas = document.getElementById('main-canvas');
        if (canvas) {
            updateCanvasSize(canvas);
        }
    }
};

// Use requestAnimationFrame to throttle resize events
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100);
});

// Cleanup function to remove event listeners
export function cleanup() {
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
    window.removeEventListener('resize', handleResize);
    div = null;
    canvasContainer = null;
}
