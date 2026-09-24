# Álbum de Apexora

Álbum de pegatinas para GitHub Pages. Cada página es una nación, cada jugador entra con su contraseña y los sobres se abren revelando las pegatinas una por una.

## Archivos

- `index.html`: toda la aplicación (álbum, apertura de sobres y panel de administración).
- `data.json`: naciones, pegatinas, jugadores y sobres otorgados.
- `stickers/`: aquí van tus imágenes (PNG o WebP, idealmente en proporción vertical 5:7).

## Publicar en GitHub Pages

1. Crea un repositorio y sube estos archivos (incluida la carpeta `stickers/`).
2. En **Settings, Pages**, elige la rama `main` y la carpeta `/ (root)`.
3. Tu álbum queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Cuentas de ejemplo (cámbialas antes de publicar)

| Quién | Contraseña |
|---|---|
| Administrador (`#admin`) | `admin123` |
| Demo | `demo123` |
| Aria | `aria456` |

## Flujo de trabajo del administrador

1. Abre `https://…/index.html#admin` y entra con la contraseña de administrador.
2. **Naciones**: crea o reordena las páginas del álbum.
3. **Pegatinas**: sube tus imágenes a `stickers/` en GitHub y regístralas aquí (hay una opción para añadir muchas de una vez).
4. **Jugadores y sobres**: crea jugadores y dales sobres.
5. **Publicar**: descarga `data.json`, súbelo al repositorio reemplazando el anterior y espera un par de minutos. Los jugadores solo tienen que recargar.

Sin imágenes, cada pegatina muestra el emoji de su nación como marcador de posición.

## Cómo funciona por dentro

- El contenido de cada sobre se calcula a partir del jugador y del número de sobre, así que no se puede “repetir tirada” cerrando la página.
- Los sobres abiertos se guardan en el navegador del jugador. Con el botón 💾 puede copiar un código de respaldo y restaurarlo en otro dispositivo.
- Las contraseñas se guardan cifradas (PBKDF2) en `data.json`.

## Límites de un sitio estático

GitHub Pages no tiene servidor, así que `data.json` es público. Las contraseñas cifradas frenan a un curioso, pero no a alguien decidido a adivinarlas: usa contraseñas largas y generadas por el panel. Para un juego entre amigos es suficiente. Si necesitas sobres en tiempo real o seguridad real, hace falta un backend (por ejemplo Firebase o Supabase).
