# CLAUDE.md - Guidelines for working with this Astro blog

## Build/Run Commands
- Dev server: `npm run dev` or `npm start`
- Build: `npm run build`
- Preview build: `npm run preview`

## Project Structure
- Blog posts: `/src/content/blog/*.md`
- Static assets: `/public/`
- Images: `/public/image/`
- Components: `/src/components/`
- Page layouts: `/src/layouts/`

## Code Style
- Follow existing component patterns for consistency
- Use TypeScript types where available
- Components use .astro file extension
- Use Astro's built-in markdown capabilities for blog content
- Prefer functional components over class components
- Follow existing naming conventions (PascalCase for components)
- Keep components modular and reusable when possible

When suggesting improvements, maintain compatibility with Astro's rendering system and conventions.

## General Guidelines
- If asked to generate only design, do not generate any code.
- Do not unnecessarily install packages
- Avoid overengineering.  Remember SOLID principles.
- When working with a tasks file, work only on the tasks requested.  Do not go on.  For example, if you are working on task 1, you can complete 1.1 - 1.n, but not 2 or 2.1 - 2.n.
- When completing a task, update it in the file if you can by placing an X followed by a space in front of it.

## Testing Guidelines
- Note: the following guidelines may apply more loosely to astro projects.  If in doubt, follow established standards for the platform in use.
- Use Test Driven Development principles where possible.
- When updating existing code, ensure tests are in place to verify existing functionality, then work on updates, and then add tests to confirm the new functionality.  