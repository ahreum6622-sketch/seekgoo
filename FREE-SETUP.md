# 식구 무료 분석 연결 안내

이 코드는 Gemini Free Tier + Vercel Hobby 사용을 전제로 준비했습니다. 현재 계정 연결이나 배포는 완료되지 않았습니다. 버셀 가입만으로 분석이 켜지지는 않으며, API 키 설정과 배포가 모두 필요합니다.

## 1. 무료 Gemini API 키 만들기

1. https://aistudio.google.com/apikey 에 Google 계정으로 로그인합니다.
2. 프로젝트를 만들거나 선택하고 API 키를 발급합니다. 해당 프로젝트의 요금제가 Free인지 확인합니다.
3. 결제 계정 연결, 유료 업그레이드, Paid Tier 활성화는 진행하지 않습니다. 이미 결제가 연결된 프로젝트의 키는 사용하지 않습니다.
4. 키는 채팅으로 보내거나 HTML/JavaScript에 붙여 넣지 않습니다. 아래 서버 환경변수에만 넣습니다.

무료 이용 가능 지역·계정 요건과 실제 요청 한도는 Google AI Studio에서 확인하세요. 무료 한도가 없거나 소진된 경우 직접 공간 정보를 입력할 수 있습니다. 앱은 자동으로 결제를 활성화하거나 유료 모델로 전환하지 않습니다. 다만 API 키가 유료 프로젝트에 속하는지는 코드에서 확인할 수 없습니다.

## 2. 먼저 내 컴퓨터에서 분석 확인하기

Node.js 22 이상을 설치하고 ZIP 안의 seekgoo 폴더에서 진행합니다.

1. .env.example 파일을 .env.local 이름으로 복사합니다.
2. GEMINI_API_KEY= 뒤에 발급한 키를 입력하고 저장합니다.
3. 터미널에서 npm start 를 실행합니다.
4. http://localhost:4173 에서 공간 사진을 선택하고 분석 버튼을 누릅니다.

HTML 파일을 더블클릭한 화면에는 서버가 없으므로 실제 분석은 동작하지 않습니다. 키를 HTML에 넣어 해결하면 안 됩니다.

## 3. Vercel 무료 배포

1. https://vercel.com/signup 에서 개인용 Hobby 플랜으로 가입합니다. Pro 체험이나 업그레이드는 선택하지 않습니다.
2. GitHub 저장소에 seekgoo 폴더의 소스를 올립니다. .env.local은 올리지 않습니다. ZIP 파일 자체가 아니라 압축을 푼 소스가 필요합니다.
3. Vercel의 Add New → Project에서 저장소를 가져옵니다.
4. Root Directory는 package.json과 vercel.json이 있는 폴더로 지정합니다. 저장소에 seekgoo 폴더째 올렸다면 seekgoo를 선택합니다. Framework Preset은 Other입니다.
5. Environment Variables에 GEMINI_API_KEY를 추가하고 키를 값으로 입력합니다. 이름에 VITE_ 또는 NEXT_PUBLIC_을 붙이지 않습니다.
6. Deploy를 누릅니다. 빌드와 출력 폴더는 vercel.json에 설정되어 있습니다.
7. 배포된 주소에서 분석을 확인합니다. 배포 후 키를 추가/수정했다면 Redeploy가 필요합니다.

## 오류와 확인

- 연결 실패: 키가 설정됐는지, 프로젝트에서 Gemini API를 사용할 수 있는지 확인합니다. 실제 공급자 호출 검증은 키 연결 후 필요합니다.
- 요청 한도: 나중에 다시 시도하거나 직접 입력합니다. 유료 전환은 필요하지 않습니다.
- 채광 판단 불가: 낮에 촬영한 다른 사진을 사용하거나 직접 수정합니다. 사진 한 장은 실제 광량이나 하루 일조시간 측정값이 아닙니다.
- 무료 등급의 사진과 응답은 Google 제품 개선에 사용될 수 있습니다. 개인 문서나 민감한 정보가 찍힌 사진은 선택하지 마세요. 앱 서버는 사진을 별도 저장하거나 로그로 출력하지 않습니다.

## 공식 안내 (2026-09-17 확인)

- Gemini 무료 모델·데이터 이용: https://ai.google.dev/gemini-api/docs/pricing
- Gemini 결제 구분: https://ai.google.dev/gemini-api/docs/billing
- Gemini 요청 한도: https://ai.google.dev/gemini-api/docs/rate-limits
- Vercel Hobby: https://vercel.com/docs/plans/hobby

모델은 gemini-2.5-flash-lite로 고정되어 있고, 자동 재시도·유료 모델 대체·외부 이미지 생성 호출은 없습니다. 무료 조건과 제공 모델은 서비스 정책 변경 시 다시 확인해야 합니다.
