/**
 * Netlify Edge Function for Enhanced Security and Performance
 * Runs at the edge for faster response times
 */

export default async (request, context) => {
  // Get the response from the origin
  const response = await context.next();
  
  // Add additional security headers at the edge
  const headers = new Headers(response.headers);
  
  // Timing information for debugging
  headers.set('X-Edge-Location', context.geo?.city || 'unknown');
  headers.set('X-Edge-Country', context.geo?.country?.code || 'unknown');
  
  // Additional performance headers
  headers.set('X-Response-Time', Date.now().toString());
  
  // Return modified response
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

export const config = {
  path: "/*",
  // Exclude API and function routes from edge processing
  excludedPath: ["/api/*", "/.netlify/*"]
};
