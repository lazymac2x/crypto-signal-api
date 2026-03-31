# Postmortem: Dockerfile npm audit 미적용 불일치

**날짜:** 2026-03-31
**심각도:** 중간 (빌드 실패 가능성)

## 발생 원인

커밋 `ff91f41` (Fix Render build: skip npm audit)에서 `render.yaml`의 `buildCommand`에만 `--no-audit` 플래그를 추가했고, `Dockerfile`의 `RUN npm ci --production`은 수정하지 않았다.

| 파일 | 수정 전 | 수정 후 |
|------|---------|---------|
| `render.yaml` | `npm install` | `npm install --no-audit` ✅ (ff91f41) |
| `Dockerfile` | `npm ci --production` | `npm ci --production --no-audit` ✅ (이번 커밋) |

## 재발 방지 대책

1. **단일 진실 원칙**: npm install 플래그는 `Dockerfile`과 `render.yaml` 두 곳 동시 수정
2. **커밋 체크리스트**: 빌드 명령 변경 시 아래 파일 모두 검색
   ```bash
   grep -r "npm install\|npm ci" Dockerfile render.yaml .github/
   ```
3. **감사 정책**: `--no-audit`은 빌드 속도용. 보안 스캔은 별도 CI 단계(`npm audit --audit-level=high`)로 분리

## 영향 범위

- Render 배포: `render.yaml` 기준으로 빌드 → 이미 수정되어 있었으므로 실제 장애 없음
- Docker 이미지 빌드: `Dockerfile` 기준 → 이번에 수정 완료
