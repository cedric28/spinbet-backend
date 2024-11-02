import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',            // Use ts-jest preset for TypeScript
  testEnvironment: 'node',     // Set the environment for tests to Node.js
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore test paths
  testTimeout: 10000, // 10 seconds
};

export default config;
