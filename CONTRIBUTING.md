# Guía de contribución — Tuali Driver Backend

## Flujo de trabajo

### Ramas
| Rama | Propósito |
|------|-----------|
| `main` | Producción. Solo se toca vía PR desde `development` |
| `development` | Rama principal de desarrollo. Base para todas las features |
| `feat/<nombre>` | Nuevas funcionalidades |
| `fix/<nombre>` | Corrección de bugs |
| `refactor/<nombre>` | Refactorización de código |

### Pasos para agregar una feature

1. **Actualiza tu rama local**
   ```bash
   git checkout development
   git pull origin development
   ```

2. **Crea tu rama de feature**
   ```bash
   git checkout -b feat/nombre-de-la-feature
   ```

3. **Desarrolla y haz commits**
   ```bash
   git add .
   git commit -m "feat: descripción breve del cambio"
   ```

4. **Sube tu rama y abre un PR hacia `development`**
   ```bash
   git push origin feat/nombre-de-la-feature
   ```
   Luego en GitHub: _New Pull Request_ → base: `development`

5. **El PR necesita al menos 1 aprobación antes de hacer merge**

---

## Convención de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo | Cuándo usarlo |
|---------|--------------|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `refactor:` | Cambio de código sin nueva funcionalidad ni fix |
| `test:` | Agregar o modificar tests |
| `docs:` | Cambios en documentación |
| `chore:` | Cambios de configuración, dependencias |

**Ejemplo:**
```
feat: agregar endpoint de registro de conductor
fix: corregir validación de token JWT
```

---

## Setup local

```bash
# 1. Clonar el repo
git clone git@github.com:mich0rtega/Tuali_Driver.git
cd Tuali_Driver

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores locales

# 4. Correr en modo desarrollo
npm run dev
```

## Comandos útiles

```bash
npm run dev      # Servidor con hot-reload
npm test         # Correr tests
npm run lint     # Revisar estilo de código
npm run lint:fix # Autofix de estilo
```

---

## Estructura del proyecto

```
src/
├── config/        # Variables de configuración
├── controllers/   # Lógica de cada endpoint
├── middlewares/   # Middlewares (auth, validación, errores)
├── models/        # Modelos de datos
├── routes/        # Definición de rutas
├── services/      # Lógica de negocio
└── utils/         # Helpers y utilidades
tests/             # Tests de integración y unitarios
```
