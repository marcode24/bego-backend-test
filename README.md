# Order Managment API

Antes de andentrarme en el código, realice un análisis de la estructura de los `Dominios` y `Casos de uso` que se pueden identificar en el problema planteado.

Tenemos los siguientes `Dominios`:

- **Order**: Representa una orden de compra.
- **User**: Representa un usuario.
- **Truck**: Representa un camión.
- **Location**: Representa una ubicación.

Si seguimos un enfoque relacional, podemos identificar las siguientes relaciones:

- **Order** tiene un **User**.
- **Order** tiene un **Truck**.
- **Order** tiene una **Location**.

- **Truck** tiene un **User**.

## Requisitos previos

- [![Node](https://img.shields.io/badge/Node-gray?style=popout&logo=node.js)](https://nodejs.org/en/) >= 18.0.0
- [![MongoDB](https://img.shields.io/badge/MongoDB-green?style=popout&logo=mongodb)](https://www.mongodb.com/) >= 4.0.0

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/marcode24/bego-backend-test/
```

### Entrar al directorio

```bash
cd bego-backend-test
```

### Instalar las dependencias

```bash
npm install
```

#### _OPCIONAL_ Levantar un contenedor de MongoDB

En caso de tener docker instalado, se puede ejecutar el siguiente comando para levantar el contenedor de MongoDB:

```bash
docker-compose up -d
```

En la raíz del proyecto se encuentra un archivo `docker-compose.yml` que contiene la configuración del contenedor de MongoDB.

### Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto y agregar las siguientes variables:

```js
PORT            # Puerto en el que se ejecutará la aplicación
MONGO_URI       # URI de conexión a la base de datos
JWT_SECRET      # Clave secreta para firmar los tokens JWT
JWT_EXPIRES_IN  # Tiempo de expiración de los tokens JWT
JWT_ISSUER      # Emisor de los tokens JWT
API_BASE_URL    # URL base de la API de Google Maps
API_KEY         # Clave de la API de Google Maps
```

Ejemplo de un archivo `.env`:

```js
PORT=5000
MONGO_URI=mongodb://root:root@localhost:27017

JWT_SECRET="YOUR_SECRET_HERE"
JWT_EXPIRES_IN='12h'
JWT_ISSUER='http://localhost:5000'

API_BASE_URL="https://maps.googleapis.com/maps/api/place/details/json"
API_KEY="YOUR_API_KEY_HERE"
```

### Ejecutar la aplicación

```bash
npm run start:dev
```

## Endpoints

### Autenticación

#### Registro de usuario

`POST /api/v1/auth/users`

Registrar un nuevo usuario en la aplicación.

- Request Body

```json
{
  "name": "Marco",
  "email": "marco1@gmail.com",
  "password": "123456"
}
```

- Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User created",
  "data": "marco1@gmail.com"
}
```

#### Inicio de sesión

`POST /api/v1/auth/login`

Iniciar sesión en la aplicación y retornar un token JWT.

- Request Body

```json
{
  "email": "marco1@gmail.com",
  "password": "123456"
}
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in",
  "data": "JWT_TOKEN"
}
```

### Trucks

`POST /api/v1/trucks`

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

Crear un nuevo camión.

- Request Body

```json
{
  "userId": "6761e18c06fd6447ad3ba5bd",
  "year": "2002",
  "color": "black",
  "plates": "A12Sma"
}
```

- Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Truck created",
  "data": {
    "userId": "6761e18c06fd6447ad3ba5bd",
    "year": "2002",
    "color": "black",
    "plates": "A12Sma",
    "createdAt": "2024-12-20T02:02:32.345Z",
    "updatedAt": "2024-12-20T02:02:32.345Z",
    "id": "6764d03866a7ed2e8f641cd7"
  }
}
```

`GET /api/v1/trucks/:id`

Obtener un camión por su ID.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Truck found",
  "data": {
    "userId": "6761e586172562c5d41017b1",
    "year": "2002",
    "color": "black",
    "plates": "123432",
    "createdAt": "2024-12-18T21:17:25.087Z",
    "updatedAt": "2024-12-19T08:23:05.276Z",
    "id": "67633be5efd6d80216866815"
  }
}
```

`GET /api/v1/trucks?page=1&limit=10`

- Query Parameters

```json
{
  "page": 1,
  "limit": 10
}
```

Obtener todos los camiones.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Locations found",
  "data": [
    {
      "placeId": "ChIJGQkBCFIAzoURlLaQUWnuYZc",
      "address": "Calz. de Tlalpan 3465, Sta. Úrsula Coapa, Coyoacán, 04650 Ciudad de México, CDMX, Mexico",
      "latitude": 19.3028607,
      "longitude": -99.1505277,
      "createdAt": "2024-12-19T10:52:54.531Z",
      "updatedAt": "2024-12-19T20:28:02.619Z",
      "id": "6763fb063ab59247f296ffc0"
    }
  ],
  "totalItems": 1,
  "totalPages": 1,
  "pageSize": 12,
  "pageNumber": 1
}
```

`PUT /api/v1/trucks/:id`

Actualizar un camión por su ID.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Request Body

```json
{
  "year": "2003",
  "color": "red",
  "plates": "A12Sma"
}
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Truck updated",
  "data": {
    "userId": "6761e586172562c5d41017b1",
    "year": "2002",
    "color": "black",
    "plates": "123432",
    "createdAt": "2024-12-18T21:17:25.087Z",
    "updatedAt": "2024-12-20T02:19:42.367Z",
    "id": "67633be5efd6d80216866815"
  }
}
```

`DELETE /api/v1/trucks/:id`

Eliminar un camión por su ID.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Truck with plate 123432 deleted"
}
```

### Locations

`POST /api/v1/locations`

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

Crear una nueva ubicación.

- Request Body

```json
{
  "placeId": "GhIJQWDl0CIeQUARxks3icF8U8A"
}
```

- Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Location created",
  "data": {
    "placeId": "GhIJQWDl0CIeQUARxks3icF8U8A",
    "address": "63P2+57 Wilmington, NC, USA",
    "latitude": 34.2354375,
    "longitude": -77.94931249999999,
    "createdAt": "2024-12-20T02:39:27.787Z",
    "updatedAt": "2024-12-20T02:39:27.787Z",
    "id": "6764d8df66a7ed2e8f641ce4"
  }
}
```

`GET /api/v1/locations/:id`

Obtener una ubicación por su ID.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Location found",
  "data": {
    "placeId": "GhIJQWDl0CIeQUARxks3icF8U8A",
    "address": "63P2+57 Wilmington, NC, USA",
    "latitude": 34.2354375,
    "longitude": -77.94931249999999,
    "createdAt": "2024-12-20T02:39:27.787Z",
    "updatedAt": "2024-12-20T02:39:27.787Z",
    "id": "6764d8df66a7ed2e8f641ce4"
  }
}
```

`GET /api/v1/locations?page=1&limit=10`

- Query Parameters

```json
{
  "page": 1,
  "limit": 10
}
```

Obtener todas las ubicaciones.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Locations found",
  "data": [
    {
      "placeId": "ChIJGQkBCFIAzoURlLaQUWnuYZc",
      "address": "Calz. de Tlalpan 3465, Sta. Úrsula Coapa, Coyoacán, 04650 Ciudad de México, CDMX, Mexico",
      "latitude": 19.3028607,
      "longitude": -99.1505277,
      "createdAt": "2024-12-19T10:52:54.531Z",
      "updatedAt": "2024-12-19T20:28:02.619Z",
      "id": "6763fb063ab59247f296ffc0"
    }
  ],
  "totalItems": 1,
  "totalPages": 1,
  "pageSize": 12,
  "pageNumber": 1
}
```

`PUT /api/v1/locations/:id`

Actualizar una ubicación por su ID.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Request Body

```json
{
  "placeId": "ChIJsUDXn2od0oURpAnsjV2k44A"
}
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Location updated",
  "data": {
    "placeId": "ChIJsUDXn2od0oURpAnsjV2k44A",
    "address": "Perif. Blvd. Manuel Ávila Camacho 3130, Valle Dorado, 54020 Tlalnepantla, Méx., Mexico",
    "latitude": 19.5475331,
    "longitude": -99.2110099,
    "createdAt": "2024-12-19T10:52:54.531Z",
    "updatedAt": "2024-12-20T02:50:50.611Z",
    "id": "6763fb063ab59247f296ffc0"
  }
}
```

`DELETE /api/v1/locations/:id`

Eliminar una ubicación por su ID.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Location with id 6763fb063ab59247f296ffc0 deleted"
}
```

### Orders

`POST /api/v1/orders`

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

Crear una nueva orden.

- Request Body

```json
{
  "userId": "6761e18c06fd6447ad3ba5bd",
  "truckId": "67633be5efd6d80216866815",
  "pickup": "6763fb063ab59247f296ffc0",
  "dropoff": "6763fb063ab59247f296ffc0"
}
```

- Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Order created",
  "data": {
    "status": "CREATED",
    "pickup": {
      "_id": "6763fb063ab59247f296ffc0",
      "address": "Calz. de Tlalpan 3465, Sta. Úrsula Coapa, Coyoacán, 04650 Ciudad de México, CDMX, Mexico",
      "latitude": 19.3028607,
      "longitude": -99.1505277
    },
    "dropoff": {
      "_id": "6763fb063ab59247f296ffc0",
      "address": "Calz. de Tlalpan 3465, Sta. Úrsula Coapa, Coyoacán, 04650 Ciudad de México, CDMX, Mexico",
      "latitude": 19.3028607,
      "longitude": -99.1505277
    },
    "createdAt": "2024-12-19T22:10:14.201Z",
    "updatedAt": "2024-12-19T22:10:14.201Z",
    "id": "676499c668e30bb323d36269",
    "user": {
      "_id": "6761e18c06fd6447ad3ba5bd",
      "name": "nfasdfg",
      "email": "marco2@gmail.com"
    },
    "truck": {
      "_id": "67633be5efd6d80216866815",
      "year": "2002",
      "color": "black",
      "plates": "123432"
    }
  }
}
```

`GET /api/v1/orders/:id`

Obtener una orden por su ID.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Order found",
  "data": {
    "status": "CREATED",
    "pickup": {
      "_id": "6763fb063ab59247f296ffc0",
      "address": "Calz. de Tlalpan 3465, Sta. Úrsula Coapa, Coyoacán, 04650 Ciudad de México, CDMX, Mexico",
      "latitude": 19.3028607,
      "longitude": -99.1505277
    },
    "dropoff": {
      "_id": "6763fb063ab59247f296ffc0",
      "address": "Calz. de Tlalpan 3465, Sta. Úrsula Coapa, Coyoacán, 04650 Ciudad de México, CDMX, Mexico",
      "latitude": 19.3028607,
      "longitude": -99.1505277
    },
    "createdAt": "2024-12-19T22:09:06.560Z",
    "updatedAt": "2024-12-19T22:09:06.560Z",
    "id": "676499820c0b88496928a1f3",
    "user": {
      "_id": "6761e18c06fd6447ad3ba5bd",
      "name": "nfasdfg",
      "email": "marco2@gmail.com"
    },
    "truck": {
      "_id": "67633be5efd6d80216866815",
      "year": "2002",
      "color": "black",
      "plates": "123432"
    }
  }
}
```

`GET /api/v1/orders?page=1&limit=10`

- Query Parameters

```json
{
  "page": 1,
  "limit": 10
}
```

Obtener todas las órdenes.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Orders found",
  "data": [
    {
      "status": "CREATED",
      "pickup": {
        "_id": "6764d8df66a7ed2e8f641ce4",
        "address": "63P2+57 Wilmington, NC, USA",
        "latitude": 34.2354375,
        "longitude": -77.94931249999999
      },
      "dropoff": {
        "_id": "6764d8df66a7ed2e8f641ce4",
        "address": "63P2+57 Wilmington, NC, USA",
        "latitude": 34.2354375,
        "longitude": -77.94931249999999
      },
      "createdAt": "2024-12-20T03:06:03.416Z",
      "updatedAt": "2024-12-20T03:06:03.416Z",
      "id": "6764df1b66a7ed2e8f641d02",
      "user": {
        "_id": "6761e18c06fd6447ad3ba5bd",
        "name": "nfasdfg",
        "email": "marco2@gmail.com"
      },
      "truck": {
        "_id": "67633be8efd6d80216866819",
        "year": "2002",
        "color": "blue",
        "plates": "123433"
      }
    }
  ],
  "totalItems": 1,
  "totalPages": 1,
  "pageSize": 10,
  "pageNumber": 1
}
```

`PATCH /api/v1/orders/:id`

Actualizar el estado de una orden por su ID.

Como este endpoint requiere un token JWT, se debe incluir el token en el encabezado de la solicitud.

```json
Authorization JWT_TOKEN
```

- Request Body

```json
{
  "status": "IN_TRANSIT"
}
```

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Order status changed to IN_TRANSIT",
  "data": {
    "status": "IN_TRANSIT",
    "pickup": "6764d8df66a7ed2e8f641ce4",
    "dropoff": "6764d8df66a7ed2e8f641ce4",
    "createdAt": "2024-12-20T03:06:03.416Z",
    "updatedAt": "2024-12-20T03:07:32.856Z",
    "id": "6764df1b66a7ed2e8f641d02",
    "user": "6761e18c06fd6447ad3ba5bd",
    "truck": "67633be8efd6d80216866819"
  }
}
```

`DELETE /api/v1/orders/:id`
