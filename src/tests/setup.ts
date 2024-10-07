import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

// 각 단위 테스트가 진행되기 전 실행되는 함수
beforeAll(() => {
  console.log('root - beforeAll');
});

// 각 단위 테스트가 진행되고 스코프를 초기화한다.
afterEach(() => {
  cleanup();
});
