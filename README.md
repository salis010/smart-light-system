# Home automation dashboard

This project is a dashboard that can be used to smart lighting

## Installation

The projects dependencies can be install using npm

```bash
npm i
```

## Usage

A development server can be run using `npm start`. The dashboard will then be
available at http://localhost:9000/

A production build can be generated using `npm run build`.

The project can also be run in a Docker container.
Build the image with:

```bash
docker build -t smart-lighting-dashboard .
```

Run the image with:

```bash
docker run -p 8000:8000 smart-lighting-dashboard
```

The running image can now be accessed at http://localhost:8000

## Linting

Code can be manually linted with `eslint` using the command `npm run lint`.
Files are also prettified using `husky` and `prettier` as a pre-commit hook.

