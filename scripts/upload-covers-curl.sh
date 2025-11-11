#!/bin/bash

API_URL="http://localhost:3000/api"

echo "🖼️  Uploading cover images to Payload CMS..."
echo ""

# Upload image 1 (Cars)
echo "📸 Uploading afcon-luxury-car.jpg..."
RESPONSE1=$(curl -s -X POST "$API_URL/media" \
  -F "file=@public/images/afcon-luxury-car.jpg" \
  -F "alt=Luxury chauffeur service driving to AFCON 2025 match in Marrakech")

MEDIA_ID_1=$(echo $RESPONSE1 | python3 -c "import json, sys; data=json.load(sys.stdin); print(data.get('doc', {}).get('id') or data.get('id', ''))" 2>/dev/null)

if [ ! -z "$MEDIA_ID_1" ]; then
  echo "✅ Image 1 uploaded (ID: $MEDIA_ID_1)"

  # Update article 1
  curl -s -X PATCH "$API_URL/blog-posts/1" \
    -H "Content-Type: application/json" \
    -d "{\"cover\": \"$MEDIA_ID_1\"}" > /dev/null
  echo "✅ Article 1 (Cars) updated with cover"
else
  echo "❌ Failed to upload image 1"
fi

echo ""

# Upload image 2 (Villas)
echo "📸 Uploading afcon-villa-screening.jpg..."
RESPONSE2=$(curl -s -X POST "$API_URL/media" \
  -F "file=@public/images/afcon-villa-screening.jpg" \
  -F "alt=Private villa screening room for watching AFCON 2025 matches")

MEDIA_ID_2=$(echo $RESPONSE2 | python3 -c "import json, sys; data=json.load(sys.stdin); print(data.get('doc', {}).get('id') or data.get('id', ''))" 2>/dev/null)

if [ ! -z "$MEDIA_ID_2" ]; then
  echo "✅ Image 2 uploaded (ID: $MEDIA_ID_2)"

  # Update article 2
  curl -s -X PATCH "$API_URL/blog-posts/2" \
    -H "Content-Type: application/json" \
    -d "{\"cover\": \"$MEDIA_ID_2\"}" > /dev/null
  echo "✅ Article 2 (Villas) updated with cover"
else
  echo "❌ Failed to upload image 2"
fi

echo ""

# Upload image 3 (Concierge)
echo "📸 Uploading afcon-riad-dining.jpg..."
RESPONSE3=$(curl -s -X POST "$API_URL/media" \
  -F "file=@public/images/afcon-riad-dining.jpg" \
  -F "alt=Private riad dinner between AFCON 2025 matches in Marrakech")

MEDIA_ID_3=$(echo $RESPONSE3 | python3 -c "import json, sys; data=json.load(sys.stdin); print(data.get('doc', {}).get('id') or data.get('id', ''))" 2>/dev/null)

if [ ! -z "$MEDIA_ID_3" ]; then
  echo "✅ Image 3 uploaded (ID: $MEDIA_ID_3)"

  # Update article 3
  curl -s -X PATCH "$API_URL/blog-posts/3" \
    -H "Content-Type: application/json" \
    -d "{\"cover\": \"$MEDIA_ID_3\"}" > /dev/null
  echo "✅ Article 3 (Concierge) updated with cover"
else
  echo "❌ Failed to upload image 3"
fi

echo ""
echo "✅ Process complete!"
echo ""
echo "🌐 View updated articles:"
echo "   EN: http://localhost:3000/en/blog"
echo "   FR: http://localhost:3000/fr/blog"
echo ""
