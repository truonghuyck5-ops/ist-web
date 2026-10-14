import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { runInNewContext } from 'node:vm'
import { hoaDonPricingConfig as config } from '../src/data/hoaDonPricingConfig.js'
const read = file => readFileSync(file, 'utf8')
const html = read('dist/hoa-don/index.html')
const text = value => value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}="([^"]*)"`))?.[1]
assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), 'IN HÓA ĐƠN & BIỂU MẪU')
assert.match(html, /<body[^>]*class="hv3 pv3 iv3"/)
const targets = ['calculator','invoice-calculator-form','invoice-size','invoice-ply','invoice-quantity','invoice-result','invoice-unit-price','invoice-total-price','invoice-info','invoice-note','invoice-zalo-btn','invoice-price-table-btn','invoice-price-popup','invoice-price-popup-overlay','invoice-price-popup-close','invoice-popup-title','invoice-popup-subtitle','invoice-popup-note','invoice-price-table-body']
for (const id of targets) assert.equal([...html.matchAll(new RegExp(`id="${id}"`, 'g'))].length, 1, id)
for (const [id, values] of [['invoice-size',Object.keys(config.sizes)],['invoice-ply',config.plyOptions.map(item=>item.value)],['invoice-quantity',config.sizes.A5.plies['1'].quantities.map(item=>String(item.qty))]]) {
  const options = html.match(new RegExp(`<select[^>]*id="${id}"[^>]*>([\\s\\S]*?)</select>`))[1]
  assert.deepEqual([...options.matchAll(/<option[^>]*value="([^"]+)"/g)].map(([,v])=>v),values,id)
}
assert.match(html,/href="#calculator"[^>]*>Tính giá ngay/)
assert.match(html,/id="calculator"[^>]*data-v3-contact-area/)
const order=['id="calculator"','id="uses-heading"','id="hoa-don-samples"','id="production-notes"','id="faq"','id="contact"'].map(id=>html.indexOf(id))
assert.ok(order.every((position,index)=>position>=0 && (!index || position>order[index-1])), 'requested section order')
assert.equal([...html.matchAll(/id="hv3-contact-toggle"/g)].length,1)
assert.match(html,/id="invoice-price-popup"[^>]*aria-hidden="true"/)
assert.match(html,/<title>In hóa đơn, phiếu thu, biểu mẫu tại Cầu Ngang, Vĩnh Long \| IST<\/title>/)
assert.match(html,/rel="canonical" href="https:\/\/insangtao.net\/hoa-don\/"/)
assert.equal([...read('dist/sitemap.xml').matchAll(/<loc>/g)].length,11)
for (const file of ['dist/index.html','dist/san-pham/index.html']) assert.ok(read(file).includes('href="/hoa-don/"'))
for (const route of ['in-nhanh','tui-xop','san-pham/hoa-don']) assert.ok(!existsSync('dist/'+route))
const images=[...html.matchAll(/<img\b[^>]*>/g)].map(([tag])=>tag)
assert.equal(images.filter(tag=>attr(tag,'fetchpriority')==='high').length,1)
assert.equal(images.filter(tag=>attr(tag,'loading')==='lazy').length,3)
for (const tag of images) { for(const key of ['alt','width','height']) assert.ok(attr(tag,key));assert.ok(existsSync('public'+attr(tag,'src'))) }
const page=read('src/pages/hoa-don/index.astro')
assert.equal([...page.matchAll(/import '\.\.\/\.\.\/scripts\/hoa-don-calculator\.client\.js'/g)].length,1)
assert.equal([...page.matchAll(/<HoaDonCalculator\s*\/>/g)].length,1)
assert.doesNotMatch(page,/hoa-don-interactions|calculateHoaDonQuote/)
const lockedSources = {
  "src/data/hoaDonPricingConfig.js": "f16ac795fab8bfe7f6965d6d85eee221eb1c18a48ccb50253bd61889287bea15",
  "src/utils/hoaDonCalculatorLogic.js": "569746ac942def4c22f08f8854746cc29fdee31eba46dbab31bd343e5d25401c",
  "src/scripts/hoa-don-calculator.client.js": "2cd0a08d4eda5a0fc62dd3fbc5a2bfaca1163e3088fa706ddcf4ae340b1488b1"
}
for (const [file,hash] of Object.entries(lockedSources)) assert.equal(createHash('sha256').update(read(file).replaceAll('\r\n','\n')).digest('hex'),hash,'original pricing/runtime: '+file)

// Exercise the original browser client across dependent selects, price-table and tracking.
const logic=read('src/utils/hoaDonCalculatorLogic.js').replace(/import\s+\{[\s\S]*?\}\s+from\s+'[^']+'\s*/,'').replaceAll('export ','')
const api=Function('config',logic+';return {calculateHoaDonQuote,formatCurrency,getSizeOptions,getPlyOptions,getQuantityOptions}')(config)
class Control {
  constructor() { this.value='';this.textContent='';this.innerHTML='';this.href='';this.options=[];this.listeners={};this.attributes={};this.classes=new Set();this.classList={add:(v)=>this.classes.add(v),remove:(v)=>this.classes.delete(v)} }
  replaceChildren(...options){this.options=options;this.value=options[0]?.value??''}
  addEventListener(name,listener){this.listeners[name]=listener}
  setAttribute(key,value){this.attributes[key]=value}
  fire(name){this.listeners[name]?.()}
}
const controls=Object.fromEntries(targets.filter(id=>id!=='calculator').map(id=>['#'+id,new Control()]))
const calculator={querySelector:id=>controls[id]};const calls=[]
const Option=class {constructor(label,value){this.label=label;this.value=value}}
runInNewContext(read('src/scripts/hoa-don-calculator.client.js').replace(/import[\s\S]*?from\s+'[^']+'\s*/g,''),{config,...api,Option,document:{querySelector:()=>calculator},window:{alert:()=>assert.fail('unexpected alert')},trackEvent:(name,params)=>calls.push([name,params])})
assert.equal(controls['#invoice-size'].value,'A5');assert.equal(controls['#invoice-ply'].value,'1');assert.equal(controls['#invoice-quantity'].value,'5');assert.equal(controls['#invoice-total-price'].textContent,api.formatCurrency(150000))
controls['#invoice-size'].value='A6';controls['#invoice-size'].fire('change');controls['#invoice-ply'].value='2';controls['#invoice-ply'].fire('change')
assert.deepEqual(controls['#invoice-quantity'].options.map(item=>item.value),['20','40','80','120'])
controls['#invoice-quantity'].value='40';controls['#invoice-quantity'].fire('change');assert.equal(controls['#invoice-unit-price'].textContent,api.formatCurrency(15000));assert.equal(controls['#invoice-total-price'].textContent,api.formatCurrency(600000))
assert.ok(decodeURIComponent(controls['#invoice-zalo-btn'].href).includes('A6 2 liên'))
controls['#invoice-price-table-btn'].fire('click');assert.equal(controls['#invoice-price-popup'].attributes['aria-hidden'],'false');assert.equal(controls['#invoice-popup-title'].textContent,'A6 / 2 liên');assert.ok(controls['#invoice-price-table-body'].innerHTML.includes('▶ 40 cuốn'))
controls['#invoice-price-popup-close'].fire('click');assert.equal(controls['#invoice-price-popup'].attributes['aria-hidden'],'true')
controls['#invoice-size'].value='A4';controls['#invoice-size'].fire('change');assert.equal(controls['#invoice-quantity'].value,'5');assert.equal(controls['#invoice-total-price'].textContent,api.formatCurrency(350000))
assert.equal(calls.filter(([event])=>event==='calculator_interaction').length,1)
assert.equal(calls.filter(([event])=>event==='calculator_quote').length,1)
for(const [,params] of calls) assert.deepEqual({...params},{calculator:'hoa_don'})
console.log('HOA DON V3 PAGE / ORIGINAL CLIENT / DEPENDENT SELECTS / POPUP / PRIVACY: PASS')
