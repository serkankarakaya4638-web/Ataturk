/* ==========================================================================
   Mustafa Kemal Atatürk’ün Yolculuğu — Etkileşimli Harita ve Kronoloji Motoru
   ========================================================================== */

const ERAS = [
  {
    "roman": "I",
    "stage": "I. Çocukluk ve Eğitim",
    "years": "1881–1905",
    "startIndex": 0,
    "endIndex": 5,
    "desc": "Selanik’ten Manastır’a, Pangaltı Harbiye’den Harp Akademisi’ne uzanan öğrenim ve fikir oluşumu yılları.",
    "center": [
      25.8,
      40.8
    ],
    "zoom": 5.5
  },
  {
    "roman": "II",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "years": "1905–1910",
    "startIndex": 6,
    "endIndex": 13,
    "desc": "5. Ordu’daki ilk kıta görevleri, Vatan ve Hürriyet Cemiyeti, II. Meşrutiyet ve Hareket Ordusu.",
    "center": [
      24.5,
      40.2
    ],
    "zoom": 4.3
  },
  {
    "roman": "III",
    "stage": "III. Trablusgarp, Balkanlar ve Sofya",
    "years": "1911–1915",
    "startIndex": 14,
    "endIndex": 19,
    "desc": "Tobruk ve Derne savunması, Balkan Savaşı sonrası Edirne ve Sofya ataşemiliterliği.",
    "center": [
      24.8,
      37.5
    ],
    "zoom": 4.8
  },
  {
    "roman": "IV",
    "stage": "IV. Birinci Dünya Savaşı",
    "years": "1915–1918",
    "startIndex": 20,
    "endIndex": 31,
    "desc": "Arıburnu ve Anafartalar’dan Kafkas ve Suriye cephelerine uzanan zorlu komutanlık yılları.",
    "center": [
      33.5,
      38.8
    ],
    "zoom": 4.7
  },
  {
    "roman": "V",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "years": "1918–1920",
    "startIndex": 32,
    "endIndex": 45,
    "desc": "Samsun’a çıkıştan Amasya, Erzurum ve Sivas Kongrelerine; Ankara’da TBMM’nin açılışına.",
    "center": [
      34.8,
      40.0
    ],
    "zoom": 5.6
  },
  {
    "roman": "VI",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "years": "1920–1923",
    "startIndex": 46,
    "endIndex": 72,
    "desc": "İnönü, Sakarya ve Büyük Taarruz’dan Lozan Barış Antlaşması’na ve Cumhuriyet’in ilanına.",
    "center": [
      30.5,
      39.3
    ],
    "zoom": 5.4
  },
  {
    "roman": "VII",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "years": "1924–1953",
    "startIndex": 73,
    "endIndex": 119,
    "desc": "Hukuk, eğitim, kültür ve sanayi devrimlerinden yurt gezilerine; 10 Kasım 1938’den Anıtkabir’e.",
    "center": [
      32.8,
      39.6
    ],
    "zoom": 5.4
  }
];

const STOPS = [
  {
    "index": 1,
    "id": "selanik-dogumu-ve-aile-ortami",
    "title": "Selanik’te Doğumu ve Aile Ortamı",
    "year": "1881",
    "region": "Selanik",
    "stage": "I. Çocukluk ve Eğitim",
    "stageIndex": 0,
    "roleType": "bizzat-sahada",
    "coords": [
      22.9531,
      40.642
    ],
    "zoom": 14.0,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/001-selanik-dogumu-ve-aile-ortami.webp",
    "alt": "Mustafa’nın 1881 yılında doğduğu Selanik’teki üç katlı cumbalı tarihî evin dış cephe görünümü"
  },
  {
    "index": 2,
    "id": "ilkogrenim-baba-kaybi-ve-rapla-ciftligi",
    "title": "İlköğrenim, Baba Kaybı ve Rapla Çiftliği",
    "year": "1887–1893",
    "region": "Selanik / Langaza",
    "stage": "I. Çocukluk ve Eğitim",
    "stageIndex": 0,
    "roleType": "bizzat-sahada",
    "coords": [
      23.0696,
      40.7512
    ],
    "zoom": 10.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/002-ilkogrenim-baba-kaybi-ve-rapla-ciftligi.webp",
    "alt": "Selanik’te ilköğrenim gördüğü okulun kurucusu öğretmen Şemsi Efendi ile öğrencisinin siyah-beyaz arşiv fotoğrafı"
  },
  {
    "index": 3,
    "id": "selanik-askeri-rustiyesi-ve-kemal-adi",
    "title": "Selanik Askerî Rüştiyesi ve “Kemal” Adı",
    "year": "1893–1895",
    "region": "Selanik",
    "stage": "I. Çocukluk ve Eğitim",
    "stageIndex": 0,
    "roleType": "bizzat-sahada",
    "coords": [
      22.9485,
      40.6392
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/003-selanik-askeri-rustiyesi-ve-kemal-adi.webp",
    "alt": "Selanik Askerî Rüştiyesi dördüncü sınıf öğrencilerinin Osmanlıca not cetvelinde Mustafa Kemal ve arkadaşlarının puanları"
  },
  {
    "index": 4,
    "id": "manastir-askeri-idadisi",
    "title": "Manastır Askerî İdadisi",
    "year": "1896–1899",
    "region": "Manastır",
    "stage": "I. Çocukluk ve Eğitim",
    "stageIndex": 0,
    "roleType": "bizzat-sahada",
    "coords": [
      21.3357,
      41.0237
    ],
    "zoom": 14.0,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/004-manastir-askeri-idadisi.webp",
    "alt": "1890’lı yıllara ait siyah-beyaz arşiv fotoğrafında Manastır Askerî İdadisinin ön cephesi, pencereleri ve bahçe duvarı"
  },
  {
    "index": 5,
    "id": "harp-okulu-yillari",
    "title": "Harp Okulu Yılları",
    "year": "1899–1902",
    "region": "İstanbul",
    "stage": "I. Çocukluk ve Eğitim",
    "stageIndex": 0,
    "roleType": "bizzat-sahada",
    "coords": [
      28.9882,
      41.0489
    ],
    "zoom": 14.0,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/005-harp-okulu-yillari.webp",
    "alt": "Mekteb-i Harbiye öğrencisi Mustafa Kemal’in önde soldan ikinci oturduğu yedi Harbiyeli arkadaşlı 1901 tarihli sepya grup fotoğrafı"
  },
  {
    "index": 6,
    "id": "harp-akademisi-ve-kurmay-yuzbasilik",
    "title": "Harp Akademisi ve Kurmay Yüzbaşılık",
    "year": "1902–1905",
    "region": "İstanbul",
    "stage": "I. Çocukluk ve Eğitim",
    "stageIndex": 0,
    "roleType": "bizzat-sahada",
    "coords": [
      28.9885,
      41.0493
    ],
    "zoom": 14.0,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/006-harp-akademisi-ve-kurmay-yuzbasilik.webp",
    "alt": "Kurmay Yüzbaşı Mustafa Kemal’in 1905’te İstanbul’da çekilen fesli, siyah pelerinli ve bastonlu portresi"
  },
  {
    "index": 7,
    "id": "samda-5-ordu-staji-ve-saha-gorevleri",
    "title": "Şam’da 5. Ordu Stajı ve Saha Görevleri",
    "year": "1905–1906",
    "region": "Şam / Havran",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "stageIndex": 1,
    "roleType": "bizzat-sahada",
    "coords": [
      36.2889,
      33.5117
    ],
    "zoom": 10.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/007-samda-5-ordu-staji-ve-saha-gorevleri.webp",
    "alt": "Kurmay Yüzbaşı Mustafa Kemal’in 15 Temmuz 1906’da Beyrut’ta 5. Ordu subaylarıyla çekilen siyah-beyaz fotoğrafı"
  },
  {
    "index": 8,
    "id": "vatan-ve-hurriyet-cemiyetinin-kurulusu",
    "title": "Vatan ve Hürriyet Cemiyeti’nin Kuruluşu",
    "year": "1906–1907",
    "region": "Şam / Selanik",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "stageIndex": 1,
    "roleType": "kurucu-onculuk",
    "coords": [
      36.3025,
      33.5106
    ],
    "zoom": 6.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/008-vatan-ve-hurriyet-cemiyetinin-kurulusu.webp",
    "alt": "Kurmay Yüzbaşı Mustafa Kemal’in Haziran 1907’de Şam’da subay arkadaşlarıyla birlikte çekilen siyah-beyaz fotoğrafı"
  },
  {
    "index": 9,
    "id": "selanik-3-ordu-ve-ii-mesrutiyet",
    "title": "Selanik, 3. Ordu ve II. Meşrutiyet",
    "year": "1907–1908",
    "region": "Selanik",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "stageIndex": 1,
    "roleType": "bizzat-sahada",
    "coords": [
      22.9567,
      40.6231
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/009-selanik-3-ordu-ve-ii-mesrutiyet.webp",
    "alt": "II. Meşrutiyet döneminin Selanik İnkılap Bulvarı’nda tramvay, at arabası ve yayaları gösteren siyah-beyaz arşiv fotoğrafı"
  },
  {
    "index": 10,
    "id": "1908-trablusgarp-ve-bingazi-gorevi",
    "title": "1908 Trablusgarp ve Bingazi Görevi",
    "year": "Eylül–Aralık 1908",
    "region": "Trablusgarp / Bingazi",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "stageIndex": 1,
    "roleType": "bizzat-sahada",
    "coords": [
      13.1803,
      32.8967
    ],
    "zoom": 6.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/010-1908-trablusgarp-ve-bingazi-gorevi.webp",
    "alt": "Trablusgarp’ta 1908’de Mustafa Kemal’i Sancak Kumandanı İbrahim Paşa’nın yanında otururken gösteren siyah-beyaz arşiv fotoğrafı"
  },
  {
    "index": 11,
    "id": "31-mart-olayi-ve-hareket-ordusu",
    "title": "31 Mart Olayı ve Hareket Ordusu",
    "year": "Nisan 1909",
    "region": "İstanbul / Bakırköy",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "stageIndex": 1,
    "roleType": "bizzat-sahada",
    "coords": [
      28.8724,
      40.9795
    ],
    "zoom": 11.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/011-31-mart-olayi-ve-hareket-ordusu.webp",
    "alt": "Selanik’te 1909 Nisan’ında Hareket Ordusu Komutanı Hüseyin Hüsnü Paşa ile Kolağası Mustafa Kemal’in yan yana portresi"
  },
  {
    "index": 12,
    "id": "1909-ittihat-ve-terakki-selanik-kongresi",
    "title": "1909 İttihat ve Terakki Selanik Kongresi",
    "year": "22 Eylül 1909",
    "region": "Selanik",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "stageIndex": 1,
    "roleType": "bizzat-sahada",
    "coords": [
      22.9408,
      40.6327
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/012-1909-ittihat-ve-terakki-selanik-kongresi.webp",
    "alt": "Kolağası Mustafa Kemal’in 1909’da Selanik’teki askerî tatbikat sırasında subaylarla çekilen siyah-beyaz fotoğrafı"
  },
  {
    "index": 13,
    "id": "arnavutluk-harekati",
    "title": "Arnavutluk Harekâtı",
    "year": "Mayıs–Temmuz 1910",
    "region": "Kosova / Arnavutluk",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "stageIndex": 1,
    "roleType": "bizzat-sahada",
    "coords": [
      20.9853,
      42.4356
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/013-arnavutluk-harekati.webp",
    "alt": "Kolağası Mustafa Kemal’in Haziran 1910’da Makedonya’daki görev sırasında subay arkadaşlarıyla çekilen siyah-beyaz fotoğrafı"
  },
  {
    "index": 14,
    "id": "picardie-manevralari",
    "title": "Picardie Manevraları",
    "year": "12–18 Eylül 1910",
    "region": "Picardie / Fransa",
    "stage": "II. Şam, Selanik ve Meşrutiyet",
    "stageIndex": 1,
    "roleType": "bizzat-sahada",
    "coords": [
      2.3,
      49.8941
    ],
    "zoom": 8.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/014-picardie-manevralari.webp",
    "alt": "Kolağası Mustafa Kemal’in Eylül 1910’da Fransa’daki Picardie Manevraları’nda Ali Fethi ve Fransız subaylarla fotoğrafı"
  },
  {
    "index": 15,
    "id": "trablusgarpa-gecis-ve-tobruk-muharebesi",
    "title": "Trablusgarp’a Geçiş ve Tobruk Muharebesi",
    "year": "Ekim–Aralık 1911",
    "region": "Tobruk",
    "stage": "III. Trablusgarp, Balkanlar ve Sofya",
    "stageIndex": 2,
    "roleType": "bizzat-sahada",
    "coords": [
      23.9764,
      32.0836
    ],
    "zoom": 8.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/015-trablusgarpa-gecis-ve-tobruk-muharebesi.webp",
    "alt": "Kurmay Binbaşı Mustafa Kemal’in Aralık 1911’de Trablusgarp cephe hattında Enver Bey ve silah arkadaşlarıyla fotoğrafı"
  },
  {
    "index": 16,
    "id": "derne-komutanligi-ve-goz-yaralanmasi",
    "title": "Derne Komutanlığı ve Göz Yaralanması",
    "year": "Ocak–Ekim 1912",
    "region": "Derne",
    "stage": "III. Trablusgarp, Balkanlar ve Sofya",
    "stageIndex": 2,
    "roleType": "bizzat-sahada",
    "coords": [
      22.6333,
      32.7667
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/016-derne-komutanligi-ve-goz-yaralanmasi.webp",
    "alt": "Mustafa Kemal, Derne cephesinde Bedevi mücahitlerin önünde kalpaklı ve üniformalı hâlde emirlerini yazdırırken görülüyor."
  },
  {
    "index": 17,
    "id": "selanikin-kaybi-ve-istanbula-donus",
    "title": "Selanik’in Kaybı ve İstanbul’a Dönüş",
    "year": "Kasım 1912",
    "region": "İstanbul / Beşiktaş",
    "stage": "III. Trablusgarp, Balkanlar ve Sofya",
    "stageIndex": 2,
    "roleType": "bizzat-sahada",
    "coords": [
      29.0017,
      41.0424
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/017-selanikin-kaybi-ve-istanbula-donus.webp",
    "alt": "Balkan Savaşı sırasında İstanbul sokaklarında cepheye uğurlanan Osmanlı askerleri ve kalabalık halk arşiv karesinde görülüyor."
  },
  {
    "index": 18,
    "id": "bolayir-gorevi-ve-gelibolu-savunmasi",
    "title": "Bolayır Görevi ve Gelibolu Savunması",
    "year": "1912–1913",
    "region": "Bolayır / Gelibolu",
    "stage": "III. Trablusgarp, Balkanlar ve Sofya",
    "stageIndex": 2,
    "roleType": "bizzat-sahada",
    "coords": [
      26.7573,
      40.515
    ],
    "zoom": 10.8,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/018-bolayir-gorevi-ve-gelibolu-savunmasi.webp",
    "alt": "Şubat 1913 Bolayır Muharebesi sırasında siperdeki askerler ve top dumanı siyah-beyaz arşiv karesinde görülüyor."
  },
  {
    "index": 19,
    "id": "edirnenin-geri-alinisi-ve-dimetoka",
    "title": "Edirne’nin Geri Alınışı ve Dimetoka",
    "year": "21–22 Temmuz 1913",
    "region": "Edirne",
    "stage": "III. Trablusgarp, Balkanlar ve Sofya",
    "stageIndex": 2,
    "roleType": "bizzat-sahada",
    "coords": [
      26.556,
      41.6772
    ],
    "zoom": 11.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/019-edirnenin-geri-alinisi-ve-dimetoka.webp",
    "alt": "1913 tarihli siyah-beyaz arşiv karesinde İstanbul yolundan Edirne şehri ve Selimiye Camii silueti görülüyor."
  },
  {
    "index": 20,
    "id": "sofya-askeri-ataseligi",
    "title": "Sofya Askerî Ataşeliği",
    "year": "1913–1915",
    "region": "Sofya",
    "stage": "III. Trablusgarp, Balkanlar ve Sofya",
    "stageIndex": 2,
    "roleType": "bizzat-sahada",
    "coords": [
      23.3223,
      42.6976
    ],
    "zoom": 11.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/020-sofya-askeri-ataseligi.webp",
    "alt": "Sofya Askerî Ataşesi Mustafa Kemal, katıldığı baloda geleneksel yeniçeri kıyafetiyle tam boy poz verirken görülüyor."
  },
  {
    "index": 21,
    "id": "19-tumen-maydos-ve-18-mart-baglami",
    "title": "19. Tümen, Maydos ve 18 Mart Bağlamı",
    "year": "Ocak–Nisan 1915",
    "region": "Eceabat / Maydos",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      26.3572,
      40.1844
    ],
    "zoom": 11.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/021-19-tumen-maydos-ve-18-mart-baglami.webp",
    "alt": "1915’te Çanakkale Boğazı savunma mevziindeki ağır kıyı topu ve başındaki Osmanlı askerleri siyah-beyaz arşiv karesinde görülüyor."
  },
  {
    "index": 22,
    "id": "25-nisan-ariburnu-savunmasi-ve-57-alay",
    "title": "25 Nisan Arıburnu Savunması ve 57. Alay",
    "year": "25 Nisan 1915",
    "region": "Eceabat / Arıburnu",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      26.3047,
      40.2357
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/022-25-nisan-ariburnu-savunmasi-ve-57-alay.webp",
    "alt": "Çanakkale siperlerinde üniformalı Mustafa Kemal ile gözetleme yapan Osmanlı askerleri siyah-beyaz fotoğrafta görülüyor."
  },
  {
    "index": 23,
    "id": "anafartalar-ve-conkbayiri-zaferi",
    "title": "Anafartalar ve Conkbayırı Zaferi",
    "year": "8–10 Ağustos 1915",
    "region": "Conkbayırı / Anafartalar",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      26.3082,
      40.2519
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/023-anafartalar-ve-conkbayiri-zaferi.webp",
    "alt": "Mustafa Kemal Bey, 1915 Çanakkale Cephesi’nde kalpağı ve askerî üniformasıyla tepe sırtında ayakta dururken görülüyor"
  },
  {
    "index": 24,
    "id": "kirectepe-ii-anafartalar-ve-cepheden-ayrilis",
    "title": "Kireçtepe, II. Anafartalar ve Cepheden Ayrılış",
    "year": "Ağustos–Aralık 1915",
    "region": "Kireçtepe / Gelibolu",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      26.2756,
      40.3313
    ],
    "zoom": 12.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/024-kirectepe-ii-anafartalar-ve-cepheden-ayrilis.webp",
    "alt": "Mustafa Kemal Bey, 1915’te Gelibolu sırtlarında İstanbul’dan gelen yazar ve aydın heyetine cephe hattını anlatırken görülüyor."
  },
  {
    "index": 25,
    "id": "16-kolordu-diyarbakir-ve-pasalik-terfisi",
    "title": "16. Kolordu, Diyarbakır ve Paşalık Terfisi",
    "year": "Ocak–Nisan 1916",
    "region": "Edirne / Silvan",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      41.0081,
      38.137
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/025-16-kolordu-diyarbakir-ve-pasalik-terfisi.webp",
    "alt": "16. Kolordu Komutanı Mustafa Kemal, Şubat 1916’da Edirne’de eğitimci ve öğrencilerle çekilen siyah-beyaz fotoğrafta görülüyor"
  },
  {
    "index": 26,
    "id": "mus-ve-bitlisin-kurtarilmasi",
    "title": "Muş ve Bitlis’in Kurtarılması",
    "year": "7–8 Ağustos 1916",
    "region": "Muş / Bitlis",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      42.1078,
      38.4012
    ],
    "zoom": 8.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/026-mus-ve-bitlisin-kurtarilmasi.webp",
    "alt": "16. Kolordu Komutanı Mustafa Kemal Paşa, Kasım 1916’da Bitlis kırsalında at üzerinde süvari birliğiyle ilerlerken görülüyor."
  },
  {
    "index": 27,
    "id": "2-ordu-komutanligi",
    "title": "2. Ordu Komutanlığı",
    "year": "Mart–Temmuz 1917",
    "region": "Diyarbakır",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      40.2306,
      37.9144
    ],
    "zoom": 10.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/027-2-ordu-komutanligi.webp",
    "alt": "2. Ordu Komutanı Mustafa Kemal Paşa’nın 1917’de Diyarbakır’da subaylarla Avusturya-Macaristan otomobil kolunu yürüyerek denetlemesi"
  },
  {
    "index": 28,
    "id": "7-ordu-ve-20-eylul-1917-raporu",
    "title": "7. Ordu ve 20 Eylül 1917 Raporu",
    "year": "Temmuz–Ekim 1917",
    "region": "Halep",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      37.1612,
      36.2021
    ],
    "zoom": 10.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/028-7-ordu-ve-20-eylul-1917-raporu.webp",
    "alt": "7. Ordu Komutanı Mustafa Kemal Paşa, 1917’de Halep’te çekilen kalpaklı ve nişanlı resmî portresinde görülüyor."
  },
  {
    "index": 29,
    "id": "veliaht-vahdettin-ile-almanya-seyahati",
    "title": "Veliaht Vahdettin ile Almanya Seyahati",
    "year": "1917–1918",
    "region": "Almanya",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      13.405,
      52.52
    ],
    "zoom": 6.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/029-veliaht-vahdettin-ile-almanya-seyahati.webp",
    "alt": "Bad Kreuznach’taki Alman Genel Karargâhı girişinde Hindenburg ve Ludendorff’u gösteren 1917 tarihli siyah-beyaz fotoğraf"
  },
  {
    "index": 30,
    "id": "karlsbad-tedavi-gunleri-ve-gunlukleri",
    "title": "Karlsbad Tedavi Günleri ve Günlükleri",
    "year": "Haziran–Temmuz 1918",
    "region": "Karlsbad",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      12.8712,
      50.2327
    ],
    "zoom": 10.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/030-karlsbad-tedavi-gunleri-ve-gunlukleri.webp",
    "alt": "Karlsbad’daki tarihî Kurhaus kaplıca binasını, ağaçlı caddeyi ve arka yamaçtaki yapıları gösteren monokrom arşiv fotoğrafı"
  },
  {
    "index": 31,
    "id": "yedinci-ordu-katma-muharebesi",
    "title": "7. Ordu’ya Dönüş ve Katma Muharebesi",
    "year": "Ağustos–Ekim 1918",
    "region": "Halep / Katma",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      36.9611,
      36.592
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/031-yedinci-ordu-katma-muharebesi.webp",
    "alt": "Mustafa Kemal Paşa, 1918 yılında Suriye cephesi döneminde üç yaveriyle birlikte hasır koltukta otururken görülüyor."
  },
  {
    "index": 32,
    "id": "yildirim-ordulari-grubu-ve-mondrosa-itiraz",
    "title": "Yıldırım Orduları Grubu ve Mondros’a İtiraz",
    "year": "31 Ekim–10 Kasım 1918",
    "region": "Adana",
    "stage": "IV. Birinci Dünya Savaşı",
    "stageIndex": 3,
    "roleType": "bizzat-sahada",
    "coords": [
      35.3306,
      36.9884
    ],
    "zoom": 11.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/032-yildirim-ordulari-grubu-ve-mondrosa-itiraz.webp",
    "alt": "Mustafa Kemal Paşa, 31 Ekim 1918’de Adana’da Yıldırım Orduları Grubu komutasını Liman von Sanders’tan devralırken."
  },
  {
    "index": 33,
    "id": "istanbula-donus-ve-sisli-toplantilari",
    "title": "İstanbul’a Dönüş ve Şişli Toplantıları",
    "year": "1918–1919",
    "region": "İstanbul / Şişli",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      28.9872,
      41.0564
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/033-istanbula-donus-ve-sisli-toplantilari.webp",
    "alt": "Boğaziçi açıklarında Anadolu Kavağı önünde ilerleyen İtilaf Donanması’na ait zırhlı savaş gemisi, Kasım 1918"
  },
  {
    "index": 34,
    "id": "dokuzuncu-ordu-mufettisligi-bandirma-vapuru",
    "title": "9. Ordu Müfettişliği ve Bandırma Vapuru",
    "year": "16 Mayıs 1919",
    "region": "İstanbul Boğazı",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      29.0041,
      41.021
    ],
    "zoom": 12.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/034-dokuzuncu-ordu-mufettisligi-bandirma-vapuru.webp",
    "alt": "Mustafa Kemal Paşa, 1919’da Dokuzuncu Ordu Müfettişi üniforması ve kalpağıyla siyah-beyaz arşiv portresinde görülüyor."
  },
  {
    "index": 35,
    "id": "samsuna-cikis-ve-samsun-raporu",
    "title": "Samsun’a Çıkış ve Samsun Raporu",
    "year": "19 Mayıs 1919",
    "region": "Samsun",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      36.3324,
      41.2902
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/035-samsuna-cikis-ve-samsun-raporu.webp",
    "alt": "Mustafa Kemal Paşa’nın Mayıs 1919’da karargâh olarak kullandığı Samsun Mıntıka Palas binasının tarihî siyah-beyaz görünümü."
  },
  {
    "index": 36,
    "id": "havza-genelgesi-ve-ilk-mitingler",
    "title": "Havza Genelgesi ve İlk Mitingler",
    "year": "28 Mayıs 1919",
    "region": "Havza",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      35.6638,
      40.9706
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/036-havza-genelgesi-ve-ilk-mitingler.webp",
    "alt": "Mayıs 1919’da işgallere karşı düzenlenen mitingde ellerinde pankartlar ve bayraklarla toplanan kalabalık görülüyor."
  },
  {
    "index": 37,
    "id": "amasya-genelgesi",
    "title": "Amasya Genelgesi",
    "year": "22 Haziran 1919",
    "region": "Amasya",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      35.8395,
      40.6545
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/037-amasya-genelgesi.webp",
    "alt": "22 Haziran 1919 tarihli Amasya Genelgesi’nin ATASE Arşivi damgalı özgün Osmanlıca el yazması sayfası."
  },
  {
    "index": 38,
    "id": "erzuruma-gelis-askerlikten-istifa",
    "title": "Erzurum’a Geliş ve Askerlikten İstifa",
    "year": "8–9 Temmuz 1919",
    "region": "Erzurum",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      41.2732,
      39.906
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/038-erzuruma-gelis-askerlikten-istifa.webp",
    "alt": "Mustafa Kemal Paşa, 5 Temmuz 1919’da Erzurum’da Refik Saydam ve yakın çalışma arkadaşlarıyla birlikte görülüyor."
  },
  {
    "index": 39,
    "id": "erzurum-kongresi",
    "title": "Erzurum Kongresi",
    "year": "23 Temmuz 1919",
    "region": "Erzurum",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      41.2768,
      39.9149
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/039-erzurum-kongresi.webp",
    "alt": "Erzurum Kongresi’ne ev sahipliği yapan tarihî taş okul binasının bayraklı ön cephesi ve bahçesi"
  },
  {
    "index": 40,
    "id": "sivas-kongresi",
    "title": "Sivas Kongresi",
    "year": "4–11 Eylül 1919",
    "region": "Sivas",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      37.0136,
      39.7497
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/040-sivas-kongresi.webp",
    "alt": "Mustafa Kemal Paşa ve Sivas Kongresi delegeleri, Eylül 1919’da Sivas’ta bahçe içinde siyah-beyaz toplu karede görülüyor."
  },
  {
    "index": 41,
    "id": "amasya-gorusmeleri-protokolleri",
    "title": "Amasya Görüşmeleri ve Protokolleri",
    "year": "20–22 Ekim 1919",
    "region": "Amasya",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      35.833,
      40.6533
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/041-amasya-gorusmeleri-protokolleri.webp",
    "alt": "Mustafa Kemal Paşa, Ekim 1919’da Amasya’da 5. Kafkas Tümeni Kumandanı Cemil Cahit Bey ile otururken görülüyor."
  },
  {
    "index": 42,
    "id": "kayseri-hacibektas-ve-kirsehir-bulusmalari",
    "title": "Kayseri, Hacıbektaş ve Kırşehir Buluşmaları",
    "year": "18–26 Aralık 1919",
    "region": "Hacıbektaş / Kırşehir",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      34.5612,
      38.9427
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/042-kayseri-hacibektas-ve-kirsehir-bulusmalari.webp",
    "alt": "Mustafa Kemal Paşa, Rauf Orbay ve Heyet-i Temsiliye üyeleri Kayseri’deki karşılamada halkla bir arada, 20 Aralık 1919"
  },
  {
    "index": 43,
    "id": "temsil-heyetinin-ankaraya-gelisi",
    "title": "Temsil Heyeti’nin Ankara’ya Gelişi",
    "year": "27 Aralık 1919",
    "region": "Ankara / Dikmen",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "bizzat-sahada",
    "coords": [
      32.8386,
      39.8798
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/043-temsil-heyetinin-ankaraya-gelisi.webp",
    "alt": "Mustafa Kemal Paşa ve Ali Fuat Paşa 27 Aralık 1919 günü Ankara’da askerî birlikleri selamlarken"
  },
  {
    "index": 44,
    "id": "son-mebusan-meclisi-ve-misak-i-milli",
    "title": "Son Mebusan Meclisi ve Misak-ı Millî",
    "year": "28 Ocak 1920",
    "region": "İstanbul / Fındıklı",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "stratejik-yonetim",
    "coords": [
      28.9889,
      41.03
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/044-son-mebusan-meclisi-ve-misak-i-milli.webp",
    "alt": "1920’de Misak-ı Millî’nin kabul edildiği Fındıklı Meclis-i Mebusan binasının İstanbul Boğazı’ndan siyah-beyaz görünümü."
  },
  {
    "index": 45,
    "id": "istanbulun-isgali-ve-meclis-cagrisi",
    "title": "İstanbul’un İşgali ve Meclis Çağrısı",
    "year": "16–19 Mart 1920",
    "region": "Ankara",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8624,
      39.9691
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/045-istanbulun-isgali-ve-meclis-cagrisi.webp",
    "alt": "İstanbul’un işgali sırasında Beyazıt Meydanı’nda nöbet tutan Fransız askeri ve zırhlı tank, Mart 1920"
  },
  {
    "index": 46,
    "id": "tbmm-acilisi",
    "title": "Türkiye Büyük Millet Meclisi’nin Açılışı",
    "year": "23 Nisan 1920",
    "region": "Ankara",
    "stage": "V. Millî Mücadele’nin Örgütlenmesi",
    "stageIndex": 4,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 14.0,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/046-tbmm-acilisi.webp",
    "alt": "Ankara’daki Birinci Türkiye Büyük Millet Meclisi binası önünde 23 Nisan 1920 açılış töreninde toplanan halk"
  },
  {
    "index": 47,
    "id": "dogu-cephesi-gumru-antlasmasi",
    "title": "Doğu Cephesi ve Gümrü Antlaşması",
    "year": "2–3 Aralık 1920",
    "region": "Kars / Gümrü",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      43.8475,
      40.7894
    ],
    "zoom": 8.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/047-dogu-cephesi-gumru-antlasmasi.webp",
    "alt": "Sarıkamış’ta tarihî kışla önünde kalpaklı Kâzım Karabekir Paşa ve Doğu Cephesi subaylarını gösteren siyah-beyaz arşiv fotoğrafı"
  },
  {
    "index": 48,
    "id": "duzenli-orduya-gecis",
    "title": "Düzenli Orduya Geçiş",
    "year": "1920–1921",
    "region": "Eskişehir / Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      30.5206,
      39.7767
    ],
    "zoom": 8.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/048-duzenli-orduya-gecis.webp",
    "alt": "Mustafa Kemal Paşa, 1 Kasım 1920’de Ankara’daki subay okulu töreninde birliklerle"
  },
  {
    "index": 49,
    "id": "birinci-inonu-muharebesi",
    "title": "I. İnönü Muharebesi",
    "year": "6–10 Ocak 1921",
    "region": "İnönü / Eskişehir",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      30.1458,
      39.8147
    ],
    "zoom": 10.8,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/049-birinci-inonu-muharebesi.webp",
    "alt": "Mustafa Kemal Paşa ve kurmayları Birinci İnönü sonrasında Bozüyük cephesinde"
  },
  {
    "index": 50,
    "id": "teskilat-i-esasiye-kanunu",
    "title": "Teşkilât-ı Esasiye Kanunu",
    "year": "20 Ocak 1921",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/050-teskilat-i-esasiye-kanunu.webp",
    "alt": "Mustafa Kemal Paşa, Birinci TBMM genel kurul kürsüsünde milletvekillerine konuşurken"
  },
  {
    "index": 51,
    "id": "londra-konferansi",
    "title": "Londra Konferansı",
    "year": "21 Şubat–12 Mart 1921",
    "region": "Londra / İngiltere",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      -0.1378,
      51.5047
    ],
    "zoom": 6.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/051-londra-konferansi.webp",
    "alt": "Londra Konferansı’na katılan Türk heyetinden Yunus Nadi Bey, Cami Bey ve Bekir Sami Bey yan yana, 1921"
  },
  {
    "index": 52,
    "id": "istiklal-marsinin-kabulu",
    "title": "İstiklâl Marşı’nın Kabulü",
    "year": "12 Mart 1921",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/052-istiklal-marsinin-kabulu.webp",
    "alt": "Cerîde-i Resmiye’nin 21 Mart 1921 sayısında yayımlanan İstiklâl Marşı metni"
  },
  {
    "index": 53,
    "id": "moskova-antlasmasi",
    "title": "Moskova Antlaşması",
    "year": "16 Mart 1921",
    "region": "Moskova / Rusya",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      37.6173,
      55.7558
    ],
    "zoom": 6.0,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/053-moskova-antlasmasi.webp",
    "alt": "16 Mart 1921’de Moskova Antlaşması’nın imzalanması ve belgelerin karşılıklı sunuluşu"
  },
  {
    "index": 54,
    "id": "ikinci-inonu-muharebesi",
    "title": "II. İnönü Muharebesi",
    "year": "23 Mart – 1 Nisan 1921",
    "region": "Metristepe / İnönü",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      30.1772,
      39.9283
    ],
    "zoom": 11.0,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/054-ikinci-inonu-muharebesi.webp",
    "alt": "İnönü muharebe alanında zafer öncesi kurmay komutanlarla inceleme yapan Mustafa Kemal Paşa, 1921"
  },
  {
    "index": 55,
    "id": "ankarada-maarif-kongresi",
    "title": "Ankara’da Maarif Kongresi",
    "year": "15 Temmuz 1921",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8562,
      39.9412
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/055-ankarada-maarif-kongresi.webp",
    "alt": "1921 Maarif Kongresi’nin toplandığı Ankara’daki tarihî Maarif Vekâleti binasının dönem fotoğrafı"
  },
  {
    "index": 56,
    "id": "kutahya-eskisehir-ve-sakaryaya-cekilme",
    "title": "Kütahya–Eskişehir ve Sakarya’ya Çekilme",
    "year": "18–25 Temmuz 1921",
    "region": "Eskişehir / Karacahisar",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      30.4458,
      39.7328
    ],
    "zoom": 10.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/056-kutahya-eskisehir-ve-sakaryaya-cekilme.webp",
    "alt": "Temmuz 1921’de Kütahya–Eskişehir Muharebeleri sırasında Eskişehir’e giren Yunan süvari ve motorlu birlikleri"
  },
  {
    "index": 57,
    "id": "baskomutanlik-kanunu-ve-tekalif-i-milliye",
    "title": "Başkomutanlık Kanunu ve Tekâlif-i Millîye",
    "year": "5–8 Ağustos 1921",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/057-baskomutanlik-kanunu-ve-tekalif-i-milliye.webp",
    "alt": "Hâkimiyet-i Milliye gazetesinde Mustafa Kemal Paşa’nın 7 Ağustos 1921 başkomutanlık beyannamesi"
  },
  {
    "index": 58,
    "id": "sakarya-meydan-muharebesi-gazi-ve-maresal",
    "title": "Sakarya Meydan Muharebesi, Gazi ve Mareşal",
    "year": "Ağustos–Eylül 1921",
    "region": "Polatlı / Duatepe",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      32.0695,
      39.6014
    ],
    "zoom": 10.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/058-sakarya-meydan-muharebesi-gazi-ve-maresal.webp",
    "alt": "Mustafa Kemal Paşa, Fevzi Paşa ve İsmet Paşa 9 Eylül 1921’de Polatlı Zafer Tepe’de"
  },
  {
    "index": 59,
    "id": "kars-antlasmasi-ve-dogu-siniri",
    "title": "Kars Antlaşması ve Doğu Sınırı",
    "year": "13 Ekim 1921",
    "region": "Kars",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      43.0975,
      40.6013
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/059-kars-antlasmasi-ve-dogu-siniri.webp",
    "alt": "1921 Kars Antlaşması ile belirlenen Türkiye–Sovyet sınırını gösteren dönem haritası"
  },
  {
    "index": 60,
    "id": "ankara-antlasmasi-ve-guney-cephesi",
    "title": "Ankara Antlaşması ve Güney Cephesi",
    "year": "20 Ekim 1921",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      32.8438,
      39.936
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/060-ankara-antlasmasi-ve-guney-cephesi.webp",
    "alt": "Mustafa Kemal Paşa, 13 Haziran 1921’de Ankara’da Fransız temsilci Franklin-Bouillon ile yürürken"
  },
  {
    "index": 61,
    "id": "buyuk-taarruz-hazirligi-ve-aksehir-karargahi",
    "title": "Büyük Taarruz Hazırlığı ve Akşehir Karargâhı",
    "year": "Haziran–Temmuz 1922",
    "region": "İzmit / Akşehir",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      31.4147,
      38.3556
    ],
    "zoom": 10.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/061-buyuk-taarruz-hazirligi-ve-aksehir-karargahi.webp",
    "alt": "Mustafa Kemal Paşa, Mart 1922’de Batı Cephesi’nde İsmet Paşa, subaylar ve Sovyet heyetiyle teftiş sırasında"
  },
  {
    "index": 62,
    "id": "buyuk-taarruz-ve-kocatepe",
    "title": "Büyük Taarruz ve Kocatepe",
    "year": "26 Ağustos 1922",
    "region": "Kocatepe / Afyonkarahisar",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      30.5544,
      38.7455
    ],
    "zoom": 12.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/062-buyuk-taarruz-ve-kocatepe.webp",
    "alt": "Başkomutan Mustafa Kemal Paşa 26 Ağustos 1922 sabahı Afyon Kocatepe’de Büyük Taarruz’u izlerken"
  },
  {
    "index": 63,
    "id": "baskomutanlik-meydan-muharebesi",
    "title": "Başkomutanlık Meydan Muharebesi",
    "year": "30 Ağustos 1922",
    "region": "Zafertepe / Dumlupınar",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      30.0658,
      38.9297
    ],
    "zoom": 11.5,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/063-baskomutanlik-meydan-muharebesi.webp",
    "alt": "Büyük Taarruz sonrasında esir alınan Yunan Generali Kimon Digenis ve kurmayları Türk subayları eşliğinde ilerlerken"
  },
  {
    "index": 64,
    "id": "izmirin-kurtulusu",
    "title": "İzmir’in Kurtuluşu",
    "year": "9–10 Eylül 1922",
    "region": "İzmir",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      27.1287,
      38.4189
    ],
    "zoom": 12.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/064-izmirin-kurtulusu.webp",
    "alt": "9 Eylül 1922’de İzmir Hükûmet Konağı balkonunda Yüzbaşı Şerafettin ve süvari subayları Türk bayrağıyla"
  },
  {
    "index": 65,
    "id": "mudanya-ateskes-antlasmasi",
    "title": "Mudanya Ateşkes Antlaşması",
    "year": "11 Ekim 1922",
    "region": "Mudanya / Bursa",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      28.8817,
      40.3797
    ],
    "zoom": 12.0,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/065-mudanya-ateskes-antlasmasi.webp",
    "alt": "İsmet Paşa ve Türk delegasyonunun Ekim 1922’de Mudanya Ateşkes Konferansı’na gelişini gösteren arşiv fotoğrafı"
  },
  {
    "index": 66,
    "id": "saltanatin-kaldirilmasi",
    "title": "Saltanatın Kaldırılması",
    "year": "1 Kasım 1922",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/066-saltanatin-kaldirilmasi.webp",
    "alt": "Saltanatın kaldırılmasının ardından Kasım 1922’de Dolmabahçe Sarayı’nın arka kapısından ayrılan son Padişah Vahideddin"
  },
  {
    "index": 67,
    "id": "izmit-basin-toplantisi",
    "title": "İzmit Basın Toplantısı",
    "year": "16–17 Ocak 1923",
    "region": "İzmit",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      29.9206,
      40.763
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/067-izmit-basin-toplantisi.webp",
    "alt": "Gazi Mustafa Kemal Paşa 18 Ocak 1923’te basın toplantısı ve incelemeler kapsamında İzmit’te"
  },
  {
    "index": 68,
    "id": "karsiyaka-yemini-evliligi-ve-balikesir-hutbesi",
    "title": "Karşıyaka Yemini, Evliliği ve Balıkesir Hutbesi",
    "year": "27 Ocak–7 Şubat 1923",
    "region": "İzmir / Balıkesir",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      27.8797,
      39.6486
    ],
    "zoom": 8.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/068-karsiyaka-yemini-evliligi-ve-balikesir-hutbesi.webp",
    "alt": "Gazi Mustafa Kemal Paşa ve eşi Latife Hanım 1923 kış gezisinde dış mekânda yan yana dururken"
  },
  {
    "index": 69,
    "id": "izmir-iktisat-kongresi",
    "title": "İzmir İktisat Kongresi",
    "year": "17 Şubat – 4 Mart 1923",
    "region": "İzmir",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "bizzat-sahada",
    "coords": [
      27.1311,
      38.4211
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/069-izmir-iktisat-kongresi.webp",
    "alt": "Gazi Mustafa Kemal Paşa ile Kâzım Karabekir Paşa Şubat 1923’te İzmir’de karşılanırken"
  },
  {
    "index": 70,
    "id": "lozan-baris-antlasmasi",
    "title": "Lozan Barış Antlaşması",
    "year": "24 Temmuz 1923",
    "region": "Lozan / İsviçre",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "stratejik-yonetim",
    "coords": [
      6.6327,
      46.5236
    ],
    "zoom": 7.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/070-lozan-baris-antlasmasi.webp",
    "alt": "Lozan Barış Konferansı’nda İsmet Paşa başkanlığındaki Türk heyetinin 1923 tarihli grup fotoğrafı"
  },
  {
    "index": 71,
    "id": "dokuz-umde-ve-halk-firkasinin-kurulusu",
    "title": "Dokuz Umde ve Halk Fırkası’nın Kuruluşu",
    "year": "9 Eylül 1923",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8538,
      39.9415
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/071-dokuz-umde-ve-halk-firkasinin-kurulusu.webp",
    "alt": "Gazi Mustafa Kemal Paşa 1923’te koyu renk sivil takım elbise ve dik yaka kravatla portre pozunda"
  },
  {
    "index": 72,
    "id": "ankaranin-baskent-olusu",
    "title": "Ankara’nın Başkent Oluşu",
    "year": "13 Ekim 1923",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8597,
      39.9334
    ],
    "zoom": 11.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/072-ankaranin-baskent-olusu.webp",
    "alt": "Ankara’nın başkent ilan edildiği Ekim 1923 tarihinde kentin görünümünü belgeleyen siyah-beyaz arşiv fotoğrafı"
  },
  {
    "index": 73,
    "id": "cumhuriyetin-ilani-ve-ilk-cumhurbaskanligi",
    "title": "Cumhuriyet’in İlanı ve İlk Cumhurbaşkanlığı",
    "year": "29 Ekim 1923",
    "region": "Ankara",
    "stage": "VI. Kurtuluş Savaşı ve Cumhuriyet",
    "stageIndex": 5,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/073-cumhuriyetin-ilani-ve-ilk-cumhurbaskanligi.webp",
    "alt": "Cumhuriyet’in ilanını konu alan 3 Kasım 1923 tarihli Resimli Gazete kapağında Gazi Mustafa Kemal Paşa"
  },
  {
    "index": 74,
    "id": "3-mart-1924-devrim-yasalari",
    "title": "3 Mart 1924 Devrim Yasaları",
    "year": "3 Mart 1924",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/074-3-mart-1924-devrim-yasalari.webp",
    "alt": "Hilafetin kaldırılması ve 3 Mart 1924 yasalarını aktaran 8 Mart 1924 tarihli Resimli Gazete kapağı"
  },
  {
    "index": 75,
    "id": "1924-anayasasinin-kabulu",
    "title": "1924 Anayasası’nın Kabulü",
    "year": "20 Nisan 1924",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/075-1924-anayasasinin-kabulu.webp",
    "alt": "1924 Anayasası’nın kabul edildiği Ankara’daki Birinci Türkiye Büyük Millet Meclisi binasını gösteren siyah-beyaz arşiv fotoğrafı"
  },
  {
    "index": 76,
    "id": "turkiye-is-bankasinin-kurulusu",
    "title": "Türkiye İş Bankası’nın Kuruluşu",
    "year": "26 Ağustos 1924",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8549,
      39.9427
    ],
    "zoom": 14.0,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/076-turkiye-is-bankasinin-kurulusu.webp",
    "alt": "Ankara İstasyon Caddesi’nde kurulan iki katlı ilk Türkiye İş Bankası binası ve arkada inşa halindeki Ankara Palas"
  },
  {
    "index": 77,
    "id": "dumlupinar-toreni-ve-sonbahar-yurt-gezisi",
    "title": "Dumlupınar Töreni ve Sonbahar Yurt Gezisi",
    "year": "Ağustos–Ekim 1924",
    "region": "Dumlupınar / Erzurum",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      30.0489,
      38.9156
    ],
    "zoom": 7.2,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/077-dumlupinar-toreni-ve-sonbahar-yurt-gezisi.webp",
    "alt": "Gazi Mustafa Kemal Paşa, 1924 Sonbahar Yurt Gezisi sırasında Samsun açıklarında Hamidiye kruvazörü mürettebatıyla"
  },
  {
    "index": 78,
    "id": "terakkiperver-firka-seyh-sait-ve-takrir-i-sukun",
    "title": "Terakkiperver Fırka, Şeyh Sait ve Takrir-i Sükûn",
    "year": "Kasım 1924–Mart 1925",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "stratejik-yonetim",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/078-terakkiperver-firka-seyh-sait-ve-takrir-i-sukun.webp",
    "alt": "Terakkiperver Cumhuriyet Fırkası’nın kurucuları Adnan Adıvar, Ali Fuat Cebesoy, Kâzım Karabekir, Rauf Orbay ve Refet Bele"
  },
  {
    "index": 79,
    "id": "gazi-orman-ciftligi-ve-modern-tarim",
    "title": "Gazi Orman Çiftliği ve Modern Tarım",
    "year": "5 Mayıs 1925",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      32.7958,
      39.9402
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/079-gazi-orman-ciftligi-ve-modern-tarim.webp",
    "alt": "Gazi Orman Çiftliği’nin kuruluşunda Ankara bozkırına kurulan ilk çadırları gösteren 5 Haziran 1925 tarihli arşiv fotoğrafı"
  },
  {
    "index": 80,
    "id": "kastamonu-ve-inebolu-yurt-gezisi",
    "title": "Kastamonu ve İnebolu Yurt Gezisi",
    "year": "23–31 Ağustos 1925",
    "region": "Kastamonu / İnebolu",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      33.7614,
      41.9781
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/080-kastamonu-ve-inebolu-yurt-gezisi.webp",
    "alt": "Gazi Mustafa Kemal Paşa, 24 Ağustos 1925’te Kastamonu Belediye binasından mareşal üniformasıyla çıkarken"
  },
  {
    "index": 81,
    "id": "ankara-adliye-hukuk-mektebinin-acilisi",
    "title": "Ankara Adliye Hukuk Mektebi’nin Açılışı",
    "year": "5 Kasım 1925",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      32.8543,
      39.9419
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/081-ankara-adliye-hukuk-mektebinin-acilisi.webp",
    "alt": "Mustafa Kemal Paşa, 5 Kasım 1925’te Ankara Adliye Hukuk Mektebi’nin açılış gününde öğretim kadrosu ve öğrencilerle"
  },
  {
    "index": 82,
    "id": "sapka-ve-tekke-zaviyeler-kanunlari",
    "title": "Şapka ve Tekke-Zaviyeler Kanunları",
    "year": "25–30 Kasım 1925",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/082-sapka-ve-tekke-zaviyeler-kanunlari.webp",
    "alt": "Gazi Mustafa Kemal Paşa, 1925 Sonbahar’ında elinde şapkasıyla halka sesleniş ve geziler sırasında"
  },
  {
    "index": 83,
    "id": "uluslararasi-takvim-ve-saat-kabulu",
    "title": "Uluslararası Takvim ve Saat Kabulü",
    "year": "26 Aralık 1925",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/083-uluslararasi-takvim-ve-saat-kabulu.webp",
    "alt": "Ankara Kalesi burcu üzerindeki tarihî Ankara Saat Kulesi’ni gösteren siyah-beyaz arşiv fotoğrafı"
  },
  {
    "index": 84,
    "id": "turk-medeni-kanunu-ve-hukuk-devrimi",
    "title": "Türk Medeni Kanunu ve Hukuk Devrimi",
    "year": "17 Şubat 1926",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/084-turk-medeni-kanunu-ve-hukuk-devrimi.webp",
    "alt": "1926 tarihli Türk Kanunu Medenisi’nin altın yaldızlı özgün cilt kapağını gösteren arşiv görseli"
  },
  {
    "index": 85,
    "id": "kabotaj-kanunu-ve-denizlerde-bagimsizlik",
    "title": "Kabotaj Kanunu ve Denizlerde Bağımsızlık",
    "year": "19 Nisan 1926",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/085-kabotaj-kanunu-ve-denizlerde-bagimsizlik.webp",
    "alt": "Seyr-i Sefain İdaresi’ne bağlı Gülcemal yolcu vapurunun İstanbul rıhtımındaki sepya arşiv fotoğrafı"
  },
  {
    "index": 86,
    "id": "izmir-suikast-girisimi",
    "title": "İzmir Suikast Girişimi",
    "year": "15 Haziran 1926",
    "region": "İzmir",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      27.1428,
      38.4237
    ],
    "zoom": 11.0,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/086-izmir-suikast-girisimi.webp",
    "alt": "1926 İzmir suikast davası sürecinde İstiklâl Mahkemesi üyeleri açık otomobil içinde birlikte ilerlerken"
  },
  {
    "index": 87,
    "id": "sekiz-yil-sonra-istanbula-ilk-donus",
    "title": "Sekiz Yıl Sonra İstanbul’a İlk Dönüş",
    "year": "1 Temmuz 1927",
    "region": "Dolmabahçe / İstanbul",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      28.9997,
      41.0392
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/087-sekiz-yil-sonra-istanbula-ilk-donus.webp",
    "alt": "1 Temmuz 1927’de İstanbul’a dönüş yolunda Ertuğrul yatı güvertesinde elinde dürbünle Boğaz’ı izleyen Gazi Mustafa Kemal Paşa"
  },
  {
    "index": 88,
    "id": "nutukun-okunmasi",
    "title": "Nutuk’un Okunması",
    "year": "15–20 Ekim 1927",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 14.0,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/088-nutukun-okunmasi.webp",
    "alt": "Gazi Mustafa Kemal Paşa, Ekim 1927’de Türkiye Büyük Millet Meclisi kürsüsünde Nutuk’u okurken"
  },
  {
    "index": 89,
    "id": "anayasada-laiklik-adimi",
    "title": "Anayasada Laiklik Adımı",
    "year": "10 Nisan 1928",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/089-anayasada-laiklik-adimi.webp",
    "alt": "Osmanlıca kitabeli İkinci Meclis Genel Kurul Salonu’nda milletvekilleri 1920’li yıllarda yasama oturumunda"
  },
  {
    "index": 90,
    "id": "sarayburnu-mujdesi-ve-yeni-harf-gezileri",
    "title": "Sarayburnu Müjdesi ve Yeni Harf Gezileri",
    "year": "Ağustos–Eylül 1928",
    "region": "Sarayburnu / Sivas",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      28.9856,
      41.0169
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/090-sarayburnu-mujdesi-ve-yeni-harf-gezileri.webp",
    "alt": "Gazi Mustafa Kemal Paşa’nın 20 Eylül 1928’de Kayseri’de kara tahta başında yeni Türk harflerini gösterdiği arşiv fotoğrafı"
  },
  {
    "index": 91,
    "id": "yeni-turk-harfleri-ve-millet-mektepleri",
    "title": "Yeni Türk Harfleri ve Millet Mektepleri",
    "year": "1–24 Kasım 1928",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/091-yeni-turk-harfleri-ve-millet-mektepleri.webp",
    "alt": "22 Kasım 1928 tarihinde belediye binası önündeki yeni Türk alfabesi afişini inceleyen iki yurttaş"
  },
  {
    "index": 92,
    "id": "merkez-bankasi-ve-demiryolu-hamlesi",
    "title": "Merkez Bankası ve Demir Yolu Hamlesi",
    "year": "11 Haziran 1930",
    "region": "Sivas / Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      37.0019,
      39.7408
    ],
    "zoom": 7.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/092-merkez-bankasi-ve-demiryolu-hamlesi.webp",
    "alt": "31 Ağustos 1930 tarihli Milliyet gazetesinin Sivas demir yolu açılışı manşetli ilk sayfası"
  },
  {
    "index": 93,
    "id": "yalova-termal-ve-yuruyen-kosk",
    "title": "Yalova Termal ve Yürüyen Köşk",
    "year": "8–10 Ağustos 1930",
    "region": "Yalova",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      29.2978,
      40.6647
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/093-yalova-termal-ve-yuruyen-kosk.webp",
    "alt": "Gazi Mustafa Kemal, Yalova Millet Çiftliği’ndeki Yürüyen Köşk önünde heyetiyle birlikte otururken, 1930"
  },
  {
    "index": 94,
    "id": "serbest-cumhuriyet-firkasi-denemesi",
    "title": "Serbest Cumhuriyet Fırkası Denemesi",
    "year": "Ağustos–Kasım 1930",
    "region": "Yalova / Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      29.2769,
      40.655
    ],
    "zoom": 11.0,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/094-serbest-cumhuriyet-firkasi-denemesi.webp",
    "alt": "Gazi Mustafa Kemal Yalova’da Ali Fethi Okyar ve kızı Nermin Hanım ile birlikte oturuyor"
  },
  {
    "index": 95,
    "id": "buyuk-anadolu-inceleme-gezisi",
    "title": "Büyük Anadolu İnceleme Gezisi",
    "year": "Kasım 1930–Mart 1931",
    "region": "Konya / Anadolu",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      32.4846,
      37.8714
    ],
    "zoom": 7.0,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/095-buyuk-anadolu-inceleme-gezisi.webp",
    "alt": "Gazi Mustafa Kemal büyük yurt gezisi sırasında Tokat’ta yaşlı bir yurttaşı dinliyor"
  },
  {
    "index": 96,
    "id": "turk-tarihi-tetkik-cemiyetinin-kurulusu",
    "title": "Türk Tarihi Tetkik Cemiyeti’nin Kuruluşu",
    "year": "15 Nisan 1931",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8644,
      39.8892
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/096-turk-tarihi-tetkik-cemiyetinin-kurulusu.webp",
    "alt": "Gazi Mustafa Kemal ve İsmet İnönü, Birinci Türk Tarih Kongresi oturumunda yan yana"
  },
  {
    "index": 97,
    "id": "halkevlerinin-acilisi",
    "title": "Halkevleri’nin Açılışı",
    "year": "19 Şubat 1932",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8558,
      39.9331
    ],
    "zoom": 14.0,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/097-halkevlerinin-acilisi.webp",
    "alt": "Ankara’da Namazgâh Tepesi üzerindeki Ankara Halkevi ve Etnografya Müzesi kompleksinin siyah-beyaz arşiv görünümü"
  },
  {
    "index": 98,
    "id": "turkiyenin-milletler-cemiyetine-girisi",
    "title": "Türkiye’nin Milletler Cemiyeti’ne Girişi",
    "year": "18 Temmuz 1932",
    "region": "Cenevre / İsviçre",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "stratejik-yonetim",
    "coords": [
      6.1432,
      46.2044
    ],
    "zoom": 6.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/098-turkiyenin-milletler-cemiyetine-girisi.webp",
    "alt": "19 Temmuz 1932 tarihli Milliyet gazetesinin “Türkiye Cemiyeti Akvamda” manşetli ilk sayfası"
  },
  {
    "index": 99,
    "id": "turk-dili-tetkik-cemiyeti-ve-kurultay",
    "title": "Türk Dili Tetkik Cemiyeti ve Kurultay",
    "year": "26 Eylül 1932",
    "region": "Dolmabahçe / İstanbul",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      28.9997,
      41.0392
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/099-turk-dili-tetkik-cemiyeti-ve-kurultay.webp",
    "alt": "Dolmabahçe Sarayı Muayede Salonu’nda Birinci Türk Dil Kurultayı oturumuna katılan kalabalık delege topluluğu"
  },
  {
    "index": 100,
    "id": "1933-universite-reformu",
    "title": "1933 Üniversite Reformu",
    "year": "1 Ağustos 1933",
    "region": "İstanbul",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      28.9638,
      41.0119
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/100-1933-universite-reformu.webp",
    "alt": "Gazi Mustafa Kemal’in 15 Aralık 1930’da İstanbul Darülfünunu Hukuk Fakültesi amfisinde öğrencilerle oturduğu siyah-beyaz fotoğraf"
  },
  {
    "index": 101,
    "id": "onuncu-yil-nutku",
    "title": "Onuncu Yıl Nutku",
    "year": "29 Ekim 1933",
    "region": "Ankara Hipodromu",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      32.8428,
      39.9369
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/101-onuncu-yil-nutku.webp",
    "alt": "Gazi Mustafa Kemal, 29 Ekim 1933 Onuncu Yıl töreninde Ankara Hipodromu tribününde devlet erkânıyla"
  },
  {
    "index": 102,
    "id": "balkan-antanti",
    "title": "Balkan Antantı",
    "year": "9 Şubat 1934",
    "region": "Atina / Yunanistan",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "stratejik-yonetim",
    "coords": [
      23.7275,
      37.9838
    ],
    "zoom": 6.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/102-balkan-antanti.webp",
    "alt": "Balkan Antantı’nın imzalanışını “Balkan misakı dün Atinada imzalandı” manşetiyle duyuran 10 Şubat 1934 tarihli Milliyet gazetesi"
  },
  {
    "index": 103,
    "id": "birinci-bes-yillik-sanayi-plani",
    "title": "Birinci Beş Yıllık Sanayi Planı",
    "year": "17 Nisan 1934",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8522,
      39.9392
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/103-birinci-bes-yillik-sanayi-plani.webp",
    "alt": "Gazi Mustafa Kemal, 1934 Sümerbank sergisinde Afet İnan ve Celal Bayar ile sanayi standını incelerken"
  },
  {
    "index": 104,
    "id": "soyadi-kanunu-ve-ataturk-soyadi",
    "title": "Soyadı Kanunu ve “Atatürk” Soyadı",
    "year": "Haziran–Kasım 1934",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/104-soyadi-kanunu-ve-ataturk-soyadi.webp",
    "alt": "Soyadı Kanunu sonrası Atatürk’e verilen 993 815 seri numaralı tarihî nüfus hüviyet cüzdanı"
  },
  {
    "index": 105,
    "id": "turk-kadinina-siyasi-haklar",
    "title": "Türk Kadınına Siyasi Haklar",
    "year": "5 Aralık 1934",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/105-turk-kadinina-siyasi-haklar.webp",
    "alt": "Kadınlara milletvekili seçilme hakkını “Türk kadınlığının bayram günü” manşetiyle duyuran 7 Aralık 1934 tarihli Ulus gazetesi"
  },
  {
    "index": 106,
    "id": "florya-deniz-kosku-ve-halkla-yasam",
    "title": "Florya Deniz Köşkü ve Halkla Yaşam",
    "year": "Ağustos 1935",
    "region": "Florya / İstanbul",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      28.7825,
      40.9725
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/106-florya-deniz-kosku-ve-halkla-yasam.webp",
    "alt": "Cumhurbaşkanı Atatürk’ün Florya sahilinde denizde yüzerken çekilmiş siyah beyaz arşiv fotoğrafı"
  },
  {
    "index": 107,
    "id": "dil-ve-tarih-cografya-fakultesi",
    "title": "Dil ve Tarih-Coğrafya Fakültesi",
    "year": "9 Ocak 1936",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      32.8594,
      39.9317
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/107-dil-ve-tarih-cografya-fakultesi.webp",
    "alt": "Ankara Üniversitesi Dil ve Tarih-Coğrafya Fakültesi binasının cephesindeki özdeyişle çekilmiş dönem fotoğrafı"
  },
  {
    "index": 108,
    "id": "montro-bogazlar-sozlesmesi",
    "title": "Montrö Boğazlar Sözleşmesi",
    "year": "20 Temmuz 1936",
    "region": "Montrö / İsviçre",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "stratejik-yonetim",
    "coords": [
      6.9106,
      46.4312
    ],
    "zoom": 6.5,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/108-montro-bogazlar-sozlesmesi.webp",
    "alt": "Montrö Sözleşmesi sonrasında Çanakkale Boğazı bölgesine giren Türk subayının vatandaşlarca çiçeklerle karşılanışı"
  },
  {
    "index": 109,
    "id": "alti-ilkenin-anayasaya-girisi",
    "title": "Altı İlkenin Anayasaya Girişi",
    "year": "5 Şubat 1937",
    "region": "Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "kurucu-onculuk",
    "coords": [
      32.8517,
      39.9411
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/109-alti-ilkenin-anayasaya-girisi.webp",
    "alt": "Atatürk’ün 1935 Kurultayında altı ilkenin çerçevesini sunduğu meclis oturumundan arşiv fotoğrafı"
  },
  {
    "index": 110,
    "id": "ciftliklerini-milletine-ve-hazineye-bagisi",
    "title": "Çiftliklerini Milletine ve Hazine’ye Bağışı",
    "year": "11 Haziran 1937",
    "region": "Trabzon",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      39.6961,
      40.9904
    ],
    "zoom": 12.5,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/110-ciftliklerini-milletine-ve-hazineye-bagisi.webp",
    "alt": "Atatürk’ün Haziran 1937 Trabzon ziyaretinde vatandaşlar ve devlet erkânıyla selamlaşma anı"
  },
  {
    "index": 111,
    "id": "sadabat-pakti",
    "title": "Sadabat Paktı",
    "year": "8 Temmuz 1937",
    "region": "Tahran / İran",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "stratejik-yonetim",
    "coords": [
      51.4231,
      35.8172
    ],
    "zoom": 6.0,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/111-sadabat-pakti.webp",
    "alt": "8 Temmuz 1937’de Sadabat Paktı’nın imzalandığı Tahran’daki Sadabat Sarayı Beyaz Köşk’ün bahçe cephesi ve arka plandaki dağlar"
  },
  {
    "index": 112,
    "id": "nazilli-basma-fabrikasinin-acilisi",
    "title": "Nazilli Basma Fabrikası’nın Açılışı",
    "year": "9 Ekim 1937",
    "region": "Nazilli / Aydın",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      28.3243,
      37.9098
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": 12,
    "image": "optimize-120/112-nazilli-basma-fabrikasinin-acilisi.webp",
    "alt": "1937 Sümerbank albümünden açılışı Atatürk tarafından yapılan Nazilli Basma Fabrikası yerleşkesinin görünümü"
  },
  {
    "index": 113,
    "id": "geometri-kitabi-ve-sivas-lisesi-dersi",
    "title": "Geometri Kitabı ve Sivas Lisesi Dersi",
    "year": "13 Kasım 1937",
    "region": "Sivas",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      37.015,
      39.7505
    ],
    "zoom": 13.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/113-geometri-kitabi-ve-sivas-lisesi-dersi.webp",
    "alt": "Atatürk’ün yazdığı ve 1937’de İstanbul Devlet Basımevi’nce yayımlanan Geometri kılavuzunun özgün kapağı"
  },
  {
    "index": 114,
    "id": "son-dogu-gezisi-ve-singec-koprusu",
    "title": "Son Doğu Gezisi ve Singeç Köprüsü",
    "year": "14–20 Kasım 1937",
    "region": "Diyarbakır / Tunceli",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      39.2413,
      38.9009
    ],
    "zoom": 7.8,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/114-son-dogu-gezisi-ve-singec-koprusu.webp",
    "alt": "Atatürk’ün Tunceli Singeç Köprüsü açılışında Celal Bayar ve Sabiha Gökçen ile kurdele kesim anı"
  },
  {
    "index": 115,
    "id": "bursa-merinos-fabrikasinin-acilisi",
    "title": "Bursa Merinos Fabrikası’nın Açılışı",
    "year": "2 Şubat 1938",
    "region": "Bursa",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      29.0503,
      40.1997
    ],
    "zoom": 13.0,
    "pitch": 46,
    "bearing": -15,
    "image": "optimize-120/115-bursa-merinos-fabrikasinin-acilisi.webp",
    "alt": "Atatürk’ün Bursa Merinos Fabrikası açılış töreninde dokuma makineleri arasında ilerlerken çekilen fotoğrafı"
  },
  {
    "index": 116,
    "id": "mersin-ve-adana-son-guney-gezisi",
    "title": "Mersin ve Adana Son Güney Gezisi",
    "year": "19–24 Mayıs 1938",
    "region": "Mersin / Adana",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      34.6203,
      36.8064
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": 12,
    "image": "optimize-120/116-mersin-ve-adana-son-guney-gezisi.webp",
    "alt": "Atatürk’ün 24 Mayıs 1938 son Adana ziyaretinde protokol heyetiyle yan yana durduğu fotoğraf"
  },
  {
    "index": 117,
    "id": "hatay-devletinin-kurulusu",
    "title": "Hatay Devleti’nin Kuruluşu",
    "year": "Temmuz–Eylül 1938",
    "region": "Antakya / Hatay",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "stratejik-yonetim",
    "coords": [
      36.1604,
      36.2023
    ],
    "zoom": 9.0,
    "pitch": 40,
    "bearing": -15,
    "image": "optimize-120/117-hatay-devletinin-kurulusu.webp",
    "alt": "Türk süvari birliklerinin 6 Temmuz 1938’de karşılama takı altından Antakya’ya giriş anı"
  },
  {
    "index": 118,
    "id": "savarona-gunleri-ve-vasiyetnamesi",
    "title": "Savarona Günleri ve Vasiyetnamesi",
    "year": "5 Eylül 1938",
    "region": "İstanbul Boğazı",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      29.0045,
      41.0385
    ],
    "zoom": 13.8,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/118-savarona-gunleri-ve-vasiyetnamesi.webp",
    "alt": "Atatürk’ün 1 Haziran 1938’de Savarona yatındaki salonda dinlenirken çekilmiş arşiv fotoğrafı"
  },
  {
    "index": 119,
    "id": "dolmabahce-sarayinda-vefati",
    "title": "Dolmabahçe Sarayı’nda Vefatı",
    "year": "10 Kasım 1938",
    "region": "Dolmabahçe / İstanbul",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "bizzat-sahada",
    "coords": [
      28.9997,
      41.0392
    ],
    "zoom": 14.5,
    "pitch": 48,
    "bearing": -15,
    "image": "optimize-120/119-dolmabahce-sarayinda-vefati.webp",
    "alt": "19 Kasım 1938’de Atatürk’ün Türk bayrağına sarılı naaşının Dolmabahçe Sarayı kapısından törenle çıkışı"
  },
  {
    "index": 120,
    "id": "etnografya-muzesinden-anitkabire",
    "title": "Etnografya Müzesi’nden Anıtkabir’e",
    "year": "1938–1953",
    "region": "Anıtkabir / Ankara",
    "stage": "VII. Cumhuriyet, Devrimler ve Son Dönem",
    "stageIndex": 6,
    "roleType": "anma-epilog",
    "coords": [
      32.8369,
      39.925
    ],
    "zoom": 14.5,
    "pitch": 48,
    "bearing": 12,
    "image": "optimize-120/120-etnografya-muzesinden-anitkabire.webp",
    "alt": "10 Kasım 1953’te Etnografya Müzesinden Anıtkabir’e nakil kortejinde yürüyen devlet erkânı"
  }
];

(function initAtaturkAtlas() {
  'use strict';

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isReducedMotion = () => reducedMotionQuery.matches;

  // DOM References
  const scrollProgressEl = document.getElementById('scroll-progress');
  const mapEl = document.getElementById('map');
  const mapStatusEl = document.getElementById('map-status');

  const hudDateEl = document.getElementById('hud-date');
  const hudCountEl = document.getElementById('hud-count');
  const mobileHudDateEl = document.getElementById('mobile-hud-date');
  const mobileHudTitleEl = document.getElementById('mobile-hud-title');
  const mobileHudCountEl = document.getElementById('mobile-hud-count');

  const prevBtns = [document.getElementById('prev-stop-desktop'), document.getElementById('prev-stop-mobile')].filter(Boolean);
  const nextBtns = [document.getElementById('next-stop-desktop'), document.getElementById('next-stop-mobile')].filter(Boolean);

  const routeToggleBtn = document.getElementById('route-toggle-btn');
  const exploreBtns = [document.getElementById('explore-toggle-desktop'), document.getElementById('explore-toggle-mobile')].filter(Boolean);
  const exploreBarEl = document.getElementById('explore-bar');
  const exploreExitBtn = document.getElementById('explore-exit-btn');

  const drawerBackdrop = document.getElementById('atlas-drawer-backdrop');
  const drawerEl = document.getElementById('atlas-drawer');
  const openDrawerBtn = document.getElementById('open-drawer-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const searchInput = document.getElementById('atlas-search-input');
  const filterChips = Array.from(document.querySelectorAll('.atlas-filter-chip'));
  const drawerStatusEl = document.getElementById('atlas-drawer-status');
  const drawerListEl = document.getElementById('atlas-drawer-list');

  const lightboxBackdrop = document.getElementById('lightbox');
  const lightboxDialog = document.getElementById('lightbox-dialog');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  const backToTopBtn = document.getElementById('back-to-top');
  const ambientBtn = document.getElementById('ambient-btn');
  const ambientLabel = document.getElementById('ambient-btn-label');
  const soundIconOff = document.getElementById('sound-icon-off');
  const soundIconOn = document.getElementById('sound-icon-on');
  const soundLiveStatus = document.getElementById('sound-live-status');

  const stepElements = Array.from(document.querySelectorAll('.story-step'));
  const textStopsList = document.getElementById('text-stops-list');

  // State
  let currentStopIndex = 0;
  let lastCameraStopIndex = -1;
  let prevCameraStopIndex = -1;
  let inOverview = true;
  let isProgrammaticJump = false;
  let jumpUnlockTimer = null;
  let showRoute = true;
  let isMapExplore = false;

  let map = null;
  let mapReady = false;
  let activeMarker = null;
  let activePopup = null;
  let mapErrorTimer = null;

  let activeFilterEra = 'all';
  let currentLightboxIndex = 0;
  let lastFocusedBeforeModal = null;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 1. Populate full 120-stop clickable text index inside #project-info
  if (textStopsList) {
    textStopsList.innerHTML = STOPS.map((s) => {
      return `<li><a href="#stop-${s.id}" data-jump-step="${s.index - 1}"><strong>${escapeHtml(s.year)} — ${escapeHtml(s.region)}</strong>: ${escapeHtml(s.title)}</a></li>`;
    }).join('');
  }

  // 2. Clean Image Error Fallback
  document.querySelectorAll('.story-media__img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied === '1') return;
      img.dataset.fallbackApplied = '1';
      const frame = img.closest('.story-media__frame');
      if (!frame) return;
      img.style.display = 'none';
      const zoomBtn = frame.querySelector('.media-zoom-btn');
      if (zoomBtn) zoomBtn.hidden = true;
      const box = document.createElement('div');
      box.className = 'story-media__fallback';
      box.textContent = 'Arşiv görseli şu anda yüklenemedi.';
      frame.appendChild(box);
    });
  });

  // 3. Map Status Helper
  function showMapStatus(msg) {
    if (!mapStatusEl) return;
    mapStatusEl.textContent = msg;
    mapStatusEl.classList.add('is-visible');
  }

  function hideMapStatus() {
    if (!mapStatusEl) return;
    mapStatusEl.classList.remove('is-visible');
  }

  // 4. Geometry & Camera Padding Helpers
  function stopDistanceKm(a, b) {
    const rad = Math.PI / 180;
    const dLat = (b[1] - a[1]) * rad;
    const dLon = (b[0] - a[0]) * rad;
    const lat1 = a[1] * rad;
    const lat2 = b[1] * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  function buildArcCoords(from, to, steps = 28) {
    const dist = stopDistanceKm(from, to);
    const coords = [];
    const arcLift = Math.min(2.2, dist / 900);
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const len = Math.hypot(dx, dy) || 1;
    let nx = -dy / len;
    let ny = dx / len;
    if (ny < 0) {
      nx = -nx;
      ny = -ny;
    }
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const bulge = Math.sin(Math.PI * t) * arcLift * 0.45;
      coords.push([from[0] + dx * t + nx * bulge, from[1] + dy * t + ny * bulge]);
    }
    return coords;
  }

  function getCameraPadding() {
    if (isMapExplore) {
      return { top: 80, bottom: 56, left: 40, right: 40 };
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw >= 1024) {
      const railW = Math.min(510, Math.max(390, Math.round(vw * 0.38)));
      const railOffset = Math.min(44, Math.max(20, Math.round(vw * 0.03)));
      return {
        top: 84,
        bottom: 74,
        left: railW + railOffset + 24,
        right: 36,
      };
    }
    return {
      top: 108,
      bottom: Math.round(vh * 0.64),
      left: 20,
      right: 20,
    };
  }

  // 5. MapLibre Initialization
  function initMap() {
    if (!window.maplibregl || !mapEl) {
      showMapStatus('Harita kütüphanesi yüklenemedi; anlatı ve tüm duraklar metin olarak kullanılabilir.');
      return;
    }
    try {
      map = new maplibregl.Map({
        container: 'map',
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [30.5, 39.2],
        zoom: 4.4,
        pitch: 14,
        bearing: 0,
        interactive: false,
        attributionControl: false,
      });

      map.on('load', () => {
        mapReady = true;
        hideMapStatus();
        if (mapErrorTimer) {
          clearTimeout(mapErrorTimer);
          mapErrorTimer = null;
        }

        const canvas = map.getCanvas();
        if (canvas) canvas.setAttribute('tabindex', '-1');

        const layers = map.getStyle().layers || [];
        const firstSymbolId = layers.find((l) => l.type === 'symbol')?.id;

        const stopsGeoJson = {
          type: 'FeatureCollection',
          features: STOPS.map((s, idx) => ({
            type: 'Feature',
            properties: {
              idx,
              index: s.index,
              id: s.id,
              title: s.title,
              year: s.year,
              region: s.region,
              stageIndex: s.stageIndex,
            },
            geometry: { type: 'Point', coordinates: s.coords },
          })),
        };

        map.addSource('all-stops', { type: 'geojson', data: stopsGeoJson });

        map.addSource('active-route', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [STOPS[0].coords, STOPS[0].coords] } },
        });

        map.addLayer(
          {
            id: 'active-route-glow',
            type: 'line',
            source: 'active-route',
            layout: { 'line-join': 'round', 'line-cap': 'round', visibility: 'none' },
            paint: { 'line-color': '#c81e2b', 'line-width': 6, 'line-opacity': 0.28, 'line-blur': 3 },
          },
          firstSymbolId
        );

        map.addLayer(
          {
            id: 'active-route-line',
            type: 'line',
            source: 'active-route',
            layout: { 'line-join': 'round', 'line-cap': 'round', visibility: 'none' },
            paint: { 'line-color': '#d4ae5e', 'line-width': 2.2, 'line-opacity': 0.85, 'line-dasharray': [2, 1.5] },
          },
          firstSymbolId
        );

        map.addLayer(
          {
            id: 'all-stops-layer',
            type: 'circle',
            source: 'all-stops',
            paint: {
              'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 2.8, 10, 4.5, 14, 6],
              'circle-color': '#d4ae5e',
              'circle-opacity': 0.42,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#0d0c0b',
              'circle-stroke-opacity': 0.65,
            },
          },
          firstSymbolId
        );

        const markerEl = document.createElement('div');
        markerEl.className = 'active-stop-marker';
        activeMarker = new maplibregl.Marker({ element: markerEl }).setLngLat(STOPS[0].coords).addTo(map);

        map.on('mouseenter', 'all-stops-layer', () => {
          if (isMapExplore) map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'all-stops-layer', () => {
          map.getCanvas().style.cursor = '';
        });
        map.on('click', 'all-stops-layer', (e) => {
          if (!isMapExplore || !e.features || !e.features.length) return;
          const props = e.features[0].properties;
          const idx = Number(props.idx);
          const stop = STOPS[idx];
          if (!stop) return;
          if (activePopup) activePopup.remove();
          const container = document.createElement('div');
          container.innerHTML = `<div class="map-popup__meta">${escapeHtml(stop.index)}. Durak — ${escapeHtml(stop.year)}</div><div class="map-popup__title">${escapeHtml(stop.title)}</div>`;
          const jumpBtn = document.createElement('button');
          jumpBtn.type = 'button';
          jumpBtn.className = 'map-popup__btn';
          jumpBtn.textContent = 'Bu durağa git';
          jumpBtn.addEventListener('click', () => {
            toggleMapExplore(false);
            jumpToStep(idx, true);
          });
          container.appendChild(jumpBtn);
          activePopup = new maplibregl.Popup({ offset: 14, closeButton: true })
            .setLngLat(stop.coords)
            .setDOMContent(container)
            .addTo(map);
        });

        if (!inOverview) {
          syncMapToStep(currentStopIndex, true);
        }
      });

      map.on('idle', () => {
        if (mapReady) hideMapStatus();
      });

      map.on('error', () => {
        if (mapReady) return;
        if (!mapErrorTimer) {
          mapErrorTimer = window.setTimeout(() => {
            if (!mapReady) {
              showMapStatus('Harita altlığı şu anda yüklenemiyor; metin anlatısı ve kronoloji tam olarak kullanılabilir.');
            }
          }, 2500);
        }
      });
    } catch (_err) {
      showMapStatus('Harita başlatılamadı; metin anlatısı ve kronoloji tam olarak kullanılabilir.');
    }
  }

  function setRouteVisibility(visible) {
    if (!map || !mapReady) return;
    const vis = visible && showRoute ? 'visible' : 'none';
    ['active-route-glow', 'active-route-line'].forEach((id) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', vis);
    });
  }

  function updateRouteArc(fromIdx, toIdx) {
    if (!map || !mapReady || !map.getSource('active-route')) return;
    if (fromIdx < 0 || fromIdx === toIdx) {
      setRouteVisibility(false);
      return;
    }
    const fromStop = STOPS[fromIdx];
    const toStop = STOPS[toIdx];
    if (!fromStop || !toStop) return;
    const dist = stopDistanceKm(fromStop.coords, toStop.coords);
    if (dist < 1) {
      setRouteVisibility(false);
      return;
    }
    const coords = buildArcCoords(fromStop.coords, toStop.coords);
    map.getSource('active-route').setData({
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: coords },
    });
    setRouteVisibility(true);
  }

  function syncMapToOverview() {
    inOverview = true;
    prevCameraStopIndex = -1;
    lastCameraStopIndex = -1;
    document.body.classList.add('is-on-hero');
    if (activeMarker) activeMarker.getElement().classList.remove('is-visible');
    setRouteVisibility(false);
    if (!map || !mapReady) return;
    const cam = {
      center: [30.5, 39.2],
      zoom: 4.4,
      pitch: 14,
      bearing: 0,
      padding: { top: 72, bottom: 48, left: 32, right: 32 },
    };
    map.stop();
    if (isReducedMotion()) {
      map.jumpTo(cam);
    } else {
      map.flyTo({ ...cam, duration: 1300, curve: 1.25 });
    }
  }

  function syncMapToStep(index, instant = false) {
    const target = STOPS[index];
    if (!target) return;
    inOverview = false;
    document.body.classList.remove('is-on-hero');
    const prevIdx = lastCameraStopIndex;
    prevCameraStopIndex = prevIdx;
    lastCameraStopIndex = index;

    if (!map || !mapReady) return;

    if (activeMarker) {
      activeMarker.setLngLat(target.coords);
      activeMarker.getElement().classList.add('is-visible');
    }

    updateRouteArc(prevIdx, index);

    const prevStop = prevIdx >= 0 ? STOPS[prevIdx] : null;
    const distKm = prevStop ? stopDistanceKm(prevStop.coords, target.coords) : 500;
    const sameSpot = prevStop && distKm < 0.8;

    const cam = {
      center: target.coords,
      zoom: target.zoom,
      pitch: Math.min(target.pitch, 50),
      bearing: sameSpot ? map.getBearing() : target.bearing,
      padding: getCameraPadding(),
    };

    map.stop();
    if (instant || isReducedMotion()) {
      map.jumpTo(cam);
      return;
    }
    if (sameSpot) {
      map.easeTo({ ...cam, duration: 650 });
      return;
    }
    const duration = distKm > 1400 ? 2200 : distKm > 350 ? 1750 : 1300;
    map.flyTo({ ...cam, duration, curve: 1.32 });
  }

  // 6. HUD & Active State Sync
  function updateUIState(index) {
    const stop = STOPS[index];
    if (!stop) return;
    currentStopIndex = index;

    if (hudDateEl) hudDateEl.textContent = stop.year;
    if (hudCountEl) hudCountEl.textContent = `${index + 1} / ${STOPS.length}`;
    if (mobileHudDateEl) mobileHudDateEl.textContent = stop.year;
    if (mobileHudTitleEl) mobileHudTitleEl.textContent = stop.title;
    if (mobileHudCountEl) mobileHudCountEl.textContent = `${index + 1}/${STOPS.length}`;

    prevBtns.forEach((b) => (b.disabled = index <= 0));
    nextBtns.forEach((b) => (b.disabled = index >= STOPS.length - 1));

    stepElements.forEach((el, idx) => {
      const card = el.querySelector('.story-card');
      if (card) card.classList.toggle('is-active', idx === index);
    });
  }

  function activateStep(index, instantMap = false) {
    if (index < 0 || index >= STOPS.length) return;
    updateUIState(index);
    syncMapToStep(index, instantMap);
  }

  // 7. Programmatic Jump (layout-accurate even with content-visibility: auto!)
  function getDesiredCardTop(cardHeight) {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    if (vw >= 1024) {
      const headerClear = 80;
      const centered = cardHeight + headerClear + 24 < vh ? Math.round((vh + 60 - cardHeight) / 2) : headerClear;
      return Math.max(headerClear, centered);
    }
    return Math.max(114, Math.round(vh * 0.34));
  }

  function getLayoutTop(el) {
    let y = 0;
    let node = el;
    while (node) {
      y += node.offsetTop || 0;
      node = node.offsetParent;
    }
    return y;
  }

  function jumpToStep(index, moveFocus = false) {
    const targetEl = stepElements[index];
    if (!targetEl) return;

    closeDrawer();

    const prevIndex = currentStopIndex;
    const distance = Math.abs(index - prevIndex);
    const useInstantScroll = isReducedMotion() || distance > 2;

    isProgrammaticJump = true;
    if (jumpUnlockTimer) clearTimeout(jumpUnlockTimer);

    activateStep(index, false);

    if (history.replaceState) {
      history.replaceState(null, '', `#stop-${STOPS[index].id}`);
    }

    const card = targetEl.querySelector('.story-card') || targetEl;
    const desiredTop = getDesiredCardTop(card.offsetHeight);
    const targetScrollY = Math.max(0, Math.round(getLayoutTop(card) - desiredTop));

    window.scrollTo({
      top: targetScrollY,
      behavior: useInstantScroll ? 'auto' : 'smooth',
    });

    if (useInstantScroll) {
      window.requestAnimationFrame(() => {
        const actualTop = card.getBoundingClientRect().top;
        const refinedDesired = getDesiredCardTop(card.offsetHeight);
        const delta = Math.round(actualTop - refinedDesired);
        if (Math.abs(delta) > 4) {
          window.scrollBy({ top: delta, behavior: 'auto' });
        }
      });
    }

    if (moveFocus) {
      const heading = targetEl.querySelector('.story-card__title');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }

    jumpUnlockTimer = window.setTimeout(() => {
      isProgrammaticJump = false;
    }, useInstantScroll ? 160 : 680);
  }

  function scrollToHero(moveFocus = false) {
    isProgrammaticJump = true;
    if (jumpUnlockTimer) clearTimeout(jumpUnlockTimer);
    syncMapToOverview();
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion() ? 'auto' : 'smooth',
    });
    if (history.replaceState) {
      history.replaceState(null, '', '#hero');
    }
    if (moveFocus) {
      const heroTitle = document.getElementById('intro-title');
      if (heroTitle) {
        heroTitle.setAttribute('tabindex', '-1');
        heroTitle.focus({ preventScroll: true });
      }
    }
    jumpUnlockTimer = window.setTimeout(() => {
      isProgrammaticJump = false;
    }, isReducedMotion() ? 120 : 650);
  }

  // 8. Scroll Engine (GSAP ScrollTrigger + Native Fallback)
  function initScrollEngine() {
    if (!window.gsap || !window.ScrollTrigger) {
      const io = new IntersectionObserver(
        (entries) => {
          if (isProgrammaticJump) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.dataset.step);
              if (!Number.isNaN(idx) && (idx !== currentStopIndex || inOverview)) {
                activateStep(idx);
              }
            }
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      stepElements.forEach((el) => io.observe(el));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (scrollProgressEl) {
      gsap.to(scrollProgressEl, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        },
      });
    }

    const heroEl = document.getElementById('hero');
    if (heroEl) {
      ScrollTrigger.create({
        trigger: heroEl,
        start: 'top center',
        end: 'bottom 45%',
        onEnter: () => {
          if (!isProgrammaticJump) syncMapToOverview();
        },
        onEnterBack: () => {
          if (!isProgrammaticJump) syncMapToOverview();
        },
      });
    }

    const infoEl = document.getElementById('project-info');
    if (infoEl) {
      ScrollTrigger.create({
        trigger: infoEl,
        start: 'top 90%',
        end: 'bottom bottom',
        onEnter: () => document.body.classList.add('is-in-info'),
        onLeaveBack: () => document.body.classList.remove('is-in-info'),
      });
    }

    stepElements.forEach((el, index) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 52%',
        end: 'bottom 48%',
        onEnter: () => {
          if (!isProgrammaticJump && (index !== currentStopIndex || inOverview)) {
            activateStep(index);
          }
        },
        onEnterBack: () => {
          if (!isProgrammaticJump && (index !== currentStopIndex || inOverview)) {
            activateStep(index);
          }
        },
      });
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    ScrollTrigger.refresh();
  }

  // 9. Atlas Directory Drawer (Single unified Search + 7-Era Filter)
  function renderDrawerList() {
    if (!drawerListEl) return;
    const rawQuery = (searchInput ? searchInput.value : '').trim().toLocaleLowerCase('tr');
    const filtered = STOPS.filter((s) => {
      if (activeFilterEra !== 'all' && s.stageIndex !== Number(activeFilterEra)) return false;
      if (!rawQuery) return true;
      const hay = `${s.index} ${s.title} ${s.year} ${s.region} ${s.stage}`.toLocaleLowerCase('tr');
      return hay.includes(rawQuery);
    });

    if (drawerStatusEl) {
      drawerStatusEl.textContent = `${filtered.length} durak gösteriliyor`;
    }

    if (!filtered.length) {
      drawerListEl.innerHTML = '<p style="color: var(--ink-muted); font-size: 0.9rem; padding: 1rem 0;">Eşleşen durak bulunamadı.</p>';
      return;
    }

    drawerListEl.innerHTML = filtered
      .map((s) => {
        const idx = s.index - 1;
        const activeCls = idx === currentStopIndex && !inOverview ? ' is-active' : '';
        return `<button type="button" class="atlas-item${activeCls}" data-drawer-step="${idx}">
          <span class="atlas-item__meta">${s.index}. Durak • ${escapeHtml(s.year)} • ${escapeHtml(s.region)}</span>
          <span class="atlas-item__title">${escapeHtml(s.title)}</span>
          <span class="atlas-item__stage">${escapeHtml(s.stage)}</span>
        </button>`;
      })
      .join('');
  }

  function openDrawer() {
    if (!drawerBackdrop) return;
    lastFocusedBeforeModal = document.activeElement;
    renderDrawerList();
    drawerBackdrop.hidden = false;
    document.body.classList.add('modal-open');
    if (searchInput) {
      window.requestAnimationFrame(() => searchInput.focus());
    }
  }

  function closeDrawer() {
    if (!drawerBackdrop || drawerBackdrop.hidden) return;
    drawerBackdrop.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeDrawer();
    });
  }
  if (searchInput) searchInput.addEventListener('input', renderDrawerList);

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeFilterEra = chip.dataset.filterEra;
      filterChips.forEach((c) => c.classList.toggle('is-active', c === chip));
      renderDrawerList();
    });
  });

  if (drawerListEl) {
    drawerListEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-drawer-step]');
      if (!btn) return;
      const idx = Number(btn.dataset.drawerStep);
      jumpToStep(idx, true);
    });
  }

  // 10. Lightbox for Archival Photos
  function renderLightbox(idx) {
    const stop = STOPS[idx];
    if (!stop) return;
    currentLightboxIndex = idx;
    if (lightboxTitle) lightboxTitle.textContent = `${stop.index}. Durak — ${stop.title} (${stop.year})`;
    if (lightboxImg) {
      lightboxImg.src = `./images/${stop.image}`;
      lightboxImg.alt = stop.alt;
    }
    if (lightboxCaption) lightboxCaption.textContent = stop.alt;
    if (lightboxPrevBtn) lightboxPrevBtn.disabled = idx <= 0;
    if (lightboxNextBtn) lightboxNextBtn.disabled = idx >= STOPS.length - 1;
  }

  function openLightbox(idx) {
    if (!lightboxBackdrop) return;
    lastFocusedBeforeModal = document.activeElement;
    renderLightbox(idx);
    lightboxBackdrop.hidden = false;
    document.body.classList.add('modal-open');
    if (lightboxCloseBtn) {
      window.requestAnimationFrame(() => lightboxCloseBtn.focus());
    }
  }

  function closeLightbox() {
    if (!lightboxBackdrop || lightboxBackdrop.hidden) return;
    lightboxBackdrop.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }

  document.addEventListener('click', (e) => {
    const zoomTrigger = e.target.closest('[data-zoom-index], [data-lightbox-index]');
    if (zoomTrigger) {
      const idx = Number(zoomTrigger.dataset.zoomIndex ?? zoomTrigger.dataset.lightboxIndex);
      if (!Number.isNaN(idx)) openLightbox(idx);
      return;
    }
    const jumpTrigger = e.target.closest('[data-jump-step]');
    if (jumpTrigger) {
      e.preventDefault();
      const idx = Number(jumpTrigger.dataset.jumpStep);
      if (!Number.isNaN(idx)) jumpToStep(idx, true);
    }
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      if (currentLightboxIndex > 0) renderLightbox(currentLightboxIndex - 1);
    });
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      if (currentLightboxIndex < STOPS.length - 1) renderLightbox(currentLightboxIndex + 1);
    });
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', (e) => {
      if (e.target === lightboxBackdrop) closeLightbox();
    });
  }

  // Focus trap for open modals
  document.addEventListener('keydown', (e) => {
    const activeModal = !lightboxBackdrop.hidden ? lightboxDialog : !drawerBackdrop.hidden ? drawerEl : null;
    if (e.key === 'Tab' && activeModal) {
      const focusables = Array.from(
        activeModal.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // 11. Map Explore Mode & Route Toggle
  function toggleMapExplore(forceState) {
    isMapExplore = typeof forceState === 'boolean' ? forceState : !isMapExplore;
    document.body.classList.toggle('is-map-explore', isMapExplore);
    if (exploreBarEl) exploreBarEl.hidden = !isMapExplore;
    exploreBtns.forEach((b) => b.setAttribute('aria-pressed', String(isMapExplore)));

    if (!map || !mapReady) return;
    if (activePopup && !isMapExplore) {
      activePopup.remove();
      activePopup = null;
    }
    const canvas = map.getCanvas();
    if (isMapExplore) {
      mapEl.setAttribute('aria-hidden', 'false');
      if (canvas) canvas.setAttribute('tabindex', '0');
      map.dragPan.enable();
      map.scrollZoom.enable();
      map.boxZoom.enable();
      map.doubleClickZoom.enable();
      map.touchZoomRotate.enable();
      map.keyboard.enable();
      map.easeTo({ padding: getCameraPadding(), duration: isReducedMotion() ? 0 : 450 });
    } else {
      mapEl.setAttribute('aria-hidden', 'true');
      if (canvas) canvas.setAttribute('tabindex', '-1');
      map.dragPan.disable();
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();
      map.keyboard.disable();
      if (!inOverview) syncMapToStep(currentStopIndex, false);
    }
  }

  exploreBtns.forEach((btn) => btn.addEventListener('click', () => toggleMapExplore()));
  if (exploreExitBtn) exploreExitBtn.addEventListener('click', () => toggleMapExplore(false));

  if (routeToggleBtn) {
    routeToggleBtn.addEventListener('click', () => {
      showRoute = !showRoute;
      routeToggleBtn.setAttribute('aria-pressed', String(showRoute));
      if (!inOverview) updateRouteArc(prevCameraStopIndex, currentStopIndex);
      if (!showRoute) setRouteVisibility(false);
    });
  }

  // 12. Prev / Next / Hero / Epilogue / Back-to-Top Buttons
  prevBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      if (currentStopIndex > 0) jumpToStep(currentStopIndex - 1, false);
    })
  );
  nextBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      if (inOverview) jumpToStep(0, false);
      else if (currentStopIndex < STOPS.length - 1) jumpToStep(currentStopIndex + 1, false);
    })
  );

  const startBtn = document.getElementById('start-journey-btn');
  if (startBtn) startBtn.addEventListener('click', () => jumpToStep(0, true));

  const epilogueRestartBtn = document.getElementById('epilogue-restart-btn');
  if (epilogueRestartBtn) epilogueRestartBtn.addEventListener('click', () => jumpToStep(0, true));

  if (backToTopBtn) {
    const updateBackToTop = () => {
      backToTopBtn.classList.toggle('is-visible', window.scrollY > 1400);
    };
    backToTopBtn.addEventListener('click', () => scrollToHero(true));
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
  }

  // 13. Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxBackdrop && !lightboxBackdrop.hidden) {
        closeLightbox();
        return;
      }
      if (drawerBackdrop && !drawerBackdrop.hidden) {
        closeDrawer();
        return;
      }
      if (isMapExplore) {
        toggleMapExplore(false);
      }
      return;
    }

    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || !drawerBackdrop.hidden || !lightboxBackdrop.hidden) return;

    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      openDrawer();
    } else if (e.key === 'j' || e.key === 'J') {
      if (inOverview) jumpToStep(0, false);
      else if (currentStopIndex < STOPS.length - 1) jumpToStep(currentStopIndex + 1, false);
    } else if (e.key === 'k' || e.key === 'K') {
      if (currentStopIndex > 0) jumpToStep(currentStopIndex - 1, false);
    }
  });

  // 14. Ambient Audio Player (Erik Satie - Gymnopédie No. 1, Public Domain)
  const ambientAudio = new Audio('./audio/satie-gymnopedie-1.mp3');
  ambientAudio.loop = true;
  ambientAudio.preload = 'none';
  ambientAudio.volume = 0;

  let audioBusy = false;
  let fadeRaf = null;

  function setAudioUI(playing, customStatus) {
    if (soundIconOff) soundIconOff.classList.toggle('is-hidden', playing);
    if (soundIconOn) soundIconOn.classList.toggle('is-hidden', !playing);
    if (ambientBtn) ambientBtn.setAttribute('aria-pressed', String(playing));
    const labelText = customStatus || (playing ? 'Ses: Açık' : 'Ses: Kapalı');
    if (ambientLabel) ambientLabel.textContent = labelText;
    if (soundLiveStatus) soundLiveStatus.textContent = labelText;
  }

  function rampVolume(targetVol, durationMs, onDone) {
    if (fadeRaf) cancelAnimationFrame(fadeRaf);
    const startVol = ambientAudio.volume;
    const startTime = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - startTime) / durationMs);
      ambientAudio.volume = startVol + (targetVol - startVol) * p;
      if (p < 1) {
        fadeRaf = requestAnimationFrame(step);
      } else {
        fadeRaf = null;
        if (onDone) onDone();
      }
    };
    fadeRaf = requestAnimationFrame(step);
  }

  if (ambientBtn) {
    ambientBtn.addEventListener('click', () => {
      if (audioBusy) return;
      if (!ambientAudio.paused) {
        audioBusy = true;
        rampVolume(0, 250, () => {
          ambientAudio.pause();
          audioBusy = false;
          setAudioUI(false);
        });
        return;
      }
      audioBusy = true;
      setAudioUI(false, 'Ses yükleniyor...');
      ambientAudio.volume = 0;
      ambientAudio
        .play()
        .then(() => {
          audioBusy = false;
          setAudioUI(true);
          rampVolume(0.26, 700);
        })
        .catch(() => {
          audioBusy = false;
          setAudioUI(false, 'Ses açılamadı');
        });
    });
  }

  ambientAudio.addEventListener('pause', () => {
    if (!audioBusy) setAudioUI(false);
  });
  ambientAudio.addEventListener('play', () => {
    if (!audioBusy) setAudioUI(true);
  });
  ambientAudio.addEventListener('error', () => {
    audioBusy = false;
    setAudioUI(false, 'Ses dosyası yüklenemedi');
  });

  // 15. Deep-link support on load (#stop-slug)
  function handleInitialHash() {
    const h = window.location.hash;
    if (h && h.startsWith('#stop-')) {
      const slug = h.slice(6);
      const foundIdx = STOPS.findIndex((s) => s.id === slug);
      if (foundIdx >= 0) {
        window.setTimeout(() => jumpToStep(foundIdx, false), 120);
        return;
      }
    }
    updateUIState(0);
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (map && mapReady && !inOverview) {
        map.easeTo({ padding: getCameraPadding(), duration: 250 });
      }
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 200);
  });

  // Boot
  initMap();
  initScrollEngine();
  handleInitialHash();
})();
