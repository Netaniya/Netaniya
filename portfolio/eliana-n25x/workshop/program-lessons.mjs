/*!
N25X / ELIANA — PROPRIETARY PROJECT MATERIALS
© 2026 Natalie Ragulina (Netaniya). All rights reserved.
No unauthorized redistribution, commercial reuse or passing off of protected original materials, except as permitted by applicable law, GitHub terms or separate licenses.
Human creative direction and AI-assisted implementation: see CONTRIBUTIONS.md. Third-party licenses remain in effect.
*/
/**
 * Original N25x introductory programming exercises.
 * © 2026 Natalie Ragulina. All rights reserved.
 * Developed with AI assistance; this is a practice extension, not a full course.
 * Localized arrays are ordered DE / EN / RU / UK, as in curriculum.mjs.
 * Each source deliberately contains one repairable logic error. The second
 * block choice is the intended repair; predictions describe the unmodified code.
 */

export const EXTRA_MISSIONS = [
  {
    id: 'percentage',
    title: ['Prozente berechnen', 'Calculating percentages', 'Вычисление процентов', 'Обчислення відсотків'],
    task: [
      'Berechne rate Prozent von value. Beispiel: 15 Prozent von 200 ergeben 30. Beide Eingaben sind nichtnegative Zahlen.',
      'Calculate rate percent of value. For example, 15 percent of 200 is 30. Both inputs are nonnegative numbers.',
      'Вычисли rate процентов от value. Например, 15 процентов от 200 — это 30. Оба входных числа неотрицательные.',
      'Обчисли rate відсотків від value. Наприклад, 15 відсотків від 200 — це 30. Обидва вхідні числа невід’ємні.',
    ],
    hint: [
      'Ein Prozent ist ein Hundertstel. Multipliziere zuerst mit rate und teile dann durch 100.',
      'One percent is one hundredth. Multiply by rate, then divide by 100.',
      'Один процент — одна сотая. Умножь на rate, затем раздели на 100.',
      'Один відсоток — одна сота. Помнож на rate, потім поділи на 100.',
    ],
    why: [
      'value * rate / 100 berechnet den Anteil. Bei rate = 0 ist er null; bei rate = 100 entspricht er dem ganzen Wert.',
      'value * rate / 100 calculates the portion. A rate of 0 gives zero; a rate of 100 gives the entire value.',
      'value * rate / 100 вычисляет долю. При rate = 0 она нулевая, а при rate = 100 равна всему значению.',
      'value * rate / 100 обчислює частку. За rate = 0 вона нульова, а за rate = 100 дорівнює всьому значенню.',
    ],
    source: 'function percent(value, rate) {\n  return value * rate / 10;\n}',
    entry: 'percent', sample: [200, 15], prediction: [300, 30, 15], expectedPrediction: 300,
    block: { from: 'value * rate / 10', choices: ['value * rate / 10', 'value * rate / 100', 'value + rate / 100'] },
    tests: [[[200, 15], 30], [[0, 25], 0], [[80, 0], 0], [[40, 100], 40], [[50, 2], 1]],
  },
  {
    id: 'minimum',
    title: ['Den kleineren Wert finden', 'Finding the smaller value', 'Находим меньшее число', 'Знаходимо менше число'],
    task: [
      'Gib die kleinere der Zahlen a und b zurück. Wenn beide gleich sind, gib diesen gemeinsamen Wert zurück.',
      'Return the smaller of a and b. If they are equal, return their shared value.',
      'Верни меньшее из чисел a и b. Если они равны, верни их общее значение.',
      'Поверни менше з чисел a і b. Якщо вони рівні, поверни їхнє спільне значення.',
    ],
    hint: [
      'Der erste Zweig gibt a zurück. Er soll nur gewählt werden, wenn a kleiner als b ist.',
      'The first branch returns a. It should run when a is smaller than b.',
      'Первая ветка возвращает a. Она должна выполняться, когда a меньше b.',
      'Перша гілка повертає a. Вона має виконуватися, коли a менше за b.',
    ],
    why: [
      'Der Vergleich a < b wählt die kleinere Zahl. Bei Gleichheit ist der zweite Rückgabewert ebenfalls richtig. Prüfe auch negative Zahlen.',
      'The comparison a < b selects the smaller number. If the inputs are equal, the second return value is also correct. Test negative numbers too.',
      'Сравнение a < b выбирает меньшее число. При равенстве второе возвращаемое значение тоже верно. Проверяй и отрицательные числа.',
      'Порівняння a < b обирає менше число. За рівності друге повернене значення теж правильне. Перевіряй і від’ємні числа.',
    ],
    source: 'function smaller(a, b) {\n  if (a > b) {\n    return a;\n  }\n  return b;\n}',
    entry: 'smaller', sample: [3, 8], prediction: [8, 3, 11], expectedPrediction: 8,
    block: { from: 'a > b', choices: ['a > b', 'a < b', 'a === b'] },
    tests: [[[3, 8], 3], [[8, 3], 3], [[5, 5], 5], [[-4, 2], -4], [[0, -2], -2]],
  },
  {
    id: 'maximum',
    title: ['Den größeren Wert finden', 'Finding the larger value', 'Находим большее число', 'Знаходимо більше число'],
    task: [
      'Gib die größere der Zahlen a und b zurück. Die Funktion muss auch bei zwei negativen oder zwei gleichen Zahlen stimmen.',
      'Return the larger of a and b. The function must also work with two negative numbers or two equal numbers.',
      'Верни большее из чисел a и b. Функция должна работать и с двумя отрицательными, и с двумя одинаковыми числами.',
      'Поверни більше з чисел a і b. Функція має працювати і з двома від’ємними, і з двома однаковими числами.',
    ],
    hint: [
      'Auf der Zahlengeraden liegt die größere Zahl weiter rechts. Auch -3 ist größer als -8.',
      'The larger number lies farther to the right on a number line. For example, -3 is larger than -8.',
      'На числовой прямой большее число находится правее. Например, -3 больше -8.',
      'На числовій прямій більше число розташоване праворуч. Наприклад, -3 більше за -8.',
    ],
    why: [
      'a > b prüft, ob a der größere Wert ist. Sonst wird b zurückgegeben. Ein Vergleich berücksichtigt das Vorzeichen; er vergleicht nicht nur den Abstand zur null.',
      'a > b checks whether a is larger. Otherwise the function returns b. A comparison takes signs into account; it does not merely compare distance from zero.',
      'a > b проверяет, больше ли a. Иначе функция возвращает b. Сравнение учитывает знак, а не только расстояние от нуля.',
      'a > b перевіряє, чи a більше. Інакше функція повертає b. Порівняння враховує знак, а не лише відстань від нуля.',
    ],
    source: 'function larger(a, b) {\n  if (a < b) {\n    return a;\n  }\n  return b;\n}',
    entry: 'larger', sample: [-3, -8], prediction: [-8, -3, 5], expectedPrediction: -8,
    block: { from: 'a < b', choices: ['a < b', 'a > b', 'a !== b'] },
    tests: [[[-3, -8], -3], [[2, 7], 7], [[7, 2], 7], [[0, 0], 0], [[-5, 0], 0]],
  },
  {
    id: 'inclusive-range',
    title: ['In einem Bereich bleiben', 'Checking a range', 'Проверка диапазона', 'Перевірка діапазону'],
    task: [
      'Gib true zurück, wenn value zwischen low und high liegt, einschließlich beider Grenzen. Sonst gib false zurück. low ist nicht größer als high.',
      'Return true when value is between low and high, including both endpoints. Otherwise return false. low is no greater than high.',
      'Верни true, если value находится между low и high, включая обе границы. Иначе верни false. low не больше high.',
      'Поверни true, якщо value лежить між low і high, включно з обома межами. Інакше поверни false. low не більше за high.',
    ],
    hint: [
      'Beide Prüfungen müssen gleichzeitig stimmen: nicht unter low und nicht über high. Dafür brauchst du &&.',
      'Both checks must be true at the same time: not below low and not above high. Use &&.',
      'Обе проверки должны быть верны одновременно: не ниже low и не выше high. Для этого нужен &&.',
      'Обидві перевірки мають бути правильними одночасно: не нижче low і не вище high. Для цього потрібен &&.',
    ],
    why: [
      '&& bedeutet „und“, || bedeutet „oder“. Mit || genügt schon eine Seite. >= und <= schließen die Grenzwerte ein.',
      '&& means “and”; || means “or”. With ||, only one side needs to be true. >= and <= include the endpoints.',
      '&& означает «и», а || — «или». При || достаточно одной верной части. Знаки >= и <= включают граничные значения.',
      '&& означає «і», а || — «або». За || досить однієї правильної частини. Знаки >= і <= включають граничні значення.',
    ],
    source: 'function within(value, low, high) {\n  return value >= low || value <= high;\n}',
    entry: 'within', sample: [12, 0, 10], prediction: [true, false, 12], expectedPrediction: true,
    block: { from: 'value >= low || value <= high', choices: ['value >= low || value <= high', 'value >= low && value <= high', 'value > low && value < high'] },
    tests: [[[0, 0, 10], true], [[10, 0, 10], true], [[5, 0, 10], true], [[-1, 0, 10], false], [[11, 0, 10], false]],
  },
  {
    id: 'even-number',
    title: ['Gerade oder ungerade?', 'Even or odd?', 'Чётное или нечётное?', 'Парне чи непарне?'],
    task: [
      'Prüfe die ganze Zahl n. Gib true für gerade Zahlen zurück und false für ungerade Zahlen. Auch null und negative Zahlen gehören zu den Eingaben.',
      'Check the integer n. Return true for even numbers and false for odd numbers. Inputs include zero and negative numbers.',
      'Проверь целое число n. Для чётного верни true, для нечётного — false. Среди входных значений есть ноль и отрицательные числа.',
      'Перевір ціле число n. Для парного поверни true, для непарного — false. Серед вхідних значень є нуль і від’ємні числа.',
    ],
    hint: [
      '% liefert den Rest einer Division. Eine gerade Zahl hat bei der Division durch 2 den Rest 0.',
      '% gives the remainder of a division. An even number has remainder 0 when divided by 2.',
      '% возвращает остаток от деления. У чётного числа остаток от деления на 2 равен 0.',
      '% повертає остачу від ділення. У парного числа остача від ділення на 2 дорівнює 0.',
    ],
    why: [
      'n % 2 === 0 funktioniert für positive und negative gerade Zahlen sowie für null. Ein Rest ungleich null kennzeichnet eine ungerade ganze Zahl.',
      'n % 2 === 0 works for positive and negative even numbers and for zero. A nonzero remainder identifies an odd integer.',
      'n % 2 === 0 работает для положительных и отрицательных чётных чисел и для нуля. Ненулевой остаток означает нечётное целое число.',
      'n % 2 === 0 працює для додатних і від’ємних парних чисел та для нуля. Ненульова остача означає непарне ціле число.',
    ],
    source: 'function even(n) {\n  return n % 2 === 1;\n}',
    entry: 'even', sample: [6], prediction: [false, true, 3], expectedPrediction: false,
    block: { from: 'n % 2 === 1', choices: ['n % 2 === 1', 'n % 2 === 0', 'n / 2 === 0'] },
    tests: [[[0], true], [[2], true], [[7], false], [[-4], true], [[-3], false]],
  },
  {
    id: 'factorial-product',
    title: ['Fakultät als Produkt', 'Factorial as a product', 'Факториал как произведение', 'Факторіал як добуток'],
    task: [
      'Berechne n! für ganze Zahlen von 0 bis 10. Multipliziere alle Zahlen von 1 bis n. Für n = 0 soll das Ergebnis 1 sein.',
      'Calculate n! for integers from 0 to 10. Multiply all numbers from 1 through n. For n = 0, return 1.',
      'Вычисли n! для целых чисел от 0 до 10. Перемножь все числа от 1 до n. При n = 0 результат должен быть 1.',
      'Обчисли n! для цілих чисел від 0 до 10. Перемнож усі числа від 1 до n. За n = 0 результат має бути 1.',
    ],
    hint: [
      'Starte ein Produkt bei 1. Ein Startwert von 0 bleibt nach jeder Multiplikation null.',
      'Start a running product at 1. Starting at 0 keeps it zero after every multiplication.',
      'Начинай накопление произведения с 1. Если начать с 0, после каждого умножения останется ноль.',
      'Починай накопичення добутку з 1. Якщо почати з 0, після кожного множення залишиться нуль.',
    ],
    why: [
      '1 ist der neutrale Startwert für ein Produkt. Die Schleife multipliziert total mit 1, 2 und so weiter bis n. Bei n = 0 läuft sie nicht; total bleibt 1.',
      '1 is the neutral starting value for a product. The loop multiplies total by 1, 2 and so on through n. For n = 0, it does not run and total stays 1.',
      '1 — нейтральное начальное значение произведения. Цикл умножает total на 1, 2 и далее до n. При n = 0 цикл не выполняется, и total остаётся равным 1.',
      '1 — нейтральне початкове значення добутку. Цикл множить total на 1, 2 і далі до n. За n = 0 цикл не виконується, і total залишається рівним 1.',
    ],
    source: 'function factorial(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total = total * i;\n  }\n  return total;\n}',
    entry: 'factorial', sample: [4], prediction: [0, 24, 4], expectedPrediction: 0,
    block: { from: 'let total = 0;', choices: ['let total = 0;', 'let total = 1;', 'let total = n;'] },
    tests: [[[0], 1], [[1], 1], [[2], 2], [[4], 24], [[6], 720]],
  },
  {
    id: 'power-loop',
    title: ['Potenzen mit einer Schleife', 'Powers with a loop', 'Степень с помощью цикла', 'Степінь за допомогою циклу'],
    task: [
      'Berechne base hoch exponent durch wiederholtes Multiplizieren. exponent ist eine ganze Zahl von 0 bis 8. Bei exponent = 0 gib 1 zurück.',
      'Calculate base raised to exponent by repeated multiplication. exponent is an integer from 0 to 8. Return 1 when exponent is 0.',
      'Вычисли base в степени exponent повторным умножением. exponent — целое число от 0 до 8. При exponent = 0 верни 1.',
      'Обчисли base у степені exponent повторним множенням. exponent — ціле число від 0 до 8. За exponent = 0 поверни 1.',
    ],
    hint: [
      'result beginnt bei 1. Jede Runde soll den bisherigen Wert mit base multiplizieren, nicht base addieren.',
      'result starts at 1. Each iteration must multiply the current value by base, rather than add base.',
      'result начинается с 1. На каждом шаге нужно умножать накопленный результат на base, а не прибавлять base.',
      'result починається з 1. На кожному кроці потрібно множити накопичений результат на base, а не додавати base.',
    ],
    why: [
      'Drei Multiplikationen mit 3 ergeben 1 × 3 × 3 × 3 = 27. Die Bedingung i < exponent führt genau exponent Runden aus; bei null Runden bleibt das Ergebnis 1.',
      'Three multiplications by 3 give 1 × 3 × 3 × 3 = 27. The condition i < exponent runs exactly exponent iterations; with zero iterations the result stays 1.',
      'Три умножения на 3 дают 1 × 3 × 3 × 3 = 27. Условие i < exponent задаёт ровно exponent повторений; без повторений результат остаётся равным 1.',
      'Три множення на 3 дають 1 × 3 × 3 × 3 = 27. Умова i < exponent задає рівно exponent повторень; без повторень результат залишається рівним 1.',
    ],
    source: 'function power(base, exponent) {\n  let result = 1;\n  for (let i = 0; i < exponent; i++) {\n    result = result + base;\n  }\n  return result;\n}',
    entry: 'power', sample: [3, 3], prediction: [10, 9, 27], expectedPrediction: 10,
    block: { from: 'result + base', choices: ['result + base', 'result * base', 'result - base'] },
    tests: [[[2, 0], 1], [[2, 1], 2], [[3, 3], 27], [[-2, 3], -8], [[0, 4], 0]],
  },
  {
    id: 'zero-divisor',
    title: ['Den Nullteiler abfangen', 'Handling a zero divisor', 'Обработка нулевого делителя', 'Обробка нульового дільника'],
    task: [
      'Teile total durch count. Nur wenn count gleich 0 ist, gib den vereinbarten Ersatzwert 0 zurück, ohne die Division auszuführen.',
      'Divide total by count. Only when count is 0, return the agreed fallback value 0 without performing the division.',
      'Раздели total на count. Только при count = 0 верни условленный запасной результат 0, не выполняя деление.',
      'Поділи total на count. Лише за count = 0 поверни умовлений запасний результат 0, не виконуючи ділення.',
    ],
    hint: [
      'Die Schutzbedingung muss den Teiler mit 0 vergleichen. Durch 1 zu teilen ist erlaubt und ergibt total.',
      'The guard must compare the divisor with 0. Dividing by 1 is allowed and gives total.',
      'Защитное условие должно сравнивать делитель с 0. Делить на 1 можно, результат будет total.',
      'Захисна умова має порівнювати дільник із 0. Ділити на 1 можна, результат буде total.',
    ],
    why: [
      'Die Prüfung steht vor der Division. return beendet die Funktion sofort. Der Ersatzwert 0 ist eine Regel dieses Programms; er bedeutet nicht, dass Division durch null mathematisch null ergibt.',
      'The check comes before the division. return ends the function immediately. The fallback 0 is a rule of this program; it does not mean division by zero mathematically equals zero.',
      'Проверка стоит перед делением. return сразу завершает функцию. Запасной ответ 0 — правило этой программы, а не утверждение, что деление на ноль математически даёт ноль.',
      'Перевірка стоїть перед діленням. return одразу завершує функцію. Запасна відповідь 0 — правило цієї програми, а не твердження, що ділення на нуль математично дає нуль.',
    ],
    source: 'function safeDivide(total, count) {\n  if (count === 1) {\n    return 0;\n  }\n  return total / count;\n}',
    entry: 'safeDivide', sample: [12, 1], prediction: [0, 12, 1], expectedPrediction: 0,
    block: { from: 'count === 1', choices: ['count === 1', 'count === 0', 'count < 0'] },
    tests: [[[12, 3], 4], [[12, 1], 12], [[0, 5], 0], [[10, 0], 0], [[-8, 2], -4]],
  },
  {
    id: 'helper-arguments',
    title: ['Eine Hilfsfunktion aufrufen', 'Calling a helper function', 'Вызов вспомогательной функции', 'Виклик допоміжної функції'],
    task: [
      'Rechne minutes in Sekunden um und addiere extraSeconds. Beide Eingaben sind nichtnegative ganze Zahlen. Zum Beispiel sind 2 Minuten und 10 Sekunden insgesamt 130 Sekunden.',
      'Convert minutes to seconds and add extraSeconds. Both inputs are nonnegative integers. For example, 2 minutes and 10 seconds total 130 seconds.',
      'Переведи minutes в секунды и прибавь extraSeconds. Оба входных числа — неотрицательные целые. Например, 2 минуты и 10 секунд — это 130 секунд.',
      'Переведи minutes у секунди та додай extraSeconds. Обидва вхідні числа — невід’ємні цілі. Наприклад, 2 хвилини й 10 секунд — це 130 секунд.',
    ],
    hint: [
      'seconds erwartet Minuten. Übergib nur minutes und addiere die zusätzlichen Sekunden erst zum Rückgabewert.',
      'seconds expects minutes. Pass only minutes, then add the extra seconds to its return value.',
      'seconds принимает минуты. Передай только minutes, а дополнительные секунды прибавь к возвращённому значению.',
      'seconds приймає хвилини. Передай лише minutes, а додаткові секунди додай до поверненого значення.',
    ],
    why: [
      'Ein Funktionsargument wird vor dem Aufruf ausgewertet. minutes + extraSeconds würde unterschiedliche Einheiten vermischen. seconds(minutes) + extraSeconds addiert erst zwei Sekundenwerte.',
      'A function argument is evaluated before the call. minutes + extraSeconds mixes different units. seconds(minutes) + extraSeconds adds two values that are both in seconds.',
      'Аргумент вычисляется перед вызовом функции. minutes + extraSeconds смешивает разные единицы. В seconds(minutes) + extraSeconds складываются два значения в секундах.',
      'Аргумент обчислюється перед викликом функції. minutes + extraSeconds змішує різні одиниці. У seconds(minutes) + extraSeconds додаються два значення в секундах.',
    ],
    source: 'function seconds(minutes) {\n  return minutes * 60;\n}\nfunction duration(minutes, extraSeconds) {\n  return seconds(minutes + extraSeconds);\n}',
    entry: 'duration', sample: [2, 10], prediction: [720, 130, 12], expectedPrediction: 720,
    block: { from: 'seconds(minutes + extraSeconds)', choices: ['seconds(minutes + extraSeconds)', 'seconds(minutes) + extraSeconds', 'seconds(minutes) - extraSeconds'] },
    tests: [[[2, 10], 130], [[0, 30], 30], [[1, 0], 60], [[0, 0], 0], [[3, 59], 239]],
  },
  {
    id: 'sum-squares',
    title: ['Quadrate aufsummieren', 'Summing squares', 'Сумма квадратов', 'Сума квадратів'],
    task: [
      'Berechne 1² + 2² + … + n² für ganze Zahlen von 0 bis 20. Bei n = 0 ist die Summe 0.',
      'Calculate 1² + 2² + … + n² for integers from 0 to 20. For n = 0, the sum is 0.',
      'Вычисли 1² + 2² + … + n² для целых чисел от 0 до 20. При n = 0 сумма равна 0.',
      'Обчисли 1² + 2² + … + n² для цілих чисел від 0 до 20. За n = 0 сума дорівнює 0.',
    ],
    hint: [
      'Das Quadrat von i ist i * i. Addiere dieses Produkt zum bisherigen total.',
      'The square of i is i * i. Add that product to the running total.',
      'Квадрат i — это i * i. Прибавь это произведение к накопленному total.',
      'Квадрат i — це i * i. Додай цей добуток до накопиченого total.',
    ],
    why: [
      'total speichert die Zwischensumme. Multiplikation wird vor Addition ausgeführt: total + i * i addiert bei jedem Schritt genau ein Quadrat.',
      'total stores the running sum. Multiplication happens before addition: total + i * i adds exactly one square at each step.',
      'total хранит промежуточную сумму. Умножение выполняется раньше сложения: total + i * i на каждом шаге прибавляет ровно один квадрат.',
      'total зберігає проміжну суму. Множення виконується раніше за додавання: total + i * i на кожному кроці додає рівно один квадрат.',
    ],
    source: 'function sumSquares(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total = total + i;\n  }\n  return total;\n}',
    entry: 'sumSquares', sample: [3], prediction: [6, 9, 14], expectedPrediction: 6,
    block: { from: 'total + i', choices: ['total + i', 'total + i * i', 'total * i'] },
    tests: [[[0], 0], [[1], 1], [[2], 5], [[3], 14], [[5], 55]],
  },
  {
    id: 'sum-even',
    title: ['Nur gerade Zahlen addieren', 'Adding only even numbers', 'Сумма только чётных чисел', 'Сума лише парних чисел'],
    task: [
      'Addiere alle geraden ganzen Zahlen von 1 bis n einschließlich. n ist eine ganze Zahl von 0 bis 30. Ohne passende Zahlen ist das Ergebnis 0.',
      'Add all even integers from 1 through n, including n if it is even. n is an integer from 0 to 30. Return 0 when there are no matching numbers.',
      'Сложи все чётные целые числа от 1 до n включительно. n — целое число от 0 до 30. Если подходящих чисел нет, верни 0.',
      'Додай усі парні цілі числа від 1 до n включно. n — ціле число від 0 до 30. Якщо відповідних чисел немає, поверни 0.',
    ],
    hint: [
      'Die Schleife besucht jede Zahl. Die if-Bedingung soll nur Zahlen mit Rest 0 bei Division durch 2 zulassen.',
      'The loop visits every number. The if condition must allow only numbers with remainder 0 when divided by 2.',
      'Цикл перебирает все числа. Условие if должно пропускать только числа с остатком 0 при делении на 2.',
      'Цикл перебирає всі числа. Умова if має пропускати лише числа з остачею 0 під час ділення на 2.',
    ],
    why: [
      'Der Zähler i und die Summe total haben verschiedene Aufgaben. Die Schleife zählt weiter, auch wenn if eine Zahl überspringt. Bis 6 werden nur 2 + 4 + 6 = 12 addiert.',
      'The counter i and the sum total have different jobs. The loop continues counting even when if skips a number. Through 6, only 2 + 4 + 6 = 12 are added.',
      'Счётчик i и сумма total выполняют разные роли. Цикл продолжает счёт, даже если if пропускает число. До 6 включительно складываются только 2 + 4 + 6 = 12.',
      'Лічильник i й сума total виконують різні ролі. Цикл продовжує лічбу, навіть якщо if пропускає число. До 6 включно додаються лише 2 + 4 + 6 = 12.',
    ],
    source: 'function sumEven(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    if (i % 2 !== 0) {\n      total = total + i;\n    }\n  }\n  return total;\n}',
    entry: 'sumEven', sample: [6], prediction: [9, 12, 21], expectedPrediction: 9,
    block: { from: 'i % 2 !== 0', choices: ['i % 2 !== 0', 'i % 2 === 0', 'i > 2'] },
    tests: [[[0], 0], [[1], 0], [[2], 2], [[6], 12], [[7], 12]],
  },
  {
    id: 'early-return-search',
    title: ['Beim ersten Treffer zurückkehren', 'Returning at the first match', 'Возврат при первом совпадении', 'Повернення за першого збігу'],
    task: [
      'Durchsuche die ganzen Zahlen 1 bis 5 in aufsteigender Reihenfolge. Gib die erste Zahl zurück, die strikt größer als limit ist. Gibt es keine, gib 0 zurück. limit ist eine ganze Zahl.',
      'Search the integers 1 through 5 in ascending order. Return the first number strictly greater than limit. If there is none, return 0. limit is an integer.',
      'Перебери целые числа от 1 до 5 по возрастанию. Верни первое число строго больше limit. Если такого нет, верни 0. limit — целое число.',
      'Перебери цілі числа від 1 до 5 за зростанням. Поверни перше число, строго більше за limit. Якщо такого немає, поверни 0. limit — ціле число.',
    ],
    hint: [
      'Prüfe i > limit. return i beendet beim ersten passenden Wert die ganze Funktion, nicht nur den if-Zweig.',
      'Check i > limit. At the first match, return i ends the entire function, not just the if branch.',
      'Проверь i > limit. При первом подходящем значении return i завершает всю функцию, а не только ветку if.',
      'Перевір i > limit. За першого відповідного значення return i завершує всю функцію, а не лише гілку if.',
    ],
    why: [
      'Weil die Suche bei 1 beginnt und aufsteigt, ist der erste Treffer der kleinste passende Wert. return 0 am Ende wird nur erreicht, wenn die gesamte Schleife ohne Treffer endet.',
      'Because the search starts at 1 and goes upward, the first match is the smallest qualifying value. The final return 0 is reached only if the entire loop finishes without a match.',
      'Поиск начинается с 1 и идёт по возрастанию, поэтому первое совпадение — минимальное подходящее число. Последний return 0 выполняется только после завершения всего цикла без совпадений.',
      'Пошук починається з 1 і йде за зростанням, тому перший збіг — найменше відповідне число. Останній return 0 виконується лише після завершення всього циклу без збігів.',
    ],
    source: 'function firstAbove(limit) {\n  for (let i = 1; i <= 5; i++) {\n    if (i <= limit) {\n      return i;\n    }\n  }\n  return 0;\n}',
    entry: 'firstAbove', sample: [3], prediction: [1, 4, 5], expectedPrediction: 1,
    block: { from: 'i <= limit', choices: ['i <= limit', 'i > limit', 'i >= limit'] },
    tests: [[[-1], 1], [[0], 1], [[2], 3], [[4], 5], [[5], 0]],
  },
  {
    id: 'pass-boundary',
    title: ['Die Grenze gehört dazu', 'Including the boundary', 'Граница включается', 'Межа включається'],
    task: [
      'Eine Prüfung ist ab 60 Punkten bestanden, einschließlich genau 60. Gib true für einen bestandenen Test zurück, sonst false. score liegt zwischen 0 und 100.',
      'A test is passed with at least 60 points, including exactly 60. Return true for a pass, otherwise false. score is between 0 and 100.',
      'Тест сдан при результате не меньше 60 очков, включая ровно 60. Для сданного теста верни true, иначе false. score находится от 0 до 100.',
      'Тест складено за результату щонайменше 60 очок, включно з рівно 60. Для складеного тесту поверни true, інакше false. score лежить від 0 до 100.',
    ],
    hint: [
      '„Mindestens 60“ bedeutet „größer oder gleich 60“. Prüfe den Wert direkt auf der Grenze.',
      '“At least 60” means “greater than or equal to 60”. Test the value exactly on the boundary.',
      '«Не меньше 60» означает «больше или равно 60». Проверь значение ровно на границе.',
      '«Щонайменше 60» означає «більше або дорівнює 60». Перевір значення рівно на межі.',
    ],
    why: [
      '> und >= unterscheiden sich genau bei Gleichheit. Tests mit 59, 60 und 61 prüfen die Stelle unmittelbar unter, auf und über der Grenze.',
      '> and >= differ exactly at equality. Tests with 59, 60 and 61 check immediately below, at and above the boundary.',
      '> и >= различаются именно при равенстве. Проверки с 59, 60 и 61 охватывают значения сразу под границей, на ней и сразу над ней.',
      '> і >= відрізняються саме за рівності. Перевірки з 59, 60 і 61 охоплюють значення одразу під межею, на ній та одразу над нею.',
    ],
    source: 'function passes(score) {\n  return score > 60;\n}',
    entry: 'passes', sample: [60], prediction: [false, true, 60], expectedPrediction: false,
    block: { from: 'score > 60', choices: ['score > 60', 'score >= 60', 'score < 60'] },
    tests: [[[0], false], [[59], false], [[60], true], [[61], true], [[100], true]],
  },
  {
    id: 'absolute-value',
    title: ['Abstand von null', 'Distance from zero', 'Расстояние от нуля', 'Відстань від нуля'],
    task: [
      'Gib den Abstand der Zahl n von null zurück. Das Ergebnis ist nie negativ: Für -4 und 4 soll jeweils 4 herauskommen.',
      'Return the distance of n from zero. The result is never negative: both -4 and 4 must give 4.',
      'Верни расстояние числа n от нуля. Результат не бывает отрицательным: и для -4, и для 4 ответ должен быть 4.',
      'Поверни відстань числа n від нуля. Результат не буває від’ємним: і для -4, і для 4 відповідь має бути 4.',
    ],
    hint: [
      'Nichtnegative Zahlen können unverändert zurückgegeben werden. Bei einer negativen Zahl dreht -n das Vorzeichen um.',
      'Nonnegative numbers can be returned unchanged. For a negative number, -n reverses the sign.',
      'Неотрицательные числа можно вернуть без изменения. Для отрицательного числа -n меняет знак.',
      'Невід’ємні числа можна повернути без зміни. Для від’ємного числа -n змінює знак.',
    ],
    why: [
      'Das unäre Minus in -n benötigt nur einen Wert. Es macht aus -4 die 4. Die Addition von 1 würde die Zahl nur verschieben und nicht ihren Abstand von null berechnen.',
      'The unary minus in -n takes a single value. It turns -4 into 4. Adding 1 would merely shift the number rather than calculate its distance from zero.',
      'Унарный минус в -n действует на одно значение и превращает -4 в 4. Прибавление 1 лишь сдвигает число, а не вычисляет его расстояние от нуля.',
      'Унарний мінус у -n діє на одне значення й перетворює -4 на 4. Додавання 1 лише зсуває число, а не обчислює його відстань від нуля.',
    ],
    source: 'function magnitude(n) {\n  if (n >= 0) {\n    return n;\n  }\n  return n + 1;\n}',
    entry: 'magnitude', sample: [-4], prediction: [-3, 4, -4], expectedPrediction: -3,
    block: { from: 'n + 1', choices: ['n + 1', '-n', 'n - 1'] },
    tests: [[[-4], 4], [[0], 0], [[7], 7], [[-1], 1], [[-10], 10]],
  },
  {
    id: 'clamp-value',
    title: ['Einen Wert begrenzen', 'Clamping a value', 'Ограничение значения', 'Обмеження значення'],
    task: [
      'Begrenze value auf den Bereich von 0 bis limit. Unter 0 gib 0 zurück; über limit gib limit zurück; dazwischen bleibt value unverändert. limit ist nichtnegativ.',
      'Clamp value to the range from 0 to limit. Below 0 return 0; above limit return limit; otherwise keep value unchanged. limit is nonnegative.',
      'Ограничи value диапазоном от 0 до limit. Ниже 0 верни 0, выше limit верни limit, а внутри диапазона оставь value без изменения. limit неотрицателен.',
      'Обмеж value діапазоном від 0 до limit. Нижче 0 поверни 0, вище limit поверни limit, а всередині діапазону залиш value без зміни. limit невід’ємний.',
    ],
    hint: [
      'Der erste Zweig behandelt Werte unter null bereits richtig. Im zweiten Zweig muss die obere Grenze statt des zu großen Eingangswerts zurückgegeben werden.',
      'The first branch already handles values below zero correctly. The second branch must return the upper limit instead of the oversized input.',
      'Первая ветка уже правильно обрабатывает значения ниже нуля. Во второй нужно вернуть верхнюю границу вместо слишком большого входного значения.',
      'Перша гілка вже правильно обробляє значення нижче нуля. У другій потрібно повернути верхню межу замість завеликого вхідного значення.',
    ],
    why: [
      'Die drei Fälle teilen den Zahlenbereich auf. Bereits gültige Werte werden nicht verändert. Auch wenn limit gleich 0 ist, ist 0 ein gültiges Ergebnis.',
      'The three cases split the number line into regions. Values already within the range stay unchanged. Even when limit equals 0, zero is a valid result.',
      'Три случая разделяют числовую прямую на области. Допустимые значения не меняются. Даже если limit равен 0, ноль остаётся правильным результатом.',
      'Три випадки ділять числову пряму на області. Допустимі значення не змінюються. Навіть якщо limit дорівнює 0, нуль залишається правильним результатом.',
    ],
    source: 'function clamp(value, limit) {\n  if (value < 0) {\n    return 0;\n  }\n  if (value > limit) {\n    return value;\n  }\n  return value;\n}',
    entry: 'clamp', sample: [15, 10], prediction: [15, 10, 0], expectedPrediction: 15,
    block: {
      from: 'if (value > limit) {\n    return value;\n  }',
      choices: ['if (value > limit) {\n    return value;\n  }', 'if (value > limit) {\n    return limit;\n  }', 'if (value > limit) {\n    return 0;\n  }'],
    },
    tests: [[[-2, 10], 0], [[0, 0], 0], [[6, 10], 6], [[10, 10], 10], [[12, 10], 10]],
  },
];

// Academy extension: preserve legacy IDs and order.
EXTRA_MISSIONS.push(...[
  {
    "id": "range-sum",
    "title": [
      "Intervallsumme",
      "Range sum",
      "Сумма диапазона",
      "Сума діапазону"
    ],
    "task": [
      "Addiere ganze Zahlen von a bis b einschließlich (0 ≤ a ≤ b ≤ 20).",
      "Add integers from a through b inclusive (0 ≤ a ≤ b ≤ 20).",
      "Сложи целые числа от a до b включительно (0 ≤ a ≤ b ≤ 20).",
      "Додай цілі числа від a до b включно (0 ≤ a ≤ b ≤ 20)."
    ],
    "hint": [
      "<= schließt b ein.",
      "<= includes b.",
      "<= включает b.",
      "<= включає b."
    ],
    "why": [
      "<= schließt b ein.",
      "<= includes b.",
      "<= включает b.",
      "<= включає b."
    ],
    "entry": "rangeSum",
    "source": "function rangeSum(a,b) { let sum=0; for (let i=a; i<b; i++) { sum=sum+i; } return sum; }",
    "sample": [
      2,
      4
    ],
    "block": {
      "from": "i<b",
      "choices": [
        "i<b",
        "i<=b",
        "i>b"
      ]
    },
    "tests": [
      [
        [
          2,
          4
        ],
        9
      ],
      [
        [
          0,
          0
        ],
        0
      ],
      [
        [
          5,
          5
        ],
        5
      ],
      [
        [
          0,
          3
        ],
        6
      ],
      [
        [
          10,
          12
        ],
        33
      ]
    ],
    "expectedPrediction": 5,
    "prediction": [
      5,
      9,
      6
    ]
  },
  {
    "id": "count-multiples",
    "title": [
      "Vielfache zählen",
      "Count multiples",
      "Подсчёт кратных",
      "Підрахунок кратних"
    ],
    "task": [
      "Zähle positive Vielfache von k bis n (1 ≤ k ≤ 20, 0 ≤ n ≤ 40).",
      "Count positive multiples of k up to n (1 ≤ k ≤ 20, 0 ≤ n ≤ 40).",
      "Посчитай положительные кратные k до n (1 ≤ k ≤ 20, 0 ≤ n ≤ 40).",
      "Порахуй додатні кратні k до n (1 ≤ k ≤ 20, 0 ≤ n ≤ 40)."
    ],
    "hint": [
      "Ein Vielfaches hat Rest null.",
      "A multiple has zero remainder.",
      "У кратного остаток равен нулю.",
      "Кратне має нульову остачу."
    ],
    "why": [
      "Ein Vielfaches hat Rest null.",
      "A multiple has zero remainder.",
      "У кратного остаток равен нулю.",
      "Кратне має нульову остачу."
    ],
    "entry": "countMultiples",
    "source": "function countMultiples(n,k) { let count=0; for (let i=1; i<=n; i++) { if (i%k!==0) { count++; } } return count; }",
    "sample": [
      7,
      2
    ],
    "block": {
      "from": "i%k!==0",
      "choices": [
        "i%k!==0",
        "i%k===0",
        "i%k===1"
      ]
    },
    "tests": [
      [
        [
          7,
          2
        ],
        3
      ],
      [
        [
          0,
          1
        ],
        0
      ],
      [
        [
          5,
          1
        ],
        5
      ],
      [
        [
          12,
          3
        ],
        4
      ],
      [
        [
          3,
          5
        ],
        0
      ]
    ],
    "expectedPrediction": 4,
    "prediction": [
      4,
      3,
      5
    ]
  },
  {
    "id": "digit-sum",
    "title": [
      "Quersumme",
      "Digit sum",
      "Сумма цифр",
      "Сума цифр"
    ],
    "task": [
      "Addiere die Ziffern h,t,o (je 0 bis 9).",
      "Add digits h,t,o (each 0 to 9).",
      "Сложи цифры h,t,o (каждая от 0 до 9).",
      "Додай цифри h,t,o (кожна від 0 до 9)."
    ],
    "hint": [
      "Die Quersumme von 307 ist 3+0+7.",
      "The digit sum of 307 is 3+0+7.",
      "Сумма цифр 307 — 3+0+7.",
      "Сума цифр 307 — 3+0+7."
    ],
    "why": [
      "Die Quersumme von 307 ist 3+0+7.",
      "The digit sum of 307 is 3+0+7.",
      "Сумма цифр 307 — 3+0+7.",
      "Сума цифр 307 — 3+0+7."
    ],
    "entry": "digits",
    "source": "function digits(h,t,o) { return h*100+t+o; }",
    "sample": [
      3,
      0,
      7
    ],
    "block": {
      "from": "h*100+t+o",
      "choices": [
        "h*100+t+o",
        "h+t+o",
        "h*t*o"
      ]
    },
    "tests": [
      [
        [
          3,
          0,
          7
        ],
        10
      ],
      [
        [
          0,
          0,
          0
        ],
        0
      ],
      [
        [
          9,
          9,
          9
        ],
        27
      ],
      [
        [
          1,
          2,
          3
        ],
        6
      ],
      [
        [
          0,
          4,
          9
        ],
        13
      ]
    ],
    "expectedPrediction": 307,
    "prediction": [
      307,
      10,
      308
    ]
  },
  {
    "id": "triangle-check",
    "title": [
      "Dreiecksungleichung",
      "Triangle inequality",
      "Неравенство треугольника",
      "Нерівність трикутника"
    ],
    "task": [
      "Prüfe, ob positive Seiten a,b,c ein nicht entartetes Dreieck bilden.",
      "Check whether positive sides a,b,c form a non-degenerate triangle.",
      "Проверь, образуют ли положительные стороны a,b,c невырожденный треугольник.",
      "Перевір, чи утворюють додатні сторони a,b,c невироджений трикутник."
    ],
    "hint": [
      "Jede Seite muss kleiner als die Summe der anderen sein.",
      "Each side must be smaller than the sum of the others.",
      "Каждая сторона меньше суммы двух других.",
      "Кожна сторона менша за суму двох інших."
    ],
    "why": [
      "Jede Seite muss kleiner als die Summe der anderen sein.",
      "Each side must be smaller than the sum of the others.",
      "Каждая сторона меньше суммы двух других.",
      "Кожна сторона менша за суму двох інших."
    ],
    "entry": "triangle",
    "source": "function triangle(a,b,c) { return a+b>c || a+c>b || b+c>a; }",
    "sample": [
      1,
      2,
      3
    ],
    "block": {
      "from": "a+b>c || a+c>b || b+c>a",
      "choices": [
        "a+b>c || a+c>b || b+c>a",
        "a+b>c && a+c>b && b+c>a",
        "a+b>=c && a+c>=b && b+c>=a"
      ]
    },
    "tests": [
      [
        [
          1,
          2,
          3
        ],
        false
      ],
      [
        [
          3,
          4,
          5
        ],
        true
      ],
      [
        [
          9,
          1,
          2
        ],
        false
      ],
      [
        [
          2,
          9,
          2
        ],
        false
      ],
      [
        [
          1,
          1,
          1
        ],
        true
      ]
    ],
    "expectedPrediction": true,
    "prediction": [
      true,
      false
    ]
  },
  {
    "id": "prime-check",
    "title": [
      "Primzahlen",
      "Prime numbers",
      "Простые числа",
      "Прості числа"
    ],
    "task": [
      "Ist n prim? 0 ≤ n ≤ 40, ganzzahlig.",
      "Is n prime? 0 ≤ n ≤ 40, integer.",
      "Является ли n простым? Целое 0 ≤ n ≤ 40.",
      "Чи є n простим? Ціле 0 ≤ n ≤ 40."
    ],
    "hint": [
      "Teste mögliche Teiler von 2 bis n-1; n muss größer als 1 sein.",
      "Test divisors from 2 to n-1; n must exceed 1.",
      "Проверяй делители от 2 до n−1; n больше 1.",
      "Перевіряй дільники від 2 до n−1; n більше 1."
    ],
    "why": [
      "Teste mögliche Teiler von 2 bis n-1; n muss größer als 1 sein.",
      "Test divisors from 2 to n-1; n must exceed 1.",
      "Проверяй делители от 2 до n−1; n больше 1.",
      "Перевіряй дільники від 2 до n−1; n більше 1."
    ],
    "entry": "prime",
    "source": "function prime(n) { if (n<2) { return false; } for (let i=2; i<=n; i++) { if (n%i===0) { return false; } } return true; }",
    "sample": [
      7
    ],
    "block": {
      "from": "i<=n",
      "choices": [
        "i<=n",
        "i<n",
        "i>n"
      ]
    },
    "tests": [
      [
        [
          2
        ],
        true
      ],
      [
        [
          7
        ],
        true
      ],
      [
        [
          1
        ],
        false
      ],
      [
        [
          9
        ],
        false
      ],
      [
        [
          0
        ],
        false
      ],
      [
        [
          37
        ],
        true
      ]
    ],
    "expectedPrediction": false,
    "prediction": [
      false,
      true
    ]
  },
  {
    "id": "common-divisor",
    "title": [
      "Größter gemeinsamer Teiler",
      "Greatest common divisor",
      "НОД",
      "НСД"
    ],
    "task": [
      "Finde den ggT positiver ganzer a,b bis 30.",
      "Find GCD of positive integers a,b up to 30.",
      "Найди НОД положительных целых a,b до 30.",
      "Знайди НСД додатних цілих a,b до 30."
    ],
    "hint": [
      "Beide Reste müssen null sein; speichere den größten gemeinsamen Teiler.",
      "Both remainders must be zero; keep the largest common divisor.",
      "Оба остатка нулевые; сохраняй наибольший общий делитель.",
      "Обидві остачі нульові; зберігай найбільший спільний дільник."
    ],
    "why": [
      "Beide Reste müssen null sein; speichere den größten gemeinsamen Teiler.",
      "Both remainders must be zero; keep the largest common divisor.",
      "Оба остатка нулевые; сохраняй наибольший общий делитель.",
      "Обидві остачі нульові; зберігай найбільший спільний дільник."
    ],
    "entry": "gcd",
    "source": "function gcd(a,b) { let best=1; for (let i=1; i<=a; i++) { if (a%i===0 || b%i===0) { best=i; } } return best; }",
    "sample": [
      12,
      8
    ],
    "block": {
      "from": "a%i===0 || b%i===0",
      "choices": [
        "a%i===0 || b%i===0",
        "a%i===0 && b%i===0",
        "a%i!==0 && b%i!==0"
      ]
    },
    "tests": [
      [
        [
          12,
          8
        ],
        4
      ],
      [
        [
          7,
          5
        ],
        1
      ],
      [
        [
          6,
          6
        ],
        6
      ],
      [
        [
          1,
          10
        ],
        1
      ],
      [
        [
          18,
          24
        ],
        6
      ]
    ],
    "expectedPrediction": 12,
    "prediction": [
      12,
      4,
      13
    ]
  },
  {
    "id": "fibonacci-step",
    "title": [
      "Fibonacci-Folge",
      "Fibonacci sequence",
      "Последовательность Фибоначчи",
      "Послідовність Фібоначчі"
    ],
    "task": [
      "Berechne F(n), 0 ≤ n ≤ 15, F(0)=0, F(1)=1.",
      "Compute F(n), 0 ≤ n ≤ 15, F(0)=0, F(1)=1.",
      "Вычисли F(n), 0 ≤ n ≤ 15, F(0)=0, F(1)=1.",
      "Обчисли F(n), 0 ≤ n ≤ 15, F(0)=0, F(1)=1."
    ],
    "hint": [
      "Speichere a+b vor der Aktualisierung beider Werte.",
      "Store a+b before updating both values.",
      "Сохрани a+b до обновления обоих значений.",
      "Збережи a+b до оновлення обох значень."
    ],
    "why": [
      "Speichere a+b vor der Aktualisierung beider Werte.",
      "Store a+b before updating both values.",
      "Сохрани a+b до обновления обоих значений.",
      "Збережи a+b до оновлення обох значень."
    ],
    "entry": "fib",
    "source": "function fib(n) { let a=0; let b=1; let t=0; for (let i=0; i<n; i++) { t=a*b; a=b; b=t; } return a; }",
    "sample": [
      5
    ],
    "block": {
      "from": "t=a*b",
      "choices": [
        "t=a*b",
        "t=a+b",
        "t=a-b"
      ]
    },
    "tests": [
      [
        [
          0
        ],
        0
      ],
      [
        [
          1
        ],
        1
      ],
      [
        [
          2
        ],
        1
      ],
      [
        [
          5
        ],
        5
      ],
      [
        [
          10
        ],
        55
      ],
      [
        [
          15
        ],
        610
      ]
    ],
    "expectedPrediction": 0,
    "prediction": [
      0,
      5,
      1
    ]
  },
  {
    "id": "nested-grid",
    "title": [
      "Verschachtelte Schleifen",
      "Nested loops",
      "Вложенные циклы",
      "Вкладені цикли"
    ],
    "task": [
      "Zähle Zellen eines Rasters mit r Zeilen und c Spalten (0 ≤ r,c ≤ 8).",
      "Count cells in a grid with r rows and c columns (0 ≤ r,c ≤ 8).",
      "Посчитай клетки сетки с r строками и c столбцами (0 ≤ r,c ≤ 8).",
      "Порахуй клітинки сітки з r рядками та c стовпцями (0 ≤ r,c ≤ 8)."
    ],
    "hint": [
      "Die innere Schleife zählt c Spalten pro Zeile.",
      "The inner loop counts c columns per row.",
      "Внутренний цикл считает c столбцов в строке.",
      "Внутрішній цикл рахує c стовпців у рядку."
    ],
    "why": [
      "Die innere Schleife zählt c Spalten pro Zeile.",
      "The inner loop counts c columns per row.",
      "Внутренний цикл считает c столбцов в строке.",
      "Внутрішній цикл рахує c стовпців у рядку."
    ],
    "entry": "gridCells",
    "source": "function gridCells(r,c) { let n=0; for (let i=0; i<r; i++) { for (let j=0; j<r; j++) { n++; } } return n; }",
    "sample": [
      2,
      3
    ],
    "block": {
      "from": "j<r",
      "choices": [
        "j<r",
        "j<c",
        "j<=c"
      ]
    },
    "tests": [
      [
        [
          2,
          3
        ],
        6
      ],
      [
        [
          0,
          4
        ],
        0
      ],
      [
        [
          4,
          0
        ],
        0
      ],
      [
        [
          1,
          5
        ],
        5
      ],
      [
        [
          8,
          8
        ],
        64
      ]
    ],
    "expectedPrediction": 4,
    "prediction": [
      4,
      6,
      5
    ]
  },
  {
    "id": "shipping-cost",
    "title": [
      "Projekt: Versand",
      "Project: shipping",
      "Проект: доставка",
      "Проєкт: доставка"
    ],
    "task": [
      "3 Grundeinheiten plus 2 pro kg; ab 10 kg entfällt der Grundpreis. 1–20 kg.",
      "3 base units plus 2 per kg; at 10 kg or above, no base charge. 1–20 kg.",
      "3 базовые единицы плюс 2 за кг; от 10 кг базовая плата отменяется. 1–20 кг.",
      "3 базові одиниці плюс 2 за кг; від 10 кг базова плата скасовується. 1–20 кг."
    ],
    "hint": [
      "10 kg gehört zum zweiten Tarif.",
      "10 kg belongs to the second rate.",
      "10 кг относится ко второму тарифу.",
      "10 кг належить до другого тарифу."
    ],
    "why": [
      "10 kg gehört zum zweiten Tarif.",
      "10 kg belongs to the second rate.",
      "10 кг относится ко второму тарифу.",
      "10 кг належить до другого тарифу."
    ],
    "entry": "shipping",
    "source": "function shipping(kg) { if (kg>10) { return 2*kg; } return 3+2*kg; }",
    "sample": [
      10
    ],
    "block": {
      "from": "kg>10",
      "choices": [
        "kg>10",
        "kg>=10",
        "kg<10"
      ]
    },
    "tests": [
      [
        [
          1
        ],
        5
      ],
      [
        [
          9
        ],
        21
      ],
      [
        [
          10
        ],
        20
      ],
      [
        [
          11
        ],
        22
      ],
      [
        [
          20
        ],
        40
      ]
    ],
    "expectedPrediction": 23,
    "prediction": [
      23,
      20,
      24
    ]
  },
  {
    "id": "budget-balance",
    "title": [
      "Projekt: Budget",
      "Project: budget",
      "Проект: бюджет",
      "Проєкт: бюджет"
    ],
    "task": [
      "Berechne den Rest nach zwei Ausgaben; negative Werte sind erlaubt.",
      "Compute the remaining budget after two expenses; negative values allowed.",
      "Вычисли остаток бюджета после двух расходов; отрицательные значения допустимы.",
      "Обчисли залишок бюджету після двох витрат; від’ємні значення допустимі."
    ],
    "hint": [
      "Beide Ausgaben abziehen.",
      "Subtract both expenses.",
      "Вычти оба расхода.",
      "Відніми обидві витрати."
    ],
    "why": [
      "Beide Ausgaben abziehen.",
      "Subtract both expenses.",
      "Вычти оба расхода.",
      "Відніми обидві витрати."
    ],
    "entry": "remaining",
    "source": "function remaining(budget,a,b) { return budget-a+b; }",
    "sample": [
      100,
      30,
      20
    ],
    "block": {
      "from": "budget-a+b",
      "choices": [
        "budget-a+b",
        "budget-a-b",
        "budget+a+b"
      ]
    },
    "tests": [
      [
        [
          100,
          30,
          20
        ],
        50
      ],
      [
        [
          10,
          8,
          5
        ],
        -3
      ],
      [
        [
          0,
          0,
          0
        ],
        0
      ],
      [
        [
          10,
          5,
          5
        ],
        0
      ],
      [
        [
          50,
          0,
          10
        ],
        40
      ]
    ],
    "expectedPrediction": 90,
    "prediction": [
      90,
      50,
      91
    ]
  },
  {
    "id": "sensor-window",
    "title": [
      "Projekt: Sensor",
      "Project: sensor",
      "Проект: датчик",
      "Проєкт: датчик"
    ],
    "task": [
      "Prüfe min ≤ value ≤ max; min ≤ max.",
      "Check min ≤ value ≤ max; min ≤ max.",
      "Проверь min ≤ value ≤ max; min ≤ max.",
      "Перевір min ≤ value ≤ max; min ≤ max."
    ],
    "hint": [
      "Beide Grenzen müssen gelten.",
      "Both bounds must hold.",
      "Обе границы должны соблюдаться.",
      "Обидві межі мають виконуватися."
    ],
    "why": [
      "Beide Grenzen müssen gelten.",
      "Both bounds must hold.",
      "Обе границы должны соблюдаться.",
      "Обидві межі мають виконуватися."
    ],
    "entry": "validReading",
    "source": "function validReading(value,min,max) { return value>=min || value<=max; }",
    "sample": [
      12,
      0,
      10
    ],
    "block": {
      "from": "value>=min || value<=max",
      "choices": [
        "value>=min || value<=max",
        "value>=min && value<=max",
        "value>min && value<max"
      ]
    },
    "tests": [
      [
        [
          12,
          0,
          10
        ],
        false
      ],
      [
        [
          0,
          0,
          10
        ],
        true
      ],
      [
        [
          10,
          0,
          10
        ],
        true
      ],
      [
        [
          -1,
          0,
          10
        ],
        false
      ],
      [
        [
          5,
          5,
          5
        ],
        true
      ]
    ],
    "expectedPrediction": true,
    "prediction": [
      true,
      false
    ]
  },
  {
    "id": "tier-discount",
    "title": [
      "Projekt: Mengenrabatt",
      "Project: quantity discount",
      "Проект: скидка",
      "Проєкт: знижка"
    ],
    "task": [
      "Ein Stück kostet 10; ab 5 Stück kostet jedes 8. Gesamtpreis für 0–20 Stück.",
      "Each item costs 10; from 5 items each costs 8. Total for 0–20 items.",
      "Цена штуки 10; от 5 штук каждая стоит 8. Общая цена для 0–20 штук.",
      "Ціна штуки 10; від 5 штук кожна коштує 8. Загальна ціна для 0–20 штук."
    ],
    "hint": [
      "Wähle zuerst den Stückpreis, dann multipliziere.",
      "Choose the unit price, then multiply.",
      "Выбери цену единицы, затем умножь.",
      "Обери ціну одиниці, потім помнож."
    ],
    "why": [
      "Wähle zuerst den Stückpreis, dann multipliziere.",
      "Choose the unit price, then multiply.",
      "Выбери цену единицы, затем умножь.",
      "Обери ціну одиниці, потім помнож."
    ],
    "entry": "totalPrice",
    "source": "function totalPrice(n) { if (n>=5) { return n*10-2; } return n*10; }",
    "sample": [
      5
    ],
    "block": {
      "from": "n*10-2",
      "choices": [
        "n*10-2",
        "n*8",
        "n*10"
      ]
    },
    "tests": [
      [
        [
          0
        ],
        0
      ],
      [
        [
          4
        ],
        40
      ],
      [
        [
          5
        ],
        40
      ],
      [
        [
          6
        ],
        48
      ],
      [
        [
          20
        ],
        160
      ]
    ],
    "expectedPrediction": 48,
    "prediction": [
      48,
      40,
      49
    ]
  }
]);

// Cross-disciplinary debugging projects, appended to preserve saved mission indices.
EXTRA_MISSIONS.push(...[
  {
    "id": "bounded-sensor",
    "title": [
      "Projekt: Messwert begrenzen",
      "Project: clamp sensor reading",
      "Проект: ограничение показаний датчика",
      "Проєкт: обмеження показань датчика"
    ],
    "task": [
      "Begrenze x auf [lo, hi], lo ≤ hi. Werte im Intervall bleiben unverändert.",
      "Clamp x to [lo, hi], lo ≤ hi. Values inside remain unchanged.",
      "Ограничь x диапазоном [lo, hi], lo ≤ hi. Внутри диапазона значение не меняется.",
      "Обмеж x діапазоном [lo, hi], lo ≤ hi. Усередині діапазону значення не змінюється."
    ],
    "hint": [
      "Unterhalb der Untergrenze gib lo zurück, oberhalb hi.",
      "Return lo below the lower bound and hi above the upper bound.",
      "Ниже нижней границы верни lo, выше верхней — hi.",
      "Нижче нижньої межі поверни lo, вище верхньої — hi."
    ],
    "entry": "clamp",
    "source": "function clamp(x,lo,hi) { if (x<lo) { return hi; } if (x>hi) { return hi; } return x; }",
    "sample": [
      -3,
      0,
      10
    ],
    "block": {
      "from": "if (x<lo) { return hi; }",
      "choices": [
        "if (x<lo) { return hi; }",
        "if (x<lo) { return lo; }",
        "if (x<lo) { return x; }"
      ]
    },
    "tests": [
      [
        [
          -3,
          0,
          10
        ],
        0
      ],
      [
        [
          12,
          0,
          10
        ],
        10
      ],
      [
        [
          5,
          0,
          10
        ],
        5
      ],
      [
        [
          0,
          0,
          10
        ],
        0
      ],
      [
        [
          10,
          0,
          10
        ],
        10
      ],
      [
        [
          2,
          5,
          5
        ],
        5
      ]
    ],
    "expectedPrediction": 10,
    "prediction": [
      10,
      0,
      -3
    ],
    "why": [
      "Unterhalb der Untergrenze gib lo zurück, oberhalb hi.",
      "Return lo below the lower bound and hi above the upper bound.",
      "Ниже нижней границы верни lo, выше верхней — hi.",
      "Нижче нижньої межі поверни lo, вище верхньої — hi."
    ]
  },
  {
    "id": "weighted-score",
    "title": [
      "Projekt: gewichteter Lernwert",
      "Project: weighted learning score",
      "Проект: взвешенный учебный балл",
      "Проєкт: зважений навчальний бал"
    ],
    "task": [
      "Berechne 40% von a plus 60% von b (0–100). Nur ein Übungsmodell, keine Schulnote.",
      "Compute 40% of a plus 60% of b (0–100). Practice model, not a school grade.",
      "Вычисли 40% от a плюс 60% от b (0–100). Учебная модель, не школьная оценка.",
      "Обчисли 40% від a плюс 60% від b (0–100). Навчальна модель, не шкільна оцінка."
    ],
    "hint": [
      "Die Gewichte müssen zusammen 100 ergeben; verwende erst ganze Zahlen und dividiere dann.",
      "Weights must add to 100; use integers first, then divide.",
      "Сумма весов — 100; сначала умножь на целые коэффициенты, затем раздели.",
      "Сума ваг — 100; спочатку помнож на цілі коефіцієнти, потім поділи."
    ],
    "entry": "weighted",
    "source": "function weighted(a,b) { return (40*a+40*b)/100; }",
    "sample": [
      50,
      100
    ],
    "block": {
      "from": "40*a+40*b",
      "choices": [
        "40*a+40*b",
        "40*a+60*b",
        "60*a+40*b"
      ]
    },
    "tests": [
      [
        [
          50,
          100
        ],
        80
      ],
      [
        [
          0,
          100
        ],
        60
      ],
      [
        [
          100,
          0
        ],
        40
      ],
      [
        [
          100,
          100
        ],
        100
      ],
      [
        [
          0,
          0
        ],
        0
      ],
      [
        [
          25,
          75
        ],
        55
      ]
    ],
    "expectedPrediction": 60,
    "prediction": [
      60,
      80,
      70
    ],
    "why": [
      "Die Gewichte müssen zusammen 100 ergeben; verwende erst ganze Zahlen und dividiere dann.",
      "Weights must add to 100; use integers first, then divide.",
      "Сумма весов — 100; сначала умножь на целые коэффициенты, затем раздели.",
      "Сума ваг — 100; спочатку помнож на цілі коефіцієнти, потім поділи."
    ]
  },
  {
    "id": "population-doubling",
    "title": [
      "Projekt: Verdopplungsmodell",
      "Project: doubling model",
      "Проект: модель удвоения",
      "Проєкт: модель подвоєння"
    ],
    "task": [
      "Starte mit n Einheiten und verdopple sie in jeder der t Runden (0 ≤ n ≤ 20, 0 ≤ t ≤ 8). Ideales Rechenmodell.",
      "Start with n units and double them in each of t rounds (0 ≤ n ≤ 20, 0 ≤ t ≤ 8). Idealized arithmetic model.",
      "Начни с n единиц и удваивай их на каждом из t шагов (0 ≤ n ≤ 20, 0 ≤ t ≤ 8). Идеализированная модель.",
      "Почни з n одиниць і подвоюй їх на кожному з t кроків (0 ≤ n ≤ 20, 0 ≤ t ≤ 8). Ідеалізована модель."
    ],
    "hint": [
      "Verdoppeln bedeutet mit 2 multiplizieren, nicht 2 addieren.",
      "Doubling means multiply by 2, not add 2.",
      "Удвоение — умножение на 2, а не прибавление 2.",
      "Подвоєння — множення на 2, а не додавання 2."
    ],
    "entry": "growth",
    "source": "function growth(n,t) { let v=n; for (let i=0; i<t; i++) { v=v+2; } return v; }",
    "sample": [
      3,
      3
    ],
    "block": {
      "from": "v=v+2",
      "choices": [
        "v=v+2",
        "v=v*2",
        "v=v-2"
      ]
    },
    "tests": [
      [
        [
          3,
          3
        ],
        24
      ],
      [
        [
          5,
          0
        ],
        5
      ],
      [
        [
          0,
          8
        ],
        0
      ],
      [
        [
          1,
          1
        ],
        2
      ],
      [
        [
          20,
          8
        ],
        5120
      ],
      [
        [
          2,
          4
        ],
        32
      ]
    ],
    "expectedPrediction": 9,
    "prediction": [
      9,
      24,
      27
    ],
    "why": [
      "Verdoppeln bedeutet mit 2 multiplizieren, nicht 2 addieren.",
      "Doubling means multiply by 2, not add 2.",
      "Удвоение — умножение на 2, а не прибавление 2.",
      "Подвоєння — множення на 2, а не додавання 2."
    ]
  },
  {
    "id": "euclid-gcd",
    "title": [
      "Projekt: Euklidischer Algorithmus",
      "Project: Euclidean algorithm",
      "Проект: алгоритм Евклида",
      "Проєкт: алгоритм Евкліда"
    ],
    "task": [
      "Berechne den größten gemeinsamen Teiler von zwei nichtnegativen ganzen Zahlen bis 100, nicht beide 0.",
      "Find the greatest common divisor of two nonnegative integers up to 100, not both zero.",
      "Найди наибольший общий делитель двух неотрицательных целых чисел до 100, не равных одновременно нулю.",
      "Знайди найбільший спільний дільник двох невід’ємних цілих чисел до 100, не рівних одночасно нулю."
    ],
    "hint": [
      "Der Rest a % b wird vor dem Tausch gespeichert. Bei b=0 ist a der ggT.",
      "Store a % b before swapping. When b=0, a is the GCD.",
      "Сохрани остаток a % b до перестановки. Когда b=0, a — НОД.",
      "Збережи остачу a % b до перестановки. Коли b=0, a — НСД."
    ],
    "entry": "gcd",
    "source": "function gcd(a,b) { let r=0; for (let i=0; i<20 && b!==0; i++) { r=0; a=b; b=r; } return a; }",
    "sample": [
      48,
      18
    ],
    "block": {
      "from": "{ r=0; a=b; b=r; }",
      "choices": [
        "{ r=0; a=b; b=r; }",
        "{ r=a%b; a=b; b=r; }",
        "{ r=b%a; a=b; b=r; }"
      ]
    },
    "tests": [
      [
        [
          48,
          18
        ],
        6
      ],
      [
        [
          18,
          48
        ],
        6
      ],
      [
        [
          0,
          12
        ],
        12
      ],
      [
        [
          12,
          0
        ],
        12
      ],
      [
        [
          17,
          13
        ],
        1
      ],
      [
        [
          89,
          55
        ],
        1
      ],
      [
        [
          100,
          100
        ],
        100
      ]
    ],
    "expectedPrediction": 18,
    "prediction": [
      18,
      6,
      48
    ],
    "why": [
      "Der Rest a % b wird vor dem Tausch gespeichert. Bei b=0 ist a der ggT.",
      "Store a % b before swapping. When b=0, a is the GCD.",
      "Сохрани остаток a % b до перестановки. Когда b=0, a — НОД.",
      "Збережи остачу a % b до перестановки. Коли b=0, a — НСД."
    ]
  }
]);

// AI evaluation fundamentals; numeric exercises, not a trained classifier.
EXTRA_MISSIONS.push(...[
  {
    "id": "ai-classifier-threshold",
    "title": [
      "KI: Klassifikationsschwelle",
      "AI: classification threshold",
      "ИИ: порог классификации",
      "ШІ: поріг класифікації"
    ],
    "task": [
      "Ein Modell meldet einen Treffer bei score ≥ threshold, beide 0–100.",
      "A model predicts positive when score ≥ threshold, both 0–100.",
      "Модель выдаёт положительный класс при score ≥ threshold; оба 0–100.",
      "Модель прогнозує позитивний клас за score ≥ threshold; обидва 0–100."
    ],
    "hint": [
      "Der Schwellenwert selbst gehört zum positiven Bereich.",
      "The threshold itself belongs to the positive range.",
      "Сам порог входит в положительный диапазон.",
      "Сам поріг належить до позитивного діапазону."
    ],
    "entry": "predictClass",
    "source": "function predictClass(score,threshold) { return score>threshold; }",
    "sample": [
      50,
      50
    ],
    "block": {
      "from": "score>threshold",
      "choices": [
        "score>threshold",
        "score>=threshold",
        "score<threshold"
      ]
    },
    "tests": [
      [
        [
          50,
          50
        ],
        true
      ],
      [
        [
          49,
          50
        ],
        false
      ],
      [
        [
          51,
          50
        ],
        true
      ],
      [
        [
          0,
          0
        ],
        true
      ],
      [
        [
          100,
          100
        ],
        true
      ],
      [
        [
          0,
          100
        ],
        false
      ]
    ],
    "expectedPrediction": false,
    "prediction": [
      false,
      true
    ],
    "why": [
      "Der Schwellenwert selbst gehört zum positiven Bereich.",
      "The threshold itself belongs to the positive range.",
      "Сам порог входит в положительный диапазон.",
      "Сам поріг належить до позитивного діапазону."
    ]
  },
  {
    "id": "ai-precision",
    "title": [
      "KI: Precision messen",
      "AI: measure precision",
      "ИИ: точность положительных прогнозов (Precision)",
      "ШІ: точність позитивних прогнозів (Precision)"
    ],
    "task": [
      "Berechne TP / (TP + FP); gib 0 zurück, wenn keine positiven Vorhersagen vorliegen (Konvention in dieser Aufgabe).",
      "Compute TP / (TP + FP); return 0 if there are no positive predictions (convention for this task).",
      "Вычисли TP / (TP + FP); если положительных прогнозов нет, верни 0 (условие этой задачи).",
      "Обчисли TP / (TP + FP); якщо позитивних прогнозів немає, поверни 0 (умова цієї задачі)."
    ],
    "hint": [
      "Der Nenner zählt alle positiv vorhergesagten Fälle.",
      "The denominator counts all predicted positives.",
      "В знаменателе — все положительные прогнозы.",
      "У знаменнику — усі позитивні прогнози."
    ],
    "entry": "precision",
    "source": "function precision(tp,fp) { if (tp+fp===0) { return 0; } return fp/(tp+fp); }",
    "sample": [
      3,
      1
    ],
    "block": {
      "from": "fp/(tp+fp)",
      "choices": [
        "fp/(tp+fp)",
        "tp/(tp+fp)",
        "(tp+fp)/tp"
      ]
    },
    "tests": [
      [
        [
          3,
          1
        ],
        0.75
      ],
      [
        [
          1,
          3
        ],
        0.25
      ],
      [
        [
          0,
          0
        ],
        0
      ],
      [
        [
          0,
          5
        ],
        0
      ],
      [
        [
          5,
          0
        ],
        1
      ],
      [
        [
          2,
          2
        ],
        0.5
      ]
    ],
    "expectedPrediction": 0.25,
    "prediction": [
      0.25,
      0.75,
      1
    ],
    "why": [
      "Der Nenner zählt alle positiv vorhergesagten Fälle.",
      "The denominator counts all predicted positives.",
      "В знаменателе — все положительные прогнозы.",
      "У знаменнику — усі позитивні прогнози."
    ]
  }
]);

// Evaluation fundamentals continued; arithmetic models, not live model inference.
EXTRA_MISSIONS.push(...[
  {
    "id": "ai-recall",
    "title": [
      "KI: Recall",
      "AI: recall",
      "ИИ: полнота (Recall)",
      "ШІ: повнота (Recall)"
    ],
    "task": [
      "Berechne TP / (TP + FN); bei Nenner 0 gib 0 zurück.",
      "Compute TP / (TP + FN); return 0 for a zero denominator.",
      "Вычисли TP / (TP + FN); при нулевом знаменателе верни 0.",
      "Обчисли TP / (TP + FN); за нульового знаменника поверни 0."
    ],
    "hint": [
      "Der Nenner enthält alle tatsächlichen positiven Fälle.",
      "The denominator includes every actual positive case.",
      "В знаменателе все фактически положительные случаи.",
      "У знаменнику всі фактично позитивні випадки."
    ],
    "entry": "recall",
    "source": "function recall(tp,fn) { if (tp+fn===0) { return 0; } return fn/(tp+fn); }",
    "sample": [
      3,
      1
    ],
    "block": {
      "from": "fn/(tp+fn)",
      "choices": [
        "fn/(tp+fn)",
        "tp/(tp+fn)",
        "(tp+fn)/tp"
      ]
    },
    "tests": [
      [
        [
          3,
          1
        ],
        0.75
      ],
      [
        [
          1,
          3
        ],
        0.25
      ],
      [
        [
          0,
          0
        ],
        0
      ],
      [
        [
          0,
          5
        ],
        0
      ],
      [
        [
          5,
          0
        ],
        1
      ],
      [
        [
          2,
          2
        ],
        0.5
      ]
    ],
    "expectedPrediction": 0.25,
    "prediction": [
      0.25,
      0.75,
      1
    ],
    "why": [
      "Der Nenner enthält alle tatsächlichen positiven Fälle.",
      "The denominator includes every actual positive case.",
      "В знаменателе все фактически положительные случаи.",
      "У знаменнику всі фактично позитивні випадки."
    ]
  },
  {
    "id": "ai-f1",
    "title": [
      "KI: F1-Maß",
      "AI: F1 score",
      "ИИ: F1-мера",
      "ШІ: F1-міра"
    ],
    "task": [
      "Berechne 2TP / (2TP + FP + FN); bei Nenner 0 gib 0 zurück.",
      "Compute 2TP / (2TP + FP + FN); return 0 for a zero denominator.",
      "Вычисли 2TP / (2TP + FP + FN); при нулевом знаменателе верни 0.",
      "Обчисли 2TP / (2TP + FP + FN); за нульового знаменника поверни 0."
    ],
    "hint": [
      "F1 verbindet Precision und Recall; TP wird doppelt gezählt.",
      "F1 combines precision and recall; TP is counted twice.",
      "F1 объединяет precision и recall; TP учитывается дважды.",
      "F1 поєднує precision і recall; TP враховується двічі."
    ],
    "entry": "f1",
    "source": "function f1(tp,fp,fn) { if (2*tp+fp+fn===0) { return 0; } return tp/(2*tp+fp+fn); }",
    "sample": [
      3,
      1,
      1
    ],
    "block": {
      "from": "tp/(2*tp+fp+fn)",
      "choices": [
        "tp/(2*tp+fp+fn)",
        "2*tp/(2*tp+fp+fn)",
        "2*tp/(2*tp+fp)"
      ]
    },
    "tests": [
      [
        [
          3,
          1,
          1
        ],
        0.75
      ],
      [
        [
          0,
          0,
          0
        ],
        0
      ],
      [
        [
          5,
          0,
          0
        ],
        1
      ],
      [
        [
          0,
          2,
          2
        ],
        0
      ],
      [
        [
          2,
          2,
          2
        ],
        0.5
      ],
      [
        [
          1,
          0,
          2
        ],
        0.5
      ],
      [
        [
          1,
          2,
          0
        ],
        0.5
      ]
    ],
    "expectedPrediction": 0.375,
    "prediction": [
      0.375,
      0.75,
      1
    ],
    "why": [
      "F1 verbindet Precision und Recall; TP wird doppelt gezählt.",
      "F1 combines precision and recall; TP is counted twice.",
      "F1 объединяет precision и recall; TP учитывается дважды.",
      "F1 поєднує precision і recall; TP враховується двічі."
    ]
  },
  {
    "id": "ai-accuracy",
    "title": [
      "KI: Accuracy",
      "AI: accuracy",
      "ИИ: доля верных прогнозов",
      "ШІ: частка правильних прогнозів"
    ],
    "task": [
      "Berechne (TP + TN) / (TP + TN + FP + FN); für leere Daten 0.",
      "Compute (TP + TN) / (TP + TN + FP + FN); return 0 for empty data.",
      "Вычисли (TP + TN) / (TP + TN + FP + FN); для пустых данных верни 0.",
      "Обчисли (TP + TN) / (TP + TN + FP + FN); для порожніх даних поверни 0."
    ],
    "hint": [
      "Auch richtig negative Fälle zählen als korrekt.",
      "Correct negative predictions also count as correct.",
      "Верные отрицательные прогнозы тоже считаются правильными.",
      "Правильні негативні прогнози також зараховуються."
    ],
    "entry": "accuracy",
    "source": "function accuracy(tp,tn,fp,fn) { let total=tp+tn+fp+fn; if (total===0) { return 0; } return tp/total; }",
    "sample": [
      2,
      6,
      1,
      1
    ],
    "block": {
      "from": "tp/total",
      "choices": [
        "tp/total",
        "(tp+tn)/total",
        "(fp+fn)/total"
      ]
    },
    "tests": [
      [
        [
          2,
          6,
          1,
          1
        ],
        0.8
      ],
      [
        [
          0,
          0,
          0,
          0
        ],
        0
      ],
      [
        [
          0,
          8,
          0,
          0
        ],
        1
      ],
      [
        [
          0,
          0,
          4,
          4
        ],
        0
      ],
      [
        [
          4,
          4,
          0,
          0
        ],
        1
      ],
      [
        [
          1,
          1,
          1,
          1
        ],
        0.5
      ],
      [
        [
          0,
          9,
          0,
          1
        ],
        0.9
      ]
    ],
    "expectedPrediction": 0.2,
    "prediction": [
      0.2,
      0.8,
      1
    ],
    "why": [
      "Auch richtig negative Fälle zählen als korrekt.",
      "Correct negative predictions also count as correct.",
      "Верные отрицательные прогнозы тоже считаются правильными.",
      "Правильні негативні прогнози також зараховуються."
    ]
  },
  {
    "id": "ai-error-cost",
    "title": [
      "KI: Fehlerkosten",
      "AI: error cost",
      "ИИ: стоимость ошибок",
      "ШІ: вартість помилок"
    ],
    "task": [
      "Berechne FP × cFP + FN × cFN. Alle Eingaben sind nichtnegative Zahlen. Dies ist ein vereinfachtes Kostenmodell.",
      "Compute FP × cFP + FN × cFN. All inputs are nonnegative. This is a simplified cost model.",
      "Вычисли FP × cFP + FN × cFN. Все значения неотрицательны. Это упрощённая модель стоимости.",
      "Обчисли FP × cFP + FN × cFN. Усі значення невід’ємні. Це спрощена модель вартості."
    ],
    "hint": [
      "Verschiedene Fehlerarten können unterschiedliche Kosten haben.",
      "Different error types can have different costs.",
      "Разные виды ошибок могут иметь разную стоимость.",
      "Різні типи помилок можуть мати різну вартість."
    ],
    "entry": "errorCost",
    "source": "function errorCost(fp,fn,cfp,cfn) { return fp*cfp+fn*cfp; }",
    "sample": [
      2,
      3,
      1,
      5
    ],
    "block": {
      "from": "fn*cfp",
      "choices": [
        "fn*cfp",
        "fn*cfn",
        "fp*cfn"
      ]
    },
    "tests": [
      [
        [
          2,
          3,
          1,
          5
        ],
        17
      ],
      [
        [
          0,
          0,
          3,
          5
        ],
        0
      ],
      [
        [
          0,
          4,
          1,
          3
        ],
        12
      ],
      [
        [
          3,
          0,
          2,
          7
        ],
        6
      ],
      [
        [
          1,
          1,
          0,
          0
        ],
        0
      ],
      [
        [
          2,
          2,
          3,
          3
        ],
        12
      ],
      [
        [
          4,
          1,
          2,
          0
        ],
        8
      ]
    ],
    "expectedPrediction": 5,
    "prediction": [
      5,
      17,
      10
    ],
    "why": [
      "Verschiedene Fehlerarten können unterschiedliche Kosten haben.",
      "Different error types can have different costs.",
      "Разные виды ошибок могут иметь разную стоимость.",
      "Різні типи помилок можуть мати різну вартість."
    ]
  }
]);
