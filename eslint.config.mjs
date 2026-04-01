import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/', '.next/', 'out/', 'build/'],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  }
);
