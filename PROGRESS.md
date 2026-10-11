# PROGRESS

Журнал для продолжения работы в новой сессии. Сначала прочитать `PLAN.md`, команды — в `README.md`.

## Сейчас

- **Фаза 1 готова, ждёт проверки заказчика (стоп).** Движок, ниша banquet, Osiyo Grand и Billur — RU и UZ, pitch-наборы, аналитика, деплой.
- Следующий шаг после «ок» — Фаза 2: vet и education. Сначала Doctor & Animals и Mr. Gordon's (read-silent), потом Darel, Зооцентр, Vet Master, Riks, затем залы Royal Rose, Bahor, Версаль.

## Концепты

| Лид | Ссылка | Направление | Статус | Набор |
|---|---|---|---|---|
| Osiyo Grand | https://concepts.yettikun.workers.dev/c/osiyo-grand-sq4y (`/uz`) | suzani-night | read-silent | `pitch/osiyo-grand-sq4y/` |
| Billur | https://concepts.yettikun.workers.dev/c/billur-wgah (`/uz`) | crystal-facet | sent | `pitch/billur-wgah/` |

### Самопроверка (2 раунда)

Оценки после 2-го раунда (из 10): «мой сайт» за 3 с, иерархия, типографика, непохожесть, сигнатура, «дорого», скорость.

- Osiyo Grand: 8.5 · 8.5 · 9 · 9 · 8.5 · 9 · 10
- Billur: 8.5 · 8.5 · 8.5 · 9 · 8.5 · 8 · 10

Что исправлено по раундам:
1. Схема зала на телефоне стояла после кнопки — перенесена сразу под ползунок. Шов на окружности розетки. Прямоугольная «коробка» вокруг кристалла и луч, обрезанный её краем. Метка квартала на схеме перекрывала точку. Цена в меню Osiyo вылезала за рамку. Лишний отступ над формой.
2. Скорость: Performance 74–75 → 99–100 (см. ниже). Луч Billur на десктопе перечёркивал название — сделан круче. Превью ссылки: текст Osiyo налезал на розетку, кристалл Billur был обрезан. Кнопка Billur уходила под край во встроенных браузерах с короткой высотой.

Контакт-лист ниши: `review/banquet-contact-sheet.png` — два концепта не похожи (тёмный изумруд с орнаментом против ледяного белого с оптикой).

### Готовность (локальная сборка, Lighthouse 13, mobile)

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

- В общий CSS попадают `@font-face` всех направлений (~90 правил на два направления). Файлы шрифтов грузятся только нужные, но CSS растёт с числом направлений — к Фазе 3 вынести шрифты направлений из общего бандла.
- Ссылки на карточки Яндекс Карт для всех 23 лидов — `leads/maps.ts` (`mapsUrlFor(slug)`).
- Район Osiyo Grand в таблице не указан — на странице «на Лабзаке».
- Узбекские тексты (страницы и сообщения) помечены TODO: проверить носителем.
- Скриншоты `review/*/full*.png` не коммитятся (большие, пересоздаются `npm run shoot`).

## Ограничения окружения

- Сеть контейнера закрывает `api.cloudflare.com`, `*.workers.dev`, `static.cloudflareinsights.com`, `yandex.uz`, `google.com`. npm и Google Fonts открыты.
- Скриптов из `D:\dela` в облаке нет — написаны заново (`scripts/`).
- В `Meewe123/dela` осталась ветка `claude/new-session-sljpd3` с первой версией плана.

## Открытые вопросы к заказчику

1. Название студии для страницы `/` и плашки (поддомен — yettikun).
2. Позже: ссылка на демо очереди (Urus), канал для Chilanzar Dental, Telegram студии.

## Журнал

- 2026-10-11 — Фаза 0: план, таблица лидов, slug, правки направлений.
- 2026-10-11 — Переезд в `Meewe123/concepts` (main). Каркас Next.js + Cloudflare Workers static assets, noindex, robots, аналитика с `?me=1`.
- 2026-10-11 — Деплой падал без `out/`: сборка перенесена в `build.command` wrangler. Деплой прошёл, поддомен и токен Web Analytics вписаны.
- 2026-10-11 — Фаза 1: движок, ниша banquet, suzani-night (Osiyo Grand), crystal-facet (Billur), RU/UZ, островки без React, OG, pitch-наборы, 2 раунда самопроверки, Lighthouse 99–100.
- 2026-10-11 — Поддомен yettikun, ссылки на карточки Яндекс Карт для всех лидов (`leads/maps.ts`), новое узбекское вступление в сообщениях (TODO: проверить носителем). OG и pitch-наборы Фазы 1 пересобраны.
