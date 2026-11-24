KISAAN BAZAAR – वेबसाइट फाइलें

आपकी GitHub रिपॉजिटरी: Skt80851813/kisan-bazaar
वेबसाइट का नाम: KISAAN BAZAAR
डिजाइन: मोबाइल-फ्रेंडली हिंदी ऑनलाइन मार्केटप्लेस

फाइलें:
- index.html : वेबसाइट का मुख्य पेज
- style.css : डिजाइन
- app.js : कैटेगरी, सर्च, कार्ट, किसान लिस्टिंग और डेमो ऑर्डर
- config.js : Supabase सेटिंग
- supabase-schema.sql : डेटाबेस बनाने की शुरुआती SQL स्क्रिप्ट

GitHub पर अपलोड करने का तरीका:
1. https://github.com/Skt80851813/kisan-bazaar खोलें।
2. Add file > Upload files दबाएँ।
3. इस ZIP की सभी फाइलें निकालकर (extract करके) अपलोड करें। index.html रिपॉजिटरी के मुख्य पेज में होना चाहिए, किसी अंदर के folder में नहीं।
4. Commit changes दबाएँ।
5. Settings > Pages में जाएँ।
6. Build and deployment में Deploy from a branch चुनें।
7. Branch: main और folder: / (root) चुनकर Save करें।
8. GitHub Pages URL कुछ मिनट में Settings > Pages पर दिखेगा।

जरूरी:
अभी वेबसाइट DEMO MODE में है। नमूना सामान दिखेगा। किसान की नई लिस्टिंग और कार्ट/ऑर्डर उसी ब्राउज़र में सेव होंगे; दूसरे ग्राहक या किसान को अपने-आप नहीं दिखेंगे।
सभी यूज़र के बीच लाइव डेटा, सुरक्षित किसान अकाउंट, ऑर्डर और एडमिन सुविधा के लिए Supabase सेटअप करना जरूरी है। उसके लिए supabase-schema.sql चलाएँ, config.js में Supabase publishable/anon key डालें, और उसके बाद ऐप के Supabase integration को पूरा करें।
Google Sites अकेले Amazon-जैसा multi-vendor marketplace, लॉगिन और ऑटोमेटिक कमीशन नहीं चला सकता।

फीस/कमीशन:
पहले चर्चा में ₹99 / 3 महीने सदस्यता और बिक्री पर 2% प्लेटफॉर्म कमीशन की बात हुई थी। यह पैकेज अभी वेबसाइट में भुगतान/कटौती के रूप में सक्रिय नहीं है। असली भुगतान और अपने-आप 2% कटौती के लिए पेमेंट गेटवे, सर्वर-साइड ऑर्डर वेरिफिकेशन और कानूनी/टैक्स सेटअप चाहिए।
