# LUMÉA — Image Manifest

كل الصور هنا هي **placeholder** أنيقة (SVG). قبل الإطلاق، استبدل كل ملف بصورتك
الحقيقية بنفس الاسم، أو بأي امتداد (jpg / webp) وحدّث الامتداد في ملفات المصدر.

## أماكن تحديث المسارات

| المصدر | الملف |
|---|---|
| الصور العامة (Hero, Story, Philosophy, Gallery, ...) | `src/data/images.js` |
| صور الخدمات | `src/data/services.js` |
| صور المنتجات | `src/data/products.js` |

> المسارات نسبية (`images/...`) فتعمل في جذر الدومين وفي أي مجلد فرعي.

## القائمة الكاملة

| الملف | الاستخدام | المقاس المقترح |
|---|---|---|
| `hero.svg` | خلفية Hero | 1920×1080 |
| `story.svg` | صورة قصة | 1200×1500 |
| `story-secondary.svg` | صورة قصة (التفاصيل) | 1200×1500 |
| `philosophy-01.svg` | فلسفة — المبدأ 01 | 1200×1200 |
| `philosophy-02.svg` | فلسفة — المبدأ 02 | 1200×1200 |
| `philosophy-03.svg` | فلسفة — المبدأ 03 | 1200×1200 |
| `experience.svg` | القسم الغامر | 1920×1080 |
| `final-cta.svg` | الـ CTA الختامي | 1920×1080 |
| `gallery-01.svg` → `gallery-06.svg` | المعرض | 900×1200 |
| `service-fillers.svg` | خدمة حقن الفيلر | 1200×900 |
| `service-skin-renewal.svg` | خدمة تجديد البشرة | 1200×900 |
| `service-consultation.svg` | خدمة الاستشارة الجلدية | 1200×900 |
| `service-creams.svg` | خدمة الكريمات الطبية | 1200×900 |
| `product-hydrapeptide.svg` | منتج HYDRAPEPTIDE | 900×1125 |
| `product-retinol.svg` | منتج RETINOL RENEW | 900×1125 |
| `product-vitac.svg` | منتج VITA-C SERUM | 900×1125 |
| `product-barrier-balm.svg` | منتج BARRIER BALM | 900×1125 |

## طريقة الاستبدال

1. ضع صورك الحقيقية في هذا المجلد `public/images/`.
2. استخدم نفس أسماء الملفات **أو** غيّر الاسم ثم حدّث الامتداد في ملف المصدر.

مثال: لو وضعت صورة Hero باسم `hero.jpg`، غيّر في `src/data/images.js`:

```js
hero: img('hero.svg')   // قبل
hero: img('hero.jpg')   // بعد
```

## إعادة توليد الـ placeholders (اختياري)

```bash
node scripts/generate-placeholders.mjs
```

> يُنصح بحذف الـ SVGs التي استبدلتها، أو تركها — لا مشكلة.
