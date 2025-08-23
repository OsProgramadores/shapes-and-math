import { jest } from '@jest/globals';

// Mock modules with ESM-safe API
const mockSetupCanvas = jest.fn();
const mockGetRandomColor = jest.fn();
const mockRegisterInterval = jest.fn((interval) => interval);

jest.unstable_mockModule('js/app.js', () => ({
  setupCanvas: mockSetupCanvas,
  get_random_color: mockGetRandomColor,
}));

jest.unstable_mockModule('js/classes/stick.js', () => ({
  Stick: jest.fn().mockImplementation(() => ({
    draw: jest.fn(),
  })),
}));

jest.unstable_mockModule('js/src/state/appState.js', () => ({
  registerInterval: mockRegisterInterval,
}));

// Import module under test *after* mocks are set
const { drawStick, stopStick } = await import('../random-stick-doll.js');

describe('random-stick-doll', () => {
  const originalSetInterval = global.setInterval;
  const originalClearInterval = global.clearInterval;

  let clearRectMock, contextMock, canvasMock, intervalId;

  beforeAll(() => {
    jest.useFakeTimers();

    // jsdom already gives us a document with createElement and body
    clearRectMock = jest.fn();
    contextMock = {
      clearRect: clearRectMock,
      beginPath: jest.fn(),
      arc: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
    };

    canvasMock = document.createElement('canvas');
    canvasMock.id = 'main-canvas';
    canvasMock.width = 100;
    canvasMock.height = 200;
    canvasMock.getContext = jest.fn().mockReturnValue(contextMock);
    document.body.appendChild(canvasMock);

    jest.spyOn(document, 'getElementById').mockImplementation((id) =>
      id === 'main-canvas' ? canvasMock : null
    );

    intervalId = 1234;
    global.setInterval = jest.fn((fn, ms) => intervalId);
    global.clearInterval = jest.fn();

    mockSetupCanvas.mockImplementation(() => [canvasMock, contextMock]);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    document.body.innerHTML = ''; // cleanup
    global.setInterval = originalSetInterval;
    global.clearInterval = originalClearInterval;
    jest.useRealTimers();
  });

  describe('drawStick', () => {
    it('clears previous interval and resets animation', () => {
      drawStick();

      expect(mockSetupCanvas).toHaveBeenCalled();
      expect(contextMock.clearRect).toHaveBeenCalledWith(0, 0, canvasMock.width, canvasMock.height);
      expect(global.setInterval).toHaveBeenCalled();
      expect(mockRegisterInterval).toHaveBeenCalledWith(intervalId);
    });

    it('does nothing if setupCanvas returns falsy values', () => {
      mockSetupCanvas.mockReturnValueOnce([null, null]);

      drawStick();

      expect(contextMock.clearRect).not.toHaveBeenCalled();
      expect(global.setInterval).not.toHaveBeenCalled();
    });
  });

  describe('stopStick', () => {
    it('clears interval and disables animation', () => {
      drawStick();
      jest.clearAllMocks();

      stopStick();

      expect(global.clearInterval).toHaveBeenCalledWith(intervalId);
    });

    it('does not throw if called multiple times', () => {
        expect(() => {
          stopStick();
          stopStick();
        }).not.toThrow();
      
        // No interval was active, so clearInterval should not be called
        expect(global.clearInterval).not.toHaveBeenCalled();
      });      
  });
});
