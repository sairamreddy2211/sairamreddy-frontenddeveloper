const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

// Custom nodes representing page elements
export const initialNodes = [
  {
    id: 'header',
    type: 'input',
    data: { label: 'Page Header' },
    position,
  },
  {
    id: 'navigation',
    data: { label: 'Navigation Bar' },
    position,
  },
  {
    id: 'main-content',
    data: { label: 'Main Content' },
    position,
  },
  {
    id: 'sidebar',
    data: { label: 'Sidebar' },
    position,
  },
  {
    id: 'article-1',
    data: { label: 'Article Section 1' },
    position,
  },
  {
    id: 'article-2',
    data: { label: 'Article Section 2' },
    position,
  },
  {
    id: 'article-3',
    data: { label: 'Article Section 3' },
    position,
  },
  {
    id: 'cta',
    data: { label: 'Call To Action' },
    position,
  },
  {
    id: 'footer',
    type: 'output',
    data: { label: 'Page Footer' },
    position,
  },
];

// Connections between page elements showing hierarchy
export const initialEdges = [
  { id: 'e-header-nav', source: 'header', target: 'navigation', type: edgeType, animated: true },
  { id: 'e-nav-main', source: 'navigation', target: 'main-content', type: edgeType, animated: true },
  { id: 'e-main-sidebar', source: 'main-content', target: 'sidebar', type: edgeType, animated: true },
  { id: 'e-main-art1', source: 'main-content', target: 'article-1', type: edgeType, animated: true },
  { id: 'e-art1-art2', source: 'article-1', target: 'article-2', type: edgeType, animated: true },
  { id: 'e-art2-art3', source: 'article-2', target: 'article-3', type: edgeType, animated: true },
  { id: 'e-art3-cta', source: 'article-3', target: 'cta', type: edgeType, animated: true },
  { id: 'e-cta-footer', source: 'cta', target: 'footer', type: edgeType, animated: true },
];
