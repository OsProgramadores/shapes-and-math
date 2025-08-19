import { DEFAULT_DOTS_QUANTITY } from '../config/constants.js';

/**
 * Initializes the slider UI component
 * @returns {Object} Slider configuration with value and element references
 */
export const initializeSlider = () => {
  const slider = document.getElementById("myRange");
  const output = document.getElementById("sliderValue");
  
  if (!slider || !output) {
    console.warn('Slider elements not found');
    return { value: DEFAULT_DOTS_QUANTITY };
  }
  
  output.textContent = slider.value;
  
  slider.oninput = function() {
    output.textContent = this.value;
  };
  
  return {
    value: () => Number.parseInt(output.textContent || DEFAULT_DOTS_QUANTITY, 10),
    element: slider,
    outputElement: output
  };
};

/**
 * Gets the current quantity of dots from the slider
 * @returns {number} The number of dots selected by the user
 */
export const getQuantityOfDotsSelectedByUser = () => {
  const output = document.getElementById('sliderValue');
  if (!output) {
    console.warn('Slider value element not found');
    return DEFAULT_DOTS_QUANTITY;
  }
  return Number.parseInt(output.textContent || DEFAULT_DOTS_QUANTITY, 10);
};
