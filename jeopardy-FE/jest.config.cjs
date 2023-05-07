/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  moduleDirectories: ['./node_modules', 'src'],
  testEnvironment: 'jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.[a-z]*(css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
