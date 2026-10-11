import { CF_BEACON_TOKEN } from '@/site.config'

const ME_KEY = 'concepts:me'

/**
 * Cloudflare Web Analytics без персональных данных.
 * ?me=1 запоминает в localStorage, что это мои просмотры, и счётчик больше не грузится; ?me=0 снимает флаг.
 * Параметр me сразу убирается из адресной строки, чтобы случайно не уйти в скопированной ссылке.
 */
export function Analytics() {
  if (!CF_BEACON_TOKEN) return null

  const beacon = JSON.stringify(JSON.stringify({ token: CF_BEACON_TOKEN }))
  const code = `(function(){var k='${ME_KEY}',me=false;try{var u=new URL(location.href),p=u.searchParams.get('me');if(p==='1')localStorage.setItem(k,'1');else if(p==='0')localStorage.removeItem(k);if(p!==null){u.searchParams.delete('me');history.replaceState(history.state,'',u.pathname+u.search+u.hash)}me=p==='1'||localStorage.getItem(k)==='1'}catch(e){me=/[?&]me=1(&|#|$)/.test(location.search)}if(me)return;var s=document.createElement('script');s.defer=true;s.src='https://static.cloudflareinsights.com/beacon.min.js';s.setAttribute('data-cf-beacon',${beacon});document.head.appendChild(s)})()`

  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
