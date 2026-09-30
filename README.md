# Álbum de Apexora

Álbum de pegatinas coleccionables en forma de PWA, publicado en GitHub Pages. Cada nación es una página doble del álbum. Cada jugador entra con su contraseña, abre sobres y las pegatinas se revelan una a una.

## Archivos

- `index.html`: toda la aplicación (álbum, apertura de sobres y panel de administración).
- `data.json`: semilla inicial. Solo se usa si el documento `config/album` de Firestore no existe.
- `manifest.json` e `icons/`: instalación como app (PWA). Iconos `icon-192.png` e `icon-512.png`.
- `sw.js`: service worker. Imágenes y sonidos salen primero de la caché; HTML y JSON se piden primero a la red.
- `stickers/`: imágenes de las pegatinas (WebP, máximo 900 px, idealmente proporción 5:7 vertical o 7:5 horizontal).
- `sounds/`: efectos de sonido.

## Cómo se guardan los datos

La fuente de verdad es **Firestore**:

- `config/album`: naciones, pegatinas, jugadores, rarezas, sobres otorgados y subcolecciones (`groups`).
- `players/{id}`: progreso de cada jugador (sobres abiertos, sobres extra, racha diaria, último ingreso, logros ganados) y su bandeja de envíos.

Todo se guarda por **id** de pegatina (por ejemplo `nacion-001`), nunca por posición ni ruta de imagen. Firestore limita cada documento a 1 MB.

## Publicar y actualizar

1. Sube las imágenes nuevas a `stickers/` **antes** de registrarlas en el panel.
2. Abre `https://apexora.github.io/AlbumApexora/#admin` y entra con la contraseña de administrador.
3. Haz los cambios en el panel. Se guardan solos ("✔ Guardado") y los jugadores los ven en tiempo real, sin recargar.
4. Solo hay que volver a subir archivos al repositorio cuando cambie el código (`index.html`, `sw.js`, etc.). Si reemplazas una imagen conservando el nombre, sube también la versión de `CACHE` en `sw.js`.

## Panel de administración

- **Jugadores y sobres**: crear jugadores, contraseñas y sobres otorgados.
- **Pegatinas**: registrar imágenes, elegir rareza y nación, y reordenar arrastrando el asa de la izquierda (solo dentro de la misma nación).
- **Naciones**: crear y ordenar las páginas del álbum. La nación `dioses`, si existe, siempre va al final.
- **Subcolecciones**: agrupar pegatinas contiguas de una nación con nombre y color. Al completarla, el jugador recibe un logro y 1 sobre.
- **Ajustes**: título, pegatinas por sobre, pesos de rareza y cambio de contraseña de administrador.
- **Publicar**: descarga de `data.json` como copia de seguridad.

## Reglas de juego

- El contenido de cada sobre se calcula a partir del jugador y del número de sobre, así que no se puede repetir la tirada cerrando la página.
- **Racha diaria**: entrar cada día da sobres (1 el primer día, hasta 7 en el séptimo; luego vuelve a empezar).
- **Repetidas**: se pueden enviar a otros jugadores o canjear (20 repetidas = 1 sobre).
- **Subcolecciones**: las casillas del grupo se unen con un marco de luz que se enciende al completarlo, y hay chips de progreso bajo el encabezado de la página.

## Cuidados

- **No borres pegatinas ni naciones que ya salieron**: desaparecerían de la colección de los jugadores y un id liberado podría reutilizarse.
- Agregar pegatinas es seguro (van al final de su nación). Si mueves una, cambian los números de las que quedan en medio, porque salen de la posición.
- **No borres y recrees una subcolección**: el id cambia y quien ya la completó ganaría otro logro y otro sobre. Para corregirla, edita nombre y color.
- Cualquier cambio visual debe pensarse primero para móvil: evita filtros, mezclas y animaciones continuas para no traer tirones ni parpadeo.

## Seguridad

Las contraseñas se guardan con hash (PBKDF2). Es suficiente para un juego entre amigos; usa contraseñas largas y generadas por el panel.

## Copia de seguridad del jugador

El botón 💾 genera un código con los sobres abiertos del jugador, que se puede restaurar en otro dispositivo.