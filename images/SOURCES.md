# Görsel kaynakları ve lisans notları

## 2026-11-18 doğrulaması

Eksik olan üç yerel görsel yeniden indirildi ve dosya adları korunarak `images/` içine yerleştirildi:

| Dosya | Kaynak | Lisans |
|---|---|---|
| `canakkale.jpg` | [The Gallipoli peninsula (8708804225)](https://commons.wikimedia.org/wiki/File:The_Gallipoli_peninsula_(8708804225).jpg) | CC BY 2.0 — Jorge Láscar |
| `samsun.jpg` | [Bandırma Vapuru Müzesi.JPG](https://commons.wikimedia.org/wiki/File:Band%C4%B1rma_Vapuru_M%C3%BCzesi.JPG) | CC0 1.0 — Commons dosya sayfasındaki bilgi |
| `ankara.jpg` | [TGNA circa 1920](https://commons.wikimedia.org/wiki/File:TGNA_circa_1920.jpg) | Library of Congress kaynağı; Commons dosya sayfasındaki telif etiketi |

Commons API, bu ortamın IP adresine 429 Too Many Requests döndürdüğü için 101 durağın tamamını güvenilir biçimde yeni dosyalarla doldurma işlemi tamamlanamadı. Bu nedenle mevcut görseller uydurma dosyalarla çoğaltılmadı ve lisansı doğrulanamayan dosyalar için kaynak bilgisi uydurulmadı. `refresh_commons_images.py`, API erişimi yeniden açıldığında her durak için benzersiz Commons dosyası seçip indirmek üzere bırakıldı.

Bu klasördeki aşağıdaki dosyalar, yapay zekâ görsellerinin yerine Wikimedia Commons'tan indirilen gerçek fotoğraf/arşiv görselleridir:

| Dosya | Kullanım | Kaynak | Lisans |
|---|---|---|---|
| `ankara.jpg` | Ankara / Birinci TBMM | [TGNA circa 1920](https://commons.wikimedia.org/wiki/File:TGNA_circa_1920.jpg) | Library of Congress kaynağı; Commons'ta bilinen telif kısıtlaması yok |
| `anitkabir.jpg` | Anıtkabir | [Mausoleo de Atatürk2.JPG](https://commons.wikimedia.org/wiki/File:Mausoleo_de_Atat%C3%BCrk2.JPG) | Public domain (dosya sayfasındaki bilgi) |
| `canakkale.jpg` | Gelibolu / Çanakkale coğrafyası | [The Gallipoli peninsula](https://commons.wikimedia.org/wiki/File:The_Gallipoli_peninsula_(8708804225).jpg) | CC BY 2.0 — Jorge Láscar |
| `samsun.jpg` | Bandırma Vapuru / Samsun | [Bandırma Vapuru Müzesi.JPG](https://commons.wikimedia.org/wiki/File:Band%C4%B1rma_Vapuru_M%C3%BCzesi.JPG) | CC0 1.0 — Cobija |
| `selanik.jpg` | Atatürk Evi, Selanik | [Thessaloniki Atatürk's House Museum from the south](https://commons.wikimedia.org/wiki/File:Thessaloniki_Atat%C3%BCrk%27s_House_Museum_from_the_south.jpg) | CC BY-SA 4.0 — dosya sahibi; atıf ve paylaşım-alike koşulu uygulanır |
| `sivas.jpg` | Sivas Kongresi delegeleri | [Delegates of the Sivas Congress-1](https://commons.wikimedia.org/wiki/File:Delegates_of_the_Sivas_Congress-1.jpg) | Library of Congress kaynağı; dosya sayfasındaki telif etiketi kontrol edilmelidir |
| `ataturk-dogdugu-ev-selanik.jpg` | Selanik / doğduğu ev | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `ataturk-harf-devrimi-1928.jpg` | Harf Devrimi / Ankara | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `ataturk-1938-son-donem.jpg` | Son dönem (kullanımdan çıkarıldı) | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `canakkale.jpg` | Gelibolu / Çanakkale coğrafyası | [The Gallipoli peninsula](https://commons.wikimedia.org/wiki/File:The_Gallipoli_peninsula_(8708804225).jpg) | CC BY 2.0 — Jorge Láscar |
| `hareket-ordusu-bakirkoy-1909.jpg` | Hareket Ordusu / Bakırköy | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `ilk-tbmm-binasi-ankara-1920.jpg` | İlk TBMM binası | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `lozan-turk-heyeti-1923.png` | Lozan Türk heyeti | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `manastir-askeri-idadisi-2017.jpg` | Manastır Askerî İdadisi | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `mustafa-kemal-5-ordu-beyrut-1906.jpg` | 5. Ordu / Beyrut | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `mustafa-kemal-gelibolu-1915.jpg` | Gelibolu / Çanakkale cephesi | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `mustafa-kemal-halep-1917.png` | Halep savunması | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `mustafa-kemal-harp-akademisi-1905.png` | Harp Akademisi | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `mustafa-kemal-sofya-1914-yeniceri.jpg` | Sofya askerî ataşeliği | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `sakarya-duatepe-1921.jpg` | Sakarya / Duatepe | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `sisli-ataturk-muzesi.jpg` | Şişli / Atatürk Müzesi | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |
| `trablusgarp-1911-haritasi.png` | Trablusgarp haritası | Proje arşivi; indirme kaydı bulunamadı | Kaynak/lisans doğrulaması bekliyor |

Görsellerin web sayfasında kullanılabilmesi için kaynak bağlantıları ve lisans bilgileri korunmalıdır. `sivas-kongre-binasi.jpg` gibi daha önce kaynaklandırılmış dosyalar ayrıca korunmuştur.

## Kullanımdan çıkarılan dosyalar

`ataturk-1938-son-donem.jpg` ve `vefat-1938-halk-yasi.jpg` dosyaları yalnızca 122×86 piksellik, kaynağı/lisansı doğrulanamayan küçük dosyalardı; `index.html` içindeki görsel referansları kaldırıldı. Dosyalar silinmedi.
