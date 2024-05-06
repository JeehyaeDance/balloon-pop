# 안녕하세요. 슈퍼블록 [Superblock] Front-End Engineer 포지션에 지원한 이지혜입니다.

아래는 슈퍼블록 Front-End Engineer 과재테스트 웹 기반 게임 구현에 대한 정보입니다.

## 실행방법

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 디렉토리 구조

- src
  - app
    - globals.css
    - layout.tsx: 첫 home 페이지의 layout 이며 meta data와 ThemeProvider를 가장 상위 layer로 두고 있습니다.
    - page.tsx: 첫 페이지 입니다. header, DarkMode, 그리고 Board component를 렌더합니다.
  - components
    - board.tsx: 메인 게임 보드 component입니다. 게임관련 메세지, 격자판, 격자판 사이즈 조절 input, 시작버튼이 있습니다.
    - darkMode.tsx: 게임 페이지를 다크 테마로 전환할 수 있는 코글버튼 입니다.
    - provider.tsx: 다크 테마에 사용되는 ThemeProvider입니다.
    - square.tsx: 격자 component입니다. data가 0일때 빈칸, 1일때 풍선을 표시합니다.
  - hooks
    - useBoard.ts: 게임 상태를 local storage에 저장하고 관리하는 custom hook입니다.
  - reducers
    - boardReducer.ts: 게임 상태 관리에 사용되는 상태 type들과 함수들입니다.
  - utils
    - gameLogic.ts: 게임에 사용되는 helper function들 입니다.
    - localstorage.ts: local storage에서 data를 가져오고 저장하는 function입니다.

## 기능 구현

1. 첫 페이지에서 기본 6x6 격자판이보이고 Start 버튼을 누르면 각 격자에 풍선 또는 빈칸으로 표시됩니다.

2. 격자의 크기를 NxN으로 조절할 수 있습니다. 격자의 크기는 2~12 까지로 설정할 수 있습니다. 게임 도중 격자의 크기가 조정되면, 진행 중인 게임은 없어지고 NxN으로 생성된 빈 격자판이 생성됩니다.

3. 페이지를 새로고침하거나 다른 탭에서 게임을 실행했을 경우 이전에 게임 상태 그대로 진행할 수 있습니다. (개발 환경에서는 http://localhost:3000를 사용)

4. 게임이 시작되고 풍선을 클릭 시 상하좌우로 연결된 풍선을이 모두 터지게 됩니다.

5. 한번에 가장 많은 풍선을 터뜨릴 수 있는 순서대로 풍선을 클릭해야 하고, 이 조건에 맞지 앉는 풍선을 클릭하면 "You've lost. Press Restart to play again."라는 메세지가 표시됩니다.

6. 게임이 끝나면 격자 안에 남은 풍선은 클릭 할수 없습니다. 새 게임을 하려면 Restart버튼을 누를 수 있습니다.

7. 격자판 위에 해 모양 아이콘을 누르면 다크모드로, 다크모드에서는 달 모양 아이콘을 누르면 라이트모드로 전환됩니다.

## 다음 스텝

만약 다른 개발자들과 함께 하는 실제 프로젝트이고 시간이 더 있다면, 다음과 같은 구현을 할 것입니다.

1. Logging - 유저들의 동작을 보다 쉽게 추적하고 잠재적인 버그를 보고받고 캐치할 수 있습니다.

2. 자동화된 테스트 - 가능한 많은 사용자의 행동을 시뮬레이션하기 위해 보다 철저한 end-to-end 테스트를 작성하는데 시간을 쓸 것입니다.
