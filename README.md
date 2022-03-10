F_Truck Website designed for food truck owner and food truck admin to well manage the reservation and slots for the food truck in Kuala Lumpur area.

## Development Environment

_If you need to connfig MongoDB for PHP, [instructions here](https://www.php.net/manual/es/mongodb.setup.php)._

## Set Up

#### Create your environment file:

```bash
cp .env.example .env
```

_The app key is used to salt passwords. If you need to work with production data you'll want to use the same app key as defined in the .env file in production so password hashes match._

#### Update these settings in the .env file:

-   MONGO_DB_CONNECTION=mongodb
-   MONGO_DB_HOST=127.0.0.1
-   MONGO_DB_PORT=27017
-   MONGO_DB_DATABASE=F_Truck_Final
-   MONGO_DB_USERNAME=
-   MONGO_DB_PASSWORD=

#### Install PHP dependencies:

```bash
composer update
```

```bash
composer install
```

_If you don't have Composer installed, [instructions here](https://getcomposer.org/)._

#### Generate an app key:

```bash
php artisan key:generate
```

#### Generate JWT keys for the .env file:

```bash
php artisan jwt:secret
```

#### Run the database migrations:

```bash
php artisan migrate
```

#### Install Javascript dependencies:

```bash
npm install
```

_If you don't have Node and NPM installed, [instructions here](https://www.npmjs.com/get-npm)._

#### Run an initial build:

```bash
npm run watch
```

```bash
php artisan serve
```

## Other Notes

**Laravel Docs:**

[https://laravel.com/docs/](https://laravel.com/docs/)
