// setupTests.js

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

require('jest-fetch-mock').enableFetchMocks();

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// MOCK MANUAL: Evita el error de resolución de módulos internos
jest.mock('react-router-dom', () => ({
    // Componentes básicos como stubs (evitan el error de "undefined")
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    NavLink: ({ to, children }) => <a href={to}>{children}</a>,
    MemoryRouter: ({ children }) => <>{children}</>,
    Routes: ({ children }) => <>{children}</>,
    Route: ({ element }) => element,
    // Hooks mockeados para tests unitarios
    useNavigate: () => jest.fn(),
    useLocation: () => ({ 
        pathname: '/',
        search: '',
        hash: '',
        state: null,
    }),
    useParams: () => ({}),
}));

jest.mock('axios');