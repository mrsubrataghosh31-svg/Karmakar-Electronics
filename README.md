# Karmakar Electric Website

A responsive, single-page storefront website for **Karmakar Electric, Asansol**. Built with plain HTML, CSS and JavaScript — no framework or build step required.

## Project structure

```text
karmakar-electric-website/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── fan.png
    ├── bulb.png
    ├── mixer.png
    ├── tablefan.png
    └── tv.png
```

## Features

- Responsive navigation with mobile menu
- Smooth scrolling and active navigation highlighting
- Product categories and clickable category filters
- Product search
- Product quick-view modal
- Add-to-enquiry list
- WhatsApp enquiry link for selected products
- Product PNG illustrations included locally
- Responsive layout for mobile, tablet and desktop

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser.
3. For the best local development experience, open the folder in VS Code and use the **Live Server** extension.

No npm install or build command is needed.

## Important: configure WhatsApp

Open `script.js` and find:

```js
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
```

Replace it with the store's WhatsApp number, including country code and without `+`, spaces or hyphens.

Example format: `919876543210`

The WhatsApp enquiry buttons will show a reminder until a valid number is configured.

## Update store details

- Store name and address: edit the Contact section in `index.html`.
- Product names and descriptions: edit the `products` object in `script.js`.
- Product cards and categories: edit the Products section in `index.html`.
- Colours, spacing and responsive layout: edit `styles.css`.
- Replace product pictures by putting new PNG files in `assets/` and updating their image paths in `index.html` and `script.js`.

The included product PNGs are illustrative graphics, not specific branded product photographs. Confirm real product brands, models, stock and prices with the store before publishing claims about them.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new **public repository**, for example `karmakar-electric`.
2. Upload all project files and the complete `assets` folder. Keep the file/folder names unchanged.
3. Make sure `index.html` is in the repository's root folder.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch **main** and folder **/(root)**, then click **Save**.
7. Wait for GitHub Pages to publish. Your website address will look like:

   `https://YOUR-USERNAME.github.io/karmakar-electric/`

8. Test the website on mobile and desktop.

## Separate GitHub file contents

Each source file is provided separately in this project:
- `index.html` — page structure and content
- `styles.css` — design and responsive styling
- `script.js` — filters, search, modal, enquiry list and WhatsApp actions
- `README.md` — setup and GitHub Pages publishing guide
