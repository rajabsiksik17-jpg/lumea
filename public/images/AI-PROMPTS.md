# LUMÉA — AI Image Prompts

استخدم هذه البرومبتات لتوليد صور الموقع في أي أداة AI (Midjourney, DALL·E,
Leonardo, Freepik AI, ...). النتائج ستكون متناسقة لأنها تتبع هوية بصرية واحدة.

## الهوية البصرية الموحّدة (أضفها لكل برومبت)

```
luxury dermocosmetic editorial photography, soft diffused studio lighting,
cream beige ivory warm palette, premium skincare product, minimal composition,
natural skin tones, matte finish, high-end cosmetic campaign aesthetic,
shallow depth of field, ultra detailed, 8k, cinematic, no text
```

> كل برومبت أدناه يبدأ بالموضوع المحدد، ثم تُلحق كتلة الهوية أعلاه في النهاية.

---

## Hero
```
close-up of a glass serum dropper bottle on a beige stone pedestal,
soft golden light from the side, elegant negative space
```

## Story
```
flat lay of premium cosmetic cream jars and serum bottles arranged
meticulously on warm ivory linen fabric
```

## Story (Secondary / detail)
```
macro detail of creamy white texture swatch being smoothed by a finger,
silky consistency, warm beige background
```

## Philosophy 01 — النقاء
```
single minimalist white cosmetic jar centered on cream background,
pure and clean, soft shadow
```

## Philosophy 02 — الأمان
```
clinical aesthetic skincare ampoule held with gloved hands,
sterile bright soft light, medical-grade feel
```

## Philosophy 03 — الدقة
```
precision shot of a glass pipette releasing one serum drop,
perfect droplet, macro, luxurious
```

## Experience (dark immersive)
```
moody dark editorial of a woman receiving a gentle facial treatment,
soft rim light, serene spa atmosphere, dark warm tones
```

## Final CTA
```
wide editorial of premium skincare products on a marble surface,
soft morning light, airy and aspirational
```

## Gallery 01
```
cosmetic cream jar with open lid and swirled cream texture, beige backdrop
```

## Gallery 02
```
row of frosted glass serum bottles in graduated sizes, soft beige gradient
```

## Gallery 03
```
golden face oil bottle with dropper beside a silk cloth, warm light
```

## Gallery 04
```
white and amber glass ampoules resting on a stone tray, minimal
```

## Gallery 05
```
close-up of a hand applying face cream to a cheekbone, natural skin
```

## Gallery 06
```
set of premium skincare jars with clean labels on a linen-covered shelf
```

## Service — Dermal Fillers (حقن الفيلر)
```
aesthetic clinic scene, specialist in white coat holding a dermal filler
syringe, professional medical beauty setting, soft clinical light
```

## Service — Skin Renewal (تجديد البشرة)
```
facial treatment with a soft brush applying a mask, relaxing premium spa
```

## Service — Derma Consultation (استشارة جلدية)
```
dermatologist examining a client's skin with a magnifying lamp,
consultation room, bright clean clinical aesthetic
```

## Service — Signature Creams (كريمات طبية)
```
open cosmetic cream jar with rich texture, elegant beige packaging,
pharmacy-grade look
```

## Product — HYDRAPEPTIDE
```
luxury moisturising cream jar in soft neutral tones, water droplets on glass,
hydrating feel
```

## Product — RETINOL RENEW
```
night repair cream tube and jar, deep navy and cream palette, elegant
```

## Product — VITA-C SERUM
```
brightening serum bottle in amber glass with dropper, citrus glow accent,
fresh and luminous
```

## Product — BARRIER BALM
```
restorative balm in a frosted pot, calming neutral beige, soothing soft light
```

---

## معاملات Midjourney (أضفها لتحكم بالمقاس)

| الموضع | الإضافة |
|---|---|
| Hero / Experience / Final CTA | `--ar 16:9 --v 6` |
| Story / Products | `--ar 4:5 --v 6` |
| Philosophy | `--ar 1:1 --v 6` |
| Services | `--ar 4:3 --v 6` |
| Gallery | `--ar 3:4 --v 6` |

## طريقة الاستخدام

1. ولّد الصورة وصدّرها بصيغة `.jpg` أو `.webp`.
2. ضعها في `public/images/` بنفس الاسم في `public/images/README.md`.
3. حدّث الامتداد في `src/data/images.js` أو `services.js` أو `products.js`.

> للحفاظ على سرعة الموقع: صدّر بعرض 1920px كحد أقصى، وبصيغة `.webp` إن أمكن.
