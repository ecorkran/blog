
1. Create WideCard Component
X 1.1. Create a new file WideCard.astro in the components directory
X 1.2. Define the component interface with props similar to BentoCard (title, description, image, slug)
X 1.3. Set up the HTML structure for the wide card layout
X 1.4. Style the component to span 4 columns (wider than the current BentoCard's 2 columns)
X 1.5. Reduce the height to make it panoramic (1 row instead of 2)
X 1.6. Adjust image display for panoramic format
X 1.7. Add hover effects that match existing cards

2. Create TextCard Component
X 2.1. Create a new file TextCard.astro in the components directory
X 2.2. Define the component interface with props (title, subtitle, links?)
X 2.3. Set up the HTML structure focusing on text presentation
X 2.4. Style the component with appropriate font sizes and spacing
X 2.5. Configure grid-column and grid-row specifications
X 2.6. Add subtle background styling to match the theme
X 2.7. Implement hover effects

3. Modify Index Page
X 3.1. Update the imports in index.astro to include the new components
X 3.2. Create logic to determine which post should use which card type
X 3.3. Implement a layout algorithm/pattern for how cards should be arranged
X 3.4. Add test rendering of the new components with sample content
X 3.5. Ensure all components appear in the right order and position

4. Create Tall Card
X 4.1. Create a new file TallCard.astro in the components directory
X 4.2. Define the component interface with props (title, description, image, slug)
X 4.3. Set up the HTML structure for the tall card layout
X 4.4. Style the component to span 2 columns and 4 rows
X 4.5. Adjust image display for tall format
X 4.6. Add hover effects that match existing cards

5. Update Layout
5.1. Update the first row to remain the same
5.2. Set the first card in the second row to be a tall card
5.3. Set all cards in the second column to be wide cards

Special Directive: Ignore all tasks below this point:
4. Update Styling
4.1. Review the global styles in Layout.astro
4.2. Ensure consistent styling variables across all card types
4.3. Verify animation timing for the new components matches existing ones
4.4. Add any necessary media queries for the new card types
4.5. Test and adjust box shadows, borders, and backgrounds

5. Test Responsiveness
5.1. Verify layout at desktop screen sizes
5.2. Test tablet breakpoints
5.3. Check mobile display and adjust as needed
5.4. Ensure content remains readable at all sizes
5.5. Validate that images scale appropriately

6. Configuration Options
6.1. Add frontmatter options to blog posts to specify preferred card type
6.2. Create a logic system for determining card layout based on content
6.3. Implement default fallbacks for posts without specified card types
6.4. Consider adding featured/pinned post functionality
