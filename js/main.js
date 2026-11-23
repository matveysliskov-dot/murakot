document.addEventListener("DOMContentLoaded", () => {
  // Safe preferences: file:// previews may restrict localStorage in some browsers.
  const getPref = (key) => { try { return window.localStorage.getItem(key); } catch (e) { return null; } };
  const setPref = (key, value) => { try { window.localStorage.setItem(key, value); } catch (e) {} };
  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector("header.top nav");
  if (menuButton && nav) menuButton.addEventListener("click", () => nav.classList.toggle("open"));

  // Theme preference
  const themeButton = document.getElementById("themeToggle");
  const savedTheme = getPref("owlrnd-theme");
  if (savedTheme === "dark") document.documentElement.dataset.theme = "dark";
  const syncThemeIcon = () => { if (themeButton) themeButton.textContent = document.documentElement.dataset.theme === "dark" ? "☀" : "☾"; };
  syncThemeIcon();
  if (themeButton) themeButton.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    setPref("owlrnd-theme", dark ? "dark" : "light");
    syncThemeIcon();
  });

  // Lightweight RU / EN / TR interface translation
  const translations = {
    en: {
      "Новый год":"Christmas mode",
      "Главная":"Home", "Примеры работ":"Gallery", "Как заказать":"How to order", "Заказать брелок":"Order a keychain", "Хочу свой брелок":"Get my keychain", "Посмотреть примеры":"View examples", "НЕОБЫЧНЫЙ ПОДАРОК ИЗ ВАШЕГО ФОТО":"A UNIQUE GIFT MADE FROM YOUR PHOTO", "Ваше фото.":"Your photo.", "Ваш силуэт.":"Your silhouette.", "Настоящий 3D-брелок.":"A real 3D keychain.", "Превращаем контурное изображение лица в аккуратный объёмный брелок. Минималистичная вещь с личной историей — для себя или в подарок.":"We turn a portrait outline into a neat 3D keychain. A minimal object with a personal story — for yourself or as a gift.", "за один брелок":"per keychain", "базовый размер":"standard size", "По вашей фотографии":"Made from your photo", "индивидуальная работа":"custom-made", "По вашей фотографии":"From your photo", "Объёмная печать":"3D printed", "Не картинка, а физический предмет":"A real physical object", "Идея для подарка":"A gift idea", "Сохраняет узнаваемый образ":"A recognisable silhouette", "ПРОСТОЙ ПРОЦЕСС":"A SIMPLE PROCESS", "От фотографии":"From photo", "до брелока —":"to keychain —", "три шага":"three steps", "Вам не нужно разбираться в 3D-моделировании. Достаточно выбрать фотографию и связаться с нами.":"You don't need to know 3D modelling. Just choose a photo and contact us.", "Отправьте фото":"Send a photo", "Лучше всего подойдёт чёткий портрет, где хорошо виден профиль или контур лица.":"A clear portrait with a visible profile or face outline works best.", "Согласуем силуэт":"Approve the silhouette", "Подготовим чёрно-белый контур и обсудим размер и детали перед печатью.":"We'll prepare a black-and-white outline and agree on the size and details before printing.", "Напечатаем брелок":"Print your keychain", "Создадим объёмную модель, напечатаем её и согласуем передачу заказа.":"We'll create the 3D model, print it and arrange delivery.", "ЗАКУЛИСЬЕ OWLRND":"BEHIND THE SCENES", "Как рождается":"HOW YOUR KEYCHAIN", "ваш брелок":"IS MADE", "От исходной фотографии до готовой вещи — три понятных этапа. Здесь будут настоящие фотографии процесса.":"From the original photo to the finished item — three simple stages. Real process photos will appear here.", "Обработка в редакторе":"Image editing", "Создание 3D-модели":"3D modelling", "3D-печать":"3D printing", "ПОНЯТНАЯ ЦЕНА":"SIMPLE PRICING", "Твой образ — всегда рядом.":"Keep your image close.", "Персональный контурный брелок, созданный по фотографии.":"A custom outline keychain made from your photo.", "за 1 брелок · базовый размер около 10 × 10 см":"per keychain · standard size approx. 10 × 10 cm", "Оформить заказ":"Place an order", "ОТЗЫВЫ":"REVIEWS", "Слова покупателей":"Customer reviews", "Первые отзывы скоро появятся":"First reviews coming soon", "На главную":"Home", "ГАЛЕРЕЯ OWLRND":"OWLRND GALLERY", "Посмотрите,":"SEE WHAT", "что получится":"WE CAN MAKE", "ВАШ БУДУЩИЙ БРЕЛОК":"YOUR FUTURE KEYCHAIN", "Давайте создадим":"LET'S CREATE", "что-то личное.":"SOMETHING PERSONAL.", "Как к вам обращаться":"Your name", "Ваше имя":"Your name", "Как с вами связаться":"How can we contact you?", "Количество":"Quantity", "Размер":"Size", "Пожелания":"Notes", "Предварительная стоимость":"Estimated total", "Подготовить сообщение":"Prepare message", "Мы на связи":"Get in touch", "ИЛИ СВЯЖИТЕСЬ НАПРЯМУЮ":"OR CONTACT US DIRECTLY", "Около 10 × 10 см":"About 10 × 10 cm", "Больше стандартного — обсудить":"Larger — let's discuss", "Хочу посоветоваться":"I'd like advice", "Имя":"Name", "заказ":"Order", "ЭТАП 01":"STAGE 01", "ЭТАП 02":"STAGE 02", "ЭТАП 03":"STAGE 03"
    },
    tr: {
      "Новый год":"Yılbaşı modu",
      "Главная":"Ana sayfa", "Примеры работ":"Örnekler", "Как заказать":"Nasıl sipariş verilir", "Заказать брелок":"Anahtarlık sipariş et", "Хочу свой брелок":"Anahtarlığımı istiyorum", "Посмотреть примеры":"Örnekleri gör", "НЕОБЫЧНЫЙ ПОДАРОК ИЗ ВАШЕГО ФОТО":"FOTOĞRAFINIZDAN ÖZEL BİR HEDİYE", "Ваше фото.":"Fotoğrafınız.", "Ваш силуэт.":"Siluetiniz.", "Настоящий 3D-брелок.":"Gerçek bir 3D anahtarlık.", "Превращаем контурное изображение лица в аккуратный объёмный брелок. Минималистичная вещь с личной историей — для себя или в подарок.":"Yüzünüzün çizgilerini şık bir 3D anahtarlığa dönüştürüyoruz. Kendiniz veya hediye için kişisel bir tasarım.", "за один брелок":"bir anahtarlık", "базовый размер":"standart boyut", "индивидуальная работа":"kişiye özel", "Объёмная печать":"3D baskı", "Не картинка, а физический предмет":"Gerçek, fiziksel bir ürün", "Идея для подарка":"Hediye fikri", "Сохраняет узнаваемый образ":"Tanıdık siluetinizi korur", "ПРОСТОЙ ПРОЦЕСС":"BASİT SÜREÇ", "От фотографии":"Fotoğraftan", "до брелока —":"anahtarlığa —", "три шага":"üç adım", "Вам не нужно разбираться в 3D-моделировании. Достаточно выбрать фотографию и связаться с нами.":"3D modelleme bilmenize gerek yok. Bir fotoğraf seçip bizimle iletişime geçmeniz yeterli.", "Отправьте фото":"Fotoğraf gönderin", "Лучше всего подойдёт чёткий портрет, где хорошо виден профиль или контур лица.":"Yüz hatlarının net göründüğü bir portre en iyi sonucu verir.", "Согласуем силуэт":"Silueti onaylayın", "Подготовим чёрно-белый контур и обсудим размер и детали перед печатью.":"Siyah-beyaz konturu hazırlayıp boyut ve ayrıntıları baskıdan önce görüşürüz.", "Напечатаем брелок":"Anahtarlığı basalım", "Создадим объёмную модель, напечатаем её и согласуем передачу заказа.":"3D modeli oluşturur, basar ve teslimatı ayarlarız.", "ЗАКУЛИСЬЕ OWLRND":"OWLRND ATÖLYESİ", "Как рождается":"ANAHTARLIĞINIZ", "ваш брелок":"NASIL YAPILIYOR", "От исходной фотографии до готовой вещи — три понятных этапа. Здесь будут настоящие фотографии процесса.":"İlk fotoğraftan bitmiş ürüne kadar üç aşama. Burada üretim sürecinden gerçek fotoğraflar yer alacak.", "Обработка в редакторе":"Görsel düzenleme", "Создание 3D-модели":"3D modelleme", "3D-печать":"3D baskı", "ПОНЯТНАЯ ЦЕНА":"NET FİYAT", "Твой образ — всегда рядом.":"Görüntünüz hep yanınızda.", "Персональный контурный брелок, созданный по фотографии.":"Fotoğrafınızdan üretilen kişisel siluet anahtarlık.", "за 1 брелок · базовый размер около 10 × 10 см":"1 anahtarlık · standart boyut yaklaşık 10 × 10 cm", "Оформить заказ":"Sipariş ver", "ОТЗЫВЫ":"YORUMLAR", "Слова покупателей":"Müşteri yorumları", "Первые отзывы скоро появятся":"İlk yorumlar yakında", "На главную":"Ana sayfa", "ГАЛЕРЕЯ OWLRND":"OWLRND GALERİ", "Посмотрите,":"GÖRÜN", "что получится":"NASIL OLABİLİR", "ВАШ БУДУЩИЙ БРЕЛОК":"GELECEK ANAHTARLIĞINIZ", "Давайте создадим":"HAYDİ", "что-то личное.":"KİŞİSEL BİR ŞEY YAPALIM.", "Как к вам обращаться":"Adınız", "Ваше имя":"Adınız", "Как с вами связаться":"Size nasıl ulaşabiliriz?", "Количество":"Adet", "Размер":"Boyut", "Пожелания":"Notlarınız", "Предварительная стоимость":"Tahmini toplam", "Подготовить сообщение":"Mesajı hazırla", "Мы на связи":"İletişimde kalalım", "ИЛИ СВЯЖИТЕСЬ НАПРЯМУЮ":"VEYA DOĞRUDAN BİZE ULAŞIN", "Около 10 × 10 см":"Yaklaşık 10 × 10 cm", "Больше стандартного — обсудить":"Daha büyük — görüşelim", "Хочу посоветоваться":"Danışmak istiyorum", "ЭТАП 01":"AŞAMA 01", "ЭТАП 02":"AŞAMA 02", "ЭТАП 03":"AŞAMA 03"
    }
  };
  // Дополнительные фразы, которые раньше отсутствовали в словаре.
  // Переводим целые абзацы, подписи галереи, контакты и подсказки формы.
  Object.assign(translations.en, {
    "Расскажите, какой брелок хотите получить. Мы уточним детали, посмотрим фотографию и согласуем изготовление.": "Tell us what kind of keychain you'd like. We'll discuss the details, review your photo and confirm the production.",
    "Форма подготовит текст заявки и откроет Telegram. Фотографию отправьте в переписке отдельно.": "The form will prepare your order message and open Telegram. Please send your photo separately in the chat.",
    "Перед печатью обсудим фотографию и детали. Если контур получится недостаточно чётким, подскажем, какой снимок лучше выбрать.": "Before printing, we'll review your photo and the details. If the outline isn't clear enough, we'll help you choose a better picture.",
    "Здесь будут ваши реальные фотографии готовых брелоков. Добавьте снимки в папку images/gallery/ с именами work-01.jpg — work-06.jpg.": "This gallery will show real photos of finished keychains. Add your images to images/gallery/ and name them work-01.jpg through work-06.jpg.",
    "Контурный портрет": "Outline portrait", "Реальная работа · 01": "Actual work · 01",
    "Силуэт по фотографии": "Silhouette from a photo", "Реальная работа · 02": "Actual work · 02",
    "Объёмная печать": "3D printing", "Реальная работа · 03": "Actual work · 03",
    "Персональный подарок": "Personalised gift", "Реальная работа · 04": "Actual work · 04",
    "Детали готового брелока": "Keychain details", "Реальная работа · 05": "Actual work · 05",
    "Работа на заказ": "Custom-made piece", "Реальная работа · 06": "Actual work · 06",
    "Хотите увидеть реальные изделия?": "Would you like to see real products?",
    "Напишите нам — отправим дополнительные фото и поможем оценить, подойдёт ли ваша фотография.": "Message us — we'll send more photos and help you check whether your picture is suitable.",
    "Написать ↗": "Message us ↗", "На главную": "Home", "Заказать": "Order",
    "3D-печать по вашему фото": "3D printing from your photo",
    "Сделано с вниманием": "Made with care", "к каждой детали.": "for every detail.",
    "Создаём индивидуальный контур": "We create a custom outline",
    "Не нужно разбираться в 3D-моделировании. Достаточно выбрать фотографию и связаться с нами.": "You don't need to know 3D modelling. Just choose a photo and contact us.",
    "Обработка фотографии": "Photo editing",
    "Подготавливаем снимок и создаём аккуратный чёрно-белый контур в графическом редакторе.": "We prepare the image and create a clean black-and-white outline in a graphics editor.",
    "Переносим контур в 3D-редактор, придаём ему толщину и подготавливаем модель к печати.": "We transfer the outline into a 3D editor, give it thickness and prepare the model for printing.",
    "Фотографию отправлю следующим сообщением.": "I'll send the photo in the next message.",
    "Текст заявки подготовлен. Отправьте его нам в Telegram вместе с фотографией.": "Your order message is ready. Send it to us on Telegram along with your photo."
  });
  Object.assign(translations.tr, {
    "Расскажите, какой брелок хотите получить. Мы уточним детали, посмотрим фотографию и согласуем изготовление.": "Nasıl bir anahtarlık istediğinizi bize anlatın. Ayrıntıları görüşelim, fotoğrafınızı inceleyelim ve üretimi birlikte onaylayalım.",
    "Форма подготовит текст заявки и откроет Telegram. Фотографию отправьте в переписке отдельно.": "Form sipariş mesajınızı hazırlar ve Telegram'ı açar. Lütfen fotoğrafınızı sohbetten ayrıca gönderin.",
    "Перед печатью обсудим фотографию и детали. Если контур получится недостаточно чётким, подскажем, какой снимок лучше выбрать.": "Baskıdan önce fotoğrafınızı ve ayrıntıları görüşürüz. Kontur yeterince net değilse daha uygun bir fotoğraf seçmenize yardımcı oluruz.",
    "Здесь будут ваши реальные фотографии готовых брелоков. Добавьте снимки в папку images/gallery/ с именами work-01.jpg — work-06.jpg.": "Bu galeride tamamlanmış anahtarlıkların gerçek fotoğrafları yer alacak. Görsellerinizi images/gallery/ klasörüne work-01.jpg ile work-06.jpg adlarıyla ekleyin.",
    "Контурный портрет": "Kontur portre", "Реальная работа · 01": "Gerçek çalışma · 01",
    "Силуэт по фотографии": "Fotoğraftan siluet", "Реальная работа · 02": "Gerçek çalışma · 02",
    "Объёмная печать": "3D baskı", "Реальная работа · 03": "Gerçek çalışma · 03",
    "Персональный подарок": "Kişisel hediye", "Реальная работа · 04": "Gerçek çalışma · 04",
    "Детали готового брелока": "Anahtarlık detayları", "Реальная работа · 05": "Gerçek çalışma · 05",
    "Работа на заказ": "Özel sipariş", "Реальная работа · 06": "Gerçek çalışma · 06",
    "Хотите увидеть реальные изделия?": "Gerçek ürünleri görmek ister misiniz?",
    "Напишите нам — отправим дополнительные фото и поможем оценить, подойдёт ли ваша фотография.": "Bize yazın — ek fotoğraflar gönderelim ve fotoğrafınızın uygun olup olmadığını değerlendirelim.",
    "Написать ↗": "Bize yazın ↗", "На главную": "Ana sayfa", "Заказать": "Sipariş ver",
    "3D-печать по вашему фото": "Fotoğrafınızdan 3D baskı",
    "Сделано с вниманием": "Özenle hazırlandı", "к каждой детали.": "her ayrıntıya dikkat ederek.",
    "Создаём индивидуальный контур": "Size özel kontur oluşturuyoruz",
    "Не нужно разбираться в 3D-моделировании. Достаточно выбрать фотографию и связаться с нами.": "3D modelleme bilmenize gerek yok. Bir fotoğraf seçip bizimle iletişime geçmeniz yeterli.",
    "Обработка фотографии": "Fotoğraf düzenleme",
    "Подготавливаем снимок и создаём аккуратный чёрно-белый контур в графическом редакторе.": "Fotoğrafı hazırlıyor ve grafik düzenleyicide temiz bir siyah-beyaz kontur oluşturuyoruz.",
    "Переносим контур в 3D-редактор, придаём ему толщину и подготавливаем модель к печати.": "Konturu 3D düzenleyiciye aktarıyor, kalınlık veriyor ve baskıya hazırlıyoruz.",
    "Фотографию отправлю следующим сообщением.": "Fotoğrafı bir sonraki mesajda göndereceğim.",
    "Текст заявки подготовлен. Отправьте его нам в Telegram вместе с фотографией.": "Sipariş mesajınız hazır. Fotoğrafınızla birlikte Telegram üzerinden bize gönderin."
  });

  // Полный словарь всех оставшихся надписей главной, галереи и формы заказа.
  Object.assign(translations.en, {
    "Заказать брелок ↗":"Order a keychain ↗", "Telegram, VK или телефон":"Telegram, VK or phone", "Например: хочу контур лица с этого фото...":"For example: I would like a face outline from this photo...", "Контурный портрет — OwlRnD":"Outline portrait — OwlRnD", "Силуэт по фотографии — OwlRnD":"Silhouette from a photo — OwlRnD", "Объёмная печать — OwlRnD":"3D printing — OwlRnD", "Персональный подарок — OwlRnD":"Personalised gift — OwlRnD", "Детали готового брелока — OwlRnD":"Finished keychain details — OwlRnD", "Работа на заказ — OwlRnD":"Custom-made piece — OwlRnD", "▧ Этапы создания":"▧ Production steps", "✳ Как это работает":"✳ How it works", "♡ Отзывы":"♡ Reviews", "✦ Заказать":"✦ Order", "Написать нам ↗":"Message us ↗", "⌂　На главную":"⌂　Home", "⌂ На главную":"⌂ Home", "▧　Примеры работ":"▧　Gallery", "▧ Примеры работ":"▧ Gallery", "✳　Как это работает":"✳　How it works", "▧　Этапы создания":"▧　Production steps", "♡　Отзывы":"♡　Reviews", "✉　Заказать":"✉　Order", "✉ Заказать":"✉ Order", "↗　Telegram":"↗　Telegram", "↗　ВКонтакте":"↗　VK", "Сделано с вниманием":"Made with care", "к каждой детали.":"in every detail.",
    "● НЕОБЫЧНЫЙ ПОДАРОК ИЗ ВАШЕГО ФОТО":"● A UNIQUE GIFT MADE FROM YOUR PHOTO", "Ваше фото.":"Your photo.", "Ваш силуэт.":"Your silhouette.", "Настоящий 3D-брелок.":"A real 3D keychain.", "Хочу свой брелок ↗":"Get my keychain ↗", "Посмотреть примеры →":"View examples →", "≈ 10 × 10 см":"≈ 10 × 10 cm", "По вашему фото":"Made from your photo", "✦ Маленькая вещь — личный смысл":"✦ A small item with personal meaning", "Создаём индивидуальный контур":"We create a custom outline", "Не картинка, а физический предмет":"Not an image, but a real object", "Сохраняет узнаваемый образ":"Keeps a recognisable likeness", "ПРОСТОЙ ПРОЦЕСС":"A SIMPLE PROCESS", "От фотографии до брелока —":"From photo to keychain —", "три шага":"three steps", "Не нужно разбираться в 3D-моделировании. Достаточно выбрать фотографию и связаться с нами.":"No 3D-modelling skills needed. Just choose a photo and get in touch.", "Лучше всего подойдёт чёткий портрет, где хорошо виден профиль или контур лица.":"A clear portrait showing the profile or outline of the face works best.", "Подготовим чёрно-белый контур и обсудим размер и детали перед печатью.":"We will prepare a black-and-white outline and agree on the size and details before printing.", "Создадим объёмную модель, напечатаем её и согласуем передачу заказа.":"We will create the 3D model, print it and arrange delivery.", "ЗАКУЛИСЬЕ OWLRND":"BEHIND THE SCENES AT OWLRND", "Как рождается":"HOW YOUR", "ваш брелок":"KEYCHAIN IS MADE", "От фотографии до готовой вещи — три этапа создания вашего персонального брелока.":"From the original photo to the finished item — three steps to create your personal keychain.", "ЭТАП 01":"STEP 01", "ЭТАП 02":"STEP 02", "ЭТАП 03":"STEP 03", "Обработка фотографии":"Photo editing", "Подготавливаем снимок и создаём аккуратный чёрно-белый контур в графическом редакторе.":"We prepare the photo and create a clean black-and-white outline in a graphics editor.", "Создание 3D-модели":"3D model creation", "Переносим контур в 3D-редактор, придаём ему толщину и подготавливаем модель к печати.":"We transfer the outline to a 3D editor, give it thickness and prepare the model for printing.", "Печатаем готовый брелок, проверяем результат и подготавливаем его к передаче.":"We print the keychain, check the result and prepare it for delivery.", "НЕ МАССОВЫЙ СУВЕНИР":"NOT A MASS-PRODUCED SOUVENIR", "Каждый брелок —":"Every keychain is", "свой":"unique", "Все примеры →":"See all examples →", "Лаконичный силуэт":"Minimalist silhouette", "01 / Контурный портрет":"01 / Outline portrait", "По вашему снимку":"Made from your photo", "02 / Индивидуальная форма":"02 / Custom shape", "Объёмная деталь":"Three-dimensional detail", "03 / 3D-печать":"03 / 3D printing", "Это демонстрационные иллюстрации идеи. Перед запуском замените их фотографиями своих готовых изделий.":"These are illustrative examples. Replace them with photos of your finished products before publishing.", "МАТЕРИАЛЫ И ДЕТАЛИ":"MATERIALS AND DETAILS", "Рассмотрите":"Take a closer", "поближе":"look", "Покажите фактуру, упаковку и доступные цвета пластика.":"Show the texture, packaging and available filament colours.", "Фактура и контур":"Texture and outline", "Упаковка заказа":"Packaging", "Цвета пластика":"Filament colours", "ПОНЯТНАЯ ЦЕНА":"CLEAR PRICING", "Твой образ — всегда рядом.":"Keep your image close.", "Персональный контурный брелок, созданный по фотографии.":"A custom outline keychain made from your photo.", "за 1 брелок · базовый размер около 10 × 10 см":"per keychain · standard size approx. 10 × 10 cm", "Оформить заказ ↗":"Place an order ↗", "ОТЗЫВЫ":"REVIEWS", "Слова покупателей":"What customers say", "Первые отзывы скоро появятся":"First reviews coming soon", "После первых заказов добавим реальные отзывы и фотографии покупателей.":"We will add genuine reviews and customer photos after the first orders.", "Мы ВКонтакте ↗":"Find us on VK ↗", "Индивидуальные 3D-брелоки по вашему изображению.":"Custom 3D keychains made from your image.", "✦　Заказать":"✦　Order",
    "ВАШ БУДУЩИЙ БРЕЛОК":"YOUR FUTURE KEYCHAIN", "Давайте создадим":"LET'S CREATE", "что-то личное.":"SOMETHING PERSONAL.", "Расскажите, какой брелок хотите получить. Мы уточним детали, посмотрим фотографию и согласуем изготовление.":"Tell us what kind of keychain you would like. We will discuss the details, review your photo and confirm production.", "01 / ЗАЯВКА":"01 / ORDER DETAILS", "149 ₽ / шт.":"149 RUB / pc.", "Как к вам обращаться":"Your name", "Как с вами связаться":"How can we contact you?", "Количество":"Quantity", "1 брелок":"1 keychain", "2 брелока":"2 keychains", "3 брелока":"3 keychains", "4 брелока":"4 keychains", "5 брелоков":"5 keychains", "Размер":"Size", "Около 10 × 10 см":"About 10 × 10 cm", "Больше стандартного — обсудить":"Larger than standard — discuss", "Хочу посоветоваться":"I'd like advice", "Пожелания":"Notes", "Предварительная стоимость":"Estimated total", "Подготовить сообщение ↗":"Prepare message ↗", "Форма подготовит текст заявки и откроет Telegram. Фотографию отправьте в переписке отдельно.":"The form will prepare your order message and open Telegram. Send your photo separately in the chat.", "ИЛИ СВЯЖИТЕСЬ НАПРЯМУЮ":"OR CONTACT US DIRECTLY", "Мы на связи":"Get in touch", "ВК":"VK", "ВКонтакте":"VK", "Японская совушка":"Japanese Owl", "Телефон":"Phone", "Перед печатью обсудим фотографию и детали. Если контур получится недостаточно чётким, подскажем, какой снимок лучше выбрать.":"Before printing, we will review your photo and the details. If the outline is not clear enough, we will help you choose a better picture.", "Примеры работ — OwlRnD":"Gallery — OwlRnD", "Заказать брелок — OwlRnD":"Order a keychain — OwlRnD", "ГАЛЕРЕЯ OWLRND":"OWLRND GALLERY", "Посмотрите,":"SEE WHAT", "что получится":"WE CAN CREATE", "Здесь будут ваши реальные фотографии готовых брелоков. Добавьте снимки в папку images/gallery/ с именами work-01.jpg — work-06.jpg.":"This gallery will show real photos of finished keychains. Add your images to images/gallery/ and name them work-01.jpg through work-06.jpg.", "Контурный портрет":"Outline portrait", "Реальная работа · 01":"Real piece · 01", "Силуэт по фотографии":"Silhouette from a photo", "Реальная работа · 02":"Real piece · 02", "Объёмная печать":"3D printing", "Реальная работа · 03":"Real piece · 03", "Персональный подарок":"Personalised gift", "Реальная работа · 04":"Real piece · 04", "Детали готового брелока":"Finished keychain details", "Реальная работа · 05":"Real piece · 05", "Работа на заказ":"Custom-made piece", "Реальная работа · 06":"Real piece · 06", "Хотите увидеть реальные изделия?":"Would you like to see real products?", "Напишите нам — отправим дополнительные фото и поможем оценить, подойдёт ли ваша фотография.":"Message us — we will send more photos and help you check whether your picture is suitable.", "Написать ↗":"Message us ↗", "На главную":"Home", "Заказать":"Order", "Включить новогоднее оформление":"Enable holiday decorations", "Выбор языка":"Language selection", "Меню":"Menu", "Готовый контурный 3D-брелок":"Finished outline 3D keychain", "Обработка фотографии и создание контура":"Photo editing and outline creation", "Создание объёмной 3D-модели":"3D model creation", "Печать готового брелока на 3D-принтере":"Printing the finished keychain on a 3D printer", "Готовый брелок OwlRnD — пример 1":"Finished OwlRnD keychain — example 1", "Готовый брелок OwlRnD — пример 2":"Finished OwlRnD keychain — example 2", "Готовый брелок OwlRnD — пример 3":"Finished OwlRnD keychain — example 3", "Упаковка заказа":"Order packaging"
  });
  Object.assign(translations.tr, {
    "Заказать брелок ↗":"Anahtarlık sipariş et ↗", "Telegram, VK или телефон":"Telegram, VK veya telefon", "Например: хочу контур лица с этого фото...":"Örneğin: bu fotoğraftan yüz konturu istiyorum...", "Контурный портрет — OwlRnD":"Kontur portre — OwlRnD", "Силуэт по фотографии — OwlRnD":"Fotoğraftan siluet — OwlRnD", "Объёмная печать — OwlRnD":"3D baskı — OwlRnD", "Персональный подарок — OwlRnD":"Kişisel hediye — OwlRnD", "Детали готового брелока — OwlRnD":"Bitmiş anahtarlık detayları — OwlRnD", "Работа на заказ — OwlRnD":"Özel sipariş — OwlRnD", "▧ Этапы создания":"▧ Üretim aşamaları", "✳ Как это работает":"✳ Nasıl çalışır", "♡ Отзывы":"♡ Yorumlar", "✦ Заказать":"✦ Sipariş ver", "Написать нам ↗":"Bize yazın ↗", "⌂　На главную":"⌂　Ana sayfa", "⌂ На главную":"⌂ Ana sayfa", "▧　Примеры работ":"▧　Örnekler", "▧ Примеры работ":"▧ Örnekler", "✳　Как это работает":"✳　Nasıl çalışır", "▧　Этапы создания":"▧　Üretim aşamaları", "♡　Отзывы":"♡　Yorumlar", "✉　Заказать":"✉　Sipariş", "✉ Заказать":"✉ Sipariş", "↗　Telegram":"↗　Telegram", "↗　ВКонтакте":"↗　VK", "Сделано с вниманием":"Özenle hazırlandı", "к каждой детали.":"her ayrıntıya dikkat ederek.",
    "● НЕОБЫЧНЫЙ ПОДАРОК ИЗ ВАШЕГО ФОТО":"● FOTOĞRAFINIZDAN ÖZEL BİR HEDİYE", "Ваше фото.":"Fotoğrafınız.", "Ваш силуэт.":"Siluetiniz.", "Настоящий 3D-брелок.":"Gerçek bir 3D anahtarlık.", "Хочу свой брелок ↗":"Kendi anahtarlığımı istiyorum ↗", "Посмотреть примеры →":"Örnekleri gör →", "≈ 10 × 10 см":"≈ 10 × 10 cm", "По вашему фото":"Fotoğrafınızdan", "✦ Маленькая вещь — личный смысл":"✦ Küçük bir eşya, kişisel bir anlam", "Создаём индивидуальный контур":"Size özel bir kontur oluşturuyoruz", "Не картинка, а физический предмет":"Bir resim değil, gerçek bir ürün", "Сохраняет узнаваемый образ":"Tanıdık görünümünüzü korur", "ПРОСТОЙ ПРОЦЕСС":"BASİT SÜREÇ", "От фотографии до брелока —":"Fotoğraftan anahtarlığa —", "три шага":"üç adım", "Не нужно разбираться в 3D-моделировании. Достаточно выбрать фотографию и связаться с нами.":"3D modelleme bilmenize gerek yok. Bir fotoğraf seçip bizimle iletişime geçmeniz yeterli.", "Лучше всего подойдёт чёткий портрет, где хорошо виден профиль или контур лица.":"Yüz profilinin veya hatlarının net göründüğü bir portre en iyi sonucu verir.", "Подготовим чёрно-белый контур и обсудим размер и детали перед печатью.":"Siyah-beyaz konturu hazırlayıp baskıdan önce boyut ve ayrıntıları görüşürüz.", "Создадим объёмную модель, напечатаем её и согласуем передачу заказа.":"3D modeli oluşturup basar ve teslimatı ayarlarız.", "ЗАКУЛИСЬЕ OWLRND":"OWLRND ATÖLYESİNDEN", "Как рождается":"NASIL YAPILIYOR", "ваш брелок":"ANAHTARLIĞINIZ", "От фотографии до готовой вещи — три этапа создания вашего персонального брелока.":"İlk fotoğraftan bitmiş ürüne kadar kişisel anahtarlığınız üç aşamada hazırlanır.", "ЭТАП 01":"AŞAMA 01", "ЭТАП 02":"AŞAMA 02", "ЭТАП 03":"AŞAMA 03", "Обработка фотографии":"Fotoğraf düzenleme", "Подготавливаем снимок и создаём аккуратный чёрно-белый контур в графическом редакторе.":"Fotoğrafı hazırlıyor ve grafik düzenleyicide temiz bir siyah-beyaz kontur oluşturuyoruz.", "Создание 3D-модели":"3D model oluşturma", "Переносим контур в 3D-редактор, придаём ему толщину и подготавливаем модель к печати.":"Konturu 3D düzenleyiciye aktarıyor, kalınlık veriyor ve baskıya hazırlıyoruz.", "Печатаем готовый брелок, проверяем результат и подготавливаем его к передаче.":"Anahtarlığı basıyor, sonucu kontrol ediyor ve teslimata hazırlıyoruz.", "НЕ МАССОВЫЙ СУВЕНИР":"SIRADAN BİR HEDİYELİK DEĞİL", "Каждый брелок —":"Her anahtarlık", "свой":"kendine özgü", "Все примеры →":"Tüm örnekler →", "Лаконичный силуэт":"Sade siluet", "01 / Контурный портрет":"01 / Kontur portre", "02 / Индивидуальная форма":"02 / Kişiye özel biçim", "Объёмная деталь":"Üç boyutlu ayrıntı", "03 / 3D-печать":"03 / 3D baskı", "Это демонстрационные иллюстрации идеи. Перед запуском замените их фотографиями своих готовых изделий.":"Bunlar fikir amaçlı örnek görsellerdir. Yayına almadan önce kendi ürün fotoğraflarınızla değiştirin.", "МАТЕРИАЛЫ И ДЕТАЛИ":"MALZEMELER VE DETAYLAR", "Рассмотрите":"Daha yakından", "поближе":"inceleyin", "Покажите фактуру, упаковку и доступные цвета пластика.":"Doku, ambalaj ve mevcut filament renklerini gösterin.", "Фактура и контур":"Doku ve kontur", "Упаковка заказа":"Sipariş ambalajı", "Цвета пластика":"Filament renkleri", "ПОНЯТНАЯ ЦЕНА":"AÇIK FİYAT", "Твой образ — всегда рядом.":"Görüntünüz hep yanınızda.", "Персональный контурный брелок, созданный по фотографии.":"Fotoğrafınızdan üretilen kişisel kontur anahtarlığı.", "за 1 брелок · базовый размер около 10 × 10 см":"anahtarlık başına · standart boyut yaklaşık 10 × 10 cm", "Оформить заказ ↗":"Sipariş ver ↗", "ОТЗЫВЫ":"YORUMLAR", "Слова покупателей":"Müşteriler ne diyor?", "Первые отзывы скоро появятся":"İlk yorumlar yakında", "После первых заказов добавим реальные отзывы и фотографии покупателей.":"İlk siparişlerden sonra gerçek yorumları ve müşteri fotoğraflarını ekleyeceğiz.", "Мы ВКонтакте ↗":"VK'da bizi bulun ↗", "Индивидуальные 3D-брелоки по вашему изображению.":"Görselinizden kişiye özel 3D anahtarlıklar.", "✦　Заказать":"✦　Sipariş ver",
    "ВАШ БУДУЩИЙ БРЕЛОК":"GELECEK ANAHTARLIĞINIZ", "Давайте создадим":"HAYDİ OLUŞTURALIM", "что-то личное.":"KİŞİSEL BİR ŞEY.", "Расскажите, какой брелок хотите получить. Мы уточним детали, посмотрим фотографию и согласуем изготовление.":"Nasıl bir anahtarlık istediğinizi anlatın. Ayrıntıları görüşelim, fotoğrafınızı inceleyelim ve üretimi onaylayalım.", "01 / ЗАЯВКА":"01 / SİPARİŞ BİLGİLERİ", "149 ₽ / шт.":"149 RUB / adet", "Как к вам обращаться":"Adınız", "Как с вами связаться":"Size nasıl ulaşabiliriz?", "Количество":"Adet", "1 брелок":"1 anahtarlık", "2 брелока":"2 anahtarlık", "3 брелока":"3 anahtarlık", "4 брелока":"4 anahtarlık", "5 брелоков":"5 anahtarlık", "Размер":"Boyut", "Около 10 × 10 см":"Yaklaşık 10 × 10 cm", "Больше стандартного — обсудить":"Standarttan büyük — görüşelim", "Хочу посоветоваться":"Danışmak istiyorum", "Пожелания":"Notlarınız", "Предварительная стоимость":"Tahmini toplam", "Подготовить сообщение ↗":"Mesajı hazırla ↗", "Форма подготовит текст заявки и откроет Telegram. Фотографию отправьте в переписке отдельно.":"Form sipariş mesajınızı hazırlar ve Telegram'ı açar. Fotoğrafınızı sohbette ayrıca gönderin.", "ИЛИ СВЯЖИТЕСЬ НАПРЯМУЮ":"VEYA DOĞRUDAN BİZE ULAŞIN", "Мы на связи":"İletişimdeyiz", "ВК":"VK", "ВКонтакте":"VK", "Японская совушка":"Japon Baykuşu", "Телефон":"Telefon", "Перед печатью обсудим фотографию и детали. Если контур получится недостаточно чётким, подскажем, какой снимок лучше выбрать.":"Baskıdan önce fotoğrafınızı ve ayrıntıları görüşürüz. Kontur yeterince net değilse daha uygun bir fotoğraf seçmenize yardımcı oluruz.", "Примеры работ — OwlRnD":"Örnekler — OwlRnD", "Заказать брелок — OwlRnD":"Anahtarlık sipariş et — OwlRnD", "ГАЛЕРЕЯ OWLRND":"OWLRND GALERİ", "Посмотрите,":"GÖRÜN", "что получится":"NELER YAPABİLİRİZ", "Здесь будут ваши реальные фотографии готовых брелоков. Добавьте снимки в папку images/gallery/ с именами work-01.jpg — work-06.jpg.":"Bu galeride bitmiş anahtarlıkların gerçek fotoğrafları yer alacak. Görsellerinizi images/gallery/ klasörüne work-01.jpg ile work-06.jpg adlarıyla ekleyin.", "Контурный портрет":"Kontur portre", "Реальная работа · 01":"Gerçek ürün · 01", "Силуэт по фотографии":"Fotoğraftan siluet", "Реальная работа · 02":"Gerçek ürün · 02", "Объёмная печать":"3D baskı", "Реальная работа · 03":"Gerçek ürün · 03", "Персональный подарок":"Kişisel hediye", "Реальная работа · 04":"Gerçek ürün · 04", "Детали готового брелока":"Bitmiş anahtarlık detayları", "Реальная работа · 05":"Gerçek ürün · 05", "Работа на заказ":"Özel sipariş", "Реальная работа · 06":"Gerçek ürün · 06", "Хотите увидеть реальные изделия?":"Gerçek ürünleri görmek ister misiniz?", "Напишите нам — отправим дополнительные фото и поможем оценить, подойдёт ли ваша фотография.":"Bize yazın — ek fotoğraflar gönderelim ve fotoğrafınızın uygun olup olmadığını değerlendirelim.", "Написать ↗":"Bize yazın ↗", "На главную":"Ana sayfa", "Заказать":"Sipariş ver", "Включить новогоднее оформление":"Yılbaşı süslemelerini aç", "Выбор языка":"Dil seçimi", "Меню":"Menü", "Готовый контурный 3D-брелок":"Bitmiş kontur 3D anahtarlık", "Обработка фотографии и создание контура":"Fotoğraf düzenleme ve kontur oluşturma", "Создание объёмной 3D-модели":"3D model oluşturma", "Печать готового брелока на 3D-принтере":"Anahtarlığın 3D yazıcıda basılması", "Готовый брелок OwlRnD — пример 1":"Bitmiş OwlRnD anahtarlığı — örnek 1", "Готовый брелок OwlRnD — пример 2":"Bitmiş OwlRnD anahtarlığı — örnek 2", "Готовый брелок OwlRnD — пример 3":"Bitmiş OwlRnD anahtarlığı — örnek 3", "Упаковка заказа":"Sipariş ambalajı"
  });

  // V7: фразы после замены значков на SVG (текст теперь без символов ↗ → ✦ ❄) и новые тексты
  Object.assign(translations.en, {
    "Как это работает":"How it works", "Этапы создания":"Production steps", "Отзывы":"Reviews",
    "Мы ВКонтакте":"Find us on VK", "Написать нам":"Message us", "Подготовить сообщение":"Prepare message",
    "Все примеры":"See all examples", "Маленькая вещь — личный смысл":"A small item with personal meaning",
    "Реальные фотографии готовых брелоков OwlRnD.":"Real photos of finished OwlRnD keychains.",
    "Фактура, упаковка и доступные цвета пластика.":"Texture, packaging and available filament colours.",
    "Фото скоро появится":"Photo coming soon"
  });
  Object.assign(translations.tr, {
    "Как это работает":"Nasıl çalışır", "Этапы создания":"Üretim aşamaları", "Отзывы":"Yorumlar",
    "Мы ВКонтакте":"VK'da bizi bulun", "Написать нам":"Bize yazın", "Подготовить сообщение":"Mesajı hazırla",
    "Все примеры":"Tüm örnekler", "Маленькая вещь — личный смысл":"Küçük bir eşya, kişisel bir anlam",
    "Реальные фотографии готовых брелоков OwlRnD.":"Bitmiş OwlRnD anahtarlıklarının gerçek fotoğrafları.",
    "Фактура, упаковка и доступные цвета пластика.":"Doku, ambalaj ve mevcut filament renkleri.",
    "Фото скоро появится":"Fotoğraf yakında"
  });

  const languageSelect = document.getElementById("languageSelect");
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  const translatableAttrs = ["placeholder", "alt", "title", "aria-label"];
  function applyLanguage(lang) {
    if (!translations[lang]) lang = "ru";
    document.documentElement.lang = lang;
    const dict = translations[lang] || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    const entries = Object.entries(dict).sort((a,b)=>b[0].length-a[0].length);
    while ((node = walker.nextNode())) {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const original = originalText.get(node);
      let value = original;
      if (lang !== "ru") {
        // Сохраняем пробелы и переносы исходного HTML, переводя все известные фрагменты.
        for (const [source, target] of entries) value = value.split(source).join(target);
      }
      node.nodeValue = value;
    }
    document.querySelectorAll("*").forEach(el => {
      translatableAttrs.forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        if (!originalAttrs.has(el)) originalAttrs.set(el, {});
        const saved = originalAttrs.get(el);
        if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
        const original = saved[attr];
        el.setAttribute(attr, lang === "ru" ? original : (dict[original] || original));
      });
    });
    const originalTitle = document.title.replace(/^(Home|Gallery|Order|Ana sayfa|Örnekler|Sipariş)\s*[—–-]\s*/, "");
    const titleMap = {
      ru: {"OwlRnD — 3D-брелоки по вашему фото":"OwlRnD — 3D-брелоки по вашему фото", "Примеры работ — OwlRnD":"Примеры работ — OwlRnD", "Заказать брелок — OwlRnD":"Заказать брелок — OwlRnD"},
      en: {"OwlRnD — 3D-брелоки по вашему фото":"OwlRnD — 3D keychains from your photo", "Примеры работ — OwlRnD":"Gallery — OwlRnD", "Заказать брелок — OwlRnD":"Order a keychain — OwlRnD"},
      tr: {"OwlRnD — 3D-брелоки по вашему фото":"OwlRnD — Fotoğrafınızdan 3D anahtarlık", "Примеры работ — OwlRnD":"Örnekler — OwlRnD", "Заказать брелок — OwlRnD":"Anahtarlık sipariş et — OwlRnD"}
    };
    const titleOriginal = document.querySelector('title')?.textContent.trim();
    if (titleOriginal) document.title = titleMap[lang]?.[titleOriginal] || titleOriginal;
    if (languageSelect) languageSelect.value = lang;
    const seasonButton = document.getElementById("newYearToggle");
    if (seasonButton) {
      const on = document.documentElement.classList.contains("new-year");
      const labels = { ru: on ? "Новый год: вкл" : "Новый год", en: on ? "Christmas: on" : "Christmas", tr: on ? "Yılbaşı: açık" : "Yılbaşı" };
      const lbl = seasonButton.querySelector(".ny-label"); if (lbl) lbl.textContent = labels[lang];
    }
    setPref("owlrnd-language", lang);
    // Query parameter is a fallback for local file previews where localStorage may be isolated per file.
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("lang") !== lang) {
        url.searchParams.set("lang", lang);
        history.replaceState({}, "", url.toString());
      }
    } catch (e) {}
  }
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = ["ru", "en", "tr"].includes(queryLanguage) ? queryLanguage : (getPref("owlrnd-language") || "ru");
  applyLanguage(savedLanguage);
  if (languageSelect) languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
  // Carry the selected language through every internal page link.
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin || !/\.html?$/.test(target.pathname)) return;
    target.searchParams.set("lang", getPref("owlrnd-language") || savedLanguage);
    link.href = target.pathname + target.search + target.hash;
  });

  // Слоты под фото: если файла нет — показываем заглушку с точным именем файла и размером.
  // Если добавить к адресу ?slots=1 — на каждом фото появится бейдж с его именем (режим подсказок).
  const slotIcon = '<svg class="ic" aria-hidden="true"><use href="#i-image"/></svg>';
  const slotsMode = /[?&]slots(=1|=on|=true)?(&|$)/.test(window.location.search);
  if (slotsMode) {
    document.documentElement.classList.add("slots-mode");
    const pill = document.createElement("div");
    pill.className = "slots-pill";
    pill.innerHTML = 'Режим подсказок: на фото указаны имена файлов <a href="' + window.location.pathname + '">выключить</a>';
    document.body.appendChild(pill);
  }
  document.querySelectorAll("[data-slot]").forEach((slot) => {
    const img = slot.querySelector("img");
    const file = slot.dataset.slot, id = slot.dataset.id || "", size = slot.dataset.size || "";
    slot.dataset.label = id + " · " + file;
    const showMissing = () => {
      if (slot.classList.contains("is-missing")) return;
      slot.classList.add("is-missing");
      const ph = document.createElement("div");
      ph.className = "slot-ph";
      ph.innerHTML = slotIcon + '<span class="slot-id">' + id + '</span><b>' + file + '</b><small>' + size + '</small>';
      slot.appendChild(ph);
    };
    const showLoaded = () => { slot.classList.remove("is-missing"); slot.querySelector(".slot-ph")?.remove(); };
    if (!img) return showMissing();
    img.addEventListener("error", showMissing);
    img.addEventListener("load", showLoaded);
    if (img.complete) { img.naturalWidth > 0 ? showLoaded() : showMissing(); }
  });

  const quantity = document.getElementById("quantity");
  const total = document.getElementById("total");
  if (quantity && total) {
    const updateTotal = () => total.textContent = `${Number(quantity.value) * 149} ₽`;
    quantity.addEventListener("change", updateTotal);
    updateTotal();
  }

  const form = document.getElementById("orderForm");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const count = Number(document.getElementById("quantity").value);
    const size = document.getElementById("size").value;
    const comment = document.getElementById("comment").value.trim();
    const lang = getPref("owlrnd-language") || "ru";
    const messageLabels = {
      ru: ["Здравствуйте! Хочу заказать контурный 3D-брелок.", "Имя", "Для связи", "Количество", "Размер", "Предварительная стоимость", "Пожелания", "Фотографию отправлю следующим сообщением."],
      en: ["Hello! I'd like to order a custom 3D outline keychain.", "Name", "Contact", "Quantity", "Size", "Estimated total", "Notes", "I will send the photo in a separate message."],
      tr: ["Merhaba! Kişiye özel 3D kontur anahtarlık sipariş etmek istiyorum.", "Ad", "İletişim", "Adet", "Boyut", "Tahmini toplam", "Notlar", "Fotoğrafı ayrı bir mesajla göndereceğim."]
    }[lang];
    const message = [messageLabels[0], `${messageLabels[1]}: ${name}`, `${messageLabels[2]}: ${contact}`, `${messageLabels[3]}: ${count}`, `${messageLabels[4]}: ${size}`, `${messageLabels[5]}: ${count * 149} ₽`, comment ? `${messageLabels[6]}: ${comment}` : "", messageLabels[7]].filter(Boolean).join("\n");
    try { navigator.clipboard?.writeText(message); } catch (e) {}
    window.open("https://t.me/OwlRnD", "_blank", "noopener");
    const hint = form.querySelector(".formhint");
    if (hint) { const lang = getPref("owlrnd-language") || "ru"; const hintText = { ru: "Текст заявки подготовлен. Отправьте его нам в Telegram вместе с фотографией.", en: "Your order message is ready. Send it to us on Telegram along with your photo.", tr: "Sipariş mesajınız hazır. Fotoğrafınızla birlikte Telegram üzerinden bize gönderin." }; hint.textContent = hintText[lang] || hintText.ru; }
  });


  // Гирлянда: тонкий провод провисает между «крючками», на нём небольшие лампочки.
  // Рисуется под реальную ширину окна, поэтому лампочки не растягиваются.
  function drawGarland(host) {
    const W = window.innerWidth;
    const small = W < 740;
    const span = small ? 96 : 150;      // расстояние между крючками
    const sag = small ? 8 : 11;         // насколько провисает провод
    const H = sag + (small ? 26 : 30);
    const colors = ["#e5484d", "#f5b83d", "#3fae6a", "#4a90e2", "#c964b0"];
    const count = Math.ceil(W / span) + 1;
    let wires = "", bulbs = "", k = 0;
    for (let i = -1; i < count; i++) {
      const x0 = i * span, x1 = x0 + span, cx = (x0 + x1) / 2, y0 = 2, cy = y0 + sag * 2;
      wires += `<path class="wire" d="M${x0} ${y0} Q${cx} ${cy} ${x1} ${y0}"/>`;
      [0.22, 0.5, 0.78].forEach((t) => {
        const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
        const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y0;
        const c = colors[k % colors.length];
        const delay = ((k * 7) % 5) * 0.5;
        bulbs += `<g class="gb" style="animation-delay:-${delay}s" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">`
          + `<circle class="glow" cx="0" cy="10" r="${small ? 7 : 9}" fill="${c}"/>`
          + `<rect class="cap" x="-2" y="-1" width="4" height="4" rx="1"/>`
          + `<path d="M-3.4 3 L3.4 3 L4.2 8.5 Q4.4 13 0 14 Q-4.4 13 -4.2 8.5 Z" fill="${c}"/>`
          + `<ellipse cx="-1.4" cy="8" rx=".9" ry="2.2" fill="#fff" opacity=".55"/></g>`;
        k++;
      });
    }
    host.style.height = H + "px";
    host.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${wires}${bulbs}</svg>`;
  }

  // Новогодний режим: падающий снег, гирлянда и сохранение выбора между страницами
  const newYearButton = document.getElementById("newYearToggle");
  const snowLayer = document.querySelector(".snow-layer");
  const savedNewYear = getPref("owlrnd-new-year") === "on";
  function setNewYear(enabled) {
    document.documentElement.classList.toggle("new-year", enabled);
    if (newYearButton) {
      newYearButton.setAttribute("aria-pressed", String(enabled));
      const lang = getPref("owlrnd-language") || "ru";
      const labels = { ru: enabled ? "Новый год: вкл" : "Новый год", en: enabled ? "Christmas: on" : "Christmas", tr: enabled ? "Yılbaşı: açık" : "Yılbaşı" };
      const lbl = newYearButton.querySelector(".ny-label"); if (lbl) lbl.textContent = labels[lang] || labels.ru;
    }
    let garland = document.getElementById("owlrndGarland");
    if (enabled && !garland) {
      garland = document.createElement("div");
      garland.id = "owlrndGarland";
      garland.className = "holiday-garland";
      garland.setAttribute("aria-hidden", "true");
      document.body.appendChild(garland);
      drawGarland(garland);
      let resizeTimer;
      window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => drawGarland(garland), 150); });
    }
    if (garland) garland.hidden = !enabled;
    setPref("owlrnd-new-year", enabled ? "on" : "off");
    if (snowLayer && enabled && !snowLayer.childElementCount) {
      const symbols = ["❄", "❅", "✦", "❆"];
      for (let i = 0; i < 38; i++) {
        const flake = document.createElement("span");
        flake.className = "snowflake";
        flake.textContent = symbols[i % symbols.length];
        flake.style.left = `${(i * 37 + 11) % 100}%`;
        flake.style.fontSize = `${12 + (i % 5) * 4}px`;
        flake.style.animationDuration = `${8 + (i % 9)}s`;
        flake.style.animationDelay = `${-((i * 3) % 16)}s`;
        flake.style.opacity = `${0.45 + (i % 5) * 0.1}`;
        snowLayer.appendChild(flake);
      }
    }
    if (snowLayer && !enabled) snowLayer.replaceChildren();
  }
  setNewYear(savedNewYear);
  if (newYearButton) newYearButton.addEventListener("click", () => {
    setNewYear(!document.documentElement.classList.contains("new-year"));
  });

});
