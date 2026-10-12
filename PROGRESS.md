# PROGRESS

Журнал для продолжения работы в новой сессии. Сначала прочитать `PLAN.md`, команды — в `README.md`.

## Сейчас

- **Фаза 3, ниша dental: Denta и Iroda готовы, ждут проверки заказчика (стоп).** Насимова и Chilanzar Dental — ждут данных от заказчика, ничего не выдумываем. Beauty — только после «ок».
- Фаза 2 принята. Ниши vet и education, 9 новых концептов на 9 новых направлениях, кейтеринг, бар и анфилада в планировщике banquet, pitch-наборы, контакт-листы.
- 12.10 заказчик отписал 7 лидам (короткими сообщениями своими словами, не шаблонами). Bahor и Riks — не писать, у них уже есть сайты. Зооцентр — ветшоп, концепт под клинику не подходит: переделать под магазин. Версаль — Telegram на номере не работает, нужен звонок (поле `hold` у лида).
- Следующий шаг после «ок» — dental: Насимова и Chilanzar Dental (по данным заказчика), затем beauty: Expert Beauty, Конфетти, Women Secret, Brookland.

## Концепты

| Лид | Ссылка | Направление | Статус | Набор |
|---|---|---|---|---|
| Osiyo Grand | https://concepts.yettikun.workers.dev/c/osiyo-grand-sq4y (`/uz`) | suzani-night | sent (12.10) | `pitch/osiyo-grand-sq4y/` |
| Billur | https://concepts.yettikun.workers.dev/c/billur-wgah (`/uz`) | crystal-facet | sent (12.10) | `pitch/billur-wgah/` |
| Doctor & Animals | https://concepts.yettikun.workers.dev/c/doctor-animals-htt4 | playful-geometry | sent (12.10) | `pitch/doctor-animals-htt4/` |
| Mr. Gordon’s | https://concepts.yettikun.workers.dev/c/gordons-gc3t | british-textbook | sent (12.10) | `pitch/gordons-gc3t/` |
| Darel | https://concepts.yettikun.workers.dev/c/darel-fakf | warm-paper | sent (12.10) | `pitch/darel-fakf/` |
| Зооцентр | https://concepts.yettikun.workers.dev/c/zoocenter-nm5u | market-fresh | не писать: это ветшоп, концепт под клинику — переделать | `pitch/zoocenter-nm5u/` |
| Vet Master | https://concepts.yettikun.workers.dev/c/vet-master-amh9 | night-vet | sent (12.10) | `pitch/vet-master-amh9/` |
| Riks | https://concepts.yettikun.workers.dev/c/riks-yxk6 | campus-bold | не писать: уже есть сайт | `pitch/riks-yxk6/` |
| Royal Rose | https://concepts.yettikun.workers.dev/c/royal-rose-yz34 (`/uz`) | crimson-velvet | sent (12.10) | `pitch/royal-rose-yz34/` |
| Bahor | https://concepts.yettikun.workers.dev/c/bahor-2utu (`/uz`) | garden-light | не писать: уже есть неплохой сайт | `pitch/bahor-2utu/` |
| Denta | https://concepts.yettikun.workers.dev/c/denta-fukb (`/uz`) | clinical-silk | read-silent | `pitch/denta-fukb/` |
| Iroda | https://concepts.yettikun.workers.dev/c/iroda-vxww (`/uz`) | family-warm | not-contacted | `pitch/iroda-vxww/` |
| Версаль | https://concepts.yettikun.workers.dev/c/versal-kftc (`/uz`) | marble-brass | не отправлено: Telegram на номере не работает, позвонить | `pitch/versal-kftc/` |

### Фаза 3: dental

Планка качества заказчика (12.10): mobile-first 375 px, до 2 шрифтов, 1 основной + 1 акцентный цвет, hover / focus / active у всех кнопок, без стоковых фото, весь JS инлайн, страница до ~150 КБ без шрифтов, цены «450 000 сум». Медицинские правила: без «без боли», «гарантия», «лучшая», «100%», без диагнозов и советов; цены, врачи и сроки — «пример».

- **Сигнатура «Что вас беспокоит?»** (`niches/dental`): шесть вариантов → вилка цены, визиты, срок; у брекетов и импланта рассрочка 6 / 12 мес. (сумма / месяцы, до 1 000 сум); «Болит зуб» — без цены, только «запишем на осмотр» и звонок. Панели переключает CSS `:has()` — работает без JS; островок (2,4 КБ) пишет выбор в хеш (`#braces-12` — ссылку можно переслать), восстанавливает его и передаёт выбор в форму. Якоря прокручиваются без потери хеша.
- Первый визит в 4 шага, контакты с картой-ссылкой (без iframe), запись. Порядок блоков разный: Denta — выбор, визит, акции из карточки, контакты, запись; Iroda — выбор, «для всей семьи», визит, запись, контакты.
- **Denta — clinical-silk** (IBM Plex Sans + Plex Mono): бланк, зубная формула FDI из цифр в первом экране, строки выбора с номерами 01–06.
- **Iroda — family-warm, но на Nunito**: Literata + Ysabeau из библиотеки уже у Darel. Камешки-«семья» в первом экране, круглые плитки, блок «Для всей семьи» → выбор «себя / ребёнка / всю семью» уходит в форму.
- Для всех страниц: островки встраиваются в HTML (`strip-runtime`), hover у `.btn` и `.chip` (только на устройствах с мышью).
- Лиду можно задать свой текст сообщения (`pitchText`, с `{link}`) вместо шаблона по статусу; в `notes.md` — почему такое направление (`directionWhy`), источники с датой (`sources`) и «не проверено» (`unverified`).
- Проверено: все 6 вариантов на RU и UZ (цифры, рассрочка, «пример», хеш, восстановление по ссылке, передача в форму), нет горизонтального скролла на 360 / 375 / 414, запретных слов нет, эмодзи и пустых ссылок нет. Lighthouse mobile, denta-fukb: 99 / 100 / 100, LCP 1,8 с (Slow 4G), 112 КБ всего. HTML страницы — 84 КБ (19 КБ gzip).
- Сеть контейнера закрывает Яндекс, Instagram, Telegram и каталоги — факты сверены только по выдаче веб-поиска; что не подтвердилось — в «Не проверено» в `notes.md` и на сайт не вынесено.

### Фаза 2: самопроверка

Сигнатуры: vet — календарь прививок по виду и возрасту питомца (график с датами, запись с подставленным питомцем); education — тест уровня из 5 вопросов (уровень, ориентир IELTS, подходящая группа, запись с уровнем); banquet — тот же планировщик, плюс кейтеринг (Bahor), бар (Royal Rose), анфилада залов (Версаль).

Что исправлено по раундам:
1. Собака Doctor & Animals была похожа на медведя. В графике прививок «сейчас» дважды и неверный шаг между дозами. Перенос «1 минута» в OG Gordon’s, кружок вокруг «&» в OG Doctor & Animals. У Зооцентра не было лиц у питомцев. Мрамор Версаля — мутные облака вместо прожилок. Столы Royal Rose читались как буква «G».
2. Роза в планировщике Royal Rose была мелкой (лишнее поле под стебель). Анфилада: подписи залезали на линию пола, подсветка большого зала заливала все арки — теперь кольца, внешнее — самый большой зал. Тексты превью Darel и Bahor налезали на рисунок, линия под «Версаль» задевала букву «р». Кнопка Зооцентра уходила под край на 360×640. У Bahor строка начиналась с тире.
3. По Lighthouse: у схемы зала и кнопок залов был общий атрибут `data-hall` — островок вешал `aria-pressed` и клик на схему (задевало и Фазу 1); схема теперь `data-active-hall`. Не было `<main>`. Контраст меди Bahor, латуни Версаля и метки «пример». Onest предзагружался на страницах, где не используется.

Контакт-листы: `review/vet-contact-sheet.png`, `review/education-contact-sheet.png`, `review/banquet-contact-sheet.png` — внутри ниши концепты не похожи (vet: жёлтая геометрия / линия на бумаге / ценники / ночное окно; education: тетрадь / цветные плитки; banquet: изумруд / хрусталь / бархат / сад / мрамор).

### Готовность Фазы 2 (локальная сборка, Lighthouse 13, mobile)

| Страница | Perf | A11y | BP | LCP (Slow 4G) | LCP (Fast 4G) |
|---|---|---|---|---|---|
| doctor-animals-htt4 | 98 | 100 | 100 | 2,0 с | 0,6 с |
| gordons-gc3t | 98 | 100 | 100 | 2,0 с | 0,6 с |
| darel-fakf | 100 | 100 | 100 | 1,5 с | 0,6 с |
| zoocenter-nm5u | 100 | 100 | 100 | 1,4 с | 0,5 с |
| vet-master-amh9 | 100 | 100 | 100 | 1,4 с | 0,6 с |
| riks-yxk6 | 99 | 100 | 100 | 2,0 с | 0,6 с |
| royal-rose-yz34 | 96 | 100 | 100 | 2,3 с | 0,6 с |
| royal-rose-yz34/uz | 99 | 100 | 100 | 1,8 с | — |
| bahor-2utu | 98 | 100 | 100 | 2,0 с | 0,6 с |
| bahor-2utu/uz | 98 | 100 | 100 | 2,0 с | — |
| versal-kftc | 98 | 100 | 100 | 2,0 с | 0,6 с |
| versal-kftc/uz | 98 | 100 | 100 | 2,0 с | 0,6 с |

Osiyo Grand и Billur после правок — 100/100/100 и 99/100/100. Royal Rose ниже остальных из-за занавеса, который расходится при загрузке (Speed Index).

- Нет горизонтального скролла на 360/390/414 px; эмуляция Telegram iOS/Android и Instagram iOS (390×700, 360×640) — главная кнопка на первом экране у всех.
- Островки проверены в браузере: планировщик (ползунок, залы, кейтеринг, анфилада, роза), календарь прививок, часы Ташкента у Vet Master, тест уровня, подстановка в форму. Ошибок в консоли нет.

### Фаза 1: самопроверка (2 раунда)

Оценки после 2-го раунда (из 10): «мой сайт» за 3 с, иерархия, типографика, непохожесть, сигнатура, «дорого», скорость.

- Osiyo Grand: 8.5 · 8.5 · 9 · 9 · 8.5 · 9 · 10
- Billur: 8.5 · 8.5 · 8.5 · 9 · 8.5 · 8 · 10

Что исправлено по раундам:
1. Схема зала на телефоне стояла после кнопки — перенесена сразу под ползунок. Шов на окружности розетки. Прямоугольная «коробка» вокруг кристалла и луч, обрезанный её краем. Метка квартала на схеме перекрывала точку. Цена в меню Osiyo вылезала за рамку. Лишний отступ над формой.
2. Скорость: Performance 74–75 → 99–100 (см. ниже). Луч Billur на десктопе перечёркивал название — сделан круче. Превью ссылки: текст Osiyo налезал на розетку, кристалл Billur был обрезан. Кнопка Billur уходила под край во встроенных браузерах с короткой высотой.

Контакт-лист ниши: `review/banquet-contact-sheet.png` — два концепта не похожи (тёмный изумруд с орнаментом против ледяного белого с оптикой).

### Готовность Фазы 1 (локальная сборка, Lighthouse 13, mobile)

| Страница | Perf | A11y | BP | LCP (Slow 4G) | LCP (Fast 4G) | CLS |
|---|---|---|---|---|---|---|
| osiyo-grand-sq4y | 99 | 100 | 100 | 2,0 с | 0,7 с | 0,001 |
| billur-wgah | 99 | 100 | 100 | 1,9 с | 0,6 с | 0 |
| osiyo-grand-sq4y/uz | 99 | 100 | 100 | 2,0 с | 0,6 с | 0,001 |
| billur-wgah/uz | 100 | 100 | 100 | 1,7 с | 0,6 с | 0 |

- Нет горизонтального скролла на 360/390/414 px (выходят за край только карточки залов в горизонтальной карусели Osiyo — так задумано).
- Эмуляция Telegram iOS/Android и Instagram iOS (UA + окно 390×700 и 360×640): главная кнопка на первом экране, ошибок нет.
- `npm run build` без ошибок и предупреждений типов; маршруты проверены через `wrangler dev`.
- Живой адрес из контейнера недоступен (сеть закрывает workers.dev) — проверяет заказчик.

### Проверить руками на телефоне

1. Превью ссылки в Telegram (вставить ссылку в «Избранное»). Старая картинка — @WebpageBot.
2. Ссылка из Telegram и из Instagram: первый экран, ползунок гостей, «Позвонить», «Открыть в Яндекс Картах», переход на узбекскую версию.
3. `?me=1` один раз на своём телефоне — дальше свои просмотры не считаются.
4. Узбекские тексты — показать носителю.

## Деплой

- Репозиторий `Meewe123/concepts`, ветка `main`. Каждый пуш в `main` собирает и выкладывает сайт (Cloudflare Workers Builds).
- Настройки проекта `concepts` в Cloudflare: Build command — пусто, Deploy command `npx wrangler deploy`, Root directory `/`. Сборку запускает wrangler: `build.command` в `wrangler.jsonc` = `npm run build`.
- `npm run build` = островки (esbuild) → `next build` → `strip-runtime`.
- `wrangler.jsonc`: статика из `out/`; `/c/<slug>` → `out/c/<slug>.html` без редиректа; неизвестный адрес → `404.html`; `preview_urls` выключены.
- Адрес — `https://concepts.yettikun.workers.dev` (`WORKERS_SUBDOMAIN` в `site.config.ts`). Свой домен — `SITE_URL` при сборке.

## Принятые решения

- **Ноль фреймворкового JS на страницах.** Next 16 + `output: 'export'` рендерит HTML; `scripts/strip-runtime.ts` после сборки удаляет все `<script>` без атрибута `data-concept` (рантайм Next/React ≈140 КБ). Интерактив — островки на чистом TS: `niches/<niche>/island.ts` → `public/islands/<niche>.js` (banquet — 3,6 КБ). Логика, общая для разметки и островка, — в `planner-shared.ts`.
- CSS встраивается в `<head>` (`experimental.inlineCss`). Шрифт главного заголовка (латиница) предзагружается: `heroFont` у направления → `data-hero-font` → `strip-runtime`.
- Шрифты направлений — `next/font` с `preload: false`; Onest — общий (`core/fonts.ts`). У Cormorant одно начертание 400 + курсив.
- Схема зала — компоненты направления в `directions/<id>/scheme.tsx` (реестр `directions/schemes.ts`), без next/font. Столы заполняет CSS: `clamp(0, --filled − --i, 1)`.
- Концепт = ниша × направление × лид. Ниша: секции, тексты, сигнатура (`niches/banquet`). Направление: токены, шрифты, Hero, залы, пакеты, схема, заглушки фото, OG (`directions/<id>`). Лид: данные (`leads/<slug>.ts`, проверка в `defineLead`).
- Внутри ниши направления не повторяются — проверка в `leads/index.ts` при сборке.
- Узбекская версия — `/c/<slug>/uz`; `lang` у обёртки и у `<html>` (скрипт до отрисовки).
- noindex: `robots.txt` (открыт только ботам превью: TelegramBot, facebookexternalhit, Facebot, WhatsApp), `<meta name="robots">`, `X-Robots-Tag` из `public/_headers`.
- Аналитика: свой сниппет Cloudflare Web Analytics (`core/analytics.tsx`, токен в `site.config.ts`). `?me=1` — флаг `concepts:me` в localStorage, счётчик не грузится; `?me=0` снимает; параметр убирается из адресной строки.
- Форма — демо: `method="dialog"`, ничего не отправляет даже без JS.
- `/og/[slug]/[lang]` — `page.dev.tsx`, только при `CONCEPTS_TOOLS=1` или `next dev`; `scripts/og.ts` рендерит в `public/og/<slug>.png` и `.uz.png`.
- Сообщения: `scripts/pitch.ts` по `contactStatus`, проверки — ≤ 350 знаков, без эмодзи, без «!!», без запрещённых фраз, ссылка одна, без апострофа вместо ʻ/ʼ. Для сообщений на узбекском с хуком нужен `hookUz`.
- Правки к библиотеке направлений: `showroom-chrome` → Unbounded + Onest, `spa-whisper` → Spectral + Commissioner, `night-shift` → Commissioner + Source Code Pro.

## Известные ограничения и что дальше учесть

- В общий CSS попадают `@font-face` всех направлений; `strip-runtime` вырезает чужие и их предзагрузки на каждой странице, но сборка CSS растёт с числом направлений. Общие шрифты объявлены один раз в `core/fonts.ts`.
- Ссылки на карточки Яндекс Карт для всех 23 лидов — `leads/maps.ts` (`mapsUrlFor(slug)`).
- Район Osiyo Grand в таблице не указан — на странице «на Лабзаке».
- Узбекские тексты (страницы и сообщения) помечены TODO: проверить носителем.
- Сообщение Версаля на узбекском — ровно 350 знаков; при любой правке хука проверить `npm run pitch`.
- Цены, меню, программы курсов, врачи и преподаватели во всех концептах — пример (помечено). Публичные факты — в `notes.md` каждого набора.
- Скриншоты `review/*/full*.png` не коммитятся (большие, пересоздаются `npm run shoot`).

## Ограничения окружения

- Сеть контейнера закрывает `api.cloudflare.com`, `*.workers.dev`, `static.cloudflareinsights.com`, `yandex.uz`, `google.com`. npm и Google Fonts открыты.
- Скриптов из `D:\dela` в облаке нет — написаны заново (`scripts/`).
- В `Meewe123/dela` осталась ветка `claude/new-session-sljpd3` с первой версией плана. В `Meewe123/concepts` ветка `claude/new-session-sljpd3` — промежуточное сохранение Фазы 2 (влито в `main`).

## Открытые вопросы к заказчику

1. Название студии для страницы `/` и плашки (поддомен — yettikun).
2. Позже: ссылка на демо очереди (Urus), канал для Chilanzar Dental, Telegram студии.

## Журнал

- 2026-10-11 — Фаза 0: план, таблица лидов, slug, правки направлений.
- 2026-10-11 — Переезд в `Meewe123/concepts` (main). Каркас Next.js + Cloudflare Workers static assets, noindex, robots, аналитика с `?me=1`.
- 2026-10-11 — Деплой падал без `out/`: сборка перенесена в `build.command` wrangler. Деплой прошёл, поддомен и токен Web Analytics вписаны.
- 2026-10-11 — Фаза 1: движок, ниша banquet, suzani-night (Osiyo Grand), crystal-facet (Billur), RU/UZ, островки без React, OG, pitch-наборы, 2 раунда самопроверки, Lighthouse 99–100.
- 2026-10-11 — Поддомен yettikun, ссылки на карточки Яндекс Карт для всех лидов (`leads/maps.ts`), новое узбекское вступление в сообщениях (TODO: проверить носителем). OG и pitch-наборы Фазы 1 пересобраны.
- 2026-10-11 — Фаза 2: ниши vet и education, Doctor & Animals и Mr. Gordon’s.
- 2026-10-12 — Фаза 2: Darel, Зооцентр, Vet Master, Riks, Royal Rose, Bahor, Версаль; кейтеринг, бар и анфилада в планировщике; 3 раунда самопроверки, Lighthouse 96–100 / 100 / 100, pitch-наборы всех 11 лидов.
- 2026-10-12 — Статусы после рассылки заказчика; поле `hold` («пока не писать» и почему) у Bahor, Riks, Зооцентра.
- 2026-10-12 — Фаза 3, dental: ниша dental («Что вас беспокоит?», первый визит, рассрочка, хеш), Denta (clinical-silk) и Iroda (family-warm на Nunito), RU/UZ, OG, наборы; островки встроены в страницы, hover у кнопок.
