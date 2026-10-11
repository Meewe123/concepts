# PROGRESS

Журнал для продолжения работы в новой сессии. Сначала прочитать `PLAN.md`.

## Сейчас

- **Фаза 0 — план: готов, ждёт «ок» заказчика.**
- Следующий шаг после «ок» — Фаза 1: движок, ниша banquet, Osiyo Grand (`osiyo-grand-sq4y`) и Billur (`billur-wgah`).

## Принятые решения

- Проект — в папке `concepts/` ветки `claude/new-session-sljpd3` репозитория `Meewe123/dela`, который на GitHub был пустым (Black Star там нет). Предложен переезд в отдельный приватный `Meewe123/concepts`; ждём ответа.
- Next.js 16 + `output: 'export'`, Tailwind v4, токены — CSS-переменные. Бюджет JS — не больше 130 КБ gzip на концепт.
- `/internal` и `/og/[slug]` — файлы `*.dev.tsx`, в публичную сборку не попадают (`pageExtensions`).
- UZ-версия концепта — по адресу `/c/<slug>/uz`, переключатель языка без JS.
- Slug: латиница названия + 4 символа из `abcdefghjkmnpqrstuvwxyz23456789`. Slug всех 23 лидов закреплены в таблице `PLAN.md` §5.
- Аналитика — свой сниппет Cloudflare Web Analytics (не автоматический из Pages), чтобы работал `?me=1`.
- Правки к библиотеке направлений: `showroom-chrome` → Unbounded + Onest, `spa-whisper` → Spectral + Commissioner, `night-shift` → Commissioner + Source Code Pro. Причина: совпадение главного шрифта внутри ниши.

## Ограничения окружения

- Сетевая политика контейнера закрывает `api.cloudflare.com`, `*.pages.dev`, `static.cloudflareinsights.com`, `yandex.uz`, `google.com`. npm и Google Fonts открыты.
- Деплой по умолчанию — Cloudflare Pages «Connect to Git»; `wrangler` — только если откроют `api.cloudflare.com` и положат токен в секреты окружения.
- Скриптов из `D:\dela` (проверка шрифтов, типограф, скриншоты) в контейнере нет — пишутся заново.

## Открытые вопросы к заказчику

1. Отдельный репозиторий `concepts` или папка в `dela`?
2. Деплой: Git-интеграция Cloudflare или `wrangler`?
3. Название студии (страница `/`, плашка, адрес `*.pages.dev`), свой домен — по желанию.
4. Токен Cloudflare Web Analytics (после создания проекта).
5. Позже: ссылка на демо очереди (Urus), канал для Chilanzar Dental, Telegram студии.

## Журнал

- 2026-10-11 — Фаза 0: план, таблица лидов, slug, правки направлений.
