# reservation

> Service to create reservations at a given time and party size for a particular restaurant.

## Related Projects

  - https://github.com/gastrodamus/popular
  - https://github.com/gastrodamus/header

## Table of Contents

1. [Usage](#Usage)
2. [API](#API)
3. [Requirements](#requirements)
4. [Development](#development)

## Usage

> Some usage instructions

## API

### Listings
| HTTP Method   | Endpoint                     | Description                                             |
|:--------------|:-----------------------------|:--------------------------------------------------------|
| POST          | /api/reservation/            | Create a new restaurant listing                         |
| GET           | /api/:id/reservation         | Return details about a specific listing                 |
| PUT           | /api/:id/reservation         | Update and replace details for a specific listing       |
| PATCH         | /api/:id/reservation         | Update and modify details for a specific listing        |
| DELETE        | /api/:id/reservation         | Delete a specific listing                               |

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
npm run database
npm run seed
npm start
```

