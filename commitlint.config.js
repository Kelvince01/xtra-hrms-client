/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  'rules': {
    'type-enum': [
      2,
      'always',
      ['ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style'],
    ],
  },
};
