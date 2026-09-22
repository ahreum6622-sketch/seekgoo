# v0.6 이미지 및 데이터 기록

사용자가 제공한 ZIP의 PNG 30장을 파일명 시간순으로 정렬해 전달된 이름 순서와 연결했습니다. 원본 사진은 변경 없이 카드/상세에 사용합니다. 기존 식물/화분 ID는 유지합니다. 표시명은 사용자 명칭을 따르며 사진만으로 품종을 확정하지 않습니다.

| 순서 | 식물 ID | 이름 | 원본 이미지 | 합성 시트/셀(0부터) |
|---|---|---|---|---|
| 1 | p13 | 마지나타레인보우 | new-01.png | added-1.png / 0 |
| 2 | p14 | 플로리다뷰티 | new-02.png | added-1.png / 1 |
| 3 | p15 | 오렌지자스민 | new-03.png | added-1.png / 2 |
| 4 | p16 | 레몬나무 | new-04.png | added-1.png / 3 |
| 5 | p17 | 유주나무 | new-05.png | added-1.png / 4 |
| 6 | p18 | 피쉬본 | new-06.png | added-1.png / 5 |
| 7 | p19 | 괴마옥 | new-07.png | added-2.png / 0 |
| 8 | p20 | 용신목 | new-08.png | added-2.png / 1 |
| 9 | p21 | 소나무분재 | new-09.png | added-2.png / 2 |
| 10 | p22 | 스프링골풀 | new-10.png | added-2.png / 3 |
| 11 | p23 | 아이비 | new-11.png | added-2.png / 4 |
| 12 | p24 | 미니소철 | new-12.png | added-2.png / 5 |
| 13 | p25 | 콩란 | new-13.png | added-3.png / 0 |
| 14 | p26 | 수박페페 | new-14.png | added-3.png / 1 |
| 15 | p27 | 하트호야 | new-15.png | added-3.png / 2 |
| 16 | p28 | 올리브나무 | new-16.png | added-3.png / 3 |
| 17 | p29 | 아스파라거스 나누스 | new-17.png | added-3.png / 4 |
| 18 | p30 | 마오리소포라 | new-18.png | added-3.png / 5 |
| 19 | p31 | 스투키 | new-19.png | added-4.png / 0 |
| 20 | p32 | 애니시다 | new-20.png | added-4.png / 1 |
| 21 | p33 | 피나타 라벤더 | new-21.png | added-4.png / 2 |
| 22 | p34 | 붉은여우꼬리풀 | new-22.png | added-4.png / 3 |
| 23 | p35 | 로즈마리 | new-23.png | added-4.png / 4 |
| 24 | p36 | 네펜데스 | new-24.png | added-4.png / 5 |
| 25 | p37 | 사피니아 | new-25.png | added-5.png / 0 |
| 26 | p38 | 파리지옥 | new-26.png | added-5.png / 1 |
| 27 | p39 | 여인초 | new-27.png | added-5.png / 2 |
| 28 | p40 | 블루버드 | new-28.png | added-5.png / 3 |
| 29 | p41 | 카라안스리움 | new-29.png | added-5.png / 4 |
| 30 | p42 | 장미 | new-30.png | added-5.png / 5 |

## 이미지 제작

내장 이미지 생성/편집 기능을 사용했으며 외부 유료 API를 연결하지 않았습니다. 원본 사진의 식물을 참고해 식물 단독 투명 자산을 만들었습니다. 모든 신규 합성 시트는 1536×1024 RGBA, 3열×2행입니다. 알파 채널을 실제 합성해 배경 제거를 확인했으며 CSS는 원본 PNG 알파를 그대로 사용합니다.

최종 파일: plants/added-1.png … added-5.png, plants/lucky-cutout.png, pots/additional-atlas.png.

프롬프트 공통: 사용자 사진의 잎·줄기·꽃·열매 형태를 유지한 식물 단독, 3×2 동일 크기 셀, 식물 6종을 지정 순서로, 화분·흙·배경·텍스트 없이 실제 투명 PNG, 셀 간 침범 금지. 후속 편집: 식물 형태·위치를 유지하고 흐린 배경을 알파로 제거. 셀의 실제 줄기 하단을 측정해 root/rootX를 보정하고 아이비·콩란·네펜데스는 늘어진 잎이 아닌 중앙 생장점을 사용했습니다.

행운목 프롬프트: ref-11.png의 가느다란 굽은 줄기와 잎 형태를 유지하고 화분/흙/배경을 제거한 정사각 투명 이미지. 기존 합성용 풍성한 드라세나 이미지는 이 항목에서 사용하지 않습니다.

화분 프롬프트: 4열×2행 8종, 아이보리 골 세라믹 / 세이지 둥근 유약 / 더스티 로즈 / 코발트 블루 / 갈색 골 테라코타 / 크림 사각 스톤 / 차콜 테이퍼 / 허니 라탄. 식물·받침·그림자·글자 없이 흙이 담긴 화분 단독 투명 PNG. 각 셀의 흙 중심/앞 테두리 높이를 별도로 지정했습니다.

## 관리 정보의 범위와 참고

난이도·관찰 빈도·크기 구간·4단계 채광은 기존 앱 추천 규칙에 맞춘 편집 분류이며 기관이 제공한 공식 점수가 아닙니다. 일반적인 관리 문구를 사용하며 사진 속 품종의 개별 생육을 확정하지 않습니다. 물주기는 고정 날짜 대신 흙 상태를 기준으로 안내합니다. 원예 자료의 이미지는 다운로드하지 않았습니다.

확인한 원예 자료(2026-09-18):
- 드라세나: https://plants.ces.ncsu.edu/plants/dracaena-reflexa-var-angustifolia/
- 필로덴드론: https://plants.ces.ncsu.edu/plants/philodendron/
- 감귤류: https://www.rhs.org.uk/fruit/citrus/grow-your-own
- 골풀: https://plants.ces.ncsu.edu/plants/juncus-effusus/
- 아이비: https://plants.ces.ncsu.edu/plants/hedera-helix/
- 소철: https://plants.ces.ncsu.edu/plants/cycas-revoluta/
- 콩란: https://plants.ces.ncsu.edu/plants/curio-rowleyanus/
- 하트호야: https://plants.ces.ncsu.edu/plants/hoya-kerrii/
- 올리브: https://plants.ces.ncsu.edu/plants/olea-europaea/
- 아스파라거스: https://plants.ces.ncsu.edu/plants/asparagus-setaceus/
- 라벤더: https://www.rhs.org.uk/plants/lavender/growing-guide
- 붉은여우꼬리풀: https://plants.ces.ncsu.edu/plants/acalypha-hispida/
- 로즈마리: https://www.rhs.org.uk/herbs/rosemary/grow-your-own
- 네펜데스: https://plants.ces.ncsu.edu/plants/nepenthes/
- 파리지옥: https://plants.ces.ncsu.edu/plants/dionaea-muscipula/
- 안스리움: https://plants.ces.ncsu.edu/plants/anthurium/
- 장미: https://www.rhs.org.uk/plants/roses/growing-guide


## v0.7 분류와 상대 크기

신규 이미지 생성/편집 없이 기존 PNG를 CSS 레이어로 배치합니다. 사진 속 개체의 초소형/소형/중형/대형은 디자인상의 분류입니다. 특정 종이 평생 해당 크기로 유지된다는 뜻이나 실측값이 아닙니다. 상대 공간 배율은 초소형 .52 / 소형 .72 / 중형 .95 / 대형 1.20, 화분 대비 식물 배율은 .36 / .72 / .96 / 1.10입니다. plantGeometry가 이미지별 생장점에 배율을 적용해 흙 평면과 맞춥니다.

종류는 탐색 편의를 위한 원예적 그룹입니다. 기존 관리 참고 자료와 아래 자료를 참고해 분류했으며, 아스파라거스는 이름에 fern이 있어도 양치식물로 넣지 않았습니다. 라벤더는 꽃식물·허브 두 그룹에 포함됩니다.
- 보스턴고사리: https://plants.ces.ncsu.edu/plants/nephrolepis-exaltata/
- 네펜데스: https://plants.ces.ncsu.edu/plants/nepenthes/
- 파리지옥: https://plants.ces.ncsu.edu/plants/dionaea-muscipula/

| ID | 식물 | 사진 속 크기 | 종류 |
|---|---|---|---|
| p01 | 필레아 | 소형 | 관엽식물 |
| p02 | 필로덴드론 | 중형 | 관엽식물 |
| p03 | 스킨답서스 | 중형 | 관엽식물 |
| p04 | 디펜바키아 | 중형 | 관엽식물 |
| p05 | 몬스테라 | 대형 | 관엽식물 |
| p06 | 보스턴고사리 | 소형 | 양치식물 |
| p07 | 홍콩야자 | 중형 | 관엽식물 |
| p08 | 고무나무 | 대형 | 관엽식물 |
| p09 | 아스플레니움 | 소형 | 양치식물 |
| p10 | 행운목 | 중형 | 관엽식물 |
| p11 | 산세베리아 | 소형 | 선인장·다육식물 |
| p12 | 아레카야자 | 대형 | 관엽식물 |
| p13 | 마지나타레인보우 | 대형 | 관엽식물 |
| p14 | 플로리다뷰티 | 중형 | 관엽식물 |
| p15 | 오렌지자스민 | 소형 | 꽃식물 |
| p16 | 레몬나무 | 중형 | 열매식물 |
| p17 | 유주나무 | 중형 | 열매식물 |
| p18 | 피쉬본 | 초소형 | 선인장·다육식물 |
| p19 | 괴마옥 | 초소형 | 선인장·다육식물 |
| p20 | 용신목 | 중형 | 선인장·다육식물 |
| p21 | 소나무분재 | 소형 | 분재·침엽식물 |
| p22 | 스프링골풀 | 소형 | 관엽식물 |
| p23 | 아이비 | 소형 | 관엽식물 |
| p24 | 미니소철 | 초소형 | 관엽식물 |
| p25 | 콩란 | 소형 | 선인장·다육식물 |
| p26 | 수박페페 | 초소형 | 관엽식물 |
| p27 | 하트호야 | 초소형 | 선인장·다육식물 |
| p28 | 올리브나무 | 대형 | 열매식물 |
| p29 | 아스파라거스 나누스 | 소형 | 관엽식물 |
| p30 | 마오리소포라 | 소형 | 관엽식물 |
| p31 | 스투키 | 소형 | 선인장·다육식물 |
| p32 | 애니시다 | 소형 | 꽃식물 |
| p33 | 피나타 라벤더 | 소형 | 꽃식물, 허브 |
| p34 | 붉은여우꼬리풀 | 소형 | 꽃식물 |
| p35 | 로즈마리 | 중형 | 허브 |
| p36 | 네펜데스 | 소형 | 식충식물 |
| p37 | 사피니아 | 소형 | 꽃식물 |
| p38 | 파리지옥 | 초소형 | 식충식물 |
| p39 | 여인초 | 대형 | 관엽식물 |
| p40 | 블루버드 | 소형 | 분재·침엽식물 |
| p41 | 카라안스리움 | 소형 | 꽃식물 |
| p42 | 장미 | 소형 | 꽃식물 |


## v0.9 합성 보정

원본 PNG를 수정하거나 새 이미지를 생성하지 않았다. 기존 화분 스프라이트의 alpha > 180 영역을 읽어 바닥 높이, 바닥 근처 2.5% 높이의 폭과 중심을 측정하고 js/data.js의 potBases에 기록했다. 공간 사진은 브라우저에서 64×64로 읽고 현재 화분 바닥 주변을 샘플링한다. 극단 밝기 상하위 10%를 제외한 평균 색상으로 기존 자산을 CSS 보정하며 드래그/확대 시 갱신한다. 실제 깊이나 광원 위치를 측정하지 않는다.
