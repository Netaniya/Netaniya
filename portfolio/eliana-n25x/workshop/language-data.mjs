/**
 * Original N25x language practice material.
 * © 2026 Natalie Ragulina. All rights reserved.
 *
 * Written with AI assistance for this project. These translations have not
 * been reviewed by native speakers or language teachers. This resource is
 * introductory practice, not a complete curriculum or evidence of a CEFR level.
 * Georgian uses Georgian script, Chinese uses simplified characters, and
 * Japanese uses normal Japanese writing. No invented transliteration is used.
 * A shared item ID represents the same communicative meaning in every language.
 */

export const LANGUAGE_CONTENT_INFO = Object.freeze({
  author: 'Natalie Ragulina',
  copyright: '© 2026 Natalie Ragulina. All rights reserved.',
  contentVersion: 3,
  scope: 'introductory-and-connected-sentence-practice',
  aiAssisted: true,
  nativeSpeakerReviewed: false,
  completeCEFRPath: false,
  languages: ['de', 'en', 'ka', 'uk', 'ru', 'zh', 'es', 'fr', 'it', 'ja'],
});

export const LANGUAGE_UNITS = [
  {
    id: 'introductions',
    title: { de: '01 · Sich kennenlernen', en: '01 · Getting acquainted', ru: '01 · Знакомство', uk: '01 · Знайомство' },
    note: {
      de: 'Anfangspraxis: Begrüße jemanden, stelle dich vor und bitte um Hilfe. Lerne jede Wendung als Ganzes; Wortstellung und Anrede unterscheiden sich zwischen den Sprachen. Im Japanischen wird „ich“ oft weggelassen, wenn klar ist, wer spricht.',
      en: 'Introductory practice: greet someone, introduce yourself and ask for help. Learn each expression as a whole; word order and forms of address differ between languages. Japanese often leaves out “I” when the speaker is clear.',
      ru: 'Начальная практика: поздоровайся, представься и попроси помощи. Учи выражения целиком: порядок слов и формы обращения в языках различаются. В японском «я» часто опускают, когда понятно, кто говорит.',
      uk: 'Початкова практика: привітайся, представся та попроси допомоги. Вчи вислови цілком: порядок слів і форми звертання в мовах різняться. У японській «я» часто пропускають, коли зрозуміло, хто говорить.',
    },
    items: [
      { id: 'intro.good-morning', text: {
        de: 'Guten Morgen! Wie geht es dir?', en: 'Good morning! How are you?', ka: 'დილა მშვიდობისა! როგორ ხარ?', uk: 'Доброго ранку! Як справи?', ru: 'Доброе утро! Как дела?', zh: '早上好！你好吗？', es: '¡Buenos días! ¿Cómo estás?', fr: 'Bonjour ! Comment vas-tu ?', it: 'Buongiorno! Come stai?', ja: 'おはようございます。お元気ですか。',
      } },
      { id: 'intro.name', text: {
        de: 'Ich heiße Alex. Wie heißt du?', en: 'My name is Alex. What is your name?', ka: 'მე ალექსი მქვია. შენ რა გქვია?', uk: 'Мене звати Алекс. А тебе як звати?', ru: 'Меня зовут Алекс. А тебя как зовут?', zh: '我叫亚历克斯。你叫什么名字？', es: 'Me llamo Alex. ¿Cómo te llamas?', fr: 'Je m’appelle Alex. Comment t’appelles-tu ?', it: 'Mi chiamo Alex. Come ti chiami?', ja: 'アレックスといいます。お名前は何ですか。',
      } },
      { id: 'intro.origin', text: {
        de: 'Ich komme aus Georgien.', en: 'I come from Georgia.', ka: 'მე საქართველოდან ვარ.', uk: 'Я з Грузії.', ru: 'Я из Грузии.', zh: '我来自格鲁吉亚。', es: 'Soy de Georgia.', fr: 'Je viens de Géorgie.', it: 'Vengo dalla Georgia.', ja: 'ジョージア出身です。',
      } },
      { id: 'intro.home-city', text: {
        de: 'Ich wohne jetzt in Berlin.', en: 'I live in Berlin now.', ka: 'ახლა ბერლინში ვცხოვრობ.', uk: 'Зараз я живу в Берліні.', ru: 'Сейчас я живу в Берлине.', zh: '我现在住在柏林。', es: 'Ahora vivo en Berlín.', fr: 'J’habite maintenant à Berlin.', it: 'Adesso vivo a Berlino.', ja: '今はベルリンに住んでいます。',
      } },
      { id: 'intro.meet', text: {
        de: 'Schön, dich kennenzulernen.', en: 'It is nice to meet you.', ka: 'სასიამოვნოა შენი გაცნობა.', uk: 'Приємно познайомитися.', ru: 'Приятно познакомиться.', zh: '很高兴认识你。', es: 'Es un placer conocerte.', fr: 'Ça me fait plaisir de te rencontrer.', it: 'Mi fa piacere conoscerti.', ja: 'お会いできてうれしいです。',
      } },
      { id: 'intro.languages', text: {
        de: 'Welche Sprachen sprichst du?', en: 'Which languages do you speak?', ka: 'რომელ ენებზე ლაპარაკობ?', uk: 'Якими мовами ти розмовляєш?', ru: 'На каких языках ты говоришь?', zh: '你会说哪些语言？', es: '¿Qué idiomas hablas?', fr: 'Quelles langues parles-tu ?', it: 'Quali lingue parli?', ja: '何語を話せますか。',
      } },
      { id: 'intro.understand', text: {
        de: 'Ich verstehe dieses Wort noch nicht.', en: 'I do not understand this word yet.', ka: 'ეს სიტყვა ჯერ არ მესმის.', uk: 'Я ще не розумію цього слова.', ru: 'Я ещё не понимаю этого слова.', zh: '我还不明白这个词。', es: 'Todavía no entiendo esta palabra.', fr: 'Je ne comprends pas encore ce mot.', it: 'Non capisco ancora questa parola.', ja: 'この言葉はまだ分かりません。',
      } },
      { id: 'intro.repeat', text: {
        de: 'Kannst du das bitte wiederholen?', en: 'Can you repeat that, please?', ka: 'შეგიძლია გაიმეორო, გთხოვ?', uk: 'Можеш повторити, будь ласка?', ru: 'Можешь повторить, пожалуйста?', zh: '你能再说一遍吗？', es: '¿Puedes repetirlo, por favor?', fr: 'Peux-tu répéter, s’il te plaît ?', it: 'Puoi ripetere, per favore?', ja: 'もう一度言ってもらえますか。',
      } },
      { id: 'intro.slowly', text: {
        de: 'Sprich bitte etwas langsamer.', en: 'Please speak a little more slowly.', ka: 'გთხოვ, ცოტა უფრო ნელა ილაპარაკე.', uk: 'Говори, будь ласка, трохи повільніше.', ru: 'Говори, пожалуйста, немного медленнее.', zh: '请说慢一点。', es: 'Habla un poco más despacio, por favor.', fr: 'Parle un peu plus lentement, s’il te plaît.', it: 'Parla un po’ più lentamente, per favore.', ja: 'もう少しゆっくり話してください。',
      } },
      { id: 'intro.help', text: {
        de: 'Danke für deine Hilfe!', en: 'Thank you for your help!', ka: 'გმადლობ დახმარებისთვის!', uk: 'Дякую за допомогу!', ru: 'Спасибо за помощь!', zh: '谢谢你的帮助！', es: '¡Gracias por tu ayuda!', fr: 'Merci pour ton aide !', it: 'Grazie per il tuo aiuto!', ja: '手伝ってくれてありがとうございます。',
      } },
    ],
  },
  {
    id: 'family',
    title: { de: '02 · Familie und Zuhause', en: '02 · Family and home', ru: '02 · Семья и дом', uk: '02 · Родина й дім' },
    note: {
      de: 'Anfangspraxis: Beschreibe Menschen und Dinge zu Hause. Achte auf Wörter für „mein“, „dein“ und „unser“. Familienwörter unterscheiden sich: Japanisch unterscheidet zum Beispiel ältere und jüngere Geschwister; hier sind eine jüngere Schwester und ein jüngerer Bruder gemeint.',
      en: 'Introductory practice: describe people and things at home. Notice words for “my”, “your” and “our”. Family terms differ: Japanese distinguishes older and younger siblings, for example; these examples refer to a younger sister and a younger brother.',
      ru: 'Начальная практика: опиши людей и вещи дома. Обрати внимание на слова «мой», «твой» и «наш». Названия родственников различаются: например, японский различает старших и младших братьев и сестёр; здесь речь о младшей сестре и младшем брате.',
      uk: 'Початкова практика: опиши людей і речі вдома. Зверни увагу на слова «мій», «твій» і «наш». Назви родичів різняться: наприклад, японська розрізняє старших і молодших братів та сестер; тут ідеться про молодшу сестру й молодшого брата.',
    },
    items: [
      { id: 'family.photo', text: {
        de: 'Das ist ein Foto von meiner Familie.', en: 'This is a photo of my family.', ka: 'ეს ჩემი ოჯახის ფოტოა.', uk: 'Це фотографія моєї родини.', ru: 'Это фотография моей семьи.', zh: '这是我家人的照片。', es: 'Esta es una foto de mi familia.', fr: 'C’est une photo de ma famille.', it: 'Questa è una foto della mia famiglia.', ja: 'これは私の家族の写真です。',
      } },
      { id: 'family.mother', text: {
        de: 'Meine Mutter arbeitet in einem Krankenhaus.', en: 'My mother works in a hospital.', ka: 'დედაჩემი საავადმყოფოში მუშაობს.', uk: 'Моя мама працює в лікарні.', ru: 'Моя мама работает в больнице.', zh: '我妈妈在医院工作。', es: 'Mi madre trabaja en un hospital.', fr: 'Ma mère travaille dans un hôpital.', it: 'Mia madre lavora in un ospedale.', ja: '母は病院で働いています。',
      } },
      { id: 'family.father', text: {
        de: 'Mein Vater kocht heute das Abendessen.', en: 'My father is cooking dinner today.', ka: 'მამაჩემი დღეს ვახშამს ამზადებს.', uk: 'Мій тато сьогодні готує вечерю.', ru: 'Мой папа сегодня готовит ужин.', zh: '今天我爸爸做晚饭。', es: 'Hoy mi padre prepara la cena.', fr: 'Mon père prépare le dîner aujourd’hui.', it: 'Oggi mio padre prepara la cena.', ja: '今日は父が夕食を作ります。',
      } },
      { id: 'family.sister', text: {
        de: 'Meine kleine Schwester zeichnet gern Tiere.', en: 'My younger sister likes drawing animals.', ka: 'ჩემს უმცროს დას ცხოველების ხატვა უყვარს.', uk: 'Моя молодша сестра любить малювати тварин.', ru: 'Моя младшая сестра любит рисовать животных.', zh: '我妹妹喜欢画动物。', es: 'A mi hermana pequeña le gusta dibujar animales.', fr: 'Ma petite sœur aime dessiner des animaux.', it: 'A mia sorella minore piace disegnare animali.', ja: '妹は動物の絵を描くのが好きです。',
      } },
      { id: 'family.brother', text: {
        de: 'Mein kleiner Bruder spielt im Garten.', en: 'My younger brother is playing in the garden.', ka: 'ჩემი უმცროსი ძმა ბაღში თამაშობს.', uk: 'Мій молодший брат грається в саду.', ru: 'Мой младший брат играет в саду.', zh: '我弟弟在花园里玩。', es: 'Mi hermano pequeño está jugando en el jardín.', fr: 'Mon petit frère joue dans le jardin.', it: 'Mio fratello minore gioca in giardino.', ja: '弟は庭で遊んでいます。',
      } },
      { id: 'family.grandmother', text: {
        de: 'Wir besuchen unsere Großmutter am Sonntag.', en: 'We visit our grandmother on Sunday.', ka: 'კვირას ბებიას ვესტუმრებით.', uk: 'У неділю ми відвідуємо бабусю.', ru: 'В воскресенье мы навещаем бабушку.', zh: '我们星期天去看祖母。', es: 'El domingo visitamos a nuestra abuela.', fr: 'Nous rendons visite à notre grand-mère dimanche.', it: 'Domenica andiamo a trovare nostra nonna.', ja: '日曜日に祖母を訪ねます。',
      } },
      { id: 'family.cat', text: {
        de: 'Unsere Katze schläft auf dem Sofa.', en: 'Our cat is sleeping on the sofa.', ka: 'ჩვენს კატას დივანზე სძინავს.', uk: 'Наша кішка спить на дивані.', ru: 'Наша кошка спит на диване.', zh: '我们家的猫在沙发上睡觉。', es: 'Nuestro gato está durmiendo en el sofá.', fr: 'Notre chat dort sur le canapé.', it: 'Il nostro gatto dorme sul divano.', ja: 'うちの猫はソファーで寝ています。',
      } },
      { id: 'family.room', text: {
        de: 'Mein Zimmer ist klein, aber hell.', en: 'My room is small but bright.', ka: 'ჩემი ოთახი პატარაა, მაგრამ ნათელია.', uk: 'Моя кімната маленька, але світла.', ru: 'Моя комната маленькая, но светлая.', zh: '我的房间很小，但是很明亮。', es: 'Mi habitación es pequeña, pero luminosa.', fr: 'Ma chambre est petite, mais lumineuse.', it: 'La mia camera è piccola, ma luminosa.', ja: '私の部屋は小さいですが、明るいです。',
      } },
      { id: 'family.keys', text: {
        de: 'Deine Schlüssel liegen auf dem Tisch.', en: 'Your keys are on the table.', ka: 'შენი გასაღებები მაგიდაზეა.', uk: 'Твої ключі лежать на столі.', ru: 'Твои ключи лежат на столе.', zh: '你的钥匙在桌子上。', es: 'Tus llaves están en la mesa.', fr: 'Tes clés sont sur la table.', it: 'Le tue chiavi sono sul tavolo.', ja: 'あなたの鍵はテーブルの上にあります。',
      } },
      { id: 'family.together', text: {
        de: 'Abends essen wir zusammen.', en: 'We eat together in the evening.', ka: 'საღამოს ერთად ვჭამთ.', uk: 'Увечері ми їмо разом.', ru: 'Вечером мы едим вместе.', zh: '晚上我们一起吃饭。', es: 'Por la noche comemos juntos.', fr: 'Le soir, nous mangeons ensemble.', it: 'La sera mangiamo insieme.', ja: '夜は一緒に食事をします。',
      } },
    ],
  },
  {
    id: 'numbers-time',
    title: { de: '03 · Zahlen und Zeit', en: '03 · Numbers and time', ru: '03 · Числа и время', uk: '03 · Числа й час' },
    note: {
      de: 'Anfangspraxis: Lies Zahlen, Uhrzeiten und Wochentage im Zusammenhang. „Um acht“ bezeichnet einen Zeitpunkt, „zwanzig Minuten“ eine Dauer. Manche Sprachen brauchen beim Zählen zusätzliche Wörter, etwa für Äpfel oder Bücher.',
      en: 'Introductory practice: read numbers, times and days in context. “At eight” gives a time; “twenty minutes” gives a duration. Some languages use extra counting words for objects such as apples or books.',
      ru: 'Начальная практика: читай числа, время и дни недели в контексте. «В восемь» — момент времени, «двадцать минут» — длительность. В некоторых языках при счёте предметов нужны дополнительные счётные слова.',
      uk: 'Початкова практика: читай числа, час і дні тижня в контексті. «О восьмій» — момент часу, «двадцять хвилин» — тривалість. У деяких мовах для лічби предметів потрібні додаткові лічильні слова.',
    },
    items: [
      { id: 'time.apples', text: {
        de: 'Im Korb liegen drei Äpfel.', en: 'There are three apples in the basket.', ka: 'კალათაში სამი ვაშლია.', uk: 'У кошику три яблука.', ru: 'В корзине три яблока.', zh: '篮子里有三个苹果。', es: 'Hay tres manzanas en la cesta.', fr: 'Il y a trois pommes dans le panier.', it: 'Nel cestino ci sono tre mele.', ja: 'かごにりんごが三つあります。',
      } },
      { id: 'time.books', text: {
        de: 'Wir brauchen noch zwei Bücher.', en: 'We need two more books.', ka: 'კიდევ ორი წიგნი გვჭირდება.', uk: 'Нам потрібні ще дві книжки.', ru: 'Нам нужны ещё две книги.', zh: '我们还需要两本书。', es: 'Necesitamos dos libros más.', fr: 'Il nous faut encore deux livres.', it: 'Ci servono altri due libri.', ja: 'あと二冊、本が必要です。',
      } },
      { id: 'time.clock', text: {
        de: 'Es ist halb acht.', en: 'It is half past seven.', ka: 'შვიდი საათი და ოცდაათი წუთია.', uk: 'Зараз пів на восьму.', ru: 'Сейчас половина восьмого.', zh: '现在是七点半。', es: 'Son las siete y media.', fr: 'Il est sept heures et demie.', it: 'Sono le sette e mezza.', ja: '今は七時半です。',
      } },
      { id: 'time.lesson', text: {
        de: 'Der Unterricht beginnt um acht Uhr.', en: 'The lesson starts at eight o’clock.', ka: 'გაკვეთილი რვა საათზე იწყება.', uk: 'Урок починається о восьмій годині.', ru: 'Урок начинается в восемь часов.', zh: '课八点开始。', es: 'La clase empieza a las ocho.', fr: 'Le cours commence à huit heures.', it: 'La lezione inizia alle otto.', ja: '授業は八時に始まります。',
      } },
      { id: 'time.duration', text: {
        de: 'Die Fahrt dauert zwanzig Minuten.', en: 'The journey takes twenty minutes.', ka: 'მგზავრობა ოცი წუთი გრძელდება.', uk: 'Поїздка триває двадцять хвилин.', ru: 'Поездка длится двадцать минут.', zh: '路上需要二十分钟。', es: 'El viaje dura veinte minutos.', fr: 'Le trajet dure vingt minutes.', it: 'Il viaggio dura venti minuti.', ja: '移動には二十分かかります。',
      } },
      { id: 'time.monday', text: {
        de: 'Heute ist Montag, morgen ist Dienstag.', en: 'Today is Monday; tomorrow is Tuesday.', ka: 'დღეს ორშაბათია, ხვალ სამშაბათია.', uk: 'Сьогодні понеділок, завтра вівторок.', ru: 'Сегодня понедельник, завтра вторник.', zh: '今天是星期一，明天是星期二。', es: 'Hoy es lunes; mañana es martes.', fr: 'Aujourd’hui, c’est lundi ; demain, c’est mardi.', it: 'Oggi è lunedì; domani è martedì.', ja: '今日は月曜日で、明日は火曜日です。',
      } },
      { id: 'time.birthday', text: {
        de: 'Mein Geburtstag ist im April.', en: 'My birthday is in April.', ka: 'ჩემი დაბადების დღე აპრილშია.', uk: 'Мій день народження у квітні.', ru: 'Мой день рождения в апреле.', zh: '我的生日在四月。', es: 'Mi cumpleaños es en abril.', fr: 'Mon anniversaire est en avril.', it: 'Il mio compleanno è ad aprile.', ja: '誕生日は四月です。',
      } },
      { id: 'time.meeting', text: {
        de: 'Wir treffen uns um Viertel nach drei.', en: 'We are meeting at a quarter past three.', ka: 'სამ საათსა და თხუთმეტ წუთზე შევხვდებით.', uk: 'Ми зустрічаємося о третій п’ятнадцять.', ru: 'Мы встречаемся в три пятнадцать.', zh: '我们三点一刻见面。', es: 'Nos vemos a las tres y cuarto.', fr: 'Nous nous retrouvons à trois heures et quart.', it: 'Ci incontriamo alle tre e un quarto.', ja: '三時十五分に会います。',
      } },
      { id: 'time.wait', text: {
        de: 'Warte bitte fünf Minuten.', en: 'Please wait five minutes.', ka: 'ხუთი წუთი მოიცადე, გთხოვ.', uk: 'Зачекай, будь ласка, п’ять хвилин.', ru: 'Подожди, пожалуйста, пять минут.', zh: '请等五分钟。', es: 'Espera cinco minutos, por favor.', fr: 'Attends cinq minutes, s’il te plaît.', it: 'Aspetta cinque minuti, per favore.', ja: '五分待ってください。',
      } },
      { id: 'time.week', text: {
        de: 'Eine Woche hat sieben Tage.', en: 'A week has seven days.', ka: 'კვირაში შვიდი დღეა.', uk: 'У тижні сім днів.', ru: 'В неделе семь дней.', zh: '一个星期有七天。', es: 'Una semana tiene siete días.', fr: 'Une semaine compte sept jours.', it: 'Una settimana ha sette giorni.', ja: '一週間は七日間です。',
      } },
    ],
  },
  {
    id: 'daily-life',
    title: { de: '04 · Mein Alltag', en: '04 · Daily life', ru: '04 · Повседневная жизнь', uk: '04 · Повсякденне життя' },
    note: {
      de: 'Anfangspraxis: Erzähle, was du regelmäßig tust und was gerade passiert. Wörter wie „jeden Tag“, „oft“ und „manchmal“ zeigen die Häufigkeit. Verbinde zwei Handlungen mit „und“ oder stelle sie mit „aber“ gegenüber.',
      en: 'Introductory practice: describe routines and what is happening now. Words such as “every day”, “often” and “sometimes” show frequency. Connect two actions with “and” or contrast them with “but”.',
      ru: 'Начальная практика: расскажи о привычках и о том, что происходит сейчас. Слова «каждый день», «часто» и «иногда» показывают частоту. Соединяй действия словами «и» или «но».',
      uk: 'Початкова практика: розкажи про звички й те, що відбувається зараз. Слова «щодня», «часто» та «іноді» показують частоту. Поєднуй дії словами «і» або «але».',
    },
    items: [
      { id: 'daily.wake', text: {
        de: 'Ich stehe jeden Tag um sieben Uhr auf.', en: 'I get up at seven every day.', ka: 'ყოველდღე შვიდ საათზე ვდგები.', uk: 'Я щодня встаю о сьомій годині.', ru: 'Я каждый день встаю в семь часов.', zh: '我每天七点起床。', es: 'Me levanto a las siete todos los días.', fr: 'Je me lève à sept heures tous les jours.', it: 'Mi alzo alle sette ogni giorno.', ja: '毎日七時に起きます。',
      } },
      { id: 'daily.breakfast', text: {
        de: 'Vor der Schule frühstücke ich.', en: 'I have breakfast before school.', ka: 'სკოლაში წასვლამდე ვსაუზმობ.', uk: 'Перед школою я снідаю.', ru: 'Перед школой я завтракаю.', zh: '上学前我吃早饭。', es: 'Desayuno antes de ir al colegio.', fr: 'Je prends mon petit-déjeuner avant d’aller à l’école.', it: 'Faccio colazione prima di andare a scuola.', ja: '学校に行く前に朝ごはんを食べます。',
      } },
      { id: 'daily.walk', text: {
        de: 'Ich gehe meistens zu Fuß zur Schule.', en: 'I usually walk to school.', ka: 'სკოლაში ჩვეულებრივ ფეხით მივდივარ.', uk: 'Зазвичай я ходжу до школи пішки.', ru: 'Обычно я хожу в школу пешком.', zh: '我通常走路去上学。', es: 'Normalmente voy al colegio a pie.', fr: 'D’habitude, je vais à l’école à pied.', it: 'Di solito vado a scuola a piedi.', ja: '普段は歩いて学校に行きます。',
      } },
      { id: 'daily.homework', text: {
        de: 'Nach dem Mittagessen mache ich meine Hausaufgaben.', en: 'I do my homework after lunch.', ka: 'სადილის შემდეგ საშინაო დავალებას ვაკეთებ.', uk: 'Після обіду я роблю домашнє завдання.', ru: 'После обеда я делаю домашнее задание.', zh: '午饭后我做作业。', es: 'Hago los deberes después de comer.', fr: 'Je fais mes devoirs après le déjeuner.', it: 'Faccio i compiti dopo pranzo.', ja: '昼ごはんの後で宿題をします。',
      } },
      { id: 'daily.music', text: {
        de: 'Beim Aufräumen höre ich Musik.', en: 'I listen to music while tidying up.', ka: 'დალაგების დროს მუსიკას ვუსმენ.', uk: 'Під час прибирання я слухаю музику.', ru: 'Во время уборки я слушаю музыку.', zh: '我一边收拾房间，一边听音乐。', es: 'Escucho música mientras ordeno.', fr: 'J’écoute de la musique en rangeant.', it: 'Ascolto musica mentre metto in ordine.', ja: '片付けをしながら音楽を聴きます。',
      } },
      { id: 'daily.water-plants', text: {
        de: 'Kannst du heute die Pflanzen gießen?', en: 'Can you water the plants today?', ka: 'შეგიძლია დღეს მცენარეები მორწყა?', uk: 'Можеш сьогодні полити рослини?', ru: 'Можешь сегодня полить растения?', zh: '你今天能给植物浇水吗？', es: '¿Puedes regar las plantas hoy?', fr: 'Peux-tu arroser les plantes aujourd’hui ?', it: 'Puoi annaffiare le piante oggi?', ja: '今日、植物に水をあげてもらえますか。',
      } },
      { id: 'daily.break', text: {
        de: 'Ich brauche eine kurze Pause.', en: 'I need a short break.', ka: 'მოკლე შესვენება მჭირდება.', uk: 'Мені потрібна коротка перерва.', ru: 'Мне нужен короткий перерыв.', zh: '我需要休息一会儿。', es: 'Necesito un pequeño descanso.', fr: 'J’ai besoin d’une petite pause.', it: 'Ho bisogno di una breve pausa.', ja: '少し休憩が必要です。',
      } },
      { id: 'daily.weekend', text: {
        de: 'Am Wochenende fahren wir oft Fahrrad.', en: 'We often ride our bikes at the weekend.', ka: 'შაბათ-კვირას ხშირად ველოსიპედით ვსეირნობთ.', uk: 'На вихідних ми часто катаємося на велосипедах.', ru: 'По выходным мы часто катаемся на велосипедах.', zh: '周末我们经常骑自行车。', es: 'Los fines de semana montamos en bicicleta a menudo.', fr: 'Le week-end, nous faisons souvent du vélo.', it: 'Nel fine settimana andiamo spesso in bicicletta.', ja: '週末はよく自転車に乗ります。',
      } },
      { id: 'daily.rain', text: {
        de: 'Heute regnet es, deshalb bleibe ich zu Hause.', en: 'It is raining today, so I am staying at home.', ka: 'დღეს წვიმს, ამიტომ სახლში ვრჩები.', uk: 'Сьогодні дощить, тому я залишаюся вдома.', ru: 'Сегодня идёт дождь, поэтому я остаюсь дома.', zh: '今天下雨，所以我待在家里。', es: 'Hoy llueve, así que me quedo en casa.', fr: 'Il pleut aujourd’hui, alors je reste à la maison.', it: 'Oggi piove, quindi resto a casa.', ja: '今日は雨なので、家にいます。',
      } },
      { id: 'daily.sleep', text: {
        de: 'Vor dem Schlafengehen lese ich zehn Minuten.', en: 'I read for ten minutes before going to sleep.', ka: 'ძილის წინ ათი წუთი ვკითხულობ.', uk: 'Перед сном я читаю десять хвилин.', ru: 'Перед сном я читаю десять минут.', zh: '睡觉前我看十分钟书。', es: 'Leo diez minutos antes de dormir.', fr: 'Je lis pendant dix minutes avant de dormir.', it: 'Leggo per dieci minuti prima di dormire.', ja: '寝る前に十分間、本を読みます。',
      } },
    ],
  },
  {
    id: 'food',
    title: { de: '05 · Essen und Trinken', en: '05 · Food and drink', ru: '05 · Еда и напитки', uk: '05 · Їжа й напої' },
    note: {
      de: 'Anfangspraxis: Bestelle etwas, beschreibe Geschmack und frage nach Zutaten. Unterscheide „ich möchte“, „ich mag“ und „ich kann nicht essen“. Bei einer echten Allergie muss die Information eindeutig verstanden werden; diese Übung ersetzt keine sichere Abklärung.',
      en: 'Introductory practice: order food, describe taste and ask about ingredients. Distinguish “I would like”, “I like” and “I cannot eat”. A real allergy needs to be clearly understood; this exercise does not replace checking food safely.',
      ru: 'Начальная практика: закажи еду, опиши вкус и спроси о составе. Различай «я хочу», «мне нравится» и «мне нельзя есть». При настоящей аллергии важно убедиться, что тебя правильно поняли; учебная фраза не заменяет проверку состава.',
      uk: 'Початкова практика: замов їжу, опиши смак і запитай про склад. Розрізняй «я хочу», «мені подобається» та «мені не можна їсти». За справжньої алергії важливо переконатися, що тебе правильно зрозуміли; навчальна фраза не замінює перевірку складу.',
    },
    items: [
      { id: 'food.water', text: {
        de: 'Ich hätte gern ein Glas Wasser.', en: 'I would like a glass of water.', ka: 'ერთი ჭიქა წყალი მინდა, გთხოვთ.', uk: 'Мені, будь ласка, склянку води.', ru: 'Мне, пожалуйста, стакан воды.', zh: '我想要一杯水。', es: 'Quisiera un vaso de agua.', fr: 'Je voudrais un verre d’eau.', it: 'Vorrei un bicchiere d’acqua.', ja: '水を一杯お願いします。',
      } },
      { id: 'food.menu', text: {
        de: 'Können wir bitte die Speisekarte bekommen?', en: 'Could we have the menu, please?', ka: 'შეიძლება მენიუ მოგვიტანოთ, გთხოვთ?', uk: 'Можна нам меню, будь ласка?', ru: 'Можно нам меню, пожалуйста?', zh: '请给我们菜单，好吗？', es: '¿Nos trae la carta, por favor?', fr: 'Pourrions-nous avoir le menu, s’il vous plaît ?', it: 'Possiamo avere il menù, per favore?', ja: 'メニューをいただけますか。',
      } },
      { id: 'food.hungry', text: {
        de: 'Ich habe Hunger, aber noch keinen Durst.', en: 'I am hungry, but I am not thirsty yet.', ka: 'მშია, მაგრამ ჯერ არ მწყურია.', uk: 'Я хочу їсти, але пити ще не хочу.', ru: 'Я хочу есть, но пить пока не хочу.', zh: '我饿了，但是还不渴。', es: 'Tengo hambre, pero todavía no tengo sed.', fr: 'J’ai faim, mais je n’ai pas encore soif.', it: 'Ho fame, ma non ho ancora sete.', ja: 'おなかはすいていますが、まだ喉は渇いていません。',
      } },
      { id: 'food.soup', text: {
        de: 'Die Suppe ist noch sehr heiß.', en: 'The soup is still very hot.', ka: 'წვნიანი ჯერ კიდევ ძალიან ცხელია.', uk: 'Суп ще дуже гарячий.', ru: 'Суп ещё очень горячий.', zh: '汤还很烫。', es: 'La sopa todavía está muy caliente.', fr: 'La soupe est encore très chaude.', it: 'La zuppa è ancora molto calda.', ja: 'スープはまだとても熱いです。',
      } },
      { id: 'food.vegetables', text: {
        de: 'Zu diesem Gericht gehört viel Gemüse.', en: 'This dish contains a lot of vegetables.', ka: 'ამ კერძში ბევრი ბოსტნეულია.', uk: 'У цій страві багато овочів.', ru: 'В этом блюде много овощей.', zh: '这道菜里有很多蔬菜。', es: 'Este plato lleva muchas verduras.', fr: 'Ce plat contient beaucoup de légumes.', it: 'Questo piatto contiene molte verdure.', ja: 'この料理には野菜がたくさん入っています。',
      } },
      { id: 'food.no-nuts', text: {
        de: 'Ich bin gegen Nüsse allergisch.', en: 'I am allergic to nuts.', ka: 'თხილეულზე ალერგია მაქვს.', uk: 'У мене алергія на горіхи.', ru: 'У меня аллергия на орехи.', zh: '我对坚果过敏。', es: 'Tengo alergia a los frutos secos.', fr: 'Je suis allergique aux fruits à coque.', it: 'Ho un’allergia alla frutta a guscio.', ja: 'ナッツのアレルギーがあります。',
      } },
      { id: 'food.milk', text: {
        de: 'Ist in diesem Brot Milch?', en: 'Does this bread contain milk?', ka: 'ამ პურში რძეა?', uk: 'У цьому хлібі є молоко?', ru: 'В этом хлебе есть молоко?', zh: '这种面包里有牛奶吗？', es: '¿Este pan lleva leche?', fr: 'Est-ce que ce pain contient du lait ?', it: 'Questo pane contiene latte?', ja: 'このパンには牛乳が入っていますか。',
      } },
      { id: 'food.preference', text: {
        de: 'Ich trinke lieber Tee als Kaffee.', en: 'I prefer tea to coffee.', ka: 'ჩაი ყავას მირჩევნია.', uk: 'Я віддаю перевагу чаю, а не каві.', ru: 'Я предпочитаю чай кофе.', zh: '比起咖啡，我更喜欢喝茶。', es: 'Prefiero el té al café.', fr: 'Je préfère le thé au café.', it: 'Preferisco il tè al caffè.', ja: 'コーヒーよりお茶が好きです。',
      } },
      { id: 'food.recipe', text: {
        de: 'Für den Salat brauchen wir Tomaten und Gurken.', en: 'We need tomatoes and cucumbers for the salad.', ka: 'სალათისთვის პომიდორი და კიტრი გვჭირდება.', uk: 'Для салату нам потрібні помідори й огірки.', ru: 'Для салата нам нужны помидоры и огурцы.', zh: '做沙拉需要西红柿和黄瓜。', es: 'Necesitamos tomates y pepinos para la ensalada.', fr: 'Il nous faut des tomates et des concombres pour la salade.', it: 'Per l’insalata ci servono pomodori e cetrioli.', ja: 'サラダにはトマトときゅうりが必要です。',
      } },
      { id: 'food.bill', text: {
        de: 'Können wir bitte bezahlen?', en: 'Could we pay, please?', ka: 'შეიძლება გადავიხადოთ, გთხოვთ?', uk: 'Можна розрахуватися, будь ласка?', ru: 'Можно расплатиться, пожалуйста?', zh: '我们可以结账吗？', es: '¿Podemos pagar, por favor?', fr: 'Pourrions-nous payer, s’il vous plaît ?', it: 'Possiamo pagare, per favore?', ja: 'お会計をお願いします。',
      } },
    ],
  },
  {
    id: 'shopping',
    title: { de: '06 · Einkaufen', en: '06 · Shopping', ru: '06 · Покупки', uk: '06 · Покупки' },
    note: {
      de: 'Anfangspraxis: Frage nach Preis, Größe und Menge. Achte bei Fragen auf Fragewörter wie „wie viel“, „wo“ und „welche“. Geldbeträge sind hier Sprachbeispiele und keine echten Angebote.',
      en: 'Introductory practice: ask about price, size and quantity. Notice question words such as “how much”, “where” and “which”. Prices here are language examples, not real offers.',
      ru: 'Начальная практика: спроси о цене, размере и количестве. Обрати внимание на вопросительные слова «сколько», «где» и «какой». Цены здесь служат примерами для изучения языка, а не реальными предложениями.',
      uk: 'Початкова практика: запитай про ціну, розмір і кількість. Зверни увагу на питальні слова «скільки», «де» та «який». Ціни тут є мовними прикладами, а не справжніми пропозиціями.',
    },
    items: [
      { id: 'shop.price', text: {
        de: 'Wie viel kostet dieses Heft?', en: 'How much does this notebook cost?', ka: 'ეს რვეული რა ღირს?', uk: 'Скільки коштує цей зошит?', ru: 'Сколько стоит эта тетрадь?', zh: '这个本子多少钱？', es: '¿Cuánto cuesta este cuaderno?', fr: 'Combien coûte ce cahier ?', it: 'Quanto costa questo quaderno?', ja: 'このノートはいくらですか。',
      } },
      { id: 'shop.total', text: {
        de: 'Das macht zusammen zwölf Euro.', en: 'That comes to twelve euros in total.', ka: 'სულ თორმეტი ევროა.', uk: 'Разом це дванадцять євро.', ru: 'Всего получается двенадцать евро.', zh: '一共十二欧元。', es: 'Son doce euros en total.', fr: 'Cela fait douze euros en tout.', it: 'In tutto sono dodici euro.', ja: '全部で十二ユーロです。',
      } },
      { id: 'shop.size', text: {
        de: 'Haben Sie diese Jacke in einer kleineren Größe?', en: 'Do you have this jacket in a smaller size?', ka: 'ეს ქურთუკი უფრო პატარა ზომის გაქვთ?', uk: 'У вас є ця куртка меншого розміру?', ru: 'У вас есть эта куртка меньшего размера?', zh: '这件夹克有小一点的尺码吗？', es: '¿Tiene esta chaqueta en una talla más pequeña?', fr: 'Avez-vous cette veste dans une taille plus petite ?', it: 'Avete questa giacca in una taglia più piccola?', ja: 'このジャケットの小さいサイズはありますか。',
      } },
      { id: 'shop.try', text: {
        de: 'Kann ich diese Schuhe anprobieren?', en: 'Can I try on these shoes?', ka: 'შეიძლება ეს ფეხსაცმელი მოვიზომო?', uk: 'Можна приміряти це взуття?', ru: 'Можно примерить эту обувь?', zh: '我可以试穿这双鞋吗？', es: '¿Puedo probarme estos zapatos?', fr: 'Puis-je essayer ces chaussures ?', it: 'Posso provare queste scarpe?', ja: 'この靴を試着してもいいですか。',
      } },
      { id: 'shop.colour', text: {
        de: 'Ich suche einen blauen Rucksack.', en: 'I am looking for a blue backpack.', ka: 'ლურჯ ზურგჩანთას ვეძებ.', uk: 'Я шукаю синій рюкзак.', ru: 'Я ищу синий рюкзак.', zh: '我在找一个蓝色的背包。', es: 'Busco una mochila azul.', fr: 'Je cherche un sac à dos bleu.', it: 'Cerco uno zaino blu.', ja: '青いリュックを探しています。',
      } },
      { id: 'shop.quantity', text: {
        de: 'Ich hätte gern ein Kilo Äpfel.', en: 'I would like one kilo of apples.', ka: 'ერთი კილო ვაშლი მინდა, გთხოვთ.', uk: 'Мені, будь ласка, кілограм яблук.', ru: 'Мне, пожалуйста, килограмм яблок.', zh: '我想买一公斤苹果。', es: 'Quisiera un kilo de manzanas.', fr: 'Je voudrais un kilo de pommes.', it: 'Vorrei un chilo di mele.', ja: 'りんごを一キロお願いします。',
      } },
      { id: 'shop.card', text: {
        de: 'Kann ich mit Karte bezahlen?', en: 'Can I pay by card?', ka: 'შეიძლება ბარათით გადავიხადო?', uk: 'Можна заплатити карткою?', ru: 'Можно заплатить картой?', zh: '可以刷卡吗？', es: '¿Puedo pagar con tarjeta?', fr: 'Puis-je payer par carte ?', it: 'Posso pagare con la carta?', ja: 'カードで払えますか。',
      } },
      { id: 'shop.receipt', text: {
        de: 'Ich brauche bitte den Kassenbon.', en: 'I need the receipt, please.', ka: 'ჩეკი მჭირდება, გთხოვთ.', uk: 'Мені потрібен чек, будь ласка.', ru: 'Мне нужен чек, пожалуйста.', zh: '请给我小票。', es: 'Necesito el recibo, por favor.', fr: 'J’ai besoin du ticket de caisse, s’il vous plaît.', it: 'Mi serve lo scontrino, per favore.', ja: 'レシートをお願いします。',
      } },
      { id: 'shop.bag', text: {
        de: 'Eine Tüte brauche ich nicht, danke.', en: 'I do not need a bag, thank you.', ka: 'პარკი არ მჭირდება, გმადლობთ.', uk: 'Пакет мені не потрібен, дякую.', ru: 'Пакет мне не нужен, спасибо.', zh: '我不需要袋子，谢谢。', es: 'No necesito una bolsa, gracias.', fr: 'Je n’ai pas besoin de sac, merci.', it: 'Non mi serve un sacchetto, grazie.', ja: '袋はいりません。ありがとうございます。',
      } },
      { id: 'shop.closed', text: {
        de: 'Der Laden schließt heute um sechs Uhr.', en: 'The shop closes at six o’clock today.', ka: 'მაღაზია დღეს ექვს საათზე იკეტება.', uk: 'Магазин сьогодні зачиняється о шостій годині.', ru: 'Магазин сегодня закрывается в шесть часов.', zh: '商店今天六点关门。', es: 'La tienda cierra hoy a las seis.', fr: 'Le magasin ferme à six heures aujourd’hui.', it: 'Il negozio oggi chiude alle sei.', ja: '店は今日、六時に閉まります。',
      } },
    ],
  },
  {
    id: 'city-travel',
    title: { de: '07 · Unterwegs in der Stadt', en: '07 · Getting around town', ru: '07 · Город и дорога', uk: '07 · Місто й дорога' },
    note: {
      de: 'Anfangspraxis: Frage nach dem Weg und verstehe kurze Anweisungen. Unterscheide Standort („neben der Bank“) und Richtung („nach links“). Verbinde Wegschritte mit „dann“ und prüfe wichtige Angaben wie Haltestelle und Gleis.',
      en: 'Introductory practice: ask for directions and understand short instructions. Distinguish location (“next to the bank”) from direction (“to the left”). Link steps with “then” and check important details such as the stop and platform.',
      ru: 'Начальная практика: спроси дорогу и пойми короткие указания. Различай местоположение («рядом с банком») и направление («налево»). Соединяй шаги словом «потом» и проверяй важные сведения об остановке и платформе.',
      uk: 'Початкова практика: запитай дорогу й зрозумій короткі вказівки. Розрізняй місце («поруч із банком») і напрямок («ліворуч»). Поєднуй кроки словом «потім» і перевіряй важливі відомості про зупинку та платформу.',
    },
    items: [
      { id: 'city.station', text: {
        de: 'Entschuldigung, wo ist der Bahnhof?', en: 'Excuse me, where is the train station?', ka: 'უკაცრავად, სად არის რკინიგზის სადგური?', uk: 'Перепрошую, де залізничний вокзал?', ru: 'Извините, где железнодорожный вокзал?', zh: '请问，火车站在哪里？', es: 'Disculpe, ¿dónde está la estación de tren?', fr: 'Excusez-moi, où est la gare ?', it: 'Mi scusi, dov’è la stazione ferroviaria?', ja: 'すみません。駅はどこですか。',
      } },
      { id: 'city.straight', text: {
        de: 'Gehen Sie geradeaus und dann nach links.', en: 'Go straight ahead and then turn left.', ka: 'პირდაპირ წადით და შემდეგ მარცხნივ მოუხვიეთ.', uk: 'Ідіть прямо, а потім поверніть ліворуч.', ru: 'Идите прямо, а потом поверните налево.', zh: '一直往前走，然后左转。', es: 'Siga recto y después gire a la izquierda.', fr: 'Allez tout droit, puis tournez à gauche.', it: 'Vada dritto e poi giri a sinistra.', ja: 'まっすぐ行って、それから左に曲がってください。',
      } },
      { id: 'city.library', text: {
        de: 'Die Bibliothek ist neben der Bank.', en: 'The library is next to the bank.', ka: 'ბიბლიოთეკა ბანკის გვერდითაა.', uk: 'Бібліотека поруч із банком.', ru: 'Библиотека рядом с банком.', zh: '图书馆在银行旁边。', es: 'La biblioteca está al lado del banco.', fr: 'La bibliothèque est à côté de la banque.', it: 'La biblioteca è accanto alla banca.', ja: '図書館は銀行の隣にあります。',
      } },
      { id: 'city.bus', text: {
        de: 'Fährt dieser Bus zum Museum?', en: 'Does this bus go to the museum?', ka: 'ეს ავტობუსი მუზეუმთან მიდის?', uk: 'Цей автобус їде до музею?', ru: 'Этот автобус едет до музея?', zh: '这辆公交车到博物馆吗？', es: '¿Este autobús va al museo?', fr: 'Ce bus va-t-il au musée ?', it: 'Questo autobus va al museo?', ja: 'このバスは博物館に行きますか。',
      } },
      { id: 'city.ticket', text: {
        de: 'Ich hätte gern eine Fahrkarte nach München.', en: 'I would like a ticket to Munich.', ka: 'მიუნხენის ბილეთი მინდა, გთხოვთ.', uk: 'Мені, будь ласка, квиток до Мюнхена.', ru: 'Мне, пожалуйста, билет до Мюнхена.', zh: '我想买一张去慕尼黑的票。', es: 'Quisiera un billete a Múnich.', fr: 'Je voudrais un billet pour Munich.', it: 'Vorrei un biglietto per Monaco di Baviera.', ja: 'ミュンヘンまでの切符を一枚お願いします。',
      } },
      { id: 'city.platform', text: {
        de: 'Der Zug fährt von Gleis vier ab.', en: 'The train leaves from platform four.', ka: 'მატარებელი მეოთხე ლიანდაგიდან გადის.', uk: 'Потяг вирушає з четвертої колії.', ru: 'Поезд отправляется с четвёртого пути.', zh: '火车从四号站台发车。', es: 'El tren sale del andén cuatro.', fr: 'Le train part de la voie quatre.', it: 'Il treno parte dal binario quattro.', ja: '電車は四番線から出発します。',
      } },
      { id: 'city.next-stop', text: {
        de: 'Wir steigen an der nächsten Haltestelle aus.', en: 'We are getting off at the next stop.', ka: 'შემდეგ გაჩერებაზე ჩავდივართ.', uk: 'Ми виходимо на наступній зупинці.', ru: 'Мы выходим на следующей остановке.', zh: '我们下一站下车。', es: 'Nos bajamos en la próxima parada.', fr: 'Nous descendons au prochain arrêt.', it: 'Scendiamo alla prossima fermata.', ja: '次の停留所で降ります。',
      } },
      { id: 'city.cross', text: {
        de: 'Wir überqueren die Straße an der Ampel.', en: 'We cross the road at the traffic lights.', ka: 'ქუჩას შუქნიშანთან გადავდივართ.', uk: 'Ми переходимо вулицю біля світлофора.', ru: 'Мы переходим улицу у светофора.', zh: '我们在有红绿灯的地方过马路。', es: 'Cruzamos la calle por el semáforo.', fr: 'Nous traversons la rue au feu.', it: 'Attraversiamo la strada al semaforo.', ja: '信号のある所で道を渡ります。',
      } },
      { id: 'city.distance', text: {
        de: 'Ist der Park weit von hier entfernt?', en: 'Is the park far from here?', ka: 'პარკი აქედან შორსაა?', uk: 'Парк далеко звідси?', ru: 'Парк далеко отсюда?', zh: '公园离这里远吗？', es: '¿El parque está lejos de aquí?', fr: 'Le parc est-il loin d’ici ?', it: 'Il parco è lontano da qui?', ja: '公園はここから遠いですか。',
      } },
      { id: 'city.lost', text: {
        de: 'Ich finde den Eingang nicht. Können Sie mir helfen?', en: 'I cannot find the entrance. Can you help me?', ka: 'შესასვლელს ვერ ვპოულობ. შეგიძლიათ დამეხმაროთ?', uk: 'Я не можу знайти вхід. Можете допомогти?', ru: 'Я не могу найти вход. Можете помочь?', zh: '我找不到入口。您能帮我吗？', es: 'No encuentro la entrada. ¿Puede ayudarme?', fr: 'Je ne trouve pas l’entrée. Pouvez-vous m’aider ?', it: 'Non trovo l’ingresso. Può aiutarmi?', ja: '入り口が見つかりません。手伝っていただけますか。',
      } },
    ],
  },
  {
    id: 'study',
    title: { de: '08 · Lernen und Schule', en: '08 · Learning and school', ru: '08 · Учёба и школа', uk: '08 · Навчання й школа' },
    note: {
      de: 'Anfangspraxis: Frage im Unterricht nach, erkläre ein Lernproblem und schlage gemeinsames Üben vor. „Können“ beschreibt eine Möglichkeit oder Fähigkeit; „müssen“ drückt eine Notwendigkeit aus. Suche diese Bedeutungen in der Zielsprache, statt einzelne Wörter wörtlich zu ersetzen.',
      en: 'Introductory practice: ask questions in class, explain a learning difficulty and suggest practising together. “Can” expresses possibility or ability; “must” expresses necessity. Look for those meanings in the target language rather than replacing individual words literally.',
      ru: 'Начальная практика: задай вопрос на уроке, объясни затруднение и предложи потренироваться вместе. «Мочь» передаёт возможность или умение, «нужно» — необходимость. Ищи соответствующий смысл в изучаемом языке, а не заменяй слова дословно.',
      uk: 'Початкова практика: постав запитання на уроці, поясни труднощі та запропонуй потренуватися разом. «Могти» передає можливість чи вміння, «треба» — необхідність. Шукай відповідний зміст у мові, яку вивчаєш, замість дослівної заміни слів.',
    },
    items: [
      { id: 'study.subject', text: {
        de: 'Heute lernen wir etwas über den Weltraum.', en: 'Today we are learning about space.', ka: 'დღეს კოსმოსის შესახებ ვსწავლობთ.', uk: 'Сьогодні ми вивчаємо космос.', ru: 'Сегодня мы изучаем космос.', zh: '今天我们学习有关太空的知识。', es: 'Hoy aprendemos sobre el espacio.', fr: 'Aujourd’hui, nous étudions l’espace.', it: 'Oggi studiamo lo spazio.', ja: '今日は宇宙について勉強します。',
      } },
      { id: 'study.question', text: {
        de: 'Ich habe eine Frage zu dieser Aufgabe.', en: 'I have a question about this exercise.', ka: 'ამ დავალებასთან დაკავშირებით კითხვა მაქვს.', uk: 'У мене є запитання щодо цього завдання.', ru: 'У меня есть вопрос по этому заданию.', zh: '关于这道题，我有一个问题。', es: 'Tengo una pregunta sobre este ejercicio.', fr: 'J’ai une question sur cet exercice.', it: 'Ho una domanda su questo esercizio.', ja: 'この問題について質問があります。',
      } },
      { id: 'study.page', text: {
        de: 'Öffnet bitte das Buch auf Seite zwanzig.', en: 'Please open your books at page twenty.', ka: 'გთხოვთ, წიგნები მეოცე გვერდზე გადაშალეთ.', uk: 'Відкрийте, будь ласка, книжки на двадцятій сторінці.', ru: 'Откройте, пожалуйста, книги на двадцатой странице.', zh: '请把书翻到第二十页。', es: 'Abrid los libros por la página veinte, por favor.', fr: 'Ouvrez vos livres à la page vingt, s’il vous plaît.', it: 'Aprite i libri a pagina venti, per favore.', ja: '本の二十ページを開いてください。',
      } },
      { id: 'study.example', text: {
        de: 'Kannst du mir ein anderes Beispiel zeigen?', en: 'Can you show me another example?', ka: 'შეგიძლია სხვა მაგალითი მაჩვენო?', uk: 'Можеш показати мені інший приклад?', ru: 'Можешь показать мне другой пример?', zh: '你能给我看另一个例子吗？', es: '¿Puedes mostrarme otro ejemplo?', fr: 'Peux-tu me montrer un autre exemple ?', it: 'Puoi mostrarmi un altro esempio?', ja: '別の例を見せてもらえますか。',
      } },
      { id: 'study.explain', text: {
        de: 'Bitte erkläre mir den ersten Schritt.', en: 'Please explain the first step to me.', ka: 'გთხოვ, პირველი ნაბიჯი ამიხსენი.', uk: 'Поясни мені, будь ласка, перший крок.', ru: 'Объясни мне, пожалуйста, первый шаг.', zh: '请给我解释第一步。', es: 'Explícame el primer paso, por favor.', fr: 'Explique-moi la première étape, s’il te plaît.', it: 'Spiegami il primo passaggio, per favore.', ja: '最初の手順を説明してください。',
      } },
      { id: 'study.dictionary', text: {
        de: 'Ich suche das Wort im Wörterbuch.', en: 'I am looking up the word in the dictionary.', ka: 'ამ სიტყვას ლექსიკონში ვეძებ.', uk: 'Я шукаю це слово у словнику.', ru: 'Я ищу это слово в словаре.', zh: '我正在词典里查这个词。', es: 'Estoy buscando la palabra en el diccionario.', fr: 'Je cherche le mot dans le dictionnaire.', it: 'Cerco la parola nel dizionario.', ja: '辞書でその言葉を調べています。',
      } },
      { id: 'study.practice', text: {
        de: 'Wir können den Dialog zusammen üben.', en: 'We can practise the dialogue together.', ka: 'შეგვიძლია დიალოგი ერთად გავითამაშოთ.', uk: 'Ми можемо разом потренувати діалог.', ru: 'Мы можем вместе потренировать диалог.', zh: '我们可以一起练习对话。', es: 'Podemos practicar el diálogo juntos.', fr: 'Nous pouvons nous entraîner au dialogue ensemble.', it: 'Possiamo esercitarci nel dialogo insieme.', ja: '一緒に会話の練習ができます。',
      } },
      { id: 'study.deadline', text: {
        de: 'Wir müssen das Projekt bis Freitag fertigstellen.', en: 'We must finish the project by Friday.', ka: 'პროექტი პარასკევამდე უნდა დავასრულოთ.', uk: 'Ми маємо завершити проєкт до п’ятниці.', ru: 'Мы должны закончить проект к пятнице.', zh: '我们必须在星期五之前完成项目。', es: 'Tenemos que terminar el proyecto para el viernes.', fr: 'Nous devons terminer le projet pour vendredi.', it: 'Dobbiamo finire il progetto entro venerdì.', ja: '金曜日までにプロジェクトを終えなければなりません。',
      } },
      { id: 'study.mistake', text: {
        de: 'In diesem Satz fehlt ein Wort.', en: 'A word is missing from this sentence.', ka: 'ამ წინადადებაში ერთი სიტყვა აკლია.', uk: 'У цьому реченні бракує одного слова.', ru: 'В этом предложении не хватает одного слова.', zh: '这个句子少了一个词。', es: 'A esta frase le falta una palabra.', fr: 'Il manque un mot dans cette phrase.', it: 'In questa frase manca una parola.', ja: 'この文には言葉が一つ足りません。',
      } },
      { id: 'study.progress', text: {
        de: 'Jetzt verstehe ich, wie es funktioniert.', en: 'Now I understand how it works.', ka: 'ახლა მესმის, როგორ მუშაობს ეს.', uk: 'Тепер я розумію, як це працює.', ru: 'Теперь я понимаю, как это работает.', zh: '现在我明白它是怎么运作的了。', es: 'Ahora entiendo cómo funciona.', fr: 'Maintenant, je comprends comment cela fonctionne.', it: 'Adesso capisco come funziona.', ja: 'これがどう動くのか、今は分かります。',
      } },
    ],
  },
  {
    id: 'work-technology',
    title: { de: '09 · Zusammenarbeiten und Technik', en: '09 · Collaboration and technology', ru: '09 · Работа и технологии', uk: '09 · Робота й технології' },
    note: {
      de: 'Anfangspraxis: Besprich ein gemeinsames Projekt und einfache technische Probleme. Achte darauf, ob eine Handlung gerade läuft, schon abgeschlossen ist oder erst vorgeschlagen wird. Verwende Beispielsätze über Passwörter nie als Aufforderung, echte Zugangsdaten einzugeben.',
      en: 'Introductory practice: discuss a shared project and simple technical problems. Notice whether an action is happening now, is already finished or is being proposed. Sentences about passwords are language examples, never requests to enter real credentials.',
      ru: 'Начальная практика: обсуди общий проект и простые технические проблемы. Замечай, происходит ли действие сейчас, уже завершено или только предлагается. Фразы о паролях — учебные примеры, а не просьба вводить настоящие данные доступа.',
      uk: 'Початкова практика: обговори спільний проєкт і прості технічні проблеми. Помічай, чи дія відбувається зараз, уже завершена або лише пропонується. Речення про паролі — навчальні приклади, а не прохання вводити справжні дані доступу.',
    },
    items: [
      { id: 'tech.team', text: {
        de: 'Wir arbeiten heute als Team.', en: 'We are working as a team today.', ka: 'დღეს გუნდურად ვმუშაობთ.', uk: 'Сьогодні ми працюємо в команді.', ru: 'Сегодня мы работаем в команде.', zh: '今天我们一起合作。', es: 'Hoy trabajamos en equipo.', fr: 'Aujourd’hui, nous travaillons en équipe.', it: 'Oggi lavoriamo in squadra.', ja: '今日はチームで作業します。',
      } },
      { id: 'tech.plan', text: {
        de: 'Zuerst brauchen wir einen einfachen Plan.', en: 'First, we need a simple plan.', ka: 'ჯერ მარტივი გეგმა გვჭირდება.', uk: 'Спочатку нам потрібен простий план.', ru: 'Сначала нам нужен простой план.', zh: '首先，我们需要一个简单的计划。', es: 'Primero necesitamos un plan sencillo.', fr: 'D’abord, il nous faut un plan simple.', it: 'Per prima cosa ci serve un piano semplice.', ja: 'まず、簡単な計画が必要です。',
      } },
      { id: 'tech.save', text: {
        de: 'Speichere die Datei, bevor du das Fenster schließt.', en: 'Save the file before you close the window.', ka: 'ფანჯრის დახურვამდე ფაილი შეინახე.', uk: 'Збережи файл, перш ніж закрити вікно.', ru: 'Сохрани файл, прежде чем закрыть окно.', zh: '关闭窗口之前，请保存文件。', es: 'Guarda el archivo antes de cerrar la ventana.', fr: 'Enregistre le fichier avant de fermer la fenêtre.', it: 'Salva il file prima di chiudere la finestra.', ja: 'ウィンドウを閉じる前にファイルを保存してください。',
      } },
      { id: 'tech.connection', text: {
        de: 'Die Internetverbindung funktioniert gerade nicht.', en: 'The internet connection is not working right now.', ka: 'ინტერნეტკავშირი ახლა არ მუშაობს.', uk: 'Зараз інтернет-з’єднання не працює.', ru: 'Сейчас интернет-соединение не работает.', zh: '现在网络连接有问题。', es: 'La conexión a internet no funciona ahora mismo.', fr: 'La connexion internet ne fonctionne pas en ce moment.', it: 'La connessione a internet al momento non funziona.', ja: '今、インターネットにつながりません。',
      } },
      { id: 'tech.battery', text: {
        de: 'Der Akku ist fast leer.', en: 'The battery is almost empty.', ka: 'ბატარეა თითქმის დაცლილია.', uk: 'Акумулятор майже розряджений.', ru: 'Аккумулятор почти разряжен.', zh: '电池快没电了。', es: 'La batería está casi agotada.', fr: 'La batterie est presque vide.', it: 'La batteria è quasi scarica.', ja: 'バッテリーがもうすぐ切れます。',
      } },
      { id: 'tech.code', text: {
        de: 'Dieses Programm zählt die richtigen Antworten.', en: 'This program counts the correct answers.', ka: 'ეს პროგრამა სწორ პასუხებს ითვლის.', uk: 'Ця програма рахує правильні відповіді.', ru: 'Эта программа считает правильные ответы.', zh: '这个程序会统计正确答案的数量。', es: 'Este programa cuenta las respuestas correctas.', fr: 'Ce programme compte les bonnes réponses.', it: 'Questo programma conta le risposte corrette.', ja: 'このプログラムは正解の数を数えます。',
      } },
      { id: 'tech.test', text: {
        de: 'Lass uns die neue Funktion zuerst testen.', en: 'Let us test the new function first.', ka: 'ჯერ ახალი ფუნქცია გამოვცადოთ.', uk: 'Спочатку перевірмо нову функцію.', ru: 'Давай сначала проверим новую функцию.', zh: '我们先测试一下新功能吧。', es: 'Probemos primero la nueva función.', fr: 'Testons d’abord la nouvelle fonction.', it: 'Proviamo prima la nuova funzione.', ja: 'まず、新しい機能をテストしましょう。',
      } },
      { id: 'tech.password', text: {
        de: 'Teile dein Passwort nicht mit anderen.', en: 'Do not share your password with other people.', ka: 'შენი პაროლი სხვებს არ გაუზიარო.', uk: 'Не повідомляй свій пароль іншим.', ru: 'Не сообщай свой пароль другим.', zh: '不要把你的密码告诉别人。', es: 'No compartas tu contraseña con otras personas.', fr: 'Ne communique pas ton mot de passe à d’autres personnes.', it: 'Non condividere la tua password con altre persone.', ja: 'パスワードをほかの人に教えないでください。',
      } },
      { id: 'tech.message', text: {
        de: 'Kannst du die Nachricht später beantworten?', en: 'Can you answer the message later?', ka: 'შეგიძლია შეტყობინებას მოგვიანებით უპასუხო?', uk: 'Можеш відповісти на повідомлення пізніше?', ru: 'Можешь ответить на сообщение позже?', zh: '你能晚一点回复这条消息吗？', es: '¿Puedes responder al mensaje más tarde?', fr: 'Peux-tu répondre au message plus tard ?', it: 'Puoi rispondere al messaggio più tardi?', ja: 'そのメッセージに後で返事をしてもらえますか。',
      } },
      { id: 'tech.offline', text: {
        de: 'Diese Übung funktioniert auch ohne Internet.', en: 'This exercise also works without internet access.', ka: 'ეს სავარჯიშო ინტერნეტის გარეშეც მუშაობს.', uk: 'Ця вправа працює і без інтернету.', ru: 'Это упражнение работает и без интернета.', zh: '这个练习没有网络也能做。', es: 'Este ejercicio también funciona sin conexión a internet.', fr: 'Cet exercice fonctionne aussi sans connexion internet.', it: 'Questo esercizio funziona anche senza internet.', ja: 'この練習はインターネットがなくてもできます。',
      } },
    ],
  },
  {
    id: 'past-events',
    title: { de: '10 · Was schon passiert ist', en: '10 · Talking about the past', ru: '10 · Прошедшие события', uk: '10 · Минулі події' },
    note: {
      de: 'Erweiterte Anfangspraxis: Erzähle kurz von Vergangenem. Achte auf Zeitwörter wie „gestern“, „letzte Woche“ und „schon“. Sprachen bilden Vergangenheit unterschiedlich; im Chinesischen können Zeitangaben und Partikeln wichtig sein, ohne dass sich das Verb wie im Deutschen verändert.',
      en: 'Extended introductory practice: describe past events briefly. Notice time expressions such as “yesterday”, “last week” and “already”. Languages express the past differently; Chinese can use time expressions and particles without changing the verb as English does.',
      ru: 'Расширенная начальная практика: коротко расскажи о прошлом. Обрати внимание на «вчера», «на прошлой неделе» и «уже». Прошедшее время устроено по-разному: в китайском важны указатели времени и частицы, а глагол не меняется так, как в русском.',
      uk: 'Розширена початкова практика: коротко розкажи про минуле. Зверни увагу на «вчора», «минулого тижня» та «вже». Минулий час улаштований по-різному: у китайській важливі часові вказівки й частки, а дієслово не змінюється так, як в українській.',
    },
    items: [
      { id: 'past.rain', text: {
        de: 'Gestern hat es den ganzen Tag geregnet.', en: 'It rained all day yesterday.', ka: 'გუშინ მთელი დღე წვიმდა.', uk: 'Учора весь день ішов дощ.', ru: 'Вчера весь день шёл дождь.', zh: '昨天一整天都在下雨。', es: 'Ayer llovió todo el día.', fr: 'Hier, il a plu toute la journée.', it: 'Ieri ha piovuto tutto il giorno.', ja: '昨日は一日中雨が降っていました。',
      } },
      { id: 'past.museum', text: {
        de: 'Letzte Woche haben wir ein Museum besucht.', en: 'Last week we visited a museum.', ka: 'გასულ კვირას მუზეუმს ვესტუმრეთ.', uk: 'Минулого тижня ми відвідали музей.', ru: 'На прошлой неделе мы посетили музей.', zh: '上个星期我们参观了博物馆。', es: 'La semana pasada visitamos un museo.', fr: 'La semaine dernière, nous avons visité un musée.', it: 'La settimana scorsa abbiamo visitato un museo.', ja: '先週、博物館に行きました。',
      } },
      { id: 'past.bus', text: {
        de: 'Der Bus kam zehn Minuten zu spät.', en: 'The bus arrived ten minutes late.', ka: 'ავტობუსი ათი წუთის დაგვიანებით მოვიდა.', uk: 'Автобус прибув із запізненням на десять хвилин.', ru: 'Автобус приехал с опозданием на десять минут.', zh: '公交车晚到了十分钟。', es: 'El autobús llegó con diez minutos de retraso.', fr: 'Le bus est arrivé avec dix minutes de retard.', it: 'L’autobus è arrivato con dieci minuti di ritardo.', ja: 'バスは十分遅れて来ました。',
      } },
      { id: 'past.find', text: {
        de: 'Wir haben die Schlüssel unter dem Stuhl gefunden.', en: 'We found the keys under the chair.', ka: 'გასაღებები სკამის ქვეშ ვიპოვეთ.', uk: 'Ми знайшли ключі під стільцем.', ru: 'Мы нашли ключи под стулом.', zh: '我们在椅子下面找到了钥匙。', es: 'Encontramos las llaves debajo de la silla.', fr: 'Nous avons trouvé les clés sous la chaise.', it: 'Abbiamo trovato le chiavi sotto la sedia.', ja: '椅子の下で鍵を見つけました。',
      } },
      { id: 'past.cook', text: {
        de: 'Am Samstag haben wir zusammen Pizza gebacken.', en: 'On Saturday we made pizza together.', ka: 'შაბათს ერთად პიცა გამოვაცხვეთ.', uk: 'У суботу ми разом приготували піцу.', ru: 'В субботу мы вместе приготовили пиццу.', zh: '星期六我们一起做了披萨。', es: 'El sábado hicimos pizza juntos.', fr: 'Samedi, nous avons fait une pizza ensemble.', it: 'Sabato abbiamo preparato la pizza insieme.', ja: '土曜日に一緒にピザを作りました。',
      } },
      { id: 'past.read', text: {
        de: 'Wir haben diese Geschichte schon gelesen.', en: 'We have already read this story.', ka: 'ეს მოთხრობა უკვე წავიკითხეთ.', uk: 'Ми вже читали це оповідання.', ru: 'Мы уже читали этот рассказ.', zh: '我们已经读过这个故事了。', es: 'Ya hemos leído este cuento.', fr: 'Nous avons déjà lu cette histoire.', it: 'Abbiamo già letto questo racconto.', ja: 'この話はもう読みました。',
      } },
      { id: 'past.no-time', text: {
        de: 'Gestern hatten wir keine Zeit zum Spielen.', en: 'Yesterday we had no time to play.', ka: 'გუშინ თამაშის დრო არ გვქონდა.', uk: 'Учора ми не мали часу грати.', ru: 'Вчера у нас не было времени играть.', zh: '昨天我们没有时间玩。', es: 'Ayer no tuvimos tiempo para jugar.', fr: 'Hier, nous n’avons pas eu le temps de jouer.', it: 'Ieri non abbiamo avuto tempo per giocare.', ja: '昨日は遊ぶ時間がありませんでした。',
      } },
      { id: 'past.photo', text: {
        de: 'Dieses Foto haben wir im Sommer gemacht.', en: 'We took this photo in the summer.', ka: 'ეს ფოტო ზაფხულში გადავიღეთ.', uk: 'Цю фотографію ми зробили влітку.', ru: 'Эту фотографию мы сделали летом.', zh: '这张照片是我们夏天拍的。', es: 'Hicimos esta foto en verano.', fr: 'Nous avons pris cette photo en été.', it: 'Abbiamo scattato questa foto in estate.', ja: 'この写真は夏に撮りました。',
      } },
      { id: 'past.learn', text: {
        de: 'Früher war diese Aufgabe schwer für uns.', en: 'This exercise used to be difficult for us.', ka: 'ადრე ეს დავალება ჩვენთვის რთული იყო.', uk: 'Раніше це завдання було для нас складним.', ru: 'Раньше это задание было для нас трудным.', zh: '以前这道题对我们来说很难。', es: 'Antes este ejercicio nos resultaba difícil.', fr: 'Avant, cet exercice était difficile pour nous.', it: 'Prima questo esercizio era difficile per noi.', ja: '以前は、この問題は私たちには難しかったです。',
      } },
      { id: 'past.happen', text: {
        de: 'Was ist nach dem Unterricht passiert?', en: 'What happened after the lesson?', ka: 'რა მოხდა გაკვეთილის შემდეგ?', uk: 'Що сталося після уроку?', ru: 'Что произошло после урока?', zh: '下课后发生了什么？', es: '¿Qué pasó después de la clase?', fr: 'Que s’est-il passé après le cours ?', it: 'Che cosa è successo dopo la lezione?', ja: '授業の後で何がありましたか。',
      } },
    ],
  },
  {
    id: 'plans',
    title: { de: '11 · Pläne und Möglichkeiten', en: '11 · Plans and possibilities', ru: '11 · Планы и возможности', uk: '11 · Плани й можливості' },
    note: {
      de: 'Erweiterte Anfangspraxis: Unterscheide einen festen Plan, einen Wunsch und eine Möglichkeit. Zeitangaben können Zukunft ausdrücken, auch wenn das Verb in der Gegenwartsform steht. Ein Satz mit „wenn“ verbindet eine Bedingung mit einer möglichen Folge.',
      en: 'Extended introductory practice: distinguish a firm plan, a wish and a possibility. A time expression can indicate the future even when a verb uses a present form. An “if” sentence connects a condition with a possible result.',
      ru: 'Расширенная начальная практика: различай определённый план, желание и возможность. Указание времени может передавать будущее даже с формой настоящего времени. Предложение с «если» связывает условие и возможный результат.',
      uk: 'Розширена початкова практика: розрізняй визначений план, бажання та можливість. Указівка часу може передавати майбутнє навіть із формою теперішнього часу. Речення з «якщо» поєднує умову й можливий результат.',
    },
    items: [
      { id: 'plans.tomorrow', text: {
        de: 'Morgen besuchen wir unsere Freunde.', en: 'Tomorrow we are visiting our friends.', ka: 'ხვალ მეგობრებს ვესტუმრებით.', uk: 'Завтра ми відвідаємо друзів.', ru: 'Завтра мы навестим друзей.', zh: '明天我们要去看朋友。', es: 'Mañana vamos a visitar a nuestros amigos.', fr: 'Demain, nous allons rendre visite à nos amis.', it: 'Domani andiamo a trovare i nostri amici.', ja: '明日は友達の家に行きます。',
      } },
      { id: 'plans.instrument', text: {
        de: 'Ich möchte Klavier spielen lernen.', en: 'I would like to learn to play the piano.', ka: 'მინდა პიანინოზე დაკვრა ვისწავლო.', uk: 'Я хочу навчитися грати на піаніно.', ru: 'Я хочу научиться играть на пианино.', zh: '我想学弹钢琴。', es: 'Me gustaría aprender a tocar el piano.', fr: 'J’aimerais apprendre à jouer du piano.', it: 'Vorrei imparare a suonare il pianoforte.', ja: 'ピアノを弾けるようになりたいです。',
      } },
      { id: 'plans.weekend', text: {
        de: 'Was möchtest du am Wochenende machen?', en: 'What would you like to do at the weekend?', ka: 'რისი გაკეთება გინდა შაბათ-კვირას?', uk: 'Що ти хочеш робити на вихідних?', ru: 'Что ты хочешь делать на выходных?', zh: '周末你想做什么？', es: '¿Qué te gustaría hacer el fin de semana?', fr: 'Qu’aimerais-tu faire ce week-end ?', it: 'Che cosa vorresti fare nel fine settimana?', ja: '週末は何をしたいですか。',
      } },
      { id: 'plans.rain', text: {
        de: 'Wenn es regnet, gehen wir ins Museum.', en: 'If it rains, we will go to the museum.', ka: 'თუ იწვიმებს, მუზეუმში წავალთ.', uk: 'Якщо дощитиме, ми підемо до музею.', ru: 'Если пойдёт дождь, мы пойдём в музей.', zh: '如果下雨，我们就去博物馆。', es: 'Si llueve, iremos al museo.', fr: 'S’il pleut, nous irons au musée.', it: 'Se piove, andremo al museo.', ja: '雨が降ったら、博物館に行きます。',
      } },
      { id: 'plans.finish', text: {
        de: 'Zuerst beenden wir die Arbeit, dann machen wir eine Pause.', en: 'First we will finish the work, then we will take a break.', ka: 'ჯერ საქმეს დავასრულებთ, შემდეგ შევისვენებთ.', uk: 'Спочатку ми завершимо роботу, потім зробимо перерву.', ru: 'Сначала мы закончим работу, потом сделаем перерыв.', zh: '我们先完成工作，然后休息。', es: 'Primero terminaremos el trabajo y después descansaremos.', fr: 'Nous finirons d’abord le travail, puis nous ferons une pause.', it: 'Prima finiremo il lavoro, poi faremo una pausa.', ja: 'まず作業を終えて、それから休憩します。',
      } },
      { id: 'plans.garden', text: {
        de: 'Nächsten Monat werden wir einen Baum pflanzen.', en: 'Next month we will plant a tree.', ka: 'მომავალ თვეში ხეს დავრგავთ.', uk: 'Наступного місяця ми посадимо дерево.', ru: 'В следующем месяце мы посадим дерево.', zh: '下个月我们要种一棵树。', es: 'El mes que viene plantaremos un árbol.', fr: 'Le mois prochain, nous planterons un arbre.', it: 'Il mese prossimo pianteremo un albero.', ja: '来月、木を一本植えます。',
      } },
      { id: 'plans.possible', text: {
        de: 'Vielleicht kommen wir heute etwas später.', en: 'We may arrive a little later today.', ka: 'შეიძლება დღეს ცოტა გვიან მოვიდეთ.', uk: 'Можливо, сьогодні ми прийдемо трохи пізніше.', ru: 'Возможно, сегодня мы придём немного позже.', zh: '我们今天可能会晚一点到。', es: 'Puede que hoy lleguemos un poco más tarde.', fr: 'Nous arriverons peut-être un peu plus tard aujourd’hui.', it: 'Forse oggi arriveremo un po’ più tardi.', ja: '今日は少し遅く着くかもしれません。',
      } },
      { id: 'plans.reminder', text: {
        de: 'Erinnere mich bitte morgen an das Buch.', en: 'Please remind me about the book tomorrow.', ka: 'გთხოვ, ხვალ წიგნის შესახებ შემახსენე.', uk: 'Нагадай мені, будь ласка, завтра про книжку.', ru: 'Напомни мне, пожалуйста, завтра про книгу.', zh: '请明天提醒我那本书的事。', es: 'Recuérdame lo del libro mañana, por favor.', fr: 'Rappelle-moi le livre demain, s’il te plaît.', it: 'Ricordami del libro domani, per favore.', ja: '明日、本のことを思い出させてください。',
      } },
      { id: 'plans.build', text: {
        de: 'Wir wollen ein kleines Spiel entwickeln.', en: 'We want to develop a small game.', ka: 'პატარა თამაშის შექმნა გვინდა.', uk: 'Ми хочемо розробити невелику гру.', ru: 'Мы хотим разработать небольшую игру.', zh: '我们想开发一个小游戏。', es: 'Queremos desarrollar un juego pequeño.', fr: 'Nous voulons créer un petit jeu.', it: 'Vogliamo sviluppare un piccolo gioco.', ja: '小さなゲームを作りたいです。',
      } },
      { id: 'plans.choose', text: {
        de: 'Wir haben noch nicht entschieden, wohin wir fahren.', en: 'We have not decided where to go yet.', ka: 'ჯერ არ გადაგვიწყვეტია, სად წავიდეთ.', uk: 'Ми ще не вирішили, куди поїдемо.', ru: 'Мы ещё не решили, куда поедем.', zh: '我们还没决定去哪里。', es: 'Todavía no hemos decidido adónde ir.', fr: 'Nous n’avons pas encore décidé où aller.', it: 'Non abbiamo ancora deciso dove andare.', ja: 'どこへ行くか、まだ決めていません。',
      } },
    ],
  },
  {
    id: 'opinions-reasons',
    title: { de: '12 · Meinungen und Erklärungen', en: '12 · Opinions and explanations', ru: '12 · Мнение и объяснение', uk: '12 · Думка й пояснення' },
    note: {
      de: 'Erweiterte Anfangspraxis: Äußere eine Meinung, begründe sie und frage respektvoll nach. „Weil“ nennt einen Grund, „deshalb“ eine Folge und „aber“ einen Gegensatz. Diese kurzen Muster sind ein Einstieg; sie ergeben noch kein fortgeschrittenes Sprachniveau.',
      en: 'Extended introductory practice: express an opinion, give a reason and ask respectfully. “Because” introduces a reason, “so” a result and “but” a contrast. These short patterns are a starting point; they do not amount to advanced language proficiency.',
      ru: 'Расширенная начальная практика: вырази мнение, объясни причину и уважительно уточни чужую мысль. «Потому что» вводит причину, «поэтому» — следствие, «но» — противопоставление. Эти короткие конструкции — начало практики, а не подтверждение продвинутого уровня.',
      uk: 'Розширена початкова практика: вислови думку, поясни причину та шанобливо уточни чужу думку. «Тому що» вводить причину, «тому» — наслідок, «але» — протиставлення. Ці короткі конструкції — початок практики, а не підтвердження просунутого рівня.',
    },
    items: [
      { id: 'opinion.useful', text: {
        de: 'Ich finde diese Idee nützlich.', en: 'I think this idea is useful.', ka: 'ვფიქრობ, ეს იდეა სასარგებლოა.', uk: 'Я вважаю цю ідею корисною.', ru: 'Я считаю эту идею полезной.', zh: '我觉得这个想法很有用。', es: 'Creo que esta idea es útil.', fr: 'Je trouve cette idée utile.', it: 'Penso che questa idea sia utile.', ja: 'このアイデアは役に立つと思います。',
      } },
      { id: 'opinion.reason', text: {
        de: 'Ich lerne gern Sprachen, weil ich Menschen verstehen möchte.', en: 'I like learning languages because I want to understand people.', ka: 'ენების სწავლა მიყვარს, რადგან ადამიანების გაგება მინდა.', uk: 'Я люблю вивчати мови, тому що хочу розуміти людей.', ru: 'Я люблю изучать языки, потому что хочу понимать людей.', zh: '我喜欢学语言，因为我想理解别人。', es: 'Me gusta aprender idiomas porque quiero entender a las personas.', fr: 'J’aime apprendre les langues parce que je veux comprendre les gens.', it: 'Mi piace imparare le lingue perché voglio capire le persone.', ja: '人の話を理解したいので、言語を学ぶのが好きです。',
      } },
      { id: 'opinion.agree', text: {
        de: 'Wir sind uns in diesem Punkt einig.', en: 'We agree on this point.', ka: 'ამ საკითხში ვთანხმდებით.', uk: 'У цьому питанні ми погоджуємося.', ru: 'В этом вопросе мы согласны.', zh: '在这一点上，我们的意见一致。', es: 'Estamos de acuerdo en este punto.', fr: 'Nous sommes d’accord sur ce point.', it: 'Siamo d’accordo su questo punto.', ja: 'この点については意見が一致しています。',
      } },
      { id: 'opinion.other-view', text: {
        de: 'Ich verstehe deinen Gedanken, aber ich sehe es anders.', en: 'I understand your point, but I see it differently.', ka: 'შენი აზრი მესმის, მაგრამ ამას სხვანაირად ვხედავ.', uk: 'Я розумію твою думку, але бачу це інакше.', ru: 'Я понимаю твою мысль, но вижу это иначе.', zh: '我理解你的观点，但是我的看法不同。', es: 'Entiendo tu punto de vista, pero lo veo de otra manera.', fr: 'Je comprends ton point de vue, mais je vois les choses autrement.', it: 'Capisco il tuo punto di vista, ma la penso diversamente.', ja: '言いたいことは分かりますが、私は違う見方をしています。',
      } },
      { id: 'opinion.why', text: {
        de: 'Warum ist dir das wichtig?', en: 'Why is that important to you?', ka: 'რატომ არის ეს შენთვის მნიშვნელოვანი?', uk: 'Чому це важливо для тебе?', ru: 'Почему это важно для тебя?', zh: '这为什么对你很重要？', es: '¿Por qué es importante para ti?', fr: 'Pourquoi est-ce important pour toi ?', it: 'Perché è importante per te?', ja: 'なぜそれがあなたにとって大切なのですか。',
      } },
      { id: 'opinion.choice', text: {
        de: 'Diese Lösung ist einfacher als die andere.', en: 'This solution is simpler than the other one.', ka: 'ეს გამოსავალი მეორეზე მარტივია.', uk: 'Це рішення простіше за інше.', ru: 'Это решение проще другого.', zh: '这个解决办法比另一个更简单。', es: 'Esta solución es más sencilla que la otra.', fr: 'Cette solution est plus simple que l’autre.', it: 'Questa soluzione è più semplice dell’altra.', ja: 'この解決方法は、もう一つの方法より簡単です。',
      } },
      { id: 'opinion.result', text: {
        de: 'Der Weg ist kurz, deshalb können wir zu Fuß gehen.', en: 'The distance is short, so we can walk.', ka: 'გზა მოკლეა, ამიტომ შეგვიძლია ფეხით წავიდეთ.', uk: 'Шлях короткий, тому ми можемо піти пішки.', ru: 'Путь короткий, поэтому мы можем пойти пешком.', zh: '路不远，所以我们可以走过去。', es: 'El camino es corto, así que podemos ir a pie.', fr: 'Le trajet est court, donc nous pouvons y aller à pied.', it: 'Il tragitto è breve, quindi possiamo andare a piedi.', ja: '距離が短いので、歩いて行けます。',
      } },
      { id: 'opinion.example', text: {
        de: 'Kannst du erklären, was du damit meinst?', en: 'Can you explain what you mean by that?', ka: 'შეგიძლია ახსნა, რას გულისხმობ?', uk: 'Можеш пояснити, що ти маєш на увазі?', ru: 'Можешь объяснить, что ты имеешь в виду?', zh: '你能解释一下你的意思吗？', es: '¿Puedes explicar qué quieres decir con eso?', fr: 'Peux-tu expliquer ce que tu veux dire par là ?', it: 'Puoi spiegare che cosa intendi?', ja: 'どういう意味か説明してもらえますか。',
      } },
      { id: 'opinion.uncertain', text: {
        de: 'Ich weiß es noch nicht; ich brauche mehr Informationen.', en: 'I do not know yet; I need more information.', ka: 'ჯერ არ ვიცი; მეტი ინფორმაცია მჭირდება.', uk: 'Я ще не знаю; мені потрібно більше інформації.', ru: 'Я пока не знаю; мне нужно больше информации.', zh: '我还不知道，需要更多信息。', es: 'Todavía no lo sé; necesito más información.', fr: 'Je ne sais pas encore ; j’ai besoin de plus d’informations.', it: 'Non lo so ancora; ho bisogno di più informazioni.', ja: 'まだ分かりません。もっと情報が必要です。',
      } },
      { id: 'opinion.together', text: {
        de: 'Lass uns eine Lösung suchen, die für alle passt.', en: 'Let us look for a solution that works for everyone.', ka: 'მოდი, ისეთი გამოსავალი ვიპოვოთ, რომელიც ყველას მოერგება.', uk: 'Знайдімо рішення, яке підходить усім.', ru: 'Давай найдём решение, которое подходит всем.', zh: '我们一起找一个适合所有人的解决办法吧。', es: 'Busquemos una solución que funcione para todos.', fr: 'Cherchons une solution qui convienne à tout le monde.', it: 'Cerchiamo una soluzione che vada bene per tutti.', ja: 'みんなに合う解決方法を一緒に探しましょう。',
      } },
    ],
  },
];

// New original connected-sentence practice; all previous item IDs preserved.
LANGUAGE_UNITS.push(...[
  {
    "id": "problem-solving",
    "title": {
      "de": "13 · Probleme erklären",
      "en": "13 · Explaining problems",
      "ru": "13 · Объяснение проблем",
      "uk": "13 · Пояснення проблем"
    },
    "note": {
      "de": "Beschreibe ein Problem, seine Ursache und die nächsten Schritte. Vergleiche Zeitformen und Verknüpfungen in deiner Zielsprache. Dies ist Satztraining, keine Einstufung.",
      "en": "Describe a problem, its cause and the next steps. Compare tenses and linking expressions in your target language. This is sentence practice, not a placement test.",
      "ru": "Опиши проблему, её причину и следующие действия. Сравни времена и связующие выражения изучаемого языка. Это практика фраз, а не определение уровня.",
      "uk": "Опиши проблему, її причину й наступні дії. Порівняй часи та сполучні вирази мови, яку вивчаєш. Це практика фраз, а не визначення рівня."
    },
    "items": [
      {
        "id": "problem.delay",
        "text": {
          "de": "Der Zug hat Verspätung, deshalb komme ich später.",
          "en": "The train is delayed, so I will arrive later.",
          "ka": "მატარებელი აგვიანებს, ამიტომ მოგვიანებით მოვალ.",
          "uk": "Потяг запізнюється, тому я приїду пізніше.",
          "ru": "Поезд задерживается, поэтому я приеду позже.",
          "zh": "火车晚点了，所以我会晚一点到。",
          "es": "El tren lleva retraso, así que llegaré más tarde.",
          "fr": "Le train est en retard, donc j’arriverai plus tard.",
          "it": "Il treno è in ritardo, quindi arriverò più tardi.",
          "ja": "電車が遅れているので、到着が遅くなります。"
        }
      },
      {
        "id": "problem.describe",
        "text": {
          "de": "Kannst du genauer erklären, was passiert ist?",
          "en": "Can you explain exactly what happened?",
          "ka": "შეგიძლია უფრო ზუსტად ახსნა, რა მოხდა?",
          "uk": "Можеш точніше пояснити, що сталося?",
          "ru": "Можешь точнее объяснить, что произошло?",
          "zh": "你能更详细地解释发生了什么吗？",
          "es": "¿Puedes explicar con más detalle lo que pasó?",
          "fr": "Peux-tu expliquer plus précisément ce qui s’est passé ?",
          "it": "Puoi spiegare più precisamente che cosa è successo?",
          "ja": "何が起きたのか、もう少し詳しく説明できますか。"
        }
      },
      {
        "id": "problem.internet",
        "text": {
          "de": "Die Internetverbindung funktioniert seit gestern nicht.",
          "en": "The internet connection has not worked since yesterday.",
          "ka": "ინტერნეტკავშირი გუშინდელი დღიდან არ მუშაობს.",
          "uk": "Інтернет-з’єднання не працює з учорашнього дня.",
          "ru": "Интернет-соединение не работает со вчерашнего дня.",
          "zh": "网络连接从昨天起就不能用了。",
          "es": "La conexión a internet no funciona desde ayer.",
          "fr": "La connexion Internet ne fonctionne plus depuis hier.",
          "it": "La connessione a Internet non funziona da ieri.",
          "ja": "昨日からインターネット接続が使えません。"
        }
      },
      {
        "id": "problem.tried",
        "text": {
          "de": "Ich habe das Gerät neu gestartet, aber das Problem bleibt.",
          "en": "I restarted the device, but the problem remains.",
          "ka": "მოწყობილობა გადავტვირთე, მაგრამ პრობლემა ისევ არსებობს.",
          "uk": "Я перезапустив пристрій, але проблема залишилася.",
          "ru": "Я перезапустил устройство, но проблема осталась.",
          "zh": "我重启了设备，但问题仍然存在。",
          "es": "Reinicié el dispositivo, pero el problema persiste.",
          "fr": "J’ai redémarré l’appareil, mais le problème persiste.",
          "it": "Ho riavviato il dispositivo, ma il problema rimane.",
          "ja": "機器を再起動しましたが、問題は解決していません。"
        }
      },
      {
        "id": "problem.instructions",
        "text": {
          "de": "Bevor wir anfangen, lesen wir die Anleitung.",
          "en": "Before we begin, we will read the instructions.",
          "ka": "სანამ დავიწყებთ, ინსტრუქციას წავიკითხავთ.",
          "uk": "Перш ніж почати, прочитаємо інструкцію.",
          "ru": "Прежде чем начать, мы прочитаем инструкцию.",
          "zh": "开始之前，我们先阅读说明。",
          "es": "Antes de empezar, leeremos las instrucciones.",
          "fr": "Avant de commencer, nous lirons les instructions.",
          "it": "Prima di iniziare, leggeremo le istruzioni.",
          "ja": "始める前に、説明書を読みましょう。"
        }
      },
      {
        "id": "problem.missing",
        "text": {
          "de": "Uns fehlt eine wichtige Information.",
          "en": "We are missing an important piece of information.",
          "ka": "ერთი მნიშვნელოვანი ინფორმაცია გვაკლია.",
          "uk": "Нам бракує важливої інформації.",
          "ru": "Нам не хватает важной информации.",
          "zh": "我们还缺少一条重要信息。",
          "es": "Nos falta una información importante.",
          "fr": "Il nous manque une information importante.",
          "it": "Ci manca un’informazione importante.",
          "ja": "重要な情報が一つ不足しています。"
        }
      },
      {
        "id": "problem.alternative",
        "text": {
          "de": "Falls das nicht funktioniert, versuchen wir eine andere Lösung.",
          "en": "If that does not work, we will try another solution.",
          "ka": "თუ ეს არ იმუშავებს, სხვა გამოსავალს ვცდით.",
          "uk": "Якщо це не спрацює, спробуємо інше рішення.",
          "ru": "Если это не сработает, попробуем другое решение.",
          "zh": "如果这个办法不行，我们就试试另一种解决方案。",
          "es": "Si eso no funciona, probaremos otra solución.",
          "fr": "Si cela ne fonctionne pas, nous essaierons une autre solution.",
          "it": "Se non funziona, proveremo un’altra soluzione.",
          "ja": "それがうまくいかなければ、別の解決策を試します。"
        }
      },
      {
        "id": "problem.confirm",
        "text": {
          "de": "Bitte bestätige, dass du die Nachricht erhalten hast.",
          "en": "Please confirm that you received the message.",
          "ka": "გთხოვ, დაადასტურე, რომ შეტყობინება მიიღე.",
          "uk": "Будь ласка, підтвердь, що отримав повідомлення.",
          "ru": "Пожалуйста, подтверди, что получил сообщение.",
          "zh": "请确认你已收到消息。",
          "es": "Por favor, confirma que has recibido el mensaje.",
          "fr": "Merci de confirmer que tu as reçu le message.",
          "it": "Per favore, conferma di aver ricevuto il messaggio.",
          "ja": "メッセージを受け取ったことを確認してください。"
        }
      }
    ]
  },
  {
    "id": "compare-decide",
    "title": {
      "de": "14 · Vergleichen und entscheiden",
      "en": "14 · Comparing and deciding",
      "ru": "14 · Сравнение и выбор",
      "uk": "14 · Порівняння й вибір"
    },
    "note": {
      "de": "Vergleiche Möglichkeiten, begründe deine Wahl und unterscheide Fakten von Meinungen. Übe Begründungen und Bedingungen als ganze Sätze.",
      "en": "Compare options, justify a choice and distinguish facts from opinions. Practise reasons and conditions as whole sentences.",
      "ru": "Сравни варианты, обоснуй выбор и различай факты и мнения. Тренируй причинные и условные конструкции целыми предложениями.",
      "uk": "Порівняй варіанти, обґрунтуй вибір і розрізняй факти та думки. Тренуй причинні й умовні конструкції цілими реченнями."
    },
    "items": [
      {
        "id": "compare.cost",
        "text": {
          "de": "Die erste Möglichkeit ist günstiger, aber sie dauert länger.",
          "en": "The first option is cheaper, but it takes longer.",
          "ka": "პირველი ვარიანტი უფრო იაფია, მაგრამ მეტ დროს მოითხოვს.",
          "uk": "Перший варіант дешевший, але потребує більше часу.",
          "ru": "Первый вариант дешевле, но занимает больше времени.",
          "zh": "第一种方案更便宜，但需要更长时间。",
          "es": "La primera opción es más barata, pero tarda más.",
          "fr": "La première option coûte moins cher, mais prend plus de temps.",
          "it": "La prima opzione costa meno, ma richiede più tempo.",
          "ja": "最初の選択肢は安いですが、時間がかかります。"
        }
      },
      {
        "id": "compare.priority",
        "text": {
          "de": "Für mich ist die Qualität wichtiger als der Preis.",
          "en": "Quality is more important to me than price.",
          "ka": "ჩემთვის ხარისხი ფასზე მნიშვნელოვანია.",
          "uk": "Для мене якість важливіша за ціну.",
          "ru": "Для меня качество важнее цены.",
          "zh": "对我来说，质量比价格更重要。",
          "es": "Para mí, la calidad es más importante que el precio.",
          "fr": "Pour moi, la qualité est plus importante que le prix.",
          "it": "Per me la qualità è più importante del prezzo.",
          "ja": "私にとって、価格より品質のほうが重要です。"
        }
      },
      {
        "id": "compare.evidence",
        "text": {
          "de": "Welche Belege stützen diese Behauptung?",
          "en": "What evidence supports this claim?",
          "ka": "რა მტკიცებულებები ამყარებს ამ მტკიცებას?",
          "uk": "Які докази підтверджують це твердження?",
          "ru": "Какие доказательства подтверждают это утверждение?",
          "zh": "有什么证据支持这一说法？",
          "es": "¿Qué pruebas respaldan esta afirmación?",
          "fr": "Quelles preuves étayent cette affirmation ?",
          "it": "Quali prove sostengono questa affermazione?",
          "ja": "この主張を裏付ける証拠は何ですか。"
        }
      },
      {
        "id": "compare.unsure",
        "text": {
          "de": "Ich bin nicht sicher, ob diese Zahlen stimmen.",
          "en": "I am not sure whether these numbers are correct.",
          "ka": "არ ვარ დარწმუნებული, რომ ეს რიცხვები სწორია.",
          "uk": "Я не впевнений, чи ці числа правильні.",
          "ru": "Я не уверен, верны ли эти числа.",
          "zh": "我不确定这些数字是否正确。",
          "es": "No estoy seguro de que estas cifras sean correctas.",
          "fr": "Je ne suis pas sûr que ces chiffres soient exacts.",
          "it": "Non sono sicuro che questi numeri siano corretti.",
          "ja": "これらの数字が正しいかどうか分かりません。"
        }
      },
      {
        "id": "compare.question",
        "text": {
          "de": "Was würde sich ändern, wenn wir weniger Zeit hätten?",
          "en": "What would change if we had less time?",
          "ka": "რა შეიცვლებოდა, ნაკლები დრო რომ გვქონდეს?",
          "uk": "Що змінилося б, якби в нас було менше часу?",
          "ru": "Что изменилось бы, если бы у нас было меньше времени?",
          "zh": "如果我们的时间更少，会有什么变化？",
          "es": "¿Qué cambiaría si tuviéramos menos tiempo?",
          "fr": "Qu’est-ce qui changerait si nous avions moins de temps ?",
          "it": "Che cosa cambierebbe se avessimo meno tempo?",
          "ja": "もし時間が少なかったら、何が変わるでしょうか。"
        }
      },
      {
        "id": "compare.agree",
        "text": {
          "de": "Ich stimme dir teilweise zu, sehe aber ein Risiko.",
          "en": "I partly agree with you, but I see a risk.",
          "ka": "ნაწილობრივ გეთანხმები, მაგრამ ერთ რისკს ვხედავ.",
          "uk": "Я частково з тобою погоджуюся, але бачу ризик.",
          "ru": "Я частично с тобой согласен, но вижу риск.",
          "zh": "我部分同意你的看法，但我看到了一个风险。",
          "es": "Estoy parcialmente de acuerdo contigo, pero veo un riesgo.",
          "fr": "Je suis en partie d’accord avec toi, mais je vois un risque.",
          "it": "Sono in parte d’accordo con te, ma vedo un rischio.",
          "ja": "一部は同意しますが、リスクもあると思います。"
        }
      },
      {
        "id": "compare.summary",
        "text": {
          "de": "Fassen wir zuerst die wichtigsten Punkte zusammen.",
          "en": "Let us summarize the most important points first.",
          "ka": "ჯერ ყველაზე მნიშვნელოვანი საკითხები შევაჯამოთ.",
          "uk": "Спочатку підсумуймо найважливіші пункти.",
          "ru": "Сначала подведём итог по самым важным пунктам.",
          "zh": "我们先总结最重要的几点。",
          "es": "Resumamos primero los puntos más importantes.",
          "fr": "Résumons d’abord les points les plus importants.",
          "it": "Riassumiamo prima i punti più importanti.",
          "ja": "まず最も重要な点をまとめましょう。"
        }
      },
      {
        "id": "compare.decision",
        "text": {
          "de": "Wir entscheiden erst, nachdem wir beide Möglichkeiten geprüft haben.",
          "en": "We will decide only after checking both options.",
          "ka": "გადაწყვეტილებას მხოლოდ ორივე ვარიანტის შემოწმების შემდეგ მივიღებთ.",
          "uk": "Ми ухвалимо рішення лише після перевірки обох варіантів.",
          "ru": "Мы примем решение только после проверки обоих вариантов.",
          "zh": "我们核实两种方案后再作决定。",
          "es": "Decidiremos solo después de comprobar ambas opciones.",
          "fr": "Nous déciderons seulement après avoir examiné les deux possibilités.",
          "it": "Decideremo solo dopo aver verificato entrambe le opzioni.",
          "ja": "両方の選択肢を確認してから決めます。"
        }
      }
    ]
  }
]);

// Additional original multilingual professional and evidence-oriented practice.
LANGUAGE_UNITS.push(...[
  {
    "id": "professional-communication",
    "title": {
      "de": "15 · Berufliche Kommunikation",
      "en": "15 · Professional communication",
      "ru": "15 · Профессиональное общение",
      "uk": "15 · Професійне спілкування"
    },
    "note": {
      "de": "Übe höfliche Fragen, Terminabsprachen und klare Aussagen über deine Arbeit. Achte auf die passende Anrede.",
      "en": "Practise polite questions, scheduling and clear statements about your work. Notice appropriate forms of address.",
      "ru": "Тренируй вежливые вопросы, согласование встреч и ясные высказывания о своей работе. Обращай внимание на форму обращения.",
      "uk": "Тренуй ввічливі запитання, узгодження зустрічей та чіткі висловлювання про свою роботу. Звертай увагу на форму звертання."
    },
    "items": [
      {
        "id": "professional-communication.experience",
        "text": {
          "de": "Ich habe Erfahrung mit der Entwicklung von Webseiten.",
          "en": "I have experience developing websites.",
          "ka": "ვებსაიტების შექმნის გამოცდილება მაქვს.",
          "uk": "Я маю досвід розробки вебсайтів.",
          "ru": "У меня есть опыт разработки сайтов.",
          "zh": "我有开发网站的经验。",
          "es": "Tengo experiencia desarrollando sitios web.",
          "fr": "J’ai de l’expérience dans la création de sites web.",
          "it": "Ho esperienza nello sviluppo di siti web.",
          "ja": "ウェブサイト開発の経験があります。"
        }
      },
      {
        "id": "professional-communication.responsibilities",
        "text": {
          "de": "Welche Aufgaben gehören zu dieser Stelle?",
          "en": "What responsibilities does this position involve?",
          "ka": "რა მოვალეობებს მოიცავს ეს პოზიცია?",
          "uk": "Які обов’язки передбачає ця посада?",
          "ru": "Какие обязанности предусматривает эта должность?",
          "zh": "这个职位有哪些职责？",
          "es": "¿Qué responsabilidades implica este puesto?",
          "fr": "Quelles sont les responsabilités liées à ce poste ?",
          "it": "Quali responsabilità comporta questa posizione?",
          "ja": "この職種にはどのような業務がありますか。"
        }
      },
      {
        "id": "professional-communication.meeting",
        "text": {
          "de": "Könnten wir einen Termin für nächste Woche vereinbaren?",
          "en": "Could we arrange a meeting for next week?",
          "ka": "შეგვიძლია შეხვედრა მომავალი კვირისთვის დავნიშნოთ?",
          "uk": "Чи могли б ми домовитися про зустріч наступного тижня?",
          "ru": "Можем ли мы договориться о встрече на следующей неделе?",
          "zh": "我们可以约在下周见面吗？",
          "es": "¿Podríamos concertar una reunión para la próxima semana?",
          "fr": "Pourrions-nous convenir d’un rendez-vous pour la semaine prochaine ?",
          "it": "Potremmo fissare un incontro per la prossima settimana?",
          "ja": "来週の打ち合わせを設定できますか。"
        }
      },
      {
        "id": "professional-communication.portfolio",
        "text": {
          "de": "Ich kann Ihnen Beispiele meiner Arbeit zeigen.",
          "en": "I can show you examples of my work.",
          "ka": "შემიძლია ჩემი ნამუშევრების მაგალითები გაჩვენოთ.",
          "uk": "Я можу показати вам приклади моєї роботи.",
          "ru": "Я могу показать вам примеры своей работы.",
          "zh": "我可以给您看一些我的作品。",
          "es": "Puedo mostrarle ejemplos de mi trabajo.",
          "fr": "Je peux vous montrer des exemples de mon travail.",
          "it": "Posso mostrarle alcuni esempi del mio lavoro.",
          "ja": "これまでの仕事の例をお見せできます。"
        }
      },
      {
        "id": "professional-communication.deadline",
        "text": {
          "de": "Bis wann soll das Projekt fertig sein?",
          "en": "By when should the project be completed?",
          "ka": "როდისთვის უნდა დასრულდეს პროექტი?",
          "uk": "До якого терміну потрібно завершити проєкт?",
          "ru": "К какому сроку нужно закончить проект?",
          "zh": "这个项目需要在什么时候完成？",
          "es": "¿Para cuándo debe estar terminado el proyecto?",
          "fr": "Pour quand le projet doit-il être terminé ?",
          "it": "Entro quando deve essere completato il progetto?",
          "ja": "プロジェクトはいつまでに完成させる必要がありますか。"
        }
      },
      {
        "id": "professional-communication.clarify",
        "text": {
          "de": "Könnten Sie die Anforderungen genauer erklären?",
          "en": "Could you explain the requirements in more detail?",
          "ka": "შეგიძლიათ მოთხოვნები უფრო დეტალურად განმარტოთ?",
          "uk": "Чи могли б ви детальніше пояснити вимоги?",
          "ru": "Не могли бы вы объяснить требования подробнее?",
          "zh": "您能更详细地解释一下要求吗？",
          "es": "¿Podría explicar los requisitos con más detalle?",
          "fr": "Pourriez-vous expliquer les exigences plus en détail ?",
          "it": "Potrebbe spiegare i requisiti più dettagliatamente?",
          "ja": "要件をもう少し詳しく説明していただけますか。"
        }
      },
      {
        "id": "professional-communication.feedback",
        "text": {
          "de": "Vielen Dank für Ihre Rückmeldung.",
          "en": "Thank you for your feedback.",
          "ka": "გმადლობთ გამოხმაურებისთვის.",
          "uk": "Дякую за ваш відгук.",
          "ru": "Спасибо за вашу обратную связь.",
          "zh": "感谢您的反馈。",
          "es": "Muchas gracias por sus comentarios.",
          "fr": "Merci beaucoup pour votre retour.",
          "it": "La ringrazio per il suo riscontro.",
          "ja": "ご意見をいただき、ありがとうございます。"
        }
      },
      {
        "id": "professional-communication.followup",
        "text": {
          "de": "Ich schicke Ihnen die Unterlagen morgen.",
          "en": "I will send you the documents tomorrow.",
          "ka": "ხვალ დოკუმენტებს გამოგიგზავნით.",
          "uk": "Я надішлю вам документи завтра.",
          "ru": "Я отправлю вам документы завтра.",
          "zh": "我明天会把文件发给您。",
          "es": "Le enviaré los documentos mañana.",
          "fr": "Je vous enverrai les documents demain.",
          "it": "Le invierò i documenti domani.",
          "ja": "明日、書類をお送りします。"
        }
      }
    ]
  },
  {
    "id": "evidence-arguments",
    "title": {
      "de": "16 · Argumente und Belege",
      "en": "16 · Arguments and evidence",
      "ru": "16 · Аргументы и доказательства",
      "uk": "16 · Аргументи та докази"
    },
    "note": {
      "de": "Unterscheide Beobachtung, Schlussfolgerung und Vermutung. Begründe Aussagen und benenne Unsicherheit.",
      "en": "Distinguish observations, conclusions and assumptions. Support statements and express uncertainty.",
      "ru": "Различай наблюдения, выводы и предположения. Обосновывай утверждения и обозначай неопределённость.",
      "uk": "Розрізняй спостереження, висновки та припущення. Обґрунтовуй твердження й позначай невизначеність."
    },
    "items": [
      {
        "id": "evidence-arguments.source",
        "text": {
          "de": "Woher stammen diese Informationen?",
          "en": "Where does this information come from?",
          "ka": "საიდან არის ეს ინფორმაცია?",
          "uk": "Звідки походить ця інформація?",
          "ru": "Откуда получена эта информация?",
          "zh": "这些信息来自哪里？",
          "es": "¿De dónde procede esta información?",
          "fr": "D’où viennent ces informations ?",
          "it": "Da dove provengono queste informazioni?",
          "ja": "この情報はどこから得られたものですか。"
        }
      },
      {
        "id": "evidence-arguments.evidence",
        "text": {
          "de": "Wir brauchen Belege für diese Behauptung.",
          "en": "We need evidence for this claim.",
          "ka": "ამ მტკიცებისთვის მტკიცებულებები გვჭირდება.",
          "uk": "Нам потрібні докази цього твердження.",
          "ru": "Нам нужны доказательства этого утверждения.",
          "zh": "我们需要证据来支持这一说法。",
          "es": "Necesitamos pruebas que respalden esta afirmación.",
          "fr": "Nous avons besoin de preuves à l’appui de cette affirmation.",
          "it": "Abbiamo bisogno di prove a sostegno di questa affermazione.",
          "ja": "この主張を裏付ける証拠が必要です。"
        }
      },
      {
        "id": "evidence-arguments.uncertainty",
        "text": {
          "de": "Das Ergebnis ist noch nicht eindeutig.",
          "en": "The result is not yet conclusive.",
          "ka": "შედეგი ჯერ ერთმნიშვნელოვანი არ არის.",
          "uk": "Результат поки не є однозначним.",
          "ru": "Результат пока не однозначен.",
          "zh": "目前的结果还不明确。",
          "es": "El resultado todavía no es concluyente.",
          "fr": "Le résultat n’est pas encore concluant.",
          "it": "Il risultato non è ancora conclusivo.",
          "ja": "結果はまだ明確ではありません。"
        }
      },
      {
        "id": "evidence-arguments.alternative",
        "text": {
          "de": "Es könnte auch eine andere Erklärung geben.",
          "en": "There could also be another explanation.",
          "ka": "შესაძლოა სხვა ახსნაც არსებობდეს.",
          "uk": "Може бути й інше пояснення.",
          "ru": "Возможно, существует и другое объяснение.",
          "zh": "也可能有另一种解释。",
          "es": "También podría haber otra explicación.",
          "fr": "Il pourrait aussi y avoir une autre explication.",
          "it": "Potrebbe esserci anche un’altra spiegazione.",
          "ja": "別の説明もあり得ます。"
        }
      },
      {
        "id": "evidence-arguments.contrast",
        "text": {
          "de": "Die Ergebnisse widersprechen unserer ursprünglichen Annahme.",
          "en": "The results contradict our original assumption.",
          "ka": "შედეგები ჩვენს თავდაპირველ ვარაუდს ეწინააღმდეგება.",
          "uk": "Результати суперечать нашому початковому припущенню.",
          "ru": "Результаты противоречат нашему первоначальному предположению.",
          "zh": "结果与我们最初的假设相矛盾。",
          "es": "Los resultados contradicen nuestra hipótesis inicial.",
          "fr": "Les résultats contredisent notre hypothèse initiale.",
          "it": "I risultati contraddicono la nostra ipotesi iniziale.",
          "ja": "結果は当初の仮説と矛盾しています。"
        }
      },
      {
        "id": "evidence-arguments.limit",
        "text": {
          "de": "Aus einem einzigen Beispiel können wir keine allgemeine Regel ableiten.",
          "en": "We cannot infer a general rule from a single example.",
          "ka": "ერთი მაგალითიდან ზოგად წესს ვერ გამოვიტანთ.",
          "uk": "З одного прикладу не можна вивести загальне правило.",
          "ru": "Из одного примера нельзя вывести общее правило.",
          "zh": "我们不能从一个例子推导出普遍规律。",
          "es": "No podemos deducir una regla general a partir de un solo ejemplo.",
          "fr": "On ne peut pas déduire une règle générale d’un seul exemple.",
          "it": "Non possiamo dedurre una regola generale da un solo esempio.",
          "ja": "一つの例だけから一般的な規則を導くことはできません。"
        }
      },
      {
        "id": "evidence-arguments.test",
        "text": {
          "de": "Wie können wir diese Vermutung überprüfen?",
          "en": "How can we test this assumption?",
          "ka": "როგორ შეგვიძლია ამ ვარაუდის შემოწმება?",
          "uk": "Як ми можемо перевірити це припущення?",
          "ru": "Как мы можем проверить это предположение?",
          "zh": "我们怎样验证这个假设？",
          "es": "¿Cómo podemos comprobar esta hipótesis?",
          "fr": "Comment pouvons-nous vérifier cette hypothèse ?",
          "it": "Come possiamo verificare questa ipotesi?",
          "ja": "この仮説をどのように検証できますか。"
        }
      },
      {
        "id": "evidence-arguments.revise",
        "text": {
          "de": "Wenn neue Belege auftauchen, müssen wir unsere Schlussfolgerung überdenken.",
          "en": "If new evidence emerges, we must reconsider our conclusion.",
          "ka": "თუ ახალი მტკიცებულებები გამოჩნდება, ჩვენი დასკვნა უნდა გადავხედოთ.",
          "uk": "Якщо з’являться нові докази, ми маємо переглянути наш висновок.",
          "ru": "Если появятся новые доказательства, мы должны пересмотреть наш вывод.",
          "zh": "如果出现新的证据，我们就必须重新审视结论。",
          "es": "Si aparecen nuevas pruebas, debemos reconsiderar nuestra conclusión.",
          "fr": "Si de nouvelles preuves apparaissent, nous devons revoir notre conclusion.",
          "it": "Se emergono nuove prove, dobbiamo riconsiderare la nostra conclusione.",
          "ja": "新たな証拠が出てきたら、結論を見直す必要があります。"
        }
      }
    ]
  }
]);

// Original AI-assisted grammar material, not a certified CEFR curriculum.
export const GRAMMAR_LESSONS=[
  {
    "id": "de-present",
    "language": "de",
    "stage": 1,
    "title": {
      "de": "Präsens",
      "en": "Present tense",
      "ru": "Настоящее время",
      "uk": "Теперішній час"
    },
    "rule": {
      "de": "Regelmäßige Verben: ich -e, du -st, er -t, wir -en, ihr -t, sie -en.",
      "en": "Regular verbs: ich -e, du -st, er -t, wir -en, ihr -t, sie -en.",
      "ru": "Правильные глаголы: ich -e, du -st, er -t, wir -en, ihr -t, sie -en.",
      "uk": "Правильні дієслова: ich -e, du -st, er -t, wir -en, ihr -t, sie -en."
    },
    "example": "Ich lerne. Du lernst.",
    "practice": [
      {
        "sentence": "Du ___ Deutsch. (lernen)",
        "options": [
          "lernst",
          "lerne",
          "lernen"
        ],
        "answer": "lernst"
      },
      {
        "sentence": "Wir ___ in München. (wohnen)",
        "options": [
          "wohnen",
          "wohnt",
          "wohnst"
        ],
        "answer": "wohnen"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Er ___ Musik. (hören)",
        "options": [
          "hört",
          "höre",
          "hören"
        ],
        "answer": "hört"
      },
      {
        "sentence": "Ihr ___ Fußball. (spielen)",
        "options": [
          "spielt",
          "spielen",
          "spielst"
        ],
        "answer": "spielt"
      }
    ]
  },
  {
    "id": "de-sein",
    "language": "de",
    "stage": 1,
    "title": {
      "de": "Sein und haben",
      "en": "Sein and haben",
      "ru": "Sein и haben",
      "uk": "Sein і haben"
    },
    "rule": {
      "de": "Sein: bin, bist, ist, sind, seid, sind. Haben: habe, hast, hat, haben, habt, haben (ich bis sie).",
      "en": "Sein: bin, bist, ist, sind, seid, sind. Haben: habe, hast, hat, haben, habt, haben (ich through sie).",
      "ru": "Sein: bin, bist, ist, sind, seid, sind. Haben: habe, hast, hat, haben, habt, haben (от ich до sie).",
      "uk": "Sein: bin, bist, ist, sind, seid, sind. Haben: habe, hast, hat, haben, habt, haben (від ich до sie)."
    },
    "example": "Ich bin müde. Du hast Zeit.",
    "practice": [
      {
        "sentence": "Ich ___ zu Hause.",
        "options": [
          "bin",
          "bist",
          "ist"
        ],
        "answer": "bin"
      },
      {
        "sentence": "Du ___ ein Buch.",
        "options": [
          "hast",
          "hat",
          "haben"
        ],
        "answer": "hast"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Ihr ___ bereit.",
        "options": [
          "seid",
          "sind",
          "ist"
        ],
        "answer": "seid"
      },
      {
        "sentence": "Sie (Plural) ___ zwei Fahrräder.",
        "options": [
          "haben",
          "hat",
          "habt"
        ],
        "answer": "haben"
      }
    ]
  },
  {
    "id": "de-articles",
    "language": "de",
    "stage": 1,
    "title": {
      "de": "Artikel",
      "en": "Articles",
      "ru": "Артикли",
      "uk": "Артиклі"
    },
    "rule": {
      "de": "Lerne das Genus mit dem Nomen: der Tisch, die Lampe, das Buch; Plural die Bücher.",
      "en": "Learn noun gender: der Tisch, die Lampe, das Buch; plural die Bücher.",
      "ru": "Запоминай род: der Tisch, die Lampe, das Buch; множественное die Bücher.",
      "uk": "Запам'ятовуй рід: der Tisch, die Lampe, das Buch; множина die Bücher."
    },
    "example": "Der Tisch ist neu.",
    "practice": [
      {
        "sentence": "___ Tisch ist groß.",
        "options": [
          "Der",
          "Die",
          "Das"
        ],
        "answer": "Der"
      },
      {
        "sentence": "___ Buch ist interessant.",
        "options": [
          "Das",
          "Der",
          "Die"
        ],
        "answer": "Das"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___ Lampe ist an.",
        "options": [
          "Die",
          "Der",
          "Das"
        ],
        "answer": "Die"
      },
      {
        "sentence": "___ Bücher liegen hier.",
        "options": [
          "Die",
          "Der",
          "Das"
        ],
        "answer": "Die"
      }
    ]
  },
  {
    "id": "de-accusative",
    "language": "de",
    "stage": 2,
    "title": {
      "de": "Akkusativ",
      "en": "Accusative",
      "ru": "Винительный падеж",
      "uk": "Знахідний відмінок"
    },
    "rule": {
      "de": "Beim direkten Objekt: der → den, ein → einen; die/das bleiben gleich.",
      "en": "Direct object: der → den, ein → einen; die/das unchanged.",
      "ru": "Прямое дополнение: der → den, ein → einen; die/das без изменений.",
      "uk": "Прямий додаток: der → den, ein → einen; die/das без змін."
    },
    "example": "Ich sehe den Hund.",
    "practice": [
      {
        "sentence": "Ich sehe ___ Hund. (der)",
        "options": [
          "den",
          "der",
          "dem"
        ],
        "answer": "den"
      },
      {
        "sentence": "Sie kauft ___ Apfel. (ein)",
        "options": [
          "einen",
          "ein",
          "einem"
        ],
        "answer": "einen"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Wir lesen ___ Buch. (das)",
        "options": [
          "das",
          "dem",
          "den"
        ],
        "answer": "das"
      },
      {
        "sentence": "Er öffnet ___ Tür. (die)",
        "options": [
          "die",
          "der",
          "den"
        ],
        "answer": "die"
      }
    ]
  },
  {
    "id": "de-dative",
    "language": "de",
    "stage": 2,
    "title": {
      "de": "Dativ mit mit",
      "en": "Dative with mit",
      "ru": "Дательный после mit",
      "uk": "Давальний після mit"
    },
    "rule": {
      "de": "Mit verlangt Dativ: dem (m/n), der (f), den (Plural).",
      "en": "Mit requires dative: dem (m/n), der (f), den (plural).",
      "ru": "После mit — дательный: dem (м/ср), der (ж), den (мн).",
      "uk": "Після mit — давальний: dem (ч/с), der (ж), den (мн)."
    },
    "example": "Mit dem Bus, mit der Bahn.",
    "practice": [
      {
        "sentence": "Ich fahre mit ___ Bus. (der)",
        "options": [
          "dem",
          "den",
          "der"
        ],
        "answer": "dem"
      },
      {
        "sentence": "Er spricht mit ___ Lehrerin. (die)",
        "options": [
          "der",
          "die",
          "dem"
        ],
        "answer": "der"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Sie spielt mit ___ Kind. (das)",
        "options": [
          "dem",
          "das",
          "den"
        ],
        "answer": "dem"
      },
      {
        "sentence": "Wir reisen mit ___ Freunden. (Plural)",
        "options": [
          "den",
          "die",
          "dem"
        ],
        "answer": "den"
      }
    ]
  },
  {
    "id": "de-modal",
    "language": "de",
    "stage": 2,
    "title": {
      "de": "Modalverben",
      "en": "Modal verbs",
      "ru": "Модальные глаголы",
      "uk": "Модальні дієслова"
    },
    "rule": {
      "de": "Konjugiertes Modalverb und Infinitiv ohne zu: können, müssen, wollen.",
      "en": "Finite modal and bare infinitive: können, müssen, wollen.",
      "ru": "Модальный глагол и инфинитив без zu: können, müssen, wollen.",
      "uk": "Модальне дієслово та інфінітив без zu: können, müssen, wollen."
    },
    "example": "Ich kann heute kommen.",
    "practice": [
      {
        "sentence": "Ich muss morgen ___.",
        "options": [
          "arbeiten",
          "arbeite",
          "zu arbeiten"
        ],
        "answer": "arbeiten"
      },
      {
        "sentence": "Du kannst gut ___.",
        "options": [
          "schwimmen",
          "schwimmst",
          "zu schwimmen"
        ],
        "answer": "schwimmen"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Wir wollen zusammen ___.",
        "options": [
          "lernen",
          "lernen zu",
          "lernt"
        ],
        "answer": "lernen"
      },
      {
        "sentence": "Sie (Singular) ___ heute gehen.",
        "options": [
          "muss",
          "müssen",
          "musst"
        ],
        "answer": "muss"
      }
    ]
  },
  {
    "id": "de-perfect",
    "language": "de",
    "stage": 3,
    "title": {
      "de": "Perfekt",
      "en": "Perfect tense",
      "ru": "Perfekt",
      "uk": "Perfekt"
    },
    "rule": {
      "de": "Viele Verben: haben + Partizip. Gehen/kommen bei Bewegung: sein + Partizip.",
      "en": "Many verbs: haben + participle. Motion gehen/kommen: sein + participle.",
      "ru": "Многие глаголы: haben + причастие. Gehen/kommen при движении: sein + причастие.",
      "uk": "Багато дієслів: haben + дієприкметник. Gehen/kommen при русі: sein + дієприкметник."
    },
    "example": "Ich habe gelernt. Ich bin gegangen.",
    "practice": [
      {
        "sentence": "Ich ___ gestern gearbeitet.",
        "options": [
          "habe",
          "bin",
          "hat"
        ],
        "answer": "habe"
      },
      {
        "sentence": "Er ___ nach Hause gegangen.",
        "options": [
          "ist",
          "hat",
          "bist"
        ],
        "answer": "ist"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Wir ___ Musik gehört.",
        "options": [
          "haben",
          "sind",
          "hat"
        ],
        "answer": "haben"
      },
      {
        "sentence": "Sie (Plural) ___ angekommen.",
        "options": [
          "sind",
          "haben",
          "seid"
        ],
        "answer": "sind"
      }
    ]
  },
  {
    "id": "de-weil",
    "language": "de",
    "stage": 3,
    "title": {
      "de": "Nebensatz mit weil",
      "en": "Weil clauses",
      "ru": "Придаточное с weil",
      "uk": "Підрядне з weil"
    },
    "rule": {
      "de": "Im schriftlichen Standarddeutsch steht das finite Verb im weil-Satz am Ende.",
      "en": "In standard written German the finite verb ends a weil clause.",
      "ru": "В письменном немецком спрягаемый глагол с weil стоит в конце.",
      "uk": "У письмовій німецькій відмінюване дієслово з weil стоїть у кінці."
    },
    "example": "Ich bleibe zu Hause, weil ich krank bin.",
    "practice": [
      {
        "sentence": "Ich lerne, weil ich die Prüfung ___.",
        "options": [
          "bestehen möchte",
          "möchte bestehen",
          "möchte ich bestehen"
        ],
        "answer": "bestehen möchte"
      },
      {
        "sentence": "Er kommt später, weil er noch ___.",
        "options": [
          "arbeitet",
          "arbeitet er",
          "er arbeitet"
        ],
        "answer": "arbeitet"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Wir bleiben drinnen, weil es ___.",
        "options": [
          "regnet",
          "regnen",
          "es regnet"
        ],
        "answer": "regnet"
      },
      {
        "sentence": "Sie nimmt den Bus, weil sie kein Auto ___.",
        "options": [
          "hat",
          "haben",
          "hat sie"
        ],
        "answer": "hat"
      }
    ]
  },
  {
    "id": "en-be",
    "language": "en",
    "stage": 1,
    "title": {
      "de": "To be",
      "en": "To be",
      "ru": "Глагол to be",
      "uk": "Дієслово to be"
    },
    "rule": {
      "de": "I am, you/we/they are, he/she/it is. In Fragen vor das Subjekt stellen.",
      "en": "I am, you/we/they are, he/she/it is. In questions invert with the subject.",
      "ru": "I am, you/we/they are, he/she/it is. В вопросе перед подлежащим.",
      "uk": "I am, you/we/they are, he/she/it is. У питанні перед підметом."
    },
    "example": "She is ready. Are you ready?",
    "practice": [
      {
        "sentence": "I ___ a student.",
        "options": [
          "am",
          "is",
          "are"
        ],
        "answer": "am"
      },
      {
        "sentence": "They ___ at home.",
        "options": [
          "are",
          "is",
          "am"
        ],
        "answer": "are"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___ he your friend?",
        "options": [
          "Is",
          "Are",
          "Am"
        ],
        "answer": "Is"
      },
      {
        "sentence": "We ___ ready.",
        "options": [
          "are",
          "am",
          "is"
        ],
        "answer": "are"
      }
    ]
  },
  {
    "id": "en-present",
    "language": "en",
    "stage": 1,
    "title": {
      "de": "Simple Present",
      "en": "Simple present",
      "ru": "Простое настоящее",
      "uk": "Простий теперішній"
    },
    "rule": {
      "de": "Gewohnheiten: Grundform; he/she/it meist -s. Nach does Grundform.",
      "en": "Habits: base form; he/she/it usually -s. After does use base form.",
      "ru": "Привычки: начальная форма; he/she/it обычно -s. После does начальная форма.",
      "uk": "Звички: початкова форма; he/she/it зазвичай -s. Після does початкова форма."
    },
    "example": "She reads every day.",
    "practice": [
      {
        "sentence": "He ___ books every day. (read)",
        "options": [
          "reads",
          "read",
          "reading"
        ],
        "answer": "reads"
      },
      {
        "sentence": "We ___ football on Mondays. (play)",
        "options": [
          "play",
          "plays",
          "playing"
        ],
        "answer": "play"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Does she ___ here? (live)",
        "options": [
          "live",
          "lives",
          "living"
        ],
        "answer": "live"
      },
      {
        "sentence": "Tom doesn't ___ coffee. (drink)",
        "options": [
          "drink",
          "drinks",
          "drinking"
        ],
        "answer": "drink"
      }
    ]
  },
  {
    "id": "en-progressive",
    "language": "en",
    "stage": 2,
    "title": {
      "de": "Present Continuous",
      "en": "Present continuous",
      "ru": "Настоящее длительное",
      "uk": "Теперішній тривалий"
    },
    "rule": {
      "de": "Gerade stattfindende Handlung: am/is/are + Verb-ing.",
      "en": "Action happening now: am/is/are + verb-ing.",
      "ru": "Действие сейчас: am/is/are + глагол-ing.",
      "uk": "Дія зараз: am/is/are + дієслово-ing."
    },
    "example": "They are playing now.",
    "practice": [
      {
        "sentence": "Look! She ___ a picture.",
        "options": [
          "is drawing",
          "draw",
          "are drawing"
        ],
        "answer": "is drawing"
      },
      {
        "sentence": "I ___ dinner right now.",
        "options": [
          "am cooking",
          "is cooking",
          "cook"
        ],
        "answer": "am cooking"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Listen! The children ___.",
        "options": [
          "are singing",
          "is singing",
          "sings"
        ],
        "answer": "are singing"
      },
      {
        "sentence": "He is ___ a book now.",
        "options": [
          "reading",
          "read",
          "reads"
        ],
        "answer": "reading"
      }
    ]
  },
  {
    "id": "en-past",
    "language": "en",
    "stage": 2,
    "title": {
      "de": "Simple Past",
      "en": "Simple past",
      "ru": "Простое прошедшее",
      "uk": "Простий минулий"
    },
    "rule": {
      "de": "Abgeschlossene Vergangenheit: meist -ed oder unregelmäßige Form; nach did Grundform.",
      "en": "Finished past: usually -ed or irregular form; after did use base form.",
      "ru": "Завершённое прошлое: обычно -ed или неправильная форма; после did начальная форма.",
      "uk": "Завершене минуле: зазвичай -ed або неправильна форма; після did початкова форма."
    },
    "example": "I visited my friend. She went home.",
    "practice": [
      {
        "sentence": "Yesterday we ___ the museum. (visit)",
        "options": [
          "visited",
          "visit",
          "visits"
        ],
        "answer": "visited"
      },
      {
        "sentence": "Last night he ___ home. (go)",
        "options": [
          "went",
          "go",
          "goed"
        ],
        "answer": "went"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Did you ___ the film? (watch)",
        "options": [
          "watch",
          "watched",
          "watches"
        ],
        "answer": "watch"
      },
      {
        "sentence": "I didn't ___ the bus. (take)",
        "options": [
          "take",
          "took",
          "takes"
        ],
        "answer": "take"
      }
    ]
  },
  {
    "id": "en-comparative",
    "language": "en",
    "stage": 2,
    "title": {
      "de": "Vergleiche",
      "en": "Comparatives",
      "ru": "Сравнения",
      "uk": "Порівняння"
    },
    "rule": {
      "de": "Kurze Adjektive oft -er, längere oft more. Good → better. Vergleich mit than.",
      "en": "Short adjectives often -er, longer ones often more. Good → better. Compare with than.",
      "ru": "Короткие прилагательные часто -er, длинные — more. Good → better. Сравнение с than.",
      "uk": "Короткі прикметники часто -er, довгі — more. Good → better. Порівняння з than."
    },
    "example": "This book is cheaper than that one.",
    "practice": [
      {
        "sentence": "A mouse is ___ than an elephant. (small)",
        "options": [
          "smaller",
          "smallest",
          "more small"
        ],
        "answer": "smaller"
      },
      {
        "sentence": "This task is ___ than that one. (difficult)",
        "options": [
          "more difficult",
          "difficultest",
          "most difficult"
        ],
        "answer": "more difficult"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Her result is ___ than mine. (good)",
        "options": [
          "better",
          "gooder",
          "best"
        ],
        "answer": "better"
      },
      {
        "sentence": "Today is ___ than yesterday. (cold)",
        "options": [
          "colder",
          "coldest",
          "more colder"
        ],
        "answer": "colder"
      }
    ]
  },
  {
    "id": "en-perfect",
    "language": "en",
    "stage": 3,
    "title": {
      "de": "Present Perfect",
      "en": "Present perfect",
      "ru": "Present Perfect",
      "uk": "Present Perfect"
    },
    "rule": {
      "de": "Have/has + Partizip, etwa bei Erfahrung ohne abgeschlossene Zeitangabe. Mit last year meist Simple Past.",
      "en": "Have/has + participle, e.g. experience without a finished time. With last year normally simple past.",
      "ru": "Have/has + третья форма, например опыт без завершённого времени. С last year обычно Simple Past.",
      "uk": "Have/has + третя форма, наприклад досвід без завершеного часу. З last year зазвичай Simple Past."
    },
    "example": "I have never visited London.",
    "practice": [
      {
        "sentence": "She ___ never been to London.",
        "options": [
          "has",
          "have",
          "is"
        ],
        "answer": "has"
      },
      {
        "sentence": "We have already ___ our homework. (finish)",
        "options": [
          "finished",
          "finish",
          "finishing"
        ],
        "answer": "finished"
      }
    ],
    "checkpoint": [
      {
        "sentence": "I ___ Rome last year. (visit)",
        "options": [
          "visited",
          "have visited",
          "visit"
        ],
        "answer": "visited"
      },
      {
        "sentence": "He has ___ his keys. (lose)",
        "options": [
          "lost",
          "lose",
          "losing"
        ],
        "answer": "lost"
      }
    ]
  },
  {
    "id": "en-conditional",
    "language": "en",
    "stage": 3,
    "title": {
      "de": "First Conditional",
      "en": "First conditional",
      "ru": "Первый тип условных",
      "uk": "Перший тип умовних"
    },
    "rule": {
      "de": "Mögliche Zukunft: if + Simple Present, Hauptsatz will + Grundform.",
      "en": "Possible future: if + simple present, main clause will + base form.",
      "ru": "Возможное будущее: if + Simple Present, главное will + начальная форма.",
      "uk": "Можливе майбутнє: if + Simple Present, головне will + початкова форма."
    },
    "example": "If it rains, we will stay home.",
    "practice": [
      {
        "sentence": "If it ___, we will stay inside. (rain)",
        "options": [
          "rains",
          "will rain",
          "raining"
        ],
        "answer": "rains"
      },
      {
        "sentence": "If you study, you ___ pass.",
        "options": [
          "will",
          "are",
          "did"
        ],
        "answer": "will"
      }
    ],
    "checkpoint": [
      {
        "sentence": "If she ___ early, we will meet. (arrive)",
        "options": [
          "arrives",
          "will arrive",
          "arriving"
        ],
        "answer": "arrives"
      },
      {
        "sentence": "If we miss the bus, we will ___. (walk)",
        "options": [
          "walk",
          "walked",
          "walking"
        ],
        "answer": "walk"
      }
    ]
  },
  {
    "id": "en-passive",
    "language": "en",
    "stage": 3,
    "title": {
      "de": "Passiv",
      "en": "Passive voice",
      "ru": "Пассивный залог",
      "uk": "Пасивний стан"
    },
    "rule": {
      "de": "Passiv: passende Form von be + Partizip. Be trägt die Zeitform.",
      "en": "Passive: appropriate be + past participle. Be carries tense.",
      "ru": "Пассив: форма be + третья форма. Be выражает время.",
      "uk": "Пасив: форма be + третя форма. Be виражає час."
    },
    "example": "The room is cleaned daily.",
    "practice": [
      {
        "sentence": "The letters ___ delivered every day.",
        "options": [
          "are",
          "is",
          "were"
        ],
        "answer": "are"
      },
      {
        "sentence": "The bridge was ___ in 1990. (build)",
        "options": [
          "built",
          "build",
          "building"
        ],
        "answer": "built"
      }
    ],
    "checkpoint": [
      {
        "sentence": "These windows ___ cleaned yesterday.",
        "options": [
          "were",
          "was",
          "are"
        ],
        "answer": "were"
      },
      {
        "sentence": "English is ___ in many countries. (speak)",
        "options": [
          "spoken",
          "speaking",
          "speak"
        ],
        "answer": "spoken"
      }
    ]
  }
];

// Second grammar expansion: preserve every existing lesson ID.
GRAMMAR_LESSONS.push(...[
  {
    "id": "de-pronouns",
    "language": "de",
    "stage": 1,
    "title": {
      "de": "Personalpronomen",
      "en": "Personal pronouns",
      "ru": "Личные местоимения",
      "uk": "Особові займенники"
    },
    "rule": {
      "de": "Er ersetzt ein maskulines Nomen, sie ein feminines, es ein neutrales. Im Plural steht sie.",
      "en": "Er replaces a masculine noun, sie a feminine one, es a neuter one. Plural: sie.",
      "ru": "Er заменяет существительное мужского рода, sie женского, es среднего. Во множественном sie.",
      "uk": "Er замінює іменник чоловічого роду, sie жіночого, es середнього. У множині sie."
    },
    "example": "Der Stuhl ist alt. Er ist alt.",
    "practice": [
      {
        "sentence": "Die Tasche ist neu. ___ ist neu.",
        "options": [
          "Sie",
          "Er",
          "Es"
        ],
        "answer": "Sie"
      },
      {
        "sentence": "Das Fenster ist offen. ___ ist offen.",
        "options": [
          "Es",
          "Er",
          "Sie"
        ],
        "answer": "Es"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Der Hund schläft. ___ schläft.",
        "options": [
          "Er",
          "Es",
          "Sie"
        ],
        "answer": "Er"
      },
      {
        "sentence": "Die Kinder spielen. ___ spielen.",
        "options": [
          "Sie",
          "Er",
          "Es"
        ],
        "answer": "Sie"
      }
    ]
  },
  {
    "id": "de-negation",
    "language": "de",
    "stage": 1,
    "title": {
      "de": "Nicht und kein",
      "en": "Nicht and kein",
      "ru": "Отрицания nicht и kein",
      "uk": "Заперечення nicht і kein"
    },
    "rule": {
      "de": "Kein verneint Nomen mit unbestimmtem oder ohne Artikel; nicht verneint z. B. Adjektive.",
      "en": "Kein negates nouns with an indefinite or no article; nicht negates, for example, adjectives.",
      "ru": "Kein отрицает существительные с неопределённым артиклем или без него; nicht — например, прилагательные.",
      "uk": "Kein заперечує іменники з неозначеним артиклем або без нього; nicht — наприклад, прикметники."
    },
    "example": "Das ist kein Hund. Das ist nicht teuer.",
    "practice": [
      {
        "sentence": "Das ist ___ Auto.",
        "options": [
          "kein",
          "nicht",
          "keine"
        ],
        "answer": "kein"
      },
      {
        "sentence": "Der Kaffee ist ___ heiß.",
        "options": [
          "nicht",
          "kein",
          "keine"
        ],
        "answer": "nicht"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Ich habe ___ Zeit.",
        "options": [
          "keine",
          "kein",
          "nicht"
        ],
        "answer": "keine"
      },
      {
        "sentence": "Das Wetter ist ___ schön.",
        "options": [
          "nicht",
          "keine",
          "kein"
        ],
        "answer": "nicht"
      }
    ]
  },
  {
    "id": "de-v2",
    "language": "de",
    "stage": 1,
    "title": {
      "de": "Verb an Position zwei",
      "en": "Verb-second order",
      "ru": "Глагол на втором месте",
      "uk": "Дієслово на другому місці"
    },
    "rule": {
      "de": "Im Aussagesatz steht das finite Verb an zweiter Satzgliedposition, auch nach einer Zeitangabe.",
      "en": "In statements the finite verb is the second constituent, including after a time expression.",
      "ru": "В повествовательном предложении спрягаемый глагол занимает вторую позицию, в том числе после обстоятельства времени.",
      "uk": "У розповідному реченні відмінюване дієслово займає другу позицію, зокрема після обставини часу."
    },
    "example": "Heute gehe ich zur Schule.",
    "practice": [
      {
        "sentence": "Morgen ___ zur Arbeit. (ich / fahren)",
        "options": [
          "fahre ich",
          "ich fahre",
          "fahren ich"
        ],
        "answer": "fahre ich"
      },
      {
        "sentence": "Am Abend ___ Musik. (wir / hören)",
        "options": [
          "hören wir",
          "wir hören",
          "hört wir"
        ],
        "answer": "hören wir"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Jetzt ___ ein Buch. (er / lesen)",
        "options": [
          "liest er",
          "er liest",
          "lesen er"
        ],
        "answer": "liest er"
      },
      {
        "sentence": "Im Sommer ___ oft. (sie, Plural / schwimmen)",
        "options": [
          "schwimmen sie",
          "sie schwimmen",
          "schwimmt sie"
        ],
        "answer": "schwimmen sie"
      }
    ]
  },
  {
    "id": "de-separable",
    "language": "de",
    "stage": 2,
    "title": {
      "de": "Trennbare Verben",
      "en": "Separable verbs",
      "ru": "Отделяемые приставки",
      "uk": "Відокремлювані префікси"
    },
    "rule": {
      "de": "Im Hauptsatz steht die betonte trennbare Vorsilbe oft am Ende: aufstehen → stehe ... auf.",
      "en": "In main clauses the stressed separable prefix often comes last: aufstehen → stehe ... auf.",
      "ru": "В главном предложении отделяемая приставка часто в конце: aufstehen → stehe ... auf.",
      "uk": "У головному реченні відокремлюваний префікс часто в кінці: aufstehen → stehe ... auf."
    },
    "example": "Ich stehe um sieben Uhr auf.",
    "practice": [
      {
        "sentence": "Ich ___ dich später ___. (anrufen)",
        "options": [
          "rufe ... an",
          "anrufe ... an",
          "rufe ... auf"
        ],
        "answer": "rufe ... an"
      },
      {
        "sentence": "Wir ___ heute ___. (einkaufen)",
        "options": [
          "kaufen ... ein",
          "einkaufen ... ein",
          "kaufen ... aus"
        ],
        "answer": "kaufen ... ein"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Der Zug ___ um acht Uhr ___. (abfahren)",
        "options": [
          "fährt ... ab",
          "abfährt ... ab",
          "fährt ... an"
        ],
        "answer": "fährt ... ab"
      },
      {
        "sentence": "Du ___ das Licht ___. (ausmachen)",
        "options": [
          "machst ... aus",
          "ausmachst ... aus",
          "machst ... ein"
        ],
        "answer": "machst ... aus"
      }
    ]
  },
  {
    "id": "de-possessive",
    "language": "de",
    "stage": 2,
    "title": {
      "de": "Possessivartikel",
      "en": "Possessive determiners",
      "ru": "Притяжательные артикли",
      "uk": "Присвійні артиклі"
    },
    "rule": {
      "de": "Mein/dein/sein/ihr/unser/euer richten sich nach dem Besitzer; die Endung nach Genus, Numerus und Kasus des Nomens.",
      "en": "Mein/dein/sein/ihr/unser/euer depend on the possessor; endings depend on noun gender, number and case.",
      "ru": "Mein/dein/sein/ihr/unser/euer зависят от владельца, окончания — от рода, числа и падежа существительного.",
      "uk": "Mein/dein/sein/ihr/unser/euer залежать від власника, закінчення — від роду, числа й відмінка іменника."
    },
    "example": "Ich habe einen Bruder. Das ist mein Bruder.",
    "practice": [
      {
        "sentence": "Ich habe eine Schwester. Das ist ___ Schwester.",
        "options": [
          "meine",
          "mein",
          "meinen"
        ],
        "answer": "meine"
      },
      {
        "sentence": "Du hast ein Fahrrad. Das ist ___ Fahrrad.",
        "options": [
          "dein",
          "deine",
          "deinen"
        ],
        "answer": "dein"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Wir haben einen Hund. Das ist ___ Hund.",
        "options": [
          "unser",
          "unsere",
          "unseren"
        ],
        "answer": "unser"
      },
      {
        "sentence": "Er hat zwei Bücher. Das sind ___ Bücher.",
        "options": [
          "seine",
          "sein",
          "seinen"
        ],
        "answer": "seine"
      }
    ]
  },
  {
    "id": "de-two-way",
    "language": "de",
    "stage": 2,
    "title": {
      "de": "Wechselpräpositionen",
      "en": "Two-way prepositions",
      "ru": "Предлоги места и направления",
      "uk": "Прийменники місця й напрямку"
    },
    "rule": {
      "de": "Bei in, auf usw. steht Dativ für den Ort (wo?), Akkusativ für das Ziel einer Ortsveränderung (wohin?).",
      "en": "With in, auf, etc., dative marks location (where?), accusative destination (where to?).",
      "ru": "С in, auf и др. дательный обозначает место (где?), винительный — направление к цели (куда?).",
      "uk": "З in, auf та ін. давальний позначає місце (де?), знахідний — напрямок до цілі (куди?)."
    },
    "example": "Das Buch liegt auf dem Tisch. Ich lege es auf den Tisch.",
    "practice": [
      {
        "sentence": "Das Bild hängt an ___ Wand. (die)",
        "options": [
          "der",
          "die",
          "den"
        ],
        "answer": "der"
      },
      {
        "sentence": "Ich hänge das Bild an ___ Wand. (die)",
        "options": [
          "die",
          "der",
          "dem"
        ],
        "answer": "die"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Die Katze sitzt auf ___ Sofa. (das)",
        "options": [
          "dem",
          "das",
          "den"
        ],
        "answer": "dem"
      },
      {
        "sentence": "Die Katze springt auf ___ Sofa. (das, Ziel)",
        "options": [
          "das",
          "dem",
          "den"
        ],
        "answer": "das"
      }
    ]
  },
  {
    "id": "de-prateritum",
    "language": "de",
    "stage": 3,
    "title": {
      "de": "Präteritum von sein und haben",
      "en": "Past of sein and haben",
      "ru": "Präteritum sein и haben",
      "uk": "Präteritum sein і haben"
    },
    "rule": {
      "de": "Sein: ich/er war, du warst, wir/sie waren, ihr wart. Haben: hatte, hattest, hatte, hatten, hattet, hatten.",
      "en": "Sein: ich/er war, du warst, wir/sie waren, ihr wart. Haben: hatte, hattest, hatte, hatten, hattet, hatten.",
      "ru": "Sein: ich/er war, du warst, wir/sie waren, ihr wart. Haben: hatte, hattest, hatte, hatten, hattet, hatten.",
      "uk": "Sein: ich/er war, du warst, wir/sie waren, ihr wart. Haben: hatte, hattest, hatte, hatten, hattet, hatten."
    },
    "example": "Gestern war ich krank. Wir hatten Zeit.",
    "practice": [
      {
        "sentence": "Gestern ___ du müde. (sein)",
        "options": [
          "warst",
          "war",
          "waren"
        ],
        "answer": "warst"
      },
      {
        "sentence": "Wir ___ gestern frei. (haben)",
        "options": [
          "hatten",
          "hatte",
          "hattet"
        ],
        "answer": "hatten"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Er ___ damals Lehrer. (sein)",
        "options": [
          "war",
          "waren",
          "wart"
        ],
        "answer": "war"
      },
      {
        "sentence": "Ihr ___ viel Glück. (haben)",
        "options": [
          "hattet",
          "hatten",
          "hatte"
        ],
        "answer": "hattet"
      }
    ]
  },
  {
    "id": "de-relative",
    "language": "de",
    "stage": 3,
    "title": {
      "de": "Relativsätze",
      "en": "Relative clauses",
      "ru": "Относительные предложения",
      "uk": "Відносні речення"
    },
    "rule": {
      "de": "Das Relativpronomen richtet sich im Genus/Numerus nach dem Bezugswort, im Kasus nach seiner Funktion im Relativsatz.",
      "en": "Relative pronouns match the antecedent in gender/number; case depends on their role in the relative clause.",
      "ru": "Относительное местоимение согласуется с определяемым словом по роду и числу, падеж зависит от роли в придаточном.",
      "uk": "Відносний займенник узгоджується за родом і числом, відмінок залежить від ролі у підрядному."
    },
    "example": "Der Mann, der dort steht, ist mein Nachbar.",
    "practice": [
      {
        "sentence": "Das ist der Mann, ___ dort arbeitet.",
        "options": [
          "der",
          "den",
          "dem"
        ],
        "answer": "der"
      },
      {
        "sentence": "Das ist die Frau, ___ hier wohnt.",
        "options": [
          "die",
          "der",
          "den"
        ],
        "answer": "die"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Das ist der Film, ___ ich gesehen habe.",
        "options": [
          "den",
          "der",
          "dem"
        ],
        "answer": "den"
      },
      {
        "sentence": "Das sind die Bücher, ___ ich gekauft habe.",
        "options": [
          "die",
          "der",
          "den"
        ],
        "answer": "die"
      }
    ]
  },
  {
    "id": "de-adjective",
    "language": "de",
    "stage": 4,
    "title": {
      "de": "Adjektive nach bestimmtem Artikel",
      "en": "Adjectives after definite articles",
      "ru": "Прилагательные после определённого артикля",
      "uk": "Прикметники після означеного артикля"
    },
    "rule": {
      "de": "Nach der/die/das steht im Nominativ Singular -e; im Akkusativ Maskulinum -en; im Dativ -en.",
      "en": "After der/die/das use -e in nominative singular, -en in masculine accusative and dative.",
      "ru": "После der/die/das в именительном ед. числа -e; в винительном мужского рода и дательном -en.",
      "uk": "Після der/die/das у називному однини -e; у знахідному чоловічого роду й давальному -en."
    },
    "example": "Der kleine Hund. Ich sehe den kleinen Hund.",
    "practice": [
      {
        "sentence": "Der ___ Tisch ist neu. (alt)",
        "options": [
          "alte",
          "alten",
          "altes"
        ],
        "answer": "alte"
      },
      {
        "sentence": "Ich sehe den ___ Hund. (klein)",
        "options": [
          "kleinen",
          "kleine",
          "kleiner"
        ],
        "answer": "kleinen"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Die ___ Tasche ist schön. (rot)",
        "options": [
          "rote",
          "roten",
          "roter"
        ],
        "answer": "rote"
      },
      {
        "sentence": "Mit dem ___ Bus. (neu)",
        "options": [
          "neuen",
          "neue",
          "neuer"
        ],
        "answer": "neuen"
      }
    ]
  },
  {
    "id": "de-passive",
    "language": "de",
    "stage": 4,
    "title": {
      "de": "Vorgangspassiv",
      "en": "Process passive",
      "ru": "Пассив действия",
      "uk": "Пасив дії"
    },
    "rule": {
      "de": "Vorgangspassiv: werden + Partizip II. Werden trägt die Zeitform, z. B. wird/wurde.",
      "en": "Process passive: werden + past participle. Werden carries tense, e.g. wird/wurde.",
      "ru": "Пассив действия: werden + Partizip II. Werden выражает время, например wird/wurde.",
      "uk": "Пасив дії: werden + Partizip II. Werden виражає час, наприклад wird/wurde."
    },
    "example": "Die Tür wird geöffnet. Die Tür wurde geöffnet.",
    "practice": [
      {
        "sentence": "Die Briefe ___ gerade geschrieben. (Präsens)",
        "options": [
          "werden",
          "wird",
          "wurden"
        ],
        "answer": "werden"
      },
      {
        "sentence": "Das Haus ___ 1990 gebaut. (Präteritum)",
        "options": [
          "wurde",
          "wird",
          "wurden"
        ],
        "answer": "wurde"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Der Computer wird ___. (reparieren)",
        "options": [
          "repariert",
          "reparieren",
          "reparierte"
        ],
        "answer": "repariert"
      },
      {
        "sentence": "Die Fenster ___ gestern geputzt. (Präteritum)",
        "options": [
          "wurden",
          "wurde",
          "werden"
        ],
        "answer": "wurden"
      }
    ]
  },
  {
    "id": "de-konjunktiv2",
    "language": "de",
    "stage": 5,
    "title": {
      "de": "Konjunktiv II: Wünsche und Irreales",
      "en": "Subjunctive II: wishes and unreal situations",
      "ru": "Konjunktiv II: желания и нереальное",
      "uk": "Konjunktiv II: бажання й нереальне"
    },
    "rule": {
      "de": "Für hypothetische Situationen: wäre, hätte, könnte oder würde + Infinitiv.",
      "en": "For hypothetical situations: wäre, hätte, könnte or würde + infinitive.",
      "ru": "Для гипотетических ситуаций: wäre, hätte, könnte или würde + инфинитив.",
      "uk": "Для гіпотетичних ситуацій: wäre, hätte, könnte або würde + інфінітив."
    },
    "example": "Wenn ich Zeit hätte, würde ich reisen.",
    "practice": [
      {
        "sentence": "Wenn ich reich ___, würde ich reisen. (sein)",
        "options": [
          "wäre",
          "war",
          "bin"
        ],
        "answer": "wäre"
      },
      {
        "sentence": "Wenn du mehr Zeit ___, könntest du lesen. (haben)",
        "options": [
          "hättest",
          "hast",
          "hatte"
        ],
        "answer": "hättest"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Ich ___ gern mitkommen, wenn ich frei wäre. (können)",
        "options": [
          "könnte",
          "kannst",
          "konnte"
        ],
        "answer": "könnte"
      },
      {
        "sentence": "Wenn es möglich wäre, ___ wir bleiben. (würde)",
        "options": [
          "würden",
          "werden",
          "würde"
        ],
        "answer": "würden"
      }
    ]
  },
  {
    "id": "de-indirect",
    "language": "de",
    "stage": 5,
    "title": {
      "de": "Indirekte Rede: Konjunktiv I",
      "en": "Reported speech: subjunctive I",
      "ru": "Косвенная речь: Konjunktiv I",
      "uk": "Непряма мова: Konjunktiv I"
    },
    "rule": {
      "de": "In formeller indirekter Rede kann Konjunktiv I Distanz zur Aussage zeigen. Bei er/sie: sei, habe, komme, gehe.",
      "en": "In formal reported speech, subjunctive I can signal attribution. With er/sie: sei, habe, komme, gehe.",
      "ru": "В формальной косвенной речи Konjunktiv I передаёт чужое высказывание: er/sie sei, habe, komme, gehe.",
      "uk": "У формальній непрямій мові Konjunktiv I передає чуже висловлювання: er/sie sei, habe, komme, gehe."
    },
    "example": "Er sagt, er sei müde.",
    "practice": [
      {
        "sentence": "Sie sagt, sie ___ krank. (sein, Konjunktiv I)",
        "options": [
          "sei",
          "ist",
          "war"
        ],
        "answer": "sei"
      },
      {
        "sentence": "Er erklärt, er ___ keine Zeit. (haben, Konjunktiv I)",
        "options": [
          "habe",
          "hat",
          "hatte"
        ],
        "answer": "habe"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Sie sagt, sie ___ morgen. (kommen, Konjunktiv I)",
        "options": [
          "komme",
          "kommt",
          "kam"
        ],
        "answer": "komme"
      },
      {
        "sentence": "Er berichtet, er ___ nach Hause. (gehen, Konjunktiv I)",
        "options": [
          "gehe",
          "geht",
          "ging"
        ],
        "answer": "gehe"
      }
    ]
  },
  {
    "id": "en-articles",
    "language": "en",
    "stage": 1,
    "title": {
      "de": "Artikel a, an, the",
      "en": "Articles a, an, the",
      "ru": "Артикли a, an, the",
      "uk": "Артиклі a, an, the"
    },
    "rule": {
      "de": "A/an bei einem nicht bestimmten zählbaren Nomen im Singular. An vor Vokallaut, a vor Konsonantenlaut.",
      "en": "A/an for a nonspecific singular count noun. An before a vowel sound, a before a consonant sound.",
      "ru": "A/an — неопределённое исчисляемое существительное в ед. числе. An перед гласным звуком, a перед согласным.",
      "uk": "A/an — неозначений злічуваний іменник в однині. An перед голосним звуком, a перед приголосним."
    },
    "example": "A book, an apple, an hour, a university.",
    "practice": [
      {
        "sentence": "I would like ___ apple. (any apple)",
        "options": [
          "an",
          "a",
          "the"
        ],
        "answer": "an"
      },
      {
        "sentence": "She has ___ dog. (a nonspecific dog)",
        "options": [
          "a",
          "an",
          "some"
        ],
        "answer": "a"
      }
    ],
    "checkpoint": [
      {
        "sentence": "We waited for ___ hour. (one hour)",
        "options": [
          "an",
          "a",
          "some"
        ],
        "answer": "an"
      },
      {
        "sentence": "He studies at ___ university. (nonspecific)",
        "options": [
          "a",
          "an",
          "some"
        ],
        "answer": "a"
      }
    ]
  },
  {
    "id": "en-pronouns",
    "language": "en",
    "stage": 1,
    "title": {
      "de": "Objektpronomen",
      "en": "Object pronouns",
      "ru": "Объектные местоимения",
      "uk": "Об'єктні займенники"
    },
    "rule": {
      "de": "Nach Verben und Präpositionen: me, you, him, her, it, us, them.",
      "en": "After verbs and prepositions: me, you, him, her, it, us, them.",
      "ru": "После глаголов и предлогов: me, you, him, her, it, us, them.",
      "uk": "Після дієслів і прийменників: me, you, him, her, it, us, them."
    },
    "example": "I know Anna. I know her.",
    "practice": [
      {
        "sentence": "I know Tom. I know ___.",
        "options": [
          "him",
          "he",
          "his"
        ],
        "answer": "him"
      },
      {
        "sentence": "She helps Anna. She helps ___.",
        "options": [
          "her",
          "she",
          "hers"
        ],
        "answer": "her"
      }
    ],
    "checkpoint": [
      {
        "sentence": "They see the children. They see ___.",
        "options": [
          "them",
          "they",
          "their"
        ],
        "answer": "them"
      },
      {
        "sentence": "Come with my sister and me. Come with ___.",
        "options": [
          "us",
          "we",
          "our"
        ],
        "answer": "us"
      }
    ]
  },
  {
    "id": "en-there",
    "language": "en",
    "stage": 1,
    "title": {
      "de": "There is / there are",
      "en": "There is / there are",
      "ru": "Конструкция there is / there are",
      "uk": "Конструкція there is / there are"
    },
    "rule": {
      "de": "There is + Singular, there are + Plural. Fragen: Is there...? Are there...?",
      "en": "There is + singular, there are + plural. Questions: Is there...? Are there...?",
      "ru": "There is + единственное, there are + множественное. Вопрос: Is there...? Are there...?",
      "uk": "There is + однина, there are + множина. Питання: Is there...? Are there...?"
    },
    "example": "There is a book. There are two chairs.",
    "practice": [
      {
        "sentence": "There ___ a cat in the garden.",
        "options": [
          "is",
          "are",
          "am"
        ],
        "answer": "is"
      },
      {
        "sentence": "There ___ three books on the table.",
        "options": [
          "are",
          "is",
          "am"
        ],
        "answer": "are"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___ there a bus stop nearby?",
        "options": [
          "Is",
          "Are",
          "Am"
        ],
        "answer": "Is"
      },
      {
        "sentence": "___ there any chairs in the room?",
        "options": [
          "Are",
          "Is",
          "Am"
        ],
        "answer": "Are"
      }
    ]
  },
  {
    "id": "en-quantifiers",
    "language": "en",
    "stage": 2,
    "title": {
      "de": "Much, many, a lot of",
      "en": "Much, many, a lot of",
      "ru": "Much, many, a lot of",
      "uk": "Much, many, a lot of"
    },
    "rule": {
      "de": "Many bei zählbaren Pluralnomen, much bei nicht zählbaren Nomen; a lot of bei beiden.",
      "en": "Many with plural count nouns, much with uncountable nouns; a lot of with both.",
      "ru": "Many с исчисляемыми во множественном, much с неисчисляемыми; a lot of с обоими.",
      "uk": "Many зі злічуваними у множині, much з незлічуваними; a lot of з обома."
    },
    "example": "How many books? How much water?",
    "practice": [
      {
        "sentence": "How ___ apples do you need?",
        "options": [
          "many",
          "much",
          "a lot"
        ],
        "answer": "many"
      },
      {
        "sentence": "How ___ water is left?",
        "options": [
          "much",
          "many",
          "a lot"
        ],
        "answer": "much"
      }
    ],
    "checkpoint": [
      {
        "sentence": "We don't have ___ time.",
        "options": [
          "much",
          "many",
          "a lot"
        ],
        "answer": "much"
      },
      {
        "sentence": "How ___ people came?",
        "options": [
          "many",
          "much",
          "a lot"
        ],
        "answer": "many"
      }
    ]
  },
  {
    "id": "en-future",
    "language": "en",
    "stage": 2,
    "title": {
      "de": "Will: spontane Entscheidungen",
      "en": "Will: spontaneous decisions",
      "ru": "Will: спонтанные решения",
      "uk": "Will: спонтанні рішення"
    },
    "rule": {
      "de": "Will + Grundform, z. B. für ein spontanes Angebot; nach will kein to und kein -s.",
      "en": "Will + base form, e.g. for a spontaneous offer; no to or -s after will.",
      "ru": "Will + начальная форма, например для спонтанного предложения помощи; без to и -s.",
      "uk": "Will + початкова форма, наприклад для спонтанної пропозиції допомоги; без to та -s."
    },
    "example": "The phone is ringing. I will answer it.",
    "practice": [
      {
        "sentence": "I will ___ the door. (open)",
        "options": [
          "open",
          "opens",
          "to open"
        ],
        "answer": "open"
      },
      {
        "sentence": "She will ___ you tomorrow. (call)",
        "options": [
          "call",
          "calls",
          "called"
        ],
        "answer": "call"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Will you ___ me? (help)",
        "options": [
          "help",
          "helps",
          "to help"
        ],
        "answer": "help"
      },
      {
        "sentence": "They won't ___ late. (arrive)",
        "options": [
          "arrive",
          "arrives",
          "arriving"
        ],
        "answer": "arrive"
      }
    ]
  },
  {
    "id": "en-modal",
    "language": "en",
    "stage": 2,
    "title": {
      "de": "Modalverben",
      "en": "Modal verbs",
      "ru": "Модальные глаголы",
      "uk": "Модальні дієслова"
    },
    "rule": {
      "de": "Can, must und should stehen vor der Grundform ohne to; kein -s in der 3. Person.",
      "en": "Can, must and should take the bare infinitive; no third-person -s.",
      "ru": "Can, must и should требуют начальной формы без to; нет окончания -s в третьем лице.",
      "uk": "Can, must і should вимагають початкової форми без to; немає -s у третій особі."
    },
    "example": "She can swim. You should rest.",
    "practice": [
      {
        "sentence": "He can ___ very fast. (run)",
        "options": [
          "run",
          "runs",
          "to run"
        ],
        "answer": "run"
      },
      {
        "sentence": "You must ___ here. (wait)",
        "options": [
          "wait",
          "waits",
          "to wait"
        ],
        "answer": "wait"
      }
    ],
    "checkpoint": [
      {
        "sentence": "She should ___ more water. (drink)",
        "options": [
          "drink",
          "drinks",
          "drinking"
        ],
        "answer": "drink"
      },
      {
        "sentence": "Can they ___ with us? (come)",
        "options": [
          "come",
          "comes",
          "to come"
        ],
        "answer": "come"
      }
    ]
  },
  {
    "id": "en-past-cont",
    "language": "en",
    "stage": 3,
    "title": {
      "de": "Past Continuous",
      "en": "Past continuous",
      "ru": "Прошедшее длительное",
      "uk": "Минулий тривалий"
    },
    "rule": {
      "de": "Was/were + Verb-ing für eine Handlung, die zu einem vergangenen Zeitpunkt im Gang war.",
      "en": "Was/were + verb-ing for an action in progress at a past time.",
      "ru": "Was/were + глагол-ing для действия, продолжавшегося в момент прошлого.",
      "uk": "Was/were + дієслово-ing для дії, що тривала в момент минулого."
    },
    "example": "I was reading when the phone rang.",
    "practice": [
      {
        "sentence": "At eight I ___ breakfast. (eat)",
        "options": [
          "was eating",
          "were eating",
          "was eat"
        ],
        "answer": "was eating"
      },
      {
        "sentence": "They ___ when I arrived. (sleep)",
        "options": [
          "were sleeping",
          "was sleeping",
          "were sleep"
        ],
        "answer": "were sleeping"
      }
    ],
    "checkpoint": [
      {
        "sentence": "She was ___ when I called. (work)",
        "options": [
          "working",
          "worked",
          "work"
        ],
        "answer": "working"
      },
      {
        "sentence": "We ___ when it began to rain. (walk)",
        "options": [
          "were walking",
          "was walking",
          "were walk"
        ],
        "answer": "were walking"
      }
    ]
  },
  {
    "id": "en-relative",
    "language": "en",
    "stage": 3,
    "title": {
      "de": "Relativsätze",
      "en": "Relative clauses",
      "ru": "Относительные предложения",
      "uk": "Відносні речення"
    },
    "rule": {
      "de": "Who bezieht sich auf Personen, which auf Dinge; that kann in bestimmenden Relativsätzen oft beide ersetzen.",
      "en": "Who refers to people, which to things; that can often replace both in defining relative clauses.",
      "ru": "Who относится к людям, which к вещам; that часто заменяет оба в определительных придаточных.",
      "uk": "Who стосується людей, which речей; that часто замінює обидва у означальних підрядних."
    },
    "example": "The person who called is my friend.",
    "practice": [
      {
        "sentence": "The teacher, ___ lives nearby, is here.",
        "options": [
          "who",
          "which",
          "what"
        ],
        "answer": "who"
      },
      {
        "sentence": "This phone, ___ is new, works well.",
        "options": [
          "which",
          "who",
          "what"
        ],
        "answer": "which"
      }
    ],
    "checkpoint": [
      {
        "sentence": "My sister, ___ is a doctor, lives in Berlin.",
        "options": [
          "who",
          "which",
          "what"
        ],
        "answer": "who"
      },
      {
        "sentence": "The book, ___ has ten chapters, is interesting.",
        "options": [
          "which",
          "who",
          "what"
        ],
        "answer": "which"
      }
    ]
  },
  {
    "id": "en-past-perfect",
    "language": "en",
    "stage": 4,
    "title": {
      "de": "Past Perfect",
      "en": "Past perfect",
      "ru": "Past Perfect",
      "uk": "Past Perfect"
    },
    "rule": {
      "de": "Had + past participle zeigt eine Handlung vor einem anderen vergangenen Zeitpunkt.",
      "en": "Had + past participle marks an action before another past point.",
      "ru": "Had + третья форма обозначает действие до другого момента прошлого.",
      "uk": "Had + третя форма позначає дію до іншого моменту минулого."
    },
    "example": "When we arrived, the film had started.",
    "practice": [
      {
        "sentence": "When I arrived, she had already ___. (leave)",
        "options": [
          "left",
          "leave",
          "leaving"
        ],
        "answer": "left"
      },
      {
        "sentence": "He had ___ before the lesson began. (finish)",
        "options": [
          "finished",
          "finish",
          "finishing"
        ],
        "answer": "finished"
      }
    ],
    "checkpoint": [
      {
        "sentence": "We had ___ the news before they called. (hear)",
        "options": [
          "heard",
          "hear",
          "hearing"
        ],
        "answer": "heard"
      },
      {
        "sentence": "They had ___ home before sunset. (go)",
        "options": [
          "gone",
          "went",
          "going"
        ],
        "answer": "gone"
      }
    ]
  },
  {
    "id": "en-second-conditional",
    "language": "en",
    "stage": 4,
    "title": {
      "de": "Second Conditional",
      "en": "Second conditional",
      "ru": "Второй тип условных",
      "uk": "Другий тип умовних"
    },
    "rule": {
      "de": "Hypothetische Gegenwart/Zukunft: if + Simple Past, would + Grundform.",
      "en": "Hypothetical present/future: if + simple past, would + base form.",
      "ru": "Гипотетическое настоящее/будущее: if + Simple Past, would + начальная форма.",
      "uk": "Гіпотетичне теперішнє/майбутнє: if + Simple Past, would + початкова форма."
    },
    "example": "If I had more time, I would travel.",
    "practice": [
      {
        "sentence": "If I ___ more money, I would buy a bike. (have)",
        "options": [
          "had",
          "have",
          "will have"
        ],
        "answer": "had"
      },
      {
        "sentence": "If she lived here, we would ___ often. (meet)",
        "options": [
          "meet",
          "met",
          "meeting"
        ],
        "answer": "meet"
      }
    ],
    "checkpoint": [
      {
        "sentence": "If we ___ the answer, we would tell you. (know)",
        "options": [
          "knew",
          "know",
          "will know"
        ],
        "answer": "knew"
      },
      {
        "sentence": "If he were free, he ___ join us.",
        "options": [
          "would",
          "will",
          "has"
        ],
        "answer": "would"
      }
    ]
  },
  {
    "id": "en-third-conditional",
    "language": "en",
    "stage": 5,
    "title": {
      "de": "Third Conditional",
      "en": "Third conditional",
      "ru": "Третий тип условных",
      "uk": "Третій тип умовних"
    },
    "rule": {
      "de": "Irreale Vergangenheit: if + had + Partizip, would have + Partizip.",
      "en": "Unreal past: if + had + past participle, would have + past participle.",
      "ru": "Нереальное прошлое: if + had + третья форма, would have + третья форма.",
      "uk": "Нереальне минуле: if + had + третя форма, would have + третя форма."
    },
    "example": "If I had left earlier, I would have caught the train.",
    "practice": [
      {
        "sentence": "If I had ___ harder, I would have passed. (study)",
        "options": [
          "studied",
          "study",
          "studying"
        ],
        "answer": "studied"
      },
      {
        "sentence": "If she had called, I would have ___. (answer)",
        "options": [
          "answered",
          "answer",
          "answering"
        ],
        "answer": "answered"
      }
    ],
    "checkpoint": [
      {
        "sentence": "If they had ___ the map, they would not have got lost. (read)",
        "options": [
          "read",
          "reading",
          "reads"
        ],
        "answer": "read"
      },
      {
        "sentence": "If we had left early, we ___ have arrived on time.",
        "options": [
          "would",
          "will",
          "had"
        ],
        "answer": "would"
      }
    ]
  },
  {
    "id": "en-inversion",
    "language": "en",
    "stage": 5,
    "title": {
      "de": "Inversion nach negativen Adverbien",
      "en": "Negative-adverb inversion",
      "ru": "Инверсия после отрицательных наречий",
      "uk": "Інверсія після заперечних прислівників"
    },
    "rule": {
      "de": "In formeller Betonung am Satzanfang, z. B. never oder rarely, steht das Hilfsverb vor dem Subjekt.",
      "en": "In formal emphasis with initial never or rarely, the auxiliary precedes the subject.",
      "ru": "При формальном усилении с never или rarely в начале вспомогательный глагол перед подлежащим.",
      "uk": "За формального підсилення з never або rarely на початку допоміжне дієслово перед підметом."
    },
    "example": "Never have I seen such a view.",
    "practice": [
      {
        "sentence": "Never ___ such a thing. (I / have / seen)",
        "options": [
          "have I seen",
          "I have seen",
          "I seen have"
        ],
        "answer": "have I seen"
      },
      {
        "sentence": "Rarely ___ such results. (we / do / see)",
        "options": [
          "do we see",
          "we do see",
          "we see do"
        ],
        "answer": "do we see"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Seldom ___ so happy. (she / is)",
        "options": [
          "is she",
          "she is",
          "she be"
        ],
        "answer": "is she"
      },
      {
        "sentence": "Never before ___ this method. (they / have / tried)",
        "options": [
          "have they tried",
          "they have tried",
          "they tried have"
        ],
        "answer": "have they tried"
      }
    ]
  }
]);

// First dedicated grammar routes for the other eight languages.
GRAMMAR_LESSONS.push(...[
  {
    "id": "ka-copula",
    "language": "ka",
    "stage": 1,
    "title": {
      "de": "Kopula",
      "en": "Copula",
      "ru": "Глагол-связка",
      "uk": "Дієслово-зв'язка"
    },
    "rule": {
      "de": "Ich bin: ვარ; du bist: ხარ; er/sie ist: არის; wir sind: ვართ; ihr seid: ხართ; sie sind: არიან.",
      "en": "I am: ვარ; you are: ხარ; he/she is: არის; we are: ვართ; you plural: ხართ; they are: არიან.",
      "ru": "Я есть: ვარ; ты: ხარ; он/она: არის; мы: ვართ; вы: ხართ; они: არიან.",
      "uk": "Я є: ვარ; ти: ხარ; він/вона: არის; ми: ვართ; ви: ხართ; вони: არიან."
    },
    "example": "მე სტუდენტი ვარ.",
    "practice": [
      {
        "sentence": "მე მასწავლებელი ___.",
        "options": [
          "ვარ",
          "ხარ",
          "არის"
        ],
        "answer": "ვარ"
      },
      {
        "sentence": "შენ სტუდენტი ___.",
        "options": [
          "ხარ",
          "ვარ",
          "ვართ"
        ],
        "answer": "ხარ"
      }
    ],
    "checkpoint": [
      {
        "sentence": "ჩვენ მეგობრები ___.",
        "options": [
          "ვართ",
          "ხართ",
          "არიან"
        ],
        "answer": "ვართ"
      },
      {
        "sentence": "ისინი სახლში ___.",
        "options": [
          "არიან",
          "არის",
          "ვარ"
        ],
        "answer": "არიან"
      }
    ]
  },
  {
    "id": "ka-plural",
    "language": "ka",
    "stage": 1,
    "title": {
      "de": "Plural -ები",
      "en": "Plural -ები",
      "ru": "Множественное -ები",
      "uk": "Множина -ები"
    },
    "rule": {
      "de": "Viele konsonantische Nomen verlieren nominatives -ი vor -ები: წიგნი → წიგნები.",
      "en": "Many consonant-stem nouns drop nominative -ი before -ები: წიგნი → წიგნები.",
      "ru": "Многие существительные с основой на согласный теряют -ი перед -ები: წიგნი → წიგნები.",
      "uk": "Багато іменників з основою на приголосний втрачають -ი перед -ები: წიგნი → წიგნები."
    },
    "example": "წიგნი → წიგნები",
    "practice": [
      {
        "sentence": "ძაღლი → ___ (Plural)",
        "options": [
          "ძაღლები",
          "ძაღლი",
          "ძაღლებს"
        ],
        "answer": "ძაღლები"
      },
      {
        "sentence": "სახლი → ___ (Plural)",
        "options": [
          "სახლები",
          "სახლი",
          "სახლებს"
        ],
        "answer": "სახლები"
      }
    ],
    "checkpoint": [
      {
        "sentence": "ბავშვი → ___ (Plural)",
        "options": [
          "ბავშვები",
          "ბავშვი",
          "ბავშვებს"
        ],
        "answer": "ბავშვები"
      },
      {
        "sentence": "მეგობარი → ___ (Plural)",
        "options": [
          "მეგობრები",
          "მეგობარი",
          "მეგობრებს"
        ],
        "answer": "მეგობრები"
      }
    ]
  },
  {
    "id": "ka-negation",
    "language": "ka",
    "stage": 2,
    "title": {
      "de": "Verneinung mit არ",
      "en": "Negation with არ",
      "ru": "Отрицание არ",
      "uk": "Заперечення არ"
    },
    "rule": {
      "de": "არ steht zur einfachen Verneinung vor dem Verb; ვერ bezeichnet häufig fehlende Möglichkeit.",
      "en": "არ precedes the verb for ordinary negation; ვერ often indicates inability.",
      "ru": "არ стоит перед глаголом при обычном отрицании; ვერ часто означает невозможность.",
      "uk": "არ стоїть перед дієсловом при звичайному запереченні; ვერ часто означає неможливість."
    },
    "example": "მე არ ვიცი.",
    "practice": [
      {
        "sentence": "მე ___ ვიცი. (not know)",
        "options": [
          "არ",
          "და",
          "თუ"
        ],
        "answer": "არ"
      },
      {
        "sentence": "ის ___ მოდის. (not coming)",
        "options": [
          "არ",
          "და",
          "თუ"
        ],
        "answer": "არ"
      }
    ],
    "checkpoint": [
      {
        "sentence": "ჩვენ ___ ვართ სახლში. (not at home)",
        "options": [
          "არ",
          "და",
          "თუ"
        ],
        "answer": "არ"
      },
      {
        "sentence": "შენ ___ ხარ მარტო. (not alone)",
        "options": [
          "არ",
          "და",
          "თუ"
        ],
        "answer": "არ"
      }
    ]
  },
  {
    "id": "ka-location",
    "language": "ka",
    "stage": 2,
    "title": {
      "de": "Ort mit -ში",
      "en": "Location with -ში",
      "ru": "Место с -ში",
      "uk": "Місце з -ში"
    },
    "rule": {
      "de": "-ში bezeichnet in vielen Ortsangaben das Innere eines Ortes: სახლი → სახლში, სკოლა → სკოლაში.",
      "en": "-ში marks inside a place: სახლი → სახლში, სკოლა → სკოლაში.",
      "ru": "-ში обозначает нахождение внутри места: სახლი → სახლში, სკოლა → სკოლაში.",
      "uk": "-ში позначає перебування всередині місця: სახლი → სახლში, სკოლა → სკოლაში."
    },
    "example": "ის სკოლაშია.",
    "practice": [
      {
        "sentence": "სახლი → ___ (in the house)",
        "options": [
          "სახლში",
          "სახლიდან",
          "სახლთან"
        ],
        "answer": "სახლში"
      },
      {
        "sentence": "სკოლა → ___ (in the school)",
        "options": [
          "სკოლაში",
          "სკოლიდან",
          "სკოლასთან"
        ],
        "answer": "სკოლაში"
      }
    ],
    "checkpoint": [
      {
        "sentence": "ქალაქი → ___ (in the city)",
        "options": [
          "ქალაქში",
          "ქალაქიდან",
          "ქალაქთან"
        ],
        "answer": "ქალაქში"
      },
      {
        "sentence": "ოთახი → ___ (in the room)",
        "options": [
          "ოთახში",
          "ოთახიდან",
          "ოთახთან"
        ],
        "answer": "ოთახში"
      }
    ]
  },
  {
    "id": "ka-genitive",
    "language": "ka",
    "stage": 3,
    "title": {
      "de": "Genitiv -ის",
      "en": "Genitive -ის",
      "ru": "Родительный -ის",
      "uk": "Родовий -ის"
    },
    "rule": {
      "de": "Bei vielen konsonantischen Nomen markiert -ის Zugehörigkeit: სახლი → სახლის.",
      "en": "For many consonant-stem nouns, -ის marks possession: სახლი → სახლის.",
      "ru": "У многих существительных на согласный -ის обозначает принадлежность: სახლი → სახლის.",
      "uk": "У багатьох іменників на приголосний -ის позначає належність: სახლი → სახლის."
    },
    "example": "სახლის კარი",
    "practice": [
      {
        "sentence": "წიგნი → ___ (of the book)",
        "options": [
          "წიგნის",
          "წიგნში",
          "წიგნიდან"
        ],
        "answer": "წიგნის"
      },
      {
        "sentence": "სახლი → ___ (of the house)",
        "options": [
          "სახლის",
          "სახლში",
          "სახლიდან"
        ],
        "answer": "სახლის"
      }
    ],
    "checkpoint": [
      {
        "sentence": "ქალაქი → ___ (of the city)",
        "options": [
          "ქალაქის",
          "ქალაქში",
          "ქალაქიდან"
        ],
        "answer": "ქალაქის"
      },
      {
        "sentence": "ოთახი → ___ (of the room)",
        "options": [
          "ოთახის",
          "ოთახში",
          "ოთახიდან"
        ],
        "answer": "ოთახის"
      }
    ]
  },
  {
    "id": "uk-gender",
    "language": "uk",
    "stage": 1,
    "title": {
      "de": "Genus",
      "en": "Gender",
      "ru": "Род",
      "uk": "Рід"
    },
    "rule": {
      "de": "Im Ukrainischen stimmen Adjektive in Genus und Numerus mit dem Nomen überein: новий, нова, нове.",
      "en": "Ukrainian adjectives agree in gender and number: новий, нова, нове.",
      "ru": "Прилагательные согласуются в роде и числе: новий, нова, нове.",
      "uk": "Прикметники узгоджуються в роді й числі: новий, нова, нове."
    },
    "example": "новий стіл, нова книга, нове вікно",
    "practice": [
      {
        "sentence": "___ стіл (new)",
        "options": [
          "новий",
          "нова",
          "нове"
        ],
        "answer": "новий"
      },
      {
        "sentence": "___ книга (new)",
        "options": [
          "нова",
          "новий",
          "нове"
        ],
        "answer": "нова"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___ вікно (new)",
        "options": [
          "нове",
          "новий",
          "нова"
        ],
        "answer": "нове"
      },
      {
        "sentence": "___ будинок (new)",
        "options": [
          "новий",
          "нова",
          "нове"
        ],
        "answer": "новий"
      }
    ]
  },
  {
    "id": "uk-vocative",
    "language": "uk",
    "stage": 1,
    "title": {
      "de": "Vokativ",
      "en": "Vocative",
      "ru": "Звательный падеж",
      "uk": "Кличний відмінок"
    },
    "rule": {
      "de": "Bei direkter Anrede wird der Vokativ verwendet: Олена → Олено, Петро → Петре.",
      "en": "Direct address uses the vocative: Олена → Олено, Петро → Петре.",
      "ru": "В прямом обращении используется звательный: Олена → Олено, Петро → Петре.",
      "uk": "У прямому звертанні вживається кличний: Олена → Олено, Петро → Петре."
    },
    "example": "Олено, добрий день!",
    "practice": [
      {
        "sentence": "___, привіт! (Олена)",
        "options": [
          "Олено",
          "Олену",
          "Олени"
        ],
        "answer": "Олено"
      },
      {
        "sentence": "___, добрий день! (Петро)",
        "options": [
          "Петре",
          "Петра",
          "Петру"
        ],
        "answer": "Петре"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___, дякую! (мама)",
        "options": [
          "Мамо",
          "Маму",
          "Мами"
        ],
        "answer": "Мамо"
      },
      {
        "sentence": "___, заходь! (брат)",
        "options": [
          "Брате",
          "Брата",
          "Братом"
        ],
        "answer": "Брате"
      }
    ]
  },
  {
    "id": "uk-present",
    "language": "uk",
    "stage": 2,
    "title": {
      "de": "Präsens",
      "en": "Present",
      "ru": "Настоящее время",
      "uk": "Теперішній час"
    },
    "rule": {
      "de": "Читати: я читаю, ти читаєш, він читає, ми читаємо, ви читаєте, вони читають.",
      "en": "Читати: я читаю, ти читаєш, він читає, ми читаємо, ви читаєте, вони читають.",
      "ru": "Спряжение читати: я читаю, ти читаєш, він читає, ми читаємо, ви читаєте, вони читають.",
      "uk": "Дієвідміна читати: я читаю, ти читаєш, він читає, ми читаємо, ви читаєте, вони читають."
    },
    "example": "Я читаю книжку.",
    "practice": [
      {
        "sentence": "Ти ___ газету. (читати)",
        "options": [
          "читаєш",
          "читаю",
          "читають"
        ],
        "answer": "читаєш"
      },
      {
        "sentence": "Ми ___ книжку. (читати)",
        "options": [
          "читаємо",
          "читаєте",
          "читає"
        ],
        "answer": "читаємо"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Вона ___ лист. (читати)",
        "options": [
          "читає",
          "читаю",
          "читаєш"
        ],
        "answer": "читає"
      },
      {
        "sentence": "Вони ___ журнал. (читати)",
        "options": [
          "читають",
          "читаємо",
          "читаєте"
        ],
        "answer": "читають"
      }
    ]
  },
  {
    "id": "uk-past",
    "language": "uk",
    "stage": 2,
    "title": {
      "de": "Vergangenheit und Genus",
      "en": "Past and gender",
      "ru": "Прошедшее и род",
      "uk": "Минулий час і рід"
    },
    "rule": {
      "de": "In der Vergangenheit stimmt das Verb mit Genus und Numerus überein: читав, читала, читало, читали.",
      "en": "Past verbs agree with gender and number: читав, читала, читало, читали.",
      "ru": "Прошедшее время согласуется по роду и числу: читав, читала, читало, читали.",
      "uk": "Минулий час узгоджується за родом і числом: читав, читала, читало, читали."
    },
    "example": "Вона читала.",
    "practice": [
      {
        "sentence": "Він ___ книжку. (мин.)",
        "options": [
          "читав",
          "читала",
          "читали"
        ],
        "answer": "читав"
      },
      {
        "sentence": "Вона ___ газету. (мин.)",
        "options": [
          "читала",
          "читав",
          "читали"
        ],
        "answer": "читала"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Діти ___ листи. (мин.)",
        "options": [
          "читали",
          "читало",
          "читала"
        ],
        "answer": "читали"
      },
      {
        "sentence": "Ми ___ журнал. (мин.)",
        "options": [
          "читали",
          "читав",
          "читала"
        ],
        "answer": "читали"
      }
    ]
  },
  {
    "id": "uk-future",
    "language": "uk",
    "stage": 3,
    "title": {
      "de": "Zusammengesetztes Futur",
      "en": "Compound future",
      "ru": "Составное будущее",
      "uk": "Складене майбутнє"
    },
    "rule": {
      "de": "Unvollendete Verben können Futur mit буду/будеш/буде/будемо/будете/будуть + Infinitiv bilden.",
      "en": "Imperfective verbs can form the future with буду/будеш/буде/будемо/будете/будуть + infinitive.",
      "ru": "Несовершенный вид может образовывать будущее с буду/будеш/буде/будемо/будете/будуть + инфинитив.",
      "uk": "Недоконаний вид може утворювати майбутнє з буду/будеш/буде/будемо/будете/будуть + інфінітив."
    },
    "example": "Я буду читати.",
    "practice": [
      {
        "sentence": "Ти ___ працювати. (future)",
        "options": [
          "будеш",
          "буду",
          "будуть"
        ],
        "answer": "будеш"
      },
      {
        "sentence": "Ми ___ навчатися. (future)",
        "options": [
          "будемо",
          "будете",
          "буде"
        ],
        "answer": "будемо"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Вона ___ читати. (future)",
        "options": [
          "буде",
          "буду",
          "будеш"
        ],
        "answer": "буде"
      },
      {
        "sentence": "Вони ___ грати. (future)",
        "options": [
          "будуть",
          "будемо",
          "будете"
        ],
        "answer": "будуть"
      }
    ]
  },
  {
    "id": "ru-gender",
    "language": "ru",
    "stage": 1,
    "title": {
      "de": "Genus und Adjektive",
      "en": "Gender and adjectives",
      "ru": "Род и прилагательные",
      "uk": "Рід і прикметники"
    },
    "rule": {
      "de": "Adjektive stimmen mit dem Nomen überein: новый, новая, новое; Plural новые.",
      "en": "Adjectives agree with nouns: новый, новая, новое; plural новые.",
      "ru": "Прилагательное согласуется с существительным: новый, новая, новое; множественное новые.",
      "uk": "Прикметник узгоджується з іменником: новый, новая, новое; множина новые."
    },
    "example": "новый дом, новая книга",
    "practice": [
      {
        "sentence": "___ дом (new)",
        "options": [
          "новый",
          "новая",
          "новое"
        ],
        "answer": "новый"
      },
      {
        "sentence": "___ книга (new)",
        "options": [
          "новая",
          "новый",
          "новое"
        ],
        "answer": "новая"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___ окно (new)",
        "options": [
          "новое",
          "новый",
          "новая"
        ],
        "answer": "новое"
      },
      {
        "sentence": "___ дома (new)",
        "options": [
          "новые",
          "новый",
          "новая"
        ],
        "answer": "новые"
      }
    ]
  },
  {
    "id": "ru-prepositional",
    "language": "ru",
    "stage": 1,
    "title": {
      "de": "Präpositiv mit о",
      "en": "Prepositional with о",
      "ru": "Предложный с о",
      "uk": "Прийменниковий з о"
    },
    "rule": {
      "de": "О/об bei einem Gesprächsthema verlangt den Präpositiv: о книге, о доме, об окне.",
      "en": "О/об for a topic of discussion takes the prepositional: о книге, о доме, об окне.",
      "ru": "О/об в значении темы разговора требует предложного падежа.",
      "uk": "О/об у значенні теми розмови вимагає прийменникового відмінка."
    },
    "example": "Мы говорим о книге.",
    "practice": [
      {
        "sentence": "Мы говорим о ___. (дом)",
        "options": [
          "доме",
          "дом",
          "дома"
        ],
        "answer": "доме"
      },
      {
        "sentence": "Она думает о ___. (работа)",
        "options": [
          "работе",
          "работу",
          "работой"
        ],
        "answer": "работе"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Он рассказывает о ___. (город)",
        "options": [
          "городе",
          "города",
          "городом"
        ],
        "answer": "городе"
      },
      {
        "sentence": "Мы говорим об ___. (окно)",
        "options": [
          "окне",
          "окно",
          "окна"
        ],
        "answer": "окне"
      }
    ]
  },
  {
    "id": "ru-accusative",
    "language": "ru",
    "stage": 2,
    "title": {
      "de": "Akkusativ belebt/unbelebt",
      "en": "Animate accusative",
      "ru": "Винительный одушевлённых",
      "uk": "Знахідний істот"
    },
    "rule": {
      "de": "Bei maskulinen Nomen im Singular entspricht der Akkusativ bei Belebten häufig dem Genitiv, bei Unbelebten dem Nominativ.",
      "en": "Masculine singular animate accusative generally matches genitive; inanimate matches nominative.",
      "ru": "У существительных мужского рода ед. числа винительный одушевлённых совпадает с родительным, неодушевлённых — с именительным.",
      "uk": "В іменників чоловічого роду однини знахідний істот збігається з родовим, неістот — з називним."
    },
    "example": "Я вижу брата. Я вижу стол.",
    "practice": [
      {
        "sentence": "Я вижу ___. (брат)",
        "options": [
          "брата",
          "брат",
          "братом"
        ],
        "answer": "брата"
      },
      {
        "sentence": "Я вижу ___. (стол)",
        "options": [
          "стол",
          "стола",
          "столом"
        ],
        "answer": "стол"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Она встретила ___. (друг)",
        "options": [
          "друга",
          "друг",
          "другом"
        ],
        "answer": "друга"
      },
      {
        "sentence": "Он купил ___. (телефон)",
        "options": [
          "телефон",
          "телефона",
          "телефоном"
        ],
        "answer": "телефон"
      }
    ]
  },
  {
    "id": "ru-aspect",
    "language": "ru",
    "stage": 2,
    "title": {
      "de": "Verbalaspekt",
      "en": "Verb aspect",
      "ru": "Вид глагола",
      "uk": "Вид дієслова"
    },
    "rule": {
      "de": "Несовершенный вид beschreibt Verlauf oder Wiederholung; совершенный вид ein begrenztes Ereignis/Resultat.",
      "en": "Imperfective describes ongoing or repeated actions; perfective a bounded event/result.",
      "ru": "Несовершенный вид обозначает процесс или повторение, совершенный — целостное действие или результат.",
      "uk": "Недоконаний вид позначає процес або повторення, доконаний — цілісну дію чи результат."
    },
    "example": "Я читал письмо. Я прочитал письмо до конца.",
    "practice": [
      {
        "sentence": "Каждый день он ___ газету. (habit)",
        "options": [
          "читал",
          "прочитал",
          "прочитает"
        ],
        "answer": "читал"
      },
      {
        "sentence": "Он ___ книгу до конца вчера. (completion)",
        "options": [
          "прочитал",
          "читает",
          "прочитает"
        ],
        "answer": "прочитал"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Она обычно ___ письма утром. (habit)",
        "options": [
          "писала",
          "написала",
          "напишет"
        ],
        "answer": "писала"
      },
      {
        "sentence": "Он наконец ___ письмо и отправил его. (completion)",
        "options": [
          "написал",
          "пишет",
          "напишет"
        ],
        "answer": "написал"
      }
    ]
  },
  {
    "id": "ru-conditional",
    "language": "ru",
    "stage": 3,
    "title": {
      "de": "Irrealis mit бы",
      "en": "Conditional with бы",
      "ru": "Условное с бы",
      "uk": "Умовне з бы"
    },
    "rule": {
      "de": "Бы kombiniert sich mit der Vergangenheitsform für hypothetische Situationen; die Form stimmt in Genus/Numerus überein.",
      "en": "Бы combines with past forms for hypothetical situations; gender/number agreement remains.",
      "ru": "Бы образует условное наклонение с формой прошедшего времени, согласование по роду и числу сохраняется.",
      "uk": "Бы утворює умовний спосіб з минулою формою; узгодження за родом і числом зберігається."
    },
    "example": "Если бы я знал, я бы помог.",
    "practice": [
      {
        "sentence": "Если бы он знал, он бы ___. (помочь)",
        "options": [
          "помог",
          "помогла",
          "помогли"
        ],
        "answer": "помог"
      },
      {
        "sentence": "Если бы она знала, она бы ___. (помочь)",
        "options": [
          "помогла",
          "помог",
          "помогли"
        ],
        "answer": "помогла"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Если бы мы знали, мы бы ___. (помочь)",
        "options": [
          "помогли",
          "помог",
          "помогла"
        ],
        "answer": "помогли"
      },
      {
        "sentence": "Если бы они знали, они бы ___. (прийти)",
        "options": [
          "пришли",
          "пришёл",
          "пришла"
        ],
        "answer": "пришли"
      }
    ]
  },
  {
    "id": "zh-wordorder",
    "language": "zh",
    "stage": 1,
    "title": {
      "de": "Subjekt–Verb–Objekt",
      "en": "Subject–verb–object",
      "ru": "Подлежащее–глагол–объект",
      "uk": "Підмет–дієслово–додаток"
    },
    "rule": {
      "de": "Ein einfacher Aussagesatz hat oft Subjekt + Verb + Objekt. Verben werden nicht nach Person konjugiert.",
      "en": "A simple statement often uses subject + verb + object. Verbs do not conjugate by person.",
      "ru": "Простое предложение часто строится подлежащее + глагол + объект. Глаголы не спрягаются по лицам.",
      "uk": "Просте речення часто має підмет + дієслово + додаток. Дієслова не відмінюються за особами."
    },
    "example": "我喝水。",
    "practice": [
      {
        "sentence": "我___水。 (drink)",
        "options": [
          "喝",
          "水",
          "我"
        ],
        "answer": "喝"
      },
      {
        "sentence": "她___书。 (read)",
        "options": [
          "看",
          "书",
          "她"
        ],
        "answer": "看"
      }
    ],
    "checkpoint": [
      {
        "sentence": "他___中文。 (study)",
        "options": [
          "学",
          "中文",
          "他"
        ],
        "answer": "学"
      },
      {
        "sentence": "我们___米饭。 (eat)",
        "options": [
          "吃",
          "米饭",
          "我们"
        ],
        "answer": "吃"
      }
    ]
  },
  {
    "id": "zh-ma",
    "language": "zh",
    "stage": 1,
    "title": {
      "de": "Ja/Nein-Frage mit 吗",
      "en": "Yes/no question with 吗",
      "ru": "Вопрос с 吗",
      "uk": "Питання з 吗"
    },
    "rule": {
      "de": "吗 am Satzende macht aus vielen Aussagesätzen eine Ja/Nein-Frage, ohne die Satzstellung zu ändern.",
      "en": "Sentence-final 吗 turns many statements into yes/no questions without changing word order.",
      "ru": "吗 в конце превращает многие утверждения в общий вопрос без изменения порядка слов.",
      "uk": "吗 у кінці перетворює багато тверджень на загальне питання без зміни порядку слів."
    },
    "example": "你是学生吗？",
    "practice": [
      {
        "sentence": "你喝茶___？ (yes/no)",
        "options": [
          "吗",
          "的",
          "很"
        ],
        "answer": "吗"
      },
      {
        "sentence": "他是老师___？ (yes/no)",
        "options": [
          "吗",
          "的",
          "很"
        ],
        "answer": "吗"
      }
    ],
    "checkpoint": [
      {
        "sentence": "你喜欢音乐___？ (yes/no)",
        "options": [
          "吗",
          "的",
          "很"
        ],
        "answer": "吗"
      },
      {
        "sentence": "她会游泳___？ (yes/no)",
        "options": [
          "吗",
          "的",
          "很"
        ],
        "answer": "吗"
      }
    ]
  },
  {
    "id": "zh-classifier",
    "language": "zh",
    "stage": 2,
    "title": {
      "de": "Zählwörter",
      "en": "Classifiers",
      "ru": "Счётные слова",
      "uk": "Лічильні слова"
    },
    "rule": {
      "de": "Zwischen Zahl und Nomen steht häufig ein Zählwort: 一本书, 三个人, 一杯水, 一张纸.",
      "en": "A classifier often occurs between number and noun: 一本书, 三个人, 一杯水, 一张纸.",
      "ru": "Между числом и существительным часто стоит счётное слово: 一本书, 三个人, 一杯水, 一张纸.",
      "uk": "Між числом та іменником часто стоїть лічильне слово: 一本书, 三个人, 一杯水, 一张纸."
    },
    "example": "两本书。",
    "practice": [
      {
        "sentence": "三___书。",
        "options": [
          "本",
          "杯",
          "张"
        ],
        "answer": "本"
      },
      {
        "sentence": "两___人。",
        "options": [
          "个",
          "本",
          "杯"
        ],
        "answer": "个"
      }
    ],
    "checkpoint": [
      {
        "sentence": "一___水。",
        "options": [
          "杯",
          "本",
          "张"
        ],
        "answer": "杯"
      },
      {
        "sentence": "一___纸。",
        "options": [
          "张",
          "本",
          "杯"
        ],
        "answer": "张"
      }
    ]
  },
  {
    "id": "zh-negation",
    "language": "zh",
    "stage": 2,
    "title": {
      "de": "不 und 没有",
      "en": "不 and 没有",
      "ru": "Отрицания 不 и 没有",
      "uk": "Заперечення 不 і 没有"
    },
    "rule": {
      "de": "不 verneint oft Gewohnheiten oder Zustände; 没有 verneint Besitz. Vor 有 steht 没, nicht 不.",
      "en": "不 often negates habits or states; 没有 negates possession. Negate 有 with 没, not 不.",
      "ru": "不 часто отрицает привычки и состояния; 没有 — наличие. Перед 有 отрицание 没, не 不.",
      "uk": "不 часто заперечує звички й стани; 没有 — наявність. Перед 有 заперечення 没, не 不."
    },
    "example": "我不喝咖啡。我没有车。",
    "practice": [
      {
        "sentence": "我___有车。",
        "options": [
          "没",
          "不",
          "很"
        ],
        "answer": "没"
      },
      {
        "sentence": "他___是老师。",
        "options": [
          "不",
          "有",
          "很"
        ],
        "answer": "不"
      }
    ],
    "checkpoint": [
      {
        "sentence": "她___有钱。",
        "options": [
          "没",
          "不",
          "很"
        ],
        "answer": "没"
      },
      {
        "sentence": "我___喜欢咖啡。",
        "options": [
          "不",
          "有",
          "很"
        ],
        "answer": "不"
      }
    ]
  },
  {
    "id": "zh-comparison",
    "language": "zh",
    "stage": 3,
    "title": {
      "de": "Vergleich mit 比",
      "en": "Comparison with 比",
      "ru": "Сравнение с 比",
      "uk": "Порівняння з 比"
    },
    "rule": {
      "de": "A 比 B + Adjektiv: A ist im betreffenden Merkmal stärker als B.",
      "en": "A 比 B + adjective: A has more of that quality than B.",
      "ru": "A 比 B + прилагательное: у A признак выражен сильнее, чем у B.",
      "uk": "A 比 B + прикметник: у A ознака виражена сильніше, ніж у B."
    },
    "example": "今天比昨天热。",
    "practice": [
      {
        "sentence": "他___我高。 (taller than)",
        "options": [
          "比",
          "在",
          "和"
        ],
        "answer": "比"
      },
      {
        "sentence": "今天___昨天冷。 (colder than)",
        "options": [
          "比",
          "在",
          "和"
        ],
        "answer": "比"
      }
    ],
    "checkpoint": [
      {
        "sentence": "这个___那个贵。 (more expensive than)",
        "options": [
          "比",
          "在",
          "和"
        ],
        "answer": "比"
      },
      {
        "sentence": "姐姐___妹妹大。 (older than)",
        "options": [
          "比",
          "在",
          "和"
        ],
        "answer": "比"
      }
    ]
  },
  {
    "id": "es-gender",
    "language": "es",
    "stage": 1,
    "title": {
      "de": "Genus und Artikel",
      "en": "Gender and articles",
      "ru": "Род и артикли",
      "uk": "Рід і артиклі"
    },
    "rule": {
      "de": "Bestimmte Artikel: el/la im Singular, los/las im Plural. Genus mit Nomen lernen.",
      "en": "Definite articles: el/la singular, los/las plural. Learn gender with nouns.",
      "ru": "Определённые артикли: el/la в ед. числе, los/las во множественном. Род учим со словом.",
      "uk": "Означені артиклі: el/la в однині, los/las у множині. Рід вчимо зі словом."
    },
    "example": "el libro, la mesa",
    "practice": [
      {
        "sentence": "___ libro (definite)",
        "options": [
          "el",
          "la",
          "las"
        ],
        "answer": "el"
      },
      {
        "sentence": "___ mesa (definite)",
        "options": [
          "la",
          "el",
          "los"
        ],
        "answer": "la"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___ libros (definite)",
        "options": [
          "los",
          "las",
          "el"
        ],
        "answer": "los"
      },
      {
        "sentence": "___ mesas (definite)",
        "options": [
          "las",
          "los",
          "la"
        ],
        "answer": "las"
      }
    ]
  },
  {
    "id": "es-present",
    "language": "es",
    "stage": 1,
    "title": {
      "de": "Präsens -ar",
      "en": "Present -ar",
      "ru": "Настоящее -ar",
      "uk": "Теперішній -ar"
    },
    "rule": {
      "de": "Hablar: hablo, hablas, habla, hablamos, habláis, hablan.",
      "en": "Hablar: hablo, hablas, habla, hablamos, habláis, hablan.",
      "ru": "Спряжение hablar: hablo, hablas, habla, hablamos, habláis, hablan.",
      "uk": "Дієвідміна hablar: hablo, hablas, habla, hablamos, habláis, hablan."
    },
    "example": "Yo hablo español.",
    "practice": [
      {
        "sentence": "Tú ___ español. (hablar)",
        "options": [
          "hablas",
          "hablo",
          "hablan"
        ],
        "answer": "hablas"
      },
      {
        "sentence": "Nosotros ___ español. (hablar)",
        "options": [
          "hablamos",
          "hablan",
          "habláis"
        ],
        "answer": "hablamos"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Ella ___ español. (hablar)",
        "options": [
          "habla",
          "hablas",
          "hablo"
        ],
        "answer": "habla"
      },
      {
        "sentence": "Ellos ___ español. (hablar)",
        "options": [
          "hablan",
          "habla",
          "hablamos"
        ],
        "answer": "hablan"
      }
    ]
  },
  {
    "id": "es-ser-estar",
    "language": "es",
    "stage": 2,
    "title": {
      "de": "Ser und estar",
      "en": "Ser and estar",
      "ru": "Глаголы ser и estar",
      "uk": "Дієслова ser і estar"
    },
    "rule": {
      "de": "Ser dient u. a. Identität/Beruf; estar u. a. Zustand und Ort von Personen oder Dingen.",
      "en": "Ser for identity/profession; estar for states and location of people/things, among other uses.",
      "ru": "Ser — в частности личность и профессия; estar — состояние и место людей/предметов.",
      "uk": "Ser — зокрема особа й професія; estar — стан і місце людей/предметів."
    },
    "example": "Soy médico. Estoy en casa.",
    "practice": [
      {
        "sentence": "Yo ___ profesora. (profession)",
        "options": [
          "soy",
          "estoy",
          "eres"
        ],
        "answer": "soy"
      },
      {
        "sentence": "Ella ___ en casa. (location)",
        "options": [
          "está",
          "es",
          "soy"
        ],
        "answer": "está"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Nosotros ___ estudiantes. (identity)",
        "options": [
          "somos",
          "estamos",
          "son"
        ],
        "answer": "somos"
      },
      {
        "sentence": "Tú ___ cansado ahora. (state)",
        "options": [
          "estás",
          "eres",
          "soy"
        ],
        "answer": "estás"
      }
    ]
  },
  {
    "id": "es-preterite",
    "language": "es",
    "stage": 2,
    "title": {
      "de": "Pretérito indefinido -ar",
      "en": "Preterite -ar",
      "ru": "Прошедшее indefinido -ar",
      "uk": "Минулий indefinido -ar"
    },
    "rule": {
      "de": "Abgeschlossene Ereignisse: hablé, hablaste, habló, hablamos, hablasteis, hablaron.",
      "en": "Completed events: hablé, hablaste, habló, hablamos, hablasteis, hablaron.",
      "ru": "Завершённые события: hablé, hablaste, habló, hablamos, hablasteis, hablaron.",
      "uk": "Завершені події: hablé, hablaste, habló, hablamos, hablasteis, hablaron."
    },
    "example": "Ayer hablé con Ana.",
    "practice": [
      {
        "sentence": "Ayer yo ___ con Ana. (hablar, preterite)",
        "options": [
          "hablé",
          "hablo",
          "habló"
        ],
        "answer": "hablé"
      },
      {
        "sentence": "Ayer ella ___ con Ana. (hablar, preterite)",
        "options": [
          "habló",
          "hablé",
          "hablas"
        ],
        "answer": "habló"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Ayer tú ___ con Ana. (hablar, preterite)",
        "options": [
          "hablaste",
          "habló",
          "hablan"
        ],
        "answer": "hablaste"
      },
      {
        "sentence": "Ayer ellos ___ con Ana. (hablar, preterite)",
        "options": [
          "hablaron",
          "habló",
          "hablamos"
        ],
        "answer": "hablaron"
      }
    ]
  },
  {
    "id": "es-subjunctive",
    "language": "es",
    "stage": 3,
    "title": {
      "de": "Subjuntivo nach querer que",
      "en": "Subjunctive after querer que",
      "ru": "Subjuntivo после querer que",
      "uk": "Subjuntivo після querer que"
    },
    "rule": {
      "de": "Bei Wunsch mit verschiedenem Subjekt: quiero que + Subjuntivo, z. B. hables, vengas.",
      "en": "A wish with a different subject: quiero que + subjunctive, e.g. hables, vengas.",
      "ru": "Желание с другим подлежащим: quiero que + subjuntivo, например hables, vengas.",
      "uk": "Бажання з іншим підметом: quiero que + subjuntivo, наприклад hables, vengas."
    },
    "example": "Quiero que vengas.",
    "practice": [
      {
        "sentence": "Quiero que tú ___ conmigo. (hablar)",
        "options": [
          "hables",
          "hablas",
          "hablar"
        ],
        "answer": "hables"
      },
      {
        "sentence": "Quiero que ella ___ aquí. (venir)",
        "options": [
          "venga",
          "viene",
          "venir"
        ],
        "answer": "venga"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Quiero que ellos ___ más. (estudiar)",
        "options": [
          "estudien",
          "estudian",
          "estudiar"
        ],
        "answer": "estudien"
      },
      {
        "sentence": "Quiero que nosotros ___ juntos. (trabajar)",
        "options": [
          "trabajemos",
          "trabajamos",
          "trabajar"
        ],
        "answer": "trabajemos"
      }
    ]
  },
  {
    "id": "fr-articles",
    "language": "fr",
    "stage": 1,
    "title": {
      "de": "Bestimmte Artikel",
      "en": "Definite articles",
      "ru": "Определённые артикли",
      "uk": "Означені артиклі"
    },
    "rule": {
      "de": "Le (m), la (f), l’ vor Vokal oder stummem h, les im Plural.",
      "en": "Le (m), la (f), l’ before a vowel or mute h, les plural.",
      "ru": "Le (м), la (ж), l’ перед гласным или немым h, les во множественном.",
      "uk": "Le (ч), la (ж), l’ перед голосним або німим h, les у множині."
    },
    "example": "le livre, la table, l’école",
    "practice": [
      {
        "sentence": "___ livre (definite)",
        "options": [
          "le",
          "la",
          "les"
        ],
        "answer": "le"
      },
      {
        "sentence": "___ table (definite)",
        "options": [
          "la",
          "le",
          "les"
        ],
        "answer": "la"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___ école (definite)",
        "options": [
          "l’",
          "le",
          "la"
        ],
        "answer": "l’"
      },
      {
        "sentence": "___ livres (definite)",
        "options": [
          "les",
          "le",
          "la"
        ],
        "answer": "les"
      }
    ]
  },
  {
    "id": "fr-present",
    "language": "fr",
    "stage": 1,
    "title": {
      "de": "Präsens -er",
      "en": "Present -er",
      "ru": "Настоящее -er",
      "uk": "Теперішній -er"
    },
    "rule": {
      "de": "Parler: parle, parles, parle, parlons, parlez, parlent.",
      "en": "Parler: parle, parles, parle, parlons, parlez, parlent.",
      "ru": "Спряжение parler: parle, parles, parle, parlons, parlez, parlent.",
      "uk": "Дієвідміна parler: parle, parles, parle, parlons, parlez, parlent."
    },
    "example": "Je parle français.",
    "practice": [
      {
        "sentence": "Tu ___ français. (parler)",
        "options": [
          "parles",
          "parle",
          "parlez"
        ],
        "answer": "parles"
      },
      {
        "sentence": "Nous ___ français. (parler)",
        "options": [
          "parlons",
          "parlez",
          "parlent"
        ],
        "answer": "parlons"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Vous ___ français. (parler)",
        "options": [
          "parlez",
          "parlons",
          "parle"
        ],
        "answer": "parlez"
      },
      {
        "sentence": "Elles ___ français. (parler)",
        "options": [
          "parlent",
          "parle",
          "parles"
        ],
        "answer": "parlent"
      }
    ]
  },
  {
    "id": "fr-negation",
    "language": "fr",
    "stage": 2,
    "title": {
      "de": "Ne ... pas",
      "en": "Ne ... pas",
      "ru": "Отрицание ne ... pas",
      "uk": "Заперечення ne ... pas"
    },
    "rule": {
      "de": "In der Standardschriftsprache umschließt ne/n’ ... pas das finite Verb im einfachen Satz.",
      "en": "In standard writing ne/n’ ... pas surrounds the finite verb in simple clauses.",
      "ru": "В стандартной письменной речи ne/n’ ... pas окружает спрягаемый глагол.",
      "uk": "У стандартному письмі ne/n’ ... pas оточує відмінюване дієслово."
    },
    "example": "Je ne parle pas.",
    "practice": [
      {
        "sentence": "Je ne mange ___. (not)",
        "options": [
          "pas",
          "très",
          "oui"
        ],
        "answer": "pas"
      },
      {
        "sentence": "Il n’est ___ ici. (not)",
        "options": [
          "pas",
          "très",
          "oui"
        ],
        "answer": "pas"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Nous ne savons ___. (not)",
        "options": [
          "pas",
          "très",
          "oui"
        ],
        "answer": "pas"
      },
      {
        "sentence": "Elle ne vient ___. (not)",
        "options": [
          "pas",
          "très",
          "oui"
        ],
        "answer": "pas"
      }
    ]
  },
  {
    "id": "fr-perfect",
    "language": "fr",
    "stage": 2,
    "title": {
      "de": "Passé composé avec avoir",
      "en": "Passé composé with avoir",
      "ru": "Passé composé с avoir",
      "uk": "Passé composé з avoir"
    },
    "rule": {
      "de": "Viele Verben: avoir im Präsens + participe passé; -er → -é.",
      "en": "Many verbs: present avoir + past participle; -er → -é.",
      "ru": "Многие глаголы: avoir в настоящем + причастие; -er → -é.",
      "uk": "Багато дієслів: avoir у теперішньому + дієприкметник; -er → -é."
    },
    "example": "J’ai parlé.",
    "practice": [
      {
        "sentence": "Tu ___ mangé. (avoir)",
        "options": [
          "as",
          "a",
          "ai"
        ],
        "answer": "as"
      },
      {
        "sentence": "Nous avons ___. (parler)",
        "options": [
          "parlé",
          "parler",
          "parle"
        ],
        "answer": "parlé"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Elle ___ travaillé. (avoir)",
        "options": [
          "a",
          "as",
          "avons"
        ],
        "answer": "a"
      },
      {
        "sentence": "Ils ont ___. (visiter)",
        "options": [
          "visité",
          "visiter",
          "visitent"
        ],
        "answer": "visité"
      }
    ]
  },
  {
    "id": "fr-relative",
    "language": "fr",
    "stage": 3,
    "title": {
      "de": "Qui und que",
      "en": "Qui and que",
      "ru": "Относительные qui и que",
      "uk": "Відносні qui й que"
    },
    "rule": {
      "de": "Qui ist Subjekt des Relativsatzes, que/qu’ direktes Objekt.",
      "en": "Qui is the subject of a relative clause, que/qu’ the direct object.",
      "ru": "Qui — подлежащее придаточного, que/qu’ — прямое дополнение.",
      "uk": "Qui — підмет підрядного, que/qu’ — прямий додаток."
    },
    "example": "Le livre que je lis. La personne qui parle.",
    "practice": [
      {
        "sentence": "La femme ___ parle est ici.",
        "options": [
          "qui",
          "que",
          "où"
        ],
        "answer": "qui"
      },
      {
        "sentence": "Le livre ___ tu lis est neuf.",
        "options": [
          "que",
          "qui",
          "où"
        ],
        "answer": "que"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Le train ___ arrive est rapide.",
        "options": [
          "qui",
          "que",
          "où"
        ],
        "answer": "qui"
      },
      {
        "sentence": "Le film ___ nous regardons est long.",
        "options": [
          "que",
          "qui",
          "où"
        ],
        "answer": "que"
      }
    ]
  },
  {
    "id": "it-articles",
    "language": "it",
    "stage": 1,
    "title": {
      "de": "Bestimmte Artikel",
      "en": "Definite articles",
      "ru": "Определённые артикли",
      "uk": "Означені артиклі"
    },
    "rule": {
      "de": "Il vor vielen maskulinen Konsonanten, lo vor z oder s+Konsonant, la feminin, l’ vor Vokal im Singular.",
      "en": "Il before many masculine consonants, lo before z or s+consonant, la feminine, l’ before vowels in singular.",
      "ru": "Il перед многими мужскими согласными, lo перед z или s+согласной, la женский, l’ перед гласным в ед. числе.",
      "uk": "Il перед багатьма чоловічими приголосними, lo перед z або s+приголосною, la жіночий, l’ перед голосним в однині."
    },
    "example": "il libro, lo studente, la casa",
    "practice": [
      {
        "sentence": "___ libro (definite)",
        "options": [
          "il",
          "lo",
          "la"
        ],
        "answer": "il"
      },
      {
        "sentence": "___ studente (definite)",
        "options": [
          "lo",
          "il",
          "la"
        ],
        "answer": "lo"
      }
    ],
    "checkpoint": [
      {
        "sentence": "___ casa (definite)",
        "options": [
          "la",
          "il",
          "lo"
        ],
        "answer": "la"
      },
      {
        "sentence": "___ amico (definite)",
        "options": [
          "l’",
          "il",
          "la"
        ],
        "answer": "l’"
      }
    ]
  },
  {
    "id": "it-present",
    "language": "it",
    "stage": 1,
    "title": {
      "de": "Präsens -are",
      "en": "Present -are",
      "ru": "Настоящее -are",
      "uk": "Теперішній -are"
    },
    "rule": {
      "de": "Parlare: parlo, parli, parla, parliamo, parlate, parlano.",
      "en": "Parlare: parlo, parli, parla, parliamo, parlate, parlano.",
      "ru": "Спряжение parlare: parlo, parli, parla, parliamo, parlate, parlano.",
      "uk": "Дієвідміна parlare: parlo, parli, parla, parliamo, parlate, parlano."
    },
    "example": "Io parlo italiano.",
    "practice": [
      {
        "sentence": "Tu ___ italiano. (parlare)",
        "options": [
          "parli",
          "parlo",
          "parlano"
        ],
        "answer": "parli"
      },
      {
        "sentence": "Noi ___ italiano. (parlare)",
        "options": [
          "parliamo",
          "parlate",
          "parla"
        ],
        "answer": "parliamo"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Voi ___ italiano. (parlare)",
        "options": [
          "parlate",
          "parliamo",
          "parli"
        ],
        "answer": "parlate"
      },
      {
        "sentence": "Loro ___ italiano. (parlare)",
        "options": [
          "parlano",
          "parla",
          "parli"
        ],
        "answer": "parlano"
      }
    ]
  },
  {
    "id": "it-essere",
    "language": "it",
    "stage": 2,
    "title": {
      "de": "Essere und avere",
      "en": "Essere and avere",
      "ru": "Essere и avere",
      "uk": "Essere і avere"
    },
    "rule": {
      "de": "Essere: sono, sei, è, siamo, siete, sono; avere: ho, hai, ha, abbiamo, avete, hanno. Alter mit avere.",
      "en": "Essere: sono, sei, è, siamo, siete, sono; avere: ho, hai, ha, abbiamo, avete, hanno. Age uses avere.",
      "ru": "Essere: sono, sei, è, siamo, siete, sono; avere: ho, hai, ha, abbiamo, avete, hanno. Возраст с avere.",
      "uk": "Essere: sono, sei, è, siamo, siete, sono; avere: ho, hai, ha, abbiamo, avete, hanno. Вік з avere."
    },
    "example": "Sono studente. Ho vent’anni.",
    "practice": [
      {
        "sentence": "Io ___ vent’anni.",
        "options": [
          "ho",
          "sono",
          "ha"
        ],
        "answer": "ho"
      },
      {
        "sentence": "Tu ___ a casa. (essere)",
        "options": [
          "sei",
          "hai",
          "sono"
        ],
        "answer": "sei"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Noi ___ una macchina. (avere)",
        "options": [
          "abbiamo",
          "siamo",
          "avete"
        ],
        "answer": "abbiamo"
      },
      {
        "sentence": "Loro ___ italiani. (essere)",
        "options": [
          "sono",
          "hanno",
          "siamo"
        ],
        "answer": "sono"
      }
    ]
  },
  {
    "id": "it-perfect",
    "language": "it",
    "stage": 2,
    "title": {
      "de": "Passato prossimo",
      "en": "Passato prossimo",
      "ru": "Passato prossimo",
      "uk": "Passato prossimo"
    },
    "rule": {
      "de": "Viele Verben: avere + participio passato. Andare benutzt essere; das Partizip stimmt dann mit dem Subjekt überein.",
      "en": "Many verbs: avere + past participle. Andare uses essere; its participle agrees with the subject.",
      "ru": "Многие глаголы: avere + причастие. Andare требует essere; причастие согласуется с подлежащим.",
      "uk": "Багато дієслів: avere + дієприкметник. Andare вимагає essere; дієприкметник узгоджується з підметом."
    },
    "example": "Ho mangiato. Maria è andata.",
    "practice": [
      {
        "sentence": "Io ho ___. (mangiare)",
        "options": [
          "mangiato",
          "mangiare",
          "mangiando"
        ],
        "answer": "mangiato"
      },
      {
        "sentence": "Maria ___ andata a casa.",
        "options": [
          "è",
          "ha",
          "sono"
        ],
        "answer": "è"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Loro hanno ___. (parlare)",
        "options": [
          "parlato",
          "parlare",
          "parlano"
        ],
        "answer": "parlato"
      },
      {
        "sentence": "Marco è ___ a scuola. (andare)",
        "options": [
          "andato",
          "andata",
          "andare"
        ],
        "answer": "andato"
      }
    ]
  },
  {
    "id": "it-subjunctive",
    "language": "it",
    "stage": 3,
    "title": {
      "de": "Congiuntivo nach penso che",
      "en": "Subjunctive after penso che",
      "ru": "Congiuntivo после penso che",
      "uk": "Congiuntivo після penso che"
    },
    "rule": {
      "de": "In der Standardsprache folgt nach penso che oft Congiuntivo: sia, abbia, venga.",
      "en": "In standard usage penso che often takes the subjunctive: sia, abbia, venga.",
      "ru": "В стандартной речи после penso che часто congiuntivo: sia, abbia, venga.",
      "uk": "У стандартному мовленні після penso che часто congiuntivo: sia, abbia, venga."
    },
    "example": "Penso che sia vero.",
    "practice": [
      {
        "sentence": "Penso che lui ___ stanco. (congiuntivo)",
        "options": [
          "sia",
          "è",
          "sono"
        ],
        "answer": "sia"
      },
      {
        "sentence": "Penso che lei ___ ragione. (congiuntivo)",
        "options": [
          "abbia",
          "ha",
          "avere"
        ],
        "answer": "abbia"
      }
    ],
    "checkpoint": [
      {
        "sentence": "Penso che lui ___ domani. (congiuntivo)",
        "options": [
          "venga",
          "viene",
          "venire"
        ],
        "answer": "venga"
      },
      {
        "sentence": "Penso che loro ___ pronti. (congiuntivo)",
        "options": [
          "siano",
          "sono",
          "siamo"
        ],
        "answer": "siano"
      }
    ]
  },
  {
    "id": "ja-copula",
    "language": "ja",
    "stage": 1,
    "title": {
      "de": "Höfliche Kopula です",
      "en": "Polite copula です",
      "ru": "Вежливая связка です",
      "uk": "Ввічлива зв'язка です"
    },
    "rule": {
      "de": "Nomen + です bildet höfliche Aussagen. です wird nicht nach Person verändert.",
      "en": "Noun + です makes polite statements. です does not change by person.",
      "ru": "Существительное + です образует вежливое утверждение. です не меняется по лицам.",
      "uk": "Іменник + です утворює ввічливе твердження. です не змінюється за особами."
    },
    "example": "私は学生です。",
    "practice": [
      {
        "sentence": "私は先生___。 (polite statement)",
        "options": [
          "です",
          "を",
          "に"
        ],
        "answer": "です"
      },
      {
        "sentence": "これは本___。 (polite statement)",
        "options": [
          "です",
          "を",
          "に"
        ],
        "answer": "です"
      }
    ],
    "checkpoint": [
      {
        "sentence": "彼は医者___。 (polite statement)",
        "options": [
          "です",
          "を",
          "に"
        ],
        "answer": "です"
      },
      {
        "sentence": "ここは学校___。 (polite statement)",
        "options": [
          "です",
          "を",
          "に"
        ],
        "answer": "です"
      }
    ]
  },
  {
    "id": "ja-object",
    "language": "ja",
    "stage": 1,
    "title": {
      "de": "Objektpartikel を",
      "en": "Object particle を",
      "ru": "Частица объекта を",
      "uk": "Частка додатка を"
    },
    "rule": {
      "de": "を markiert häufig das direkte Objekt eines transitiven Verbs. Es wird gewöhnlich o ausgesprochen.",
      "en": "を often marks the direct object of a transitive verb; usually pronounced o.",
      "ru": "を часто обозначает прямое дополнение переходного глагола; обычно произносится o.",
      "uk": "を часто позначає прямий додаток перехідного дієслова; зазвичай вимовляється o."
    },
    "example": "水を飲みます。",
    "practice": [
      {
        "sentence": "本___読みます。",
        "options": [
          "を",
          "に",
          "で"
        ],
        "answer": "を"
      },
      {
        "sentence": "水___飲みます。",
        "options": [
          "を",
          "に",
          "で"
        ],
        "answer": "を"
      }
    ],
    "checkpoint": [
      {
        "sentence": "ご飯___食べます。",
        "options": [
          "を",
          "に",
          "で"
        ],
        "answer": "を"
      },
      {
        "sentence": "手紙___書きます。",
        "options": [
          "を",
          "に",
          "で"
        ],
        "answer": "を"
      }
    ]
  },
  {
    "id": "ja-masu",
    "language": "ja",
    "stage": 2,
    "title": {
      "de": "Höfliche Verbformen",
      "en": "Polite verb forms",
      "ru": "Вежливые формы глаголов",
      "uk": "Ввічливі форми дієслів"
    },
    "rule": {
      "de": "ます: höflich nichtvergangen; ません: negativ; ました: vergangen; ませんでした: negativ vergangen.",
      "en": "ます: polite nonpast; ません: negative; ました: past; ませんでした: negative past.",
      "ru": "ます: вежливое непрошедшее; ません: отрицание; ました: прошедшее; ませんでした: отрицательное прошедшее.",
      "uk": "ます: ввічливе неминуле; ません: заперечення; ました: минуле; ませんでした: заперечне минуле."
    },
    "example": "食べます。食べません。",
    "practice": [
      {
        "sentence": "昨日パンを食べ___。 (past affirmative)",
        "options": [
          "ました",
          "ます",
          "ません"
        ],
        "answer": "ました"
      },
      {
        "sentence": "明日は行き___。 (nonpast negative)",
        "options": [
          "ません",
          "ました",
          "ます"
        ],
        "answer": "ません"
      }
    ],
    "checkpoint": [
      {
        "sentence": "昨日は働き___。 (past negative)",
        "options": [
          "ませんでした",
          "ます",
          "ました"
        ],
        "answer": "ませんでした"
      },
      {
        "sentence": "毎日本を読み___。 (habit affirmative)",
        "options": [
          "ます",
          "ました",
          "ません"
        ],
        "answer": "ます"
      }
    ]
  },
  {
    "id": "ja-location",
    "language": "ja",
    "stage": 2,
    "title": {
      "de": "Ort der Handlung mit で",
      "en": "Action location with で",
      "ru": "Место действия с で",
      "uk": "Місце дії з で"
    },
    "rule": {
      "de": "で markiert oft den Ort einer Handlung; に kann Ziel oder Existenzort markieren.",
      "en": "で often marks the location of an action; に can mark destination or location of existence.",
      "ru": "で часто обозначает место действия; に может обозначать цель движения или место существования.",
      "uk": "で часто позначає місце дії; に може позначати ціль руху або місце існування."
    },
    "example": "図書館で勉強します。",
    "practice": [
      {
        "sentence": "学校___勉強します。 (action location)",
        "options": [
          "で",
          "を",
          "の"
        ],
        "answer": "で"
      },
      {
        "sentence": "家___ご飯を食べます。 (action location)",
        "options": [
          "で",
          "を",
          "の"
        ],
        "answer": "で"
      }
    ],
    "checkpoint": [
      {
        "sentence": "公園___走ります。 (action location)",
        "options": [
          "で",
          "を",
          "の"
        ],
        "answer": "で"
      },
      {
        "sentence": "駅___友達に会います。 (action location)",
        "options": [
          "で",
          "を",
          "の"
        ],
        "answer": "で"
      }
    ]
  },
  {
    "id": "ja-te",
    "language": "ja",
    "stage": 3,
    "title": {
      "de": "て-Form + ください",
      "en": "Te-form + ください",
      "ru": "Форма て + ください",
      "uk": "Форма て + ください"
    },
    "rule": {
      "de": "Die て-Form mit ください bildet eine höfliche Bitte: 読む → 読んでください.",
      "en": "Te-form + ください forms a polite request: 読む → 読んでください.",
      "ru": "Форма て с ください образует вежливую просьбу: 読む → 読んでください.",
      "uk": "Форма て з ください утворює ввічливе прохання: 読む → 読んでください."
    },
    "example": "ここに座ってください。",
    "practice": [
      {
        "sentence": "本を___ください。 (読む)",
        "options": [
          "読んで",
          "読みます",
          "読む"
        ],
        "answer": "読んで"
      },
      {
        "sentence": "ここに___ください。 (座る)",
        "options": [
          "座って",
          "座ります",
          "座る"
        ],
        "answer": "座って"
      }
    ],
    "checkpoint": [
      {
        "sentence": "名前を___ください。 (書く)",
        "options": [
          "書いて",
          "書きます",
          "書く"
        ],
        "answer": "書いて"
      },
      {
        "sentence": "水を___ください。 (飲む)",
        "options": [
          "飲んで",
          "飲みます",
          "飲む"
        ],
        "answer": "飲んで"
      }
    ]
  }
]);
