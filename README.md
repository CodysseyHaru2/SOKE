# 소크 (Soke)

사진과 가게 정보를 바탕으로 여러 SNS 채널용 홍보 문구를 만들고, 캠페인 단위로 저장하는 모바일 우선 React 웹앱입니다.

## 실행 방법

Node.js 20.19 이상이 필요합니다.

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5174`를 엽니다.

## 빌드

```bash
npm run build
npm run preview
```

- `npm run build`: 배포 파일을 `dist/`에 생성합니다.
- `npm run preview`: 빌드 결과를 `http://localhost:4173`에서 확인합니다.
- 정적 호스팅 서비스에서는 빌드 명령을 `npm run build`, 배포 폴더를 `dist`로 설정합니다.

## GitHub Pages 배포

`main` 브랜치에 푸시하면 GitHub Actions가 앱을 빌드하고 GitHub Pages에 자동 배포합니다.

- 배포 주소: `https://codysseyharu2.github.io/SOKE/`
- 수동 배포: GitHub 저장소의 `Actions` 탭에서 `Deploy to GitHub Pages` 작업을 실행합니다.
- 저장소의 `Settings → Pages → Build and deployment` 소스는 `GitHub Actions`를 사용합니다.

## 프로젝트 구조

```text
src/
├─ components/       화면 단위 React 컴포넌트
├─ lib/              채널, 저장소, 이미지, 문구 생성 로직
├─ App.jsx            전체 상태와 화면 흐름
├─ main.jsx           React 진입점
└─ styles.css         반응형 UI 스타일
```

## 저장 방식

로그인 이메일은 사용자를 구분하는 식별자로만 쓰입니다. 가게 정보와 캠페인은 현재 브라우저의 `localStorage`에 저장됩니다. 서버 계정 인증이나 여러 기기 간 동기화는 포함하지 않습니다.
