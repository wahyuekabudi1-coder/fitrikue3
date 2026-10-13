import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Helper to serve HTML files with navigation script injected
function serveHtml(res, filename) {
  const filePath = path.join(__dirname, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Page not found');
  }
  let html = fs.readFileSync(filePath, 'utf-8');
  if (!html.includes('/navigation.js')) {
    html = html.replace('</body>', '<script src="/navigation.js"></script></body>');
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}

// Routes mapping
app.get('/', (req, res) => serveHtml(res, 'index.html'));
app.get('/beranda', (req, res) => serveHtml(res, 'beranda_sweet_bakery.html'));
app.get('/katalog-kue', (req, res) => serveHtml(res, 'katalog_kue_sweet_bakery.html'));
app.get('/detail-produk', (req, res) => serveHtml(res, 'detail_produk_raspberry_pistachio_layer_cake.html'));
app.get('/formulir-pre-order', (req, res) => serveHtml(res, 'formulir_pre_order_sweet_bakery.html'));
app.get('/keranjang-pre-order', (req, res) => serveHtml(res, 'formulir_pre_order_sweet_bakery.html'));
app.get('/pembayaran-dp', (req, res) => serveHtml(res, 'pembayaran_dp_konfirmasi_sweet_bakery.html'));
app.get('/status-pesanan', (req, res) => serveHtml(res, 'status_pelacakan_pesanan_sweet_bakery.html'));

// Admin routes
app.get('/admin', (req, res) => serveHtml(res, 'admin_dashboard_kpi_sweet_bakery.html'));
app.get('/dashboard-kpi', (req, res) => serveHtml(res, 'admin_dashboard_kpi_sweet_bakery.html'));
app.get('/kalender-produksi-oven', (req, res) => serveHtml(res, 'kalender_produksi_oven_sweet_bakery.html'));
app.get('/manajemen-pesanan', (req, res) => serveHtml(res, 'manajemen_pesanan_sweet_bakery.html'));
app.get('/verifikasi-pembayaran', (req, res) => serveHtml(res, 'verifikasi_pembayaran_sweet_bakery.html'));

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'Sweet Bakery', timestamp: new Date().toISOString() });
});

// Serve direct .html files with injected navigation script
app.get('/*.html', (req, res, next) => {
  const filename = path.basename(req.path);
  const filePath = path.join(__dirname, filename);
  if (fs.existsSync(filePath)) {
    return serveHtml(res, filename);
  }
  next();
});

// Serve static assets (images, scripts, styles)
app.use(express.static(__dirname));

// Fallback to index.html
app.use((req, res) => {
  serveHtml(res, 'index.html');
});

app.listen(PORT, HOST, () => {
  console.log(`[Sweet Bakery] Server running at http://${HOST}:${PORT}`);
});
