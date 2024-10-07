# config

## Node 모듈 설치

> npm i @types/node

<br>

## ESLint 설치 및 환경설정

- 주목적은 휴먼 에러를 잡기 위해

> npm install --save-dev eslint eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort eslint-plugin-testing-library eslint-plugin-vitest @typescript-eslint/eslint-plugin @typescript-eslint/parser @tanstack/eslint-plugin-query

### .eslintrc.cjs

```typescript
const vitest = require('eslint-plugin-vitest');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src/*'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    // 일단 vitest 작성하기 전 문제가 발생해서 주석 처리
    // 'plugin:vitest/recommended',
    'plugin:testing-library/react',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // we're using TypeScript here, not propTypes!
    'react/prop-types': 'off',

    // obscure error that we don't need
    'react/display-name': 'off',

    // to avoid "no-unused-vars" warnings in function type declarations
    // '@typescript-eslint/no-unused-vars': ['warn'],

    // imports
    'import/prefer-default-export': 0,
    'import/no-anonymous-default-export': 0,

    // sort alias imports that start with `@` separately from modules that start with `@`
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [['^\\u0000'], ['^@?\\w'], ['^@src', '^@shared'], ['^\\.']],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'sort-imports': 'off',
    'import/order': 'off',

    // eliminate distracting red squiggles while writing tests
    'vitest/expect-expect': 'off',
  },
  // don't flag vitest globals like `describe` and `test`
  globals: {
    // ...vitest.environments.env.globals,
    // 위의 설정은 env global 파일로 접근하기 때문에 설정하기 전에는 아래와 같이 명시적으로 설정
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    test: 'readonly',
  },
};
```

### 📒 package.json에 lint 명령어 수정

-
- --cache 옵션을 사용하면 lint 명령어를 입력할 때 모든 코드를 검사하지 않고 변경된 파일만 검사한다.
- tsc --noEmit를 통해 타입스크립트 체크를 실행한다.

```typescript
{
  "script": {
    ...
    "lint": "eslint . 'src/\*_/_.{js,jsx,ts,tsx}' --report-unused-disable-directives --max-warnings 0 --cache",
    "check": "tsc --noEmit",
    ...
  }
}
```

### vite.config.ts

```typescript
/* eslint-disable no-undef */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.join(__dirname, '../shared/'),
      '@': path.join(__dirname, 'src/'),
    },
  },
});
```

### vitest.config.ts

- vite 4버정 이후는 vitest와 vite 부분 분리 필요

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
```

<br>

## Prettier

[Prettier 공식문서](https://prettier.io/docs/en/index.html)

- 코드 작성 형식을 통일하기 위해

### prettier 설치

- eslint와 prettier를 함께 사용할 수 있게 해주는 plugin과 충돌을 방지해주는 config 설치

```typescript
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier
```

### .prettierrc.cjs 파일 생성

```typescript
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};
```

### plugin 연결 (.eslintrc.cjs 파일 수정)

- 또는 rules를 변경함으로 커스텀을 적용할 수 있다

```typescript
{
  ...
  "extends": "plugin:prettier/recommended",
  ...
}
```

### prettier 실행

- package.json에 코드 추가

```typescript
script: {
  ...
  "format": "prettier --cache --write .",
}
```

### vscode에서 저장시 quote 변경

- 주의사항: 밑의 링크처럼 설정 후 vscode 껐다 켜야 함

> [vsc 작업할 때 원하는 따옴표 설정](https://velog.io/@woals4815/VSC-%EC%9E%91%EC%97%85%ED%95%A0-%EB%95%8C-%ED%81%B0-%EB%94%B0%EC%98%B4%ED%91%9Csingle-quote-to-%EC%9E%91%EC%9D%80-%EB%94%B0%EC%98%B4%ED%91%9Cdouble-quote-%EB%B0%94%EA%BE%B8%EA%B8%B0)

<br>

## 테스트 도구 설치 (Vitest)

[Vitest 공식 문서](https://vitest.dev/guide/)

### vitest 설치 명령어

```typescript
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

### package.json 명령어 입력

```typescript
  "scripts": {
    "test": "vitest",
  }
```

### tests/setup.ts 파일 생성 및 설정

```typescript
// src/tests/setup.ts

import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// 각 단위 테스트가 진행되기 전 실행되는 함수
beforeAll(() => {
  console.log('root - beforeAll');
});

// 각 단위 테스트가 진행되고 스코프를 초기화한다.
afterEach(() => {
  cleanup();
});
```

### vitest.config.js 파일 생성 및 설정

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    // testMatch: ["./tests/**/*.test.tsx"],
    globals: true,
  },
});
```

### tsconfig.json, tsconfig.node.json 파일에 global 추가

```typescript
// tsconfig.json
// tsconfig.node.json

  "compilerOptions": {
    ...
    "types": ["vitest/globals"]
    ...
  },
```

### test 컴포넌트 만들기

```typescript
// src/tests/App.test.tsx

import { render, screen } from '@testing-library/react';
import App from '../src/App';
// import { describe, expect, it } from "vitest";

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    const headline = screen.getByText(/It works and you found me!/i);
    expect(headline).toBeInTheDocument();
  });
});

// App.tsx 파일 모습
import './App.css';

function App() {
  return (
    <div>
      <h1>It works and you found me!</h1>
    </div>
  );
}

export default App;
```

### 💩 Error 가 난다면 참고

#### 'Assertion<HTMLElement>' 형식에 'toBeInTheDocument' 속성이 없습니다

tsconfig.json 파일에 아래 코드 추가

```typescript
compileOptions: {
  "types": ["vitest/globals", "@testing-library/jest-dom"]
}
```

#### 'React'는 UMD 전역을 참조하지만 현재 파일은 모듈입니다

tsconfig.json 파일에 아래 코드 추가

```typescript
{
  "compilerOptions": {
      ...
    },
  "include": ["src", "**/*.tsx"]
}
```

그 외 참고 문서

- [DaleSeo](https://www.daleseo.com/vitest/)
- [Configure Vitest with React Testing Library](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb)

<br>

## Husky

- 코드 컨벤션을 지키지 위해 커밋 및 푸쉬 전 실행하는 명령어 커스텀

### 설치

- 주의: git이 먼저 init되어 있어야 한다

> npm install --save-dev husky
> npx husky init

### husky 명령어

echo "npm run lint" > .husky/pre-commit
echo "npm run format" > .husky/pre-commit

- 현재는 pre-commit에 lint와 format 명령어가 있고, pre-push에는 lint가 있다.

<br>

## nvm, .npmrc, .nvmrc

- node 18버전으로 강제하겠다는 명령어

```javascript
// package.json

  "engines": {
    "node": "18.x"
  },

// .npmrc
engine-strict=true
```

- 사용자가 nvm을 이용해 버전을 자동으로 맞추는 파일

```javascript
// .nvmrc

18

// .zshrc


autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  if [[ -f .nvmrc && "$(nvm version)" != "$(cat .nvmrc)" ]]; then
    nvm use
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc

```
