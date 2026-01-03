#!/bin/bash

API_URL="http://localhost:3000/auth"

echo "👥 Seeding users to database..."
echo "================================"

# Usuarios de prueba
users=(
  '{"email":"anime.fan.001@waifuhunt.com","password":"Password123!","name":"Anime Fan"}'
  '{"email":"otaku.master@waifuhunt.com","password":"Password123!","name":"Otaku Master"}'
  '{"email":"waifu.hunter@waifuhunt.com","password":"Password123!","name":"Waifu Hunter"}'
  '{"email":"sakura.lover@waifuhunt.com","password":"Password123!","name":"Sakura Lover"}'
  '{"email":"nezuko.simp@waifuhunt.com","password":"Password123!","name":"Nezuko Simp"}'
  '{"email":"mikasa.fan@waifuhunt.com","password":"Password123!","name":"Mikasa Fan"}'
  '{"email":"zero.two.stan@waifuhunt.com","password":"Password123!","name":"Zero Two Stan"}'
  '{"email":"rem.enjoyer@waifuhunt.com","password":"Password123!","name":"Rem Enjoyer"}'
  '{"email":"asuna.admirer@waifuhunt.com","password":"Password123!","name":"Asuna Admirer"}'
  '{"email":"megumin.fan@waifuhunt.com","password":"Password123!","name":"Megumin Fan"}'
  '{"email":"hinata.lover@waifuhunt.com","password":"Password123!","name":"Hinata Lover"}'
  '{"email":"nami.simp@waifuhunt.com","password":"Password123!","name":"Nami Simp"}'
  '{"email":"yor.forger.fan@waifuhunt.com","password":"Password123!","name":"Yor Forger Fan"}'
  '{"email":"makima.cultist@waifuhunt.com","password":"Password123!","name":"Makima Cultist"}'
  '{"email":"power.enjoyer@waifuhunt.com","password":"Password123!","name":"Power Enjoyer"}'
  '{"email":"nobara.stan@waifuhunt.com","password":"Password123!","name":"Nobara Stan"}'
  '{"email":"marin.lover@waifuhunt.com","password":"Password123!","name":"Marin Lover"}'
  '{"email":"violet.fan@waifuhunt.com","password":"Password123!","name":"Violet Fan"}'
  '{"email":"mai.simp@waifuhunt.com","password":"Password123!","name":"Mai Simp"}'
  '{"email":"kaguya.admirer@waifuhunt.com","password":"Password123!","name":"Kaguya Admirer"}'
  '{"email":"chika.enjoyer@waifuhunt.com","password":"Password123!","name":"Chika Enjoyer"}'
  '{"email":"emilia.team@waifuhunt.com","password":"Password123!","name":"Emilia Team"}'
  '{"email":"saber.knight@waifuhunt.com","password":"Password123!","name":"Saber Knight"}'
  '{"email":"rin.tohsaka.fan@waifuhunt.com","password":"Password123!","name":"Rin Tohsaka Fan"}'
  '{"email":"c2.pizza.lover@waifuhunt.com","password":"Password123!","name":"C.C. Pizza Lover"}'
  '{"email":"ryuko.matoi.fan@waifuhunt.com","password":"Password123!","name":"Ryuko Matoi Fan"}'
  '{"email":"yoruichi.simp@waifuhunt.com","password":"Password123!","name":"Yoruichi Simp"}'
  '{"email":"erza.scarlet.stan@waifuhunt.com","password":"Password123!","name":"Erza Scarlet Stan"}'
  '{"email":"lucy.heartfilia@waifuhunt.com","password":"Password123!","name":"Lucy Heartfilia"}'
  '{"email":"bulma.retro.fan@waifuhunt.com","password":"Password123!","name":"Bulma Retro Fan"}'
)

success=0
failed=0
total=${#users[@]}

echo "Creating $total users..."
echo ""

for i in "${!users[@]}"; do
  user="${users[$i]}"
  email=$(echo "$user" | jq -r '.email')
  
  echo -n "[$((i+1))/$total] Creating: $email... "
  
  response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/sign-up/email" \
    -H "Content-Type: application/json" \
    -d "$user")
  
  http_code=$(echo "$response" | tail -n1)
  
  if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
    echo "✅ Success"
    ((success++))
  else
    body=$(echo "$response" | head -n-1)
    # Si el error es de email duplicado, lo consideramos OK
    if echo "$body" | grep -q "already"; then
      echo "⚠️  Already exists"
      ((success++))
    else
      echo "❌ Failed (HTTP $http_code)"
      ((failed++))
    fi
  fi
  
  sleep 0.1
done

echo ""
echo "================================"
echo "🎉 User seeding completed!"
echo "✅ Created/Existing: $success"
echo "❌ Failed: $failed"
echo "📊 Total: $total"
echo "================================"
