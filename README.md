
```
Client/
├── android/                    # Android 네이티브 코드
├── ios/                        # iOS 네이티브 코드
├── src/                        # 소스 코드 폴더
│   ├── assets/                 # 이미지, 폰트 등 정적 파일
│   ├── components/             # 재사용 가능한 컴포넌트
│   ├── pages/                  # 페이지 컴포넌트
│   ├── navigation/             # 네비게이션 설정
│   ├── hooks/                  # 커스텀 훅
│   ├── styles/                 # 공통 스타일
│   ├── services/               # API 호출 등 비즈니스 로직
│   ├── utils/                  # 유틸리티 함수
│   ├── context/                # React Contexts (글로벌 상태 관리)
├── App.js                      # 메인 앱 컴포넌트
|── index.js                    # 엔트리 파일
├── package.json                # npm 패키지 설정 파일
└── README.md                   # 프로젝트 설명 파일
```

run: react-native run-android
