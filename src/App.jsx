import React from 'react';

// Gør en CSS-tekst ("color:#fff;font-size:12px") til et React-style-objekt.
const styleCache = new Map();
function st(css) {
  if (!css) return undefined;
  if (styleCache.has(css)) return styleCache.get(css);
  const out = {};
  css.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) return;
    const key = prop.startsWith('--') ? prop : prop.replace(/^-webkit-/, 'Webkit-').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = val;
  });
  styleCache.set(css, out);
  return out;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const B = (a, b, w, h, alt) => ({ src: a, small: b, w, h, alt, srcset: b + ' 640w, ' + a + ' ' + w + 'w' });
    this.img = {
      hero: B('/img/hero.jpg', '/img/hero_s.jpg', 1600, 1067, 'Brudepar på en tåget bakke'),
      fotograf: B('/img/fotograf.jpg', '/img/fotograf_s.jpg', 1100, 1506, 'Ellen med kamera'),
      hav1: B('/img/hav1.jpg', '/img/hav1_s.jpg', 1100, 734, 'Ida og Mads på stranden ved et rødt træhus'),
      hav2: B('/img/hav2.jpg', '/img/hav2_s.jpg', 1100, 733, 'De holder om hinanden i vandkanten, lige før solen går ned'),
      hav3: B('/img/hav3.jpg', '/img/hav3_s.jpg', 1100, 733, 'En gåtur langs stranden under klitten efter vielsen'),
      hav4: B('/img/hav4.jpg', '/img/hav4_s.jpg', 1100, 734, 'Et øjeblik for sig selv i læ af klitten'),
      hav5: B('/img/hav5.jpg', '/img/hav5_s.jpg', 1100, 825, 'Ida alene på bakken, mens tågen kommer ind fra havet'),
      hav6: B('/img/hav6.jpg', '/img/hav6_s.jpg', 1100, 733, 'På vej hjem mellem klipperne'),
      land1: B('/img/land1.jpg', '/img/land1_s.jpg', 1100, 733, 'Sofie og Jonas går over marken mod skoven'),
      land2: B('/img/land2.jpg', '/img/land2_s.jpg', 1100, 733, 'Sofie ved det gamle hegn bag laden'),
      land3: B('/img/land3.jpg', '/img/land3_s.jpg', 1100, 1650, 'Op ad bakken til gården, hvor festen venter'),
      land4: B('/img/land4.jpg', '/img/land4_s.jpg', 1100, 1467, 'Det første kys som gift, foran hovedbygningen'),
      land5: B('/img/land5.jpg', '/img/land5_s.jpg', 1100, 733, 'En pause mellem vinstokkene, inden middagen'),
      land6: B('/img/land6.jpg', '/img/land6_s.jpg', 1100, 733, 'Buketten fra marken og skoene, der blev smidt ved dansen'),
      land7: B('/img/land7.jpg', '/img/land7_s.jpg', 1100, 733, 'Langbordene i laden, før gæsterne kommer'),
      land8: B('/img/land8.jpg', '/img/land8_s.jpg', 1100, 1955, 'Første dans under konfetti'),
      par1: B('/img/par1.jpg', '/img/par1_s.jpg', 1100, 733, 'Gennem det høje græs i det sidste lys'),
      par2: B('/img/par2.jpg', '/img/par2_s.jpg', 1100, 733, 'Tåge på fjeldet og ingen andre mennesker'),
      par3: B('/img/par3.jpg', '/img/par3_s.jpg', 1100, 1650, 'Tæt sammen på klipperne i blæsten'),
      par4: B('/img/par4.jpg', '/img/par4_s.jpg', 1100, 1375, 'En pause i græsset under det store træ'),
      par5: B('/img/par5.jpg', '/img/par5_s.jpg', 1100, 1650, 'Latter ved den gamle stenmur'),
      par6: B('/img/par6.jpg', '/img/par6_s.jpg', 1100, 1650, 'Hjem fra stranden på ryggen'),
      det1: B('/img/det1.jpg', '/img/det1_s.jpg', 1100, 1466, 'Bordkortet med perler og silkebånd'),
      det2: B('/img/det2.jpg', '/img/det2_s.jpg', 1100, 1375, 'Ringene på kirkens program'),
      det3: B('/img/det3.jpg', '/img/det3_s.jpg', 1100, 1650, 'Hænder med nye ringe over buketten')
    };
    // Løse fotoprint på forsiden: placering i procent, vinkel og format
    this.prints = [
      { id: 'p1', img: 'hav3', x: 0, y: 6, w: 64, r: -5, ar: '3 / 2' },
      { id: 'p2', img: 'land4', x: 56, y: 0, w: 40, r: 4.5, ar: '3 / 4' },
      { id: 'p3', img: 'par4', x: 8, y: 42, w: 36, r: 2.5, ar: '4 / 5' },
      { id: 'p4', img: 'land1', x: 38, y: 55, w: 60, r: -3, ar: '3 / 2' }
    ];
    this.heroIds = this.prints.map(p => p.img);
    this.seriesData = [
      { id: 'hav', title: 'Ved havet', couple: 'Ida og Mads', place: 'Skagen', year: '2025', photos: ['hav3', 'hav1', 'hav5', 'hav2', 'hav4', 'hav6'],
        intro: 'En vielse på stranden med tolv gæster, sand i skoene og en himmel, der skiftede farve hvert kvarter.' },
      { id: 'land', title: 'På landet', couple: 'Sofie og Jonas', place: 'Gård på Fyn', year: '2026', photos: ['land4', 'land1', 'land6', 'land3', 'land2', 'land7', 'land5', 'land8'],
        intro: 'Langborde i laden, blomster fra marken og en første dans, der varede, til det blev lyst igen.' },
      { id: 'par', title: 'Par i naturen', couple: 'Forlovelser', place: 'Danmark og Norge', year: '2025–26', photos: ['par1', 'par4', 'par2', 'par3', 'par5', 'par6'],
        intro: 'Et parshoot er en god måde at lære hinanden at kende før brylluppet, og en god undskyldning for at komme ud.' }
    ];
    this.credits = {
      hav: [['Sted', 'Stranden ved Grenen og et lejet sommerhus i Skagen'], ['Kjole', 'Købt brugt og syet om af en veninde'], ['Blomster', 'Strandrug og hybenroser fra klitten'], ['Mad', 'Fiskesuppe og is på havnen'], ['Musik', 'Brudgommens bror på guitar']],
      land: [['Sted', 'En privat gård ved Faaborg'], ['Blomster', 'Plukket på marken af brudens mor'], ['Kjole', 'Lånt af brudens mormor'], ['Mad', 'Langbordsmenu fra gårdens eget køkken'], ['Musik', 'En trio fra Odense og en DJ til natten']],
      par: [['Steder', 'Mols Bjerge, Romsdalen i Norge og stranden ved Hornbæk'], ['Tøj', 'Parrenes eget, med et par skift'], ['Tid', 'To timer, og en hel dag i Norge']]
    };
    this.faqData = [
      ['Hvad sker der, hvis det regner?', 'Så tager vi paraplyerne frem. Regn og overskyet vejr giver noget af det smukkeste lys, og vi aftaler altid en plan B indendørs på forhånd.'],
      ['Hvor mange billeder får vi?', 'Mindst 60 fra et parshoot og 300 til 600 fra et bryllup, afhængigt af pakken. Jeg sorterer selv de dårlige fra, så I kun får dem, der er værd at gemme.'],
      ['Hvor hurtigt får vi billederne?', 'Et lille udvalg inden for en uge, så I har noget at dele. Hele galleriet inden for seks uger.'],
      ['Rejser du?', 'Ja, i hele Danmark og Norden. Kørsel uden for Sjælland og eventuel overnatning aftaler vi, før I booker.'],
      ['Kan vi se et helt bryllup?', 'Ja. Skriv til mig, så sender jeg et link til et helt galleri fra morgen til nat, ikke kun de bedste billeder.'],
      ['Hvordan booker vi datoen?', 'Når vi har talt sammen, sender jeg en aftale. Datoen er jeres, når aftalen er underskrevet og depositummet på [beløb] er betalt.']
    ];
    this.clientIds = ['land4', 'land1', 'det3', 'land6', 'land3', 'det1', 'land2', 'land7', 'det2', 'land5', 'land8'];
    // Håndtegnede ringe, så hver markering ser lidt forskellig ud
    this.rings = [
      'M58 7 C 83 9, 97 28, 94 52 C 91 78, 70 95, 45 93 C 19 91, 4 72, 7 47 C 10 22, 30 5, 55 8 C 63 9, 69 12, 73 16',
      'M40 9 C 66 3, 94 18, 95 46 C 96 75, 74 96, 47 95 C 22 94, 5 76, 6 50 C 7 27, 24 9, 49 6 C 56 5, 62 7, 66 10',
      'M62 10 C 86 15, 96 36, 92 58 C 88 82, 64 97, 40 92 C 16 87, 3 66, 8 42 C 13 18, 37 4, 60 8 C 66 9, 70 11, 74 15'
    ];
    this.packages = [
      { id: 'par', name: 'Parshoot', hours: '2 timer', price: '4.500 kr', desc: 'Forlovelse eller bare jer to et sted, I holder af. Mindst 60 færdige billeder.' },
      { id: 'lille', name: 'Lille bryllup', hours: '5 timer', price: '12.900 kr', desc: 'Forberedelser, vielse, portrætter og starten på middagen. Mindst 300 færdige billeder.' },
      { id: 'hele', name: 'Hele dagen', hours: '10 timer', price: '19.900 kr', desc: 'Fra morgenkaffen til dansen, et parshoot før brylluppet og en fotobog i hør. Mindst 600 færdige billeder.' }
    ];
    this.legalData = [
      ['Hvem behandler jeres oplysninger', 'Ellen Vinter Fotografi, CVR [CVR-nummer], [Adresse], København. Kontakt: [E-mail].'],
      ['Hvilke oplysninger', 'Når I skriver til mig, gemmer jeg jeres navne, e-mail, telefonnummer, dato, sted og besked. Bliver I kunder, gemmer jeg også billederne fra jeres dag.'],
      ['Hvorfor', 'For at svare jer, indgå og opfylde aftalen og levere billederne. Grundlaget er jeres samtykke og aftalen (databeskyttelsesforordningens artikel 6, stk. 1, litra a og b).'],
      ['Billeder på hjemmesiden', 'Jeg viser kun billeder af jer i min portfolio, hvis I har sagt ja skriftligt. I kan altid trække det tilbage.'],
      ['Hvor længe', 'Forespørgsler, der ikke bliver til en aftale, slettes efter [periode]. Kundegalleriet ligger online i [periode] efter levering.'],
      ['Jeres rettigheder', 'I kan få indsigt, rettelse, sletning, begrænsning og dataportabilitet og gøre indsigelse. I kan klage til Datatilsynet på datatilsynet.dk.']
    ];
    let reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    this.reduce = reduce;
    let favs = [];
    try { favs = JSON.parse(window.localStorage.getItem('ev.favs') || '[]'); } catch (e) {}
    this.state = {
      view: 'home', series: 'hav', menuOpen: false, y: 0, lb: null,
      pkg: null, f: { date: '', place: '', names: '', mail: '', phone: '', msg: '', ok: false }, sent: false, sentNames: '',
      seriesMode: 'story', code: '', codeErr: false, logged: false, favs: Array.isArray(favs) ? favs : [], filter: 'all', clientMsg: '',
      order: ['p1', 'p2', 'p3', 'p4']
    };
    this.onScroll = this.onScroll.bind(this);
    this.onKey = (e) => {
      if (!this.state.lb) { if (e.key === 'Escape' && this.state.menuOpen) this.setState({ menuOpen: false }); return; }
      if (e.key === 'Escape') this.setState({ lb: null });
      else if (e.key === 'ArrowRight') this.lbStep(1);
      else if (e.key === 'ArrowLeft') this.lbStep(-1);
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('keydown', this.onKey);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('keydown', this.onKey);
    if (this.raf) cancelAnimationFrame(this.raf);
  }
  componentDidUpdate() {
    // Indlæs naboerne i fuldskærmsvisningen på forhånd, så skiftet er øjeblikkeligt
    if (!this.state.lb) return;
    const list = this.lbList(); if (!list.length) return;
    [1, -1].forEach(d => { const id = list[(this.state.lb.i + d + list.length) % list.length]; if (id && this.img[id]) { const im = new Image(); im.src = this.img[id].src; } });
  }
  onScroll() {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = null;
      const y = Math.round(window.scrollY || 0);
      if ((y > 30) !== (this.state.y > 30)) this.setState({ y });
    });
  }

  scrollTop() { try { window.scrollTo(0, 0); } catch (e) {} }
  // Finder afsnittet ud fra den knap, der blev trykket på, så det også virker i en indkapslet visning
  goSection(id, ev) {
    const page = { bryllupper: 'weddings', om: 'about', priser: 'prices', booking: 'contact' }[id];
    if (page) { this.show(page); return; }
    let root = null;
    try { root = ev && ev.currentTarget && ev.currentTarget.getRootNode ? ev.currentTarget.getRootNode() : null; } catch (e) {}
    if (root) this.root = root;
    const r = this.root || document;
    const go = () => {
      const el = (r.getElementById ? r.getElementById(id) : null) || (r.querySelector ? r.querySelector('#' + id) : null) || document.getElementById(id);
      if (el) this.scrollToEl(el);
    };
    this.setState({ menuOpen: false, lb: null });
    if (this.state.view !== 'home') { this.setState({ view: 'home' }); setTimeout(go, 60); } else go();
  }
  // Scroller til et afsnit. Virker både på en almindelig side og når siden vises
  // inde i en ramme, hvor det er rammen udenom, der scroller.
  scrollToEl(el) {
    const findScroller = (node) => {
      let n = node && node.parentElement;
      while (n) {
        const cs = n.ownerDocument.defaultView.getComputedStyle(n);
        if (/(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 1) return n;
        n = n.parentElement;
      }
      const se = node && node.ownerDocument.scrollingElement;
      return se && se.scrollHeight > se.clientHeight + 1 ? se : null;
    };
    try {
      const before = el.getBoundingClientRect().top;
      const own = findScroller(el);
      if (own) {
        const top = el.getBoundingClientRect().top - (own === el.ownerDocument.scrollingElement ? 0 : own.getBoundingClientRect().top) + own.scrollTop - 76;
        own.scrollTo({ top, behavior: 'auto' });
      }
      if (Math.abs(el.getBoundingClientRect().top - before) < 2 && Math.abs(before - 76) > 4) {
        // Siden scroller ikke selv: scroll rammen udenom i stedet
        let w = el.ownerDocument.defaultView;
        let frame = null;
        try { frame = w.frameElement; } catch (e) { frame = null; }
        while (frame) {
          const sc = findScroller(frame);
          if (sc) { sc.scrollTop += before - 76; break; }
          try { w = frame.ownerDocument.defaultView; frame = w.frameElement; } catch (e) { frame = null; }
        }
      }
    } catch (e) {
      try { el.scrollIntoView({ block: 'start' }); } catch (e2) {}
    }
  }

  show(view, extra) { this.setState(Object.assign({ view, menuOpen: false, lb: null }, extra || {})); this.scrollTop(); }

  saveFavs(favs) { try { window.localStorage.setItem('ev.favs', JSON.stringify(favs)); } catch (e) {} }
  toggleFav(id) {
    const has = this.state.favs.indexOf(id) >= 0;
    const favs = has ? this.state.favs.filter(x => x !== id) : this.state.favs.concat(id);
    this.saveFavs(favs);
    this.setState({ favs, clientMsg: '' });
  }

  // Demo: nogle datoer er optaget (stabilt pr. dato), især lørdage om sommeren.
  dateStatus(v) {
    if (!v) return null;
    const d = new Date(v + 'T12:00:00');
    if (isNaN(d)) return null;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (d < today) return 'past';
    let h = 0; for (let i = 0; i < v.length; i++) h = (h * 31 + v.charCodeAt(i)) >>> 0;
    const summerSat = d.getDay() === 6 && d.getMonth() >= 5 && d.getMonth() <= 7;
    return (summerSat ? h % 2 === 0 : h % 5 === 0) ? 'booked' : 'free';
  }

  visibleClientIds() {
    return this.state.filter === 'favs' ? this.clientIds.filter(id => this.state.favs.indexOf(id) >= 0) : this.clientIds;
  }
  lbList() {
    const s = this.state;
    if (!s.lb) return [];
    if (s.lb.list === 'client') return this.visibleClientIds();
    if (s.lb.list === 'hero') return this.heroIds;
    const ser = this.seriesData.find(x => x.id === s.series);
    return ser ? ser.photos : [];
  }
  lbStep(dir) {
    const list = this.lbList(); if (!list.length) return;
    const i = (this.state.lb.i + dir + list.length) % list.length;
    this.setState({ lb: Object.assign({}, this.state.lb, { i }) });
  }

  chip(sel) {
    return 'min-height:44px;padding:0 16px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s;border:1.5px solid ' +
      (sel ? '#202322;background:#202322;color:#EEF0ED' : '#C9CDC9;background:#F7F8F6;color:#202322');
  }

  renderVals() {
    const s = this.state, I = this.img;
    const isHome = s.view === 'home';
    const scrolled = s.y > 30 || !isHome;
    const ser = this.seriesData.find(x => x.id === s.series) || this.seriesData[0];
    const pk = this.packages.find(p => p.id === s.pkg) || null;
    const f = s.f;
    const st = this.dateStatus(f.date);
    const mailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.mail.trim());
    const namesOk = f.names.trim().length > 1;
    const canSend = mailOk && namesOk && f.ok;
    const formHint = canSend ? 'Klar til at sende.' : !namesOk ? 'Skriv jeres navne for at sende.' : !mailOk ? 'Skriv en e-mail, jeg kan svare på.' : 'Sæt flueben, så jeg må gemme jeres oplysninger.';
    const today = new Date(); const pad = n => String(n).padStart(2, '0');
    const minDate = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

    const navStyle = (on) => 'font-size:16px;font-weight:' + (on ? '700' : '500') + ';padding:12px 0;text-decoration:' + (on ? 'underline' : 'none') + ';text-underline-offset:6px;text-decoration-thickness:1.5px';
    const nav = [['Bryllupper', 'weddings'], ['Om Ellen', 'about'], ['Priser', 'prices'], ['Kontakt', 'contact'], ['Kundegalleri', 'client']]
      .map(([label, v]) => {
        const on = s.view === v || (v === 'weddings' && s.view === 'series');
        return { label, href: '#' + v, current: on ? 'page' : 'false', style: navStyle(on), go: (ev) => { if (ev) ev.preventDefault(); this.show(v); } };
      });

    const visible = this.visibleClientIds();
    const favCount = s.favs.filter(id => this.clientIds.indexOf(id) >= 0).length;

    let lb = null;
    if (s.lb) {
      const list = this.lbList();
      const i = Math.min(s.lb.i, list.length - 1);
      const id = list[i];
      if (id) {
        const p = I[id]; const isFav = s.favs.indexOf(id) >= 0;
        lb = {
          src: p.src, alt: p.alt, counter: (i + 1) + ' / ' + list.length,
          canFav: s.lb.list === 'client', isFav, favLabel: isFav ? 'Fjern ringen' : 'Slå ring om',
          favStyle: 'min-height:44px;padding:0 18px;' + (isFav ? 'background:#C8322B;color:#fff;border:1.5px solid #C8322B' : 'background:transparent;color:#EEF0ED;border:1.5px solid rgba(238,240,237,.5)'),
          fav: () => this.toggleFav(id)
        };
      }
    }

    return {
      img: I,
      isHome, isSeries: s.view === 'series',
      showMain: ['home', 'weddings', 'about', 'prices', 'contact'].indexOf(s.view) >= 0,
      mainStyle: 'padding-bottom:' + (['weddings', 'about', 'prices'].indexOf(s.view) >= 0 ? '150px' : '0'),
      isAbout: s.view === 'about', goAbout: () => this.show('about'),
      showWeddings: isHome || s.view === 'weddings', showAbout: isHome || s.view === 'about',
      showPrices: isHome || s.view === 'prices', showContact: isHome || s.view === 'contact', isClient: s.view === 'client', isLegal: s.view === 'legal',
      headerStyle: 'position:fixed;top:0;left:0;right:0;z-index:50;transition:background .3s,border-color .3s;background:' + (scrolled || s.menuOpen ? 'rgba(238,240,237,0.95)' : 'rgba(238,240,237,0)') +
        ';backdrop-filter:' + (scrolled ? 'blur(8px)' : 'none') + ';-webkit-backdrop-filter:' + (scrolled ? 'blur(8px)' : 'none') + ';border-bottom:1.5px solid ' + (scrolled ? '#202322' : 'transparent'),
      nav, menuOpen: s.menuOpen, menuIcon: s.menuOpen ? 'M4 4l10 10M14 4L4 14' : 'M2 5h14M2 9h14M2 13h14',
      toggleMenu: () => this.setState({ menuOpen: !s.menuOpen }),
      goHome: (ev) => { if (ev) ev.preventDefault(); this.show('home', { y: 0 }); },
      goSeriesSec: (ev) => this.goSection('bryllupper', ev),
      goBookingSec: (ev) => this.goSection('booking', ev),
      openClient: (ev) => { if (ev) ev.preventDefault(); this.show('client'); },
      openPrivacy: (ev) => { if (ev) ev.preventDefault(); this.show('legal'); },
      noop: (ev) => { if (ev) ev.preventDefault(); },

      prints: this.prints.map((p, n) => {
        const z = s.order.indexOf(p.id), top = z === s.order.length - 1;
        return {
          src: I[p.img].small, label: top ? 'Vis i fuld skærm: ' + I[p.img].alt :'Læg billedet øverst: ' + I[p.img].alt,
          style: 'left:' + p.x + '%;top:' + p.y + '%;width:' + p.w + '%;z-index:' + (z + 1) + ';transform:rotate(' + (top ? p.r * 0.4 : p.r) + 'deg)' + (top ? ' scale(1.02)' : '') + ';animation-delay:' + (0.15 + n * 0.14) + 's',
          imgStyle: 'aspect-ratio:' + p.ar,
          tap: () => {
            if (top) { this.setState({ lb: { list: 'hero', i: n } }); return; }
            this.setState({ order: s.order.filter(x => x !== p.id).concat(p.id) });
          }
        };
      }),

      series: this.seriesData.map(x => ({
        title: x.title, couple: x.couple, place: x.place, year: x.year, count: String(x.photos.length),
        thumbs: x.photos.slice(0, 4).map(id => I[id].small),
        open: () => this.show('series', { series: x.id })
      })),
      storyMode: s.seriesMode !== 'sheet', sheetMode: s.seriesMode === 'sheet',
      modeChips: [['story', 'Store billeder'], ['sheet', 'Kontaktark']].map(([id, label]) => ({ label, sel: s.seriesMode === id, style: this.chip(s.seriesMode === id), pick: () => this.setState({ seriesMode: id }) })),
      faq: this.faqData.map(x => ({ q: x[0], a: x[1] })),
      cur: {
        title: ser.title, couple: ser.couple, place: ser.place, year: ser.year, intro: ser.intro,
        edge: (ser.couple + ' ' + ser.year).toUpperCase(),
        creditsTitle: ser.id === 'par' ? 'Om shootene' : 'Om dagen',
        credits: (this.credits[ser.id] || []).map(x => ({ k: x[0], v: x[1] })),
        photos: ser.photos.map((id, n) => {
          const p = I[id]; const land = p.w > p.h;
          return { n: String(n + 1), thumb: p.small, src: land ? p.src : p.small, srcset: p.srcset, alt: p.alt, w: p.w, h: p.h,
            cls: land ? 'land' : 'port', sizes: land ? '(max-width: 1320px) 100vw, 1224px' : '(max-width: 639px) 100vw, 50vw',
            open: () => this.setState({ lb: { list: 'series', i: n } }) };
        })
      },
      backToSeries: (ev) => this.goSection('bryllupper', ev),
      nextSeries: () => { const i = this.seriesData.indexOf(ser); this.show('series', { series: this.seriesData[(i + 1) % this.seriesData.length].id }); },

      packages: this.packages.map(p => ({ name: p.name, hours: p.hours, price: p.price, desc: p.desc, pick: (ev) => { this.setState({ pkg: p.id }); this.goSection('booking', ev); } })),

      formOpen: !s.sent, formSent: s.sent,
      pkChips: this.packages.map(p => ({ label: p.name, sel: s.pkg === p.id, style: this.chip(s.pkg === p.id), pick: () => this.setState({ pkg: s.pkg === p.id ? null : p.id }) }))
        .concat([{ label: 'Ved ikke endnu', sel: s.pkg === 'ved-ikke', style: this.chip(s.pkg === 'ved-ikke'), pick: () => this.setState({ pkg: s.pkg === 'ved-ikke' ? null : 'ved-ikke' }) }]),
      f, minDate,
      onDate: (e) => this.setState({ f: Object.assign({}, f, { date: e.target.value }) }),
      onPlace: (e) => this.setState({ f: Object.assign({}, f, { place: e.target.value }) }),
      onNames: (e) => this.setState({ f: Object.assign({}, f, { names: e.target.value }) }),
      onMail: (e) => this.setState({ f: Object.assign({}, f, { mail: e.target.value }) }),
      onPhone: (e) => this.setState({ f: Object.assign({}, f, { phone: e.target.value }) }),
      onMsg: (e) => this.setState({ f: Object.assign({}, f, { msg: e.target.value }) }),
      onOk: (e) => this.setState({ f: Object.assign({}, f, { ok: !!e.target.checked }) }),
      hasDateMsg: !!st,
      dateMsg: st === 'past' ? 'Den dato er allerede gået. Vælg en dato frem i tiden.' : st === 'booked' ? 'Jeg er desværre booket den dag. Skriv alligevel, så anbefaler jeg en kollega, jeg selv stoler på.' : 'Jeg er ledig den dag lige nu.',
      dateMsgStyle: 'margin:-10px 0 0;padding:12px 14px;font-size:15px;line-height:1.5;border-left:3px solid ' + (st === 'free' ? '#2E6B3A;background:#E3EDE4;color:#1F4728' : st === 'booked' ? '#C8322B;background:#F5E3E1;color:#7A1F19' : '#5F6461;background:#E3E6E3;color:#202322'),
      formHint, sendDisabled: !canSend,
      sendStyle: canSend ? 'background:#202322;color:#EEF0ED;border:1.5px solid #202322' : 'background:transparent;color:#7D827F;border:1.5px solid #C9CDC9;cursor:not-allowed',
      send: () => { if (!canSend) return; this.setState({ sent: true, sentNames: f.names.trim() }); },
      sentTitle: 'Tak, ' + (s.sentNames || '') + '.',
      sentText: 'Jeres forespørgsel er sendt' + (pk ? ' med "' + pk.name + '"' : '') + '. Jeg svarer inden for to hverdage på ' + (f.mail || 'jeres mail') + '.',
      newForm: () => this.setState({ sent: false, pkg: null, f: { date: '', place: '', names: '', mail: '', phone: '', msg: '', ok: false } }),

      notLogged: !s.logged, logged: s.logged, codeVal: s.code, codeErr: s.codeErr,
      onCode: (e) => this.setState({ code: e.target.value, codeErr: false }),
      codeKey: (e) => { if (e.key === 'Enter') { const ok = s.code.trim().toUpperCase().replace(/\s|&|OG/g, '') === 'SOFIEJONAS'; this.setState(ok ? { logged: true, codeErr: false } : { codeErr: true }); } },
      login: () => { const ok = s.code.trim().toUpperCase().replace(/\s|&|OG/g, '') === 'SOFIEJONAS'; this.setState(ok ? { logged: true, codeErr: false } : { codeErr: true }); },
      logout: () => this.setState({ logged: false, code: '', clientMsg: '', filter: 'all' }),
      filters: [['all', 'Alle ' + this.clientIds.length], ['favs', 'Med ring ' + favCount]].map(([id, label]) => ({ label, sel: s.filter === id, style: this.chip(s.filter === id), pick: () => this.setState({ filter: id, clientMsg: '' }) })),
      favText: favCount === 0 ? 'Ingen ringe endnu' : favCount + (favCount === 1 ? ' ring' : ' ringe') + ' af 8' + (favCount > 8 ? ', lidt for mange' : ''),
      noFavs: !favCount,
      sendFavStyle: 'min-height:44px;padding:0 16px;' + (favCount ? 'background:#202322;color:#EEF0ED;border:1.5px solid #202322' : 'background:transparent;color:#7D827F;border:1.5px solid #C9CDC9;cursor:not-allowed'),
      sendFavs: () => { if (favCount) this.setState({ clientMsg: 'Valget er sendt. Ellen har fået jeres ' + favCount + ' billeder og går i gang med albummet.' }); },
      download: () => this.setState({ clientMsg: 'I den rigtige version henter I her alle billeder i fuld størrelse som én zip-fil.' }),
      clientMsg: s.clientMsg,
      noneShown: s.logged && !visible.length,
      clientFrames: visible.map((id, n) => {
        const isFav = s.favs.indexOf(id) >= 0;
        const num = String(this.clientIds.indexOf(id) + 1);
        return {
          num, src: I[id].small, isFav, path: this.rings[(this.clientIds.indexOf(id)) % this.rings.length],
          label: 'Billede ' + num + ': ' + I[id].alt + (isFav ? '. Har ring, tryk for at fjerne' : '. Tryk for at slå ring om'),
          toggle: () => this.toggleFav(id),
          open: () => this.setState({ lb: { list: 'client', i: n } })
        };
      }),

      legal: this.legalData.map(x => ({ h: x[0], p: x[1] })),

      lbOpen: !!lb, lb: lb || {},
      lbClose: () => this.setState({ lb: null }),
      lbPrev: () => this.lbStep(-1),
      lbNext: () => this.lbStep(1),
      lbTouchStart: (e) => { const t = e.touches && e.touches[0]; this.tx = t ? t.clientX : null; },
      lbTouchEnd: (e) => { const t = e.changedTouches && e.changedTouches[0]; if (this.tx == null || !t) return; const dx = t.clientX - this.tx; this.tx = null; if (Math.abs(dx) > 40) this.lbStep(dx < 0 ? 1 : -1); }
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <div style={st("min-height: 100vh; background: #EEF0ED; color: #202322; overflow-x: hidden")}>
        <header style={st(v.headerStyle)}>
          <div className="wrap" style={st("display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 20px")}>
            <a href="#top" onClick={v.goHome} aria-label="Ellen Vinter, til forsiden" style={st("font-stretch: 75%; font-weight: 700; font-size: 22px; letter-spacing: -0.01em; padding: 10px 0; white-space: nowrap")}>
              Ellen Vinter
            </a>
            <nav aria-label="Hovedmenu" className="navd" style={st("align-items: center; gap: 30px")}>
              {(v.nav || []).map((n, $index) => (
                <React.Fragment key={$index}>
                  <a href={n.href} onClick={n.go} aria-current={n.current} style={st(n.style)}>
                    {n.label}
                  </a>
                </React.Fragment>
              ))}
              <button className="btn solid" onClick={v.goBookingSec} style={st("min-height: 44px; padding: 0 20px")}>
                Skriv til mig
              </button>
            </nav>
            <button className="menu-btn btn ghost" onClick={v.toggleMenu} aria-expanded={v.menuOpen} aria-controls="mobilmenu" style={st("min-height: 44px; padding: 0 16px")}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d={v.menuIcon} />
              </svg>
               Menu 
            </button>
          </div>
          {v.menuOpen && (
            <>
              <div id="mobilmenu" className="mpanel" style={st("border-top: 1.5px solid #202322; background: #EEF0ED")}>
                <nav aria-label="Mobilmenu" className="wrap" style={st("display: flex; flex-direction: column; padding-top: 8px; padding-bottom: 24px")}>
                  {(v.nav || []).map((n, $index) => (
                    <React.Fragment key={$index}>
                      <a href={n.href} onClick={n.go} style={st("font-stretch: 75%; font-weight: 700; font-size: 34px; padding: 12px 0; border-bottom: 1px solid #C9CDC9")}>
                        {n.label}
                      </a>
                    </React.Fragment>
                  ))}
                  <button className="btn solid" onClick={v.goBookingSec} style={st("margin-top: 20px; width: 100%")}>
                    Skriv til mig
                  </button>
                </nav>
              </div>
            </>
          )}
        </header>
        {v.showMain && (
          <>
            <main id="top" style={st(v.mainStyle)}>
              {v.isHome && (
                <>
                  <section className="wrap" style={st("padding-top: 128px")}>
                    <div className="hero">
                      <div style={st("display: flex; flex-direction: column; gap: 34px")}>
                        <h1 className="name">
                          Ellen
                          <br />
                          Vinter
                        </h1>
                        <p className="lead">
                          Bryllupsfotograf i København. Jeg fotograferer tæt på og uden opstillinger, så billederne ligner jeres dag og ikke et katalog.
                        </p>
                        <div style={st("display: flex; gap: 12px; flex-wrap: wrap")}>
                          <button className="btn solid" onClick={v.goSeriesSec}>
                            Se bryllupperne
                          </button>
                          <button className="btn ghost" onClick={v.goBookingSec}>
                            Spørg om jeres dato
                          </button>
                        </div>
                      </div>
                      <div style={st("display: flex; flex-direction: column; gap: 14px")}>
                        <div className="prints" role="group" aria-label="Fotoprint fra udvalgte bryllupper">
                          {(v.prints || []).map((pr, $index) => (
                            <React.Fragment key={$index}>
                              <button className="print" onClick={pr.tap} aria-label={pr.label} style={st(pr.style)}>
                                <span className="in">
                                  <img src={pr.src} alt="" style={st(pr.imgStyle)} />
                                </span>
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
              {v.showWeddings && (
                <>
                  <section id="bryllupper" className="wrap sec">
                    <div style={st("display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; margin-bottom: 44px")}>
                      <h2 className="h2">
                        Bryllupper og par
                      </h2>
                      <p className="muted" style={st("margin: 0; max-width: 26em")}>
                        Hver historie er én dag, fortalt fra start til slut.
                      </p>
                    </div>
                    <div>
                      {(v.series || []).map((s, $index) => (
                        <React.Fragment key={$index}>
                          <button className="srow" onClick={s.open} aria-label={`Se ${s.title ?? ""}`}>
                            <span className="t">
                              {s.title}
                            </span>
                            <span className="mini" aria-hidden="true">
                              {(s.thumbs || []).map((th, $index) => (
                                <React.Fragment key={$index}>
                                  <img src={th} alt="" loading="lazy" />
                                </React.Fragment>
                              ))}
                            </span>
                            <span className="meta" style={st("display: flex; flex-direction: column; gap: 2px; font-size: 15px; min-width: 150px")}>
                              <span style={st("font-weight: 600")}>
                                {s.couple}
                              </span>
                              <span className="muted">
                                {s.place}, {s.year}
                              </span>
                              <span className="muted">
                                {s.count} billeder
                              </span>
                            </span>
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </section>
                </>
              )}
              {v.showAbout && (
                <>
                  <section id="om" className="wrap sec">
                    <div className="about">
                      <figure className="pstatic" style={st("transform: rotate(-2deg)")}>
                        <img src={v.img.fotograf.src} srcSet={v.img.fotograf.srcset} sizes="(max-width: 639px) 340px, 40vw" alt="Ellen sidder på gulvet i sit studie med kameraet" loading="lazy" style={st("aspect-ratio: 4 / 5")} />
                      </figure>
                      <div style={st("display: flex; flex-direction: column; gap: 26px")}>
                        <h2 className="h2">
                          Jeg kommer tidligt og går sidst
                        </h2>
                        <p className="lead">
                          Jeg har fotograferet bryllupper i mere end ti år, de fleste i Danmark og nogle få i Norge og Sverige. Jeg arbejder mest i baggrunden og guider kun, når I har brug for det.
                        </p>
                        <p className="lead">
                          Jeg tager et begrænset antal bryllupper om året, så hver dag får den tid, det tager at redigere den ordentligt.
                        </p>
                        <dl style={st("margin: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px 28px; border-top: 1px solid #C9CDC9; padding-top: 22px; font-size: 16px")}>
                          <div>
                            <dt className="muted">
                              Bor i
                            </dt>
                            <dd style={st("margin: 2px 0 0; font-weight: 600")}>
                              København
                            </dd>
                          </div>
                          <div>
                            <dt className="muted">
                              Rejser til
                            </dt>
                            <dd style={st("margin: 2px 0 0; font-weight: 600")}>
                              Hele Norden
                            </dd>
                          </div>
                          <div>
                            <dt className="muted">
                              Leverer på
                            </dt>
                            <dd style={st("margin: 2px 0 0; font-weight: 600")}>
                              Under 6 uger
                            </dd>
                          </div>
                        </dl>
                        {v.isHome && (
                          <>
                            <div>
                              <button className="txtbtn" onClick={v.goAbout}>
                                Læs mere om Ellen
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {v.isAbout && (
                      <>
                        <blockquote style={st("margin: 140px 0 0; font-stretch: 75%; font-weight: 700; font-size: clamp(36px, 4.6vw, 64px); line-height: 1.02; letter-spacing: -0.01em; max-width: 16em")}>
                          “Den bedste bryllupsfotograf er den, I glemmer er der.”
                        </blockquote>
                        <div style={st("margin-top: 110px")}>
                          <h2 className="h2" style={st("font-size: clamp(34px, 4vw, 54px); margin-bottom: 44px")}>
                            Det, jeg altid kigger efter
                          </h2>
                          <div className="looks">
                            <figure className="pstatic" style={st("transform: rotate(1.5deg)")}>
                              <img src={v.img.det3.small} alt="Hænder med nye ringe over brudebuketten" loading="lazy" style={st("aspect-ratio: 4 / 5")} />
                              <figcaption>
                                Hænderne. De fortæller mere end ansigterne, når nerverne sidder uden på tøjet.
                              </figcaption>
                            </figure>
                            <figure className="pstatic" style={st("transform: rotate(-1.5deg)")}>
                              <img src={v.img.det1.small} alt="Bordkort med perler og silkebånd" loading="lazy" style={st("aspect-ratio: 4 / 5")} />
                              <figcaption>
                                Det, I har brugt måneder på at lave, og som ingen når at se på selve dagen.
                              </figcaption>
                            </figure>
                            <figure className="pstatic" style={st("transform: rotate(1deg)")}>
                              <img src={v.img.det2.small} alt="To vielsesringe på kirkens program" loading="lazy" style={st("aspect-ratio: 4 / 5")} />
                              <figcaption>
                                Ringene, før de kommer på. Det tager ti sekunder og bliver ofte et af favoritbillederne.
                              </figcaption>
                            </figure>
                          </div>
                        </div>
                        <div className="cols" style={st("margin-top: 120px; border-top: 1.5px solid #202322; padding-top: 40px")}>
                          <div style={st("display: flex; flex-direction: column; gap: 14px")}>
                            <h3 style={st("margin: 0; font-stretch: 75%; font-weight: 700; font-size: 30px; line-height: 1.1")}>
                              Før jeg blev fotograf
                            </h3>
                            <p style={st("margin: 0; font-size: 17px; line-height: 1.7; max-width: 34em")}>
                              Jeg læste litteratur og arbejdede som tjener til bryllupper i weekenderne. Det var der, jeg lærte, hvordan en dag faktisk forløber, og hvor de små øjeblikke gemmer sig: i køkkenet, ved garderoben og ude bag laden.
                            </p>
                          </div>
                          <div style={st("display: flex; flex-direction: column; gap: 14px")}>
                            <h3 style={st("margin: 0; font-stretch: 75%; font-weight: 700; font-size: 30px; line-height: 1.1")}>
                              Sådan arbejder jeg
                            </h3>
                            <p style={st("margin: 0; font-size: 17px; line-height: 1.7; max-width: 34em")}>
                              Jeg bruger to kameraer, næsten altid dagslys og aldrig blitz under vielsen. Til portrætterne går vi en tur væk fra gæsterne i et kvarter. Det er tit dér, I får set hinanden ordentligt for første gang den dag.
                            </p>
                          </div>
                        </div>
                        <div style={st("margin-top: 72px; display: flex; gap: 12px; flex-wrap: wrap")}>
                          <button className="btn solid" onClick={v.goBookingSec}>
                            Spørg om jeres dato
                          </button>
                          <button className="btn ghost" onClick={v.goSeriesSec}>
                            Se bryllupperne
                          </button>
                        </div>
                      </>
                    )}
                  </section>
                </>
              )}
              {v.showPrices && (
                <>
                  <section id="priser" className="wrap sec">
                    <div style={st("display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; margin-bottom: 40px")}>
                      <h2 className="h2">
                        Priser
                      </h2>
                      <p className="muted" style={st("margin: 0; max-width: 28em")}>
                        Alle priser er inkl. moms og et privat kundegalleri, hvor I vælger favoritter og henter billederne i fuld størrelse.
                      </p>
                    </div>
                    <div className="prices">
                      {(v.packages || []).map((p, $index) => (
                        <React.Fragment key={$index}>
                          <article className="prow">
                            <div>
                              <h3>
                                {p.name}
                              </h3>
                              <span className="muted" style={st("font-size: 15px")}>
                                {p.hours}
                              </span>
                            </div>
                            <p className="inc" style={st("margin: 0; font-size: 16px; line-height: 1.6")}>
                              {p.desc}
                            </p>
                            <span className="p">
                              {p.price}
                            </span>
                            <button className="btn ghost pick" onClick={p.pick} style={st("min-height: 44px; padding: 0 18px")}>
                              Vælg
                            </button>
                          </article>
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="muted" style={st("margin: 18px 0 0; font-size: 15px")}>
                      Kørsel uden for Sjælland aftales. Parshoot kan trækkes fra prisen, hvis I booker brylluppet bagefter.
                    </p>
                    <div style={st("margin-top: 110px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px 72px; align-items: start")}>
                      <h2 className="h2" style={st("font-size: clamp(36px, 4.4vw, 60px)")}>
                        Det, brudepar spørger om
                      </h2>
                      <div className="faq">
                        {(v.faq || []).map((q, $index) => (
                          <React.Fragment key={$index}>
                            <details>
                              <summary>
                                {q.q}
                              </summary>
                              <p>
                                {q.a}
                              </p>
                            </details>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </section>
                </>
              )}
              {v.showContact && (
                <>
                  <section id="booking" className="wrap sec" style={st("padding-bottom: 140px")}>
                    <div className="booking">
                      <div style={st("display: flex; flex-direction: column; gap: 28px")}>
                        <h2 className="h2">
                          Spørg om jeres dato
                        </h2>
                        <p className="lead">
                          Skriv lidt om jer og jeres dag. Jeg svarer inden for to hverdage, og så tager vi en snak over kaffe eller video.
                        </p>
                        <ol className="steps" style={st("grid-template-columns: repeat(2, minmax(0, 1fr))")}>
                          <li>
                            I skriver til mig, og vi aftaler en snak.
                          </li>
                          <li>
                            Vi planlægger dagen, så der er tid og lys til jer.
                          </li>
                          <li>
                            Jeg er der hele vejen, mest i baggrunden.
                          </li>
                          <li>
                            Inden for seks uger får I jeres kundegalleri.
                          </li>
                        </ol>
                      </div>
                      {v.formOpen && (
                        <>
                          <div className="form">
                            <div className="full">
                              <span className="lbl" id="pk-lbl">
                                Hvad drømmer I om?
                              </span>
                              <div className="chips" role="group" aria-labelledby="pk-lbl">
                                {(v.pkChips || []).map((pp, $index) => (
                                  <React.Fragment key={$index}>
                                    <button onClick={pp.pick} aria-pressed={pp.sel} style={st(pp.style)}>
                                      {pp.label}
                                    </button>
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                            <div className="field">
                              <label htmlFor="b-date">
                                Dato
                              </label>
                              <input id="b-date" type="date" value={v.f.date ?? ""} onChange={v.onDate} min={v.minDate} />
                            </div>
                            <div className="field">
                              <label htmlFor="b-place">
                                Hvor skal I giftes?
                              </label>
                              <input id="b-place" type="text" value={v.f.place ?? ""} onChange={v.onPlace} />
                            </div>
                            {v.hasDateMsg && (
                              <>
                                <p className="full" aria-live="polite" style={st(v.dateMsgStyle)}>
                                  {v.dateMsg}
                                </p>
                              </>
                            )}
                            <div className="field full">
                              <label htmlFor="b-names">
                                Jeres navne
                              </label>
                              <input id="b-names" type="text" autoComplete="name" value={v.f.names ?? ""} onChange={v.onNames} />
                            </div>
                            <div className="field">
                              <label htmlFor="b-mail">
                                E-mail
                              </label>
                              <input id="b-mail" type="email" autoComplete="email" value={v.f.mail ?? ""} onChange={v.onMail} />
                            </div>
                            <div className="field">
                              <label htmlFor="b-phone">
                                Telefon, hvis I vil ringes op
                              </label>
                              <input id="b-phone" type="tel" autoComplete="tel" inputMode="tel" value={v.f.phone ?? ""} onChange={v.onPhone} />
                            </div>
                            <div className="field full">
                              <label htmlFor="b-msg">
                                Fortæl om jer
                              </label>
                              <textarea id="b-msg" value={v.f.msg ?? ""} onChange={v.onMsg} />
                            </div>
                            <label className="check full" htmlFor="b-ok">
                              <input id="b-ok" type="checkbox" checked={!!v.f.ok} onChange={v.onOk} />
                              <span>
                                Ellen må gemme mine oplysninger for at svare mig. 
                                <a href="#" onClick={v.openPrivacy} style={st("text-decoration: underline; text-underline-offset: 3px")}>
                                  Læs hvordan
                                </a>
                              </span>
                            </label>
                            <div className="full" style={st("display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap")}>
                              <p aria-live="polite" className="muted" style={st("margin: 0; font-size: 15px; flex: 1 1 220px")}>
                                {v.formHint}
                              </p>
                              <button className="btn" onClick={v.send} disabled={!!v.sendDisabled} style={st(v.sendStyle)}>
                                Send forespørgsel
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      {v.formSent && (
                        <>
                          <div aria-live="polite" style={st("display: flex; flex-direction: column; gap: 18px; padding-top: 8px")}>
                            <h3 style={st("margin: 0; font-stretch: 75%; font-weight: 700; font-size: 48px; line-height: 1")}>
                              {v.sentTitle}
                            </h3>
                            <p className="lead">
                              {v.sentText}
                            </p>
                            <div>
                              <button className="txtbtn" onClick={v.newForm}>
                                Send en ny forespørgsel
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </section>
                </>
              )}
            </main>
          </>
        )}
        {v.isSeries && (
          <>
            <main style={st("padding-top: 120px; padding-bottom: 120px")}>
              <div className="wrap">
                <button className="txtbtn" onClick={v.backToSeries} style={st("margin-bottom: 28px")}>
                  Alle bryllupper
                </button>
                <div style={st("display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px 56px; align-items: end; margin-bottom: 56px")}>
                  <h1 className="name" style={st("font-size: clamp(64px, 9vw, 140px)")}>
                    {v.cur.title}
                  </h1>
                  <div style={st("display: flex; flex-direction: column; gap: 14px")}>
                    <p style={st("margin: 0; font-weight: 600")}>
                      {v.cur.couple}, {v.cur.place}, {v.cur.year}
                    </p>
                    <p className="lead">
                      {v.cur.intro}
                    </p>
                  </div>
                </div>
                <div className="chips" role="group" aria-label="Visning" style={st("margin-bottom: 28px")}>
                  {(v.modeChips || []).map((mc, $index) => (
                    <React.Fragment key={$index}>
                      <button onClick={mc.pick} aria-pressed={mc.sel} style={st(mc.style)}>
                        {mc.label}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                {v.sheetMode && (
                  <>
                    <div className="sheet">
                      <div className="edge" aria-hidden="true">
                        <span>
                          {v.cur.edge}
                        </span>
                        <span>
                          EV 400
                        </span>
                      </div>
                      <div className="frames">
                        {(v.cur.photos || []).map((ph, $index) => (
                          <React.Fragment key={$index}>
                            <div className="frame">
                              <button className="fbtn" onClick={ph.open} aria-label={`Vis billede ${ph.n ?? ""} i fuld skærm: ${ph.alt ?? ""}`}>
                                <img src={ph.thumb} alt="" loading="lazy" />
                              </button>
                              <span className="fnum" aria-hidden="true">
                                {ph.n}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {v.storyMode && (
                  <>
                    <div className="story">
                      {(v.cur.photos || []).map((ph, $index) => (
                        <React.Fragment key={$index}>
                          <figure className={ph.cls}>
                            <button className="open" onClick={ph.open} aria-label={`Vis billede ${ph.n ?? ""} i fuld skærm`}>
                              <img src={ph.src} srcSet={ph.srcset} sizes={ph.sizes} alt={ph.alt} loading="lazy" width={ph.w} height={ph.h} />
                            </button>
                            <figcaption>
                              {ph.alt}
                            </figcaption>
                          </figure>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                )}
                <section aria-labelledby="credits-h" style={st("margin-top: 88px; border-top: 1.5px solid #202322; padding-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px 56px")}>
                  <h2 id="credits-h" style={st("margin: 0; font-stretch: 75%; font-weight: 700; font-size: 34px; line-height: 1")}>
                    {v.cur.creditsTitle}
                  </h2>
                  <dl className="credits">
                    {(v.cur.credits || []).map((cr, $index) => (
                      <React.Fragment key={$index}>
                        <div>
                          <dt>
                            {cr.k}
                          </dt>
                          <dd>
                            {cr.v}
                          </dd>
                        </div>
                      </React.Fragment>
                    ))}
                  </dl>
                </section>
                <div style={st("margin-top: 72px; border-top: 1.5px solid #202322; padding-top: 40px; display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap")}>
                  <h2 className="h2" style={st("font-size: clamp(34px, 4vw, 56px)")}>
                    Skal jeres dag være den næste?
                  </h2>
                  <div style={st("display: flex; gap: 12px; flex-wrap: wrap")}>
                    <button className="btn solid" onClick={v.goBookingSec}>
                      Spørg om jeres dato
                    </button>
                    <button className="btn ghost" onClick={v.nextSeries}>
                      Næste bryllup
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </>
        )}
        {v.isClient && (
          <>
            <main style={st("padding-top: 120px; padding-bottom: 120px; min-height: 100vh")}>
              {v.notLogged && (
                <>
                  <div className="wrap" style={st("max-width: 620px")}>
                    <div style={st("display: flex; flex-direction: column; gap: 22px; margin-top: 40px")}>
                      <h1 className="name" style={st("font-size: clamp(64px, 10vw, 120px)")}>
                        Jeres
                        <br />
                        billeder
                      </h1>
                      <p className="lead">
                        Skriv koden fra jeres mail. Så kan I se hele dagen og slå ring om de billeder, der skal med i albummet.
                      </p>
                      <div className="field">
                        <label htmlFor="c-code">
                          Kode
                        </label>
                        <input id="c-code" type="text" autoComplete="off" autoCapitalize="characters" value={v.codeVal ?? ""} onChange={v.onCode} onKeyDown={v.codeKey} />
                      </div>
                      {v.codeErr && (
                        <>
                          <p aria-live="polite" style={st("margin: 0; font-size: 15px; color: #A3271F")}>
                            Koden findes ikke. Tjek mailen fra Ellen og prøv igen.
                          </p>
                        </>
                      )}
                      <div style={st("display: flex; gap: 16px; align-items: center; flex-wrap: wrap")}>
                        <button className="btn solid" onClick={v.login}>
                          Åbn galleriet
                        </button>
                        <span className="muted" style={st("font-size: 15px")}>
                          Demo: brug koden 
                          <strong style={st("color: #202322")}>
                            SOFIEJONAS
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {v.logged && (
                <>
                  <div className="wrap client">
                    <div style={st("display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; margin-bottom: 28px")}>
                      <div style={st("display: flex; flex-direction: column; gap: 14px")}>
                        <h1 className="name" style={st("font-size: clamp(60px, 9vw, 128px)")}>
                          Sofie og Jonas
                        </h1>
                        <p className="lead" style={st("max-width: 34em")}>
                          Tryk på et billede for at slå ring om det. Vælg op til otte til albummet. Brug forstørrelsesglasset for at se et billede i fuld størrelse.
                        </p>
                      </div>
                      <button className="txtbtn" onClick={v.logout}>
                        Log ud
                      </button>
                    </div>
                    <div style={st("display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; padding: 14px 0; border-top: 1.5px solid #202322; margin-bottom: 22px")}>
                      <div className="chips" role="group" aria-label="Vis">
                        {(v.filters || []).map((fl, $index) => (
                          <React.Fragment key={$index}>
                            <button onClick={fl.pick} aria-pressed={fl.sel} style={st(fl.style)}>
                              {fl.label}
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                      <p aria-live="polite" style={st("margin: 0; font-size: 16px; font-weight: 600")}>
                        {v.favText}
                      </p>
                      <div style={st("display: flex; gap: 10px; flex-wrap: wrap")}>
                        <button className="btn ghost" onClick={v.download} style={st("min-height: 44px; padding: 0 16px")}>
                          Hent alle billeder
                        </button>
                        <button className="btn" onClick={v.sendFavs} disabled={!!v.noFavs} style={st(v.sendFavStyle)}>
                          Send valget til Ellen
                        </button>
                      </div>
                    </div>
                    {v.clientMsg && (
                      <>
                        <p aria-live="polite" style={st("margin: 0 0 22px; padding: 14px 16px; background: #F7F8F6; border: 1.5px solid #C9CDC9; font-size: 16px")}>
                          {v.clientMsg}
                        </p>
                      </>
                    )}
                    {v.noneShown && (
                      <>
                        <p className="lead muted" style={st("margin: 32px 0")}>
                          I har ikke slået ring om nogen billeder endnu. Gå til "Alle" og tryk på dem, I bedst kan lide.
                        </p>
                      </>
                    )}
                    <div className="sheet">
                      <div className="edge" aria-hidden="true">
                        <span>
                          SOFIE 
                          &amp;
                           JONAS 14.06.26
                        </span>
                        <span>
                          EV 400
                        </span>
                      </div>
                      <div className="frames">
                        {(v.clientFrames || []).map((fr, $index) => (
                          <React.Fragment key={$index}>
                            <div className="frame">
                              <button className="fbtn" onClick={fr.toggle} aria-pressed={fr.isFav} aria-label={fr.label}>
                                <img src={fr.src} alt="" loading="lazy" />
                              </button>
                              {fr.isFav && (
                                <>
                                  <svg className="mark" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                    <path pathLength="1" vectorEffect="non-scaling-stroke" d={fr.path} />
                                  </svg>
                                </>
                              )}
                              <button className="loupe" onClick={fr.open} aria-label={`Vis billede ${fr.num ?? ""} i fuld størrelse`}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                                  <circle cx="7.5" cy="7.5" r="5" />
                                  <path d="M11.2 11.2L16 16" />
                                </svg>
                              </button>
                              <span className="fnum" aria-hidden="true">
                                {fr.num}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </main>
          </>
        )}
        {v.isLegal && (
          <>
            <main style={st("padding-top: 120px; padding-bottom: 110px; min-height: 100vh")}>
              <article className="wrap legal" style={st("max-width: 900px")}>
                <button className="txtbtn" onClick={v.goHome} style={st("margin-bottom: 28px")}>
                  Til forsiden
                </button>
                <h1 className="h2">
                  Privatlivspolitik
                </h1>
                <p className="muted" style={st("margin-top: 18px; font-size: 15px")}>
                  Udkast til demo. Skal gennemgås og tilpasses, før en rigtig fotograf bruger siden. Ikke juridisk rådgivning.
                </p>
                {(v.legal || []).map((lg, $index) => (
                  <React.Fragment key={$index}>
                    <section>
                      <h2>
                        {lg.h}
                      </h2>
                      <p>
                        {lg.p}
                      </p>
                    </section>
                  </React.Fragment>
                ))}
              </article>
            </main>
          </>
        )}
        {v.lbOpen && (
          <>
            <div className="lb" role="dialog" aria-modal="true" aria-label="Billedvisning" onTouchStart={v.lbTouchStart} onTouchEnd={v.lbTouchEnd}>
              <div style={st("display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 16px")}>
                <span style={st("font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #E2A63B")}>
                  {v.lb.counter}
                </span>
                <div style={st("display: flex; gap: 10px; align-items: center")}>
                  {v.lb.canFav && (
                    <>
                      <button className="btn" onClick={v.lb.fav} aria-pressed={v.lb.isFav} style={st(v.lb.favStyle)}>
                        {v.lb.favLabel}
                      </button>
                    </>
                  )}
                  <button className="lbtn" onClick={v.lbClose} aria-label="Luk billedvisning">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 3l12 12M15 3L3 15" />
                    </svg>
                  </button>
                </div>
              </div>
              <div style={st("flex: 1 1 auto; min-height: 0; display: flex; align-items: center; gap: 16px; padding: 0 18px")}>
                <button className="lbtn lb-nav" onClick={v.lbPrev} aria-label="Forrige billede">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M11 3L5 9l6 6" />
                  </svg>
                </button>
                <div style={st("flex: 1 1 auto; height: 100%; min-width: 0; display: flex; padding: 6px 0")}>
                  <img src={v.lb.src} alt={v.lb.alt} />
                </div>
                <button className="lbtn lb-nav" onClick={v.lbNext} aria-label="Næste billede">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M7 3l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <p style={st("margin: 0; padding: 12px 18px 20px; text-align: center; font-size: 15px; color: rgba(238,240,237,0.8)")}>
                {v.lb.alt}
              </p>
            </div>
          </>
        )}
        <footer style={st("background: #1E1F1E; color: #EEF0ED")}>
          <div className="wrap" style={st("padding-top: 80px; padding-bottom: 36px")}>
            <div className="foot">
              <div style={st("display: flex; flex-direction: column; gap: 22px")}>
                <p style={st("margin: 0; font-stretch: 62%; font-weight: 800; font-size: clamp(56px, 7vw, 104px); line-height: 0.85; letter-spacing: -0.02em")}>
                  Ellen
                  <br />
                  Vinter
                </p>
                <div>
                  <button className="btn" onClick={v.goBookingSec} style={st("background: #EEF0ED; color: #1E1F1E; border: 1.5px solid #EEF0ED")}>
                    Spørg om jeres dato
                  </button>
                </div>
              </div>
              <div style={st("display: flex; flex-direction: column; gap: 4px; font-size: 16px")}>
                <span style={st("color: #A9AEAA; margin-bottom: 6px")}>
                  Kontakt
                </span>
                <span>
                  [E-mail]
                </span>
                <span>
                  [Telefon]
                </span>
                <span>
                  København
                </span>
              </div>
              <nav aria-label="Genveje" style={st("display: flex; flex-direction: column; gap: 2px; font-size: 16px")}>
                <span style={st("color: #A9AEAA; margin-bottom: 6px")}>
                  Genveje
                </span>
                <a href="#" onClick={v.openClient} style={st("color: #EEF0ED; padding: 5px 0")}>
                  Kundegalleri
                </a>
                <a href="#" onClick={v.noop} style={st("color: #EEF0ED; padding: 5px 0")}>
                  Instagram
                </a>
                <a href="#" onClick={v.openPrivacy} style={st("color: #EEF0ED; padding: 5px 0")}>
                  Privatlivspolitik
                </a>
              </nav>
            </div>
            <div style={st("margin-top: 60px; padding-top: 18px; border-top: 1px solid #3A3C3A; display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 14px; color: #A9AEAA")}>
              <span>
                © 2026 Ellen Vinter Fotografi, CVR [CVR-nummer]
              </span>
              <span>
                Designforslag, fotos fra Unsplash
              </span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
