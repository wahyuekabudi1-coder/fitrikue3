/**
 * Sweet Bakery Navigation & Screen Switcher
 * Handles data-path routing and quick screen navigation across customer & admin views.
 */
(() => {
  const PATH_MAP = {
    'beranda': '/',
    'katalog-kue': '/katalog_kue_sweet_bakery.html',
    'custom-wedding': '/formulir_pre_order_sweet_bakery.html',
    'cara-pre-order': '/formulir_pre_order_sweet_bakery.html',
    'status-pesanan': '/status_pelacakan_pesanan_sweet_bakery.html',
    'keranjang-pre-order': '/formulir_pre_order_sweet_bakery.html',
    'tentang-kami': '/#tentang-kami',
    'faq': '/#faq',
    'kebijakan-layanan': '/#kebijakan-layanan',
    'detail-produk': '/detail_produk_raspberry_pistachio_layer_cake.html',
    'dashboard-kpi': '/admin_dashboard_kpi_sweet_bakery.html',
    'kalender-produksi-oven': '/kalender_produksi_oven_sweet_bakery.html',
    'manajemen-pesanan': '/manajemen_pesanan_sweet_bakery.html',
    'verifikasi-pembayaran': '/verifikasi_pembayaran_sweet_bakery.html',
    'katalog-produk-cms': '/katalog_kue_sweet_bakery.html',
    'laporan-keuangan': '/admin_dashboard_kpi_sweet_bakery.html',
    'pengaturan-toko': '/admin_dashboard_kpi_sweet_bakery.html'
  };

  const SCREENS = [
    { category: 'Customer Storefront', items: [
      { name: 'Beranda (Home)', url: '/' },
      { name: 'Katalog Kue & Pâtisserie', url: '/katalog_kue_sweet_bakery.html' },
      { name: 'Detail Produk Cake', url: '/detail_produk_raspberry_pistachio_layer_cake.html' },
      { name: 'Formulir Pre-Order', url: '/formulir_pre_order_sweet_bakery.html' },
      { name: 'Pembayaran DP & Konfirmasi', url: '/pembayaran_dp_konfirmasi_sweet_bakery.html' },
      { name: 'Pelacakan Status Pesanan', url: '/status_pelacakan_pesanan_sweet_bakery.html' },
    ]},
    { category: 'Admin & Kitchen Atelier', items: [
      { name: 'Dashboard & KPI Admin', url: '/admin_dashboard_kpi_sweet_bakery.html' },
      { name: 'Kalender Produksi Oven', url: '/kalender_produksi_oven_sweet_bakery.html' },
      { name: 'Manajemen Pesanan', url: '/manajemen_pesanan_sweet_bakery.html' },
      { name: 'Verifikasi Pembayaran', url: '/verifikasi_pembayaran_sweet_bakery.html' },
    ]}
  ];

  function setupRouting() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-path]');
      if (target) {
        const path = target.getAttribute('data-path');
        if (PATH_MAP[path]) {
          e.preventDefault();
          window.location.href = PATH_MAP[path];
          return;
        }
      }

      // Check for product detail clicks
      const detailBtn = e.target.closest('a, button');
      if (detailBtn && detailBtn.textContent) {
        const text = detailBtn.textContent.trim().toLowerCase();
        if (text === 'detail' || text.includes('lihat detail')) {
          e.preventDefault();
          window.location.href = '/detail_produk_raspberry_pistachio_layer_cake.html';
          return;
        }
        if (text.includes('pesan sekarang') || text.includes('pre-order sekarang') || text.includes('pesan pre-order')) {
          if (!detailBtn.getAttribute('data-path')) {
            e.preventDefault();
            window.location.href = '/formulir_pre_order_sweet_bakery.html';
            return;
          }
        }
        if (text.includes('lanjut pembayaran') || text.includes('bayar dp') || text.includes('konfirmasi & bayar')) {
          e.preventDefault();
          window.location.href = '/pembayaran_dp_konfirmasi_sweet_bakery.html';
          return;
        }
        if (text.includes('cek status pesanan') || text.includes('lacak pesanan')) {
          e.preventDefault();
          window.location.href = '/status_pelacakan_pesanan_sweet_bakery.html';
          return;
        }
      }
    });
  }

  function renderScreenSwitcher() {
    if (document.getElementById('sweet-screen-switcher')) return;

    const currentPath = window.location.pathname;
    const isCurrent = (url) => {
      if (url === '/' && (currentPath === '/' || currentPath === '/index.html' || currentPath.includes('beranda'))) return true;
      return currentPath.includes(url.replace('/', '')) && url !== '/';
    };

    const container = document.createElement('div');
    container.id = 'sweet-screen-switcher';
    container.className = 'fixed bottom-4 right-4 z-[9999] font-sans text-sm select-none';

    container.innerHTML = `
      <div id="switcher-panel" class="hidden mb-2 bg-[#FFFDFB] border border-[#EADFD9] rounded-2xl shadow-xl p-4 w-72 backdrop-blur-md">
        <div class="flex items-center justify-between border-b border-[#EADFD9] pb-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="font-serif font-bold text-[#3B2925] text-xs tracking-tight">Navigasi Halaman</span>
          </div>
          <button id="switcher-close" class="text-[#705954] hover:text-[#C62828] text-xs px-1">✕</button>
        </div>
        <div class="max-h-80 overflow-y-auto space-y-3 pr-1 text-xs">
          ${SCREENS.map(group => `
            <div>
              <div class="font-semibold text-[#C62828] text-[11px] uppercase tracking-wider mb-1.5">${group.category}</div>
              <div class="space-y-1">
                ${group.items.map(item => `
                  <a href="${item.url}" class="block px-2.5 py-1.5 rounded-lg transition-colors ${
                    isCurrent(item.url)
                      ? 'bg-[#C62828] text-white font-semibold shadow-xs'
                      : 'text-[#3B2925] hover:bg-[#FFF5E9] hover:text-[#C62828]'
                  }">
                    ${item.name}
                  </a>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <button id="switcher-toggle" class="flex items-center gap-2 bg-[#C62828] hover:bg-[#9B1B1B] text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer font-medium text-xs">
        <span class="material-symbols-outlined text-[18px]">layers</span>
        <span>Jelajahi Halaman (10)</span>
      </button>
    `;

    document.body.appendChild(container);

    const toggleBtn = container.querySelector('#switcher-toggle');
    const closeBtn = container.querySelector('#switcher-close');
    const panel = container.querySelector('#switcher-panel');

    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', () => {
      panel.classList.add('hidden');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupRouting();
      renderScreenSwitcher();
    });
  } else {
    setupRouting();
    renderScreenSwitcher();
  }
})();
