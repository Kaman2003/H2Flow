module.exports = {
  
  env: {
    es2022: true,
    node: true,
  },
  scripts: {
  "lint": "eslint . --max-warnings=0 --quiet",
  "serve": "firebase emulators:start --only functions",
  "deploy": "firebase deploy --only functions"
},
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module"
  },
  extends: [
    "google"
  ],
  plugins: ["node"],
  rules: {
    "quotes": ["error", "double"],
    "no-undef": "off",
    "require-jsdoc": "off"
  },
  globals: {
    "process": "readonly",
    "admin": "readonly",
    "functions": "readonly"
  }
};