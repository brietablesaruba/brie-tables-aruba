# Brie Tables Aruba - Admin Dashboard Enhancement

This project enhances the existing Brie Tables Aruba website with a professional, accessible admin dashboard for managing deli platters, contact information, and business settings.

## Storefront (single page)

The customer-facing site is a single-page storefront at the project root:

- `index.html` - page markup (hero, menu, how it works, Brie Club, FAQ, footer, order drawer, account modal)
- `styles.css` - design system, layout, animations, and responsive rules
- `store.js` - configuration, four-language copy, products, cart, quick order, and Brie Club accounts

### Storefront features

- **Quick order drawer** - pick boards, adjust quantities, add delivery details, and place the order with one button.
- **Orders land on the shop phone** - the site publishes each order to a free ntfy.sh relay; the Brie Tables Admin app listens around the clock, rings a loud notification, and keeps the full order details. WhatsApp is kept only as a hidden safety fallback when the relay is unreachable.
- **Brie Club accounts** (stored on the device) - 10% member pricing, saved delivery details, and one-tap reorder from order history.
- **Four languages** - English, Spanish, Papiamento, and Dutch, remembered per visitor.
- **Fast and resilient** - local optimized photos, no frameworks, reduced-motion support.

### Storefront configuration

Customer-facing settings live at the top of `store.js` in the `CONFIG` block:

```js
whatsapp: "2975679921",        // WhatsApp number, digits only
email: "Manu99jz@gmail.com",   // Email fallback
memberDiscount: 0.10,          // Brie Club discount
ordersRelay: "https://ntfy.sh",// free relay that carries orders to the shop phone
ordersTopic: "brie-tables-orders-9f3k7q2mx5"
```

`ordersRelay` and `ordersTopic` must match the constants in the admin app's
`OrderService.java`; that is the private channel the two sides agree on.

Switching ordering to the new WhatsApp Business number is a one-line change: update
`whatsapp` (digits only, with country code) and redeploy.

### How the storefront uses the admin data

`store.js` reads `brieTablesAdminSettingsV1` from localStorage and understands both shapes:

- Admin v2: `{ items, settings, contactInfo }`
- Legacy: `{ products, logoUrl, addToCartText }`

Boards marked unavailable in the admin show as "Sold out". Placeholder contact values
from the admin defaults are ignored, so the storefront keeps showing the real number and
email until they are replaced in the admin.

### Admin app (Android APK) & publishing

The `brie-admin-apk` folder (next to this one) builds **Brie Tables Admin**, an
installable Android app (`BrieTablesAdmin-1.0.apk`) that manages the same data from a
phone:

- **Orders** - customer orders arrive with a loud notification, a badge count, and full
  details (items, totals, delivery info); mark them done, call, reply on WhatsApp, or
  delete. A foreground service keeps listening around the clock and restarts on boot.
- edit platters - name, badge, serves, price, description, accent colour, availability,
  plus photo replacement (photos are compressed to WebP on the device)
- edit business info (WhatsApp number, email, hours, socials, add-to-cart text, logo URL)
- **Publish** writes `admin-data.json` and `photos/*.webp` into this folder straight to
  GitHub with a fine-grained token (kept only on the phone, never in the app package)

On every visit the storefront now also fetches `admin-data.json`; when the file exists
it wins over localStorage, and when it is missing the site behaves exactly as before.
If a published photo fails to load, the site falls back to `platter-photos/*.jpg`.

### Hosting & going live

- The live site is served free by **GitHub Pages** from the
  `brietablesaruba/brie-tables-aruba` repository (branch `main`, root folder).
- Public address: **https://www.brietablesaruba.com** (the apex `brietablesaruba.com`
  redirects to `www`).
- DNS lives in the Netlify account (Netlify DNS): four `A` records on the apex point to
  GitHub Pages (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) and `www` is a
  `CNAME` to `brietablesaruba.github.io`.
- The old Netlify site (`dancing-concha-61df66.netlify.app`) stays deployed as a
  rollback option - restore its DNS records to point the domain back to Netlify.
- Costs stay at zero: GitHub Pages hosting is free, orders travel over the free
  ntfy.sh relay, and the admin app talks straight to the GitHub API.

### Brie Club limitations

Accounts are stored in the browser (localStorage) with hashed passwords. They are
per-device and are not synced between devices. Real cross-device accounts would need a
backend (for example Supabase/Firebase or a small API); the current structure is ready to
swap when that is available.

## Features

### Admin Access
- Secure login system replacing the old 25-tap hidden mechanism
- Simple username/password authentication (configurable)
- Session management with automatic timeout
- Logout functionality

### Dashboard Overview
- Clean, professional interface matching the website's aesthetic
- Navigation sidebar for easy access to different sections
- Responsive design for mobile, tablet, and desktop
- Key statistics overview (total platters, available platters, average price)

### Platter Management
- Visual grid/list view of all deli platters
- Add new platters with name, description, price, image, availability
- Edit existing platter details
- Delete platters with confirmation
- Search and filter functionality
- Platter status tracking (available/unavailable)

### Contact Information Management
- Form-based interface for editing business contact details
- Fields for address, phone, email, business hours
- Social media links (WhatsApp, Facebook, Instagram)
- Live preview of how contact info will appear
- Reset to default values option

### Technical Implementation
- Built with pure HTML5/CSS3/JavaScript (no external frameworks)
- Uses localStorage for data persistence (enhanced structure)
- Client-side image validation and handling
- Backward compatible with existing website functionality
- Secure authentication with session timeout

## File Structure

```
admin/
├── index.html              # Main admin dashboard
├── login.html              # Admin login page
├── items.html              # Platter management page
├── contact.html            # Contact management page
├── css/
│   ├── style.css           # Main admin styling
│   ├── login.css           # Login page styling
│   ├── items.css           # Platter management styling
│   └── contact.css         # Contact management styling
├── js/
│   ├── auth.js             # Authentication logic
│   ├── dashboard.js        # Dashboard navigation
│   ├── storage.js          # Enhanced localStorage wrapper
│   ├── migrator.js         # Migration utility
│   ├── items.js            # Platter management logic
│   ├── contact.js          # Contact management logic
│   └── components/         # Reusable UI components
└── assets/                 # Admin-specific assets
```

## Setup & Installation

1. Copy the entire `admin` folder to your website directory
2. Ensure the following files are in your website root:
   - `admin/login.html`
   - `admin/index.html` 
   - `admin/items.html`
   - `admin/contact.html`
   - All CSS and JS files in their respective directories
3. The admin dashboard will be accessible via the new "Admin" button in the topbar
4. Default login credentials:
   - Username: `admin`
   - Password: `BrieTables2026!`
   - **IMPORTANT**: Change these credentials before deploying to production

## Configuration

### Changing Admin Credentials
To change the admin username and password:

1. Edit `admin/js/auth.js`
2. Modify the `ADMIN_USERNAME` and `ADMIN_PASSWORD` constants
3. Use strong, unique credentials for production

### Data Storage
All admin data is stored in `localStorage` under the key `brieTablesAdminSettingsV1`.
The structure includes:
- `items`: Array of platter objects
- `contactInfo`: Business contact information
- `settings`: Shop settings (name, logo, button text, etc.)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Requires localStorage support

## Customization

### Styling
The admin dashboard uses CSS variables that match the website's design system:
- Primary colors: --ink, --espresso, --gold
- Background gradients and shadows match the main site
- Typography uses Inter and Georgia fonts

### Extending Functionality
To add new features:
1. Create new HTML pages in the admin folder
2. Add navigation items in the sidebar (admin-sidebar.html or JS)
3. Implement logic in corresponding JS files
4. Update storage.js if new data structures are needed

## Security Notes

⚠️ **Important**: The current implementation uses simple username/password authentication.
For production use, consider:
- Changing the default credentials immediately
- Implementing environment-based configuration
- Adding HTTPS enforcement
- Considering more robust authentication methods for higher security needs

## Backup & Recovery

Data is automatically backed up to localStorage with timestamped keys.
To restore data:
1. Check localStorage for keys starting with `brieTablesAdminBackup_`
2. The most recent backup contains the latest data
3. Data can be restored by copying it back to `brieTablesAdminSettingsV1`

## Dependencies
- No external libraries or frameworks required
- Pure HTML/CSS/JS implementation
- Works with any static web hosting (Netlify, Vercel, GitHub Pages, etc.)

## Changelog
### Version 1.0.0
- Initial admin dashboard enhancement
- Replaced 25-tap activation with secure login
- Added platter management with CRUD operations
- Added contact information management
- Enhanced localStorage structure with validation
- Added session-based authentication
- Responsive design for all device sizes