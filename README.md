# concepts — фабрика концепт-сайтов для лидов

Каждая компания — конфиг в `leads/<slug>.ts`. Из него собираются сайт `/c/<slug>` (и `/c/<slug>/uz`),
превью ссылки, скриншоты и тексты сообщений. Состояние работы и решения — в `PROGRESS.md`, план — в `PLAN.md`.

## Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | разработка (островки + `next dev`), служебные страницы `/og/<slug>/<lang>` доступны |
| `npm run build` | островки → `next build` → удаление рантайма Next со страниц; результат в `out/` |
| `npm run preview` | `wrangler dev`: сборка и отдача `out/` с правилами Cloudflare |
| `npm run pitch -- <slug>` / `--all` | превью ссылки, сборка, скриншоты и тексты в `pitch/<slug>/` (`--no-og` — без перерисовки превью) |
| `npm run og -- <slug>` / `--all` | только превью ссылки → `public/og/` |
| `npm run shoot -- <slug>` / `--all` | скриншоты в `review/<slug>/` (`--lang uz`) |
| `npm run contact-sheet -- banquet` | все концепты ниши на одном листе → `review/<niche>-contact-sheet.png` |
| `npm run check-fonts` / `-- "Font Name"` | проверка глифов: кириллица, ʻ ʼ, «», —, NBSP, № |

## Деплой

Пуш в `main` → Cloudflare Workers Builds: Deploy command `npx wrangler deploy` (сборку запускает `build.command` в `wrangler.jsonc`).
Адрес: `https://concepts.saidanarkulov23.workers.dev`. Свои просмотры — открывать с `?me=1`.

## Режим «продакшн»

Чек-лист — Фаза 5.
