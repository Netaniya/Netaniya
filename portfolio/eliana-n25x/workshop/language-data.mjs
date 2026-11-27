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
  contentVersion: 2,
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
