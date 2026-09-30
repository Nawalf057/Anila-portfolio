// Mobile navigation
(function () {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
    });
})();

// Project viewers (presentation + Excel data)
(function () {
    const deck = document.getElementById('deck');
    if (!deck) return;
    const data = document.getElementById('data');
    const viewers = { deck, data };

    function openViewer(id) {
        Object.entries(viewers).forEach(([k, el]) => { if (el) el.hidden = (k !== id); });
        viewers[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => openViewer(b.dataset.open)));
    const h = location.hash.slice(1);
    if ((h === 'deck' || h === 'data') && viewers[h]) openViewer(h);

    const total = parseInt(deck.dataset.total, 10);
    const folder = deck.dataset.folder;
    const img = document.getElementById('slide-img');
    const num = document.getElementById('slide-num');
    let n = 1;
    function go(i) {
        n = Math.min(total, Math.max(1, i));
        img.src = folder + '/slides/slide-' + String(n).padStart(2, '0') + '.jpg';
        img.alt = 'Slide ' + n + ' of ' + total;
        num.textContent = n;
    }
    deck.querySelector('.slide-nav.prev').addEventListener('click', () => go(n - 1));
    deck.querySelector('.slide-nav.next').addEventListener('click', () => go(n + 1));
    document.addEventListener('keydown', e => {
        if (deck.hidden) return;
        if (e.key === 'ArrowLeft') go(n - 1);
        if (e.key === 'ArrowRight') go(n + 1);
    });
    document.getElementById('fs-btn').addEventListener('click', e => {
        e.preventDefault();
        const st = document.getElementById('slide-stage');
        if (document.fullscreenElement) document.exitFullscreen();
        else if (st.requestFullscreen) st.requestFullscreen();
    });

    document.querySelectorAll('.xl-tab').forEach(t => t.addEventListener('click', () => {
        document.querySelectorAll('.xl-tab').forEach(x => x.classList.remove('active'));
        document.querySelectorAll('.xl-pane').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        document.getElementById(t.dataset.sheet).classList.add('active');
    }));
})();

// Photo lightbox (Education page)
(function () {
    const box = document.getElementById('lightbox');
    if (!box) return;
    const tiles = [...document.querySelectorAll('.gallery-row button')];
    const img = box.querySelector('img');
    const cap = box.querySelector('figcaption');
    let cur = 0;
    function show(i) {
        cur = (i + tiles.length) % tiles.length;
        const t = tiles[cur].querySelector('img');
        img.src = t.src; img.alt = t.alt;
        cap.textContent = tiles[cur].dataset.caption || '';
    }
    tiles.forEach((t, i) => t.addEventListener('click', () => { show(i); box.showModal(); }));
    box.querySelector('.lb-close').addEventListener('click', () => box.close());
    box.querySelector('.lb-prev').addEventListener('click', () => show(cur - 1));
    box.querySelector('.lb-next').addEventListener('click', () => show(cur + 1));
    box.addEventListener('click', e => { if (e.target === box) box.close(); });
    document.addEventListener('keydown', e => {
        if (!box.open) return;
        if (e.key === 'ArrowLeft') show(cur - 1);
        if (e.key === 'ArrowRight') show(cur + 1);
    });
})();
