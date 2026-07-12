# Registrar paraisodeaves.com/pt/ en Google Search Console

**Objetivo:** Crear una propiedad de prefijo de URL en GSC para `https://www.paraisodeaves.com/pt/` y así rastrear el rendimiento orgánico del tráfico portugués de forma independiente.

---

## ¿Por qué es necesario?

La propiedad principal de GSC cubre todo el dominio (`paraisodeaves.com`) pero los datos de PT se mezclan con ES y FR. Con una propiedad separada de prefijo de URL para `/pt/`, obtienes:

- Clics, impresiones, CTR y posición **solo para las 82 páginas PT**
- Errores de indexación exclusivos de `/pt/`
- Posibilidad de enviar `sitemap_pt.xml` directamente
- Informes de rendimiento por país (Portugal, Brasil)

---

## Paso 1 — Crear la propiedad en GSC

1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. En el selector de propiedades (esquina superior izquierda) → **Añadir propiedad**
3. Elegir **"Prefijo de URL"** (no "Dominio")
4. Introducir exactamente: `https://www.paraisodeaves.com/pt/`
5. Clic en **Continuar**

---

## Paso 2 — Verificar la propiedad

Google ofrecerá varios métodos. El más sencillo para este sitio es:

### Opción A — Archivo HTML (recomendado)

1. GSC genera un nombre de archivo como `google1234abcd.html`
2. Crear ese archivo en la carpeta `/pt/` del repositorio con el contenido que indique Google
3. Hacer deploy en Netlify
4. Volver a GSC y pulsar **Verificar**

### Opción B — Meta tag HTML

1. GSC da una etiqueta como `<meta name="google-site-verification" content="TOKEN"/>`
2. Añadir esa etiqueta en el `<head>` de `pt/index.html`
3. Hacer deploy y verificar en GSC

> **Nota:** La propiedad principal ya tiene los tokens `8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c` y `rEssv_QHGO0TDZMwuv94A5v-LQM4OkXtuffGFAbcRq4` en el `<head>`. La propiedad de `/pt/` necesitará un token diferente.

---

## Paso 3 — Enviar el sitemap PT

Una vez verificada la propiedad:

1. En la propiedad `https://www.paraisodeaves.com/pt/` → **Sitemaps** (menú lateral)
2. Introducir la URL del sitemap: `https://www.paraisodeaves.com/sitemap_pt.xml`
3. Pulsar **Enviar**

El sitemap `sitemap_pt.xml` ya existe y contiene las 82 URLs PT con `lastmod 2026-06-30`.

---

## Paso 4 — URLs prioritarias para solicitar indexación manual

Una vez enviado el sitemap, solicitar indexación manual (GSC → Inspección de URL → Solicitar indexación) para estas páginas de alto valor:

| URL | Motivo |
|---|---|
| `https://www.paraisodeaves.com/pt/` | Homepage PT |
| `https://www.paraisodeaves.com/pt/especies/` | Hub de especies PT |
| `https://www.paraisodeaves.com/pt/blog/` | Blog PT index |
| `https://www.paraisodeaves.com/pt/especies/amazona-asa-laranja/` | Especie con hreflang |
| `https://www.paraisodeaves.com/pt/blog/arara-jacinto-guia-completo/` | Post de alto valor |
| `https://www.paraisodeaves.com/pt/blog/melhores-papagaios-para-iniciantes/` | Intención compra |
| `https://www.paraisodeaves.com/pt/blog/documentacao-cites-portugal/` | Tráfico legal PT |
| `https://www.paraisodeaves.com/pt/blog/quanto-custa-um-papagaio-em-portugal/` | Intención compra |

---

## Paso 5 — Configurar informes de rendimiento

Tras 2–4 semanas de datos:

- **Rendimiento → Páginas:** filtrar por `/pt/` para ver qué páginas generan más clics
- **Rendimiento → Consultas:** identificar keywords PT con posición 11–20 (oportunidades de mejora rápida)
- **Cobertura:** detectar errores 404 o páginas excluidas en el subdominio PT
- **Mejoras → Datos estructurados:** verificar que los artículos PT tienen schema válido

---

## Estado actual de /pt/

| Métrica | Valor |
|---|---|
| URLs en sitemap_pt.xml | 82 |
| Idioma declarado | `pt-PT` (hreflang correcto) |
| Hreflang ES↔PT | Corregido en todos los blog posts (julio 2026) |
| x-default | Apunta a versión ES en posts con equivalente |
| Robots.txt | `Allow: /` — PT indexable |
| Canonical | Cada página PT tiene canonical propio |

---

## Notas

- GSC puede tardar **24–72 horas** en verificar y comenzar a recopilar datos
- Los primeros datos de rendimiento aparecen tras **48–96 horas** de tráfico
- Para Portugal como mercado, revisar también si `paraisodeaves.com/pt/` aparece en [Google.pt](https://www.google.pt) haciendo `site:paraisodeaves.com/pt/`
