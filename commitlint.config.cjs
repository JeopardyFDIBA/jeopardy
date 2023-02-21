/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'sentence-case'],
    'header-max-length': [2, 'always', 120],
  },
};
