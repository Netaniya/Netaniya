/*!
N25X / ELIANA — PROPRIETARY PROJECT MATERIALS
© 2026 Natalie Ragulina (Netaniya). All rights reserved.
No unauthorized redistribution, commercial reuse or passing off of protected original materials, except as permitted by applicable law, GitHub terms or separate licenses.
Human creative direction and AI-assisted implementation: see CONTRIBUTIONS.md. Third-party licenses remain in effect.
*/
const rows=`
mathCourse|Mathematik-Werkstatt|Mathematics classroom|Математический практикум|Математичний практикум
mathCourseHelp|48 Themen mit Erklärungen, Lösungen und Wiederholung|48 topics with explanations, solutions and review|48 тем с объяснениями, решениями и повторением|48 тем із поясненнями, розв’язаннями та повторенням
mathInventory|{topics} Aufgabenfamilien · {n} Zahlenvarianten. Varianten werden getrennt von Themen gezählt.|{topics} task families · {n} numeric variants. Variants are counted separately from topics.|{topics} типов заданий · {n} числовых вариантов. Это варианты задач, а не столько разных тем.|{topics} типів завдань · {n} числових варіантів. Це варіанти задач, а не стільки різних тем.
reviewQueue|Zur Wiederholung|To review|К повторению|До повторення
accuracy|Richtige Antworten|Correct answers|Правильных ответов|Правильних відповідей
chooseTopic|Thema wählen|Choose a topic|Выбрать тему|Обрати тему
topicProgress|{n} von {total} Varianten gelöst|{n} of {total} variants solved|Решено {n} из {total} вариантов|Розв’язано {n} із {total} варіантів
assessment|Selbsttest: 10 Aufgaben|Self-test: 10 tasks|Самопроверка: 10 задач|Самоперевірка: 10 задач
reviewMistakes|Fehler wiederholen|Review mistakes|Повторить ошибки|Повторити помилки
assessmentResult|Ergebnis: {n} / 10|Result: {n} / 10|Результат: {n} / 10|Результат: {n} / 10
assessmentPass|Guter Stand in dieser Aufgabenfamilie. Die nächste Themenwahl ist frei.|Good progress in this task family. You can choose the next topic.|Хороший результат по этому типу заданий. Можно выбрать следующую тему.|Гарний результат із цього типу завдань. Можна обрати наступну тему.
assessmentReview|Wiederhole die Fehler mit ihren Lösungswegen.|Review mistakes with their worked solutions.|Повтори ошибки с разбором решения.|Повтори помилки з розбором розв’язання.
lessonAndExample|Erklärung und Beispiel|Explanation and example|Объяснение и пример|Пояснення та приклад
assessmentStep|Selbsttest · Aufgabe {n} / 10|Self-test · task {n} / 10|Самопроверка · задача {n} / 10|Самоперевірка · задача {n} / 10
variantNumber|Variante {n} / 256|Variant {n} / 256|Вариант {n} / 256|Варіант {n} / 256
numericAnswerHelp|Eine Zahl oder ein Bruch, zum Beispiel 3/4. Einheiten stehen in der Aufgabe.|Enter a number or fraction, such as 3/4. Units are shown in the task.|Введи число или дробь, например 3/4. Единица измерения указана в задаче.|Введи число або дріб, наприклад 3/4. Одиницю виміру вказано в задачі.
showSolution|Lösungsweg zeigen|Show worked solution|Показать решение|Показати розв’язання
mathScopeNote|Klassenstufen sind Orientierung. Dies ist eine Sammlung von Aufgabenfamilien, kein vollständig geprüfter nationaler Lehrplan.|Grades are a guide. This is a task-family collection, not a fully validated national syllabus.|Классы — ориентир сложности. Это набор типов задач; соответствие полной школьной программе ещё не проверено.|Класи — орієнтир складності. Це набір типів задач; відповідність повній шкільній програмі ще не перевірено.
brand|Dein Roboter. Deine Ideen.|Your robot. Your ideas.|Твой робот. Твои идеи.|Твій робот. Твої ідеї.
workshop|Robot Studio|Robot Studio|Мастерская роботов|Майстерня роботів
home|Mein Roboter|My robot|Мой робот|Мій робот
learn|Lernen|Learn|Учиться|Вчитися
create|Gestalten|Create|Создать|Створити
parts|Bauteile|Parts|Детали|Деталі
settings|Einstellungen|Settings|Настройки|Налаштування
points|Punkte|Points|Поинты|Поінти
language|Sprache|Language|Язык|Мова
interfaceLanguage|Sprache der App|App language|Язык приложения|Мова застосунку
downloadStudio|App als HTML herunterladen|Download app as HTML|Скачать приложение в HTML|Завантажити застосунок у HTML
daily|Heute zusammen|Today together|Сегодня вместе|Сьогодні разом
dailyHelp|Drei neue Aufgaben für dein Level. Ohne Zeitdruck.|Three new exercises for your level. Take your time.|Три новых задания твоего уровня. Без спешки.|Три нові завдання твого рівня. Без поспіху.
dailyProgress|{n} von 3 gelöst|{n} of 3 solved|Решено {n} из 3|Розв’язано {n} із 3
dailyDone|Heute geschafft. Morgen gibt es neue Aufgaben.|Done for today. New exercises arrive tomorrow.|На сегодня готово. Завтра появятся новые задания.|На сьогодні готово. Завтра з’являться нові завдання.
dailyStart|Los geht’s|Let's start|Начнём|Почнімо
dailyBonus|Tagesziel erreicht!|Daily goal complete!|Цель дня выполнена!|Мету дня виконано!
challengeHelp|Probiere es zuerst selbst. Der Hinweis ist jederzeit da.|Try it yourself first. The hint is always available.|Сначала попробуй сам. Подсказка всегда рядом.|Спочатку спробуй сам. Підказка завжди поруч.
level|Klasse|Grade|Класс|Клас
welcome|Hallo. Lass uns etwas bauen.|Hello. Let's build something.|Привет. Давай что-нибудь создадим.|Привіт. Створімо щось разом.
intro|Ich bin N25x. Gemeinsam lernen wir, verstehen Aufgaben und bauen eigene Projekte.|I am N25x. Together we learn, understand problems and build our own projects.|Я N25x. Вместе будем учиться, разбираться с задачами и создавать свои проекты.|Я N25x. Разом будемо вчитися, розбиратися із завданнями та створювати власні проєкти.
start|Meinen Roboter bauen|Build my robot|Собрать своего робота|Зібрати свого робота
continue|Weiter|Continue|Продолжить|Продовжити
close|Schließen|Close|Закрыть|Закрити
back|Zurück|Back|Назад|Назад
ready|Bereit für deine nächste Idee.|Ready for your next idea.|Готов к твоей следующей идее.|Готовий до твоєї наступної ідеї.
robotGreeting|Hallo, ich bin {name}.|Hi, I'm {name}.|Привет, я {name}.|Привіт, я {name}.
homeHelp|Was machen wir heute zusammen?|What shall we do together today?|Что сегодня сделаем вместе?|Що сьогодні зробимо разом?
assemble|Roboter gestalten|Customize robot|Настроить робота|Налаштувати робота
assembleHelp|Tippe auf ein Teil. Dein Roboter verändert sich sofort.|Tap a part. Your robot changes instantly.|Нажми на деталь — робот сразу изменится.|Натисни на деталь — робот одразу зміниться.
name|Name des Roboters|Robot name|Имя робота|Ім’я робота
color|Farbe der Paneele|Panel color|Цвет панелей|Колір панелей
head|Kopf|Head|Голова|Голова
frame|Körperbau|Body build|Телосложение|Статура
balanced|Ausgewogen|Balanced|Сбалансированное|Збалансована
athletic|Athletisch|Athletic|Атлетичное|Атлетична
slender|Schlank|Slender|Стройное|Струнка
finish|Oberfläche|Finish|Покрытие|Покриття
ceramic|Keramik|Ceramic|Керамика|Кераміка
titanium|Titan|Titanium|Титан|Титан
satin|Satiniert|Satin|Матовый металл|Матовий метал
base|Bewegung|Movement|Передвижение|Пересування
hands|Hände|Hands|Руки|Руки
personality|Art zu sprechen|Speaking style|Характер общения|Характер спілкування
interest|Lieblingsthema|Favorite interest|Любимая тема|Улюблена тема
style|So erkläre ich|How I explain|Как объяснять|Як пояснювати
module|Extra-Modul|Extra module|Дополнительный модуль|Додатковий модуль
arc|Kontur|Contour|Контур|Контур
visor|Visier|Visor|Визор|Візор
antenna|Sensorkopf|Sensor head|Сенсорная голова|Сенсорна голова
feet|Gelenkbeine|Articulated legs|Шарнирные ноги|Шарнірні ноги
wheels|Rollfüße|Roller feet|Роликовые стопы|Роликові стопи
hover|Schwebefüße|Hover feet|Реактивные стопы|Реактивні стопи
round|Fünf Finger|Five fingers|Пять пальцев|П’ять пальців
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
offlinePortable|Eigenständige HTML-Kopie: Alle Laufzeitdateien sind eingebettet. Zur Installation auf dem Startbildschirm nutze die Webversion.|Standalone HTML copy: all runtime assets are embedded. Use the web version to install on your home screen.|Самостоятельная HTML-копия: все ресурсы встроены. Для установки на главный экран используй веб-версию.|Самостійна HTML-копія: усі ресурси вбудовано. Для встановлення на головний екран використовуй вебверсію.
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
about|Schöpferin, Idee und künstlerische Leitung: Natalie Ragulina. Entwicklung mit KI-Unterstützung. Originale 3D-Robotermodelle und synthetische Klänge. Manrope: SIL OFL. Three.js: MIT.|Creator, original idea and art direction: Natalie Ragulina. Developed with AI assistance. Original 3D robot models and synthesized sounds. Manrope: SIL OFL. Three.js: MIT.|Создатель, автор идеи и художественного направления: Natalie Ragulina. Разработка с помощью ИИ. Оригинальные 3D-модели роботов и синтезированные звуки. Manrope: SIL OFL. Three.js: MIT.|Творець, автор ідеї та художнього напряму: Natalie Ragulina. Розробка за допомогою ШІ. Оригінальні 3D-моделі роботів і синтезовані звуки. Manrope: SIL OFL. Three.js: MIT.
portraitCredits|N25x: KI-generiertes Roboterporträt. Originale prozedurale 3D-Geometrie.|N25x: AI-generated robot portrait. Original procedural 3D geometry.|N25x: ИИ-портрет робота. Оригинальная процедурная 3D-геометрия.|N25x: ШІ-портрет робота. Оригінальна процедурна 3D-геометрія.
localHelp|Dein Profil bleibt auf diesem Gerät. Es gibt keine Konten und keine Synchronisierung. Exportiere eine Kopie zum Übertragen.|Your profile stays on this device. There are no accounts or sync. Export a copy to transfer it.|Профиль хранится на этом устройстве. Аккаунтов и синхронизации нет. Для переноса экспортируй копию.|Профіль зберігається на цьому пристрої. Акаунтів і синхронізації немає. Для перенесення експортуй копію.
rights|Alle Rechte vorbehalten.|All rights reserved.|Все права защищены.|Усі права захищені.
webgl|Die 3D-Ansicht ist hier nicht verfügbar. Lernen und Projekte funktionieren weiter.|The 3D view is unavailable here. Learning and projects still work.|3D-вид здесь недоступен. Занятия и проекты продолжают работать.|3D-вигляд тут недоступний. Заняття й проєкти продовжують працювати.
downloaded|Datei bereit.|File ready.|Файл готов.|Файл готовий.
progress|Deine Fortschritte|Your progress|Твои достижения|Твої досягнення
solved|Gelöst|Solved|Решено|Розв’язано
projects|Projekte|Projects|Проекты|Проєкти
newPart|Ein neues Teil wartet auf dich.|A new part is waiting for you.|Тебя ждёт новая деталь.|На тебе чекає нова деталь.
helpHint|Tippe auf N25x, wenn du Hilfe möchtest.|Tap N25x for help.|Нажми на N25x, если нужна помощь.|Натисни на N25x, якщо потрібна допомога.
note|Ton|Note|Нота|Нота
fileError|Die Datei konnte nicht erstellt werden.|The file could not be created.|Не удалось создать файл.|Не вдалося створити файл.
motionHint|Tippen zum Winken. Ansicht optional drehen.|Tap to wave. Rotating the view is optional.|Нажми — робот помашет. Вид можно повернуть.|Натисни — робот помахає. Вигляд можна повернути.
programming|Programmieren & Ausprobieren|Programming & practice|Программирование и практика|Програмування й практика
programmingHelp|Ändere echten Code. Starte ihn und baue danach dein eigenes Spiel.|Change real code. Run it, then build your own game.|Меняй настоящий код. Запускай его, затем создай свою игру.|Змінюй справжній код. Запускай його, потім створи власну гру.
missionHelp|Vorhersagen → ausprobieren → verbessern → selbst gestalten.|Predict → try → improve → create.|Предскажи → попробуй → исправь → создай своё.|Передбач → спробуй → виправ → створи своє.
missionSelect|Dein Lernpfad|Your learning path|Твой путь обучения|Твій шлях навчання
predict|Was liefert das ursprüngliche Programm?|What does the original program return?|Что вернёт исходная программа?|Що поверне початкова програма?
predictionRight|Genau. Jetzt verbessere das Programm für die Aufgabe.|Exactly. Now improve the program for the task.|Верно. Теперь измени программу под задание.|Правильно. Тепер зміни програму під завдання.
predictionWrong|Starte das ursprüngliche Beispiel und beobachte die Werte.|Run the original example and watch the values.|Запусти исходный пример и проследи за значениями.|Запусти початковий приклад і простеж за значеннями.
blocks|Bausteine|Blocks|Блоки|Блоки
codeEditor|JavaScript bearbeiten|Edit JavaScript|Редактировать JavaScript|Редагувати JavaScript
codeScope|Kleiner JavaScript-Lernbereich: Zahlen, true/false, let, if, for, function und return. Ohne Browser- oder Netzwerkbefehle.|Small JavaScript learning area: numbers, true/false, let, if, for, function and return. Browser and network commands are unavailable.|Учебная часть JavaScript: числа, true/false, let, if, for, function и return. Команды браузера и сети недоступны.|Навчальна частина JavaScript: числа, true/false, let, if, for, function і return. Команди браузера й мережі недоступні.
runSample|Beispiel starten|Run example|Запустить пример|Запустити приклад
runTests|Alle Fälle prüfen|Check all cases|Проверить все случаи|Перевірити всі випадки
restoreCode|Code zurücksetzen|Restore code|Вернуть исходный код|Повернути початковий код
expected|Erwartet|Expected|Ожидается|Очікується
actual|Erhalten|Actual|Получено|Отримано
testCases|Prüffälle|Test cases|Проверочные примеры|Перевірочні приклади
testsPassed|Alle Fälle geschafft. Deine Lösung funktioniert!|All cases passed. Your solution works!|Все примеры пройдены. Твоё решение работает!|Усі приклади пройдено. Твоє рішення працює!
testsFailed|Noch nicht alle Fälle stimmen. Vergleiche Erwartung und Ergebnis.|Some cases still fail. Compare the expected and actual results.|Пока не все примеры сходятся. Сравни ожидаемое с результатом.|Поки не всі приклади збігаються. Порівняй очікуване з результатом.
programError|Prüfe Schreibweise und erlaubte Befehle. Lange Schleifen werden angehalten.|Check the syntax and supported commands. Long loops are stopped.|Проверь запись и доступные команды. Длинные циклы останавливаются.|Перевір запис і доступні команди. Довгі цикли зупиняються.
trace|Werte im Ablauf|Values along the way|Значения по шагам|Значення покроково
askRobot|Fragen an N25x|Questions for N25x|Вопросы N25x|Запитання N25x
whyWorks|Erkläre die Idee|Explain the idea|Объясни идею|Поясни ідею
helpNext|Gib mir einen Hinweis|Give me a hint|Дай подсказку|Дай підказку
helpTest|Warum mehrere Tests?|Why several tests?|Зачем несколько проверок?|Навіщо кілька перевірок?
testExplanation|Prüfe normale Eingaben und Sonderfälle, etwa 0 oder eine falsche Antwort. Ein einzelner Treffer beweist die Lösung nicht.|Check ordinary inputs and edge cases such as 0 or a wrong answer. One passing example does not prove a solution.|Проверяй обычные значения и особые случаи: например 0 или неверный ответ. Одного удачного примера мало.|Перевіряй звичайні значення й особливі випадки: наприклад 0 або неправильну відповідь. Одного вдалого прикладу замало.
localTutor|Lokale Lernhilfe mit vorbereiteten Erklärungen. Kein freier KI-Chat.|Local learning help with prepared explanations. No open-ended AI chat.|Локальный помощник с подготовленными объяснениями. Свободного ИИ-чата нет.|Локальний помічник із підготовленими поясненнями. Вільного ШІ-чату немає.
nextMission|Nächster Schritt|Next step|Следующий шаг|Наступний крок
languagesLearn|10 Sprachen entdecken|Explore 10 languages|Изучать 10 языков|Вивчати 10 мов
languageStarter|Startwortschatz: sechs Wörter pro Sprache. Karten, Auswahlübungen und Schreiben. Kein vollständiger Sprachkurs; Umschrift ist eine Lesehilfe.|Starter vocabulary: six words per language. Cards, choices and typing. Not a complete language course; transliteration is a reading aid.|Стартовый словарь: шесть слов на язык. Карточки, выбор ответа и письмо. Это начало курса; транслитерация помогает читать.|Стартовий словник: шість слів на мову. Картки, вибір відповіді та письмо. Це початок курсу; транслітерація допомагає читати.
learningLanguage|Welche Sprache lernst du?|Which language are you learning?|Какой язык изучаешь?|Яку мову вивчаєш?
cardsMode|Karten ansehen|Explore cards|Посмотреть карточки|Переглянути картки
practiceMode|Mich prüfen|Test myself|Проверить себя|Перевірити себе
flip|Umdrehen|Flip|Перевернуть|Перевернути
writeWord|Wort schreiben|Type the word|Написать слово|Написати слово
languageHint|Wähle oder schreibe das Wort in der Lernsprache.|Choose or type the word in the language you are learning.|Выбери или напиши слово на изучаемом языке.|Обери або напиши слово мовою, яку вивчаєш.
starterComplete|Alle sechs Wörter gelöst. Du kannst sie wiederholen oder eigene Lernkarten erstellen.|All six words solved. Review them or make your own flashcards.|Все шесть слов пройдены. Повтори их или создай свои карточки.|Усі шість слів пройдено. Повтори їх або створи свої картки.
schoolLabs|Wissen ausprobieren|Try out knowledge|Практика по предметам|Практика з предметів
schoolLabsHelp|Kurze Originalaufgaben mit Erklärungen: Logik, Physik, Biologie, Geografie und digitale Fähigkeiten.|Short original exercises with explanations: logic, physics, biology, geography and digital skills.|Короткие авторские задания с объяснениями: логика, физика, биология, география и цифровые навыки.|Короткі авторські завдання з поясненнями: логіка, фізика, біологія, географія й цифрові навички.
quiz|Mein Quizspiel|My quiz game|Моя игра-викторина|Моя гра-вікторина
quizHelp|Erfinde 1–8 Fragen, jeweils drei unterschiedliche Antworten. Wähle die richtige und probiere dein Spiel aus.|Write 1–8 questions, each with three different answers. Select the right one and try your game.|Придумай 1–8 вопросов с тремя разными ответами. Отметь правильный и попробуй свою игру.|Придумай 1–8 запитань із трьома різними відповідями. Познач правильну й спробуй свою гру.
quizExample|Was ist 2 + 2?|What is 2 + 2?|Сколько будет 2 + 2?|Скільки буде 2 + 2?
quizPrompt|Deine Frage|Your question|Твой вопрос|Твоє запитання
correctAnswer|Richtige Antwort|Correct answer|Правильный ответ|Правильна відповідь
addQuestion|Frage hinzufügen|Add question|Добавить вопрос|Додати запитання
removeQuestion|Diese Frage entfernen|Remove this question|Убрать этот вопрос|Прибрати це запитання
scoring|Punkte programmieren|Program the scoring|Программировать очки|Програмувати очки
scoringHelp|mark erhält score, correct und points. Richtige Antworten addieren points; falsche behalten score. Die Prüfung startet beide Fälle.|mark receives score, correct and points. Right answers add points; wrong answers keep score. The check runs both cases.|mark получает score, correct и points. Верный ответ добавляет points, неверный сохраняет score. Проверка запускает оба случая.|mark отримує score, correct і points. Правильна відповідь додає points, неправильна зберігає score. Перевірка запускає обидва випадки.
preview|Ausprobieren|Try it|Попробовать|Спробувати
previewTitle|Dein laufendes Projekt|Your running project|Твой работающий проект|Твій робочий проєкт
previewInvalid|Fülle alle Felder aus. Die Antworten müssen verschieden sein; das Punkteprogramm muss die Prüffälle bestehen.|Complete every field. Answers must differ and the scoring program must pass the tests.|Заполни все поля. Ответы должны различаться, а программа очков — проходить проверки.|Заповни всі поля. Відповіді мають відрізнятися, а програма очок — проходити перевірки.
creationInvalid|Fülle den Inhalt aus und beachte das Format im Hinweis.|Add your content and follow the format in the hint.|Добавь свой текст и проверь формат по подсказке.|Додай свій текст і перевір формат за підказкою.
draftSaved|Entwurf automatisch auf diesem Gerät gespeichert.|Draft saved automatically on this device.|Черновик автоматически сохранён на этом устройстве.|Чернетку автоматично збережено на цьому пристрої.
exportGame|Spiel als HTML speichern|Save playable HTML|Скачать рабочий HTML|Завантажити робочий HTML
exportProject|Projektdatei speichern|Save project file|Скачать файл проекта|Завантажити файл проєкту
importProject|Projektdatei öffnen|Open project file|Открыть файл проекта|Відкрити файл проєкту
exchange|Projekte teilen|Share projects|Обмен проектами|Обмін проєктами
exchangeHelp|Speichere ein HTML zum Spielen oder eine Projektdatei zum Weiterbearbeiten. Sende sie selbst an einen Freund. Dein Profil und Punktestand werden nicht mitgesendet.|Save HTML to play or a project file to edit. Send it to a friend yourself. Your profile and points are not included.|Скачай HTML для игры или файл проекта для редактирования. Отправь другу самостоятельно. Профиль и поинты в файл не попадают.|Завантаж HTML для гри або файл проєкту для редагування. Надішли другу самостійно. Профіль і поінти у файл не потрапляють.
chatStatus|Gemeinschaft und Nachrichten sind noch nicht verbunden. Es gibt keine Online-Konten oder vorgetäuschten Mitspieler.|Community and messaging are not connected yet. There are no online accounts or simulated players.|Сообщество и переписка пока не подключены. Онлайн-аккаунтов и вымышленных собеседников нет.|Спільноту й листування поки не підключено. Онлайн-акаунтів і вигаданих співрозмовників немає.
projectImportError|Keine gültige Studio-Projektdatei. Dein Profil wurde nicht verändert.|Not a valid Studio project file. Your profile was not changed.|Это не подходящий файл проекта. Твой профиль не изменён.|Це не відповідний файл проєкту. Твій профіль не змінено.
score|Punkte|Score|Счёт|Рахунок
finishGame|Ergebnis ansehen|See result|Посмотреть результат|Переглянути результат
completeGame|Geschafft!|Complete!|Готово!|Готово!
restart|Neu starten|Restart|Начать заново|Почати заново
pause|Pause|Pause|Пауза|Пауза
startTimer|Start|Start|Старт|Старт
createdWith|Mit N25x erstellt.|Made with N25x.|Создано в N25x.|Створено в N25x.
moreTools|Weitere Werkzeuge|More tools|Другие инструменты|Інші інструменти
creation|Meine Arbeit|My creation|Моя работа|Моя робота
creationHelp|Wähle eines von 21 Werkzeugen. Du schreibst und gestaltest selbst; Vorschau und Dateien entstehen aus deiner Arbeit.|Choose from 21 tools. Write and design it yourself; your work becomes a preview and downloadable files.|Выбери один из 21 инструмента. Ты сам пишешь и создаёшь; из твоей работы получаются просмотр и файлы.|Обери один із 21 інструмента. Ти сам пишеш і створюєш; із твоєї роботи виходять перегляд і файли.
story|Geschichte mit Entscheidungen|Interactive story|История с выбором|Історія з вибором
letter|Brief|Letter|Письмо|Лист
message|Nachricht|Message|Сообщение|Повідомлення
script|Videoskript|Video script|Сценарий ролика|Сценарій ролика
lyrics|Songtext|Song lyrics|Текст песни|Текст пісні
poem|Gedicht|Poem|Стихотворение|Вірш
article|Kurzer Artikel|Short article|Короткая статья|Коротка стаття
comic|Comic-Szenen|Comic scenes|Сцены комикса|Сцени коміксу
greeting|Grußkarte|Greeting card|Открытка|Листівка
webpage|Meine Webseite|My webpage|Моя веб-страница|Моя вебсторінка
checklist|Nützliche Checkliste|Useful checklist|Полезный чек-лист|Корисний чекліст
timer|Mein Fokus-Timer|My focus timer|Мой таймер занятий|Мій таймер занять
flashcards|Eigene Lernkarten|My flashcards|Свои учебные карточки|Свої навчальні картки
badge|Mein Abzeichen|My badge|Мой значок|Мій значок
sticker|Bewegter Sticker|Animated sticker|Анимированный стикер|Анімований стікер
mindmap|Ideenkarte|Idea map|Карта идей|Карта ідей
plan|Mein Tagesplan|My day plan|Мой план дня|Мій план дня
contentText|Dein Inhalt|Your content|Твой текст|Твій текст
writingHint|Schreibe deinen Text. Beginne mit einer Idee, füge Details hinzu und überarbeite den Schluss.|Write your text. Start with one idea, add details and revise the ending.|Напиши свой текст. Начни с идеи, добавь детали и отредактируй завершение.|Напиши свій текст. Почни з ідеї, додай деталі й відредагуй завершення.
linesHint|Ein Eintrag pro Zeile, höchstens 24. Für Comics: eine Szene pro Zeile. Für Ideenkarten: Thema zuerst, dann Zweige.|One item per line, up to 24. Comics: one scene per line. Idea maps: topic first, then branches.|Один пункт на строку, до 24. Комикс: одна сцена на строку. Карта идей: сначала тема, затем ветви.|Один пункт на рядок, до 24. Комікс: одна сцена на рядок. Карта ідей: спочатку тема, потім гілки.
flashcardHint|Pro Zeile: Vorderseite, ein senkrechter Strich, Rückseite. Höchstens 20 Karten.|Each line: front, a vertical bar, back. Up to 20 cards.|В каждой строке: лицевая сторона, вертикальная черта, обратная сторона. До 20 карточек.|У кожному рядку: лицьова сторона, вертикальна риска, зворотна сторона. До 20 карток.
timerHint|Gib die Minuten ein: eine ganze Zahl von 1 bis 60.|Enter the minutes: a whole number from 1 to 60.|Введи время в минутах: целое число от 1 до 60.|Введи час у хвилинах: ціле число від 1 до 60.
badgeHint|Schreibe bis zu 24 Zeichen für deinen Sticker oder dein Abzeichen.|Write up to 24 characters for your sticker or badge.|Напиши до 24 символов для стикера или значка.|Напиши до 24 символів для стікера або значка.
accentColor|Akzentfarbe|Accent color|Цвет акцента|Колір акценту
cyan|Eisblau|Ice blue|Ледяной голубой|Крижаний блакитний
violet|Violett|Violet|Фиолетовый|Фіолетовий
introStory|Beginn der Geschichte|Story opening|Начало истории|Початок історії
choiceA|Erste Entscheidung|First choice|Первый выбор|Перший вибір
choiceB|Zweite Entscheidung|Second choice|Второй выбор|Другий вибір
endingA|Erstes Ende|First ending|Первая концовка|Перша кінцівка
endingB|Zweites Ende|Second ending|Вторая концовка|Друга кінцівка
storySeed|N25x findet ein Signal im Garten. Wo sucht der Roboter zuerst?|N25x finds a signal in the garden. Where does the robot look first?|N25x находит сигнал в саду. Где робот будет искать сначала?|N25x знаходить сигнал у саду. Де робот шукатиме спочатку?
choiceSeedA|Die Pflanzen untersuchen|Examine the plants|Осмотреть растения|Оглянути рослини
choiceSeedB|Das Terminal prüfen|Check the terminal|Проверить терминал|Перевірити термінал
endingSeedA|Zwischen den Blättern liegt ein Sensor. Die beiden verbinden ihn wieder mit dem Netz.|A sensor lies between the leaves. They reconnect it to the network.|Между листьями лежит датчик. Герои возвращают его в сеть.|Між листям лежить датчик. Герої повертають його в мережу.
endingSeedB|N25x liest die Meldung: Der Gartensensor braucht eine neue Batterie. Im Werkzeugkasten liegt eine.|N25x reads the alert: the garden sensor needs a new battery. There is one in the toolbox.|N25x читает сообщение: датчику сада нужна новая батарейка. Одна есть среди инструментов.|N25x читає повідомлення: датчику саду потрібна нова батарейка. Одна є серед інструментів.
checklistSeed|Eine Idee wählen; Einen Versuch machen; Das Ergebnis prüfen|Choose an idea; Try it out; Check the result|Выбрать идею; Попробовать; Проверить результат|Обрати ідею; Спробувати; Перевірити результат
piano|Klavier und Komposition|Piano and composition|Пианино и композиция|Піаніно та композиція
pianoHelp|Spiele mit Tasten oder mehreren Fingern. Nimm eine Melodie auf, ergänze Stimmen und bearbeite jede Note.|Play with keys or multiple fingers. Record a melody, add parts and edit every note.|Играй клавишами или несколькими пальцами. Записывай мелодию, добавляй партии и редактируй каждую ноту.|Грай клавішами або кількома пальцями. Записуй мелодію, додавай партії й редагуй кожну ноту.
bass|Bass|Bass|Бас|Бас
bell|Glocke|Bell|Колокольчик|Дзвіночок
editNotes|Noten bearbeiten|Edit notes|Редактировать ноты|Редагувати ноти
pianoRoll|Zeitachse der gewählten Spur|Timeline of the selected track|Ноты выбранной дорожки на временной шкале|Ноти обраної доріжки на часовій шкалі
beat|Schlag|Beat|Доля|Доля
duration|Dauer in Schlägen|Duration in beats|Длительность в долях|Тривалість у долях
applyNote|Änderung übernehmen|Apply note changes|Изменить ноту|Змінити ноту
addNote|Note hinzufügen|Add note|Добавить ноту|Додати ноту
newNote|Neue Note|New note|Новая нота|Нова нота
recording|Aufnahme läuft · Stoppen|Recording · stop|Идёт запись · остановить|Триває запис · зупинити
record|Aufnehmen|Record|Записать|Записати
bars|Takte · 4 Schläge|Bars · 4 beats|Такты · по 4 доли|Такти · по 4 долі
quantization|Raster in Schlägen|Snap in beats|Привязка в долях|Прив’язка в долях
off|Aus|Off|Выкл.|Вимк.
metronome|Metronom bei Aufnahme|Metronome while recording|Метроном при записи|Метроном під час запису
track|Spur|Track|Дорожка|Доріжка
instrument|Instrument|Instrument|Инструмент|Інструмент
addTrack|Spur hinzufügen|Add track|Добавить дорожку|Додати доріжку
octave|Oktave|Octave|Октава|Октава
keysLeft|Tasten nach links|Scroll keys left|Клавиши влево|Клавіші ліворуч
keysRight|Tasten nach rechts|Scroll keys right|Клавиши вправо|Клавіші праворуч
pianoKeysHelp|Wische die Tastatur seitlich. Am Computer: A W S E D F T G Y H U J K. Die Oktave ist wählbar.|Swipe the keyboard sideways. On a computer: A W S E D F T G Y H U J K. Select the octave above.|Клавиатуру можно листать вбок. На компьютере: A W S E D F T G Y H U J K. Октава выбирается сверху.|Клавіатуру можна гортати вбік. На комп’ютері: A W S E D F T G Y H U J K. Октава обирається зверху.
notesCount|Noten in der Komposition|notes in the composition|нот в композиции|нот у композиції
renderingAudio|Audiodatei wird erstellt…|Rendering audio…|Создаётся аудиофайл…|Створюється аудіофайл…
exportMidi|MIDI herunterladen|Download MIDI|Скачать MIDI|Завантажити MIDI
pianoExample|Originalbeispiel laden|Load original example|Загрузить авторский пример|Завантажити авторський приклад
pianoSoundNote|Originale synthetische Klavier-, Bass- und Glockenklänge. Bis zu 4 Spuren, 64 Takte und 2048 Noten. Lautstärke unter Einstellungen.|Original synthesized piano, bass and bell sounds. Up to 4 tracks, 64 bars and 2048 notes. Volume is in Settings.|Оригинальные синтезированные звуки пианино, баса и колокольчика. До 4 дорожек, 64 тактов и 2048 нот. Громкость — в настройках.|Оригінальні синтезовані звуки піаніно, баса й дзвіночка. До 4 доріжок, 64 тактів і 2048 нот. Гучність — у налаштуваннях.
scoreLimit|Prüfe Tonhöhe, Start und Dauer. Maximal 4 Spuren und 2048 Noten innerhalb der gewählten Takte.|Check pitch, start and duration. Maximum 4 tracks and 2048 notes within the selected bars.|Проверь высоту, начало и длительность. До 4 дорожек и 2048 нот в пределах выбранных тактов.|Перевір висоту, початок і тривалість. До 4 доріжок і 2048 нот у межах обраних тактів.
barsTooShort|Vorhandene Noten reichen über diese Taktzahl hinaus.|Existing notes extend beyond this number of bars.|Существующие ноты выходят за это число тактов.|Наявні ноти виходять за цю кількість тактів.
languageCourse|Sprachunterricht|Language lessons|Языковые уроки|Мовні уроки
languageCourseHelp|Aufeinanderfolgende Themen, ganze Sätze und drei Offline-Übungsformen|Sequential topics, complete sentences and three offline exercise forms|Последовательные темы, полные предложения и три вида офлайн-практики|Послідовні теми, повні речення й три види офлайн-практики
languageInventory|{units} Themen · {n} Originalaussagen pro Sprache. Lesen, Schreiben und Satzbau; Hören bei lokaler Stimme.|{units} topics · {n} source sentences per language. Reading, writing and word order; listening with a local voice.|{units} тем · {n} исходных реплик на язык. Чтение, письмо, порядок слов; аудирование при наличии локального голоса.|{units} тем · {n} вихідних реплік на мову. Читання, письмо, порядок слів; аудіювання за наявності локального голосу.
sourcePhrases|Ausgangssätze|source sentences|исходных реплик|вихідних реплік
completedExercises|Übungen abgeschlossen|exercises completed|упражнений выполнено|вправ виконано
chooseLesson|Lektion wählen|Choose a lesson|Выбрать урок|Обрати урок
meaningLanguage|Übersetzungssprache|Translation language|Язык перевода|Мова перекладу
sameAsApp|Sprache der Oberfläche|Interface language|Язык интерфейса|Мова інтерфейсу
lessonExplanation|Erklärung der Lektion|Lesson explanation|Объяснение урока|Пояснення уроку
mode_read|Lesen|Read|Чтение|Читання
mode_write|Schreiben|Write|Письмо|Письмо
mode_order|Satzbau|Word order|Порядок слов|Порядок слів
mode_listen|Hören|Listen|Аудирование|Аудіювання
chooseMeaning|Wähle die Bedeutung des Satzes.|Choose the meaning of the sentence.|Выбери значение предложения.|Обери значення речення.
orderSentence|Baue den Satz aus den Wörtern zusammen.|Build the sentence from the words.|Собери предложение из слов.|Склади речення зі слів.
listenPhrase|Satz anhören|Listen to the sentence|Прослушать предложение|Прослухати речення
writeStudiedPhrase|Schreibe die gelernte Wendung. Großschreibung und Satzzeichen sind optional.|Write the studied phrase. Capitalization and punctuation are optional.|Напиши изучаемую реплику. Регистр и знаки препинания необязательны.|Напиши репліку, яку вивчаєш. Регістр і розділові знаки необов’язкові.
showPhrase|Satz zeigen|Show the sentence|Показать реплику|Показати репліку
deviceVoice|Die installierte lokale Stimme deines Geräts liest vor.|Your device's installed local voice reads the sentence.|Читает установленный локальный голос твоего устройства.|Читає встановлений локальний голос твого пристрою.
voiceUnavailable|Keine lokale Stimme für diese Sprache gefunden. Lesen, Schreiben und Satzbau funktionieren ohne sie.|No local voice was found for this language. Reading, writing and word order work without it.|Для этого языка не найден локальный голос. Чтение, письмо и порядок слов работают без него.|Для цієї мови не знайдено локального голосу. Читання, письмо й порядок слів працюють без нього.
languageScopeNote|Aktuell: Einstiegsmaterial mit KI-Unterstützung, noch ohne Prüfung durch Muttersprachler. Der vollständige Weg bis C1 wird weiterentwickelt und ist noch nicht fertig.|Current material is introductory and AI-assisted, awaiting native-speaker review. The complete path to C1 is in development and is not finished.|Сейчас доступны начальные материалы с ИИ-помощью, пока без проверки носителями. Полный путь до C1 находится в разработке и ещё не готов.|Зараз доступні початкові матеріали з ШІ-допомогою, поки без перевірки носіями. Повний шлях до C1 розробляється й ще не готовий.
listenSoundOff|Aktiviere den Ton in den Einstellungen.|Enable sound in Settings.|Включи звук в настройках.|Увімкни звук у налаштуваннях.
extraExercises|Weitere Übungen|More exercises|Дополнительные упражнения|Додаткові вправи
starterCards|Erste Wortkarten|Starter word cards|Первые словарные карточки|Перші словникові картки
`;
export const TEXT=Object.fromEntries(['de','en','ru','uk'].map(l=>[l,{}]));
for(const line of rows.trim().split('\n')){const [key,...values]=line.split('|');if(values.length!==4)throw Error('translation '+key);if(Object.hasOwn(TEXT.de,key))throw Error('Duplicate translation '+key);Object.keys(TEXT).forEach((l,i)=>TEXT[l][key]=values[i]);}
export function translate(lang,key,params={}){let text=TEXT[lang]?.[key];if(text===undefined)throw Error('Missing text '+lang+':'+key);return text.replace(/\{(\w+)\}/g,(_,k)=>String(params[k]??''));}

const studyCopy={
de:{studyProgress:'Mein Lernfortschritt',studyProgressNote:'Abgeschlossene Übungen, keine Einstufung oder Prüfung. Hörübungen sind optional.',studyMathDetail:'{topics} Themen geübt · {review} Fehler zur Wiederholung',studyLanguageDetail:'Lesen, Schreiben, Satzbau · {review} offene Wiederholungen',studyProgramDetail:'Missionen mit bestandenen Prüfeingaben'},
en:{studyProgress:'My learning progress',studyProgressNote:'Completed exercises, not a proficiency rating. Listening is optional.',studyMathDetail:'{topics} topics practised · {review} mistakes to review',studyLanguageDetail:'Reading, writing, word order · {review} reviews due',studyProgramDetail:'Missions with passing test inputs'},
ru:{studyProgress:'Мой учебный прогресс',studyProgressNote:'Выполненные упражнения, не оценка уровня знаний. Аудирование необязательно.',studyMathDetail:'Тем в практике: {topics} · Ошибок для повторения: {review}',studyLanguageDetail:'Чтение, письмо, порядок слов · Повторить: {review}',studyProgramDetail:'Миссии с успешно пройденными тестами'},
uk:{studyProgress:'Мій навчальний прогрес',studyProgressNote:'Виконані вправи, не оцінка рівня знань. Аудіювання необов’язкове.',studyMathDetail:'Тем опрацьовано: {topics} · Помилок для повторення: {review}',studyLanguageDetail:'Читання, письмо, порядок слів · Повторити: {review}',studyProgramDetail:'Місії з успішно пройденими тестами'}};
for(const [lang,copy] of Object.entries(studyCopy))Object.assign(TEXT[lang],copy);

for(const [key,values] of Object.entries({"courseStages":["Stufen","stages","ступеней","ступенів"],"courseStage":["Lernstufe","Learning stage","Учебная ступень","Навчальний ступінь"],"guidedScope":["Geführte Übungen mit Erklärungen; kein vollständiger Lehrplan.","Guided practice with explanations; not a complete curriculum.","Практика по ступеням с объяснениями; не полная учебная программа.","Практика за ступенями з поясненнями; не повна навчальна програма."],"mathStage1":["1 · Grundlagen (1–3)","1 · Foundations (1–3)","1 · Основы (1–3)","1 · Основи (1–3)"],"mathStage2":["2 · Aufbau (4–6)","2 · Development (4–6)","2 · Развитие (4–6)","2 · Розвиток (4–6)"],"mathStage3":["3 · Vertiefung (7–9)","3 · Intermediate (7–9)","3 · Углубление (7–9)","3 · Поглиблення (7–9)"],"mathStage4":["4 · Oberstufenpraxis (10–11)","4 · Upper secondary practice (10–11)","4 · Старшая школа (10–11)","4 · Старша школа (10–11)"],"langStage1":["1 · Einstieg","1 · Getting started","1 · Начало","1 · Початок"],"langStage2":["2 · Alltag","2 · Everyday life","2 · Повседневная жизнь","2 · Повсякденне життя"],"langStage3":["3 · Zusammenhängende Aussagen","3 · Connected statements","3 · Связные высказывания","3 · Зв’язні висловлювання"],"guidedSubjects":["Fachkurse · Logik, Natur, Technik und Musik","Subject courses · logic, science, technology and music","Предметные курсы · логика, науки, технологии и музыка","Предметні курси · логіка, науки, технології та музика"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [i,lang] of ['de','en','ru','uk'].entries())TEXT[lang].langStage4=['4 · Probleme und Entscheidungen','4 · Problems and decisions','4 · Проблемы и решения','4 · Проблеми й рішення'][i];

for(const [key,values] of Object.entries({"stageCheckpoint":["Stufentest","Stage checkpoint","Проверка ступени","Перевірка ступеня"],"checkpointResult":["Ergebnis: {n} / {total}","Result: {n} / {total}","Результат: {n} / {total}","Результат: {n} / {total}"],"checkpointPassed":["Alle Antworten richtig. Stufe geprüft.","All answers correct. Checkpoint passed.","Все ответы верны. Проверка пройдена.","Усі відповіді правильні. Перевірку пройдено."],"checkpointRetry":["Übe die Stufe erneut und versuche es noch einmal.","Practise this stage and try again.","Повтори ступень и попробуй ещё раз.","Повтори ступінь і спробуй ще раз."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"guidedNext":["Empfohlener nächster Schritt","Recommended next step","Рекомендуемый следующий шаг","Рекомендований наступний крок"],"guidedReview":["Wiederhole zuerst einen Fehler in deiner gewählten Sprache.","First review a mistake in your selected language.","Сначала повтори ошибку в выбранном языке.","Спочатку повтори помилку у вибраній мові."],"guidedNew":["Übe die nächste noch nicht abgeschlossene Fertigkeit.","Practise the next unfinished skill.","Тренируй следующий ещё не завершённый навык.","Тренуй наступну ще не завершену навичку."],"guidedComplete":["Alle Kernübungen abgeschlossen. Du kannst frei wiederholen.","All core exercises completed. You can freely review.","Все основные упражнения выполнены. Можно повторять свободно.","Усі основні вправи виконано. Можна вільно повторювати."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"scheduledDue":["Fällige Wiederholungen: {n}","Reviews due: {n}","Повторений на сегодня: {n}","Повторень на сьогодні: {n}"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"grammarCourse":["Grammatik-Werkstatt","Grammar classroom","Грамматический практикум","Граматичний практикум"],"grammarPassed":["Geprüfte Themen: {n} / {total}","Checkpoints passed: {n} / {total}","Тем проверено: {n} / {total}","Тем перевірено: {n} / {total}"],"grammarPracticeDone":["Übung abgeschlossen. Jetzt andere Beispiele ohne Hilfe prüfen.","Practice complete. Try different examples without help.","Практика завершена. Проверь знания на других примерах без подсказок.","Практику завершено. Перевір знання на інших прикладах без підказок."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"grammarStage1":["1 · Grundlagen","1 · Foundations","1 · Основы","1 · Основи"],"grammarStage2":["2 · Aufbau","2 · Development","2 · Развитие","2 · Розвиток"],"grammarStage3":["3 · Zusammenhänge","3 · Connections","3 · Связная речь","3 · Зв'язне мовлення"],"grammarStage4":["4 · Komplexe Strukturen","4 · Complex structures","4 · Сложные конструкции","4 · Складні конструкції"],"grammarStage5":["5 · Vertiefung","5 · Advanced practice","5 · Углубление","5 · Поглиблення"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"pianoPractice":["Klavier-Lernpfad","Piano learning path","Учебный курс пианино","Навчальний курс піаніно"],"pianoPracticeScope":["Spiele die Noten in der angegebenen Reihenfolge. Rhythmus und Fingersatz werden noch nicht bewertet. Deine Komposition bleibt unverändert.","Play notes in the shown order. Timing and fingering are not graded yet. Your composition stays unchanged.","Сыграй ноты в указанном порядке. Ритм и аппликатура пока не оцениваются. Твоя композиция не изменится.","Зіграй ноти в указаному порядку. Ритм і аплікатура поки не оцінюються. Твоя композиція не зміниться."],"pianoPracticeStart":["Übung starten","Start exercise","Начать упражнение","Почати вправу"],"pianoPracticeListen":["Beispiel anhören","Listen to example","Прослушать пример","Прослухати приклад"],"pianoPracticeExit":["Übung verlassen","Exit exercise","Выйти из упражнения","Вийти з вправи"],"pianoPracticePrompt":["Spiele die markierte Note.","Play the highlighted note.","Сыграй выделенную ноту.","Зіграй виділену ноту."],"pianoPracticePassed":["Alle Noten richtig gespielt.","All notes played correctly.","Все ноты сыграны правильно.","Усі ноти зіграно правильно."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"rhythmCourse":["Rhythmus-Lernpfad","Rhythm learning path","Учебный курс ритма","Навчальний курс ритму"],"rhythmScope":["Höre das Muster an. Starte dann die Übung und tippe im gleichen Zeitmuster. Der erste Tipp setzt den Zeitnullpunkt. Bewertet werden Anschläge, nicht Notenlängen.","Listen to the pattern, then start and tap in the same timing. The first tap sets time zero. Onsets are assessed, not note lengths.","Прослушай образец, затем начни упражнение и нажимай в том же ритме. Первое нажатие задаёт начало отсчёта. Проверяется момент нажатия, а не длительность нот.","Прослухай зразок, потім почни вправу й натискай у тому самому ритмі. Перше натискання задає початок відліку. Оцінюється момент натискання, а не тривалість нот."],"rhythmTolerance":["Toleranz ±{n} ms","Tolerance ±{n} ms","Допуск ±{n} мс","Допуск ±{n} мс"],"rhythmGaps":["Abstände in Schlägen","Gaps in beats","Интервалы в долях","Інтервали в долях"],"rhythmTap":["Tippen","Tap","Нажать","Натиснути"],"rhythmCount":["Anschläge: {n} / {total}","Taps: {n} / {total}","Нажатия: {n} / {total}","Натискання: {n} / {total}"],"rhythmPassed":["Rhythmus geschafft: {n} / {total}","Rhythm passed: {n} / {total}","Ритм пройден: {n} / {total}","Ритм пройдено: {n} / {total}"],"rhythmRetry":["Noch einmal üben: {n} / {total}","Try again: {n} / {total}","Повтори: {n} / {total}","Повтори: {n} / {total}"],"rhythmErrors":["Zeitabweichungen (früh − / spät +)","Timing errors (early − / late +)","Отклонения (раньше − / позже +)","Відхилення (раніше − / пізніше +)"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"earCourse":["Gehörbildung: Intervalle","Ear training: intervals","Музыкальный слух: интервалы","Музичний слух: інтервали"],"earScope":["Höre zwei aufeinanderfolgende Töne und erkenne ihren Abstand. Alle Antworten müssen stimmen, um eine Stufe abzuschließen. Kein Mikrofon nötig.","Listen to two successive notes and identify their interval. All answers must be correct to complete a stage. No microphone needed.","Прослушай две последовательные ноты и определи интервал. Для завершения ступени нужны все правильные ответы. Микрофон не требуется.","Прослухай дві послідовні ноти й визнач інтервал. Для завершення ступеня потрібні всі правильні відповіді. Мікрофон не потрібен."],"earStartHint":["Wähle eine Stufe und beginne.","Choose a stage and start.","Выбери ступень и начни.","Обери ступінь і почни."],"earListen":["Töne anhören","Listen to notes","Прослушать ноты","Прослухати ноти"],"earListenFirst":["Höre zuerst die zwei Töne.","Listen to both notes first.","Сначала прослушай две ноты.","Спочатку прослухай дві ноти."],"earChoose":["Welches Intervall hörst du?","Which interval do you hear?","Какой интервал ты слышишь?","Який інтервал ти чуєш?"],"earUnavailable":["Aktiviere Ton und Lautstärke. Wenn kein Ton verfügbar ist, kann diese Übung nicht bewertet werden.","Enable sound and volume. If audio is unavailable, this exercise cannot be assessed.","Включи звук и громкость. Если звук недоступен, упражнение нельзя оценить.","Увімкни звук і гучність. Якщо звук недоступний, вправу не можна оцінити."],"earPassed":["Geschafft: {n} / {total}","Passed: {n} / {total}","Пройдено: {n} / {total}","Пройдено: {n} / {total}"],"earRetry":["Noch einmal üben: {n} / {total}","Practise again: {n} / {total}","Повтори упражнение: {n} / {total}","Повтори вправу: {n} / {total}"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"staffCourse":["Notenlesen am Klavier","Piano staff reading","Чтение нот на фортепиано","Читання нот на фортепіано"],"staffScope":["Lies die einzelne Note und spiele die passende Klaviertaste. Nur ein fehlerfreier Durchgang zählt als abgeschlossen. Deine Komposition bleibt unverändert.","Read one written note and play its piano key. Only an error-free round completes the stage. Your composition stays unchanged.","Прочитай ноту и нажми соответствующую клавишу. Ступень засчитывается при прохождении без ошибок. Композиция не изменяется.","Прочитай ноту та натисни відповідну клавішу. Ступінь зараховується за проходження без помилок. Композиція не змінюється."],"staffVisual":["Eine Note auf dem Notensystem","One note on the staff","Одна нота на нотном стане","Одна нота на нотному стані"],"staffStartHint":["Wähle eine Stufe und beginne.","Choose a stage and start.","Выбери ступень и начни.","Обери ступінь і почни."],"staffChoose":["Spiele die gezeigte Note.","Play the written note.","Сыграй изображённую ноту.","Зіграй зображену ноту."],"staffTreble":["Violinschlüssel (G): untere Linie E4.","Treble clef (G): bottom line E4.","Скрипичный ключ (соль): нижняя линия ми первой октавы (E4).","Скрипковий ключ (соль): нижня лінія мі першої октави (E4)."],"staffBass":["Bassschlüssel (F): untere Linie G2.","Bass clef (F): bottom line G2.","Басовый ключ (фа): нижняя линия соль большой октавы (G2).","Басовий ключ (фа): нижня лінія соль великої октави (G2)."],"staffPassed":["Fehlerfrei geschafft: {n} / {total}","Passed without mistakes: {n} / {total}","Пройдено без ошибок: {n} / {total}","Пройдено без помилок: {n} / {total}"],"staffRetry":["Alle Noten gespielt. Fehler: {errors}. Wiederhole für einen fehlerfreien Durchgang.","All notes played. Mistakes: {errors}. Repeat for an error-free round.","Все ноты сыграны. Ошибок: {errors}. Повтори для прохождения без ошибок.","Усі ноти зіграно. Помилок: {errors}. Повтори для проходження без помилок."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"chordCourse":["Gehörbildung: Akkorde","Ear training: chords","Музыкальный слух: аккорды","Музичний слух: акорди"],"chordScope":["Höre gleichzeitig gespielte Akkordtöne in Grundstellung. Erkenne den Akkordtyp unabhängig vom Grundton. Alle Antworten müssen stimmen.","Listen to simultaneous chord tones in root position. Identify the chord quality regardless of root pitch. All answers must be correct.","Прослушай одновременно звучащие ноты аккорда в основном виде. Определи его тип независимо от высоты основного тона. Для прохождения нужны все правильные ответы.","Прослухай одночасні ноти акорду в основному виді. Визнач тип незалежно від висоти основного тону. Для проходження потрібні всі правильні відповіді."],"chordReference":["Beispiele auf C zum Anhören:","Listen to examples built on C:","Прослушай примеры аккордов от до:","Прослухай приклади акордів від до:"],"chordChoose":["Welchen Akkordtyp hörst du?","Which chord quality do you hear?","Какой тип аккорда ты слышишь?","Який тип акорду ти чуєш?"],"chordListenFirst":["Höre zuerst den Akkord.","Listen to the chord first.","Сначала прослушай аккорд.","Спочатку прослухай акорд."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"harmonyCourse":["Harmonielehre: Akkorde bauen","Harmony: build chords","Гармония: построение аккордов","Гармонія: побудова акордів"],"harmonyScope":["Wähle die Töne des angegebenen Akkords auf der Tastatur einzeln aus (erneut drücken zum Abwählen), dann prüfe. Die Oktavlage und Umkehrung zählen; gleichzeitiges Spielen ist nicht nötig.","Select the chord tones on the keyboard one at a time (press again to deselect), then check. Register and inversion matter; simultaneous playing is not required.","Выбери ноты аккорда на клавиатуре по одной (повторное нажатие снимает выбор), затем проверь. Учитываются октава и обращение; одновременное нажатие не требуется.","Обери ноти акорду на клавіатурі по одній (повторне натискання знімає вибір), потім перевір. Враховуються октава й обернення; одночасне натискання не потрібне."],"harmonyStartHint":["Wähle eine Akkordfolge.","Choose a chord progression.","Выбери последовательность аккордов.","Обери послідовність акордів."],"harmonyInversion":["Umkehrung: {n} (0 = Grundstellung)","Inversion: {n} (0 = root position)","Обращение: {n} (0 — основной вид)","Обернення: {n} (0 — основний вид)"],"harmonyFormula":["Halbtöne ab Grundton (Grundstellung)","Semitones above root (root position)","Полутоны от основного тона (основной вид)","Півтони від основного тону (основний вид)"],"harmonySelected":["Ausgewählte Töne","Selected notes","Выбранные ноты","Обрані ноти"],"harmonyClear":["Auswahl löschen","Clear selection","Очистить выбор","Очистити вибір"],"harmonyTryAgain":["Ändere die ausgewählten Töne.","Adjust the selected notes.","Исправь выбранные ноты.","Виправ обрані ноти."],"harmonyRetry":["Folge beendet, Fehler: {errors}. Wiederhole fehlerfrei.","Progression completed, mistakes: {errors}. Repeat without mistakes.","Последовательность завершена, ошибок: {errors}. Повтори без ошибок.","Послідовність завершено, помилок: {errors}. Повтори без помилок."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"studyGrammarDetail":["Bestandene Grammatik-Kontrollen","Passed grammar checkpoints","Пройденные контрольные по грамматике","Пройдені контрольні з граматики"],"studySchoolDetail":["Aufgaben aus {subjects} Fachkursen","Tasks across {subjects} subject courses","Задания в {subjects} предметных курсах","Завдання у {subjects} предметних курсах"],"studyMusicDetail":["Abgeschlossene Übungsstufen: Klavier, Rhythmus, Gehör, Noten und Harmonie","Completed practice stages: piano, rhythm, ear, notation and harmony","Пройденные ступени: фортепиано, ритм, слух, ноты и гармония","Пройдені ступені: фортепіано, ритм, слух, ноти й гармонія"],"studyProjectsDetail":["Gespeicherte eigene Projekte: {n}","Saved personal projects: {n}","Сохранённые собственные проекты: {n}","Збережені власні проєкти: {n}"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({robotExploded:['Explosionsansicht','Exploded view','Разборка модели','Розбирання моделі'],robotAssembled:['Zusammenbauen','Reassemble','Собрать модель','Зібрати модель']}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"aiCodeLab":["KI-Code-Labor","AI Code Lab","Лаборатория кода и ИИ","Лабораторія коду та ШІ"],"aiCodeScope":["Prüfe deinen Entwurf ohne Punkte oder Änderungen. KI-Hinweise ersetzen keine Tests.","Review your draft without points or changes. AI advice does not replace tests.","Проверь черновик без изменения кода и баллов. Совет ИИ не заменяет тест.","Перевір чернетку без зміни коду й балів. Порада ШІ не замінює тест."],"aiReview":["Code prüfen","Review code","Проверить код","Перевірити код"],"aiExportPrompt":["KI-Anfrage exportieren","Export AI prompt","Экспорт запроса для ИИ","Експорт запиту для ШІ"],"aiGenerate":["Lokale KI fragen","Ask on-device AI","Спросить локальный ИИ","Запитати локальний ШІ"],"aiCancel":["Abbrechen","Cancel","Отмена","Скасувати"],"aiModelScope":["Nur bereits verfügbare Browser-KI (Deutsch/Englisch); kein automatischer Download. Exportiere keine persönlichen Daten oder Geheimnisse.","Already-ready browser AI only (English/German); no automatic download. Do not export personal data or secrets.","Только уже доступная модель браузера (английский/немецкий), без автозагрузки. Не экспортируй личные данные или секреты.","Лише вже доступна модель браузера (англійська/німецька), без автозавантаження. Не експортуй особисті дані або секрети."],"aiFirstFailure":["Erster fehlerhafter Test","First failing test","Первый непройденный тест","Перший непройдений тест"],"aiAllPass":["Alle vorhandenen Tests bestanden. Weitere Grenzfälle prüfen.","All existing tests pass. Check additional boundary cases.","Все имеющиеся тесты пройдены. Проверь дополнительные граничные случаи.","Усі наявні тести пройдено. Перевір додаткові граничні випадки."],"aiWorking":["Lokale KI arbeitet…","On-device AI is working…","Локальный ИИ обрабатывает запрос…","Локальний ШІ обробляє запит…"],"aiGenerated":["KI-Vorschlag – bitte prüfen","AI suggestion — verify it","Совет ИИ — проверь результат","Порада ШІ — перевір результат"],"aiUnavailable":["Lokale KI nicht verfügbar. Codeprüfung und Anfrageexport bleiben nutzbar.","On-device AI unavailable. Code review and prompt export still work.","Локальный ИИ недоступен. Проверка кода и экспорт запроса работают.","Локальний ШІ недоступний. Перевірка коду та експорт запиту працюють."],"aiCancelled":["Abgebrochen","Cancelled","Отменено","Скасовано"],"aiError":["KI-Anfrage fehlgeschlagen. Versuche die Codeprüfung.","AI request failed. Use code review.","Запрос к ИИ не выполнен. Используй проверку кода.","Запит до ШІ не виконано. Скористайся перевіркою коду."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({ipNoticeTitle:['Rechtehinweis N25X','N25X rights notice','Права на N25X','Права на N25X'],ipNotice:['Geschützte Originalmaterialien: keine unerlaubte Weiterverbreitung, kommerzielle Nutzung oder Aneignung. Gesetzliche Ausnahmen und Drittanbieter-Lizenzen bleiben bestehen.','Protected original materials: no unauthorized redistribution, commercial reuse or passing off. Legal exceptions and third-party licenses remain valid.','Охраняемые оригинальные материалы: не разрешены несанкционированное распространение, коммерческое использование и присвоение авторства. Законные исключения и лицензии третьих лиц сохраняются.','Охоронювані оригінальні матеріали: не дозволено несанкціоноване поширення, комерційне використання та привласнення авторства. Законні винятки й ліцензії третіх осіб залишаються чинними.']}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"customTest":["Eigener Testfall","Custom test case","Собственный тест","Власний тест"],"customTestScope":["JSON-Liste mit Zahlen oder true/false; erwarteter Wert als Zahl oder true/false. Keine Punkte.","JSON array of numbers or true/false; expected number or true/false. No points.","Массив JSON из чисел или true/false; ожидаемое число или true/false. Без начисления баллов.","Масив JSON із чисел або true/false; очікуване число або true/false. Без нарахування балів."],"customArgs":["Argumente (JSON)","Arguments (JSON)","Аргументы (JSON)","Аргументи (JSON)"],"customRun":["Eigenen Test ausführen","Run custom test","Выполнить свой тест","Виконати власний тест"],"customPass":["Eigener Test bestanden","Custom test passed","Собственный тест пройден","Власний тест пройдено"],"customFail":["Ergebnis weicht ab","Result differs","Результат отличается","Результат відрізняється"],"customInvalid":["Ungültige JSON-Werte oder Anzahl der Argumente","Invalid JSON values or argument count","Неверный JSON или число аргументов","Некоректний JSON або кількість аргументів"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"apiLabTitle":["API-Labor · REST und JSON","API Lab · REST and JSON","API-лаборатория · REST и JSON","API-лабораторія · REST і JSON"],"apiLabScope":["Lokaler Übungsserver im Arbeitsspeicher. Keine Netzwerkverbindung, kein Konto, keine dauerhafte Datenbank.","Local in-memory simulation. No network, account or persistent database.","Локальная симуляция сервера в памяти. Без сети, аккаунта и постоянной базы данных.","Локальна симуляція сервера в пам’яті. Без мережі, акаунта й постійної бази даних."],"apiLabGuide":["GET /projects; POST /projects mit {\"title\":\"My project\"}; GET /projects/2; PATCH /projects/2 mit {\"done\":true}; DELETE /projects/2; GET /projects/2 → 404. Vor Beginn zurücksetzen.","GET /projects; POST /projects with {\"title\":\"My project\"}; GET /projects/2; PATCH /projects/2 with {\"done\":true}; DELETE /projects/2; GET /projects/2 → 404. Reset before starting.","GET /projects; POST /projects с {\"title\":\"My project\"}; GET /projects/2; PATCH /projects/2 с {\"done\":true}; DELETE /projects/2; GET /projects/2 → 404. Перед началом сбрось лабораторию.","GET /projects; POST /projects із {\"title\":\"My project\"}; GET /projects/2; PATCH /projects/2 із {\"done\":true}; DELETE /projects/2; GET /projects/2 → 404. Перед початком скинь лабораторію."],"apiMethod":["HTTP-Methode","HTTP method","HTTP-метод","HTTP-метод"],"apiPath":["Pfad","Path","Путь","Шлях"],"apiBody":["Anfragekörper (JSON)","Request body (JSON)","Тело запроса (JSON)","Тіло запиту (JSON)"],"apiSend":["Anfrage senden","Send request","Отправить запрос","Надіслати запит"],"apiReset":["Labor zurücksetzen","Reset lab","Сбросить лабораторию","Скинути лабораторію"],"apiRecords":["Aktuelle Datensätze","Current records","Текущие записи","Поточні записи"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"sqlTitle":["SQL-Labor · Datenabfragen","SQL Lab · Data queries","SQL-лаборатория · Запросы к данным","SQL-лабораторія · Запити до даних"],"sqlScope":["Lokaler, schreibgeschützter SQL-Teilumfang: SELECT, WHERE, ORDER BY, LIMIT, COUNT(*). Eine Tabelle projects; done ist 0 oder 1. Keine echte SQL-Datenbank. Ergebnisse der sechs Übungen werden verglichen.","Local read-only SQL subset: SELECT, WHERE, ORDER BY, LIMIT, COUNT(*). One projects table; done is 0 or 1. Not a full SQL database. Six exercises compare results.","Локальное подмножество SQL только для чтения: SELECT, WHERE, ORDER BY, LIMIT, COUNT(*). Таблица projects; done — 0 или 1. Не полноценная СУБД. Шесть упражнений с проверкой результата.","Локальна підмножина SQL лише для читання: SELECT, WHERE, ORDER BY, LIMIT, COUNT(*). Таблиця projects; done — 0 або 1. Не повноцінна СКБД. Шість вправ із перевіркою результату."],"sqlDataset":["Datenquelle","Dataset","Источник данных","Джерело даних"],"sqlSample":["Übungsdaten","Practice data","Учебные данные","Навчальні дані"],"sqlQuery":["SQL-Abfrage","SQL query","SQL-запрос","SQL-запит"],"sqlRun":["Abfrage ausführen","Run query","Выполнить запрос","Виконати запит"],"sqlExample":["Beispiel laden","Load example","Загрузить пример","Завантажити приклад"],"sqlInvalid":["Nicht unterstützte Abfrage oder falscher Datentyp","Unsupported query or invalid type","Неподдерживаемый запрос или неверный тип","Непідтримуваний запит або неправильний тип"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"pyTitle":["Python Studio · Grundlagen","Python Studio · Foundations","Python Studio · Основы","Python Studio · Основи"],"pyScope":["Begrenzter numerischer Python-Interpreter: eine Funktion, vier Leerzeichen, if/else, return, Zuweisung, for range, Zahlen und boolesche Werte. Keine Pakete, Dateien oder Netzwerk. Entwürfe nur in dieser Sitzung.","Restricted numeric Python interpreter: one function, four-space indentation, if/else, return, assignment, for range, numbers and booleans. No packages, files or network. Session-only drafts.","Ограниченный числовой интерпретатор Python: одна функция, отступы по четыре пробела, if/else, return, присваивание, for range, числа и логические значения. Без пакетов, файлов и сети. Черновики только в текущей сессии.","Обмежений числовий інтерпретатор Python: одна функція, відступи по чотири пробіли, if/else, return, присвоєння, for range, числа та логічні значення. Без пакетів, файлів і мережі. Чернетки лише в поточній сесії."],"pyExample":["Lösung anzeigen","Load solution","Показать решение","Показати розв’язок"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"webLabTitle":["Web Studio · HTML und CSS","Web Studio · HTML and CSS","Web Studio · HTML и CSS","Web Studio · HTML і CSS"],"webLabScope":["Sechs Übungen mit eingeschränktem HTML/CSS, Strukturprüfung und isolierter Vorschau. Keine Skripte, URLs oder externen Ressourcen; Entwürfe nur in dieser Sitzung. Die Prüfung erkennt geforderte Elemente und Regeln, nicht vollständige Gestaltung oder Barrierefreiheit.","Six exercises with limited HTML/CSS, structural checks and isolated preview. No scripts, URLs or external resources; session-only drafts. Checks required elements and rules, not complete design or accessibility.","Шесть упражнений с ограниченным HTML/CSS, проверкой структуры и изолированным предпросмотром. Без скриптов, URL и внешних ресурсов; черновики сессионные. Проверяются требуемые элементы и правила, а не весь дизайн или доступность.","Шість вправ з обмеженим HTML/CSS, перевіркою структури та ізольованим переглядом. Без скриптів, URL і зовнішніх ресурсів; чернетки сесійні. Перевіряються потрібні елементи й правила, а не весь дизайн чи доступність."],"webLabRun":["Vorschau und Prüfung","Preview and check","Предпросмотр и проверка","Перегляд і перевірка"],"webLabInvalid":["Nicht unterstütztes HTML oder CSS","Unsupported HTML or CSS","Неподдерживаемый HTML или CSS","Непідтримуваний HTML або CSS"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"agentTitle":["Agentenlabor · Werkzeuge und Freigabe","Agent Lab · tools and approval","Лаборатория агентов · инструменты и подтверждение","Лабораторія агентів · інструменти та підтвердження"],"agentScope":["Nur künstliche lokale Daten. Plan bearbeiten, Vorschau prüfen, erst dann freigeben. Keine Netzwerkzugriffe oder echten Konten.","Synthetic local records only. Edit a plan, inspect the dry run, then approve. No network actions or real accounts.","Только вымышленные локальные записи. Измени план, проверь пробный запуск, затем подтверди. Без сетевых действий и реальных аккаунтов.","Лише вигадані локальні записи. Зміни план, перевір пробний запуск, потім підтвердь. Без мережевих дій і реальних акаунтів."],"agentGoal":["Ziel","Goal","Цель","Мета"],"agentPlan":["Werkzeugplan (JSON)","Tool plan (JSON)","План инструментов (JSON)","План інструментів (JSON)"],"agentTemplate":["Regelbasierten Plan laden","Load rule-based plan","Загрузить план по правилам","Завантажити план за правилами"],"agentGenerate":["KI-Plan vorschlagen","Propose AI plan","Предложить план с ИИ","Запропонувати план із ШІ"],"agentPreview":["Testlauf ohne Änderungen","Dry run","Пробный запуск","Пробний запуск"],"agentApply":["Freigeben und ausführen","Approve and apply","Подтвердить и выполнить","Підтвердити й виконати"],"agentModelScope":["KI-Vorschlag nur bei bereits verfügbarer lokaler englischer Browser-KI; Ausgabe wird geprüft und nie automatisch ausgeführt.","Optional ready on-device English model proposes JSON; validated output never runs automatically.","Необязательная уже доступная локальная англоязычная модель предлагает JSON; результат проверяется и никогда не исполняется автоматически.","Необов’язкова вже доступна локальна англомовна модель пропонує JSON; результат перевіряється й ніколи не виконується автоматично."],"agentProposed":["KI-Plan bereit zur Prüfung","AI plan ready for review","План ИИ готов к проверке","План ШІ готовий до перевірки"],"agentApplied":["Freigabe ausgeführt","Approved plan applied","Подтверждённый план выполнен","Підтверджений план виконано"],"agentReady":["Testlauf erfolgreich — noch keine Änderung","Dry run passed — no changes yet","Пробный запуск успешен — изменений ещё нет","Пробний запуск успішний — змін ще немає"],"agentRejected":["Plan abgelehnt","Plan rejected","План отклонён","План відхилено"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"gitTitle":["Git-Labor · Versionskontrolle","Git Lab · version control","Git-лаборатория · контроль версий","Git-лабораторія · контроль версій"],"gitScope":["Geführtes Modell für eine Datei, Index, Commits, Branches und Fast-Forward-Merge. Keine echten Git-Befehle im Browser, keine Remote-Verbindung. Echtes Git-Übungsprojekt separat im Repository.","Guided one-file model of working tree, staging, commits, branches and fast-forward merge. No actual Git commands in the browser or remote connection. Real Git practice project is separate in the repository.","Учебная модель одной рабочей версии файла, индекса, коммитов, веток и fast-forward merge. Без настоящих Git-команд в браузере и удалённого соединения. Реальная практика Git отдельно в репозитории.","Навчальна модель одного файла, індексу, комітів, гілок і fast-forward merge. Без справжніх Git-команд у браузері та віддаленого з’єднання. Справжня практика Git окремо в репозиторії."],"gitFinished":["Übung abgeschlossen","Exercise complete","Упражнение завершено","Вправу завершено"],"gitExecute":["Schritt ausführen","Execute step","Выполнить шаг","Виконати крок"],"gitSuccess":["Schritt erfolgreich","Step successful","Шаг выполнен","Крок виконано"],"gitError":["Schritt abgelehnt","Step rejected","Шаг отклонён","Крок відхилено"]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);

for(const [key,values] of Object.entries({"reviewTitle":["Pull Request · Code Review","Pull Request · Code Review","Pull Request · проверка кода","Pull Request · перевірка коду"],"reviewScope":["Drei lokale Übungen mit echten Tests des eingeschränkten Interpreters. Review und Merge sind simuliert; kein GitHub-Zugriff. Nach Änderungen erneut testen und freigeben.","Three local exercises with actual restricted-interpreter tests. Review and merge are simulated; no GitHub access. Edits require new tests and approval.","Три локальных упражнения с реальными тестами ограниченного интерпретатора. Review и merge моделируются, без доступа к GitHub. После правок нужны новые тесты и подтверждение.","Три локальні вправи зі справжніми тестами обмеженого інтерпретатора. Review і merge моделюються, без доступу до GitHub. Після змін потрібні нові тести й підтвердження."],"reviewNote":["Review-Kommentar","Review comment","Комментарий проверки","Коментар перевірки"],"reviewChanges":["Änderungen anfordern","Request changes","Запросить изменения","Запросити зміни"],"reviewApprove":["Freigeben","Approve","Одобрить","Схвалити"],"reviewMerge":["Merge (Übung)","Merge (practice)","Объединить (учебно)","Об’єднати (навчально)"],"reviewMerged":["Übungs-Merge abgeschlossen","Practice merge complete","Учебное объединение выполнено","Навчальне об’єднання виконано"],"reviewApproved":["Freigegeben","Approved","Одобрено","Схвалено"],"reviewRequested":["Änderungen angefordert","Changes requested","Запрошены изменения","Запитано зміни"],"reviewPending":["Review ausstehend","Review pending","Проверка ожидается","Перевірка очікується"],"reviewBlocked":["Prüfe Tests und füge einen Kommentar hinzu.","Check tests and add a review comment.","Проверь тесты и добавь комментарий.","Перевір тести й додай коментар."]}))['de','en','ru','uk'].forEach((lang,i)=>TEXT[lang][key]=values[i]);
