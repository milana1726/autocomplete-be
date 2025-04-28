import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic
);
