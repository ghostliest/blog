const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@ui$": "<rootDir>/src/components/ui",
    "^@hooks$": "<rootDir>/src/hooks",
    "^@services$": "<rootDir>/src/services",
    "^@utils$": "<rootDir>/src/utils",
    "^@constants$": "<rootDir>/src/constants",
    "^@store": "<rootDir>/src/store",
    "^@tests": "<rootDir>/src/tests/utils",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = createJestConfig(customJestConfig);
