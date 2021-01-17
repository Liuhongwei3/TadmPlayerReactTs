module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    "prettier/prettier": "error",
    'max-params': ['error', 5],
    'no-new': "off",
    'no-unused-expressions': "off",
    'no-useless-backreference': "off",
    'no-unreachable-loop':"off",
    'no-promise-executor-return':"off",
    'react/no-unsafe': ["off", {checkAliases: false}],
    'default-case-last': "off",
    '@typescript-eslint/no-invalid-this': "off",
    '@typescript-eslint/no-loss-of-precision': "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/member-ordering": [
      "warn",
      {
        default: ["private-instance-method", "public-instance-method"]
      }
    ]
  }
};
