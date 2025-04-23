# PR Review Checklist

This checklist helps ensure that all Pull Requests meet our quality standards before being merged. Use it when reviewing PRs or creating your own.

## Code Quality

- [ ] Code follows the project's style guidelines and naming conventions
- [ ] Code is properly formatted (ESLint/Prettier checks pass)
- [ ] No TypeScript errors or warnings (runs with `--strict` flag)
- [ ] No console.log statements in production code (except for critical errors)
- [ ] No `// TODO` comments without associated issues
- [ ] No unused imports, variables, or dependencies
- [ ] Imports are organized logically 
- [ ] All functions and components have appropriate JSDoc comments
- [ ] Complex logic includes explanatory comments

## Security

- [ ] User input is properly validated (using Zod or similar)
- [ ] No sensitive information is exposed to the client
- [ ] Authentication is properly implemented for protected routes
- [ ] Database queries are protected against injection
- [ ] API routes include proper authorization checks
- [ ] No hard-coded secrets or credentials

## Performance

- [ ] Components are properly memoized where needed
- [ ] Large data fetching operations use proper pagination
- [ ] No unnecessary re-renders in React components
- [ ] Client-side components only used when needed for interactivity
- [ ] Images are optimized and use Next.js Image component
- [ ] Database queries are optimized with appropriate indexes

## Accessibility

- [ ] All interactive elements are keyboard accessible
- [ ] All form fields have associated labels
- [ ] Proper ARIA attributes are used where needed
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] No content relies solely on color to convey meaning
- [ ] Images have appropriate alt text

## Testing

- [ ] Tests are included for new functionality
- [ ] Existing tests pass
- [ ] Edge cases are tested
- [ ] Test coverage meets project standards
- [ ] Tests are meaningful and test behavior, not implementation

## Documentation

- [ ] Code changes are well-documented with comments
- [ ] API endpoints are documented
- [ ] README is updated if needed
- [ ] Environment variables are documented in .env.example
- [ ] Changes to the workflow or build process are documented

## Final Checks

- [ ] PR description clearly explains the changes and reasons
- [ ] PR references related issues
- [ ] PR has been tested in development environment
- [ ] Code builds successfully in CI pipeline
- [ ] All requested changes from previous reviews have been addressed 