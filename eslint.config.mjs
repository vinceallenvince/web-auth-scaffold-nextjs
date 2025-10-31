import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configuration
  {
    ignores: [
      // dependencies
      "**/node_modules/**",
      "**/.pnp/**",
      "**/.pnp.js",

      // testing
      "**/coverage/**",

      // next.js
      "**/.next/**",
      "**/out/**",
      "**/build/**",

      // misc
      "**/.DS_Store",
      "**/*.pem",

      // debug
      "**/npm-debug.log*",
      "**/yarn-debug.log*",
      "**/yarn-error.log*",
      "**/.pnpm-debug.log*",

      // turbo
      "**/.turbo/**",

      // generated files
      "**/src/generated/**"
    ]
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // JSDoc configuration
  {
    plugins: {
      jsdoc
    },
    rules: {
      // Require JSDoc comments for exported functions and classes
      "jsdoc/require-jsdoc": ["warn", {
        publicOnly: true,
        require: {
          FunctionDeclaration: true,
          ClassDeclaration: true,
          MethodDefinition: false
        },
        contexts: [
          "ExportNamedDeclaration > FunctionDeclaration",
          "ExportNamedDeclaration > VariableDeclaration",
          "ExportDefaultDeclaration > FunctionDeclaration"
        ]
      }],
      // Require description in JSDoc
      "jsdoc/require-description": ["warn", {
        contexts: ["any"]
      }],
      // Require @param for function parameters
      "jsdoc/require-param": "warn",
      // Require @returns for functions that return values
      "jsdoc/require-returns": "warn",
      // Check param names match function signature
      "jsdoc/check-param-names": "error",
      // Enforce valid JSDoc types
      "jsdoc/check-types": "warn",
      // Ensure JSDoc comments are valid
      "jsdoc/valid-types": "warn",
      // Don't require @param descriptions (optional)
      "jsdoc/require-param-description": "off",
      // Don't require @returns descriptions (optional)
      "jsdoc/require-returns-description": "off"
    }
  },
  
  // Add specific rules for script files
  {
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  
  // Add specific rules for prisma files
  {
    files: ["prisma/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  
  // Add specific rules for test files
  {
    files: ["**/test/**/*.ts", "**/test/**/*.tsx"],
    rules: {
      // Allow unused variables in test files
      "@typescript-eslint/no-unused-vars": "off",
      
      // Allow 'any' type in test helpers
      "@typescript-eslint/no-explicit-any": "off",
      
      // Disable React hooks rules in test files
      "react-hooks/rules-of-hooks": "off"
    }
  },
  
  // Add specific rules for generated files (Prisma)
  {
    files: ["**/generated/**/*.js", "**/generated/**/*.ts", "**/generated/**/*.d.ts"],
    rules: {
      // Disable TypeScript-related rules for generated files
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off"
    }
  },
  
  // React component specific rules
  {
    files: ["**/*.tsx"],
    rules: {
      // Allow unescaped entities in React components
      "react/no-unescaped-entities": "off",
      // Relax JSDoc requirements for React components with destructured props
      "jsdoc/check-param-names": "off",
      "jsdoc/require-param": "off"
    }
  },
  
  // Strict JSDoc rules for library/utility files
  {
    files: ["src/lib/**/*.ts", "src/lib/**/*.tsx"],
    rules: {
      // Keep strict checking for lib files
      "jsdoc/check-param-names": "error",
      "jsdoc/require-param": "warn"
    }
  },
  
  // Override Next.js page rules for specific files
  {
    files: ["src/app/verify-db/page.tsx"],
    rules: {
      // Allow HTML links in the verify-db page
      "@next/next/no-html-link-for-pages": "off"
    }
  },
  
  // Address specific issues in lib files
  {
    files: ["src/lib/**/*.ts"],
    rules: {
      // Allow unused variables in catch blocks and destructuring (common in error handling)
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_|^data$",
        "caughtErrorsIgnorePattern": "^e$|^err$|^error$",
        "destructuredArrayIgnorePattern": "^_|^data$"
      }]
    }
  }
];

export default eslintConfig;
