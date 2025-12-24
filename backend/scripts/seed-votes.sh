#!/bin/bash

API_URL="http://localhost:3000/api"

echo "🗳️  Seeding votes to database..."
echo "================================"

# Primero obtener todas las waifus
echo "Fetching waifus from database..."
waifus_response=$(curl -s "$API_URL/waifus?limit=1000")
waifus_ids=($(echo "$waifus_response" | jq -r '.data[].id'))

if [ ${#waifus_ids[@]} -eq 0 ]; then
  echo "❌ Error: No waifus found in database. Please run seed-waifus.sh first."
  exit 1
fi

echo "✅ Found ${#waifus_ids[@]} waifus"

# Obtener usuarios reales de la base de datos
echo "Fetching users from database..."
users_response=$(curl -s "$API_URL/user")
users_ids=($(echo "$users_response" | jq -r '.[].id'))

if [ ${#users_ids[@]} -eq 0 ]; then
  echo "❌ Error: No users found in database. Please run seed-users.sh first."
  echo "   Run: ./seed-users.sh"
  exit 1
fi

echo "✅ Found ${#users_ids[@]} users"

echo "📊 Generating random votes for ${#users[@]} users..."
echo ""

# Valores posibles para votos
values=(1 1 1 2 2 3)  # Más probabilidad de votos normales
sources=("normal" "normal" "normal" "boost")  # Más votos normales que boosts

success=0
failed=0
duplicates=0
total_votes=0

# Cada usuario vota por entre 5-15 waifus aleatorias
for user_id in "${users_ids[@]}"; do
  # Número aleatorio de votos por usuario (5-15)
  num_votes=$((RANDOM % 11 + 5))
  
  echo "👤 User ID: $user_id (will vote $num_votes times)"
  
  # Mezclar el array de waifus para este usuario
  shuffled_waifus=($(printf '%s\n' "${waifus_ids[@]}" | shuf))
  
  for ((i=0; i<num_votes && i<${#shuffled_waifus[@]}; i++)); do
    waifu_id="${shuffled_waifus[$i]}"
    value=${values[$RANDOM % ${#values[@]}]}
    source=${sources[$RANDOM % ${#sources[@]}]}
    
    ((total_votes++))
    
    echo -n "  [$total_votes] Voting for waifu $waifu_id (value: $value, source: $source)... "
    
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/votes" \
      -H "Content-Type: application/json" \
      -d "{\"userId\":\"$user_id\",\"waifuId\":\"$waifu_id\",\"value\":$value,\"source\":\"$source\"}")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" -eq 201 ]; then
      echo "✅"
      ((success++))
    elif [ "$http_code" -eq 409 ]; then
      echo "⚠️  Duplicate"
      ((duplicates++))
    else
      echo "❌ Failed (HTTP $http_code)"
      ((failed++))
    fi
    
    # Pequeña pausa
    sleep 0.05
  done
  
  echo ""
done

echo "================================"
echo "🎉 Seeding completed!"
echo "✅ Success: $success"
echo "⚠️  Duplicates: $duplicates"
echo "❌ Failed: $failed"
echo "📊 Total attempts: $total_votes"
echo "================================"
echo ""
echo "📈 To see the leaderboard, run:"
echo "   curl http://localhost:3000/api/votes/leaderboard?limit=10"
