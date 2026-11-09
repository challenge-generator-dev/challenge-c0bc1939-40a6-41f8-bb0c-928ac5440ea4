# Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL

El equipo de desarrollo de la empresa de fintech Pragma necesita implementar operaciones básicas de CRUD en bases de datos SQL y NoSQL para gestionar la información de los usuarios. El dominio de negocio incluye a los usuarios (con nombre, email, fecha de nacimiento), los administradores del sistema y la base de datos que almacena estos datos. La aplicación debe permitir crear, obtener, actualizar y eliminar registros de usuarios, asegurando la integridad de los datos y manejando adecuadamente los errores y casos borde del dominio.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración y Creación de la Estructura de la Base de Datos

**Objetivo:** Configurar la base de datos y crear la estructura necesaria para almacenar la información de los usuarios.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura la base de datos SQL y NoSQL según las especificaciones del dominio.
- Crea las tablas/colecciones necesarias para almacenar los datos de los usuarios.
- Asegúrate de que la estructura de la base de datos permita realizar operaciones CRUD de manera eficiente y segura.

**Entregable:** Base de datos configurada y estructura de tablas/colecciones creada.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las restricciones y relaciones entre los datos al diseñar la estructura de la base de datos.
- Utiliza el IntelliJ IDEA Debugger para verificar la correcta configuración y creación de la estructura de la base de datos.

</details>

### Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL

**Objetivo:** Implementar las operaciones CRUD en la base de datos SQL para gestionar la información de los usuarios.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones CREATE, READ, UPDATE y DELETE en la base de datos SQL.
- Asegúrate de manejar adecuadamente los errores y casos borde del dominio.
- Verifica que las operaciones CRUD funcionen correctamente y mantengan la integridad de los datos.

**Entregable:** Operaciones CRUD implementadas en la base de datos SQL.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las restricciones y relaciones entre los datos al implementar las operaciones CRUD.
- Utiliza el IntelliJ IDEA Debugger para verificar el correcto funcionamiento de las operaciones CRUD.

</details>

### Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL

**Objetivo:** Implementar las operaciones CRUD en la base de datos NoSQL para gestionar la información de los usuarios.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones CREATE, READ, UPDATE y DELETE en la base de datos NoSQL.
- Asegúrate de manejar adecuadamente los errores y casos borde del dominio.
- Verifica que las operaciones CRUD funcionen correctamente y mantengan la integridad de los datos.

**Entregable:** Operaciones CRUD implementadas en la base de datos NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las restricciones y relaciones entre los datos al implementar las operaciones CRUD.
- Utiliza el IntelliJ IDEA Debugger para verificar el correcto funcionamiento de las operaciones CRUD.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en el manejo de bases de datos?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en el contexto de la gestión de información de usuarios en una base de datos?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD en bases de datos SQL y NoSQL?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en bases de datos y cómo se pueden evitar?

## Criterios de Evaluacion

- Configuración y creación de la estructura de la base de datos.
- Implementación de operaciones CRUD en la base de datos SQL.
- Implementación de operaciones CRUD en la base de datos NoSQL.
- Manejo adecuado de errores y casos borde del dominio.
- Verificación del correcto funcionamiento y mantenimiento de la integridad de los datos en las operaciones CRUD.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /users`
  - `GET /users/:id`
  - `GET /users`
  - `PUT /users/:id`
  - `DELETE /users/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
