#!/bin/bash

API_URL="http://localhost:3000/api/waifus"

echo "🌸 Seeding waifus to database..."
echo "================================"

# Array de waifus populares
waifus=(
  # Sword Art Online
  '{"name":"Asuna Yuuki","slug":"asuna-yuuki","imageUrl":"https://static.wikia.nocookie.net/swordartonline/images/e/e8/Asuna_Yuuki.png","source":"Sword Art Online"}'
  '{"name":"Sinon","slug":"sinon","imageUrl":"https://static.wikia.nocookie.net/swordartonline/images/5/55/Sinon.png","source":"Sword Art Online"}'
  
  # Attack on Titan
  '{"name":"Mikasa Ackerman","slug":"mikasa-ackerman","imageUrl":"https://static.wikia.nocookie.net/shingekinokyojin/images/3/39/Mikasa_Ackerman.png","source":"Attack on Titan"}'
  '{"name":"Historia Reiss","slug":"historia-reiss","imageUrl":"https://static.wikia.nocookie.net/shingekinokyojin/images/f/f4/Historia_Reiss.png","source":"Attack on Titan"}'
  '{"name":"Annie Leonhart","slug":"annie-leonhart","imageUrl":"https://static.wikia.nocookie.net/shingekinokyojin/images/6/65/Annie_Leonhart.png","source":"Attack on Titan"}'
  
  # Demon Slayer
  '{"name":"Nezuko Kamado","slug":"nezuko-kamado","imageUrl":"https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/4/45/Nezuko_anime.png","source":"Demon Slayer"}'
  '{"name":"Shinobu Kocho","slug":"shinobu-kocho","imageUrl":"https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/1/17/Shinobu_anime.png","source":"Demon Slayer"}'
  '{"name":"Kanao Tsuyuri","slug":"kanao-tsuyuri","imageUrl":"https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/9/94/Kanao_anime.png","source":"Demon Slayer"}'
  '{"name":"Mitsuri Kanroji","slug":"mitsuri-kanroji","imageUrl":"https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/8/88/Mitsuri_anime.png","source":"Demon Slayer"}'
  
  # My Hero Academia
  '{"name":"Ochaco Uraraka","slug":"ochaco-uraraka","imageUrl":"https://static.wikia.nocookie.net/bokunoheroacademia/images/7/7f/Ochaco_Uraraka.png","source":"My Hero Academia"}'
  '{"name":"Momo Yaoyorozu","slug":"momo-yaoyorozu","imageUrl":"https://static.wikia.nocookie.net/bokunoheroacademia/images/3/36/Momo_Yaoyorozu.png","source":"My Hero Academia"}'
  '{"name":"Tsuyu Asui","slug":"tsuyu-asui","imageUrl":"https://static.wikia.nocookie.net/bokunoheroacademia/images/9/92/Tsuyu_Asui.png","source":"My Hero Academia"}'
  '{"name":"Kyoka Jiro","slug":"kyoka-jiro","imageUrl":"https://static.wikia.nocookie.net/bokunoheroacademia/images/4/47/Kyoka_Jiro.png","source":"My Hero Academia"}'
  '{"name":"Himiko Toga","slug":"himiko-toga","imageUrl":"https://static.wikia.nocookie.net/bokunoheroacademia/images/c/c9/Himiko_Toga.png","source":"My Hero Academia"}'
  
  # Naruto
  '{"name":"Hinata Hyuga","slug":"hinata-hyuga","imageUrl":"https://static.wikia.nocookie.net/naruto/images/3/37/Hinata_Part_II.png","source":"Naruto"}'
  '{"name":"Sakura Haruno","slug":"sakura-haruno","imageUrl":"https://static.wikia.nocookie.net/naruto/images/2/27/Sakura_Part_II.png","source":"Naruto"}'
  '{"name":"Tsunade","slug":"tsunade","imageUrl":"https://static.wikia.nocookie.net/naruto/images/b/b3/Tsunade_Infobox.png","source":"Naruto"}'
  '{"name":"Ino Yamanaka","slug":"ino-yamanaka","imageUrl":"https://static.wikia.nocookie.net/naruto/images/1/1f/Ino_Part_II.png","source":"Naruto"}'
  '{"name":"Temari","slug":"temari","imageUrl":"https://static.wikia.nocookie.net/naruto/images/6/66/Temari_Part_II.png","source":"Naruto"}'
  
  # One Piece
  '{"name":"Nami","slug":"nami","imageUrl":"https://static.wikia.nocookie.net/onepiece/images/f/f4/Nami_Anime_Post_Timeskip_Infobox.png","source":"One Piece"}'
  '{"name":"Nico Robin","slug":"nico-robin","imageUrl":"https://static.wikia.nocookie.net/onepiece/images/5/5d/Nico_Robin_Anime_Post_Timeskip_Infobox.png","source":"One Piece"}'
  '{"name":"Boa Hancock","slug":"boa-hancock","imageUrl":"https://static.wikia.nocookie.net/onepiece/images/8/81/Boa_Hancock_Anime_Infobox.png","source":"One Piece"}'
  '{"name":"Nefertari Vivi","slug":"nefertari-vivi","imageUrl":"https://static.wikia.nocookie.net/onepiece/images/c/c2/Nefertari_Vivi_Anime_Infobox.png","source":"One Piece"}'
  
  # Fullmetal Alchemist
  '{"name":"Riza Hawkeye","slug":"riza-hawkeye","imageUrl":"https://static.wikia.nocookie.net/fma/images/5/5e/Riza_Hawkeye.png","source":"Fullmetal Alchemist"}'
  '{"name":"Winry Rockbell","slug":"winry-rockbell","imageUrl":"https://static.wikia.nocookie.net/fma/images/9/9f/Winry_Rockbell.png","source":"Fullmetal Alchemist"}'
  '{"name":"Olivier Armstrong","slug":"olivier-armstrong","imageUrl":"https://static.wikia.nocookie.net/fma/images/c/c7/Olivier_Armstrong.png","source":"Fullmetal Alchemist"}'
  
  # Death Note
  '{"name":"Misa Amane","slug":"misa-amane","imageUrl":"https://static.wikia.nocookie.net/deathnote/images/a/a0/Misa_Amane.png","source":"Death Note"}'
  
  # Tokyo Ghoul
  '{"name":"Touka Kirishima","slug":"touka-kirishima","imageUrl":"https://static.wikia.nocookie.net/tokyoghoul/images/f/f5/Touka_Kirishima.png","source":"Tokyo Ghoul"}'
  '{"name":"Rize Kamishiro","slug":"rize-kamishiro","imageUrl":"https://static.wikia.nocookie.net/tokyoghoul/images/8/85/Rize_Kamishiro.png","source":"Tokyo Ghoul"}'
  
  # Fairy Tail
  '{"name":"Lucy Heartfilia","slug":"lucy-heartfilia","imageUrl":"https://static.wikia.nocookie.net/fairytail/images/3/39/Lucy_X791.png","source":"Fairy Tail"}'
  '{"name":"Erza Scarlet","slug":"erza-scarlet","imageUrl":"https://static.wikia.nocookie.net/fairytail/images/8/8e/Erza_X791.png","source":"Fairy Tail"}'
  '{"name":"Juvia Lockser","slug":"juvia-lockser","imageUrl":"https://static.wikia.nocookie.net/fairytail/images/f/f4/Juvia_X791.png","source":"Fairy Tail"}'
  '{"name":"Mirajane Strauss","slug":"mirajane-strauss","imageUrl":"https://static.wikia.nocookie.net/fairytail/images/9/9b/Mirajane_X791.png","source":"Fairy Tail"}'
  
  # Steins;Gate
  '{"name":"Kurisu Makise","slug":"kurisu-makise","imageUrl":"https://static.wikia.nocookie.net/steins-gate/images/f/f3/Kurisu_Makise.png","source":"Steins;Gate"}'
  '{"name":"Mayuri Shiina","slug":"mayuri-shiina","imageUrl":"https://static.wikia.nocookie.net/steins-gate/images/1/19/Mayuri_Shiina.png","source":"Steins;Gate"}'
  
  # Re:Zero
  '{"name":"Emilia","slug":"emilia","imageUrl":"https://static.wikia.nocookie.net/rezero/images/e/e4/Emilia_Anime.png","source":"Re:Zero"}'
  '{"name":"Rem","slug":"rem","imageUrl":"https://static.wikia.nocookie.net/rezero/images/7/7f/Rem_Anime.png","source":"Re:Zero"}'
  '{"name":"Ram","slug":"ram","imageUrl":"https://static.wikia.nocookie.net/rezero/images/5/5f/Ram_Anime.png","source":"Re:Zero"}'
  
  # Konosuba
  '{"name":"Aqua","slug":"aqua","imageUrl":"https://static.wikia.nocookie.net/konosuba/images/3/3f/Aqua_anime.png","source":"Konosuba"}'
  '{"name":"Megumin","slug":"megumin","imageUrl":"https://static.wikia.nocookie.net/konosuba/images/9/9f/Megumin_anime.png","source":"Konosuba"}'
  '{"name":"Darkness","slug":"darkness","imageUrl":"https://static.wikia.nocookie.net/konosuba/images/e/e8/Darkness_anime.png","source":"Konosuba"}'
  
  # Evangelion
  '{"name":"Rei Ayanami","slug":"rei-ayanami","imageUrl":"https://static.wikia.nocookie.net/evangelion/images/7/7d/Rei_Ayanami.png","source":"Neon Genesis Evangelion"}'
  '{"name":"Asuka Langley","slug":"asuka-langley","imageUrl":"https://static.wikia.nocookie.net/evangelion/images/4/4f/Asuka_Langley.png","source":"Neon Genesis Evangelion"}'
  
  # Fate Series
  '{"name":"Saber","slug":"saber","imageUrl":"https://static.wikia.nocookie.net/typemoon/images/1/14/Saber_Fate_stay_night.png","source":"Fate/stay night"}'
  '{"name":"Rin Tohsaka","slug":"rin-tohsaka","imageUrl":"https://static.wikia.nocookie.net/typemoon/images/6/6a/Rin_Tohsaka.png","source":"Fate/stay night"}'
  '{"name":"Sakura Matou","slug":"sakura-matou","imageUrl":"https://static.wikia.nocookie.net/typemoon/images/3/3e/Sakura_Matou.png","source":"Fate/stay night"}'
  '{"name":"Ishtar","slug":"ishtar","imageUrl":"https://static.wikia.nocookie.net/typemoon/images/9/94/Ishtar_Anime.png","source":"Fate/Grand Order"}'
  
  # Dragon Ball
  '{"name":"Bulma","slug":"bulma","imageUrl":"https://static.wikia.nocookie.net/dragonball/images/3/39/Bulma_DBS.png","source":"Dragon Ball"}'
  '{"name":"Android 18","slug":"android-18","imageUrl":"https://static.wikia.nocookie.net/dragonball/images/f/f7/Android_18_DBS.png","source":"Dragon Ball"}'
  
  # Spy x Family
  '{"name":"Yor Forger","slug":"yor-forger","imageUrl":"https://static.wikia.nocookie.net/spy-x-family/images/8/8f/Yor_Forger_Anime.png","source":"Spy x Family"}'
  
  # Jujutsu Kaisen
  '{"name":"Nobara Kugisaki","slug":"nobara-kugisaki","imageUrl":"https://static.wikia.nocookie.net/jujutsu-kaisen/images/5/57/Nobara_anime.png","source":"Jujutsu Kaisen"}'
  '{"name":"Maki Zenin","slug":"maki-zenin","imageUrl":"https://static.wikia.nocookie.net/jujutsu-kaisen/images/2/2f/Maki_anime.png","source":"Jujutsu Kaisen"}'
  
  # Chainsaw Man
  '{"name":"Makima","slug":"makima","imageUrl":"https://static.wikia.nocookie.net/chainsaw-man/images/f/f4/Makima_anime.png","source":"Chainsaw Man"}'
  '{"name":"Power","slug":"power","imageUrl":"https://static.wikia.nocookie.net/chainsaw-man/images/3/3e/Power_anime.png","source":"Chainsaw Man"}'
  
  # Bleach
  '{"name":"Rukia Kuchiki","slug":"rukia-kuchiki","imageUrl":"https://static.wikia.nocookie.net/bleach/images/9/9e/Rukia_Kuchiki.png","source":"Bleach"}'
  '{"name":"Orihime Inoue","slug":"orihime-inoue","imageUrl":"https://static.wikia.nocookie.net/bleach/images/c/c7/Orihime_Inoue.png","source":"Bleach"}'
  '{"name":"Yoruichi Shihoin","slug":"yoruichi-shihoin","imageUrl":"https://static.wikia.nocookie.net/bleach/images/6/62/Yoruichi_Shihoin.png","source":"Bleach"}'
  
  # Code Geass
  '{"name":"C.C.","slug":"cc","imageUrl":"https://static.wikia.nocookie.net/codegeass/images/1/13/CC.png","source":"Code Geass"}'
  '{"name":"Kallen Kozuki","slug":"kallen-kozuki","imageUrl":"https://static.wikia.nocookie.net/codegeass/images/2/2e/Kallen_Kozuki.png","source":"Code Geass"}'
  
  # Darling in the Franxx
  '{"name":"Zero Two","slug":"zero-two","imageUrl":"https://static.wikia.nocookie.net/darling-in-the-franxx/images/3/3e/Zero_Two_anime.png","source":"Darling in the Franxx"}'
  
  # Monogatari Series
  '{"name":"Hitagi Senjougahara","slug":"hitagi-senjougahara","imageUrl":"https://static.wikia.nocookie.net/bakemonogatari1645/images/f/f4/Hitagi_Senjougahara.png","source":"Monogatari Series"}'
  '{"name":"Shinobu Oshino","slug":"shinobu-oshino","imageUrl":"https://static.wikia.nocookie.net/bakemonogatari1645/images/8/8f/Shinobu_Oshino.png","source":"Monogatari Series"}'
  
  # Kill la Kill
  '{"name":"Ryuko Matoi","slug":"ryuko-matoi","imageUrl":"https://static.wikia.nocookie.net/kill-la-kill/images/6/6d/Ryuko_Matoi.png","source":"Kill la Kill"}'
  '{"name":"Satsuki Kiryuin","slug":"satsuki-kiryuin","imageUrl":"https://static.wikia.nocookie.net/kill-la-kill/images/3/3b/Satsuki_Kiryuin.png","source":"Kill la Kill"}'
  
  # The Quintessential Quintuplets
  '{"name":"Miku Nakano","slug":"miku-nakano","imageUrl":"https://static.wikia.nocookie.net/5toubun-no-hanayome/images/4/4f/Miku_anime.png","source":"The Quintessential Quintuplets"}'
  '{"name":"Nino Nakano","slug":"nino-nakano","imageUrl":"https://static.wikia.nocookie.net/5toubun-no-hanayome/images/5/5d/Nino_anime.png","source":"The Quintessential Quintuplets"}'
  '{"name":"Ichika Nakano","slug":"ichika-nakano","imageUrl":"https://static.wikia.nocookie.net/5toubun-no-hanayome/images/8/88/Ichika_anime.png","source":"The Quintessential Quintuplets"}'
  '{"name":"Yotsuba Nakano","slug":"yotsuba-nakano","imageUrl":"https://static.wikia.nocookie.net/5toubun-no-hanayome/images/2/2f/Yotsuba_anime.png","source":"The Quintessential Quintuplets"}'
  '{"name":"Itsuki Nakano","slug":"itsuki-nakano","imageUrl":"https://static.wikia.nocookie.net/5toubun-no-hanayome/images/6/6e/Itsuki_anime.png","source":"The Quintessential Quintuplets"}'
  
  # Kaguya-sama
  '{"name":"Kaguya Shinomiya","slug":"kaguya-shinomiya","imageUrl":"https://static.wikia.nocookie.net/kaguyasama-wa-kokurasetai/images/9/93/Kaguya_anime.png","source":"Kaguya-sama: Love is War"}'
  '{"name":"Chika Fujiwara","slug":"chika-fujiwara","imageUrl":"https://static.wikia.nocookie.net/kaguyasama-wa-kokurasetai/images/1/1f/Chika_anime.png","source":"Kaguya-sama: Love is War"}'
  
  # Bunny Girl Senpai
  '{"name":"Mai Sakurajima","slug":"mai-sakurajima","imageUrl":"https://static.wikia.nocookie.net/aobuta/images/f/f3/Mai_Sakurajima_anime.png","source":"Rascal Does Not Dream of Bunny Girl Senpai"}'
  
  # Your Name
  '{"name":"Mitsuha Miyamizu","slug":"mitsuha-miyamizu","imageUrl":"https://static.wikia.nocookie.net/kiminonawa/images/e/e8/Mitsuha_Miyamizu.png","source":"Your Name"}'
  
  # A Silent Voice
  '{"name":"Shoko Nishimiya","slug":"shoko-nishimiya","imageUrl":"https://static.wikia.nocookie.net/koenokatachi/images/c/c9/Shoko_Nishimiya.png","source":"A Silent Voice"}'
  
  # Violet Evergarden
  '{"name":"Violet Evergarden","slug":"violet-evergarden","imageUrl":"https://static.wikia.nocookie.net/violet-evergarden/images/3/38/Violet_Evergarden_Anime.png","source":"Violet Evergarden"}'
  
  # No Game No Life
  '{"name":"Shiro","slug":"shiro","imageUrl":"https://static.wikia.nocookie.net/no-game-no-life/images/4/4c/Shiro_anime.png","source":"No Game No Life"}'
  '{"name":"Jibril","slug":"jibril","imageUrl":"https://static.wikia.nocookie.net/no-game-no-life/images/5/59/Jibril_anime.png","source":"No Game No Life"}'
  
  # Overlord
  '{"name":"Albedo","slug":"albedo","imageUrl":"https://static.wikia.nocookie.net/overlordmaruyama/images/8/8f/Albedo_anime.png","source":"Overlord"}'
  '{"name":"Shalltear Bloodfallen","slug":"shalltear-bloodfallen","imageUrl":"https://static.wikia.nocookie.net/overlordmaruyama/images/2/2e/Shalltear_anime.png","source":"Overlord"}'
  
  # That Time I Got Reincarnated as a Slime
  '{"name":"Shion","slug":"shion","imageUrl":"https://static.wikia.nocookie.net/tensei-shitara-slime-datta-ken/images/7/7f/Shion_anime.png","source":"That Time I Got Reincarnated as a Slime"}'
  '{"name":"Shuna","slug":"shuna","imageUrl":"https://static.wikia.nocookie.net/tensei-shitara-slime-datta-ken/images/3/3f/Shuna_anime.png","source":"That Time I Got Reincarnated as a Slime"}'
  '{"name":"Milim Nava","slug":"milim-nava","imageUrl":"https://static.wikia.nocookie.net/tensei-shitara-slime-datta-ken/images/e/e9/Milim_anime.png","source":"That Time I Got Reincarnated as a Slime"}'
  
  # Sword Art Online (additional)
  '{"name":"Leafa","slug":"leafa","imageUrl":"https://static.wikia.nocookie.net/swordartonline/images/3/3e/Leafa.png","source":"Sword Art Online"}'
  '{"name":"Yuuki Konno","slug":"yuuki-konno","imageUrl":"https://static.wikia.nocookie.net/swordartonline/images/8/8a/Yuuki_Konno.png","source":"Sword Art Online"}'
  
  # Fire Force
  '{"name":"Maki Oze","slug":"maki-oze","imageUrl":"https://static.wikia.nocookie.net/fire-brigade-of-flames/images/f/f9/Maki_Oze_anime.png","source":"Fire Force"}'
  '{"name":"Tamaki Kotatsu","slug":"tamaki-kotatsu","imageUrl":"https://static.wikia.nocookie.net/fire-brigade-of-flames/images/2/2f/Tamaki_anime.png","source":"Fire Force"}'
  
  # Date A Live
  '{"name":"Tohka Yatogami","slug":"tohka-yatogami","imageUrl":"https://static.wikia.nocookie.net/date-a-live/images/3/3a/Tohka_anime.png","source":"Date A Live"}'
  '{"name":"Kurumi Tokisaki","slug":"kurumi-tokisaki","imageUrl":"https://static.wikia.nocookie.net/date-a-live/images/f/f4/Kurumi_anime.png","source":"Date A Live"}'
  
  # The Rising of the Shield Hero
  '{"name":"Raphtalia","slug":"raphtalia","imageUrl":"https://static.wikia.nocookie.net/the-rising-of-the-shield-hero/images/5/5f/Raphtalia_anime.png","source":"The Rising of the Shield Hero"}'
  '{"name":"Filo","slug":"filo","imageUrl":"https://static.wikia.nocookie.net/the-rising-of-the-shield-hero/images/e/e8/Filo_anime.png","source":"The Rising of the Shield Hero"}'
  
  # Mushoku Tensei
  '{"name":"Roxy Migurdia","slug":"roxy-migurdia","imageUrl":"https://static.wikia.nocookie.net/mushokutensei/images/3/3e/Roxy_anime.png","source":"Mushoku Tensei"}'
  '{"name":"Eris Boreas Greyrat","slug":"eris-boreas-greyrat","imageUrl":"https://static.wikia.nocookie.net/mushokutensei/images/7/7a/Eris_anime.png","source":"Mushoku Tensei"}'
  '{"name":"Sylphiette","slug":"sylphiette","imageUrl":"https://static.wikia.nocookie.net/mushokutensei/images/4/4d/Sylphiette_anime.png","source":"Mushoku Tensei"}'
  
  # Solo Leveling
  '{"name":"Cha Hae-In","slug":"cha-hae-in","imageUrl":"https://static.wikia.nocookie.net/solo-leveling/images/5/5f/Cha_Hae-In.png","source":"Solo Leveling"}'
  
  # Tower of God
  '{"name":"Yuri Zahard","slug":"yuri-zahard","imageUrl":"https://static.wikia.nocookie.net/towerofgod/images/3/3e/Yuri_Zahard.png","source":"Tower of God"}'
  '{"name":"Hwaryun","slug":"hwaryun","imageUrl":"https://static.wikia.nocookie.net/towerofgod/images/f/f4/Hwaryun.png","source":"Tower of God"}'
)

# Contador
success=0
failed=0
total=${#waifus[@]}

# Iterar y hacer POST
for i in "${!waifus[@]}"; do
  waifu="${waifus[$i]}"
  name=$(echo "$waifu" | jq -r '.name')
  
  echo -n "[$((i+1))/$total] Inserting: $name... "
  
  response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$waifu")
  
  http_code=$(echo "$response" | tail -n1)
  
  if [ "$http_code" -eq 201 ]; then
    echo "✅ Success"
    ((success++))
  else
    echo "❌ Failed (HTTP $http_code)"
    ((failed++))
  fi
  
  # Pequeña pausa para no saturar el servidor
  sleep 0.1
done

echo ""
echo "================================"
echo "🎉 Seeding completed!"
echo "✅ Success: $success"
echo "❌ Failed: $failed"
echo "📊 Total: $total"
echo "================================"
