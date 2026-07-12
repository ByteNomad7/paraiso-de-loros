# Guía: Registrar paraisodeaves.com/pt/ en Google Search Console

**Objetivo:** Crear una propiedad de prefijo de URL en GSC para `https://www.paraisodeaves.com/pt/` y obtener visibilidad completa del tráfico orgánico portugués (clics, impresiones, errores de indexación).

---

## Paso 1 — Añadir la propiedad en GSC

1. Ir a [search.google.com/search-console](https://search.google.com/search-console/)
2. En el menú desplegable de propiedades (esquina superior izquierda), hacer clic en **"+ Añadir propiedad"**
3. Seleccionar **"Prefijo de URL"** (no "Dominio")
4. Introducir exactamente: `https://www.paraisodeaves.com/pt/`
5. Hacer clic en **"Continuar"**

---

## Paso 2 — Verificar la propiedad

Google ofrecerá varios métodos. El más inmediato es **"Etiqueta HTML"**:

### Método recomendado: Etiqueta HTML (ya preparada)

Los meta tags de verificación GSC ya están añadidos a `pt/index.html`:

```html
<meta name="google-site-verification" content="8Du7IU5_y0w0vZeaz0bjDdLNdbzb35CubsG1YKISK8c" />
<meta name="google-site-verification" content="rEssv_QHGO0TDZMwuv94A5v-LQM4OkXtuffGFAbcRq4" />
```

Estos tags aparecen en el `<head>` de `https://www.paraisodeaves.com/pt/`. Una vez desplegado el cambio en Netlify:

1. En GSC, seleccionar el método **"Etiqueta HTML"**
2. Google mostrará un meta tag — comprobar que el `content` coincide con alguno de los valores anteriores
3. Si GSC genera un token nuevo diferente, añadirlo también a `pt/index.html` y redesplegar
4. Hacer clic en **"Verificar"**

### Método alternativo: Google Analytics

Si la cuenta de GSC ya está vinculada al GA4 `G-4007YHH4H9` (que ya aparece en `pt/index.html`), seleccionar el método **"Google Analytics"** y verificará automáticamente sin necesidad de desplegar ningún cambio adicional.

---

## Paso 3 — Enviar el sitemap PT

Una vez verificada la propiedad:

1. En el panel de la propiedad `https://www.paraisodeaves.com/pt/`, ir a **Índice → Sitemaps** (menú izquierdo)
2. En el campo "Añadir un nuevo sitemap", introducir:
   ```
   https://www.paraisodeaves.com/sitemap_pt.xml
   ```
3. Hacer clic en **"Enviar"**
4. Esperar unos minutos y recargar — debería aparecer como "Correcto" con **91 URLs detectadas**

---

## Paso 4 — Solicitar indexación manual de URLs prioritarias

En GSC → **Inspección de URL**, pegar cada URL y hacer clic en "Solicitar indexación". Priorizar en este orden:

### Tier 1 — Money pages (indexar primero)

| URL | Prioridad sitemap |
|---|---|
| `https://www.paraisodeaves.com/pt/` | 0.95 |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-portugal/` | 0.90 |
| `https://www.paraisodeaves.com/pt/papagaio-cinzento/` | 0.90 |
| `https://www.paraisodeaves.com/pt/arara-a-venda/` | 0.90 |
| `https://www.paraisodeaves.com/pt/cacatua-a-venda/` | 0.90 |
| `https://www.paraisodeaves.com/pt/papagaio-eclectus/` | 0.90 |
| `https://www.paraisodeaves.com/pt/amazona-a-venda/` | 0.90 |
| `https://www.paraisodeaves.com/pt/ovos-fertilizados/` | 0.90 |
| `https://www.paraisodeaves.com/pt/arara-jacinto/` | 0.90 |
| `https://www.paraisodeaves.com/pt/arara-azul-e-amarela/` | 0.90 |
| `https://www.paraisodeaves.com/pt/arara-escarlate/` | 0.90 |
| `https://www.paraisodeaves.com/pt/cacatua-de-crista-amarela/` | 0.90 |
| `https://www.paraisodeaves.com/pt/cacatua-de-cabeca-nua/` | 0.90 |
| `https://www.paraisodeaves.com/pt/papagaio-amazona/` | 0.90 |

### Tier 2 — Ciudades PT (tráfico local)

| URL | Ciudad |
|---|---|
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-lisboa/` | Lisboa |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-porto/` | Porto |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-braga/` | Braga |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-coimbra/` | Coimbra |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-faro/` | Faro |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-funchal/` | Funchal (Madeira) |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-ponta-delgada/` | Ponta Delgada (Açores) |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-setubal/` | Setúbal |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-aveiro/` | Aveiro |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-leiria/` | Leiria |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-viseu/` | Viseu |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-evora/` | Évora |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-guimaraes/` | Guimarães |
| `https://www.paraisodeaves.com/pt/papagaios-a-venda-castelo-branco/` | Castelo Branco |

### Tier 3 — Hubs y blog (visibilidad de contenido)

| URL |
|---|
| `https://www.paraisodeaves.com/pt/cidades/` |
| `https://www.paraisodeaves.com/pt/blog/` |
| `https://www.paraisodeaves.com/pt/comprar-papagaio/` |
| `https://www.paraisodeaves.com/pt/comprar-arara/` |
| `https://www.paraisodeaves.com/pt/adotar-papagaio/` |
| `https://www.paraisodeaves.com/pt/comprar-papagaio-cinzento/` |
| `https://www.paraisodeaves.com/pt/preco-arara-jacinto/` |
| `https://www.paraisodeaves.com/pt/preco-cacatua/` |
| `https://www.paraisodeaves.com/pt/papagaios-criados-a-mao/` |
| `https://www.paraisodeaves.com/pt/criador-de-papagaios/` |
| `https://www.paraisodeaves.com/pt/venda-de-aves/` |

---

## Paso 5 — Configurar la vista de datos en GSC

Una vez operativa la propiedad:

1. Ir a **Rendimiento → Resultados de búsqueda**
2. Filtrar por **País: Portugal** para ver métricas PT dentro de la propiedad raíz
3. La propiedad `https://www.paraisodeaves.com/pt/` mostrará exclusivamente el tráfico del subdirectorio PT
4. Comparar mensualmente con la propiedad raíz para medir la evolución del tráfico portugués

---

## Notas importantes

- **Propiedad raíz existente**: Si `https://www.paraisodeaves.com/` ya está verificada en GSC, Google puede sugerir heredar la verificación automáticamente. Aceptarlo si aparece esa opción.
- **Tiempo hasta datos**: Los primeros clics e impresiones pueden tardar 3-7 días en aparecer tras la verificación.
- **Sitemap indexación**: Es normal que GSC tarde 24-48h en procesar el sitemap. Si aparece error "No se pudo recuperar", esperar y reintentar.
- **Cuota de indexación**: GSC permite ~10-20 solicitudes de indexación manual por día. Priorizar el Tier 1 primero.
