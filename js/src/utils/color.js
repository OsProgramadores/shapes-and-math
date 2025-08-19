/**
 * Color utility functions
 */

/**
 * Generates a random hex color
 * @returns {string} Random hex color (e.g., "#A1B2C3")
 */
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Alias for backward compatibility
export const get_random_color = getRandomColor;
