setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']

import fetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

fetchMock.enableMocks();