# url-shortener
A simple and efficient URL shortener service built with **Node.js**, **Express**, and **MongoDB**. This API provides a URL shortening service that allows users to shorten long URLs, generate QR codes, and set custom aliases and expiration dates for shortened URLs.

---

## Project Structure

```
project-root/
│── backend/
│   │── models/
│   │   ├── Url.js
│   │── routes/
│   │   ├── urlRoutes.js
│   │── controllers/
│   │   ├── urlController.js
│   │── services/
│   │   ├── urlService.js
│   │── app.js
│   │── server.js
│── frontend/
│   │── src/
│   │   ├── components/
│   │   ├── pages/
│   │       ├── Home.jsx
│   │       ├── Home.css
│   │   ├── services/
│   │       ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│── package.json
│── README.md
```

---

## Features
- Shorten long URLs.
- Generate QR codes for shortened URLs.
- Set custom aliases for shortened URLs.
- Set expiration dates for shortened URLs.
- Redirect to the original URL using the short ID or custom alias.

---

## API Endpoints

### 1. Shorten URL

**Endpoint:** `POST /api/shorten`
**Description:** Shortens a given URL with optional alias and expiration.

#### Request Body (JSON):

```json
{
  "longUrl": "https://example.com",
  "customAlias": "myalias",  // Optional
  "expiration": "1d"         // Optional (1h, 1d, 1w)
}
```

#### Response:

```json
{
  "shortUrl": "http://localhost:5000/api/my-custom-alias",
  "qrCode": "data:image/png;base64,..."
}
```

### 2. Redirect to Original URL

**Endpoint:** `GET /api/:shortId`
**Description:** Redirects to the original URL corresponding to the short ID or custom alias.

#### Example:

**Request:** `GET /api/my-custom-alias`

**Response:** Redirects to `https://example.com`.

### 3. Get URL Details

**Endpoint:** `GET /api/url/:shortId`
**Description:** Retrieves details of a shortened URL.

#### Response:

```json
{
  "longUrl": "https://example.com",
  "shortUrl": "http://localhost:5000/myalias",
  "expiration": "2024-12-31T23:59:59Z"
}
```

### 4. Delete a Shortened URL

**Endpoint:** `DELETE /api/url/:shortId`
**Description:** Deletes a shortened URL.

#### Response:

```json
{
  "message": "URL deleted successfully"
}
```

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/AymenElouaer/url-shortener.git
cd url-shortener/backend
```

### Install Dependencies

```bash
npm install
```

### Set up MongoDB

- Install MongoDB locally or use MongoDB Atlas.
- Update the connection string in `.env` (see below).

### Create a `.env` File

```
MONGODB_URI=mongodb://localhost:27017/urlshortener
PORT=5000
```

### Run the Server

```bash
npm run dev
```

## Environment Variables

| Variable      | Description                  | Example                                      |
|--------------|------------------------------|----------------------------------------------|
| MONGODB_URI  | MongoDB connection string    | mongodb://localhost:27017/urlshortener       |
| PORT         | Port for the backend server  | 5000                                         |

## Testing

### To Run the Tests
this project uses Jest for testing

1. Install the required testing dependencies:
```bash
npm install --save-dev jest supertest
```
2. Run the tests:
```bash
npm test
```

### Test Cases

- **Shorten a URL:** Sends a long URL and receives a short URL and QR code.
- **Redirect to Original URL:** Accesses a short URL and redirects to the original URL.
- **Custom Alias:** Uses a custom alias for the short URL.
- **Expiration Date:** Sets an expiration date for the short URL.

## Deployment

### Local Deployment

1. Start MongoDB locally.
2. Run the server:

```bash
npm start
```



  
