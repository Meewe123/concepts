# PROGRESS

Журнал для продолжения работы в новой сессии. Сначала прочитать `PLAN.md`.

## Сейчас

- Фаза 0 — план: готов. Репозиторий и деплой согласованы.
- Каркас для деплоя готов: Next.js 16 со статическим экспортом, `wrangler.jsonc`, `_headers`, `robots.txt`, счётчик с `?me=1`, временная заглушка на `/`.
- **Следующий шаг — Фаза 1 после «ок»:** движок, ниша banquet, Osiyo Grand (`osiyo-grand-sq4y`) и Billur (`billur-wgah`).

## Деплой

- Репозиторий `Meewe123/concepts`, ветка `main`. Каждый пуш в `main` собирает и выкладывает сайт (Cloudflare Workers Builds).
- Настройки проекта `concepts` в Cloudflare: Build command — пусто, Deploy command `npx wrangler deploy`, Root directory `/`. Сборку запускает сам wrangler: поле `build.command` в `wrangler.jsonc` (`npm run build`) выполняется перед деплоем. Зависимости Workers Builds ставит сам по `package-lock.json`. Node — из `.node-version` (22).
- Первая сборка упала с «assets.directory … /opt/buildhome/repo/out does not exist»: деплой шёл без сборки. Исправлено через `build.command`; проверено `wrangler deploy --dry-run` с удалённой `out/`.
- `wrangler.jsonc`: воркер без кода, статика из `out/`; `/c/<slug>` отдаёт `out/c/<slug>.html` без редиректа; неизвестный адрес — `404.html` с кодом 404; адреса версий (`preview_urls`) выключены.
- Адрес сайта — `https://concepts.<поддомен>.workers.dev`. Поддомен — `WORKERS_SUBDOMAIN` в `site.config.ts` (**пока пустой**); `absoluteUrl()` бросает ошибку, пока его нет, чтобы не собрать ссылку-пустышку. Свой домен — через `SITE_URL` при сборке.
- Локальная проверка: `npm run preview` (wrangler dev сам собирает и отдаёт `out/`).

## Принятые решения

- Next.js 16 + `output: 'export'`, React 19, TypeScript 5.9 strict, Tailwind v4. Токены — CSS-переменные. Бюджет JS — не больше 130 КБ gzip на концепт.
- Алиас импорта `@/` — корень репозитория (`@/core/...`, `@/site.config`).
- `/internal` и `/og/[slug]` — файлы `*.dev.tsx`; их подключает `pageExtensions` только в `next dev` или при `CONCEPTS_TOOLS=1`. В публичную сборку не попадают.
- UZ-версия концепта — `/c/<slug>/uz`, переключатель языка без JS.
- Slug: латиница названия + 4 символа из `abcdefghjkmnpqrstuvwxyz23456789`. Slug всех 23 лидов закреплены в `PLAN.md` §5.
- noindex трижды: `robots.txt`, `<meta name="robots">`, заголовок `X-Robots-Tag` (через `public/_headers`). В `robots.txt` открыт доступ ботам превью: TelegramBot, facebookexternalhit, Facebot, WhatsApp. Иначе в мессенджерах не будет карточки ссылки.
- Аналитика: свой сниппет Cloudflare Web Analytics (`core/analytics.tsx`), токен — `CF_BEACON_TOKEN` в `site.config.ts` (**пока пустой** — счётчик не грузится). `?me=1` ставит флаг `concepts:me` в localStorage и отключает счётчик, `?me=0` снимает флаг, параметр `me` сразу убирается из адресной строки. Проверено в Chromium.
- Правки к библиотеке направлений: `showroom-chrome` → Unbounded + Onest, `spa-whisper` → Spectral + Commissioner, `night-shift` → Commissioner + Source Code Pro. Причина: совпадение главного шрифта внутри ниши.

## Ограничения окружения

- Сетевая политика контейнера закрывает `api.cloudflare.com`, `*.workers.dev`, `static.cloudflareinsights.com`, `yandex.uz`, `google.com`. npm и Google Fonts открыты. Живой сайт проверяет заказчик или нужно добавить `workers.dev` в разрешённые домены окружения.
- Скриптов из `D:\dela` (проверка шрифтов, типограф, скриншоты) в облаке нет — пишутся заново.
- В `Meewe123/dela` осталась ветка `claude/new-session-sljpd3` с первой версией плана (папка `concepts/`) — она там единственная, поэтому стала веткой по умолчанию.

## Открытые вопросы к заказчику

1. Поддомен workers.dev.
2. Токен Cloudflare Web Analytics для `concepts.<поддомен>.workers.dev`.
3. Название студии (страница `/`, подпись на плашке), свой домен — по желанию.
4. Позже: ссылка на демо очереди (Urus), канал для Chilanzar Dental, Telegram студии.

## Журнал

- 2026-10-11 — Фаза 0: план, таблица лидов, slug, правки направлений.
- 2026-10-11 — Переезд в `Meewe123/concepts` (main). Каркас Next.js + Cloudflare Workers static assets, noindex, robots, аналитика с `?me=1`. Сборка, `wrangler dev` и `wrangler deploy --dry-run` проходят.
- 2026-10-11 — Деплой падал без `out/`: сборка перенесена в `build.command` wrangler, Build command в Cloudflare не нужен.
