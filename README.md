
# 프로젝트 소개

### 플랜업( PLAN UP )

**취업준비를 위한 여러분들을 위해, 캘린더를 통한 일정관리 서비스를 제공합니다!**

* **취업 공고 추가**
구직 사이트에서 원하시는공고의 url를 입력하셔서, 해당 공고의 정보와 자세한 일정을 캘린더에 바로 추가하실 수 있습니다!

   * 해당 공고에 대한 간단한 정보 및 기업정보를 같이 저장하며, 잊어버리지 않도록 취업공고 마감일정과, 추가적인 체크리스트 추가를 통해 취업을 위한 플래너를 관리해보세요!

* **자격증 시험 일정 추가**
    * 준비하시는 자격증이 있다면, 자격증 검색 기능을 통해,원하시는 자격증 시험 일정을 선택하셔서, 나의 캘린더 일정에 추가할 수 있습니다!

**플랜 업과 함께 목표를 이루시도록 도와드릴게요!**

### 기능

* 캘린더를 통해 일정을 한눈에 확인

* 일정 리스트를 통해 내가 추가한 일정 확인

* 일정에 대한 체크리스트로 해당 일정에 할 일, 준비물 등을 확인

* 자격증 일정 검색 및 일정 추가

* 채용 공고 URL을 통한 기업 정보, 채용 공고를 일정에 저장

# 실제 어플 구동 화면
<details>
  <summary>시연 보기/접기</summary>
 
 ![](https://github.com/user-attachments/assets/f115eefe-a89a-449c-8c74-695c413f4eb3)
 
</details>

### 프로젝트 폴더 구조

```
Client/
├── android/                    # Android 네이티브 코드
├── ios/                        # iOS 네이티브 코드
├── src/                        # 소스 코드 폴더
│   ├── assets/                 # 이미지, 폰트 등 정적 파일
│   ├── components/             # 재사용 가능한 컴포넌트
│   ├── pages/                  # 페이지 컴포넌트
│   ├── navigation/             # 네비게이션 설정
│   ├── utils/                  # 유틸리티 함수
│   ├── context/                # React Contexts (글로벌 상태 관리)
├── App.js                      # 메인 앱 컴포넌트
|── index.js                    # 엔트리 파일
├── package.json                # npm 패키지 설정 파일
└── README.md                   # 프로젝트 설명 파일

```

* run: react-native run-android

### 플레이 스토어

### [스토어 링크](https://play.google.com/store/apps/details?id=com.PlanUP&pli=1)
![플레이스토어](https://github.com/user-attachments/assets/77b51f29-cd09-49e8-a971-87710aa3204f)


### 기술 스택

* **프론트엔드**
  * JavaScript
  * React-Native
  * AndroidStudio
* **백엔드**
  * Node.js
  * Python
  * FastAPI
* **데이터베이스**
  * MongoDB
* **배포**
  * Docker
  * CloudType
* **협업툴**
  * Figma
  * GitHub

# 포트폴리오

<details>
  <summary>펼치기/접기</summary>
 
![PLAN_UP 기획서-1.pdf](https://github.com/user-attachments/files/16402753/PLAN_UP.-1.pdf)
![PLAN_UP 기획서-2.pdf](https://github.com/user-attachments/files/16402754/PLAN_UP.-2.pdf)
![PLAN_UP 기획서-3.pdf](https://github.com/user-attachments/files/16402755/PLAN_UP.-3.pdf)
![PLAN_UP 기획서-4.pdf](https://github.com/user-attachments/files/16402756/PLAN_UP.-4.pdf)
![PLAN_UP 기획서-5.pdf](https://github.com/user-attachments/files/16402757/PLAN_UP.-5.pdf)
![PLAN_UP 기획서-6.pdf](https://github.com/user-attachments/files/16402758/PLAN_UP.-6.pdf)
![PLAN_UP 기획서-7.pdf](https://github.com/user-attachments/files/16402759/PLAN_UP.-7.pdf)
![PLAN_UP 기획서-8.pdf](https://github.com/user-attachments/files/16402760/PLAN_UP.-8.pdf)
![PLAN_UP 기획서-9.pdf](https://github.com/user-attachments/files/16402761/PLAN_UP.-9.pdf)
![PLAN_UP 기획서-10.pdf](https://github.com/user-attachments/files/16402762/PLAN_UP.-10.pdf)

 
 </details>


# 협업 방식
1. **Figma 활용**
    * 기획안을 스토리보드로 작성
    * 화면 구성을 참고하여 개발

2. **GIT**
    * GIT-FLOW 전략을 차용
    <img src="https://techblog.woowahan.com/wp-content/uploads/img/2017-10-30/git-flow_overall_graph.png" alt="git-flow" width="600" height="600">
    
    * master: 배포를 위한 브랜치. 특별한 경우가 아니면 따로 관여하지 않으며 pull request 기능을 사용
    * develop: 개발, 테스트를 위한 브랜치
    * 모든 개발은 develop 브랜치에서 이루어지고, 추가 기능 개발은 따로 브랜치를 분리해 develop과 병합. 이후 충분한 테스트를 거친 후 master 브랜치에 병합하여 배포 버전을 업데이트

# 작성자의 기여
* 각자 작성

# 팀 기여
* 현우 팀장:
    * 기획, 디자인
    * 크롤링 코드 보완
    * 화면 구성 디테일 수정
    * CSS 유지보수
    * 취업 공고 검색기능 개발
    * 플레이스토어 배포
* 임희선:
    * 캘린더, 일정 리스트, 체크리스트의 프론트엔드 및 백엔드, DB  초안 개발
    * 자격증 OpenAPI 연결
    * 자격증 검색 일정 추가 기능 개발
    * 회원 관련 백엔드, DB 초반 구성
* 박성주:
    * 파이썬 채용 공고 크롤링 코드 작성
    * FastAPI 크롤링 서버 구축
    * 채용 공고 페이지, 채용 공고 일정 추가 기능, 관련 DB 개발
* 송윤섭:
    * 리액트 네이티브, 안드로이드, 개발 환경 세팅, 폴더 구조 구축
    * 백엔드 서버 구조 구축
    * GitHub 버전 관리 구조 구축
    * 메인 페이지 구성
    * 사용자 인증 및 로그인, 회원가입 세션 개발
    * 프론트, 백엔드 환경 변수 관리
    * 캘린더, 일정, 체크리스트 기능 개발
    * 전체적인 문제, 오류 해결 유지보수
    * Dockerfile 이미지 생성
    * APK 빌드 배포
    * 백엔드 서버, 크롤링 서버 배포
    * 플레이스토어 배포
