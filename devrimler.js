/* ==========================================================================
   Devrimler ve Kurumlar Rehberi (1920–1938) — Etkileşim Motoru
   ========================================================================== */
(() => {
  'use strict';

  const DATA = window.DEVRIMLER_DATA;
  if (!DATA || !Array.isArray(DATA.entries) || !Array.isArray(DATA.themes)) {
    return;
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';

  // ---------- Safe DOM Helpers ----------
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function createSvg(viewBox, paths, className) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', viewBox || '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('aria-hidden', 'true');
    if (className) svg.setAttribute('class', className);

    for (const def of paths) {
      const shape = document.createElementNS(SVG_NS, def.tag || 'path');
      for (const [k, v] of Object.entries(def)) {
        if (k === 'tag') continue;
        shape.setAttribute(k, String(v));
      }
      svg.appendChild(shape);
    }
    return svg;
  }

  function sanitizeExternalUrl(url) {
    if (typeof url !== 'string') return null;
    const trimmed = url.trim();
    if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
      return trimmed;
    }
    return null;
  }

  function isReducedMotion() {
    return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // ---------- Turkish-Insensitive Search Normalization ----------
  function normalizeTr(str) {
    if (!str) return '';
    return String(str)
      .toLocaleLowerCase('tr-TR')
      .replace(/\u0307/g, '')
      .replace(/[âàá]/g, 'a')
      .replace(/[îìíı]/g, 'i')
      .replace(/[ûùúü]/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ---------- Lookup Maps & Precomputed Search Index ----------
  const themesById = new Map(DATA.themes.map((t) => [t.id, t]));
  const entriesById = new Map(DATA.entries.map((e) => [e.id, e]));
  const entriesByIndex = new Map(DATA.entries.map((e) => [String(e.index), e]));
  const searchIndexById = new Map();

  for (const entry of DATA.entries) {
    const parts = [
      entry.title,
      entry.theme_title,
      entry.date_display,
      String(entry.year),
      entry.law_ref,
      entry.effective_date,
      entry.before,
      entry.action,
      entry.impact,
      ...(Array.isArray(entry.institutions) ? entry.institutions : []),
      ...(Array.isArray(entry.key_figures) ? entry.key_figures : []),
    ];
    searchIndexById.set(entry.id, normalizeTr(parts.join(' ')));
  }

  // ---------- DOM References (Locked Contract) ----------
  const scrollProgressEl = document.getElementById('scroll-progress');
  const readingContextCountEl = document.getElementById('reading-context-count');
  const readingContextThemeEl = document.getElementById('reading-context-theme');
  const openDrawerBtn = document.getElementById('open-drawer-btn');
  const ambientBtn = document.getElementById('ambient-btn');
  const soundIconOff = document.getElementById('sound-icon-off');
  const soundIconOn = document.getElementById('sound-icon-on');
  const ambientLabel = document.getElementById('ambient-btn-label');
  const soundLiveStatus = document.getElementById('sound-live-status');
  const backToTopBtn = document.getElementById('back-to-top');

  const searchInput = document.getElementById('reform-search-input');
  const searchClearBtn = document.getElementById('reform-search-clear');
  const themeFilterBar = document.getElementById('theme-filter-bar');
  const viewModeThematicBtn = document.getElementById('view-mode-thematic');
  const viewModeChronologicalBtn = document.getElementById('view-mode-chronological');
  const yearScrubberEl = document.getElementById('year-scrubber');
  const activeFiltersBar = document.getElementById('active-filters-bar');
  const activeFiltersChips = document.getElementById('active-filters-chips');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const resultsStatusEl = document.getElementById('results-status');

  const reformsFeedEl = document.getElementById('reforms-feed');
  const emptyStateEl = document.getElementById('empty-state');
  const emptyResetBtn = document.getElementById('empty-reset-btn');

  const drawerBackdrop = document.getElementById('reform-drawer-backdrop');
  const drawerEl = document.getElementById('reform-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerSearchInput = document.getElementById('drawer-search-input');
  const drawerThemeFilters = document.getElementById('drawer-theme-filters');
  const drawerStatusEl = document.getElementById('drawer-status');
  const drawerListEl = document.getElementById('drawer-list');

  const lightboxBackdrop = document.getElementById('lightbox');
  const lightboxDialog = document.getElementById('lightbox-dialog');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxSourceLink = document.getElementById('lightbox-source-link');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  // ---------- Application State ----------
  const state = {
    theme: 'all',
    year: null,
    institution: null,
    query: '',
    viewMode: 'thematic', // 'thematic' | 'chronological'
    drawerTheme: 'all',
    drawerQuery: '',
    activeEntryId: null,
  };

  let currentFilteredEntries = DATA.entries.slice();
  let lightboxEntries = DATA.entries.slice();
  let currentLightboxPos = 0;
  let lastFocusedBeforeModal = null;
  let targetHighlightTimer = null;

  function setBackgroundInert(isInert) {
    const nodes = [
      document.querySelector('.site-header'),
      document.getElementById('main-content'),
      document.querySelector('.site-footer'),
      backToTopBtn,
    ];
    for (const node of nodes) {
      if (!node) continue;
      if (isInert) {
        node.setAttribute('inert', '');
      } else {
        node.removeAttribute('inert');
      }
    }
  }

  // ---------- Filtering Logic (AND) ----------
  function matchesQuery(entry, normalizedQuery) {
    if (!normalizedQuery) return true;
    const hay = searchIndexById.get(entry.id) || '';
    const tokens = normalizedQuery.split(' ').filter(Boolean);
    return tokens.every((token) => hay.includes(token));
  }

  function getFilteredEntries() {
    const nq = normalizeTr(state.query);
    return DATA.entries.filter((entry) => {
      if (state.theme !== 'all' && entry.theme_id !== state.theme) return false;
      if (state.year !== null && entry.year !== state.year) return false;
      if (state.institution !== null) {
        const insts = Array.isArray(entry.institutions) ? entry.institutions : [];
        if (!insts.includes(state.institution)) return false;
      }
      if (nq && !matchesQuery(entry, nq)) return false;
      return true;
    });
  }

  function hasActiveFilters() {
    return (
      state.theme !== 'all' ||
      state.year !== null ||
      state.institution !== null ||
      state.query.trim() !== ''
    );
  }

  function syncUrlThemeParam() {
    if (!window.history || typeof window.history.replaceState !== 'function') return;
    const url = new URL(window.location.href);
    if (state.theme && state.theme !== 'all') {
      url.searchParams.set('tema', state.theme);
    } else {
      url.searchParams.delete('tema');
    }
    window.history.replaceState(null, '', url.toString());
  }

  // ---------- Theme Filter Bar & View Mode Sync ----------
  function ensureThemeFilterButtons(container, activeThemeId, chipClass) {
    if (!container) return;
    const existing = new Set(
      Array.from(container.querySelectorAll('button[data-theme], button[data-filter-theme]')).map(
        (b) => b.dataset.theme ?? b.dataset.filterTheme
      )
    );

    if (!existing.has('all')) {
      const allBtn = el('button', chipClass, `Tümü (${DATA.meta.total_entries})`);
      allBtn.type = 'button';
      allBtn.dataset.theme = 'all';
      allBtn.setAttribute('aria-pressed', 'true');
      container.appendChild(allBtn);
    }

    for (const theme of DATA.themes) {
      if (existing.has(theme.id)) continue;
      const btn = el('button', chipClass, `${theme.title} (${theme.count})`);
      btn.type = 'button';
      btn.dataset.theme = theme.id;
      btn.setAttribute('aria-pressed', 'false');
      container.appendChild(btn);
    }
    syncThemeFilterButtons(container, activeThemeId);
  }

  function syncThemeFilterButtons(container, activeThemeId) {
    if (!container) return;
    const buttons = container.querySelectorAll('button[data-theme], button[data-filter-theme]');
    buttons.forEach((btn) => {
      const val = btn.dataset.theme ?? btn.dataset.filterTheme ?? 'all';
      const active = val === activeThemeId;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function syncViewModeButtons() {
    const isThematic = state.viewMode === 'thematic';
    if (viewModeThematicBtn) {
      viewModeThematicBtn.classList.toggle('is-active', isThematic);
      viewModeThematicBtn.setAttribute('aria-pressed', String(isThematic));
    }
    if (viewModeChronologicalBtn) {
      viewModeChronologicalBtn.classList.toggle('is-active', !isThematic);
      viewModeChronologicalBtn.setAttribute('aria-pressed', String(!isThematic));
    }
  }

  // ---------- 1920–1938 Year Density Scrubber ----------
  function renderYearScrubber() {
    if (!yearScrubberEl) return;
    const maxCount = Math.max(1, ...DATA.years.map((y) => y.count));
    const track = el('div', 'year-scrubber__track');

    for (const item of DATA.years) {
      const isEmpty = item.count === 0;
      const isSelected = state.year === item.year;
      const btn = el('button', 'year-bar');
      btn.type = 'button';
      btn.dataset.year = String(item.year);
      btn.setAttribute('aria-pressed', String(isSelected));

      if (isEmpty) {
        btn.classList.add('is-empty');
        btn.disabled = true;
      }
      if (isSelected) {
        btn.classList.add('is-active');
      }

      const desc = isEmpty
        ? `${item.year} yılı: kayıtlı devrim maddesi yok`
        : `${item.year} yılı: ${item.count} devrim maddesi`;
      btn.setAttribute('aria-label', desc);
      btn.title = desc;

      const meter = el('span', 'year-bar__meter');
      meter.setAttribute('aria-hidden', 'true');
      const fill = el('span', 'year-bar__fill');
      const pct = isEmpty ? 0 : (item.count / maxCount) * 100;
      fill.style.height = `${pct.toFixed(1)}%`;
      fill.style.setProperty('--fill-ratio', (item.count / maxCount).toFixed(3));
      meter.appendChild(fill);

      const label = el('span', 'year-bar__label', String(item.year));
      btn.append(meter, label);
      track.appendChild(btn);
    }

    yearScrubberEl.replaceChildren(track);
  }

  function syncYearScrubberSelection() {
    if (!yearScrubberEl) return;
    const bars = yearScrubberEl.querySelectorAll('.year-bar');
    bars.forEach((bar) => {
      const yr = Number(bar.dataset.year);
      const selected = state.year === yr;
      bar.classList.toggle('is-active', selected);
      bar.setAttribute('aria-pressed', String(selected));
    });
  }

  // ---------- Active Filters Bar & Results Status ----------
  function renderActiveFilters() {
    if (!activeFiltersBar || !activeFiltersChips) return;
    const active = hasActiveFilters();
    activeFiltersBar.hidden = !active;

    if (!active) {
      activeFiltersChips.replaceChildren();
      return;
    }

    const fragment = document.createDocumentFragment();

    const addChip = (labelText, removeLabel, onRemove) => {
      const chip = el('button', 'active-filter-chip');
      chip.type = 'button';
      chip.setAttribute('aria-label', removeLabel);
      chip.appendChild(el('span', 'active-filter-chip__text', labelText));
      const closeMark = el('span', 'active-filter-chip__remove');
      closeMark.setAttribute('aria-hidden', 'true');
      closeMark.appendChild(
        createSvg('0 0 24 24', [
          { tag: 'path', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M6 18L18 6M6 6l12 12' },
        ])
      );
      chip.appendChild(closeMark);
      chip.addEventListener('click', onRemove);
      fragment.appendChild(chip);
    };

    if (state.theme !== 'all') {
      const themeObj = themesById.get(state.theme);
      const title = themeObj ? themeObj.title : state.theme;
      addChip(`Tema: ${title}`, `Tema filtresini kaldır: ${title}`, () => {
        state.theme = 'all';
        syncUrlThemeParam();
        updateAll();
      });
    }

    if (state.year !== null) {
      addChip(`Yıl: ${state.year}`, `Yıl filtresini kaldır: ${state.year}`, () => {
        state.year = null;
        updateAll();
      });
    }

    if (state.institution !== null) {
      addChip(`Kurum: ${state.institution}`, `Kurum filtresini kaldır: ${state.institution}`, () => {
        state.institution = null;
        updateAll();
      });
    }

    if (state.query.trim() !== '') {
      const q = state.query.trim();
      addChip(`Arama: “${q}”`, `Arama filtresini kaldır: ${q}`, () => {
        state.query = '';
        if (searchInput) searchInput.value = '';
        syncSearchClearVisibility();
        updateAll();
      });
    }

    activeFiltersChips.replaceChildren(fragment);
  }

  function updateResultsStatus(count) {
    if (!resultsStatusEl) return;
    const total = DATA.meta.total_entries;
    const modeText = state.viewMode === 'thematic' ? 'tematik düzen' : 'kronolojik düzen';
    if (count === 0) {
      resultsStatusEl.textContent = 'Seçili ölçütlerle eşleşen devrim maddesi bulunamadı.';
    } else if (count === total && !hasActiveFilters()) {
      resultsStatusEl.textContent = `${total} devrim ve kurum maddesi gösteriliyor (${modeText}).`;
    } else {
      resultsStatusEl.textContent = `${total} maddeden ${count} madde gösteriliyor (${modeText}).`;
    }
  }

  // ---------- Reform Dossier Card Builder (0 innerHTML) ----------
  function buildDossierArticle(entry) {
    const article = el('article', 'reform-dossier');
    article.id = entry.id;
    article.dataset.entryIndex = String(entry.index);

    // 1. Dossier Head
    const head = el('header', 'dossier-head');
    const metaLine = el('div', 'dossier-meta-line');
    const paddedNum = String(entry.index).padStart(2, '0');
    metaLine.append(
      el('span', 'dossier-num', `${paddedNum} / ${DATA.meta.total_entries}`),
      el('span', 'dossier-theme', entry.theme_title)
    );
    const timeEl = el('time', 'dossier-date', entry.date_display);
    timeEl.setAttribute('datetime', String(entry.year));
    metaLine.appendChild(timeEl);

    const titleEl = el('h3', 'dossier-title', entry.title);

    const ledger = el('dl', 'dossier-ledger');
    const lawItem = el('div', 'dossier-ledger__item');
    lawItem.append(el('dt', null, 'Hukukî Dayanak'), el('dd', null, entry.law_ref));
    const effItem = el('div', 'dossier-ledger__item');
    effItem.append(el('dt', null, 'Kabul ve Yürürlük'), el('dd', null, entry.effective_date));
    ledger.append(lawItem, effItem);

    head.append(titleEl, metaLine, ledger);
    article.appendChild(head);

    // 2. Dossier Body (Media + 3-stage Narrative)
    const body = el('div', 'dossier-body');

    const orientation = entry.media && entry.media.orientation ? entry.media.orientation : 'landscape';
    const figure = el('figure', `dossier-media dossier-media--${orientation}`);
    const frame = el('div', 'dossier-media__frame');

    const img = el('img', 'dossier-media__img');
    img.src = entry.media.src;
    img.alt = entry.media.alt_tr;
    img.width = entry.media.width;
    img.height = entry.media.height;
    img.setAttribute('decoding', 'async');
    if (entry.index === 1) {
      img.setAttribute('fetchpriority', 'high');
    } else {
      img.loading = 'lazy';
    }
    img.dataset.lightboxEntry = entry.id;

    const zoomBtn = el('button', 'media-zoom-btn');
    zoomBtn.type = 'button';
    zoomBtn.dataset.lightboxEntry = entry.id;
    zoomBtn.setAttribute('aria-label', `${entry.title} arşiv görselini büyüt`);
    zoomBtn.appendChild(
      createSvg('0 0 24 24', [
        { tag: 'circle', cx: '11', cy: '11', r: '7' },
        { tag: 'path', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M21 21l-4.35-4.35M11 8v6M8 11h6' },
      ])
    );

    frame.append(img, zoomBtn);
    const caption = el('figcaption', 'dossier-media__caption', entry.media.caption_tr);
    const creditText = `${entry.media.archive_source} · ${entry.media.estimated_date} · ${entry.media.license}`;
    const credit = el('p', 'dossier-media__credit', creditText);

    figure.append(frame, caption, credit);

    const narrative = el('div', 'dossier-narrative');
    const stages = [
      { cls: 'narrative-stage--before', heading: 'Öncesi', text: entry.before },
      { cls: 'narrative-stage--action', heading: 'Kanun ve Kurumsal Adım', text: entry.action },
      { cls: 'narrative-stage--impact', heading: 'Toplumsal ve Kurumsal Etkisi', text: entry.impact },
    ];
    for (const st of stages) {
      const sec = el('section', `narrative-stage ${st.cls}`);
      sec.append(
        el('h4', 'narrative-stage__heading', st.heading),
        el('p', 'narrative-stage__text', st.text)
      );
      narrative.appendChild(sec);
    }

    body.append(figure, narrative);
    article.appendChild(body);

    // 3. Crosslinks (Institutions, Key Figures, Atlas Links)
    const crosslinks = el('div', 'dossier-crosslinks');

    if (Array.isArray(entry.institutions) && entry.institutions.length > 0) {
      const instGroup = el('div', 'dossier-group');
      instGroup.appendChild(el('div', 'dossier-group__title', 'Kurulan / Dönüşen Kurumlar'));
      const instList = el('ul', 'meta-chip-list');
      for (const inst of entry.institutions) {
        const active = state.institution === inst;
        const li = el('li');
        const chip = el('button', active ? 'meta-chip is-active' : 'meta-chip', inst);
        chip.type = 'button';
        chip.dataset.filterInstitution = inst;
        chip.setAttribute('aria-pressed', String(active));
        li.appendChild(chip);
        instList.appendChild(li);
      }
      instGroup.appendChild(instList);
      crosslinks.appendChild(instGroup);
    }

    if (Array.isArray(entry.key_figures) && entry.key_figures.length > 0) {
      const figGroup = el('div', 'dossier-group');
      figGroup.appendChild(el('div', 'dossier-group__title', 'Öne Çıkan İsimler'));
      const figList = el('ul', 'meta-chip-list');
      for (const fig of entry.key_figures) {
        const li = el('li');
        li.appendChild(el('span', 'meta-chip figure-chip', fig));
        figList.appendChild(li);
      }
      figGroup.appendChild(figList);
      crosslinks.appendChild(figGroup);
    }

    if (Array.isArray(entry.atlas_links) && entry.atlas_links.length > 0) {
      const atlasGroup = el('div', 'dossier-group');
      atlasGroup.appendChild(el('div', 'dossier-group__title', 'Yaşam Atlası Bağlantıları'));
      const atlasList = el('ul', 'meta-chip-list');
      for (const link of entry.atlas_links) {
        const li = el('li');
        const anchor = el(
          'a',
          'meta-chip atlas-link-chip',
          `Durak #${link.index} — ${link.title} (${link.year})`
        );
        anchor.href = `./index.html#stop-${link.id}`;
        li.appendChild(anchor);
        atlasList.appendChild(li);
      }
      atlasGroup.appendChild(atlasList);
      crosslinks.appendChild(atlasGroup);
    }

    article.appendChild(crosslinks);

    // 4. Collapsible Details Row (Sources + Editorial Verification)
    const detailsRow = el('div', 'dossier-details-row');

    const sources = Array.isArray(entry.primary_sources) ? entry.primary_sources : [];
    const sourcesDetails = el('details', 'dossier-details');
    const sourcesSummary = el('summary', 'dossier-details__summary');
    sourcesSummary.append(
      el('span', null, `Doğrulanmış Birincil Kaynaklar (${sources.length})`),
      createSvg(
        '0 0 24 24',
        [{ tag: 'path', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M6 9l6 6 6-6' }],
        'dossier-details__icon'
      )
    );
    const sourcesList = el('ul', 'sources-list');

    for (const src of sources) {
      const li = el('li', 'source-item');
      if (src.institution) {
        li.appendChild(el('span', 'source-item__inst', src.institution));
      }
      const safeHref = sanitizeExternalUrl(src.url);
      if (safeHref) {
        const a = el('a', 'source-item__title', src.title);
        a.href = safeHref;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.appendChild(el('span', 'sr-only', ' (yeni sekmede açılır)'));
        li.appendChild(a);
      } else {
        li.appendChild(el('span', 'source-item__title', src.title));
      }
      if (src.note) {
        li.appendChild(el('p', 'source-item__note', src.note));
      }
      sourcesList.appendChild(li);
    }
    sourcesDetails.append(sourcesSummary, sourcesList);

    const verifDetails = el('details', 'dossier-details');
    const verifSummary = el('summary', 'dossier-details__summary');
    verifSummary.append(
      el('span', null, 'Editoryal Doğrulama ve Görsel Arşiv Notu'),
      createSvg(
        '0 0 24 24',
        [{ tag: 'path', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M6 9l6 6 6-6' }],
        'dossier-details__icon'
      )
    );
    const verifBox = el('div', 'verification-note');
    if (entry.verification_notes) {
      verifBox.appendChild(el('p', null, entry.verification_notes));
    }

    const mediaNote = el('p', 'verification-note__media');
    const creator = entry.media.photographer_or_creator || 'Dönem Arşivi';
    mediaNote.appendChild(
      document.createTextNode(
        `Görsel Arşivi: ${creator} (${entry.media.archive_source}, ${entry.media.license})`
      )
    );
    const safePageUrl = sanitizeExternalUrl(entry.media.source_page_url);
    if (safePageUrl) {
      mediaNote.appendChild(document.createTextNode(' — '));
      const mediaLink = el('a', null, 'Arşiv kaynak sayfası');
      mediaLink.href = safePageUrl;
      mediaLink.target = '_blank';
      mediaLink.rel = 'noopener noreferrer';
      mediaLink.appendChild(el('span', 'sr-only', ' (yeni sekmede açılır)'));
      mediaNote.appendChild(mediaLink);
    }
    verifBox.appendChild(mediaNote);
    verifDetails.append(verifSummary, verifBox);

    detailsRow.append(sourcesDetails, verifDetails);
    article.appendChild(detailsRow);

    return article;
  }

  // ---------- Render Main Feed ----------
  function renderFeed(entries) {
    if (!reformsFeedEl) return;

    if (!entries.length) {
      reformsFeedEl.replaceChildren();
      reformsFeedEl.hidden = true;
      if (emptyStateEl) emptyStateEl.hidden = false;
      return;
    }

    reformsFeedEl.hidden = false;
    if (emptyStateEl) emptyStateEl.hidden = true;

    const fragment = document.createDocumentFragment();

    if (state.viewMode === 'chronological') {
      const sorted = entries.slice().sort((a, b) => a.year - b.year || a.index - b.index);
      const byYear = new Map();
      for (const entry of sorted) {
        if (!byYear.has(entry.year)) byYear.set(entry.year, []);
        byYear.get(entry.year).push(entry);
      }

      for (const [year, yearEntries] of byYear.entries()) {
        const chapter = el('section', 'year-chapter');
        chapter.setAttribute('aria-labelledby', `year-heading-${year}`);

        const head = el('header', 'year-chapter__header');
        const h2 = el('h2', 'year-chapter__title', String(year));
        h2.id = `year-heading-${year}`;
        const countSpan = el('span', 'year-chapter__count', `${yearEntries.length} madde`);
        head.append(h2, countSpan);

        chapter.appendChild(head);
        for (const entry of yearEntries) {
          chapter.appendChild(buildDossierArticle(entry));
        }
        fragment.appendChild(chapter);
      }
    } else {
      const byTheme = new Map();
      for (const entry of entries) {
        if (!byTheme.has(entry.theme_id)) byTheme.set(entry.theme_id, []);
        byTheme.get(entry.theme_id).push(entry);
      }

      for (const theme of DATA.themes) {
        const themeEntries = byTheme.get(theme.id);
        if (!themeEntries || !themeEntries.length) continue;

        const chapter = el('section', 'theme-chapter');
        chapter.id = `theme-${theme.id}`;
        chapter.setAttribute('aria-labelledby', `theme-heading-${theme.id}`);

        const head = el('header', 'theme-chapter__header');
        const h2 = el('h2', 'theme-chapter__title', theme.title);
        h2.id = `theme-heading-${theme.id}`;

        const r0 = String(theme.entry_range[0]).padStart(2, '0');
        const r1 = String(theme.entry_range[1]).padStart(2, '0');
        const meta = el('p', 'theme-chapter__meta', `Madde ${r0}–${r1} · ${themeEntries.length} madde`);
        const summary = el('p', 'theme-chapter__summary', theme.summary);

        head.append(h2, meta, summary);
        chapter.appendChild(head);

        for (const entry of themeEntries) {
          chapter.appendChild(buildDossierArticle(entry));
        }

        fragment.appendChild(chapter);
      }
    }

    reformsFeedEl.replaceChildren(fragment);
    observeDossiersForReadingContext();
  }

  function updateAll() {
    currentFilteredEntries = getFilteredEntries();
    syncThemeFilterButtons(themeFilterBar, state.theme);
    syncViewModeButtons();
    syncYearScrubberSelection();
    renderActiveFilters();
    updateResultsStatus(currentFilteredEntries.length);
    renderFeed(currentFilteredEntries);
  }

  function resetAllFilters() {
    state.theme = 'all';
    state.year = null;
    state.institution = null;
    state.query = '';
    if (searchInput) searchInput.value = '';
    syncSearchClearVisibility();
    syncUrlThemeParam();
    updateAll();
  }

  // ---------- Search & Filter Event Bindings ----------
  function syncSearchClearVisibility() {
    if (!searchClearBtn) return;
    const hasText = Boolean(searchInput && searchInput.value.trim().length > 0);
    searchClearBtn.hidden = !hasText;
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.query = searchInput.value;
      syncSearchClearVisibility();
      updateAll();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      state.query = '';
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      syncSearchClearVisibility();
      updateAll();
    });
  }

  if (themeFilterBar) {
    themeFilterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-theme], button[data-filter-theme]');
      if (!btn) return;
      const nextTheme = btn.dataset.theme ?? btn.dataset.filterTheme ?? 'all';
      state.theme = nextTheme;
      syncUrlThemeParam();
      updateAll();
    });
  }

  if (viewModeThematicBtn) {
    viewModeThematicBtn.addEventListener('click', () => {
      if (state.viewMode === 'thematic') return;
      state.viewMode = 'thematic';
      updateAll();
    });
  }

  if (viewModeChronologicalBtn) {
    viewModeChronologicalBtn.addEventListener('click', () => {
      if (state.viewMode === 'chronological') return;
      state.viewMode = 'chronological';
      updateAll();
    });
  }

  if (yearScrubberEl) {
    yearScrubberEl.addEventListener('click', (e) => {
      const bar = e.target.closest('.year-bar');
      if (!bar || bar.disabled) return;
      const yr = Number(bar.dataset.year);
      if (Number.isNaN(yr)) return;
      state.year = state.year === yr ? null : yr;
      updateAll();
    });
  }

  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);

  if (reformsFeedEl) {
    reformsFeedEl.addEventListener('click', (e) => {
      const instBtn = e.target.closest('button[data-filter-institution]');
      if (instBtn) {
        const inst = instBtn.dataset.filterInstitution;
        state.institution = state.institution === inst ? null : inst;
        updateAll();
        return;
      }

      const lbTrigger = e.target.closest('[data-lightbox-entry]');
      if (lbTrigger) {
        const val = lbTrigger.dataset.lightboxEntry;
        const zoomSibling = lbTrigger.classList.contains('media-zoom-btn')
          ? lbTrigger
          : lbTrigger.closest('.dossier-media__frame')?.querySelector('.media-zoom-btn') || lbTrigger;
        openLightboxByKey(val, zoomSibling);
      }
    });
  }

  // ---------- Jump & Highlight Helper ----------
  function focusAndHighlightEntry(entryId) {
    const targetEl = document.getElementById(entryId);
    if (!targetEl) return;

    state.activeEntryId = entryId;
    if (targetHighlightTimer) {
      clearTimeout(targetHighlightTimer);
      targetHighlightTimer = null;
    }
    document.querySelectorAll('.reform-dossier.is-target-highlight').forEach((node) => {
      node.classList.remove('is-target-highlight');
    });

    targetEl.classList.add('is-target-highlight');
    targetEl.scrollIntoView({
      behavior: isReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });

    targetEl.setAttribute('tabindex', '-1');
    targetEl.focus({ preventScroll: true });

    targetHighlightTimer = window.setTimeout(() => {
      targetEl.classList.remove('is-target-highlight');
      targetHighlightTimer = null;
    }, 3600);
  }

  function navigateToEntry(entryId) {
    const entry = entriesById.get(entryId);
    if (!entry) return;

    const currentlyVisible = currentFilteredEntries.some((e) => e.id === entryId);
    if (!currentlyVisible) {
      resetAllFilters();
    }

    if (window.location.hash !== `#${entryId}` && window.history && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.hash = entryId;
      window.history.replaceState(null, '', url.toString());
    }

    window.requestAnimationFrame(() => focusAndHighlightEntry(entryId));
  }

  // ---------- Drawer Directory ----------
  function renderDrawerList() {
    if (!drawerListEl) return;
    const nq = normalizeTr(state.drawerQuery);
    const filtered = DATA.entries.filter((entry) => {
      if (state.drawerTheme !== 'all' && entry.theme_id !== state.drawerTheme) return false;
      if (nq && !matchesQuery(entry, nq)) return false;
      return true;
    });

    if (drawerStatusEl) {
      drawerStatusEl.textContent = `${filtered.length} madde gösteriliyor`;
    }

    if (!filtered.length) {
      const emptyMsg = el('p', 'drawer-empty', 'Eşleşen devrim maddesi bulunamadı.');
      drawerListEl.replaceChildren(emptyMsg);
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const entry of filtered) {
      const btn = el('button', entry.id === state.activeEntryId ? 'drawer-item is-active' : 'drawer-item');
      btn.type = 'button';
      btn.dataset.drawerEntry = entry.id;

      const meta = el(
        'span',
        'drawer-item__meta',
        `${String(entry.index).padStart(2, '0')} · ${entry.date_display}`
      );
      const title = el('span', 'drawer-item__title', entry.title);
      const theme = el('span', 'drawer-item__theme', entry.theme_title);

      btn.append(meta, title, theme);
      fragment.appendChild(btn);
    }

    drawerListEl.replaceChildren(fragment);
  }

  function openDrawer() {
    if (!drawerBackdrop) return;
    lastFocusedBeforeModal = document.activeElement;
    ensureThemeFilterButtons(drawerThemeFilters, state.drawerTheme, 'drawer-theme-chip');
    renderDrawerList();
    drawerBackdrop.hidden = false;
    document.body.classList.add('modal-open');
    setBackgroundInert(true);
    if (openDrawerBtn) openDrawerBtn.setAttribute('aria-expanded', 'true');
    if (drawerSearchInput) {
      window.requestAnimationFrame(() => drawerSearchInput.focus());
    } else if (closeDrawerBtn) {
      window.requestAnimationFrame(() => closeDrawerBtn.focus());
    }
  }

  function closeDrawer(restoreFocus = true) {
    if (!drawerBackdrop || drawerBackdrop.hidden) return;
    drawerBackdrop.hidden = true;
    document.body.classList.remove('modal-open');
    setBackgroundInert(false);
    if (openDrawerBtn) openDrawerBtn.setAttribute('aria-expanded', 'false');
    if (restoreFocus && lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => closeDrawer(true));
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeDrawer(true);
    });
  }

  if (drawerSearchInput) {
    drawerSearchInput.addEventListener('input', () => {
      state.drawerQuery = drawerSearchInput.value;
      renderDrawerList();
    });
  }

  if (drawerThemeFilters) {
    drawerThemeFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-theme], button[data-filter-theme]');
      if (!btn) return;
      state.drawerTheme = btn.dataset.theme ?? btn.dataset.filterTheme ?? 'all';
      syncThemeFilterButtons(drawerThemeFilters, state.drawerTheme);
      renderDrawerList();
    });
  }

  if (drawerListEl) {
    drawerListEl.addEventListener('click', (e) => {
      const item = e.target.closest('button[data-drawer-entry]');
      if (!item) return;
      const entryId = item.dataset.drawerEntry;
      closeDrawer(false);
      lastFocusedBeforeModal = null;
      navigateToEntry(entryId);
    });
  }

  // ---------- Lightbox ----------
  function renderLightboxAt(pos) {
    const entry = lightboxEntries[pos];
    if (!entry) return;
    currentLightboxPos = pos;

    if (lightboxTitle) {
      lightboxTitle.textContent = `${entry.title} (${entry.date_display})`;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${pos + 1} / ${lightboxEntries.length}`;
    }
    if (lightboxImg) {
      lightboxImg.src = entry.media.src;
      lightboxImg.alt = entry.media.alt_tr;
      lightboxImg.width = entry.media.width;
      lightboxImg.height = entry.media.height;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = entry.media.caption_tr;
    }
    if (lightboxMeta) {
      const creator = entry.media.photographer_or_creator || 'Dönem Arşivi';
      lightboxMeta.textContent = `${entry.media.archive_source} · ${creator} · ${entry.media.estimated_date} · ${entry.media.license}`;
    }
    if (lightboxSourceLink) {
      const safeUrl = sanitizeExternalUrl(entry.media.source_page_url);
      if (safeUrl) {
        lightboxSourceLink.href = safeUrl;
        lightboxSourceLink.hidden = false;
      } else {
        lightboxSourceLink.removeAttribute('href');
        lightboxSourceLink.hidden = true;
      }
    }
    const prevDisabled = pos <= 0;
    const nextDisabled = pos >= lightboxEntries.length - 1;
    const activeBeforeDisable = document.activeElement;
    if (lightboxPrevBtn) lightboxPrevBtn.disabled = prevDisabled;
    if (lightboxNextBtn) lightboxNextBtn.disabled = nextDisabled;

    if (activeBeforeDisable === lightboxPrevBtn && prevDisabled) {
      if (lightboxNextBtn && !lightboxNextBtn.disabled) lightboxNextBtn.focus();
      else if (lightboxCloseBtn) lightboxCloseBtn.focus();
    } else if (activeBeforeDisable === lightboxNextBtn && nextDisabled) {
      if (lightboxPrevBtn && !lightboxPrevBtn.disabled) lightboxPrevBtn.focus();
      else if (lightboxCloseBtn) lightboxCloseBtn.focus();
    }
  }

  function openLightboxByKey(key, triggerEl) {
    if (!lightboxBackdrop) return;
    const entry = entriesById.get(key) || entriesByIndex.get(String(key));
    if (!entry) return;

    const inFiltered = currentFilteredEntries.findIndex((e) => e.id === entry.id);
    if (inFiltered >= 0) {
      lightboxEntries = currentFilteredEntries.slice();
      currentLightboxPos = inFiltered;
    } else {
      lightboxEntries = DATA.entries.slice();
      currentLightboxPos = DATA.entries.findIndex((e) => e.id === entry.id);
    }

    lastFocusedBeforeModal =
      triggerEl && typeof triggerEl.focus === 'function' ? triggerEl : document.activeElement;
    renderLightboxAt(Math.max(0, currentLightboxPos));
    lightboxBackdrop.hidden = false;
    document.body.classList.add('modal-open');
    setBackgroundInert(true);
    if (lightboxCloseBtn) {
      window.requestAnimationFrame(() => lightboxCloseBtn.focus());
    }
  }

  function closeLightbox() {
    if (!lightboxBackdrop || lightboxBackdrop.hidden) return;
    lightboxBackdrop.hidden = true;
    document.body.classList.remove('modal-open');
    setBackgroundInert(false);
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      if (currentLightboxPos > 0) renderLightboxAt(currentLightboxPos - 1);
    });
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      if (currentLightboxPos < lightboxEntries.length - 1) renderLightboxAt(currentLightboxPos + 1);
    });
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', (e) => {
      if (e.target === lightboxBackdrop) closeLightbox();
    });
  }

  // ---------- Modal Focus Trap & Global Keyboard Shortcuts ----------
  document.addEventListener('keydown', (e) => {
    const isLightboxOpen = Boolean(lightboxBackdrop && !lightboxBackdrop.hidden);
    const isDrawerOpen = Boolean(drawerBackdrop && !drawerBackdrop.hidden);

    if (e.key === 'Escape') {
      if (isLightboxOpen) {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (isDrawerOpen) {
        e.preventDefault();
        closeDrawer(true);
        return;
      }
    }

    if (isLightboxOpen) {
      if (e.key === 'ArrowLeft') {
        if (currentLightboxPos > 0) renderLightboxAt(currentLightboxPos - 1);
        return;
      }
      if (e.key === 'ArrowRight') {
        if (currentLightboxPos < lightboxEntries.length - 1) renderLightboxAt(currentLightboxPos + 1);
        return;
      }
    }

    const activeModal = isLightboxOpen ? lightboxDialog : isDrawerOpen ? drawerEl : null;
    if (e.key === 'Tab' && activeModal) {
      const focusables = Array.from(
        activeModal.querySelectorAll(
          'button:not(:disabled), input:not(:disabled), a[href]:not([hidden]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((node) => node.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!activeModal.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }

    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || isLightboxOpen || isDrawerOpen) {
      return;
    }

    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      openDrawer();
    }
  });

  // ---------- Ambient Audio Player (Erik Satie — Gymnopédie No. 1) ----------
  const ambientAudio = new Audio('./audio/satie-gymnopedie-1.mp3');
  ambientAudio.loop = true;
  ambientAudio.preload = 'none';
  ambientAudio.volume = 0;

  let audioBusy = false;
  let fadeRaf = null;

  function setAudioUI(playing, customStatus) {
    if (soundIconOff) soundIconOff.classList.toggle('is-hidden', playing);
    if (soundIconOn) soundIconOn.classList.toggle('is-hidden', !playing);
    if (ambientBtn) ambientBtn.setAttribute('aria-pressed', String(playing));
    const labelText = customStatus || (playing ? 'Ses: Açık' : 'Ses: Kapalı');
    if (ambientLabel) ambientLabel.textContent = labelText;
    if (soundLiveStatus) soundLiveStatus.textContent = labelText;
  }

  function rampVolume(targetVol, durationMs, onDone) {
    if (fadeRaf) cancelAnimationFrame(fadeRaf);
    const startVol = ambientAudio.volume;
    const startTime = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - startTime) / durationMs);
      ambientAudio.volume = startVol + (targetVol - startVol) * p;
      if (p < 1) {
        fadeRaf = requestAnimationFrame(step);
      } else {
        fadeRaf = null;
        if (onDone) onDone();
      }
    };
    fadeRaf = requestAnimationFrame(step);
  }

  if (ambientBtn) {
    ambientBtn.addEventListener('click', () => {
      if (audioBusy) return;
      if (!ambientAudio.paused) {
        audioBusy = true;
        rampVolume(0, 250, () => {
          ambientAudio.pause();
          audioBusy = false;
          setAudioUI(false);
        });
        return;
      }
      audioBusy = true;
      setAudioUI(false, 'Ses yükleniyor…');
      ambientAudio.volume = 0;
      ambientAudio
        .play()
        .then(() => {
          audioBusy = false;
          setAudioUI(true);
          rampVolume(0.26, 700);
        })
        .catch(() => {
          audioBusy = false;
          setAudioUI(false, 'Ses açılamadı');
        });
    });
  }

  ambientAudio.addEventListener('pause', () => {
    if (!audioBusy) setAudioUI(false);
  });
  ambientAudio.addEventListener('play', () => {
    if (!audioBusy) setAudioUI(true);
  });
  ambientAudio.addEventListener('error', () => {
    audioBusy = false;
    setAudioUI(false, 'Ses dosyası yüklenemedi');
  });

  // ---------- Scroll Progress, Reading Context & Back-to-Top ----------
  let scrollRafPending = false;
  let dossierObserver = null;

  function setReadingContext(entry) {
    if (!entry) return;
    if (readingContextCountEl) {
      readingContextCountEl.textContent = `${String(entry.index).padStart(2, '0')} / ${DATA.meta.total_entries}`;
    }
    if (readingContextThemeEl) {
      readingContextThemeEl.textContent = entry.theme_title;
    }
  }

  function observeDossiersForReadingContext() {
    if (dossierObserver) {
      dossierObserver.disconnect();
      dossierObserver = null;
    }
    if (!('IntersectionObserver' in window) || !reformsFeedEl) return;
    const cards = reformsFeedEl.querySelectorAll('.reform-dossier');
    if (!cards.length) {
      document.body.classList.remove('is-reading');
      return;
    }

    dossierObserver = new IntersectionObserver(
      (items) => {
        const visible = items
          .filter((it) => it.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;
        const entry = entriesById.get(visible[0].target.id);
        if (entry) setReadingContext(entry);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0.01 }
    );

    cards.forEach((card) => dossierObserver.observe(card));
  }

  function updateScrollUI() {
    scrollRafPending = false;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    if (scrollProgressEl) {
      scrollProgressEl.style.transform = `scaleX(${progress.toFixed(4)})`;
    }
    if (reformsFeedEl) {
      const rect = reformsFeedEl.getBoundingClientRect();
      const inFeed = !reformsFeedEl.hidden && rect.top < 140 && rect.bottom > 180;
      document.body.classList.toggle('is-reading', inFeed);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('is-visible', window.scrollY > 900);
    }
  }

  function scheduleScrollUpdate() {
    if (scrollRafPending) return;
    scrollRafPending = true;
    window.requestAnimationFrame(updateScrollUI);
  }

  window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
  window.addEventListener('resize', scheduleScrollUpdate, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: isReducedMotion() ? 'auto' : 'smooth',
      });
    });
  }

  // ---------- Initial Boot & URL State (?tema=... & #entry-id) ----------
  function handleInitialLocation() {
    const params = new URLSearchParams(window.location.search);
    const temaParam = params.get('tema');
    if (temaParam && themesById.has(temaParam)) {
      state.theme = temaParam;
    }

    ensureThemeFilterButtons(themeFilterBar, state.theme, 'theme-pill');
    ensureThemeFilterButtons(drawerThemeFilters, state.drawerTheme, 'drawer-theme-chip');
    renderYearScrubber();
    syncSearchClearVisibility();
    updateAll();

    const hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (hash) {
      if (entriesById.has(hash)) {
        window.setTimeout(() => navigateToEntry(hash), 80);
      } else if (hash.startsWith('theme-')) {
        const target = document.getElementById(hash);
        if (target) {
          window.setTimeout(() => {
            target.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth', block: 'start' });
          }, 80);
        }
      }
    }

    updateScrollUI();
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (!hash) return;
    if (entriesById.has(hash)) {
      navigateToEntry(hash);
    } else if (hash.startsWith('theme-')) {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    }
  });

  handleInitialLocation();
})();
