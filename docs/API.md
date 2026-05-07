# ShopSphere API (v1)

Base URL: `/api/v1`

## Conventions
- All responses are JSON.
- Success response: `{ "success": true, "data": <payload>, "meta": <optional> }`
- Error response: `{ "success": false, "error": { "code": "...", "message": "...", "details": <optional> } }`
- Protected endpoints require: `Authorization: Bearer <accessToken>`

## Auth
### POST `/auth/register`
Body:
```json
{ "email": "user@example.com", "password": "min8chars", "fullName": "User Name" }
```
Returns: `{ user, accessToken }`

### POST `/auth/login`
Body:
```json
{ "email": "user@example.com", "password": "..." }
```
Returns: `{ user, accessToken }`

### POST `/auth/logout`
Stateless JWT logout (client discards token).

### GET `/auth/me`
Protected. Returns `{ user }`.

## Products
### GET `/products?page=1&limit=24`
Returns list of active products.

### GET `/products/:id`
Returns product by id.

## Cart (protected)
### GET `/cart`
Returns `{ items, totals }`.

### PUT `/cart/items`
Body:
```json
{ "productId": "<uuid>", "quantity": 2 }
```
Returns `{ items }`.

### DELETE `/cart/items/:productId`
Returns `{ items }`.

## Orders (protected)
### GET `/orders`
Returns orders for current user.

### POST `/orders`
Creates an order from current cart (marks as `paid` for this starter).
Body:
```json
{
  "shippingAddress": {
    "line1": "123 Main St",
    "line2": "",
    "city": "City",
    "state": "State",
    "postalCode": "12345",
    "country": "Country"
  }
}
```
Returns created order.

### GET `/orders/:id`
Returns `{ order, items }`.

## Users (protected)
### GET `/users/me`
Returns user profile.

