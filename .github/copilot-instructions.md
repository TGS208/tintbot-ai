# GitHub Copilot Instructions for Tintbot.ai

> **Purpose**: These instructions help GitHub Copilot provide more accurate, context-aware code suggestions that align with our project's architecture, coding standards, and conventions. This improves developer productivity and code consistency across the team.

## Project Overview

Tintbot.ai is an AI-powered platform designed for window tint professionals. The platform provides AI automation for lead qualification, appointment booking, social media content generation, and business analytics.

## Architecture

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router (HashRouter for static hosting)
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Radix UI primitives + custom components
- **Build System**: esbuild via custom build scripts
- **Deployment**: Netlify (primary), with support for Vercel and other platforms
- **Functions**: Netlify serverless functions for backend operations

## Key Technologies

- **React 18**: Modern React with hooks, no class components
- **TypeScript**: Strict mode enabled
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI primitives
- **Lucide React**: Icon library
- **esbuild**: Fast JavaScript bundler
- **Netlify**: Hosting, forms, and serverless functions

## Project Structure

```
tintbot-ai/
├── src/                          # Source code
│   ├── App.tsx                  # Main app with routing
│   ├── main.tsx                 # Entry point
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   └── [feature].tsx        # Feature-specific components
│   ├── pages/                   # Route pages
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities
│   └── services/                # API/service integrations
├── scripts/                      # Build and deployment scripts
│   ├── build.mjs                # Main build script
│   ├── optimize.mjs             # Post-build optimizations
│   └── validate-deployment.js   # Pre-deploy validation
├── netlify/
│   └── functions/               # Serverless functions
├── public/                       # Static assets
├── dist/                         # Build output (generated)
├── netlify.toml                 # Netlify configuration
├── tailwind.config.js           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Prefer type inference over explicit types when obvious
- Use interfaces for object shapes
- Use type aliases for unions and complex types
- Avoid `any` - use `unknown` if type is truly unknown

### React

- Use functional components with hooks
- No class components
- Use `useState`, `useEffect`, and other hooks appropriately
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Use React.FC sparingly; prefer explicit function declarations

### Component Structure

```tsx
import { useState } from 'react'
import { ComponentProps } from './types'

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState()
  
  // Component logic
  
  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  )
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme (slate, blue, orange accents)
- Use the custom theme variables defined in `tailwind.config.js`
- Prefer composition over custom CSS
- Use `className` consistently with template literals for dynamic classes
- Responsive design: mobile-first with `md:`, `lg:` breakpoints

### Naming Conventions

- **Components**: PascalCase (e.g., `TintBotAI.tsx`)
- **Files**: Match component names or use kebab-case for utilities
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive names

## Build & Development

### Commands

```bash
# Development
npm run dev              # Build in development mode

# Production
npm run build           # Build for production
npm run optimize        # Run post-build optimizations
npm run build:prod      # Build + optimize (used by Netlify)

# Validation
npm run validate        # Validate deployment readiness
npm run check-perf      # Check performance metrics
npm run deploy-check    # Full pre-deployment check
```

### Build Process

1. The build script (`scripts/build.mjs`) uses esbuild to bundle the application
2. It processes TypeScript, JSX, and CSS
3. Outputs to `dist/` directory
4. Post-build optimization (`scripts/optimize.mjs`) minifies and optimizes assets
5. Copies static files from `public/` to `dist/`

## Testing

- The project currently uses manual testing
- Test all forms on the demo/assessment pages
- Verify responsive design on mobile/tablet/desktop
- Check routing works correctly with HashRouter
- Test Netlify functions locally with `netlify dev`

## Dependencies

### Core Dependencies

- **React**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Styling
- **Radix UI**: Accessible UI primitives
- **Lucide React**: Icons
- **Zustand**: State management (if complex state needed)
- **React Hook Form + Zod**: Form validation

### Development Dependencies

- **esbuild**: Fast bundler
- **TypeScript**: Type checking
- **Autoprefixer**: CSS vendor prefixes
- **PostCSS**: CSS processing

## Forms & Functions

### Forms

The platform includes Netlify Forms for:
- Business assessment leads
- Newsletter subscriptions
- Partnership inquiries
- Contact form

All forms use:
- `netlify` attribute on the form tag
- Honeypot fields for spam protection
- Success redirects to `/success.html`

### Serverless Functions

Located in `netlify/functions/`:
- Lead capture and processing
- Google Sheets integration
- Email notifications
- Webhook receivers

## Deployment

### Netlify (Primary)

- Auto-deploys from GitHub main branch
- Build command: `npm run build:prod`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Configuration: `netlify.toml`

### Environment Variables

Set in Netlify dashboard:
- `SLACK_WEBHOOK_URL` - For lead notifications
- `SENDGRID_API_KEY` - For email notifications
- `NOTIFICATION_EMAIL` - Recipient email
- `GOOGLE_ANALYTICS_ID` - Analytics tracking

## Best Practices

### Performance

- Keep bundle size minimal
- Lazy load components when appropriate
- Optimize images (use WebP format)
- Use service worker for PWA capabilities
- Implement code splitting for routes

### Security

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate all form inputs
- Implement CSRF protection for forms
- Keep dependencies updated

### SEO

- Include meta tags in index.html
- Generate sitemap.xml (in public/)
- Use semantic HTML
- Add structured data (JSON-LD)
- Ensure fast load times

### Accessibility

- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Use Radix UI for accessible components

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in appropriate components
4. Update sitemap.xml

### Adding a New Component

1. Create file in `src/components/`
2. Follow component structure guidelines
3. Use TypeScript for props
4. Export as default
5. Import where needed

### Adding a Form

1. Add form in component with `netlify` attribute
2. Include honeypot field
3. Add form name to `netlify.toml`
4. Create success page if needed
5. Test submission in Netlify dashboard

### Styling Updates

1. Use existing Tailwind classes
2. Extend theme in `tailwind.config.js` if needed
3. Keep mobile-first approach
4. Test responsive behavior
5. Maintain consistent color scheme

## Troubleshooting

### Build Failures

- Check Node version (requires Node 18+)
- Run `npm install` to update dependencies
- Clear `dist/` and rebuild
- Check for TypeScript errors
- Review build logs for specific errors

### Routing Issues

- Remember this uses HashRouter (URLs have #)
- Check route paths in `App.tsx`
- Verify _redirects file for SPA routing

### Styling Issues

- Ensure Tailwind classes are valid
- Check for conflicting styles
- Verify theme values in config
- Clear browser cache

### Function Errors

- Test locally with `netlify dev`
- Check function logs in Netlify dashboard
- Verify environment variables are set
- Review function code for errors

## Documentation

- **Main README**: Project overview and quick start
- **NETLIFY_DEPLOYMENT_GUIDE.md**: Complete deployment guide
- **NETLIFY_QUICK_START.md**: Quick deployment checklist
- **OPTIMIZATION_SUMMARY.md**: Performance and optimization details
- **DEPLOYMENT_CHECKLIST.txt**: Pre-deployment verification

## Additional Notes

- The project uses a custom build system, not Create React App or Vite
- HashRouter is used for compatibility with static hosting
- All UI components follow Radix UI patterns
- The color scheme uses slate for dark backgrounds, blue for accents
- The project is production-ready and deployed on Netlify

## How GitHub Copilot Uses These Instructions

These instructions are automatically used by GitHub Copilot when:
- Providing code completions and suggestions
- Answering questions about the codebase
- Generating new code or components
- Refactoring existing code

Copilot will reference these instructions to ensure suggestions match the project's patterns, use the correct dependencies, and follow established conventions. This helps maintain code quality and consistency, especially for new contributors or when working on unfamiliar parts of the codebase.
