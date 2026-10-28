// 商品内容集中在这里；封面由本地 HTML / CSS 构成，无外部素材依赖。
const PRODUCTS = [
  { id: 'brand-kit', category: 'design', label: '设计资源 / BRANDING', title: '让品牌有点性格', subtitle: '独立创作者的视觉识别灵感包', creator: '小满设计', initial: '满', price: 49, art: 'identity', tag: 'BRAND KIT', description: '从第一张名片到下一个作品封面，用一套有性格的视觉语言，让你的好点子更容易被记住。', includes: ['3 组原创色彩搭配思路', '品牌语气与字体组合示例', '从灵感到视觉的检查清单'], sample: '品牌起步练习\n1. 用三个词描述你的品牌：亲切、直接、有趣。\n2. 选择一个主色、一个强调色和一个阅读底色。\n3. 写一句只有你的品牌才会说的话。\n\n示例配色：粉 #ff90e8 / 黄 #ffc900 / 米白 #f5f1e8。' },
  { id: 'little-planner', category: 'tools', label: '效率工具 / PRODUCTIVITY', title: '把日子安排得刚刚好', subtitle: '留一点空白的轻量周计划模板', creator: '慢慢工作室', initial: '慢', price: 29, art: 'planner', tag: 'WEEKLY PLANNER', description: '把大目标拆成今天能完成的小事。少一点被填满的格子，多一点专心创造的时间。', includes: ['一周三个重点的规划方法', '每日待办与灵感收集示例', '周末回顾的三个小问题'], sample: '本周计划\n最想完成的 3 件事：\n[ ] 完成一个作品初稿\n[ ] 整理一组灵感参考\n[ ] 给自己留一个空白下午\n\n每周回顾：什么值得继续？什么可以放下？下一步是什么？' },
  { id: 'type-play', category: 'design', label: '设计资源 / TYPOGRAPHY', title: '字里行间，有点意思', subtitle: '让文字自己说话的排版灵感集', creator: '字有意思', initial: '字', price: 39, art: 'type', tag: 'TYPE EXPLORER', description: '文字也有声音。探索大字、小字、留白与节奏，用排版给普通的一句话增加一点表达。', includes: ['大标题与正文的比例练习', '中英混排的留白小贴士', '3 个适合新手的版式练习'], sample: '排版练习\n标题：做一点，好东西。\n副标题：给今天的灵感一个开始。\n正文：用短句把想法讲清楚。\n\n练习参数：标题 48px / 1.15；正文 16px / 1.7；行宽约 32 个汉字。\n先用字号和留白区分层级，再添加颜色。' },
  { id: 'start-small', category: 'learn', label: '灵感手册 / START CREATING', title: '先开始，再慢慢变好', subtitle: '送给每个想做点什么的人的小手册', creator: '好东西编辑部', initial: '好', price: 0, art: 'guide', tag: 'FREE LITTLE GUIDE', description: '不必等到万事俱备。给自己一个小任务、一点时间和一点好奇心，第一件作品就能从这里开始。', includes: ['一个 30 分钟的创作起步练习', '把模糊点子缩小的提问方法', '发布第一版前的轻量检查表'], sample: '30 分钟，做出第一版\n0–5 分钟：写下你想帮谁解决什么小问题。\n5–10 分钟：只选一个最重要的内容或功能。\n10–25 分钟：完成一个粗糙但能用的版本。\n25–30 分钟：检查是否能让一个人真正使用。\n\n第一版的任务是开始，而不是完美。' },
  { id: 'happy-shapes', category: 'design', label: '设计资源 / ILLUSTRATION', title: '给画面一点好心情', subtitle: '活泼几何图形与贴纸构图灵感', creator: '圆角朋友', initial: '圆', price: 19, art: 'shapes', tag: 'HAPPY SHAPES', description: '圆形、星星和一点不那么整齐的线条。用简单的形状为页面增加温度，让你的表达轻松一点。', includes: ['圆形、方形与星形的搭配思路', '封面贴纸与角标布局示例', '几何构图的前后层次练习'], sample: '几何构图配方\n背景：浅蓝色。\n主体：一个黄色大圆，放在画面左侧。\n点缀：右下角加入旋转 15° 的粉色方块。\n线条：统一 2px 深色描边。\n阴影：统一向右下偏移 5px，不加模糊。\n\n留出至少三分之一画面作为呼吸空间。' },
  { id: 'writing-notes', category: 'learn', label: '灵感手册 / WRITING', title: '让好点子，落在纸上', subtitle: '从空白文档到第一段文字的写作卡片', creator: '纸上散步', initial: '纸', price: 25, art: 'writing', tag: 'IDEA TO WORDS', description: '写作从观察开始。把日常的小发现留下来，通过几个简单的问题，把它们变成能分享的故事。', includes: ['三张开头提示卡', '一个故事的轻量结构', '让表达更清楚的修改清单'], sample: '写作提示卡\n卡片 1：最近哪件小事让你停下来多看了一眼？\n卡片 2：你曾经误解了什么，后来又怎样改变想法？\n卡片 3：如果只能给刚开始的自己一个建议，你会说什么？\n\n修改清单：删去空话；加上具体例子；一段只讲一个意思。' }
];

const ART = {
  identity: '<div class="identity-sheet"><small>A LITTLE BRAND, A BIG IDEA.</small><strong>be a little<br>different.</strong><span class="id-flower">✳</span></div><div class="color-chips"><i></i><i></i><i></i></div>',
  planner: '<div class="planner-window"><div class="window-dots">•••</div><strong>A good week.</strong><div class="planner-row"><i></i>MAKE SOMETHING</div><div class="planner-row"><i></i>TAKE A LITTLE BREAK</div><div class="planner-row"><i></i>DO YOUR THING</div></div><span class="planner-spark">✦</span>',
  type: '<div class="type-orbit"></div><div class="type-line">AaBb.</div><div class="type-small">字有意思</div>',
  guide: '<div class="mini-book"><small>A GUIDE FOR THE CURIOUS</small><strong>START<br>SMALL.<br>GO MAKE.</strong><span>↗</span></div><div class="guide-label">给一个<br>新的开始</div>',
  shapes: '<div class="shape-one"></div><div class="shape-two"></div><div class="shape-three">✦</div>',
  writing: '<div class="writing-paper"><small>NOTES FOR YOUR NEXT IDEA</small><strong>One idea.<br>A blank page.</strong><i></i><i></i></div><div class="writing-pencil"></div>'
};

const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const storageKey = 'goodthings:favorites:v1';
let storageAvailable = true;
let favorites = new Set();
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(stored)) favorites = new Set(stored.filter((id) => PRODUCTS.some((p) => p.id === id)));
} catch { storageAvailable = false; }
let category = 'all';
let onlySaved = false;
let query = '';
let activeProduct = null;
let dialogTrigger = null;
let toastTimer;

function priceLabel(product) { return product.price === 0 ? '免费' : `¥${product.price}`; }
function artMarkup(product) { return `<div class="product-art art-${product.art}"><span class="edition">GOODTHINGS / ${String(PRODUCTS.indexOf(product) + 1).padStart(2, '0')}</span>${ART[product.art]}<span class="art-tag">${product.tag}</span></div>`; }
function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('show');
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3200);
}

function renderProducts() {
  const shown = PRODUCTS.filter((p) => (category === 'all' || p.category === category)
    && (!onlySaved || favorites.has(p.id))
    && `${p.title} ${p.subtitle} ${p.creator} ${p.label} ${p.tag}`.toLocaleLowerCase().includes(query));
  $('#product-grid').innerHTML = shown.map((p) => {
    const saved = favorites.has(p.id);
    return `<article class="product-card">
      <div aria-hidden="true">${artMarkup(p)}</div>
      <div class="product-info"><div class="product-category">${escapeHTML(p.label)}</div><h3><button class="product-open" data-open="${p.id}" aria-label="查看${escapeHTML(p.title)}详情">${escapeHTML(p.title)}</button></h3><p>${escapeHTML(p.subtitle)}</p></div>
      <div class="product-bottom"><span class="creator-dot" aria-hidden="true">${escapeHTML(p.initial)}</span><span>${escapeHTML(p.creator)}</span><span class="product-price">${priceLabel(p)}</span><button class="favorite" data-save="${p.id}" aria-label="${saved ? '取消收藏' : '收藏'}${escapeHTML(p.title)}" aria-pressed="${saved}">${saved ? '♥' : '♡'}</button></div>
    </article>`;
  }).join('');
  $('#results-count').textContent = onlySaved ? `${shown.length} 件收藏，留给下次的灵感` : `${shown.length} 件好东西，等你发现`;
  $('#empty-state').hidden = shown.length > 0;
  $('#empty-message').textContent = onlySaved && favorites.size === 0 ? '点亮好物卡片上的爱心，把喜欢的灵感留在这里。' : '换个关键词，灵感也许就在下一个转角。';
  $('#reset-filters').hidden = category === 'all' && !query && !onlySaved;
  $('#saved-nav').setAttribute('aria-pressed', String(onlySaved));
  $('#saved-count').textContent = favorites.size;
  document.querySelectorAll('[data-category]').forEach((button) => {
    const selected = button.dataset.category === category;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function resetFilters() {
  category = 'all'; query = ''; onlySaved = false;
  $('#search').value = '';
  renderProducts();
}

document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => {
  category = button.dataset.category;
  renderProducts();
}));
$('#search').addEventListener('input', (event) => {
  query = event.target.value.trim().toLocaleLowerCase();
  renderProducts();
});
$('#reset-filters').addEventListener('click', () => { resetFilters(); $('#search').focus(); });
$('#empty-reset').addEventListener('click', () => { resetFilters(); $('[data-category="all"]').focus(); });
$('#saved-nav').addEventListener('click', () => {
  onlySaved = !onlySaved;
  category = 'all'; query = ''; $('#search').value = '';
  renderProducts();
  $('#explore').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});

$('#product-grid').addEventListener('click', (event) => {
  const saveButton = event.target.closest('[data-save]');
  if (saveButton) {
    const id = saveButton.dataset.save;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    try { localStorage.setItem(storageKey, JSON.stringify([...favorites])); storageAvailable = true; }
    catch { storageAvailable = false; }
    renderProducts();
    const replacement = document.querySelector(`[data-save="${id}"]`);
    if (replacement) replacement.focus({ preventScroll: true });
    else (document.querySelector('[data-save]') || $('#empty-reset')).focus();
    toast(`${favorites.has(id) ? '已收藏，留给下一次灵感' : '已从收藏中移除'}${storageAvailable ? '' : '（当前浏览器仅保留本次会话）'}`);
    return;
  }
  const openButton = event.target.closest('[data-open]');
  if (!openButton) return;
  activeProduct = PRODUCTS.find((p) => p.id === openButton.dataset.open);
  dialogTrigger = openButton;
  $('#dialog-title').textContent = activeProduct.title;
  $('#dialog-description').textContent = activeProduct.description;
  $('#dialog-category').textContent = activeProduct.label;
  $('#dialog-price').textContent = `${priceLabel(activeProduct)} · 展示价`;
  $('#dialog-art').innerHTML = artMarkup(activeProduct);
  $('#dialog-includes').innerHTML = activeProduct.includes.map((item) => `<li>${escapeHTML(item)}</li>`).join('');
  $('#product-dialog').showModal();
  document.body.style.overflow = 'hidden';
});

const dialog = $('#product-dialog');
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  dialogTrigger?.focus({ preventScroll: true });
});
$('#download-demo').addEventListener('click', () => {
  if (!activeProduct) return;
  const content = `goodthings / 好东西\n${activeProduct.title}\n${'='.repeat(32)}\n\n${activeProduct.sample}\n\n——\n这是起步项目附带的原创演示内容，用于体验真实下载流程。\n页面价格仅作界面展示，本文件下载免费，不包含商业产品或购买凭证。\n`;
  const url = URL.createObjectURL(new Blob(['\uFEFF', content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = `goodthings-${activeProduct.id}-sample.txt`;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
});
$('#year').textContent = new Date().getFullYear();
renderProducts();
