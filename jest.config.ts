import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'apps/**/*.{js,jsx,ts,tsx}',
    '!apps/**/*.spec.{js,jsx,ts,tsx}',
    '!apps/**/*.test.{js,jsx,ts,tsx}',
    '!apps/**/*.d.ts',
    '!apps/**/main.{js,jsx,ts,tsx}',
    '!apps/**/polyfills.{js,jsx,ts,tsx}',
    '!apps/**/environment*.{js,jsx,ts,tsx}',
  ],
});
