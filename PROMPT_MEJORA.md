# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

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

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/infrastructure/nosql/user.repository.ts` — `UserDocument.save`: Se invoca `save` sobre `UserDocument`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/interfaces/http/dto/user.response.dto.ts` — `User.map`: Se invoca `map` sobre `User`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/application/user.service.ts` — `UserRepositoryPort.findByEmail`: Se invoca `findByEmail` sobre `UserRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261109074436524), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración y Creación de la Estructura de la Base de Datos — objetivo: Configurar la base de datos y crear la estructura necesaria para almacenar la información de los usuarios. — entregable (NO resolver): Base de datos configurada y estructura de tablas/colecciones creada.
- Fase 2: Implementación de Operaciones CRUD en Base de Datos SQL — objetivo: Implementar las operaciones CRUD en la base de datos SQL para gestionar la información de los usuarios. — entregable (NO resolver): Operaciones CRUD implementadas en la base de datos SQL.
- Fase 3: Implementación de Operaciones CRUD en Base de Datos NoSQL — objetivo: Implementar las operaciones CRUD en la base de datos NoSQL para gestionar la información de los usuarios. — entregable (NO resolver): Operaciones CRUD implementadas en la base de datos NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "user-management-api",
  "version": "1.0.0",
  "description": "API para gestión de usuarios con soporte para SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/config": "^3.1.1",
    "@nestjs/typeorm": "^10.0.0",
    "typeorm": "^0.3.17",
    "pg": "^8.11.3",
    "@nestjs/mongoose": "^10.0.2",
    "mongoose": "^8.0.3",
    "@aws-sdk/client-dynamodb": "^3.470.0",
    "@aws-sdk/lib-dynamodb": "^3.470.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "rxjs": "^7.8.1",
    "@nestjs/swagger": "^7.1.16",
    "reflect-metadata": "^0.1.13"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@types/node": "^20.10.4",
    "@types/jest": "^29.5.11",
    "@types/express": "^4.17.19",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.1",
    "jest": "^29.7.0",
    "eslint": "^8.55.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.0.1",
    "prettier": "^3.1.1",
    "supertest": "^6.3.3",
    "@nestjs/testing": "^11.0.0",
    "ts-jest": "^29.1.1",
    "tsconfig-paths": "^4.2.0"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@app/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API para gestión de usuarios con soporte para SQL y NoSQL')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuración del puerto
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

// === ARCHIVO: api/src/domain/user.entity.ts ===
import { IsEmail, IsNotEmpty, IsString, IsDate, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class User {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _birthDate: Date;

  constructor(id: string, name: string, email: string, birthDate: Date) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    if (!value || !/^[^s@]+@[^s@]+.[^s@]+$/.test(value)) {
      throw new Error('Invalid email format');
    }
    this._email = value;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    if (!value || value > new Date()) {
      throw new Error('Birth date must be in the past');
    }
    this._birthDate = value;
  }

  static fromPlainObject(plain: { id: string; name: string; email: string; birthDate: Date }): User {
    return new User(plain.id, plain.name, plain.email, plain.birthDate);
  }

  toPlainObject(): { id: string; name: string; email: string; birthDate: Date } {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      birthDate: this._birthDate
    };
  }

  updateFromPartial(partial: Partial<{ name: string; email: string; birthDate: Date }>): void {
    if (partial.name !== undefined) {
      this.name = partial.name;
    }
    if (partial.email !== undefined) {
      this.email = partial.email;
    }
    if (partial.birthDate !== undefined) {
      this.birthDate = partial.birthDate;
    }
  }
}

// === ARCHIVO: api/src/domain/repositories/user.repository.port.ts ===
import { User } from '../user.entity';

export interface UserRepositoryPort {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/infrastructure/sql/user.repository.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { UserEntity } from './user.entity';

@Injectable()
export class SqlUserRepository implements UserRepositoryPort {
  private readonly logger = new Logger(SqlUserRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    this.logger.log(`Creating user with email: ${user.email}`);
    const userEntity = this.toUserEntity(user);
    const savedEntity = await this.typeOrmRepository.save(userEntity);
    return this.toUserDomain(savedEntity);
  }

  async findById(id: string): Promise<User | null> {
    this.logger.log(`Finding user by id: ${id}`);
    const userEntity = await this.typeOrmRepository.findOne({ where: { id } });
    return userEntity ? this.toUserDomain(userEntity) : null;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    const userEntities = await this.typeOrmRepository.find();
    return userEntities.map((entity) => this.toUserDomain(entity));
  }

  async update(id: string, partialUser: Partial<User>): Promise<User> {
    this.logger.log(`Updating user with id: ${id}`);
    const userEntity = await this.typeOrmRepository.findOne({ where: { id } });
    if (!userEntity) {
      throw new Error('User not found');
    }

    const updatedEntity = { ...userEntity, ...partialUser };
    const savedEntity = await this.typeOrmRepository.save(updatedEntity);
    return this.toUserDomain(savedEntity);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting user with id: ${id}`);
    await this.typeOrmRepository.delete(id);
  }

  private toUserEntity(user: User): UserEntity {
    const entity = new UserEntity(
      user.id,
      user.name,
      user.email,
      user.birthDate,
      true,
      'USER',
      null,
      null,
      null,
      null,
    );
    return entity;
  }

  private toUserDomain(userEntity: UserEntity): User {
    return User.fromPlainObject({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      birthDate: userEntity.birthDate,
    });
  }
}

// === ARCHIVO: api/src/infrastructure/nosql/user.repository.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/user.entity';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { UserDocument } from './user.schema';

@Injectable()
export class NosqlUserRepository implements UserRepositoryPort {
  private readonly logger = new Logger(NosqlUserRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    this.logger.log(`Creating user with email: ${user.email}`);
    
    const userDocument = new this.userModel({
      _id: user.id,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
    });

    const savedDocument = await userDocument.save();
    this.logger.log(`User created with ID: ${savedDocument._id}`);
    
    return this.toUserDomain(savedDocument);
  }

  async findById(id: string): Promise<User | null> {
    this.logger.log(`Finding user by ID: ${id}`);
    
    const userDocument = await this.userModel.findById(id).exec();
    
    if (!userDocument) {
      this.logger.warn(`User not found with ID: ${id}`);
      return null;
    }
    
    return this.toUserDomain(userDocument);
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    
    const userDocuments = await this.userModel.find().exec();
    this.logger.log(`Found ${userDocuments.length} users`);
    
    return userDocuments.map((doc) => this.toUserDomain(doc));
  }

  async update(id: string, partialUser: Partial<User>): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);
    
    const updateData: Record<string, unknown> = {};
    
    if (partialUser.name !== undefined) {
      updateData.name = partialUser.name;
    }
    if (partialUser.email !== undefined) {
      updateData.email = partialUser.email;
    }
    if (partialUser.birthDate !== undefined) {
      updateData.birthDate = partialUser.birthDate;
    }

    const updatedDocument = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedDocument) {
      this.logger.error(`Failed to update user with ID: ${id}`);
      throw new Error(`User with ID ${id} not found for update`);
    }
    
    this.logger.log(`User updated successfully: ${id}`);
    return this.toUserDomain(updatedDocument);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting user with ID: ${id}`);
    
    const result = await this.userModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      this.logger.warn(`User not found for deletion with ID: ${id}`);
      throw new Error(`User with ID ${id} not found for deletion`);
    }
    
    this.logger.log(`User deleted successfully: ${id}`);
  }

  private toUserDomain(userDocument: UserDocument): User {
    return User.fromPlainObject({
      id: userDocument._id.toString(),
      name: userDocument.name,
      email: userDocument.email,
      birthDate: userDocument.birthDate,
    });
  }
}

// === ARCHIVO: api/src/infrastructure/nosql/dynamodb/user.repository.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
  DynamoDBClientConfig,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand as DocScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { User } from '../../../domain/user.entity';
import { UserRepositoryPort } from '../../../domain/repositories/user.repository.port';

@Injectable()
export class DynamodbUserRepository implements UserRepositoryPort {
  private readonly logger = new Logger(DynamodbUserRepository.name);
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    const clientConfig: DynamoDBClientConfig = {
      region: this.configService.get<string>('AWS_REGION') || 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || '',
      },
    };

    const endpoint = this.configService.get<string>('DYNAMODB_ENDPOINT');
    if (endpoint) {
      clientConfig.endpoint = endpoint;
    }

    const client = new DynamoDBClient(clientConfig);
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME') || 'users';
  }

  async create(user: User): Promise<User> {
    this.logger.log(`Creating user with email: ${user.email}`);
    
    const item = {
      id: { S: user.id },
      name: { S: user.name },
      email: { S: user.email },
      birthDate: { S: user.birthDate.toISOString() },
    };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item,
        ConditionExpression: 'attribute_not_exists(id)',
      }),
    );

    this.logger.log(`User created with ID: ${user.id}`);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    this.logger.log(`Finding user by ID: ${id}`);
    
    const result = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id: { S: id } },
      }),
    );

    if (!result.Item) {
      this.logger.warn(`User not found with ID: ${id}`);
      return null;
    }

    return this.itemToUser(result.Item);
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    
    const result = await this.docClient.send(
      new DocScanCommand({
        TableName: this.tableName,
      }),
    );

    const users = (result.Items || []).map((item) => this.itemToUser(item));
    this.logger.log(`Found ${users.length} users`);
    
    return users;
  }

  async update(id: string, partialUser: Partial<User>): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);
    
    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, unknown> = {};

    if (partialUser.name !== undefined) {
      updateExpressions.push('#name = :name');
      expressionAttributeValues[':name'] = { S: partialUser.name };
    }
    if (partialUser.email !== undefined) {
      updateExpressions.push('#email = :email');
      expressionAttributeValues[':email'] = { S: partialUser.email };
    }
    if (partialUser.birthDate !== undefined) {
      updateExpressions.push('#birthDate = :birthDate');
      expressionAttributeValues[':birthDate'] = { S: partialUser.birthDate.toISOString() };
    }

    if (updateExpressions.length === 0) {
      const existingUser = await this.findById(id);
      if (!existingUser) {
        throw new Error(`User with ID ${id} not found for update`);
      }
      return existingUser;
    }

    const result = await this.docClient.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id: { S: id } },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: {
          '#name': 'name',
          '#email': 'email',
          '#birthDate': 'birthDate',
        },
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      }),
    );

    if (!result.Attributes) {
      throw new Error(`Failed to update user with ID: ${id}`);
    }

    this.logger.log(`User updated successfully: ${id}`);
    return this.itemToUser(result.Attributes);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting user with ID: ${id}`);
    
    const existingUser = await this.findById(id);
    if (!existingUser) {
      this.logger.warn(`User not found for deletion with ID: ${id}`);
      throw new Error(`User with ID ${id} not found for deletion`);
    }

    await this.docClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id: { S: id } },
      }),
    );

    this.logger.log(`User deleted successfully: ${id}`);
  }

  private itemToUser(item: Record<string, unknown>): User {
    return User.fromPlainObject({
      id: (item.id as { S: string }).S,
      name: (item.name as { S: string }).S,
      email: (item.email as { S: string }).S,
      birthDate: new Date((item.birthDate as { S: string }).S),
    });
  }
}

// === ARCHIVO: api/src/infrastructure/sql/user.entity.ts ===
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail, IsDate, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '../../domain/user.entity';

export { User } from '../../domain/user.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El email no puede exceder 255 caracteres' })
  email: string;

  @Column({ type: 'date' })
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  birthDate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El rol no puede exceder 50 caracteres' })
  role: string | null;

  @Column({ type: 'text', nullable: true })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  address: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  phone: string | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'created_by' })
  @IsString({ message: 'El creador debe ser una cadena de texto' })
  createdBy: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'updated_by' })
  @IsString({ message: 'El actualizador debe ser una cadena de texto' })
  updatedBy: string | null;

  @BeforeInsert()
  setDefaultValues(): void {
    if (!this.isActive) {
      this.isActive = true;
    }
    if (!this.role) {
      this.role = 'USER';
    }
  }

  @BeforeUpdate()
  validateBeforeUpdate(): void {
    if (!this.role) {
      this.role = 'USER';
    }
  }

  constructor(
    id: string,
    name: string,
    email: string,
    birthDate: Date,
    isActive: boolean = true,
    role: string | null = 'USER',
    address: string | null = null,
    phone: string | null = null,
    createdBy: string | null = null,
    updatedBy: string | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
    this.isActive = isActive;
    this.role = role;
    this.address = address;
    this.phone = phone;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  static fromPartial(partial: Partial<UserEntity>): UserEntity {
    const entity = new UserEntity(
      partial.id || '',
      partial.name || '',
      partial.email || '',
      partial.birthDate || new Date(),
      partial.isActive,
      partial.role,
      partial.address,
      partial.phone,
      partial.createdBy,
      partial.updatedBy,
    );
    return entity;
  }

  isValidForCreation(): boolean {
    if (!this.id || !this.name || !this.email || !this.birthDate) {
      return false;
    }
    if (this.name.length < 2 || this.name.length > 255) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return false;
    }
    const today = new Date();
    if (this.birthDate > today) {
      return false;
    }
    return true;
  }

  isValidForUpdate(): boolean {
    if (this.name !== undefined && (this.name.length < 2 || this.name.length > 255)) {
      return false;
    }
    if (this.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        return false;
      }
    }
    if (this.birthDate !== undefined) {
      const today = new Date();
      if (this.birthDate > today) {
        return false;
      }
    }
    return true;
  }
}

// === ARCHIVO: api/src/infrastructure/nosql/user.schema.ts ===
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../domain/user.entity';

export type UserDocument = UserModel & Document;

@Schema({ timestamps: true, collection: 'users' })
export class UserModel {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: Date })
  birthDate: Date;

  constructor(name: string, email: string, birthDate: Date) {
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
  }
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

UserSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export class UserSchemaMapper {
  static toDomain(doc: UserDocument): User {
    if (!doc) return null;
    return User.fromPlainObject({
      id: doc._id?.toString() || doc.id,
      name: doc.name,
      email: doc.email,
      birthDate: doc.birthDate,
    });
  }

  static toSchemaData(user: User): Partial<UserModel> {
    return {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
    };
  }
}

// === ARCHIVO: api/src/infrastructure/config/database.config.ts ===
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../sql/user.entity';

export interface DatabaseConfig {
  sql: TypeOrmModuleOptions;
  mongoose: MongooseModuleAsyncOptions;
  dynamodb: {
    region: string;
    endpoint: string;
    tableName: string;
  };
}

export function getSqlConfig(configService: ConfigService): TypeOrmModuleOptions {
  const host = configService.get<string>('DATABASE_HOST', 'localhost');
  const port = configService.get<number>('DATABASE_PORT', 5432);
  const username = configService.get<string>('DATABASE_USERNAME', 'postgres');
  const password = configService.get<string>('DATABASE_PASSWORD', 'postgres');
  const database = configService.get<string>('DATABASE_NAME', 'user_management');
  const ssl = configService.get<boolean>('DATABASE_SSL', false);

  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [UserEntity],
    synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE', true),
    logging: configService.get<boolean>('DATABASE_LOGGING', false),
    ssl: ssl ? { rejectUnauthorized: false } : false,
    extra: {
      pool: {
        min: 2,
        max: 10,
      },
    },
  };
}

export function getMongooseConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      const host = configService.get<string>('MONGODB_HOST', 'localhost');
      const port = configService.get<number>('MONGODB_PORT', 27017);
      const database = configService.get<string>('MONGODB_DATABASE', 'user_management');
      const username = configService.get<string>('MONGODB_USERNAME');
      const password = configService.get<string>('MONGODB_PASSWORD');

      const uri = username && password
        ? `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
        : `mongodb://${host}:${port}/${database}`;

      return {
        uri,
        dbName: database,
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('MongoDB connected successfully');
          });
          connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
          });
          return connection;
        },
      };
    },
    inject: [ConfigService],
  };
}

export function getDynamodbConfig(configService: ConfigService) {
  return {
    region: configService.get<string>('AWS_REGION', 'us-east-1'),
    endpoint: configService.get<string>('DYNAMODB_ENDPOINT', 'http://localhost:8000'),
    tableName: configService.get<string>('DYNAMODB_TABLE_NAME', 'users'),
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
  };
}

export class DatabaseConfigFactory {
  static createSqlOptions(configService: ConfigService): TypeOrmModuleOptions {
    return getSqlConfig(configService);
  }

  static createMongooseOptions(): MongooseModuleAsyncOptions {
    return getMongooseConfig();
  }

  static createDynamodbOptions(configService: ConfigService) {
    return getDynamodbConfig(configService);
  }
}

// === ARCHIVO: api/src/interfaces/http/user.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from '../../application/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user.response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario creado exitosamente',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    if (!createUserDto.name || createUserDto.name.trim().length === 0) {
      throw new BadRequestException('El nombre del usuario es requerido');
    }
    if (!createUserDto.email || createUserDto.email.trim().length === 0) {
      throw new BadRequestException('El email del usuario es requerido');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(createUserDto.email)) {
      throw new BadRequestException('El formato del email es inválido');
    }
    const user = await this.userService.create(createUserDto);
    return this.toResponseDto(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del usuario',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
  })
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return this.toResponseDto(user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de usuarios',
    type: [UserResponseDto],
  })
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => this.toResponseDto(user));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiParam({
    name: 'id',
    description: 'UUID del usuario a actualizar',
    type: String,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario actualizado exitosamente',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.userService.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    if (updateUserDto.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateUserDto.email)) {
        throw new BadRequestException('El formato del email es inválido');
      }
    }
    const updatedUser = await this.userService.update(id, updateUserDto);
    return this.toResponseDto(updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del usuario a eliminar',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Usuario eliminado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
  })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const existingUser = await this.userService.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    await this.userService.delete(id);
  }

  private toResponseDto(user: any): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate instanceof Date 
        ? user.birthDate.toISOString().split('T')[0] 
        : user.birthDate,
      createdAt: user.createdAt instanceof Date 
        ? user.createdAt.toISOString() 
        : user.createdAt,
      updatedAt: user.updatedAt instanceof Date 
        ? user.updatedAt.toISOString() 
        : user.updatedAt,
    };
  }
}

// === ARCHIVO: api/src/interfaces/http/dto/create-user.dto.ts ===
import { IsString, IsEmail, IsNotEmpty, IsDateString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez García',
    minLength: 1,
    maxLength: 100,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 carácter' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Dirección de correo electrónico del usuario',
    example: 'juan.perez@pragma.com.co',
    format: 'email',
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @MaxLength(255, { message: 'El email no puede exceder 255 caracteres' })
  email: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento del usuario en formato ISO 8601',
    example: '1995-06-15',
    type: String,
    format: 'date',
  })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida en formato ISO 8601' })
  birthDate: string;
}

// === ARCHIVO: api/src/interfaces/http/dto/update-user.dto.ts ===
import { PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, IsDateString, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez García',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(1, { message: 'El nombre debe tener al menos 1 carácter' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Dirección de correo electrónico del usuario',
    example: 'juan.perez@pragma.com.co',
    format: 'email',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @MaxLength(255, { message: 'El email no puede exceder 255 caracteres' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento del usuario en formato ISO 8601',
    example: '1995-06-15',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida en formato ISO 8601' })
  birthDate?: string;
}

// === ARCHIVO: api/src/interfaces/http/dto/user.response.dto.ts ===
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/user.entity';

export class UserResponseDto {
  @ApiProperty({ description: 'Unique identifier of the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  readonly id: string;

  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  readonly name: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
  readonly email: string;

  @ApiProperty({ description: 'Birth date of the user', example: '1990-01-15' })
  readonly birthDate: Date;

  constructor(id: string, name: string, email: string, birthDate: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
  }

  static fromDomain(user: User): UserResponseDto {
    return new UserResponseDto(
      user.id,
      user.name,
      user.email,
      user.birthDate,
    );
  }

  static fromDomainList(users: User[]): UserResponseDto[] {
    return users.map(user => UserResponseDto.fromDomain(user));
  }
}

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './interfaces/http/user.controller';
import { UserService } from './application/user.service';
import { UserRepositoryPort } from './domain/repositories/user.repository.port';
import { SqlUserRepository } from './infrastructure/sql/user.repository';
import { UserEntity } from './infrastructure/sql/user.entity';
import * as configuration from './infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration.createSqlOptions],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'userdb'),
        entities: [UserEntity],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
        logging: configService.get<boolean>('DB_LOGGING', false),
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI', 'mongodb://localhost:27017/userdb'),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepositoryPort,
      useClass: SqlUserRepository,
    },
  ],
  exports: [UserService, UserRepositoryPort],
})
export class AppModule {}

// === ARCHIVO: api/src/application/user.service.ts ===
import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../domain/repositories/user.repository.port';
import { User } from '../domain/user.entity';
import { UserResponseDto } from '../interfaces/http/dto/user.response.dto';
import { CreateUserDto } from '../interfaces/http/dto/create-user.dto';
import { UpdateUserDto } from '../interfaces/http/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new User(
      this.generateUuid(),
      createUserDto.name,
      createUserDto.email,
      new Date(createUserDto.birthDate),
    );

    const createdUser = await this.userRepository.create(user);
    return UserResponseDto.fromDomain(createdUser);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserResponseDto.fromDomain(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return UserResponseDto.fromDomainList(users);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.userRepository.findByEmail(updateUserDto.email);
      if (emailExists) {
        throw new ConflictException('Email already in use by another user');
      }
    }

    const partialUser: Partial<User> = {};
    if (updateUserDto.name !== undefined) partialUser.name = updateUserDto.name;
    if (updateUserDto.email !== undefined) partialUser.email = updateUserDto.email;
    if (updateUserDto.birthDate !== undefined) partialUser.birthDate = new Date(updateUserDto.birthDate);

    const updatedUser = await this.userRepository.update(id, partialUser);
    return UserResponseDto.fromDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
  }

  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "user-management-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "axios": "^1.6.2",
    "react-router-dom": "^6.21.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.7.0",
    "vite": "^5.0.10",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.6",
    "vitest": "^1.1.0"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  esbuild: {
    loader: 'tsx',
    include: /\.(ts|tsx)$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.accept();
}

// === ARCHIVO: client/src/App.tsx ===
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Tipos definidos según el contrato de la API
interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  birthDate: string;
}

interface CreateUserDto {
  name: string;
  email: string;
  birthDate: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
  birthDate?: string;
}

const App = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserResponseDto[]>('/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (userData: CreateUserDto) => {
    try {
      const response = await axios.post<UserResponseDto>('/api/users', userData);
      setUsers([...users, response.data]);
    } catch (err) {
      setError('Error al crear el usuario');
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async (id: string, userData: UpdateUserDto) => {
    try {
      const response = await axios.put<UserResponseDto>(`/api/users/${id}`, userData);
      setUsers(users.map(user => (user.id === id ? response.data : user)));
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error('Error deleting user:', err);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <h1>Gestión de Usuarios</h1>
      <Routes>
        <Route
          path="/"
          element=
            <Navigate to="/users" replace />
        />
        <Route
          path="/users"
          element=
            <div>
              <h2>Lista de Usuarios</h2>
              {/* Este componente se implementará en otro lote */}
              {/* <UserList
                users={users}
                onDeleteUser={handleDeleteUser}
              /> */}
              <div className="user-list">
                {users.map(user => (
                  <div key={user.id} className="user-card">
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Fecha de Nacimiento: {user.birthDate}</p>
                    <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
              <h2>Crear Usuario</h2>
              {/* Este componente se implementará en otro lote */}
              {/* <UserForm onSubmit={handleCreateUser} /> */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleCreateUser({
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    birthDate: formData.get('birthDate') as string,
                  });
                }}
              >
                <div>
                  <label htmlFor="name">Nombre:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="birthDate">Fecha de Nacimiento:</label>
                  <input type="date" id="birthDate" name="birthDate" required />
                </div>
                <button type="submit">Crear Usuario</button>
              </form>
            </div>
        />
      </Routes>
    </div>
  );
};

export default App;

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de usuarios - Pragma Fintech" />
    <meta name="author" content="Pragma Development Team" />
    <meta name="theme-color" content="#2563eb" />
    <title>Gestión de Usuarios | Pragma</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f8fafc;
        color: #1e293b;
        line-height: 1.6;
      }
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #0f172a;
          color: #e2e8f0;
        }
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/users/UserList.tsx ===
import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserResponseDto {
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  rol: string;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UserListProps {
  onEdit?: (user: UserResponseDto) => void;
  onDelete?: (id: string) => void;
  refreshTrigger?: number;
}

const API_BASE_URL = 'http://localhost:3000';

export function UserList({ onEdit, onDelete, refreshTrigger = 0 }: UserListProps) {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<keyof UserResponseDto>('nombre');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<UserResponseDto[]>(`${API_BASE_URL}/users`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUsers(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data?.message || 'Error al obtener usuarios'}`);
        } else if (err.request) {
          setError('No se pudo conectar con el servidor. Verifica que el servidor esté ejecutándose.');
        } else {
          setError('Error al configurar la solicitud');
        }
      } else {
        setError('Error desconocido al obtener usuarios');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: keyof UserResponseDto): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`, {
        timeout: 10000,
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Error al eliminar usuario: ${err.response?.data?.message || err.message}`);
      } else {
        setError('Error desconocido al eliminar usuario');
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField] ?? '';
    const bValue = b[sortField] ?? '';
    const comparison = String(aValue).localeCompare(String(bValue));
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Lista de Usuarios</h2>
        <button onClick={fetchUsers} style={styles.refreshButton}>
          Actualizar
        </button>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {error && (
        <div style={styles.errorAlert}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={styles.closeButton}>
            ×
          </button>
        </div>
      )}

      {sortedUsers.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No se encontraron usuarios</p>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th
                style={styles.th}
                onClick={() => handleSort('nombre')}
                style={{ cursor: 'pointer' }}
              >
                Nombre {sortField === 'nombre' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                style={styles.th}
                onClick={() => handleSort('email')}
                style={{ cursor: 'pointer' }}
              >
                Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                style={styles.th}
                onClick={() => handleSort('fechaNacimiento')}
                style={{ cursor: 'pointer' }}
              >
                Fecha de Nacimiento {sortField === 'fechaNacimiento' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                style={styles.th}
                onClick={() => handleSort('rol')}
                style={{ cursor: 'pointer' }}
              >
                Rol {sortField === 'rol' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.nombre}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{formatDate(user.fechaNacimiento)}</td>
                <td style={styles.td}>
                  <span style={styles.badge}>{user.rol}</span>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: user.activo ? '#dcfce7' : '#fee2e2',
                      color: user.activo ? '#166534' : '#991b1b',
                    }}
                  >
                    {user.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(user)}
                        style={styles.editButton}
                      >
                        Editar
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={styles.deleteButton}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={styles.footer}>
        <p>Total de usuarios: {sortedUsers.length}</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1e293b',
  },
  refreshButton: {
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 15px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    outline: 'none',
  },
  errorAlert: {
    padding: '12px 16px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '6px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#991b1b',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#64748b',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    backgroundColor: '#f8fafc',
    fontWeight: '600',
    color: '#475569',
    borderBottom: '2px solid #e2e8f0',
  },
  tr: {
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '12px 16px',
    color: '#1e293b',
  },
  badge: {
    padding: '4px 8px',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'right',
    color: '#64748b',
    fontSize: '14px',
  },
};

export default UserList;

// === ARCHIVO: client/src/features/users/UserForm.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

export interface CreateUserDto {
  nombre: string;
  email: string;
  fechaNacimiento: string;
  rol?: string;
  activo?: boolean;
}

export interface UpdateUserDto {
  nombre?: string;
  email?: string;
  fechaNacimiento?: string;
  rol?: string;
  activo?: boolean;
}

interface UserResponseDto {
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  rol: string;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UserFormProps {
  userToEdit?: UserResponseDto | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const API_BASE_URL = 'http://localhost:3000';

type FormMode = 'create' | 'edit';

export function UserForm({ userToEdit, onSuccess, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<CreateUserDto>({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    rol: 'usuario',
    activo: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [mode, setMode] = useState<FormMode>('create');

  useEffect(() => {
    if (userToEdit) {
      setMode('edit');
      setFormData({
        nombre: userToEdit.nombre,
        email: userToEdit.email,
        fechaNacimiento: userToEdit.fechaNacimiento.split('T')[0],
        rol: userToEdit.rol,
        activo: userToEdit.activo,
      });
    } else {
      setMode('create');
      setFormData({
        nombre: '',
        email: '',
        fechaNacimiento: '',
        rol: 'usuario',
        activo: true,
      });
    }
  }, [userToEdit]);

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (formData.nombre.trim().length > 100) {
      errors.nombre = 'El nombre no puede exceder 100 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Ingresa un email válido';
      }
    }

    if (!formData.fechaNacimiento) {
      errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.fechaNacimiento);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 120);
      
      if (birthDate > today) {
        errors.fechaNacimiento = 'La fecha de nacimiento no puede ser futura';
      } else if (birthDate < minDate) {
        errors.fechaNacimiento = 'La fecha de nacimiento no puede ser tan antigua';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'create') {
        await axios.post(`${API_BASE_URL}/users`, formData, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else if (userToEdit) {
        await axios.put(`${API_BASE_URL}/users/${userToEdit.id}`, formData, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      setFormData({
        nombre: '',
        email: '',
        fechaNacimiento: '',
        rol: 'usuario',
        activo: true,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          if (status === 409) {
            setError('Ya existe un usuario con este email');
          } else if (status === 400) {
            setError(err.response.data?.message || 'Datos inválidos');
          } else if (status === 500) {
            setError('Error del servidor. Intenta más tarde.');
          } else {
            setError(`Error ${status}: ${err.response.data?.message || 'Error desconocido'}`);
          }
        } else if (err.request) {
          setError('No se pudo conectar con el servidor');
        } else {
          setError('Error al configurar la solicitud');
        }
      } else {
        setError('Error desconocido al guardar el usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (): void => {
    setFormData({
      nombre: '',
      email: '',
      fechaNacimiento: '',
      rol: 'usuario',
      activo: true,
    });
    setValidationErrors({});
    setError(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {mode === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
        </h2>

        {error && (
          <div style={styles.errorAlert}>
            <span>{error}</span>
            <button onClick={() => setError(null)} style={styles.closeButton}>
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="nombre" style={styles.label}>
              Nombre completo <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: validationErrors.nombre ? '#ef4444' : '#e2e8f0',
              }}
              placeholder="Ingresa el nombre completo"
              disabled={loading}
              maxLength={100}
            />
            {validationErrors.nombre && (
              <span style={styles.errorText}>{validationErrors.nombre}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Correo electrónico <span style={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: validationErrors.email ? '#ef4444' : '#e2e8f0',
              }}
              placeholder="correo@ejemplo.com"
              disabled={loading}
            />
            {validationErrors.email && (
              <span style={styles.errorText}>{validationErrors.email}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="fechaNacimiento" style={styles.label}>
              Fecha de nacimiento <span style={styles.required}>*</span>
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: validationErrors.fechaNacimiento ? '#ef4444' : '#e2e8f0',
              }}
              disabled={loading}
            />
            {validationErrors.fechaNacimiento && (
              <span style={styles.errorText}>{validationErrors.fechaNacimiento}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="rol" style={styles.label}>
              Rol del usuario
            </label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              style={styles.select}
              disabled={loading}
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
              <option value="analista">Analista</option>
              <option value="editor">Editor</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                disabled={loading}
                style={styles.checkbox}
              />
              <span>Usuario activo</span>
            </label>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading
                ? 'Guardando...'
                : mode === 'create'
                ? 'Crear Usuario'
                : 'Actualizar Usuario'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={styles.resetButton}
              disabled={loading}
            >
              Limpiar
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                style={styles.cancelButton}
                disabled={loading}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '24px',
    textAlign: 'center',
  },
  errorAlert: {
    padding: '12px 16px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#991b1b',
    lineHeight: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  required: {
    color: '#ef4444',
  },
  input: {
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    color: '#1e293b',
    backgroundColor: 'white',
  },
  select: {
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: 'white',
    color: '#1e293b',
    cursor: 'pointer',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#374151',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  errorText: {
    fontSize: '12px',
    color: '#ef4444',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  submitButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  resetButton: {
    padding: '12px 24px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default UserForm;

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
