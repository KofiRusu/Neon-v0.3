// Jest setup file for Dashboard app (Next.js React app)

import '@testing-library/jest-dom';

// Set test timeout
jest.setTimeout(30000);

// Setup test environment variables
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_TRPC_URL = 'http://localhost:3001';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    toString: jest.fn(() => ''),
  }),
  usePathname: () => '/',
  useParams: () => ({}),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// Mock tRPC for testing
jest.mock('@/lib/trpc', () => ({
  trpc: {
    useQuery: () => ({ data: null, isLoading: false, error: null }),
    useMutation: () => ({ 
      mutate: jest.fn(), 
      isLoading: false, 
      error: null 
    }),
    campaign: {
      list: {
        useQuery: () => ({ data: [], isLoading: false }),
      },
      create: {
        useMutation: () => ({ mutate: jest.fn() }),
      },
    },
    email: {
      generateSequence: {
        useMutation: () => ({ mutate: jest.fn() }),
      },
      getAnalytics: {
        useQuery: () => ({ data: null, isLoading: false }),
      },
    },
    social: {
      getCredentials: {
        useQuery: () => ({ data: null, isLoading: false }),
      },
    },
  },
}));

// Mock external APIs
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Setup and cleanup for each test
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

afterEach(() => {
  // Cleanup after each test
  jest.restoreAllMocks();
});