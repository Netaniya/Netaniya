export const UI_LANGUAGES = ['de','en','ru','uk'];
export const local = (values,lang) => values[UI_LANGUAGES.indexOf(lang) < 0 ? 0 : UI_LANGUAGES.indexOf(lang)];
export const LEARNING_LANGUAGES = [
  {id:'de',name:'Deutsch',words:['Hallo','Danke','Auf Wiedersehen','Wasser','Freund','Buch']},
  {id:'en',name:'English',words:['Hello','Thank you','Goodbye','Water','Friend','Book']},
  {id:'ka',name:'ქართული',words:['გამარჯობა','მადლობა','ნახვამდის','წყალი','მეგობარი','წიგნი'],reading:['gamarjoba','madloba','nakhvamdis','tsqali','megobari','tsigni']},
  {id:'uk',name:'Українська',words:['Привіт','Дякую','До побачення','Вода','Друг','Книга']},
  {id:'ru',name:'Русский',words:['Привет','Спасибо','До свидания','Вода','Друг','Книга']},
  {id:'zh',name:'中文 · 普通话',words:['你好','谢谢','再见','水','朋友','书'],reading:['nǐ hǎo','xièxie','zàijiàn','shuǐ','péngyou','shū']},
  {id:'es',name:'Español',words:['Hola','Gracias','Adiós','Agua','Amigo','Libro']},
  {id:'fr',name:'Français',words:['Bonjour','Merci','Au revoir','Eau','Ami','Livre']},
  {id:'it',name:'Italiano',words:['Ciao','Grazie','Arrivederci','Acqua','Amico','Libro']},
  {id:'ja',name:'日本語',words:['こんにちは','ありがとう','さようなら','水','友達','本'],reading:['konnichiwa','arigatō','sayōnara','mizu','tomodachi','hon']}
];
export const WORD_MEANINGS = [
  ['Hallo','Hello','Привет','Привіт'],['Danke','Thank you','Спасибо','Дякую'],
  ['Auf Wiedersehen','Goodbye','До свидания','До побачення'],['Wasser','Water','Вода','Вода'],
  ['Freund','Friend','Друг','Друг'],['Buch','Book','Книга','Книга']
];
// Deterministic permutations keep distractors in the same language and never
// reveal the answer through a fixed button position.
export function wordChoices(language,index) {
  const course=LEARNING_LANGUAGES.find(v=>v.id===language); if(!course || index<0 || index>5) return [];
  const indices=[index,(index+2)%6,(index+4)%6],offset=(index+LEARNING_LANGUAGES.indexOf(course))%3;
  return indices.slice(offset).concat(indices.slice(0,offset)).map(i=>({index:i,text:course.words[i]}));
}
export const MISSIONS = [
  {id:'modules', title:['Variablen','Variables','Переменные','Змінні'],
    task:['Ein Modul liefert 5 Energiepunkte. Berechne die Energie für beliebig viele Module.','Each module supplies 5 energy points. Calculate the energy for any number of modules.','Один модуль даёт 5 единиц энергии. Посчитай энергию для любого количества модулей.','Один модуль дає 5 одиниць енергії. Обчисли енергію для будь-якої кількості модулів.'],
    hint:['modules enthält die Anzahl. Multipliziere diese Zahl mit 5.','modules holds the count. Multiply that number by 5.','В modules хранится количество. Умножь его на 5.','У modules зберігається кількість. Помнож її на 5.'],
    why:['Eine Variable gibt einem Wert einen Namen. modules ist der Eingang, total das berechnete Ergebnis.','A variable gives a value a name. modules is the input; total holds the calculated result.','Переменная даёт значению имя. modules — входное количество, total — вычисленный результат.','Змінна дає значенню ім’я. modules — вхідна кількість, total — обчислений результат.'],
    source:'function energy(modules) {\n  let total = modules + 5;\n  return total;\n}',entry:'energy',sample:[3],prediction:[8,15,5],expectedPrediction:8,
    block:{from:'modules + 5',choices:['modules + 5','modules * 5','modules - 5']},tests:[[[1],5],[[3],15],[[0],0],[[7],35]]},
  {id:'condition',title:['Bedingungen','Conditions','Условия','Умови'],
    task:['Eine richtige Antwort bringt 10 Punkte. Bei einer falschen Antwort bleibt der Punktestand gleich.','A correct answer adds 10 points. A wrong answer leaves the score unchanged.','Верный ответ приносит 10 очков. При ошибке счёт остаётся прежним.','Правильна відповідь додає 10 очок. При помилці рахунок не змінюється.'],
    hint:['Benutze score + 10 im richtigen Zweig. return score erhält den bisherigen Stand.','Use score + 10 in the correct branch. return score keeps the old score.','В правильной ветке нужно score + 10. return score сохраняет прежний счёт.','У правильній гілці потрібно score + 10. return score зберігає попередній рахунок.'],
    why:['if prüft eine Bedingung. correct ist true bei einer richtigen Antwort und false bei einer falschen.','if checks a condition. correct is true for a right answer and false for a wrong one.','if проверяет условие. correct равно true для верного ответа и false для ошибочного.','if перевіряє умову. correct дорівнює true для правильної відповіді й false для помилкової.'],
    source:'function reward(score, correct) {\n  if (correct) {\n    return score - 10;\n  }\n  return score;\n}',entry:'reward',sample:[20,true],prediction:[10,20,30],expectedPrediction:10,
    block:{from:'score - 10',choices:['score - 10','score + 10','score + 1']},tests:[[[0,true],10],[[7,false],7],[[20,true],30],[[0,false],0]]},
  {id:'loop',title:['Schleifen','Loops','Циклы','Цикли'],
    task:['Jede Runde bringt 3 Punkte. Wiederhole die Addition für die angegebene Rundenzahl.','Every round earns 3 points. Repeat the addition for the given number of rounds.','Каждый раунд приносит 3 очка. Повтори начисление нужное число раз.','Кожен раунд додає 3 очки. Повтори нарахування потрібну кількість разів.'],
    hint:['i startet bei 0. Solange i kleiner als rounds ist, addiere 3 zu score.','i starts at 0. While i is less than rounds, add 3 to score.','i начинается с 0. Пока i меньше rounds, прибавляй к score по 3.','i починається з 0. Поки i менше rounds, додавай до score по 3.'],
    why:['Die Schleife führt denselben Schritt mehrmals aus. i++ erhöht den Zähler nach jeder Runde um 1.','A loop performs the same step repeatedly. i++ increases the counter by 1 after each round.','Цикл повторяет один шаг. i++ увеличивает счётчик на 1 после каждого раунда.','Цикл повторює один крок. i++ збільшує лічильник на 1 після кожного раунду.'],
    source:'function total(rounds) {\n  let score = 0;\n  for (let i = 0; i < rounds; i++) {\n    score = score + 2;\n  }\n  return score;\n}',entry:'total',sample:[3],prediction:[2,3,6],expectedPrediction:6,
    block:{from:'score + 2',choices:['score + 2','score + 3','score + 1']},tests:[[[0],0],[[1],3],[[4],12],[[7],21]]},
  {id:'functions',title:['Funktionen','Functions','Функции','Функції'],
    task:['Die Bonusfunktion soll Punkte verdoppeln. finish muss diese Funktion verwenden.','The bonus function should double the points. finish must use this function.','Функция бонуса должна удваивать очки. finish использует эту функцию.','Функція бонусу має подвоювати очки. finish використовує цю функцію.'],
    hint:['points * 2 verdoppelt einen Wert. bonus(score) ruft die Funktion mit score auf.','points * 2 doubles a value. bonus(score) calls the function with score.','points * 2 удваивает значение. bonus(score) вызывает функцию с числом score.','points * 2 подвоює значення. bonus(score) викликає функцію з числом score.'],
    why:['Eine Funktion bündelt Schritte. Ein Parameter nimmt den Eingang an, return liefert das Ergebnis.','A function groups steps. A parameter receives the input; return provides the result.','Функция объединяет действия. Параметр принимает входное значение, return возвращает результат.','Функція об’єднує дії. Параметр приймає вхідне значення, return повертає результат.'],
    source:'function bonus(points) {\n  return points + 2;\n}\nfunction finish(score) {\n  return bonus(score);\n}',entry:'finish',sample:[4],prediction:[4,6,8],expectedPrediction:6,
    block:{from:'points + 2',choices:['points + 2','points * 2','points - 2']},tests:[[[0],0],[[3],6],[[8],16],[[11],22]]},
  {id:'debug',title:['Fehlersuche','Debugging','Поиск ошибки','Пошук помилки'],
    task:['Prüfe zwei Antworten: gleiche Zahlen ergeben true, unterschiedliche Zahlen false.','Compare two answers: matching numbers return true, different numbers return false.','Сравни два ответа: одинаковые числа дают true, разные — false.','Порівняй дві відповіді: однакові числа дають true, різні — false.'],
    hint:['=== prüft Gleichheit. !== prüft Ungleichheit.','=== checks equality. !== checks inequality.','=== проверяет равенство. !== проверяет неравенство.','=== перевіряє рівність. !== перевіряє нерівність.'],
    why:['Prüfe beide Fälle. Ein Programm kann mit einem Beispiel richtig und mit einem anderen falsch sein.','Test both cases. A program can work for one example and fail for another.','Проверяй оба случая. Программа может работать на одном примере и ошибаться на другом.','Перевіряй обидва випадки. Програма може працювати на одному прикладі й помилятися на іншому.'],
    source:'function check(answer, correct) {\n  return answer !== correct;\n}',entry:'check',sample:[3,3],prediction:[true,false,3],expectedPrediction:false,
    block:{from:'answer !== correct',choices:['answer !== correct','answer === correct','answer > correct']},tests:[[[3,3],true],[[3,4],false],[[0,0],true],[[-1,1],false]]}
];

// Small original practice sets, rather than claims of full national curricula.
export const SUBJECTS = [
 {id:'logicLab',symbol:'◇',title:['Logik','Logic','Логика','Логіка'],tasks:[
  {q:['Welche Zahl folgt: 2, 4, 8, 16, …?','Which number comes next: 2, 4, 8, 16, …?','Какое число дальше: 2, 4, 8, 16, …?','Яке число далі: 2, 4, 8, 16, …?'],options:[['32','32','32','32'],['18','18','18','18'],['24','24','24','24']],answer:0,why:['Jede Zahl wird verdoppelt. 16 × 2 = 32.','Each number doubles. 16 × 2 = 32.','Каждое число удваивается: 16 × 2 = 32.','Кожне число подвоюється: 16 × 2 = 32.']},
  {q:['Alle blauen Module leuchten. Modul A ist blau. Was folgt sicher?','All blue modules glow. Module A is blue. What follows for sure?','Все синие модули светятся. Модуль A синий. Что точно верно?','Усі сині модулі світяться. Модуль A синій. Що точно правильно?'],options:[['A leuchtet','A glows','A светится','A світиться'],['A ist rund','A is round','A круглый','A круглий'],['Nur A leuchtet','Only A glows','Светится только A','Світиться лише A']],answer:0,why:['Die Regel gilt für jedes blaue Modul. Form und andere Module sind unbekannt.','The rule applies to every blue module. Shape and other modules are unknown.','Правило относится к каждому синему модулю. О форме и других модулях ничего не сказано.','Правило стосується кожного синього модуля. Про форму й інші модулі нічого не сказано.']}]},
 {id:'physicsLab',symbol:'ϟ',title:['Physik','Physics','Физика','Фізика'],tasks:[
  {q:['Eine Spiellampe ist an eine Batterie angeschlossen. Was braucht sie zum Leuchten?','A toy lamp is connected to a battery. What does it need to light up?','Игрушечная лампа соединена с батарейкой. Что нужно, чтобы она светилась?','Іграшкова лампа з’єднана з батарейкою. Що потрібно, щоб вона світилася?'],options:[['Geschlossener Stromkreis','A closed circuit','Замкнутая цепь','Замкнене коло'],['Ein unterbrochenes Kabel','A broken wire','Разорванный провод','Розірваний дріт'],['Nur ein Kabelende','Only one wire end','Только один конец провода','Лише один кінець дроту']],answer:0,why:['Strom benötigt einen durchgehenden Weg durch Lampe und Batterie.','Current needs a complete path through the lamp and battery.','Току нужен непрерывный путь через лампу и батарейку.','Струму потрібен безперервний шлях через лампу й батарейку.']},
  {q:['Ein Wagen fährt 10 Meter in 2 Sekunden. Wie schnell ist er im Mittel?','A cart travels 10 metres in 2 seconds. What is its average speed?','Тележка проехала 10 метров за 2 секунды. Какова средняя скорость?','Візок проїхав 10 метрів за 2 секунди. Яка середня швидкість?'],options:[['5 m/s','5 m/s','5 м/с','5 м/с'],['20 m/s','20 m/s','20 м/с','20 м/с'],['12 m/s','12 m/s','12 м/с','12 м/с']],answer:0,why:['Geschwindigkeit = Strecke ÷ Zeit. 10 ÷ 2 = 5.','Speed = distance ÷ time. 10 ÷ 2 = 5.','Скорость = расстояние ÷ время. 10 ÷ 2 = 5.','Швидкість = відстань ÷ час. 10 ÷ 2 = 5.']}]},
 {id:'biologyLab',symbol:'❋',title:['Biologie','Biology','Биология','Біологія'],tasks:[
  {q:['Was braucht eine grüne Pflanze für die Fotosynthese?','What does a green plant need for photosynthesis?','Что нужно зелёному растению для фотосинтеза?','Що потрібно зеленій рослині для фотосинтезу?'],options:[['Licht, Wasser, Kohlenstoffdioxid','Light, water, carbon dioxide','Свет, вода, углекислый газ','Світло, вода, вуглекислий газ'],['Nur Erde','Only soil','Только земля','Лише ґрунт'],['Nur Dunkelheit','Only darkness','Только темнота','Лише темрява']],answer:0,why:['Mit Lichtenergie bildet die Pflanze aus Wasser und Kohlenstoffdioxid Zucker; dabei entsteht Sauerstoff.','Using light energy, the plant makes sugars from water and carbon dioxide, releasing oxygen.','Используя свет, растение образует сахара из воды и углекислого газа и выделяет кислород.','Використовуючи світло, рослина утворює цукри з води й вуглекислого газу та виділяє кисень.']}]},
 {id:'geographyLab',symbol:'◎',title:['Geografie','Geography','География','Географія'],tasks:[
  {q:['Welche Himmelsrichtung liegt auf einer üblichen Karte oben?','Which direction is at the top of a conventional north-up map?','Какое направление сверху на обычной карте, ориентированной на север?','Який напрямок угорі на звичайній карті, орієнтованій на північ?'],options:[['Norden','North','Север','Північ'],['Süden','South','Юг','Південь'],['Westen','West','Запад','Захід']],answer:0,why:['Prüfe den Nordpfeil: Karten können auch anders gedreht sein.','Check the north arrow: maps can also be rotated.','Проверяй стрелку севера: карту могут повернуть иначе.','Перевіряй стрілку півночі: карту можуть повернути інакше.']}]},
 {id:'digitalLab',symbol:'⌁',title:['Digitale Fähigkeiten','Digital skills','Цифровые навыки','Цифрові навички'],tasks:[
  {q:['Jemand fragt im Spiel nach deinem Passwort. Was tust du?','Someone in a game asks for your password. What do you do?','Кто-то в игре просит твой пароль. Что делать?','Хтось у грі просить твій пароль. Що робити?'],options:[['Nicht weitergeben; Hilfe holen','Keep it private; get help','Не передавать, обратиться за помощью','Не передавати, звернутися по допомогу'],['An alle senden','Send it to everyone','Отправить всем','Надіслати всім'],['Im Profil veröffentlichen','Post it in the profile','Опубликовать в профиле','Опублікувати в профілі']],answer:0,why:['Ein Passwort schützt dein Konto. Teile es nicht in Chats oder öffentlichen Profilen.','A password protects your account. Do not share it in chats or public profiles.','Пароль защищает аккаунт. Его не публикуют в переписке или открытом профиле.','Пароль захищає акаунт. Його не публікують у листуванні чи відкритому профілі.']}]}
];
export function checkMission(mission,source,runner) {
 return mission.tests.map(([args,expected])=>({args,expected,...runner(source,mission.entry,args)}));
}
