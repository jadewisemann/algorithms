# machine coding day 01: tick-tack-toe

## 명세

### 📂 기본 환경 (Setup)

* **파일:** `index.html`, `style.css`, `script.js` (단 3개)
* **라이브러리:** 사용 금지 (Pure Vanilla JS)
* **제한 시간:** 45분

---

### 1. 기능 요구사항 (Functional Requirements)

사용자 관점에서 반드시 동작해야 하는 기능이다.

1. **게임 보드:** 3x3 격자(Grid)가 렌더링 되어야 한다.
2. **플레이어 턴:**
* Player 'X'가 항상 먼저 시작한다.
* 클릭할 때마다 'X'와 'O'가 번갈아 가며 표시된다.


3. **승리 판별 (Win Condition):**
* 가로, 세로, 대각선 중 하나라도 같은 마크가 3개 연속되면 게임이 종료된다.
* 게임이 종료되면 상단에 "Winner: X" 또는 "Winner: O"를 표시한다.
* **중요:** 승자가 결정된 후에는 보드를 클릭해도 아무 반응이 없어야 한다.


4. **무승부 (Draw):**
* 승자가 없는데 모든 칸이 채워지면 "Draw!"를 표시한다.


5. **초기화 (Reset):**
* 'Reset' 버튼을 누르면 게임 상태와 UI가 완전히 초기화되어야 한다.


6. **무르기 (Undo) - *핵심 변별력*:**
* 'Undo' 버튼을 누르면 가장 최근 수(Turn) 하나가 취소되고, 이전 플레이어의 차례로 돌아간다.
* 보드가 비어있거나, 게임이 끝난 상태에서는 Undo가 동작하지 않거나 비활성화되어야 한다.



---

### 2. 기술 요구사항 (Technical Constraints)

**코드를 보는 사람이 평가하는 진짜 항목**이다. 기능이 돌아가도 이걸 어기면 탈락이다.

1. **상태(State)와 뷰(View)의 분리:**
* 절대로 `document.getElementById('cell-1').innerText` 따위로 현재 게임 상태를 확인하지 마라.
* 자바스크립트 변수(예: `board = [null, 'X', null, ...]`)가 진실(Source of Truth)이고, HTML은 그것을 보여주는 껍데기여야 한다.
* `state`가 변경되면 `render()` 함수가 호출되어 화면을 그리는 구조를 갖춰라.


2. **이벤트 위임 (Event Delegation):**
* 9개의 셀(Cell) 각각에 `addEventListener`를 달지 마라.
* 부모 컨테이너(Board) 하나에만 이벤트를 달아서 처리해라.


3. **코드 가독성:**
* 승리 조건을 확인하는 로직(`checkWinner`)을 별도 함수로 분리해라.
* `if (cells[0] === 'X' && cells[1] === 'X' ...)` 처럼 하드코딩 하지 말고, 승리 조합 배열(Winning Combinations)을 활용해라.



---

### 3. UI 가이드 (Visual Specs)

디자인은 투박해도 되지만, 사용성(UX)은 지켜야 한다.

* **Grid:** CSS Grid나 Flexbox를 사용하여 중앙 정렬된 3x3 박스를 만들어라.
* **Cell:** 클릭 가능한 영역임을 알 수 있게 마우스 오버 시 커서가 `pointer`로 바뀌거나 배경색이 살짝 변해야 한다(Hover effect).
* **Feedback:** `alert()` 함수 사용 금지. 모든 메시지는 HTML 텍스트로 화면에 표시해라.

---

### 💡 구현 힌트 (접근 순서)

막막하다면 이 순서대로 코드를 작성해라. (이게 구조적 사고다)

1. **HTML 구조 잡기:** `div.board` 안에 9개의 `div.cell` (혹은 JS로 동적 생성), 그리고 상태 메시지 영역, 버튼 2개.
2. **CSS 레이아웃:** 3x3 격자를 화면 중앙에 배치.
3. **JS 상태 설계:** `board` 배열, `currentPlayer` 변수, `history` 배열(Undo용), `isGameActive` 불리언 값 정의.
4. **이벤트 리스너 연결:** 부모 요소에 클릭 이벤트 연결 후 `e.target` 확인.
5. **게임 로직 구현:** 클릭 -> 상태 업데이트 -> 승리 체크 -> 턴 변경 -> 렌더링.
6. **Undo 구현:** `pop()`을 활용하여 `history` 관리.
