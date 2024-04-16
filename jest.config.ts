// jest.config.js
import { defaults } from 'jest-config'
import { pathsToModuleNameMapper } from 'ts-jest'
import tsConfig from './tsconfig.json'

module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  // moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
}
