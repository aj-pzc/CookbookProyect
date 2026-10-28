import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import type { ReactNode } from "react";

require('jest-fetch-mock').enableFetchMocks();

Object.defineProperty(globalThis, "TextEncoder", { value: TextEncoder });
Object.defineProperty(globalThis, "TextDecoder", { value: TextDecoder });

// MOCK MANUAL: Evita el error de resolución de módulos internos
jest.mock('react-router-dom', () => ({
    // Componentes básicos como stubs (evitan el error de "undefined")
    Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
    NavLink: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
    MemoryRouter: ({ children }: { children: ReactNode }) => <>{children}</>,
    Routes: ({ children }: { children: ReactNode }) => <>{children}</>,
    Route: ({ element }: { element: ReactNode }) => element,
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