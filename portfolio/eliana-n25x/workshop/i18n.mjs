const rows=`
brand|Dein Roboter. Deine Ideen.|Your robot. Your ideas.|Твой робот. Твои идеи.|Твій робот. Твої ідеї.
workshop|Robot Studio|Robot Studio|Мастерская роботов|Майстерня роботів
home|Mein Roboter|My robot|Мой робот|Мій робот
learn|Lernen|Learn|Учиться|Вчитися
create|Gestalten|Create|Создать|Створити
parts|Bauteile|Parts|Детали|Деталі
settings|Einstellungen|Settings|Настройки|Налаштування
points|Punkte|Points|Поинты|Поінти
language|Sprache|Language|Язык|Мова
daily|Heute zusammen|Today together|Сегодня вместе|Сьогодні разом
dailyHelp|Drei neue Aufgaben für dein Level. Ohne Zeitdruck.|Three new exercises for your level. Take your time.|Три новых задания твоего уровня. Без спешки.|Три нові завдання твого рівня. Без поспіху.
dailyProgress|{n} von 3 gelöst|{n} of 3 solved|Решено {n} из 3|Розв’язано {n} із 3
dailyDone|Heute geschafft. Morgen gibt es neue Aufgaben.|Done for today. New exercises arrive tomorrow.|На сегодня готово. Завтра появятся новые задания.|На сьогодні готово. Завтра з’являться нові завдання.
dailyStart|Los geht’s|Let's start|Начнём|Почнімо
dailyBonus|Tagesziel erreicht!|Daily goal complete!|Цель дня выполнена!|Мету дня виконано!
challengeHelp|Probiere es zuerst selbst. Der Hinweis ist jederzeit da.|Try it yourself first. The hint is always available.|Сначала попробуй сам. Подсказка всегда рядом.|Спочатку спробуй сам. Підказка завжди поруч.
level|Klasse|Grade|Класс|Клас
welcome|Hallo. Lass uns etwas bauen.|Hello. Let's build something.|Привет. Давай что-нибудь создадим.|Привіт. Створімо щось разом.
intro|Ich bin Eliana. N25x und ich helfen dir, deinen Roboter zu gestalten, Aufgaben zu verstehen und eigene Projekte zu bauen.|I'm Eliana. N25x and I will help you design your robot, understand problems and build your own projects.|Я Eliana. Мы с N25x поможем собрать твоего робота, разобраться с задачами и создать свои проекты.|Я Eliana. Ми з N25x допоможемо зібрати твого робота, розібратися із завданнями та створити власні проєкти.
start|Meinen Roboter bauen|Build my robot|Собрать своего робота|Зібрати свого робота
continue|Weiter|Continue|Продолжить|Продовжити
close|Schließen|Close|Закрыть|Закрити
back|Zurück|Back|Назад|Назад
ready|Bereit für deine nächste Idee.|Ready for your next idea.|Готов к твоей следующей идее.|Готовий до твоєї наступної ідеї.
greeting|Hallo, ich bin {name}.|Hi, I'm {name}.|Привет, я {name}.|Привіт, я {name}.
homeHelp|Was machen wir heute zusammen?|What shall we do together today?|Что сегодня сделаем вместе?|Що сьогодні зробимо разом?
assemble|Roboter gestalten|Customize robot|Настроить робота|Налаштувати робота
assembleHelp|Tippe auf ein Teil. Dein Roboter verändert sich sofort.|Tap a part. Your robot changes instantly.|Нажми на деталь — робот сразу изменится.|Натисни на деталь — робот одразу зміниться.
name|Name des Roboters|Robot name|Имя робота|Ім’я робота
color|Material & Farbe|Material & color|Материал и цвет|Матеріал і колір
head|Kopf|Head|Голова|Голова
base|Bewegung|Movement|Передвижение|Пересування
hands|Hände|Hands|Руки|Руки
personality|Art zu sprechen|Speaking style|Характер общения|Характер спілкування
interest|Lieblingsthema|Favorite interest|Любимая тема|Улюблена тема
style|So erkläre ich|How I explain|Как объяснять|Як пояснювати
module|Extra-Modul|Extra module|Дополнительный модуль|Додатковий модуль
arc|Bogen|Arc|Дуга|Дуга
visor|Visier|Visor|Визор|Візор
antenna|Antenne|Antenna|Антенна|Антена
feet|Füße|Feet|Ноги|Ноги
wheels|Räder|Wheels|Колёса|Колеса
hover|Schweben|Hover|Парение|Левітація
round|Gelenkhände|Joint hands|Суставные руки|Суглобові руки
clamp|Greifer|Grippers|Захваты|Захвати
calm|Ruhig|Calm|Спокойный|Спокійний
cheerful|Fröhlich|Cheerful|Весёлый|Веселий
focused|Konzentriert|Focused|Сосредоточенный|Зосереджений
space|Weltraum|Space|Космос|Космос
nature|Natur|Nature|Природа|Природа
music|Musik|Music|Музыка|Музика
steps|Schrittweise|Step by step|По шагам|Покроково
visual|Mit Beispielen|With examples|На примерах|На прикладах
challenge|Erst selbst probieren|Try first|Сначала попробовать|Спочатку спробувати
none|Ohne|None|Без модуля|Без модуля
pearl|Perlweiß|Pearl|Жемчужный|Перлинний
ocean|Ozean|Ocean|Океан|Океан
orchid|Orchidee|Orchid|Орхидея|Орхідея
copper|Kupfer|Copper|Медный|Мідний
graphite|Graphit|Graphite|Графит|Графіт
mint|Minze|Mint|Мятный|М’ятний
projector|Lichtprojektor|Light projector|Световой проектор|Світловий проєктор
speaker|Musikmodul|Music module|Музыкальный модуль|Музичний модуль
orbit|Orbitalring|Orbital ring|Орбитальное кольцо|Орбітальне кільце
shopHelp|Entdecke neue Teile mit deinen erspielten Punkten.|Discover parts with points you earn.|Открывай новые детали за заработанные поинты.|Відкривай нові деталі за зароблені поінти.
pointHelp|Punkte gibt es für gelöste Übungen, Programme und eigene Projekte.|Earn points by solving exercises, programs and creating projects.|Поинты начисляются за решённые упражнения, программы и собственные проекты.|Поінти нараховуються за розв’язані вправи, програми й власні проєкти.
buy|Freischalten|Unlock|Открыть|Відкрити
equip|Verwenden|Equip|Использовать|Використати
owned|Freigeschaltet|Owned|Открыто|Відкрито
equipped|Ausgewählt|Equipped|Выбрано|Вибрано
funds|Noch nicht genug Punkte.|Not enough points yet.|Пока не хватает поинтов.|Поки бракує поінтів.
bought|Neues Teil freigeschaltet!|New part unlocked!|Новая деталь открыта!|Нову деталь відкрито!
saved|Gespeichert|Saved|Сохранено|Збережено
storageError|Speichern ist blockiert. Exportiere dein Profil in den Einstellungen.|Storage is blocked. Export your profile in Settings.|Сохранение заблокировано. Экспортируй профиль в настройках.|Збереження заблоковано. Експортуй профіль у налаштуваннях.
card|Roboterkarte speichern|Save robot card|Сохранить карточку робота|Зберегти картку робота
wave|Winken|Wave|Помахать|Помахати
turn|Drehen|Turn|Поворот|Поворот
step|Schritt|Step|Шаг|Крок
glow|Licht|Light|Подсветка|Підсвічування
nod|Nicken|Nod|Кивок|Кивок
rest|Pause|Rest|Пауза|Пауза
rotate|Ansicht drehen|Rotate view|Повернуть вид|Повернути вид
mentorEliana|Ich helfe dir, aus einer Idee etwas Eigenes zu machen.|I'll help you turn an idea into something of your own.|Я помогу превратить идею в твою собственную работу.|Я допоможу перетворити ідею на твою власну роботу.
mentorN25x|Wir probieren es aus und prüfen das Ergebnis zusammen.|Let's try it and check the result together.|Давай попробуем и вместе проверим результат.|Спробуймо й разом перевіримо результат.
mentor|Dein Team|Your team|Твоя команда|Твоя команда
math|Mathematik|Mathematics|Математика|Математика
english|Englisch|English|Английский|Англійська
coding|Informatik|Computing|Информатика|Інформатика
learnHelp|Wähle ein Thema. Wir üben in kleinen Schritten.|Choose a topic. We'll practice in small steps.|Выбери тему. Будем разбираться небольшими шагами.|Обери тему. Розбиратимемося невеликими кроками.
scope|Originalübungen für 11 Schwierigkeitsstufen. Die Klassenangabe ist eine Orientierung; Lehrpläne unterscheiden sich.|Original exercises across 11 difficulty levels. Grade is a guide; curricula vary.|Авторские упражнения 11 уровней сложности. Класс — ориентир: школьные программы отличаются.|Авторські вправи 11 рівнів складності. Клас — орієнтир: шкільні програми відрізняються.
practice|Üben|Practice|Тренироваться|Тренуватися
helper|Rechenwerkstatt|Math helper|Разобрать выражение|Розібрати вираз
addition|Plus & Minus|Addition & subtraction|Сложение и вычитание|Додавання й віднімання
multiply|Multiplikation|Multiplication|Умножение|Множення
divide|Division|Division|Деление|Ділення
fractions|Brüche|Fractions|Дроби|Дроби
decimals|Dezimalzahlen|Decimals|Десятичные числа|Десяткові числа
percent|Prozente|Percentages|Проценты|Відсотки
negative|Negative Zahlen|Negative numbers|Отрицательные числа|Від’ємні числа
linear|Lineare Gleichungen|Linear equations|Линейные уравнения|Лінійні рівняння
powers|Potenzen|Powers|Степени|Степені
quadratic|Quadratische Gleichungen|Quadratic equations|Квадратные уравнения|Квадратні рівняння
derivative|Ableitungen|Derivatives|Производные|Похідні
answer|Deine Antwort|Your answer|Твой ответ|Твоя відповідь
check|Prüfen|Check|Проверить|Перевірити
hint|Zeig mir einen Schritt|Show a step|Показать шаг|Показати крок
correct|Richtig. Gut gelöst!|Correct. Nicely done!|Верно. Получилось!|Правильно. Вийшло!
wrong|Noch nicht. Probiere es mit dem Hinweis.|Not yet. Try using the hint.|Пока не получилось. Попробуй с подсказкой.|Поки не вийшло. Спробуй із підказкою.
next|Nächste Aufgabe|Next exercise|Следующее задание|Наступне завдання
earned|+{n} Punkte|+{n} points|+{n} поинтов|+{n} поінтів
completed|Schon gelöst. Du kannst weiter üben.|Already solved. You can keep practicing.|Уже решено. Можно потренироваться ещё.|Уже розв’язано. Можна потренуватися ще.
explainCalm|Wir nehmen uns Zeit. Ein Schritt nach dem anderen.|Take your time. One step at a time.|Не торопимся. Один шаг за другим.|Не поспішаймо. Один крок за одним.
explainCheerful|Lass es uns ausprobieren!|Let's give it a try!|Давай попробуем!|Спробуймо!
explainFocused|Ziel: eine nachvollziehbare Lösung.|Goal: a solution we can explain.|Цель — решение, которое можем объяснить.|Мета — розв’язок, який можемо пояснити.
mathPlaceholder|z. B. 2*(3+4) oder 2x+3=11|e.g. 2*(3+4) or 2x+3=11|Например: 2*(3+4) или 2x+3=11|Наприклад: 2*(3+4) або 2x+3=11
calculate|Aufschlüsseln|Work it out|Разобрать|Розібрати
mathFormats|Ausdrücke, Brüche, Prozente, lineare und quadratische Gleichungen. Ableitung: d/dx x^3. Keine Textaufgaben oder freie KI-Unterhaltung.|Expressions, fractions, percentages, linear and quadratic equations. Derivative: d/dx x^3. Word problems and open AI chat are not available.|Выражения, дроби, проценты, линейные и квадратные уравнения. Производная: d/dx x^3. Текстовые задачи и свободный ИИ-чат пока недоступны.|Вирази, дроби, відсотки, лінійні та квадратні рівняння. Похідна: d/dx x^3. Текстові задачі й вільний ШІ-чат поки недоступні.
result|Ergebnis|Result|Результат|Результат
formatError|Dieses Format wird noch nicht unterstützt. Wähle eines der Beispiele.|This format isn't supported yet. Try one of the examples.|Этот формат пока не поддерживается. Попробуй один из примеров.|Цей формат поки не підтримується. Спробуй один із прикладів.
noReal|Keine reelle Lösung.|No real solution.|Действительных корней нет.|Дійсних коренів немає.
identity|Gilt für alle x.|True for every x.|Верно при любом x.|Правильно для будь-якого x.
noneSolution|Keine Lösung.|No solution.|Решений нет.|Розв’язків немає.
wordHelp|Wähle das passende englische Wort.|Choose the matching English word.|Выбери подходящее английское слово.|Обери відповідне англійське слово.
hello|Hallo|Hello|Привет|Привіт
thanks|Danke|Thanks|Спасибо|Дякую
school|Schule|School|Школа|Школа
friend|Freund|Friend|Друг|Друг
left|Links|Left|Налево|Ліворуч
right|Rechts|Right|Направо|Праворуч
tomorrow|Morgen|Tomorrow|Завтра|Завтра
water|Wasser|Water|Вода|Вода
question|Frage|Question|Вопрос|Запитання
together|Zusammen|Together|Вместе|Разом
understand|Verstehen|Understand|Понимать|Розуміти
codeHelp|Führe den Roboter zum Stern. Start: unten links, Blick nach oben. Jeder Pfeil ist ein Schritt.|Guide the robot to the star. Start: bottom left, facing up. Each arrow is one step.|Проведи робота к звезде. Старт — слева внизу, лицом вверх. Каждая стрелка — один шаг.|Проведи робота до зірки. Старт — ліворуч унизу, обличчям угору. Кожна стрілка — один крок.
up|Hoch|Up|Вверх|Угору
down|Runter|Down|Вниз|Униз
run|Ausführen|Run|Запустить|Запустити
stop|Stopp|Stop|Остановить|Зупинити
clear|Leeren|Clear|Очистить|Очистити
undo|Letztes entfernen|Undo last|Убрать последний шаг|Прибрати останній крок
codeWin|Ziel erreicht! Dein Programm funktioniert.|Goal reached! Your program works.|Цель достигнута! Твоя программа работает.|Мети досягнуто! Твоя програма працює.
codeBlocked|Der Weg ist blockiert. Ändere dein Programm.|The path is blocked. Change your program.|Путь перекрыт. Измени программу.|Шлях перекрито. Зміни програму.
codeShort|Noch nicht am Ziel. Ergänze Schritte.|Not at the goal yet. Add some steps.|Пока не у цели. Добавь шаги.|Поки не біля мети. Додай кроки.
sequence|Dein Programm|Your program|Твоя программа|Твоя програма
stage|Aufgabe|Puzzle|Задание|Завдання
melody|Meine Melodie|My melody|Моя мелодия|Моя мелодія
routine|Robotertanz|Robot routine|Движения робота|Рухи робота
collection|Meine Projekte|My projects|Мои проекты|Мої проєкти
createHelp|Baue etwas, das du behalten kannst.|Make something you can keep.|Создай то, что можно сохранить.|Створи те, що можна зберегти.
melodyHelp|Tippe auf acht Felder und wähle die Töne. 0 ist eine Pause.|Tap eight tiles to choose notes. 0 is a rest.|Нажимай на восемь плиток, выбирая ноты. 0 — пауза.|Натискай на вісім плиток, обираючи ноти. 0 — пауза.
tempo|Tempo|Tempo|Темп|Темп
play|Anhören|Play|Послушать|Послухати
saveProject|Projekt speichern|Save project|Сохранить проект|Зберегти проєкт
projectName|Projektname|Project name|Название проекта|Назва проєкту
wav|Als WAV speichern|Export WAV|Скачать WAV|Завантажити WAV
routineHelp|Stelle Bewegungen zusammen und lass deinen Roboter auftreten.|Combine moves and let your robot perform.|Собери последовательность — робот её исполнит.|Склади послідовність — робот її виконає.
emptyProjects|Dein erstes Projekt wartet auf dich.|Your first project is waiting for you.|Здесь появится твой первый проект.|Тут з’явиться твій перший проєкт.
emptySequence|Füge Schritte hinzu.|Add some steps.|Добавь несколько шагов.|Додай кілька кроків.
limit|Die Folge ist voll.|The sequence is full.|Последовательность заполнена.|Послідовність заповнена.
projectSaved|Dein Projekt ist gespeichert.|Your project is saved.|Твой проект сохранён.|Твій проєкт збережено.
projectDuplicate|Dieses Projekt ist schon in deiner Sammlung.|This project is already in your collection.|Этот проект уже есть в коллекции.|Цей проєкт уже є в колекції.
projectEmpty|Füge zuerst Töne oder Bewegungen hinzu.|Add notes or moves first.|Сначала добавь ноты или движения.|Спочатку додай ноти або рухи.
projectPoints|Für die ersten drei unterschiedlichen Projekte jeder Art gibt es je 30 Punkte.|Earn 30 points for each of your first three different projects of each kind.|Первые три разных проекта каждого вида приносят по 30 поинтов.|Перші три різні проєкти кожного виду дають по 30 поінтів.
load|Öffnen|Open|Открыть|Відкрити
delete|Entfernen|Remove|Удалить|Видалити
sound|Klang|Sound|Звук|Звук
volume|Lautstärke|Volume|Громкость|Гучність
audioHelp|Der Klang startet nach deinem ersten Tippen.|Sound starts after your first tap.|Звук запускается после первого нажатия.|Звук запускається після першого натискання.
offlinePending|Offline-Dateien werden geprüft …|Checking offline files…|Проверяются офлайн-файлы…|Перевіряються офлайн-файли…
offlineReady|Dateien geprüft. Diese Version ist offline bereit.|Files verified. This version is ready offline.|Файлы проверены. Эта версия готова к работе без сети.|Файли перевірено. Ця версія готова до роботи без мережі.
offlineError|Offline-Dateien konnten nicht vollständig geprüft werden.|Offline files could not be fully verified.|Не удалось проверить все офлайн-файлы.|Не вдалося перевірити всі офлайн-файли.
install|App installieren|Install app|Установить приложение|Встановити застосунок
installHelp|Nutze im Browser „Zum Startbildschirm hinzufügen“ oder „App installieren“.|Use Add to Home Screen or Install App in your browser.|В меню браузера выбери «На главный экран» или «Установить приложение».|У меню браузера обери «На головний екран» або «Встановити застосунок».
export|Profil exportieren|Export profile|Экспорт профиля|Експорт профілю
import|Profil importieren|Import profile|Импорт профиля|Імпорт профілю
importError|Diese Datei ist kein gültiges Studio-Profil.|This file isn't a valid Studio profile.|Это не корректный профиль мастерской.|Це не коректний профіль майстерні.
reset|Neu beginnen|Start over|Начать заново|Почати заново
resetHelp|Dein Studio-Profil wird ersetzt. Exportiere es zuerst, wenn du es behalten möchtest.|Your Studio profile will be replaced. Export it first if you want to keep it.|Профиль мастерской будет заменён. Сначала экспортируй его, если хочешь сохранить.|Профіль майстерні буде замінено. Спершу експортуй його, якщо хочеш зберегти.
confirm|Ja, neu beginnen|Yes, start over|Да, начать заново|Так, почати заново
cancel|Abbrechen|Cancel|Отмена|Скасувати
credits|Über das Studio|About the studio|О мастерской|Про майстерню
about|Konzept und künstlerische Leitung: Natalie Ragulina. Entwicklung mit KI-Unterstützung. Originale 3D-Robotermodelle und synthetische Klänge. Manrope: SIL OFL. Three.js: MIT.|Concept and art direction: Natalie Ragulina. Developed with AI assistance. Original 3D robot models and synthesized sounds. Manrope: SIL OFL. Three.js: MIT.|Концепция и художественное направление: Natalie Ragulina. Разработка с помощью ИИ. Оригинальные 3D-модели роботов и синтезированные звуки. Manrope: SIL OFL. Three.js: MIT.|Концепція та художній напрям: Natalie Ragulina. Розробка за допомогою ШІ. Оригінальні 3D-моделі роботів і синтезовані звуки. Manrope: SIL OFL. Three.js: MIT.
localHelp|Dein Profil bleibt auf diesem Gerät. Es gibt keine Konten und keine Synchronisierung. Exportiere eine Kopie zum Übertragen.|Your profile stays on this device. There are no accounts or sync. Export a copy to transfer it.|Профиль хранится на этом устройстве. Аккаунтов и синхронизации нет. Для переноса экспортируй копию.|Профіль зберігається на цьому пристрої. Акаунтів і синхронізації немає. Для перенесення експортуй копію.
rights|Alle Rechte vorbehalten.|All rights reserved.|Все права защищены.|Усі права захищені.
webgl|Die 3D-Ansicht ist hier nicht verfügbar. Lernen und Projekte funktionieren weiter.|The 3D view is unavailable here. Learning and projects still work.|3D-вид здесь недоступен. Занятия и проекты продолжают работать.|3D-вигляд тут недоступний. Заняття й проєкти продовжують працювати.
downloaded|Datei bereit.|File ready.|Файл готов.|Файл готовий.
progress|Deine Fortschritte|Your progress|Твои достижения|Твої досягнення
solved|Gelöst|Solved|Решено|Розв’язано
projects|Projekte|Projects|Проекты|Проєкти
newPart|Ein neues Teil wartet auf dich.|A new part is waiting for you.|Тебя ждёт новая деталь.|На тебе чекає нова деталь.
helpHint|Tippe auf Eliana oder N25x, wenn du Hilfe möchtest.|Tap Eliana or N25x for a hand.|Нажми на Eliana или N25x, если нужна помощь.|Натисни на Eliana або N25x, якщо потрібна допомога.
note|Ton|Note|Нота|Нота
fileError|Die Datei konnte nicht erstellt werden.|The file could not be created.|Не удалось создать файл.|Не вдалося створити файл.
motionHint|Tippen zum Winken. Ansicht optional drehen.|Tap to wave. Rotating the view is optional.|Нажми — робот помашет. Вид можно повернуть.|Натисни — робот помахає. Вигляд можна повернути.
`;
export const TEXT=Object.fromEntries(['de','en','ru','uk'].map(l=>[l,{}]));
for(const line of rows.trim().split('\n')){const [key,...values]=line.split('|');if(values.length!==4)throw Error('translation '+key);Object.keys(TEXT).forEach((l,i)=>TEXT[l][key]=values[i]);}
export function translate(lang,key,params={}){let text=TEXT[lang]?.[key];if(text===undefined)throw Error('Missing text '+lang+':'+key);return text.replace(/\{(\w+)\}/g,(_,k)=>String(params[k]??''));}
