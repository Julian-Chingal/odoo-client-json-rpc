
# OdooClient JSON-RPC

**OdooClient JSON-RPC** es una librería para Node.js diseñada para facilitar la conexión e interacción con la API de Odoo mediante JSON-RPC.

## Características

- **Conexión sencilla**: Configuración inicial con los parámetros esenciales.
- **Métodos predefinidos**: Acceso simplificado a operaciones comunes.
- **Modular y escalable**: Fácil integración en proyectos existentes.

---

## Instalación

Para instalar la librería, ejecuta:

```bash
npm install odoo-client-json-rpc
```

---

## Uso

### Configuración inicial

Crea una instancia del cliente proporcionando los parámetros necesarios:

```javascript
import { OdooClient } from 'odoo-client-json-rpc';

const client = new OdooClient({
  url: 'https://example.odoo.com', // URL del servidor Odoo
  db: 'example-db',               // Nombre de la base de datos
  username: 'user@example.com',   // Usuario de Odoo
  password: 'examplepassword'     // Contraseña del usuario
});
```

### Métodos de modelo

La instancia del cliente te permite interactuar con los modelos de Odoo. Todos los métodos aceptan un objeto de opciones como parámetro. Este objeto puede estar vacío, pero siempre debe ser proporcionado.

#### Estructura de `options`

| Campo          | Tipo       | Descripción                                                          |
|----------------|------------|----------------------------------------------------------------------|
| `id`           | `number`   | Identificador único (opcional).                                      |
| `ids`          | `number`   | Arreglo de dentificadores únicos (opcional).                         |
| `offset`       | `number`   | Iniciar desde el registro (opcional).                                |
| `limit`        | `number`   | Límite de resultados (opcional).                                     |
| `fields`       | `string[]` | Array de campos a incluir en la respuesta (opcional).                |
| `order`        | `string`   | Orden de los resultados (e.g., `'asc'` o `'desc'`, opcional).        |
| `personalized` | `array`    | Array personalizado con `[elemento_tabla, comparador, elemento]`.    |

#### Ejemplos de uso

```javascript
// Consultar movimientos contables
client.AccountModel.move({ limit: 10, order: 'asc' })
  .then(data => console.log('Movimientos contables:', data))
  .catch(error => console.error('Error:', error));

// Consultar líneas de movimientos contables con campos específicos
client.AccountModel.moveLine({ fields: ['name', 'date'], limit: 5 })
  .then(data => console.log('Líneas de movimientos:', data))
  .catch(error => console.error('Error:', error));

// Acceder a información de cuentas contables con filtros personalizados
client.AccountModel.account({ personalized: ['account_id', '=', 1], offset: 1000 })
  .then(data => console.log('Cuentas contables:', data))
  .catch(error => console.error('Error:', error));
```

---

## API de referencia

### Configuración de `OdooClient`

| Parámetro  | Tipo     | Descripción                             |
|------------|----------|-----------------------------------------|
| `url`      | `string` | URL del servidor Odoo.                 |
| `db`       | `string` | Nombre de la base de datos.            |
| `username` | `string` | Nombre de usuario (correo electrónico).|
| `password` | `string` | Contraseña del usuario.                |

### Métodos principales

| Modelo              | Métodos                                                             | Descripción                              |
|---------------------|---------------------------------------------------------------------|------------------------------------------|
| `AccountModel`      | `move()`, `moveLine()`, `account()`, `payments()`                   | Métodos para gestionar contabilidad: movimientos líneas y cuentas. |
| `StockModel`        | `move()`, `moveLine()`, `valuations()`, `locations()`, `warehouse()`| Consulta las líneas de movimientos de inventario. |
| `ProductModel`      | `product()`, `template()`, `variantTemplate()`                      | Consulta información relacionada con productos. |
| `ResModel`          | `partner()`, `partnerCategory()`                                    | Consulta información de recursos.       |
| `SaleModel`         | `order()`, `orderLine()`                                            | Consulta información de ventas.         |


---

## Ejemplo avanzado

Un ejemplo más avanzado para realizar múltiples consultas:

```javascript
async function fetchAccountData() {
  try {
    const moves = await client.AccountModel.move({ limit: 5 });
    console.log('Movimientos:', moves);

    const moveLineIds = newMoves.flatMap((m) => m.invoice_line_ids);
    console.log('Id lineas de movimientos: ', moveLineIds);

    const moveLines = await client.AccountModel.moveLine({ ids: moveLineIds, fields: ['name', 'amount'] });
    console.log('Líneas de movimientos:', moveLines);

    const accounts = await client.AccountModel.account({ personalized: ['account_type', '=', 'receivable'] });
    console.log('Cuentas:', accounts);
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

fetchAccountData();
```

---

## Contribuciones

Las contribuciones son bienvenidas. Si tienes ideas para mejorar esta librería, si encuentras errores o deseas proponer nuevas funcionalidades, no dudes en abrir un [issue](https://github.com/tuusuario/odoo-client-json-rpc/issues) o enviar un pull request.

---

## Licencia

Este proyecto está licenciado bajo los términos de la [MIT License](LICENSE).
