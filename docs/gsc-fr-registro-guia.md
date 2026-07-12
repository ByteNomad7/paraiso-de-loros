# Guía: Registrar paraisodeaves.com/fr/ en Google Search Console

**Objetivo:** Crear una propiedad de prefijo de URL en GSC para `https://www.paraisodeaves.com/fr/` y obtener visibilidad completa del tráfico orgánico francés (clics, impresiones, errores de indexación).

---

## Paso 1 — Añadir la propiedad en GSC

1. Ir a [search.google.com/search-console](https://search.google.com/search-console/)
2. En el menú desplegable de propiedades (esquina superior izquierda), hacer clic en **"+ Añadir propiedad"**
3. Seleccionar **"Prefijo de URL"** (no "Dominio")
4. Introducir exactamente: `https://www.paraisodeaves.com/fr/`
5. Hacer clic en **"Continuar"**

---

## Paso 2 — Verificar la propiedad

Google ofrecerá varios métodos. El más inmediato es **"Etiqueta HTML"**:

### Método recomendado: Etiqueta HTML (ya preparada)

Los meta tags de verificación GSC ya están añadidos a `fr/index.html`:

```html
<meta name="google-site-verification" content="8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c" />
<meta name="google-site-verification" content="rEssv_QHGO0TDZMwuv94A5v-LQM4OkXtuffGFAbcRq4" />
```

Estos tags aparecen en el `<head>` de `https://www.paraisodeaves.com/fr/`. Una vez desplegado el cambio en Netlify:

1. En GSC, seleccionar el método **"Etiqueta HTML"**
2. Google mostrará un meta tag — comprobar que el `content` coincide con alguno de los valores anteriores
3. Si GSC genera un token nuevo diferente, añadirlo también a `fr/index.html` y redesplegar
4. Hacer clic en **"Verificar"**

### Método alternativo: Google Analytics

Si la cuenta de GSC ya está vinculada al GA4 `G-4007YHH4H9` (que ya aparece en `fr/index.html`), seleccionar el método **"Google Analytics"** y verificará automáticamente sin necesidad de desplegar ningún cambio adicional.

---

## Paso 3 — Enviar el sitemap FR

Una vez verificada la propiedad:

1. En el panel de la propiedad `https://www.paraisodeaves.com/fr/`, ir a **Índice → Sitemaps** (menú izquierdo)
2. En el campo "Añadir un nuevo sitemap", introducir:
   ```
   https://www.paraisodeaves.com/sitemap_fr.xml
   ```
3. Hacer clic en **"Enviar"**
4. Esperar unos minutos y recargar — debería aparecer como "Correcto" con **147 URLs detectadas**

---

## Paso 4 — Solicitar indexación manual de URLs prioritarias

En GSC → **Inspección de URL**, pegar cada URL y hacer clic en "Solicitar indexación". Priorizar en este orden:

### Tier 1 — Money pages (indexar primero)

| URL | Prioridad sitemap |
|---|---|
| `https://www.paraisodeaves.com/fr/` | 0.95 |
| `https://www.paraisodeaves.com/fr/perroquet-gris-du-gabon/` | 0.80 |
| `https://www.paraisodeaves.com/fr/ara-bleu-et-jaune/` | 0.80 |
| `https://www.paraisodeaves.com/fr/ara-hyacinthe/` | 0.80 |
| `https://www.paraisodeaves.com/fr/ara-macao/` | 0.80 |
| `https://www.paraisodeaves.com/fr/cacatoes-huppe-jaune/` | 0.80 |
| `https://www.paraisodeaves.com/fr/cacatoes-rosalbin/` | 0.80 |
| `https://www.paraisodeaves.com/fr/eclectus/` | 0.80 |
| `https://www.paraisodeaves.com/fr/amazone-front-bleu/` | 0.80 |
| `https://www.paraisodeaves.com/fr/perroquets-disponibles/` | 0.80 |
| `https://www.paraisodeaves.com/fr/livraison/` | 0.80 |
| `https://www.paraisodeaves.com/fr/contact/` | 0.80 |

### Tier 2 — Hubs de especies y páginas de compra

| URL | Descripción |
|---|---|
| `https://www.paraisodeaves.com/fr/especies/` | Hub species FR |
| `https://www.paraisodeaves.com/fr/especies/perroquet-gris-du-gabon/` | Especie |
| `https://www.paraisodeaves.com/fr/especies/ara-bleu-et-jaune/` | Especie |
| `https://www.paraisodeaves.com/fr/especies/ara-hyacinthe/` | Especie |
| `https://www.paraisodeaves.com/fr/especies/eclectus/` | Especie |
| `https://www.paraisodeaves.com/fr/acheter-perroquet/` | Money page |
| `https://www.paraisodeaves.com/fr/acheter-ara/` | Money page |
| `https://www.paraisodeaves.com/fr/acheter-gris-du-gabon/` | Money page |
| `https://www.paraisodeaves.com/fr/prix-ara-hyacinthe/` | Money page |
| `https://www.paraisodeaves.com/fr/prix-cacatoes/` | Money page |
| `https://www.paraisodeaves.com/fr/connaissances/` | Knowledge hub |

### Tier 3 — Ciudades FR (tráfico local)

| URL | Ciudad |
|---|---|
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-paris/` | París |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-marseille/` | Marsella |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-lyon/` | Lyon |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-toulouse/` | Toulouse |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-nice/` | Niza |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-nantes/` | Nantes |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-strasbourg/` | Estrasburgo |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-montpellier/` | Montpellier |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-bordeaux/` | Burdeos |
| `https://www.paraisodeaves.com/fr/perroquets-a-vendre-lille/` | Lille |

### Tier 4 — Blog FR

| URL |
|---|
| `https://www.paraisodeaves.com/fr/blog/` |
| `https://www.paraisodeaves.com/fr/blog/alimentation-perroquets/` |
| `https://www.paraisodeaves.com/fr/blog/ara-hyacinthe-guide/` |
| `https://www.paraisodeaves.com/fr/blog/perroquet-gris-du-gabon-guide/` |
| `https://www.paraisodeaves.com/fr/blog/prix-perroquet-france/` |
| `https://www.paraisodeaves.com/fr/blog/guide-cites-france/` |

---

## Paso 5 — Configurar la vista de datos en GSC

Una vez operativa la propiedad:

1. Ir a **Rendimiento → Resultados de búsqueda**
2. Filtrar por **País: France** para ver métricas FR dentro de la propiedad raíz
3. La propiedad `https://www.paraisodeaves.com/fr/` mostrará exclusivamente el tráfico del subdirectorio FR
4. Comparar mensualmente con la propiedad raíz para medir la evolución del tráfico francés

---

## Notas importantes

- **Propiedad raíz existente**: Si `https://www.paraisodeaves.com/` ya está verificada en GSC, Google puede sugerir heredar la verificación automáticamente. Aceptarlo si aparece esa opción.
- **Tiempo hasta datos**: Los primeros clics e impresiones pueden tardar 3-7 días en aparecer tras la verificación.
- **Sitemap indexación**: Es normal que GSC tarde 24-48h en procesar el sitemap. Si aparece error "No se pudo recuperar", esperar y reintentar.
- **Cuota de indexación**: GSC permite ~10-20 solicitudes de indexación manual por día. Priorizar el Tier 1 primero.
- **sitemap_fr.xml**: Contiene 147 URLs (homepage FR, species pages, city pages, blog, knowledge centre, gallery).
