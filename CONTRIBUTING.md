# Contributing to UIEffects

Thank you for your interest in contributing to UIEffects! This document explains how to contribute and what to expect.

## Code of Conduct

- Be respectful and inclusive
- Consider diverse perspectives
- Provide constructive feedback
- Focus on the code, not the person

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/ui-effects.git
   cd ui-effects
   ```

2. **Set up development environment**
   ```bash
   npm install
   npm run build:dev
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Make Your Changes

- Keep changes focused and atomic
- One feature per pull request
- Update tests if needed

### 2. Run Tests and Build

```bash
npm test
npm run build:dev
```

### 3. Check Code Quality

- Ensure no console errors
- Test in multiple browsers
- Verify performance with `UIEffects.getMetrics()`
- Check bundle size: `npm run build`

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### Commit Message Format

Use semantic commit messages:

```
feat: add wind mode configuration
fix: resolve particle collision detection bug
docs: update API reference for new methods
perf: optimize wind calculation algorithm
test: add unit tests for ParticleSystem
refactor: simplify accumulation smoothing
chore: update dependencies
```

## Pull Request Process

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a pull request on GitHub**
   - Title: Clear, concise description
   - Description: What changes, why, how to test
   - Reference any related issues

3. **PR Checklist**
   - [ ] Code follows style guide
   - [ ] Tests pass locally
   - [ ] Build successful
   - [ ] No console errors
   - [ ] Performance acceptable
   - [ ] Documentation updated
   - [ ] No unrelated changes

4. **Respond to review feedback**
   - Be open to suggestions
   - Request clarification if needed
   - Update code as requested
   - Re-request review after updates

## Code Style Guide

### JavaScript Style

- Use 2-space indentation
- Use semicolons
- Use `const` by default, `let` only when needed
- Avoid `var`

```javascript
// ✅ Good
const maxFlakes = 2000;
const windStrength = 16;

function calculatePhysics(flake, delta) {
  // Implementation
}

// ❌ Bad
var MAX_FLAKES = 2000;
windStrength = 16;
function calculatePhysics(flake,delta){
  // Implementation
}
```

### Naming

- **Classes:** `PascalCase` - `ParticleSystem`
- **Functions/variables:** `camelCase` - `calculateWind`
- **Constants:** `UPPER_SNAKE_CASE` - `MAX_HEIGHT`
- **Private:** Leading underscore - `_internalMethod`

### Comments

```javascript
// ===================================================================
// SECTION NAME
// ===================================================================

/**
 * Description of what the function does
 * @param {Type} name - Parameter description
 * @returns {Type} Return value description
 */
function myFunction(name) {
  // Explain why, not what
  return result;
}
```

### Formatting

- Max line length: 100 characters (soft limit)
- Use 2-space indentation
- Space after control keywords: `if (condition) {`
- No trailing whitespace

## Testing Guidelines

### Test Coverage

Write tests for:
- New features
- Bug fixes
- Edge cases
- Error conditions

### Test Structure

```javascript
describe('ModuleName', () => {
  it('should do expected behavior', () => {
    // Arrange
    const input = 'value';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

## Documentation

Update documentation for:
- New public APIs
- Changed behavior
- Configuration options
- Examples

**Files to update:**
- `README.md` - If user-facing feature
- `docs/API_REFERENCE.md` - If new API methods
- `docs/DEVELOPMENT.md` - If architecture change
- `examples/` - If new use case

## Types of Contributions

### 🐛 Bug Fixes

1. Describe the bug thoroughly
2. Include reproduction steps
3. Show expected vs actual behavior
4. Propose a fix if you have one

### ✨ Features

1. Discuss the feature in an issue first (optional)
2. Keep it focused and non-breaking
3. Provide documentation
4. Include examples

### 📚 Documentation

- Typos and clarity
- Missing examples
- Outdated information
- Better organization

### ⚡ Performance

- Benchmark improvements
- Profile before/after
- Document optimization

### ♿ Accessibility

- Improve ARIA labels
- Better keyboard support
- Wider browser compatibility

## Area Specific Guidance

### Core Physics (`src/core/`)

**When modifying:**
- Test across multiple browsers
- Verify performance impact
- Check for memory leaks
- Profile with DevTools

**Performance targets:**
- 60 FPS on modern hardware
- Graceful degradation on low-end
- <15 KB bundle size

### UI Components (`src/ui/`)

**When modifying:**
- Test accessibility (keyboard, screen readers)
- Ensure mobile-friendly
- Verify localStorage fallback
- Check for memory leaks

### Configuration (`src/config/`)

**When modifying:**
- Update documentation
- Provide sensible defaults
- Consider performance impact
- Test with different values

## Common Issues & Solutions

### ESBuild Errors

```bash
# Clear and rebuild
rm -rf dist/
npm run build
```

### Dependencies Issue

```bash
# Reinstall packages
rm -rf node_modules package-lock.json
npm install
```

### Browser Issues

- Test in Chrome, Firefox, Safari, Edge
- Check DevTools console for errors
- Verify performance metrics

## Getting Help

- 💬 **GitHub Discussions** - Ask questions
- 🐛 **GitHub Issues** - Report bugs
- 📚 **Documentation** - Check API reference
- 💡 **Examples Folder** - See code examples

## Recognition

Contributors will be acknowledged in:
- GitHub contributors page
- CONTRIBUTORS.md file (created as project grows)

## Questions?

Don't hesitate to ask! Here are ways to reach out:

1. Open a discussion on GitHub
2. Comment on related issues
3. Check existing documentation
4. Look at similar contributions

Thank you for contributing to UIEffects! 🎉
