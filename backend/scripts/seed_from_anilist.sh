#!/usr/bin/env bash
set -euo pipefail

# ======================================
# Configuración
# ======================================
ANILIST_URL="https://graphql.anilist.co"
API_URL="${API_URL:-http://localhost:3000/api/waifus}"

# Pedimos MÁS de lo necesario porque luego filtramos Female
PER_PAGE="${PER_PAGE:-250}"

# Si tu API usa auth:
# export API_TOKEN="..."
API_TOKEN="${API_TOKEN:-}"

CURL_TIMEOUT=20
RETRIES=3
SLEEP_BETWEEN=0.15

echo "🌸 Seeding waifus from AniList → $API_URL"
echo "========================================"

# ======================================
# Helpers
# ======================================
auth_header() {
  if [[ -n "$API_TOKEN" ]]; then
    echo "-H" "Authorization: Bearer $API_TOKEN"
  fi
}

post_json() {
  local json="$1"
  curl -sS --max-time "$CURL_TIMEOUT" \
    -w "\n%{http_code}" \
    -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    $(auth_header) \
    -d "$json"
}

# ======================================
# 1) Query AniList (incluye description)
# ======================================
QUERY=$(cat <<'EOF'
query($perPage: Int) {
  Page(perPage: $perPage) {
    characters(sort: FAVOURITES_DESC) {
      id
      gender
      favourites
      description
      name { full }
      image { large }
      media {
        nodes {
          title { romaji }
        }
      }
    }
  }
}
EOF
)

echo "▶ Fetching characters from AniList (perPage=$PER_PAGE)..."

RAW=$(curl -sS --max-time "$CURL_TIMEOUT" \
  -X POST "$ANILIST_URL" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "User-Agent: WaifuHuntSeeder/1.0 (local dev)" \
  -d "$(jq -nc --arg q "$QUERY" --argjson perPage "$PER_PAGE" '{query:$q, variables:{perPage:$perPage}}')"
)

# ======================================
# 2) Validaciones duras
# ======================================
if echo "$RAW" | jq -e '.errors' >/dev/null 2>&1; then
  echo "❌ AniList returned errors:"
  echo "$RAW" | jq '.errors'
  exit 1
fi

if ! echo "$RAW" | jq -e '.data.Page.characters' >/dev/null 2>&1; then
  echo "❌ Unexpected AniList response:"
  echo "$RAW" | jq
  exit 1
fi

# ======================================
# 3) Sanitizar + filtrar SOLO Female
#    Payload final SOLO con:
#    name, slug, imageUrl, source, description
# ======================================
echo "▶ Sanitizing & filtering Female characters..."

SANITIZED=$(echo "$RAW" | jq -c '
  def clean_desc:
    ( . // "" )
    # remove spoiler markers (~! !~)
    | gsub("~!"; "") | gsub("!~"; "")
    # remove HTML tags
    | gsub("<[^>]+>"; " ")
    # normalize whitespace
    | gsub("[\n\r\t]+"; " ")
    | gsub(" +"; " ")
    | sub("^ +"; "")
    | sub(" +$"; "");

  (.data.Page.characters // [])
  | map(select(
      .gender == "Female" and
      .name.full != null and
      .image.large != null
    ))
  | .[0:100]
  | map(
      . as $c
      | {
          name: $c.name.full,
          slug: (
            $c.name.full
            | ascii_downcase
            | gsub("[^a-z0-9]+"; "-")
            | gsub("(^-|-$)"; "")
          ),
          imageUrl: $c.image.large,
          source: ($c.media.nodes[0].title.romaji // "Unknown"),
          description: ($c.description | clean_desc)
        }
    )
')

TOTAL=$(echo "$SANITIZED" | jq 'length')
echo "✔ Ready to insert $TOTAL waifus"
echo "========================================"

# ======================================
# 4) POST a tu API (idempotente)
# ======================================
success=0
skipped=0
failed=0

declare -A seen

echo "$SANITIZED" | jq -c '.[]' | while read -r waifu; do
  name=$(echo "$waifu" | jq -r '.name')
  slug=$(echo "$waifu" | jq -r '.slug')

  # Dedupe local
  if [[ -n "${seen[$slug]:-}" ]]; then
    echo "⏭️  Skipped duplicate: $name"
    ((skipped++)) || true
    continue
  fi
  seen[$slug]=1

  echo -n "🏹 Inserting: $name... "

  attempt=1
  while [[ $attempt -le $RETRIES ]]; do
    response=$(post_json "$waifu" || true)
    http_code=$(echo "$response" | tail -n1)

    if [[ "$http_code" == "201" ]]; then
      echo "✅ Success"
      ((success++)) || true
      break
    elif [[ "$http_code" == "409" ]]; then
      echo "⏭️  Already exists"
      ((skipped++)) || true
      break
    else
      if [[ $attempt -lt $RETRIES ]]; then
        echo -n "⚠️ HTTP $http_code (retry $attempt/$RETRIES)... "
        sleep 0.3
      else
        echo "❌ Failed (HTTP $http_code)"
        ((failed++)) || true
      fi
      ((attempt++)) || true
    fi
  done

  sleep "$SLEEP_BETWEEN"
done

echo ""
echo "========================================"
echo "🎉 Seeding completed!"
echo "✅ Success: $success"
echo "⏭️  Skipped: $skipped"
echo "❌ Failed: $failed"
echo "📊 Total processed: $TOTAL"
echo "========================================"
