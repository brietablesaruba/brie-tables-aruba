/* ==========================================================================
   Brie Tables Aruba — storefront
   Vanilla JS. No dependencies. Data lives in localStorage on this device.
   --------------------------------------------------------------------------
   SWITCHING TO WHATSAPP BUSINESS
   Update WHATSAPP_NUMBER / CONTACT_EMAIL below (and the fallback links in
   index.html) when the new business account is live.
   ========================================================================== */
(function () {
  "use strict";

  const CONFIG = {
    whatsapp: "2975679921",              // digits only, country code first
    email: "Manu99jz@gmail.com",
    memberDiscount: 0.10,                // Brie Club discount
    storage: {
      admin: "brieTablesAdminSettingsV1",
      customers: "brieTablesCustomersV1",
      session: "brieTablesSessionV1",
      cart: "brieTablesCartV1",
      language: "brieTablesLangV1"
    }
  };

  const DEFAULT_LOGO = "brie-tables-logo-web.webp";
  const DEFAULT_MARK = "brie-tables-logo-mark.webp";
  const MEMBER_RATE = CONFIG.memberDiscount;

  const defaultProducts = [
    { id: "1", price: 35, accent: "#d99a22", image: "platter-photos/classic-deli-board.jpg" },
    { id: "2", price: 45, accent: "#f8d574", image: "platter-photos/artisan-cheese-platter.jpg" },
    { id: "3", price: 40, accent: "#6e7c23", image: "platter-photos/mediterranean-mix.jpg" },
    { id: "4", price: 50, accent: "#c8562b", image: "platter-photos/sweet-savory-feast.jpg" },
    { id: "5", price: 30, accent: "#839033", image: "platter-photos/vegan-delight.jpg" },
    { id: "6", price: 60, accent: "#ad3728", image: "platter-photos/grand-gourmet.jpg" }
  ];

  const productCopy = {
    en: {
      "1": { name: "Classic Deli Board", tag: "House favorite", serves: "Serves 2–3", description: "Cured meats, cheeses, olives, crackers, and a clean savory balance for easy sharing." },
      "2": { name: "Artisan Cheese Platter", tag: "Cheese first", serves: "Serves 3–4", description: "A creamy, nutty, elegant cheese selection with fruit notes and crunchy pairings." },
      "3": { name: "Mediterranean Mix", tag: "Bright bites", serves: "Serves 3–4", description: "Olives, dips, herbs, cheeses, and fresh island-ready flavors with a sunny finish." },
      "4": { name: "Sweet & Savory Feast", tag: "Party mode", serves: "Serves 4–5", description: "The best of both moods: salty, creamy, crisp, sweet, and built for grazing." },
      "5": { name: "Vegan Delight", tag: "Plant based", serves: "Serves 2–3", description: "A fresh spread of plant-forward bites, vegetables, dips, nuts, and bright textures." },
      "6": { name: "The Grand Gourmet", tag: "Showstopper", serves: "Serves 5–6", description: "A fuller centerpiece board with premium cheeses, charcuterie, crackers, nuts, and extras." }
    },
    es: {
      "1": { name: "Tabla Deli Clásica", tag: "Favorita de la casa", serves: "Sirve 2–3", description: "Carnes curadas, quesos, aceitunas, galletas y un balance salado perfecto para compartir." },
      "2": { name: "Tabla de Quesos Artesanales", tag: "Queso primero", serves: "Sirve 3–4", description: "Selección elegante de quesos cremosos y nueces con frutas y acompañantes crujientes." },
      "3": { name: "Mezcla Mediterránea", tag: "Bocados frescos", serves: "Sirve 3–4", description: "Aceitunas, dips, hierbas, quesos y sabores frescos listos para la isla." },
      "4": { name: "Dulce y Salado", tag: "Modo fiesta", serves: "Sirve 4–5", description: "Lo mejor de ambos mundos: salado, cremoso, crujiente, dulce y perfecto para picar." },
      "5": { name: "Delicia Vegana", tag: "A base de plantas", serves: "Sirve 2–3", description: "Una selección fresca con vegetales, dips, nueces y texturas brillantes." },
      "6": { name: "Gran Gourmet", tag: "La estrella", serves: "Sirve 5–6", description: "Una tabla central con quesos premium, charcutería, galletas, nueces y extras." }
    },
    pap: {
      "1": { name: "Tabla Deli Klasiko", tag: "Favorito di kas", serves: "Sirbi 2–3", description: "Karni cura, keshi, aceituna, crackers y un balans sabroso pa comparti." },
      "2": { name: "Platter di Keshi Artesanal", tag: "Keshi promé", serves: "Sirbi 3–4", description: "Un selekshon elegante di keshi kremoso, fruta, noten y kosnan krakiente." },
      "3": { name: "Mix Mediterraneo", tag: "Bites fresku", serves: "Sirbi 3–4", description: "Aceituna, dips, yerba, keshi y sabores fresku ku ta cla pa e isla." },
      "4": { name: "Dushi y Sabroso", tag: "Modo fiesta", serves: "Sirbi 4–5", description: "E mihó di tur dos: salu, kremoso, krakiente, dushi y cla pa snack." },
      "5": { name: "Delicia Vegano", tag: "Plant based", serves: "Sirbi 2–3", description: "Un spread fresku ku berdura, dips, noten y teksturan alegre." },
      "6": { name: "E Grand Gourmet", tag: "Showstopper", serves: "Sirbi 5–6", description: "Un tabla grandi ku keshi premium, charcuterie, crackers, noten y extras." }
    },
    nl: {
      "1": { name: "Classic Deli Board", tag: "Huisfavoriet", serves: "Voor 2–3", description: "Gedroogde vleeswaren, kazen, olijven, crackers en een fijne hartige balans om te delen." },
      "2": { name: "Ambachtelijke Kaasplank", tag: "Kaas eerst", serves: "Voor 3–4", description: "Een romige, nootachtige en elegante kaasselectie met fruit en knapperige combinaties." },
      "3": { name: "Mediterrane Mix", tag: "Frisse bites", serves: "Voor 3–4", description: "Olijven, dips, kruiden, kazen en frisse eilandklare smaken." },
      "4": { name: "Zoet & Hartig Feest", tag: "Feestmodus", serves: "Voor 4–5", description: "Het beste van beide: zout, romig, knapperig, zoet en gemaakt om van te grazen." },
      "5": { name: "Vegan Delight", tag: "Plantaardig", serves: "Voor 2–3", description: "Een frisse spread met groenten, dips, noten en heldere texturen." },
      "6": { name: "The Grand Gourmet", tag: "Showstopper", serves: "Voor 5–6", description: "Een volle centerpiece plank met premium kazen, charcuterie, crackers, noten en extra's." }
    }
  };

  const translations = {
    en: {
      locale: "en-US",
      skipToMenu: "Skip to menu",
      ribbon1: "Island-wide delivery in Aruba",
      ribbon2: "Order in under a minute",
      ribbon3: "Brie Club: 10% off every board",
      navMenu: "Menu",
      navHow: "How it works",
      navClub: "Brie Club",
      navFaq: "FAQ",
      navContact: "Contact",
      langLabel: "Choose language",
      accountSignIn: "Sign in",
      accountClub: "Brie Club",
      cartButton: "Cart",
      cartOpen: "Open your order",
      menuOpen: "Open menu",
      menuClose: "Close menu",

      heroEyebrow: "Island deli platters · Aruba",
      heroTitleA: "Gather around",
      heroTitleB: "something beautiful.",
      heroSub: "Hand-styled cheese and charcuterie boards, built fresh in Aruba and delivered chilled to your villa, beach or boat.",
      heroCta1: "Build your board",
      heroCta2: "How quick order works",
      heroClub: "Brie Club members save 10% — join free",
      heroStat1N: "6", heroStat1L: "signature boards",
      heroStat2N: "10%", heroStat2L: "Brie Club savings",
      heroStat3N: "Aruba", heroStat3L: "delivered island-wide",
      chipFresh: "Styled fresh daily",
      chipChilled: "Delivered chilled",
      m1: "Cheese & charcuterie", m2: "Beach picnics", m3: "Villa deliveries",
      m4: "Sunset sails", m5: "Celebrations", m6: "Freshly styled daily",

      menuEyebrow: "The menu",
      menuTitleA: "Boards for every",
      menuTitleB: "mood.",
      menuSub: "From a quiet sunset for two to a full villa spread — each board is built by hand, not by machine.",
      menuClubTitle: "Save 10% on every board",
      menuClubBody: "Free to join the Brie Club — member prices apply automatically.",
      menuClubCta: "Join the Brie Club",
      menuMemberTitle: "Brie Club price active",
      menuMemberBody: "You're seeing member prices. 10% is applied at checkout.",
      menuNote: "Prices per board · Prepared to order · Custom requests welcome",
      menuHint: "Tap + to start a quick order",
      addButton: "Add to order",
      addedToast: "{name} added to your order.",
      memberPriceLabel: "Member price {price}",
      soldOut: "Sold out",
      photoSoon: "Photo coming soon",
      productEmpty: "The menu is being restyled — message us for today's boards.",

      howEyebrow: "Quick order",
      howTitleA: "From craving to doorstep",
      howTitleB: "in three steps.",
      howSub: "No obligatory account, no phone tag. Pick your boards, share the details, and send it straight to us.",
      howSeal: "Under a minute",
      step1Title: "Pick your boards",
      step1Body: "Tap + on the boards you love. Adjust quantities right in your order — member prices apply automatically.",
      step2Title: "Tell us where",
      step2Body: "Name, WhatsApp number, address and a delivery window. ASAP is always welcome.",
      step3Title: "We style & deliver",
      step3Body: "Your board is built fresh, packed chilled, and confirmed personally by WhatsApp.",
      howAsap: "Need it today? ASAP orders are welcome — we'll confirm availability on WhatsApp.",
      howCta: "Start an order",

      craftEyebrow: "The craft",
      craftTitleA: "Not a supermarket tray.",
      craftTitleB: "A board with a point of view.",
      craftBody: "Every board is composed by hand — colour, texture, salt, sweetness. Then packed to travel the island and still look like the photo when it lands.",
      craftCaption: "Styled by hand in Aruba",
      craftBadgeTitle: "Made to order",
      craftBadgeSub: "Never pre-boxed",
      craft1T: "Cheeses cut to order",
      craft1B: "No pre-cut, pre-boxed anything.",
      craft2T: "Chilled door-to-door",
      craft2B: "Packed for the Aruba heat, delivered ready to serve.",
      craft3T: "Styled for the table",
      craft3B: "Arrives camera-ready — board, garnish and all.",
      craftQuote: "“Half the magic is how it looks when the lid comes off.”",

      occEyebrow: "Made for",
      occTitleA: "Every kind of",
      occTitleB: "island day.",
      occSub: "Sunset sails, villa afternoons, birthdays that roll into dinner — there's a board for it. Tap an occasion and we'll help you plan.",
      occCta: "Planning something bigger? Let's talk",
      occ1: "Beach picnics", occ2: "Villa days", occ3: "Birthdays",
      occ4: "Brunches", occ5: "Sunset sails", occ6: "Corporate gifting",

      clubEyebrow: "The Brie Club",
      clubTitleA: "A little more",
      clubTitleB: "for the regulars.",
      clubSub: "Create your free account and every board comes with a little extra.",
      ben1T: "10% off, always",
      ben1B: "Every board, every order — applied automatically.",
      ben2T: "One-tap reorder",
      ben2B: "We remember your details and favourite boards.",
      ben3T: "First look",
      ben3B: "Seasonal and limited boards, before they go public.",
      ben4T: "Birthday treat",
      ben4B: "A little something from us on your day.",
      clubCardTitle: "The Brie Club",
      clubCardSub: "10% off every board. One-tap reorder. First look at new boards.",
      clubGuestChip: "Members only",
      clubMemberChip: "Member",
      clubJoin: "Join free",
      clubSignIn: "I already have an account",
      clubPrivacyNote: "Free to join. Your details stay on this device.",
      memberWelcome: "Welcome back, {name}.",
      memberSince: "Member since {date}",
      memberActive: "10% member discount active",
      memberSavedLabel: "Saved delivery details",
      memberNoAddress: "Added at your next order",
      memberHistory: "Recent orders",
      memberNoOrders: "Your orders will appear here after your first send.",
      memberReorder: "Reorder",
      memberSignOut: "Sign out",

      faqEyebrow: "Good to know",
      faqTitle: "Questions, answered.",
      faqSub: "Everything you need before your first board. Still curious? We're one message away.",
      faqCta: "Message us",
      q1: "Where do you deliver?",
      a1: "Anywhere in Aruba — villas, hotels, beaches and boats. Share your address or a Maps pin and we'll confirm the timing on WhatsApp.",
      q2: "How much notice do you need?",
      a2: "ASAP orders are welcome and depend on availability. For larger or custom boards, a day's notice is ideal.",
      q3: "Can I customise a board?",
      a3: "Absolutely. Allergies, dislikes, extra cheese — add a note to your order or message us and we'll build around you.",
      q4: "How do I pay?",
      a4: "Cash on delivery is easiest — tell us if you need change. Message us on WhatsApp if you'd prefer another arrangement.",
      q5: "Do you cater events?",
      a5: "Yes — villa parties, proposals, brunches and corporate gifts. Send us the details and we'll plan the spread.",

      footTitleA: "Your table,",
      footTitleB: "island style.",
      footSub: "Tell us the occasion and we'll build the board around it. Every order is confirmed personally on WhatsApp.",
      footWa: "Chat on WhatsApp",
      footEmail: "Send an email",
      contactTitle: "Contact",
      contactWhatsapp: "WhatsApp ordering",
      contactEmail: "Email",
      contactDelivery: "Delivery",
      contactHours: "Ordering",
      footAreaValue: "Across Aruba — villas, beaches, boats",
      footHoursValue: "Daily · by WhatsApp or email",
      footNote: "Hand-styled in Aruba",
      footerRights: "© {year} Brie Tables Aruba. All rights reserved.",
      adminLink: "Admin",
      backTop: "Back to top",

      drawerEyebrow: "Your order",
      drawerTitle: "Your board box",
      closeDrawer: "Close your order",
      drawerIntro: "Review your boards, add delivery details, and send it straight to us.",
      emptyTitle: "Your board box is empty.",
      emptyBody: "Pick a platter below to start your island order.",
      emptyCta: "Browse the menu",
      clubNudgeTitle: "Save 10% on this order",
      clubNudgeBody: "Brie Club members get 10% off every board — free to join.",
      clubNudgeCta: "Sign in / Join",
      clubApplied: "Brie Club · 10% off applied",
      subtotal: "Subtotal",
      discountLabel: "Brie Club · −10%",
      totalLabel: "Total",
      savingNote: "You're saving {amount} with the Brie Club.",
      each: "each",
      itemSingular: "board",
      itemPlural: "boards",
      qtyLabel: "Quantity for {name}",
      increase: "Add one {name}",
      decrease: "Remove one {name}",
      detailsTitle: "Delivery details",
      labelFullName: "Full name *",
      phFullName: "e.g., Maria Croes",
      labelPhone: "WhatsApp number *",
      phPhone: "+297 567 9921",
      labelAddress: "Delivery address *",
      phAddress: "Villa, hotel, beach or boat — with street",
      asapLabel: "ASAP — as soon as possible",
      labelDay: "Delivery day *",
      labelTime: "Delivery time *",
      extrasSummary: "Add delivery extras (optional)",
      labelMaps: "Google Maps pin",
      phMaps: "https://maps.app.goo.gl/…",
      labelChange: "Cash change needed",
      phChange: "e.g., Yes, for $50",
      labelNotes: "Notes for the kitchen",
      phNotes: "Allergies, occasion, gate code…",
      waButton: "Send order on WhatsApp",
      emailButton: "Send by email",
      secureNote: "No payment now — every order is confirmed personally.",
      errorCart: "Add at least one board before sending.",
      errorDetails: "Please add your name, WhatsApp number and delivery address.",
      errorDateTime: "Choose a delivery day and time, or select ASAP.",
      toastWa: "WhatsApp is opening — hit send and we'll confirm.",
      toastEmail: "Your email app is opening with the order.",
      orderBarReview: "Review order",
      orderBarHide: "Hide order summary",
      orderRef: "Order ref",

      authClose: "Close",
      authTitleJoin: "Join the Brie Club",
      authTitleSignIn: "Welcome back",
      authSubJoin: "Free to join. 10% off from your very first board.",
      authSubSignIn: "Sign in for member prices and saved delivery details.",
      tabJoin: "Create account",
      tabSignIn: "Sign in",
      labelName: "Full name",
      phName: "Maria Croes",
      labelEmail: "Email",
      phEmail: "you@example.com",
      labelPhoneAuth: "WhatsApp number",
      phPhoneAuth: "+297 567 9921",
      labelPassword: "Password",
      phPasswordJoin: "At least 6 characters",
      phPasswordSignIn: "Your password",
      submitJoin: "Create my account",
      submitSignIn: "Sign in",
      authPrivacy: "Stored securely on this device only. No spam, ever.",
      errName: "Please enter your name.",
      errEmail: "Please enter a valid email.",
      errPhone: "Please enter a valid phone number.",
      errPassword: "Use at least 6 characters.",
      errNoAccount: "No account found with that email.",
      errWrongPassword: "That password doesn't match.",
      errExists: "An account with this email already exists. Try signing in.",
      toastWelcome: "Welcome to the Brie Club, {name}!",
      toastSignedIn: "Welcome back, {name}.",
      toastSignedOut: "You're signed out.",
      reorderAdded: "Your boards are back in the order.",
      reorderMissing: "Some boards are no longer available.",

      waGreeting: "Hi Brie Tables Aruba! I'd love to order a board.",
      waPlan: "Hi Brie Tables Aruba! I'm planning something special — can we talk boards?",
      waOccasionPrefix: "Hi Brie Tables Aruba! I'm planning a board for: ",

      msgTitle: "BRIE TABLES ARUBA — NEW ORDER",
      msgCustomer: "Customer details",
      msgName: "Name",
      msgPhone: "Phone",
      msgAddress: "Address",
      msgDelivery: "Delivery",
      msgAsap: "ASAP",
      msgDate: "Delivery date",
      msgTime: "Delivery time",
      msgMaps: "Google Maps",
      msgChange: "Cash change",
      msgNotes: "Notes",
      msgNone: "Not provided",
      msgNoChange: "Not needed",
      msgSummary: "Order summary",
      msgSubtotal: "Subtotal",
      msgDiscount: "Brie Club discount (10%)",
      msgTotal: "Total",
      msgMember: "Brie Club member: {name}",
      msgRef: "Order ref",
      msgConfirm: "Please confirm availability.",
      emailSubject: "New platter order — Brie Tables Aruba"
    },

    es: {
      locale: "es-ES",
      skipToMenu: "Ir al menú",
      ribbon1: "Entrega en toda Aruba",
      ribbon2: "Pide en menos de un minuto",
      ribbon3: "Brie Club: 10% en cada tabla",
      navMenu: "Menú",
      navHow: "Cómo funciona",
      navClub: "Brie Club",
      navFaq: "Preguntas",
      navContact: "Contacto",
      langLabel: "Elige idioma",
      accountSignIn: "Entrar",
      accountClub: "Brie Club",
      cartButton: "Pedido",
      cartOpen: "Abrir tu pedido",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",

      heroEyebrow: "Tablas deli de la isla · Aruba",
      heroTitleA: "Reúnete alrededor de",
      heroTitleB: "algo hermoso.",
      heroSub: "Tablas de quesos y charcutería montadas a mano, hechas frescas en Aruba y entregadas refrigeradas en tu villa, playa o bote.",
      heroCta1: "Arma tu tabla",
      heroCta2: "Cómo pedir rápido",
      heroClub: "Los miembros del Brie Club ahorran 10% — únete gratis",
      heroStat1N: "6", heroStat1L: "tablas de autor",
      heroStat2N: "10%", heroStat2L: "ahorro Brie Club",
      heroStat3N: "Aruba", heroStat3L: "entrega en toda la isla",
      chipFresh: "Frescas cada día",
      chipChilled: "Entregadas refrigeradas",
      m1: "Quesos y charcutería", m2: "Picnics en la playa", m3: "Entregas en villas",
      m4: "Paseos al atardecer", m5: "Celebraciones", m6: "Frescas cada día",

      menuEyebrow: "El menú",
      menuTitleA: "Tablas para cada",
      menuTitleB: "ocasión.",
      menuSub: "Desde un atardecer tranquilo para dos hasta una mesa completa para la villa: cada tabla se monta a mano, no en serie.",
      menuClubTitle: "Ahorra 10% en cada tabla",
      menuClubBody: "Únete gratis al Brie Club y el descuento se aplica automáticamente.",
      menuClubCta: "Únete al Brie Club",
      menuMemberTitle: "Precio Brie Club activo",
      menuMemberBody: "Estás viendo precios de miembro. El 10% se aplica al finalizar.",
      menuNote: "Precios por tabla · Preparadas al pedido · Ajustes personalizados disponibles",
      menuHint: "Toca + para empezar un pedido rápido",
      addButton: "Añadir al pedido",
      addedToast: "{name} añadida a tu pedido.",
      memberPriceLabel: "Precio de miembro {price}",
      soldOut: "Agotada",
      photoSoon: "Foto próximamente",
      productEmpty: "El menú se está renovando — escríbenos para las tablas de hoy.",

      howEyebrow: "Pedido rápido",
      howTitleA: "Del antojo a tu puerta",
      howTitleB: "en tres pasos.",
      howSub: "Sin cuentas obligatorias, sin llamadas. Elige, comparte los datos y envía.",
      howSeal: "Menos de un minuto",
      step1Title: "Elige tus tablas",
      step1Body: "Toca + en las tablas que te gusten. Ajusta las cantidades en tu pedido: el precio de miembro se aplica solo.",
      step2Title: "Dinos dónde",
      step2Body: "Nombre, WhatsApp, dirección y horario de entrega. ASAP siempre es bienvenido.",
      step3Title: "Lo montamos y entregamos",
      step3Body: "Tu tabla se prepara fresca, se empaca refrigerada y se confirma por WhatsApp.",
      howAsap: "¿Lo necesitas hoy? Los pedidos ASAP son bienvenidos — confirmamos por WhatsApp.",
      howCta: "Empezar un pedido",

      craftEyebrow: "El oficio",
      craftTitleA: "No es una bandeja de supermercado.",
      craftTitleB: "Es una tabla con intención.",
      craftBody: "Cada tabla se compone a mano: color, textura, sal, dulzura. Luego se empaca para recorrer la isla y llegar luciendo como la foto.",
      craftCaption: "Montada a mano en Aruba",
      craftBadgeTitle: "Hecha al pedido",
      craftBadgeSub: "Nunca preenvasada",
      craft1T: "Quesos cortados al pedido",
      craft1B: "Nada precortado ni envasado de antemano.",
      craft2T: "Frío de puerta a puerta",
      craft2B: "Empacada para el calor de Aruba, lista para servir.",
      craft3T: "Lista para la mesa",
      craft3B: "Llega lista para la foto: tabla, garnish y todo.",
      craftQuote: "“La mitad de la magia está en cómo se ve cuando se abre la tapa.”",

      occEyebrow: "Para",
      occTitleA: "Cada tipo de",
      occTitleB: "día isleño.",
      occSub: "Paseos al atardecer, tardes de villa, cumpleaños que se alargan hasta la cena: hay una tabla para cada plan. Toca una ocasión y te ayudamos.",
      occCta: "¿Planeas algo más grande? Hablemos",
      occ1: "Picnic en la playa", occ2: "Días de villa", occ3: "Cumpleaños",
      occ4: "Brunches", occ5: "Paseos al atardecer", occ6: "Regalos corporativos",

      clubEyebrow: "El Brie Club",
      clubTitleA: "Un poco más",
      clubTitleB: "para los habituales.",
      clubSub: "Crea tu cuenta gratis y cada tabla viene con un extra.",
      ben1T: "10% siempre",
      ben1B: "En cada tabla y cada pedido: el descuento se aplica solo.",
      ben2T: "Pedido en un toque",
      ben2B: "Recordamos tus datos y tus tablas favoritas.",
      ben3T: "Primera mirada",
      ben3B: "Tablas de temporada y ediciones limitadas, antes que al público.",
      ben4T: "Sorpresa de cumpleaños",
      ben4B: "Un detalle nuestro en tu día.",
      clubCardTitle: "El Brie Club",
      clubCardSub: "10% en cada tabla. Pedido en un toque. Primera mirada a lo nuevo.",
      clubGuestChip: "Solo miembros",
      clubMemberChip: "Miembro",
      clubJoin: "Únete gratis",
      clubSignIn: "Ya tengo cuenta",
      clubPrivacyNote: "Gratis. Tus datos se quedan en este dispositivo.",
      memberWelcome: "Hola de nuevo, {name}.",
      memberSince: "Miembro desde {date}",
      memberActive: "10% de descuento activo",
      memberSavedLabel: "Datos de entrega guardados",
      memberNoAddress: "Se añade en tu próximo pedido",
      memberHistory: "Pedidos recientes",
      memberNoOrders: "Tus pedidos aparecerán aquí después del primero.",
      memberReorder: "Repetir",
      memberSignOut: "Cerrar sesión",

      faqEyebrow: "Bueno saber",
      faqTitle: "Preguntas, resueltas.",
      faqSub: "Todo lo que necesitas antes de tu primera tabla. ¿Más dudas? Estamos a un mensaje.",
      faqCta: "Escríbenos",
      q1: "¿Dónde entregan?",
      a1: "En toda Aruba: villas, hoteles, playas y botes. Comparte tu dirección o un pin de Maps y confirmamos la hora por WhatsApp.",
      q2: "¿Con cuánta antelación pedir?",
      a2: "Los pedidos ASAP son bienvenidos y dependen de la disponibilidad. Para tablas grandes o personalizadas, un día de aviso es ideal.",
      q3: "¿Puedo personalizar una tabla?",
      a3: "Claro. Alergias, gustos, más queso: añade una nota al pedido o escríbenos y la montamos a tu medida.",
      q4: "¿Cómo pago?",
      a4: "Efectivo contra entrega es lo más fácil — avísanos si necesitas cambio. Escríbenos por WhatsApp si prefieres otra opción.",
      q5: "¿Catering para eventos?",
      a5: "Sí: fiestas en villa, pedidas de mano, brunches y regalos corporativos. Cuéntanos los detalles y planificamos la mesa.",

      footTitleA: "Tu mesa,",
      footTitleB: "estilo isla.",
      footSub: "Cuéntanos la ocasión y montamos la tabla a su alrededor. Cada pedido se confirma personalmente por WhatsApp.",
      footWa: "Escríbenos por WhatsApp",
      footEmail: "Enviar un correo",
      contactTitle: "Contacto",
      contactWhatsapp: "Pedidos por WhatsApp",
      contactEmail: "Correo",
      contactDelivery: "Entrega",
      contactHours: "Pedidos",
      footAreaValue: "En toda Aruba — villas, playas, botes",
      footHoursValue: "Todos los días · WhatsApp o correo",
      footNote: "Montado a mano en Aruba",
      footerRights: "© {year} Brie Tables Aruba. Todos los derechos reservados.",
      adminLink: "Admin",
      backTop: "Volver arriba",

      drawerEyebrow: "Tu pedido",
      drawerTitle: "Tu caja de tablas",
      closeDrawer: "Cerrar tu pedido",
      drawerIntro: "Revisa tus tablas, añade los datos de entrega y envíanos el pedido.",
      emptyTitle: "Tu caja está vacía.",
      emptyBody: "Elige una tabla abajo para empezar tu pedido isleño.",
      emptyCta: "Ver el menú",
      clubNudgeTitle: "Ahorra 10% en este pedido",
      clubNudgeBody: "Los miembros del Brie Club tienen 10% en cada tabla — es gratis.",
      clubNudgeCta: "Entrar / Unirme",
      clubApplied: "Brie Club · 10% aplicado",
      subtotal: "Subtotal",
      discountLabel: "Brie Club · −10%",
      totalLabel: "Total",
      savingNote: "Estás ahorrando {amount} con el Brie Club.",
      each: "c/u",
      itemSingular: "tabla",
      itemPlural: "tablas",
      qtyLabel: "Cantidad de {name}",
      increase: "Añadir una {name}",
      decrease: "Quitar una {name}",
      detailsTitle: "Datos de entrega",
      labelFullName: "Nombre completo *",
      phFullName: "p. ej., María Croes",
      labelPhone: "Número de WhatsApp *",
      phPhone: "+297 567 9921",
      labelAddress: "Dirección de entrega *",
      phAddress: "Villa, hotel, playa o bote — con calle",
      asapLabel: "ASAP — lo antes posible",
      labelDay: "Día de entrega *",
      labelTime: "Hora de entrega *",
      extrasSummary: "Añadir extras de entrega (opcional)",
      labelMaps: "Pin de Google Maps",
      phMaps: "https://maps.app.goo.gl/…",
      labelChange: "Cambio en efectivo",
      phChange: "p. ej., Sí, para $50",
      labelNotes: "Notas para la cocina",
      phNotes: "Alergias, ocasión, código del portón…",
      waButton: "Enviar pedido por WhatsApp",
      emailButton: "Enviar por correo",
      secureNote: "Sin pago ahora — cada pedido se confirma personalmente.",
      errorCart: "Añade al menos una tabla antes de enviar.",
      errorDetails: "Añade tu nombre, número de WhatsApp y dirección de entrega.",
      errorDateTime: "Elige día y hora de entrega, o marca ASAP.",
      toastWa: "WhatsApp se está abriendo — pulsa enviar y confirmamos.",
      toastEmail: "Tu correo se está abriendo con el pedido.",
      orderBarReview: "Revisar pedido",
      orderBarHide: "Ocultar resumen",
      orderRef: "Ref. del pedido",

      authClose: "Cerrar",
      authTitleJoin: "Únete al Brie Club",
      authTitleSignIn: "Hola de nuevo",
      authSubJoin: "Gratis. 10% desde tu primera tabla.",
      authSubSignIn: "Entra para ver precios de miembro y tus datos guardados.",
      tabJoin: "Crear cuenta",
      tabSignIn: "Entrar",
      labelName: "Nombre completo",
      phName: "María Croes",
      labelEmail: "Correo",
      phEmail: "tu@ejemplo.com",
      labelPhoneAuth: "Número de WhatsApp",
      phPhoneAuth: "+297 567 9921",
      labelPassword: "Contraseña",
      phPasswordJoin: "Al menos 6 caracteres",
      phPasswordSignIn: "Tu contraseña",
      submitJoin: "Crear mi cuenta",
      submitSignIn: "Entrar",
      authPrivacy: "Guardado de forma segura solo en este dispositivo. Sin spam.",
      errName: "Escribe tu nombre.",
      errEmail: "Escribe un correo válido.",
      errPhone: "Escribe un número válido.",
      errPassword: "Usa al menos 6 caracteres.",
      errNoAccount: "No encontramos una cuenta con ese correo.",
      errWrongPassword: "La contraseña no coincide.",
      errExists: "Ya existe una cuenta con ese correo. Inicia sesión.",
      toastWelcome: "¡Bienvenido al Brie Club, {name}!",
      toastSignedIn: "Hola de nuevo, {name}.",
      toastSignedOut: "Sesión cerrada.",
      reorderAdded: "Tus tablas están de nuevo en el pedido.",
      reorderMissing: "Algunas tablas ya no están disponibles.",

      waGreeting: "¡Hola Brie Tables Aruba! Me gustaría pedir una tabla.",
      waPlan: "¡Hola Brie Tables Aruba! Estoy planeando algo especial — ¿hablamos de tablas?",
      waOccasionPrefix: "¡Hola Brie Tables Aruba! Estoy planeando una tabla para: ",

      msgTitle: "BRIE TABLES ARUBA — NUEVO PEDIDO",
      msgCustomer: "Datos del cliente",
      msgName: "Nombre",
      msgPhone: "Teléfono",
      msgAddress: "Dirección",
      msgDelivery: "Entrega",
      msgAsap: "ASAP",
      msgDate: "Fecha de entrega",
      msgTime: "Hora de entrega",
      msgMaps: "Google Maps",
      msgChange: "Cambio en efectivo",
      msgNotes: "Notas",
      msgNone: "No proporcionado",
      msgNoChange: "No necesario",
      msgSummary: "Resumen del pedido",
      msgSubtotal: "Subtotal",
      msgDiscount: "Descuento Brie Club (10%)",
      msgTotal: "Total",
      msgMember: "Miembro del Brie Club: {name}",
      msgRef: "Ref. del pedido",
      msgConfirm: "Por favor confirma disponibilidad.",
      emailSubject: "Nuevo pedido de tabla — Brie Tables Aruba"
    }
  };

  translations.pap = {
    locale: "en-US",
    skipToMenu: "Bai na menú",
    ribbon1: "Entrega na henter Aruba",
    ribbon2: "Pidi den ménos di un minuto",
    ribbon3: "Brie Club: 10% riba tur tabla",
    navMenu: "Menú",
    navHow: "Kon e ta funciona",
    navClub: "Brie Club",
    navFaq: "Preguntanan",
    navContact: "Kontakto",
    langLabel: "Skoge idioma",
    accountSignIn: "Drenta",
    accountClub: "Brie Club",
    cartButton: "Pedido",
    cartOpen: "Habri bo pedido",
    menuOpen: "Habri menú",
    menuClose: "Sera menú",

    heroEyebrow: "Tabla deli di e isla · Aruba",
    heroTitleA: "Sinta huntu rònt di",
    heroTitleB: "algu bunita.",
    heroSub: "Tabla di keshi i charcuterie trahá na man, fresku na Aruba i entregá hèlé na bo villa, playa òf boto.",
    heroCta1: "Traha bo tabla",
    heroCta2: "Kon pedido lihé ta funciona",
    heroClub: "Miembronan di Brie Club ta saka 10% — drenta gratis",
    heroStat1N: "6", heroStat1L: "tabla di firma",
    heroStat2N: "10%", heroStat2L: "ahorro Brie Club",
    heroStat3N: "Aruba", heroStat3L: "entrega na henter e isla",
    chipFresh: "Fresku tur dia",
    chipChilled: "Entregá hèlé",
    m1: "Keshi & charcuterie", m2: "Picnic na playa", m3: "Entrega na villa",
    m4: "Sunset sail", m5: "Celebrashon", m6: "Fresku tur dia",

    menuEyebrow: "E menú",
    menuTitleA: "Tabla pa tur",
    menuTitleB: "estado di ánimo.",
    menuSub: "For di un sunset ketu pa dos te un mesa kompleto pa e villa — tur tabla ta trahá na man, no na serie.",
    menuClubTitle: "Saka 10% riba tur tabla",
    menuClubBody: "Drenta gratis na Brie Club — e deskuento ta apliká outomátikamente.",
    menuClubCta: "Drenta Brie Club",
    menuMemberTitle: "Precio Brie Club aktivo",
    menuMemberBody: "Bo ta wak preis di miembro. E 10% ta apliká na e pedido.",
    menuNote: "Preis pa tabla · Trahá riba pedido · Ajustenan personalisá ta bon bini",
    menuHint: "Toka + pa kuminsá un pedido lihé",
    addButton: "Añadi na pedido",
    addedToast: "{name} añadí na bo pedido.",
    memberPriceLabel: "Preis di miembro {price}",
    soldOut: "Agotá",
    photoSoon: "Foto pronto",
    productEmpty: "Nos ta renobando e menú — manda nos un mensahe pa e tablanan di awe.",

    howEyebrow: "Pedido lihé",
    howTitleA: "For di antoho te bo porta",
    howTitleB: "den tres paso.",
    howSub: "Sin cuenta obligatorio, sin yamada. Skoge, kompartí bo datos i manda.",
    howSeal: "Ménos di un minuto",
    step1Title: "Skoge bo tablanan",
    step1Body: "Toka + riba e tablanan ku bo ta gusta. Ajustá e kantidat den bo pedido — e precio di miembro ta apliká outomátikamente.",
    step2Title: "Bisá nos unda",
    step2Body: "Nomber, WhatsApp, adrès i un ora di entrega. ASAP semper ta bon bini.",
    step3Title: "Nos ta traha i entrega",
    step3Body: "Bo tabla ta keda trahá fresku, paketá hèlé i konfirmá personalmente via WhatsApp.",
    howAsap: "Mester pa awe? Pedidonan ASAP ta bon bini — nos ta konfirmá disponibilidad via WhatsApp.",
    howCta: "Kuminsá un pedido",

    craftEyebrow: "E ofishi",
    craftTitleA: "No ta un tray di supermercado.",
    craftTitleB: "Ta un tabla ku intención.",
    craftBody: "Kada tabla ta komponé na man: koló, tekstit, salu, dushi. Anto ta paket'é pa biaha dor di e isla i yega manera e potret.",
    craftCaption: "Trahá na man na Aruba",
    craftBadgeTitle: "Trahá riba pedido",
    craftBadgeSub: "Nunka pre-paketá",
    craft1T: "Keshinan cortá riba pedido",
    craft1B: "Nada precortá ni pre-paketá.",
    craft2T: "Fríu di porta pa porta",
    craft2B: "Paketá pa e kalor di Aruba, kla pa sirbi.",
    craft3T: "Kla pa mesa",
    craft3B: "Ta yega kla pa potret: tabla, garnish i tur.",
    craftQuote: "“Mitad di e magia ta den kon e ta mira ora bo habri e tapa.”",

    occEyebrow: "Pa",
    occTitleA: "Tur tipo di",
    occTitleB: "dia isleño.",
    occSub: "Sunset sail, tardehinan na villa, cumpleaños ku ta dura te dihner — tin un tabla pa tur plan. Toka un ocasion i nos ta yuda bo planiá.",
    occCta: "Ta planiá algu mas grandi? Laga nos papia",
    occ1: "Picnic na playa", occ2: "Dia na villa", occ3: "Cumpleaños",
    occ4: "Brunch", occ5: "Sunset sail", occ6: "Regalo korporativo",

    clubEyebrow: "E Brie Club",
    clubTitleA: "Un tiki mas",
    clubTitleB: "pa e klientenan di tur siman.",
    clubSub: "Habri bo cuenta gratis i kada tabla ta bini ku un extra.",
    ben1T: "10% semper",
    ben1B: "Kada tabla, kada pedido — e deskuento ta apliká outomátikamente.",
    ben2T: "Pedido ku un toke",
    ben2B: "Nos ta korda bo datos i bo tablanan faborito.",
    ben3T: "Promé mirada",
    ben3B: "Tablanan di temporada i edishon limitá, promé ku públiko.",
    ben4T: "Regalo di cumpleaños",
    ben4B: "Un tiki di nos riba bo dia.",
    clubCardTitle: "E Brie Club",
    clubCardSub: "10% riba kada tabla. Pedido ku un toke. Promé mirada na nobedat.",
    clubGuestChip: "Solo miembro",
    clubMemberChip: "Miembro",
    clubJoin: "Drenta gratis",
    clubSignIn: "Mi tin cuenta kaba",
    clubPrivacyNote: "Gratis. Bo datos ta keda riba e aparato aki.",
    memberWelcome: "Bon bini bek, {name}.",
    memberSince: "Miembro desde {date}",
    memberActive: "10% deskuento aktivo",
    memberSavedLabel: "Datos di entrega wardá",
    memberNoAddress: "Ta añadí na bo próksimo pedido",
    memberHistory: "Pedidonan resien",
    memberNoOrders: "Bo pedidonan lo aparesé aki despues di e promé.",
    memberReorder: "Ripití",
    memberSignOut: "Sera sesion",

    faqEyebrow: "Bueno pa sa",
    faqTitle: "Preguntanan, kontestá.",
    faqSub: "Tur loke bo mester promé ku bo promé tabla. Tin mas pregunta? Nos ta un mensahe leu.",
    faqCta: "Manda nos un mensahe",
    q1: "Unda boso ta entrega?",
    a1: "Tur caminda na Aruba — villa, hotel, playa i boto. Kompartí bo adrès òf un pin di Maps i nos ta konfirmá e ora via WhatsApp.",
    q2: "Kuantu tempu di anticipo boso mester?",
    a2: "Pedidonan ASAP ta bon bini i ta dependé di disponibilidad. Pa tablanan mas grandi òf personalisá, un dia di aviso ta ideal.",
    q3: "Mi por personalisá un tabla?",
    a3: "Sigur. Alergia, kos ku bo no gusta, mas keshi — añadi un nota na bo pedido òf manda nos un mensahe i nos ta traha rònt di bo.",
    q4: "Kon mi ta paga?",
    a4: "Efektivo na entrega ta e mas fásil — bisá nos si bo mester cambio. Manda nos un mensahe via WhatsApp si bo preferí otro arreglo.",
    q5: "Boso ta hasi catering pa eventonan?",
    a5: "Sí — fiesta na villa, proposishon, brunch i regalo korporativo. Manda nos e detayenan i nos ta planiá e spread.",

    footTitleA: "Bo mesa,",
    footTitleB: "estilo isla.",
    footSub: "Bisá nos e ocasion i nos ta traha e tabla rònt di dje. Kada pedido ta konfirmá personalmente via WhatsApp.",
    footWa: "Papia via WhatsApp",
    footEmail: "Manda un email",
    contactTitle: "Kontakto",
    contactWhatsapp: "Pedido via WhatsApp",
    contactEmail: "Email",
    contactDelivery: "Entrega",
    contactHours: "Pedido",
    footAreaValue: "Tur Aruba — villa, playa, boto",
    footHoursValue: "Tur dia · WhatsApp òf email",
    footNote: "Trahá na man na Aruba",
    footerRights: "© {year} Brie Tables Aruba. Tur derecho reservá.",
    adminLink: "Admin",
    backTop: "Bai ariba",

    drawerEyebrow: "Bo pedido",
    drawerTitle: "Bo caha di tabla",
    closeDrawer: "Sera bo pedido",
    drawerIntro: "Revisa bo tablanan, añadi e datos di entrega i manda e pedido na nos.",
    emptyTitle: "Bo caha ta bashí.",
    emptyBody: "Skoge un tabla abou pa kuminsá bo pedido isleño.",
    emptyCta: "Wak e menú",
    clubNudgeTitle: "Saka 10% riba e pedido aki",
    clubNudgeBody: "Miembronan di Brie Club ta haña 10% riba tur tabla — gratis pa drenta.",
    clubNudgeCta: "Drenta / Uni",
    clubApplied: "Brie Club · 10% apliká",
    subtotal: "Subtotal",
    discountLabel: "Brie Club · −10%",
    totalLabel: "Total",
    savingNote: "Bo ta saka {amount} ku Brie Club.",
    each: "pa unidat",
    itemSingular: "tabla",
    itemPlural: "tablanan",
    qtyLabel: "Kantidat pa {name}",
    increase: "Añadi un {name}",
    decrease: "Kita un {name}",
    detailsTitle: "Datos di entrega",
    labelFullName: "Nomber kompleto *",
    phFullName: "por ehempel, Maria Croes",
    labelPhone: "Number di WhatsApp *",
    phPhone: "+297 567 9921",
    labelAddress: "Adrès di entrega *",
    phAddress: "Villa, hotel, playa òf boto — ku kaya",
    asapLabel: "ASAP — mas lihé posibel",
    labelDay: "Dia di entrega *",
    labelTime: "Ora di entrega *",
    extrasSummary: "Añadi extras di entrega (opcional)",
    labelMaps: "Pin di Google Maps",
    phMaps: "https://maps.app.goo.gl/…",
    labelChange: "Cambio na efektivo",
    phChange: "por ehempel, Sí, pa $50",
    labelNotes: "Nota pa kusina",
    phNotes: "Alergia, ocasion, código di porta…",
    waButton: "Manda pedido via WhatsApp",
    emailButton: "Manda via email",
    secureNote: "No mester paga awor — kada pedido ta konfirmá personalmente.",
    errorCart: "Añadi por lo menos un tabla promé ku bo manda.",
    errorDetails: "Añadi bo nomber, number di WhatsApp i adrès di entrega.",
    errorDateTime: "Skoge dia i ora di entrega, òf marca ASAP.",
    toastWa: "WhatsApp ta habri — pusha manda i nos ta konfirmá.",
    toastEmail: "Bo email ta habri ku e pedido.",
    orderBarReview: "Revisá pedido",
    orderBarHide: "Skonde resumen",
    orderRef: "Ref. di pedido",

    authClose: "Sera",
    authTitleJoin: "Drenta Brie Club",
    authTitleSignIn: "Bon bini bek",
    authSubJoin: "Gratis. 10% desde bo promé tabla.",
    authSubSignIn: "Drenta pa mira precio di miembro i bo datos wardá.",
    tabJoin: "Habri cuenta",
    tabSignIn: "Drenta",
    labelName: "Nomber kompleto",
    phName: "Maria Croes",
    labelEmail: "Email",
    phEmail: "bo@ehèmpel.com",
    labelPhoneAuth: "Number di WhatsApp",
    phPhoneAuth: "+297 567 9921",
    labelPassword: "Kontraseña",
    phPasswordJoin: "Por lo menos 6 karakter",
    phPasswordSignIn: "Bo kontraseña",
    submitJoin: "Habri mi cuenta",
    submitSignIn: "Drenta",
    authPrivacy: "Wardá seguramente riba e aparato aki so. Sin spam.",
    errName: "Yena bo nomber.",
    errEmail: "Yena un email válido.",
    errPhone: "Yena un number válido.",
    errPassword: "Usa por lo menos 6 karakter.",
    errNoAccount: "No a haña cuenta ku e email ei.",
    errWrongPassword: "E kontraseña no ta korekto.",
    errExists: "Ya tin un cuenta ku e email aki. Drenta.",
    toastWelcome: "Bon bini na Brie Club, {name}!",
    toastSignedIn: "Bon bini bek, {name}.",
    toastSignedOut: "Bo a sera sesion.",
    reorderAdded: "Bo tablanan ta bek den e pedido.",
    reorderMissing: "Algun tabla no ta disponibel mas.",

    waGreeting: "Halo Brie Tables Aruba! Mi ke pidi un tabla.",
    waPlan: "Halo Brie Tables Aruba! Mi ta planiá algu speshal — por papia di tablanan?",
    waOccasionPrefix: "Halo Brie Tables Aruba! Mi ta planiá un tabla pa: ",

    msgTitle: "BRIE TABLES ARUBA — PEDIDO NOBO",
    msgCustomer: "Datos di kliente",
    msgName: "Nomber",
    msgPhone: "Telefón",
    msgAddress: "Adrès",
    msgDelivery: "Entrega",
    msgAsap: "ASAP",
    msgDate: "Dia di entrega",
    msgTime: "Ora di entrega",
    msgMaps: "Google Maps",
    msgChange: "Cambio na efektivo",
    msgNotes: "Nota",
    msgNone: "No duna",
    msgNoChange: "No mester",
    msgSummary: "Resumen di pedido",
    msgSubtotal: "Subtotal",
    msgDiscount: "Deskuento Brie Club (10%)",
    msgTotal: "Total",
    msgMember: "Miembro di Brie Club: {name}",
    msgRef: "Ref. di pedido",
    msgConfirm: "Por fabor konfirma disponibilidad.",
    emailSubject: "Pedido nobo di tabla — Brie Tables Aruba"
  };

  translations.nl = {
    locale: "nl-NL",
    skipToMenu: "Naar menu",
    ribbon1: "Bezorging op heel Aruba",
    ribbon2: "Bestel in minder dan een minuut",
    ribbon3: "Brie Club: 10% op elke plank",
    navMenu: "Menu",
    navHow: "Hoe het werkt",
    navClub: "Brie Club",
    navFaq: "FAQ",
    navContact: "Contact",
    langLabel: "Kies taal",
    accountSignIn: "Inloggen",
    accountClub: "Brie Club",
    cartButton: "Bestelling",
    cartOpen: "Open je bestelling",
    menuOpen: "Open menu",
    menuClose: "Sluit menu",

    heroEyebrow: "Eiland-deliplanken · Aruba",
    heroTitleA: "Verzamel je rond",
    heroTitleB: "iets moois.",
    heroSub: "Met de hand gestylede kaas- en charcuterieplanken, vers gemaakt in Aruba en gekoeld bezorgd bij je villa, strand of boot.",
    heroCta1: "Stel je plank samen",
    heroCta2: "Zo werkt snel bestellen",
    heroClub: "Brie Club-leden krijgen 10% — gratis lid",
    heroStat1N: "6", heroStat1L: "signatuurplanken",
    heroStat2N: "10%", heroStat2L: "Brie Club voordeel",
    heroStat3N: "Aruba", heroStat3L: "bezorging op het eiland",
    chipFresh: "Dagvers gestyled",
    chipChilled: "Gekoeld bezorgd",
    m1: "Kaas & charcuterie", m2: "Strandpicknicks", m3: "Villabezorging",
    m4: "Sunsettochten", m5: "Feestjes", m6: "Dagvers gestyled",

    menuEyebrow: "Het menu",
    menuTitleA: "Planken voor elk",
    menuTitleB: "moment.",
    menuSub: "Van een rustige sunset voor twee tot een volle villatafel — elke plank wordt met de hand gemaakt, niet machinaal.",
    menuClubTitle: "10% op elke plank",
    menuClubBody: "Gratis lid van de Brie Club — ledenprijzen gaan automatisch.",
    menuClubCta: "Word lid van de Brie Club",
    menuMemberTitle: "Brie Club-prijs actief",
    menuMemberBody: "Je ziet ledenprijzen. De 10% wordt bij het bestellen toegepast.",
    menuNote: "Prijs per plank · Op bestelling gemaakt · Eigen wensen welkom",
    menuHint: "Tik op + om snel te bestellen",
    addButton: "Toevoegen",
    addedToast: "{name} toegevoegd aan je bestelling.",
    memberPriceLabel: "Ledentarief {price}",
    soldOut: "Uitverkocht",
    photoSoon: "Foto volgt",
    productEmpty: "Het menu wordt vernieuwd — stuur ons een bericht voor de planken van vandaag.",

    howEyebrow: "Snel bestellen",
    howTitleA: "Van zin naar deur",
    howTitleB: "in drie stappen.",
    howSub: "Geen verplicht account, geen telefoontjes. Kies, deel je gegevens en verstuur.",
    howSeal: "Minder dan een minuut",
    step1Title: "Kies je planken",
    step1Body: "Tik op + bij de planken die je wilt. Pas aantallen aan in je bestelling — ledenprijzen gaan automatisch.",
    step2Title: "Vertel waar",
    step2Body: "Naam, WhatsApp-nummer, adres en een bezorgmoment. ASAP is altijd welkom.",
    step3Title: "Wij stylen & bezorgen",
    step3Body: "Je plank wordt vers gemaakt, gekoeld verpakt en persoonlijk per WhatsApp bevestigd.",
    howAsap: "Vandaag nodig? ASAP-bestellingen zijn welkom — we bevestigen de beschikbaarheid op WhatsApp.",
    howCta: "Start een bestelling",

    craftEyebrow: "Het vakmanschap",
    craftTitleA: "Geen supermarktplateau.",
    craftTitleB: "Een plank met een visie.",
    craftBody: "Elke plank wordt met de hand samengesteld — kleur, textuur, zout, zoet. Daarna verpakt om het eiland te doorkruisen en er nog steeds als de foto uit te zien.",
    craftCaption: "Met de hand gestyled in Aruba",
    craftBadgeTitle: "Op bestelling",
    craftBadgeSub: "Nooit voorverpakt",
    craft1T: "Kaas op bestelling gesneden",
    craft1B: "Niets voorgesneden of voorverpakt.",
    craft2T: "Gekoeld van deur tot deur",
    craft2B: "Verpakt voor de Arubaanse hitte, klaar om te serveren.",
    craft3T: "Klaar voor tafel",
    craft3B: "Komt fotoklaar aan — plank, garnering en al.",
    craftQuote: "“De helft van de magie zit in hoe het eruitziet als het deksel eraf gaat.”",

    occEyebrow: "Voor",
    occTitleA: "Elke soort",
    occTitleB: "eilanddag.",
    occSub: "Sunsettochten, middagen in de villa, verjaardagen die overgaan in het diner — voor elk plan is er een plank. Tik op een gelegenheid en we denken mee.",
    occCta: "Iets groters plannen? Laten we praten",
    occ1: "Strandpicknick", occ2: "Villadag", occ3: "Verjaardag",
    occ4: "Brunch", occ5: "Sunsettocht", occ6: "Zakelijk cadeau",

    clubEyebrow: "De Brie Club",
    clubTitleA: "Net iets meer",
    clubTitleB: "voor de vaste gasten.",
    clubSub: "Maak je gratis account aan en elke plank komt met iets extra's.",
    ben1T: "Altijd 10% korting",
    ben1B: "Elke plank, elke bestelling — automatisch toegepast.",
    ben2T: "Bestellen met één tik",
    ben2B: "We onthouden je gegevens en favoriete planken.",
    ben3T: "Eerst kijken",
    ben3B: "Seizoensplanken en limited editions, vóór het publiek.",
    ben4T: "Verjaardagscadeau",
    ben4B: "Een kleinigheidje van ons op jouw dag.",
    clubCardTitle: "De Brie Club",
    clubCardSub: "10% op elke plank. Bestellen met één tik. Eerst kijken naar nieuws.",
    clubGuestChip: "Alleen leden",
    clubMemberChip: "Lid",
    clubJoin: "Gratis lid worden",
    clubSignIn: "Ik heb al een account",
    clubPrivacyNote: "Gratis. Je gegevens blijven op dit apparaat.",
    memberWelcome: "Welkom terug, {name}.",
    memberSince: "Lid sinds {date}",
    memberActive: "10% ledenkorting actief",
    memberSavedLabel: "Opgeslagen bezorggegevens",
    memberNoAddress: "Wordt toegevoegd bij je volgende bestelling",
    memberHistory: "Recente bestellingen",
    memberNoOrders: "Je bestellingen verschijnen hier na je eerste verzending.",
    memberReorder: "Opnieuw bestellen",
    memberSignOut: "Uitloggen",

    faqEyebrow: "Goed om te weten",
    faqTitle: "Vragen, beantwoord.",
    faqSub: "Alles wat je wilt weten voor je eerste plank. Toch nieuwsgierig? Je bent één bericht verwijderd.",
    faqCta: "Stuur ons een bericht",
    q1: "Waar bezorgen jullie?",
    a1: "Overal op Aruba — villa's, hotels, stranden en boten. Deel je adres of een Maps-pin en we bevestigen de tijd op WhatsApp.",
    q2: "Hoeveel vooruitbesteding is nodig?",
    a2: "ASAP-bestellingen zijn welkom en afhankelijk van beschikbaarheid. Voor grotere of custom planken is een dag vooraf ideaal.",
    q3: "Kan ik een plank aanpassen?",
    a3: "Zeker. Allergieën, wat je niet lust, extra kaas — voeg een notitie toe of stuur een bericht en we bouwen om je heen.",
    q4: "Hoe betaal ik?",
    a4: "Contant bij levering is het makkelijkst — laat weten of je wisselgeld nodig hebt. Stuur een WhatsApp-bericht voor een andere regeling.",
    q5: "Doen jullie catering voor evenementen?",
    a5: "Ja — villafeesten, aanzoeken, brunches en zakelijke cadeaus. Stuur de details en we plannen de spread.",

    footTitleA: "Jouw tafel,",
    footTitleB: "eilandstijl.",
    footSub: "Vertel ons de gelegenheid en we bouwen de plank eromheen. Elke bestelling wordt persoonlijk bevestigd op WhatsApp.",
    footWa: "Chat op WhatsApp",
    footEmail: "Stuur een e-mail",
    contactTitle: "Contact",
    contactWhatsapp: "Bestellen via WhatsApp",
    contactEmail: "E-mail",
    contactDelivery: "Bezorging",
    contactHours: "Bestellen",
    footAreaValue: "Op heel Aruba — villa's, stranden, boten",
    footHoursValue: "Dagelijks · WhatsApp of e-mail",
    footNote: "Met de hand gestyled in Aruba",
    footerRights: "© {year} Brie Tables Aruba. Alle rechten voorbehouden.",
    adminLink: "Beheer",
    backTop: "Naar boven",

    drawerEyebrow: "Je bestelling",
    drawerTitle: "Je plankendoos",
    closeDrawer: "Sluit je bestelling",
    drawerIntro: "Controleer je planken, voeg bezorggegevens toe en stuur de bestelling direct naar ons.",
    emptyTitle: "Je plankendoos is leeg.",
    emptyBody: "Kies hieronder een plank om je eilandbestelling te starten.",
    emptyCta: "Bekijk het menu",
    clubNudgeTitle: "Bespaar 10% op deze bestelling",
    clubNudgeBody: "Brie Club-leden krijgen 10% op elke plank — gratis lid.",
    clubNudgeCta: "Inloggen / Lid worden",
    clubApplied: "Brie Club · 10% toegepast",
    subtotal: "Subtotaal",
    discountLabel: "Brie Club · −10%",
    totalLabel: "Totaal",
    savingNote: "Je bespaart {amount} met de Brie Club.",
    each: "per stuk",
    itemSingular: "plank",
    itemPlural: "planken",
    qtyLabel: "Aantal voor {name}",
    increase: "Voeg één {name} toe",
    decrease: "Verwijder één {name}",
    detailsTitle: "Bezorggegevens",
    labelFullName: "Volledige naam *",
    phFullName: "bijv., Maria Croes",
    labelPhone: "WhatsApp-nummer *",
    phPhone: "+297 567 9921",
    labelAddress: "Bezorgadres *",
    phAddress: "Villa, hotel, strand of boot — met straat",
    asapLabel: "ASAP — zo snel mogelijk",
    labelDay: "Bezorgdag *",
    labelTime: "Bezorgtijd *",
    extrasSummary: "Bezorgextra's toevoegen (optioneel)",
    labelMaps: "Google Maps-pin",
    phMaps: "https://maps.app.goo.gl/…",
    labelChange: "Wisselgeld nodig",
    phChange: "bijv., Ja, voor $50",
    labelNotes: "Notities voor de keuken",
    phNotes: "Allergieën, gelegenheid, poortcode…",
    waButton: "Bestelling via WhatsApp",
    emailButton: "Verstuur per e-mail",
    secureNote: "Nu geen betaling — elke bestelling wordt persoonlijk bevestigd.",
    errorCart: "Voeg minstens één plank toe voordat je verstuurt.",
    errorDetails: "Voeg je naam, WhatsApp-nummer en bezorgadres toe.",
    errorDateTime: "Kies een bezorgdag en -tijd, of selecteer ASAP.",
    toastWa: "WhatsApp opent — tik op verzenden en we bevestigen.",
    toastEmail: "Je e-mailapp opent met de bestelling.",
    orderBarReview: "Bestelling bekijken",
    orderBarHide: "Besteloverzicht verbergen",
    orderRef: "Bestelref.",

    authClose: "Sluiten",
    authTitleJoin: "Word lid van de Brie Club",
    authTitleSignIn: "Welkom terug",
    authSubJoin: "Gratis. 10% vanaf je eerste plank.",
    authSubSignIn: "Log in voor ledenprijzen en opgeslagen bezorggegevens.",
    tabJoin: "Account aanmaken",
    tabSignIn: "Inloggen",
    labelName: "Volledige naam",
    phName: "Maria Croes",
    labelEmail: "E-mail",
    phEmail: "jij@voorbeeld.com",
    labelPhoneAuth: "WhatsApp-nummer",
    phPhoneAuth: "+297 567 9921",
    labelPassword: "Wachtwoord",
    phPasswordJoin: "Minimaal 6 tekens",
    phPasswordSignIn: "Je wachtwoord",
    submitJoin: "Maak mijn account",
    submitSignIn: "Inloggen",
    authPrivacy: "Veilig opgeslagen op dit apparaat. Nooit spam.",
    errName: "Vul je naam in.",
    errEmail: "Vul een geldig e-mailadres in.",
    errPhone: "Vul een geldig telefoonnummer in.",
    errPassword: "Gebruik minimaal 6 tekens.",
    errNoAccount: "Geen account gevonden met dat e-mailadres.",
    errWrongPassword: "Dat wachtwoord klopt niet.",
    errExists: "Er bestaat al een account met dit e-mailadres. Log in.",
    toastWelcome: "Welkom bij de Brie Club, {name}!",
    toastSignedIn: "Welkom terug, {name}.",
    toastSignedOut: "Je bent uitgelogd.",
    reorderAdded: "Je planken staan weer in de bestelling.",
    reorderMissing: "Sommige planken zijn niet meer beschikbaar.",

    waGreeting: "Hallo Brie Tables Aruba! Ik wil graag een plank bestellen.",
    waPlan: "Hallo Brie Tables Aruba! Ik plan iets bijzonders — kunnen we praten over planken?",
    waOccasionPrefix: "Hallo Brie Tables Aruba! Ik plan een plank voor: ",

    msgTitle: "BRIE TABLES ARUBA — NIEUWE BESTELLING",
    msgCustomer: "Klantgegevens",
    msgName: "Naam",
    msgPhone: "Telefoon",
    msgAddress: "Adres",
    msgDelivery: "Bezorging",
    msgAsap: "ASAP",
    msgDate: "Bezorgdatum",
    msgTime: "Bezorgtijd",
    msgMaps: "Google Maps",
    msgChange: "Wisselgeld",
    msgNotes: "Notities",
    msgNone: "Niet opgegeven",
    msgNoChange: "Niet nodig",
    msgSummary: "Besteloverzicht",
    msgSubtotal: "Subtotaal",
    msgDiscount: "Brie Club-korting (10%)",
    msgTotal: "Totaal",
    msgMember: "Brie Club-lid: {name}",
    msgRef: "Bestelref.",
    msgConfirm: "Bevestig de beschikbaarheid.",
    emailSubject: "Nieuwe plankenbestelling — Brie Tables Aruba"
  };
  /* ----------------------------------------------------------------------
     State
     ---------------------------------------------------------------------- */
  const state = {
    lang: parseLang(localStorage.getItem(CONFIG.storage.language)),
    products: [],
    hasAdminData: false,
    cart: {},
    member: null,
    barDismissed: false,
    contact: {},
    addLabel: null,
    lastFocus: null
  };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  function parseLang(value) {
    return translations[value] ? value : "en";
  }

  function t(key, vars) {
    const dict = translations[state.lang] || translations.en;
    let str = dict[key];
    if (str == null) str = translations.en[key];
    if (str == null) str = key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.split("{" + k + "}").join(vars[k]);
      });
    }
    return str;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function money(n) {
    const rounded = Math.round(n * 100) / 100;
    return "$" + (Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2));
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function unitPrice(product) {
    return rate(state.member ? MEMBER_RATE : 0, product.price);
  }
  function rate(pct, price) {
    return round2(price * (1 - pct));
  }

  function memberPriceOf(product) {
    return rate(MEMBER_RATE, product.price);
  }

  function hashInt(n, seed) {
    let h = seed || 0;
    for (let i = 0; i < String(n).length; i++) h = (h * 31 + String(n).charCodeAt(i)) & 0x7fffffff;
    return h;
  }

  function pluralCount(n) {
    return n === 1 ? t("itemSingular") : t("itemPlural");
  }

  /* ----------------------------------------------------------------------
     Admin data (optional). Reads v2 (items/settings/contactInfo) and the
     legacy storefront keys (products/logoUrl/addToCartText).
     ---------------------------------------------------------------------- */
  const DEFAULT_EN_NAMES = {
    "1": "Classic Deli Board",
    "2": "Artisan Cheese Platter",
    "3": "Mediterranean Mix",
    "4": "Sweet & Savory Feast",
    "5": "Vegan Delight",
    "6": "The Grand Gourmet"
  };

  const LOCAL_PHOTOS = {
    "1": "classic-deli-board",
    "2": "artisan-cheese-platter",
    "3": "mediterranean-mix",
    "4": "sweet-savory-feast",
    "5": "vegan-delight",
    "6": "grand-gourmet"
  };

  const FAKE_CONTACT = {
    whatsapp: ["2971234567", "1234567", "123456", "0000000"],
    email: ["info@brietablesaruba.com", "info@example.com", "you@example.com"],
    address: ["123 happy street", "happy street"]
  };

  function readAdminSettings() {
    try {
      const raw = localStorage.getItem(CONFIG.storage.admin);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (err) {
      return null;
    }
  }

  function pickList(parsed, key) {
    if (!parsed) return null;
    if (Array.isArray(parsed.items)) return parsed.items;
    if (Array.isArray(parsed.products)) return parsed.products;
    if (parsed[key] && Array.isArray(parsed[key])) return parsed[key];
    return null;
  }

  function normalizeProduct(raw, index) {
    const id = String(raw && raw.id != null ? raw.id : index + 1);
    const price = Number(raw && raw.price);
    const available = !(raw && raw.available === false);
    return {
      id: id,
      name: raw && raw.name ? String(raw.name) : "",
      tag: raw && raw.tag ? String(raw.tag) : "",
      price: isFinite(price) && price >= 0 ? price : 0,
      serves: raw && raw.serves ? String(raw.serves) : "",
      image: raw && raw.image ? String(raw.image) : "",
      accent: raw && raw.accent ? String(raw.accent) : "#d99a22",
      description: raw && raw.description ? String(raw.description) : "",
      available: available
    };
  }

  function isFakeValue(kind, value) {
    if (!value) return true;
    const v = String(value).trim().toLowerCase();
    const list = FAKE_CONTACT[kind] || [];
    return list.some(function (item) { return v.indexOf(item) !== -1; });
  }

  function digitsOnly(value) {
    return String(value || "").replace(/[^0-9]/g, "");
  }

  function prettyPhone(wa) {
    const d = digitsOnly(wa);
    if (d.length === 10) return "+" + d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6);
    return "+" + d;
  }

  function applyAdminData(parsed) {
    if (!parsed || typeof parsed !== "object") return;

    const items = pickList(parsed, "items");
    if (items && items.length) {
      state.products = items.map(normalizeProduct);
      state.hasAdminData = true;
    }

    const settings = parsed.settings || parsed;
    if (settings && settings.logoUrl) {
      state.logoUrl = String(settings.logoUrl);
    }
    if (settings && (settings.addToCartText || settings.buttonText)) {
      state.addLabel = String(settings.addToCartText || settings.buttonText);
    }

    const info = parsed.contactInfo || parsed.contact || {};
    state.contact = {
      whatsapp: isFakeValue("whatsapp", info.whatsapp) ? "" : digitsOnly(info.whatsapp),
      email: isFakeValue("email", info.email) ? "" : String(info.email).trim(),
      hours: info.hours && String(info.hours).trim() ? String(info.hours).trim() : "",
      instagram: info.instagram ? String(info.instagram).trim() : "",
      facebook: info.facebook ? String(info.facebook).trim() : ""
    };
  }

  function loadAdmin() {
    applyAdminData(readAdminSettings());
  }

  /* The Brie Tables Admin app (Android / PC) publishes admin-data.json next to
     index.html. When that file exists it wins over this device's localStorage. */
  function loadRemoteAdmin() {
    if (!window.fetch) return;
    fetch("admin-data.json?t=" + Date.now(), { cache: "no-store" })
      .then(function (res) { return res.ok ? res.json() : null; })
      .catch(function () { return null; })
      .then(function (data) {
        if (!data || typeof data !== "object") return;
        applyAdminData(data);
        loadProducts();
        applyContact();
        applyLogo();
        renderMenu();
        renderCart();
        renderClubCard();
        updateAccountTriggers();
        updateBar();
        if (typeof revealCheck === "function") revealCheck();
      });
  }

  function loadProducts() {
    if (!state.products.length) {
      state.products = defaultProducts.map(function (raw, i) { return normalizeProduct(raw, i); });
    }
  }

  function productCopyFor(product) {
    const byId = (productCopy[state.lang] && productCopy[state.lang][product.id]) ||
      (productCopy.en && productCopy.en[product.id]) || null;
    return byId;
  }

  function productView(product) {
    const copy = productCopyFor(product) || {};
    const en = (productCopy.en && productCopy.en[product.id]) || {};
    function prefer(adminValue, enValue, localizedValue) {
      const admin = (adminValue || "").trim();
      if (admin && admin !== (enValue || "").trim()) return admin;
      return localizedValue || admin || enValue || "";
    }
    return {
      raw: product,
      name: prefer(product.name, en.name, copy.name) || product.name || "Platter",
      tag: prefer(product.tag, en.tag, copy.tag),
      serves: prefer(product.serves, en.serves, copy.serves),
      description: prefer(product.description, en.description, copy.description)
    };
  }

  function photoPaths(product) {
    const id = String(product.id);
    const local = LOCAL_PHOTOS[id];
    const stored = (product.image || "").trim();
    const hasStored = stored && !/catbox\.moe/i.test(stored);
    if (hasStored) {
      return { src: stored, srcset: "", webp: "", fallback: local ? "platter-photos/" + local + ".jpg" : stored };
    }
    if (local) {
      return {
        src: "platter-photos/" + local + ".jpg",
        webp: "platter-photos/" + local + ".webp",
        srcset: "",
        fallback: "platter-photos/" + local + ".jpg"
      };
    }
    if (stored) {
      return { src: stored, webp: "", srcset: "", fallback: "" };
    }
    return { src: "", webp: "", srcset: "", fallback: "" };
  }

  /* ----------------------------------------------------------------------
     i18n application
     ---------------------------------------------------------------------- */
  function applyTranslations() {
    const dict = translations[state.lang] || translations.en;
    document.documentElement.lang = state.lang === "pap" ? "pap" : dict.locale.slice(0, 2);
    dict.locale = dict.locale || "en-US";

    $$("[data-i18n]").forEach(function (node) {
      const key = node.getAttribute("data-i18n");
      if (key === "footerRights") {
        node.textContent = t(key, { year: new Date().getFullYear() });
        return;
      }
      node.textContent = t(key);
    });

    $$("[data-i18n-placeholder]").forEach(function (node) {
      node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
    });

    $$("[data-i18n-aria]").forEach(function (node) {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
    });

    const selectors = $$(".lang-select");
    selectors.forEach(function (sel) { sel.value = state.lang; });
  }

  /* ----------------------------------------------------------------------
     Menu rendering
     ---------------------------------------------------------------------- */
  function grid() { return $("#board-grid"); }

  function imageMarkup(product, view) {
    const paths = photoPaths(product);
    if (!paths.src) {
      return '<div class="photo-fallback show"><span>' + escapeHtml(t("photoSoon")) + "</span></div>";
    }
    const picture = paths.webp
      ? '<picture><source srcset="' + escapeHtml(paths.webp) + '" type="image/webp"><img src="' + escapeHtml(paths.src) +
        '" alt="' + escapeHtml(view.name) + '" width="960" height="720" loading="lazy"></picture>'
      : '<img src="' + escapeHtml(paths.src) + '" alt="' + escapeHtml(view.name) + '" width="960" height="720" loading="lazy">';
    return picture + '<div class="photo-fallback"><span>' + escapeHtml(t("photoSoon")) + "</span></div>";
  }

  function actionMarkup(product) {
    const qty = state.cart[product.id] || 0;
    if (product.available === false) {
      return '<button class="add-btn" type="button" disabled>' + escapeHtml(t("soldOut")) + "</button>";
    }
    if (qty > 0) {
      return (
        '<div class="stepper" data-stepper="' + escapeHtml(product.id) + '">' +
        '<button type="button" data-cart-minus="' + escapeHtml(product.id) + '" aria-label="' +
        escapeHtml(t("decrease", { name: productView(product).name })) + '">−</button>' +
        '<span class="qty">' + qty + "</span>" +
        '<button type="button" data-cart-plus="' + escapeHtml(product.id) + '" aria-label="' +
        escapeHtml(t("increase", { name: productView(product).name })) + '">+</button>' +
        "</div>"
      );
    }
    return (
      '<button class="add-btn" type="button" data-add="' + escapeHtml(product.id) + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' +
      escapeHtml(state.addLabel || t("addButton")) +
      "</button>"
    );
  }

  function cardMarkup(product) {
    const view = productView(product);
    const sold = product.available === false;
    const qty = state.cart[product.id] || 0;
    const memberNote = state.member
      ? '<span class="member-price">' + escapeHtml(t("memberPriceLabel", { price: money(memberPriceOf(product)) })) + "</span>"
      : "";
    return (
      '<article class="board-card' + (sold ? " is-sold" : "") + ' reveal" data-id="' + escapeHtml(product.id) + '" style="--accent:' + escapeHtml(product.accent) + '">' +
        '<div class="board-photo' + (sold ? " sold-photo" : "") + '" data-photo>' +
          (sold ? '<div class="soldout"><span>' + escapeHtml(t("soldOut")) + "</span></div>" : "") +
          imageMarkup(product, view) +
          (sold ? "" : '<div class="price-coin">' + money(product.price) + "</div>") +
        "</div>" +
        '<div class="board-body">' +
          (view.tag ? '<span class="board-tag" style="position:static;align-self:flex-start">' + escapeHtml(view.tag) + "</span>" : "") +
          "<h3>" + escapeHtml(view.name) + "</h3>" +
          (view.description ? '<p class="board-desc">' + escapeHtml(view.description) + "</p>" : "") +
          '<div class="board-meta">' +
            "<span>" + escapeHtml(view.serves || "") + "</span>" +
            memberNote +
          "</div>" +
          '<div class="board-actions" data-actions>' + actionMarkup(product) + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function attachImageGuards(root) {
    $$("[data-photo] img", root).forEach(function (img) {
      img.addEventListener("error", function () {
        const card = img.closest("[data-id]");
        const id = card && card.getAttribute("data-id");
        const local = id && LOCAL_PHOTOS[id];
        if (local && img.getAttribute("data-retried") !== "1") {
          img.setAttribute("data-retried", "1");
          img.src = "platter-photos/" + local + ".jpg";
          return;
        }
        const wrap = img.closest("[data-photo]");
        if (wrap) wrap.classList.add("img-error");
      });
    });
  }

  function productById(id) {
    for (let i = 0; i < state.products.length; i++) {
      if (String(state.products[i].id) === String(id)) return state.products[i];
    }
    return null;
  }

  function renderMenu() {
    const host = grid();
    if (!host) return;
    if (!state.products.length) {
      host.innerHTML = '<p class="section-sub" style="grid-column:1/-1">' + escapeHtml(t("productEmpty")) + "</p>";
      return;
    }
    host.innerHTML = state.products.map(cardMarkup).join("");
    attachImageGuards(host);
    observeReveals();
  }

  function refreshCard(id) {
    const product = productById(id);
    if (!product) return;
    const card = grid() ? $('.board-card[data-id="' + CSS.escape(String(id)) + '"]', grid()) : null;
    if (!card) return;
    const actions = $("[data-actions]", card);
    if (actions) actions.innerHTML = actionMarkup(product);
  }

  /* ----------------------------------------------------------------------
     Cart
     ---------------------------------------------------------------------- */
  function saveCart() {
    try { localStorage.setItem(CONFIG.storage.cart, JSON.stringify(state.cart)); } catch (err) {}
  }

  function restoreCart() {
    try {
      const raw = localStorage.getItem(CONFIG.storage.cart);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") state.cart = parsed;
    } catch (err) {
      state.cart = {};
    }
  }

  function pruneCart() {
    Object.keys(state.cart).forEach(function (id) {
      const qty = Number(state.cart[id]);
      if (!productById(id) || !isFinite(qty) || qty <= 0) delete state.cart[id];
    });
  }

  function cartCount() {
    let n = 0;
    Object.keys(state.cart).forEach(function (id) { n += Number(state.cart[id]) || 0; });
    return n;
  }

  function cartLines() {
    const lines = [];
    state.products.forEach(function (product) {
      const qty = Number(state.cart[product.id]) || 0;
      if (qty <= 0) return;
      const unit = unitPrice(product);
      lines.push({
        product: product,
        view: productView(product),
        qty: qty,
        unit: unit,
        line: round2(unit * qty)
      });
    });
    return lines;
  }

  function totals() {
    const lines = cartLines();
    let subtotal = 0;
    let discounted = 0;
    lines.forEach(function (line) {
      subtotal = round2(subtotal + round2(line.product.price * line.qty));
      discounted = round2(discounted + line.line);
    });
    const discount = round2(subtotal - discounted);
    return { lines: lines, subtotal: subtotal, discount: discount, total: discounted };
  }

  function addToCart(id, silent) {
    const product = productById(id);
    if (!product || product.available === false) return;
    state.cart[id] = (Number(state.cart[id]) || 0) + 1;
    saveCart();
    state.barDismissed = false;
    refreshCard(id);
    renderCart();
    updateBar();
    if (!silent) {
      const view = productView(product);
      toast(t("addedToast", { name: view.name }));
    }
  }

  function changeQty(id, delta) {
    const current = Number(state.cart[id]) || 0;
    const next = current + delta;
    if (next <= 0) delete state.cart[id];
    else state.cart[id] = next;
    saveCart();
    refreshCard(id);
    renderCart();
    updateBar();
  }

  function setQty(id, qty) {
    if (qty <= 0) delete state.cart[id];
    else state.cart[id] = qty;
    saveCart();
    refreshCard(id);
    renderCart();
    updateBar();
  }

  /* ----------------------------------------------------------------------
     Drawer
     ---------------------------------------------------------------------- */
  function drawerOpen() {
    return $("#drawer") && $("#drawer").classList.contains("open");
  }

  function openDrawer() {
    const drawer = $("#drawer");
    if (!drawer) return;
    if (drawerOpen()) return;
    state.lastFocus = document.activeElement;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    const overlay = $("#drawer-overlay");
    if (overlay) overlay.classList.add("open");
    document.body.classList.add("drawer-open");
    document.body.classList.add("locked");
    renderCart();
    updateBar();
    const closeBtn = $("#drawer-close");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeDrawer() {
    const drawer = $("#drawer");
    if (!drawer || !drawer.classList.contains("open")) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    const overlay = $("#drawer-overlay");
    if (overlay) overlay.classList.remove("open");
    document.body.classList.remove("drawer-open");
    if (!$("#auth-modal").classList.contains("open")) document.body.classList.remove("locked");
    if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus({ preventScroll: true });
    state.lastFocus = null;
    updateBar();
  }

  function emptyCartMarkup() {
    return (
      '<div class="cart-empty">' +
        '<img src="brie-tables-logo-mark.webp" alt="" width="74" height="74">' +
        "<strong>" + escapeHtml(t("emptyTitle")) + "</strong>" +
        "<p>" + escapeHtml(t("emptyBody")) + "</p>" +
        '<a class="btn btn-primary" href="#menu" data-close-drawer>' + escapeHtml(t("emptyCta")) + "</a>" +
      "</div>"
    );
  }

  function cartItemMarkup(line) {
    const paths = photoPaths(line.product);
    const thumb = paths.webp
      ? '<picture><source srcset="' + escapeHtml(paths.webp) + '" type="image/webp"><img src="' + escapeHtml(paths.src) + '" alt="" width="58" height="58"></picture>'
      : paths.src
        ? '<img src="' + escapeHtml(paths.src) + '" alt="" width="58" height="58">'
        : "";
    const priceLine = state.member
      ? '<span class="line-member"><s>' + money(line.product.price) + "</s> " + money(line.unit) + " " + escapeHtml(t("each")) + "</span>"
      : "<span>" + money(line.unit) + " " + escapeHtml(t("each")) + "</span>";
    return (
      '<div class="cart-item" data-id="' + escapeHtml(line.product.id) + '">' +
        '<div class="cart-thumb">' + thumb + "</div>" +
        '<div class="cart-info">' +
          "<strong>" + escapeHtml(line.view.name) + "</strong>" +
          priceLine +
        "</div>" +
        '<div class="cart-actions">' +
          '<span class="qty-mini">' +
            '<button type="button" data-cart-minus="' + escapeHtml(line.product.id) + '" aria-label="' + escapeHtml(t("decrease", { name: line.view.name })) + '">−</button>' +
            "<span>" + line.qty + "</span>" +
            '<button type="button" data-cart-plus="' + escapeHtml(line.product.id) + '" aria-label="' + escapeHtml(t("increase", { name: line.view.name })) + '">+</button>' +
          "</span>" +
        "</div>" +
        '<span class="cart-line-total">' + money(line.line) + "</span>" +
      "</div>"
    );
  }

  function renderDrawerClub() {
    const host = $("#drawer-club");
    if (!host) return;
    if (!cartCount()) {
      host.innerHTML = "";
      host.hidden = true;
      return;
    }
    host.hidden = false;
    if (state.member) {
      host.innerHTML = '<div class="club-applied">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>' +
        escapeHtml(t("clubApplied")) +
        "</div>";
    } else {
      host.innerHTML =
        '<div class="club-nudge">' +
          '<div class="nudge-copy">' +
            "<strong>" + escapeHtml(t("clubNudgeTitle")) + "</strong>" +
            "<p>" + escapeHtml(t("clubNudgeBody")) + "</p>" +
          "</div>" +
          '<button type="button" data-open-auth="join">' + escapeHtml(t("clubNudgeCta")) + "</button>" +
        "</div>";
    }
  }

  function renderCart() {
    const list = $("#cart-list");
    const totalsHost = $("#totals");
    const drawer = $("#drawer");
    if (!list || !totalsHost || !drawer) return;
    const data = totals();
    const count = cartCount();

    const badge = $("#cart-count");
    if (badge) badge.textContent = String(count);

    drawer.classList.toggle("has-items", count > 0);

    if (!data.lines.length) {
      list.innerHTML = emptyCartMarkup();
      totalsHost.hidden = true;
      totalsHost.innerHTML = "";
      renderDrawerClub();
      return;
    }

    list.innerHTML = data.lines.map(cartItemMarkup).join("");
    const rows = [];
    rows.push('<div class="total-row"><span>' + escapeHtml(t("subtotal")) + "</span><span>" + money(data.subtotal) + "</span></div>");
    if (data.discount > 0) {
      rows.push('<div class="total-row discount"><span>' + escapeHtml(t("discountLabel")) + "</span><span>−" + money(data.discount) + "</span></div>");
    }
    rows.push('<div class="total-row grand"><span>' + escapeHtml(t("totalLabel")) + "</span><strong>" + money(data.total) + "</strong></div>");
    if (data.discount > 0) {
      rows.push('<p class="saving-note">' + escapeHtml(t("savingNote", { amount: money(data.discount) })) + "</p>");
    }
    totalsHost.innerHTML = rows.join("");
    totalsHost.hidden = false;
    renderDrawerClub();
    attachImageGuards(list);
  }

  /* ----------------------------------------------------------------------
     Sticky order bar
     ---------------------------------------------------------------------- */
  function updateBar() {
    const bar = $("#order-bar");
    if (!bar) return;
    const count = cartCount();
    const data = totals();
    const show = count > 0 && !state.barDismissed;
    if (!show) {
      bar.hidden = true;
      document.body.classList.remove("has-bar");
      return;
    }
    const thumbs = $("#bar-thumbs");
    if (thumbs) {
      const lines = data.lines.slice(0, 3);
      let html = lines.map(function (line) {
        const paths = photoPaths(line.product);
        const src = paths.webp || paths.src;
        return src ? '<img src="' + escapeHtml(src) + '" alt="" width="34" height="34">' : "";
      }).join("");
      if (data.lines.length > 3) html += '<span class="more">+' + (data.lines.length - 3) + "</span>";
      thumbs.innerHTML = html;
    }
    const totalEl = $("#bar-total");
    if (totalEl) totalEl.textContent = money(data.total);
    const countEl = $("#bar-count");
    if (countEl) countEl.textContent = count + " " + pluralCount(count);
    bar.hidden = false;
    document.body.classList.add("has-bar");
    if (drawerOpen()) bar.hidden = true;
  }

  /* ----------------------------------------------------------------------
     Toast
     ---------------------------------------------------------------------- */
  let toastTimer = null;
  function toast(message) {
    const host = $("#toast");
    const text = $("#toast-text");
    if (!host || !text) return;
    text.textContent = message;
    host.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { host.classList.remove("show"); }, 3400);
  }

  /* ----------------------------------------------------------------------
     Brie Club accounts (stored on this device)
     ---------------------------------------------------------------------- */
  function readCustomers() {
    try {
      const raw = localStorage.getItem(CONFIG.storage.customers);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function writeCustomers(list) {
    try { localStorage.setItem(CONFIG.storage.customers, JSON.stringify(list)); } catch (err) {}
  }

  function currentSessionId() {
    try { return localStorage.getItem(CONFIG.storage.session) || ""; } catch (err) { return ""; }
  }

  function randomSalt() {
    try {
      if (window.crypto && window.crypto.getRandomValues) {
        const buf = new Uint8Array(12);
        window.crypto.getRandomValues(buf);
        return Array.prototype.map.call(buf, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
      }
    } catch (err) {}
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function fallbackHash(text) {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < text.length; i++) {
      const ch = text.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return ("0000000" + (h2 >>> 0).toString(16)).slice(-8) + ("0000000" + (h1 >>> 0).toString(16)).slice(-8);
  }

  function hashPassword(password, salt) {
    const text = salt + "|" + password + "|brie-tables-aruba";
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
      const data = new TextEncoder().encode(text);
      return window.crypto.subtle.digest("SHA-256", data).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return ("0" + b.toString(16)).slice(-2);
        }).join("");
      }).catch(function () { return fallbackHash(text); });
    }
    return Promise.resolve(fallbackHash(text));
  }

  function customerById(id) {
    if (!id) return null;
    const list = readCustomers();
    for (let i = 0; i < list.length; i++) if (String(list[i].id) === String(id)) return list[i];
    return null;
  }

  function findCustomerByEmail(email) {
    const needle = String(email || "").trim().toLowerCase();
    const list = readCustomers();
    for (let i = 0; i < list.length; i++) {
      if (String(list[i].email || "").trim().toLowerCase() === needle) return list[i];
    }
    return null;
  }

  function signInMember(customer) {
    state.member = customer;
    try { localStorage.setItem(CONFIG.storage.session, String(customer.id)); } catch (err) {}
    state.barDismissed = false;
    updateAccountTriggers();
    renderMenu();
    renderCart();
    updateBar();
    renderClubCard();
  }

  function signOutMember(silent) {
    state.member = null;
    try { localStorage.removeItem(CONFIG.storage.session); } catch (err) {}
    updateAccountTriggers();
    renderMenu();
    renderCart();
    updateBar();
    renderClubCard();
    if (!silent) toast(t("toastSignedOut"));
  }

  function restoreSession() {
    const id = currentSessionId();
    if (!id) return;
    const customer = customerById(id);
    if (customer) state.member = customer;
  }

  function updateCustomer(updates) {
    if (!state.member) return;
    const list = readCustomers();
    for (let i = 0; i < list.length; i++) {
      if (String(list[i].id) === String(state.member.id)) {
        Object.keys(updates).forEach(function (key) {
          if (updates[key] != null && String(updates[key]).trim() !== "") list[i][key] = updates[key];
        });
        state.member = list[i];
        writeCustomers(list);
        return;
      }
    }
  }

  function saveMemberOrder(order) {
    if (!state.member) return;
    const list = readCustomers();
    for (let i = 0; i < list.length; i++) {
      if (String(list[i].id) === String(state.member.id)) {
        const orders = Array.isArray(list[i].orders) ? list[i].orders : [];
        orders.unshift(order);
        list[i].orders = orders.slice(0, 8);
        writeCustomers(list);
        state.member = list[i];
        return;
      }
    }
  }

  function memberFirstName() {
    if (!state.member) return "";
    const name = String(state.member.name || "").trim();
    return name ? name.split(/\s+/)[0] : "Member";
  }

  function updateAccountTriggers() {
    $$("[data-account-trigger]").forEach(function (btn) {
      const label = $(".account-label", btn);
      const dot = $(".member-dot", btn);
      if (label) label.textContent = state.member ? memberFirstName() : t("accountSignIn");
      if (dot) dot.hidden = !state.member;
      btn.classList.toggle("is-member", !!state.member);
    });
  }

  function memberSinceText(customer) {
    let date = null;
    if (customer && customer.since) {
      const parsed = new Date(customer.since);
      if (!isNaN(parsed.getTime())) date = parsed;
    }
    if (!date) date = new Date();
    try {
      return new Intl.DateTimeFormat((translations[state.lang] || translations.en).locale, { month: "short", year: "numeric" }).format(date);
    } catch (err) {
      return String(date.getFullYear());
    }
  }

  function savedDetailsMarkup(customer) {
    const rows = [];
    if (customer.address) rows.push("<span><strong>" + escapeHtml(customer.address) + "</strong></span>");
    if (customer.phone) rows.push("<span>" + escapeHtml(customer.phone) + "</span>");
    if (!rows.length) rows.push("<span>" + escapeHtml(t("memberNoAddress")) + "</span>");
    return '<div class="member-block">' +
      '<p class="block-label">' + escapeHtml(t("memberSavedLabel")) + "</p>" +
      '<div class="saved-details">' + rows.join("") + "</div>" +
    "</div>";
  }

  function ordersMarkup(customer) {
    const orders = Array.isArray(customer.orders) ? customer.orders : [];
    if (!orders.length) {
      return '<div class="member-block">' +
        '<p class="block-label">' + escapeHtml(t("memberHistory")) + "</p>" +
        '<p class="member-no-orders">' + escapeHtml(t("memberNoOrders")) + "</p>" +
      "</div>";
    }
    const rows = orders.slice(0, 3).map(function (order, index) {
      const names = (order.items || []).map(function (item) {
        return (item.qty || 1) + "× " + item.name;
      }).join(", ");
      let dateText = "";
      if (order.date) {
        try {
          dateText = new Intl.DateTimeFormat((translations[state.lang] || translations.en).locale, { day: "numeric", month: "short" }).format(new Date(order.date));
        } catch (err) { dateText = ""; }
      }
      return '<div class="member-order">' +
        '<div class="order-meta">' +
          "<strong>" + escapeHtml(dateText || order.ref || "Order") + " · " + escapeHtml(money(Number(order.total) || 0)) + "</strong>" +
          "<span>" + escapeHtml(names) + "</span>" +
        "</div>" +
        '<button type="button" data-reorder="' + index + '">' + escapeHtml(t("memberReorder")) + "</button>" +
      "</div>";
    }).join("");
    return '<div class="member-block">' +
      '<p class="block-label">' + escapeHtml(t("memberHistory")) + "</p>" +
      '<div class="member-orders">' + rows + "</div>" +
    "</div>";
  }

  function renderClubCard() {
    const host = $("#club-card");
    if (!host) return;
    const logoMark = DEFAULT_MARK;

    if (state.member) {
      host.classList.add("is-member");
      host.innerHTML =
        '<div class="club-card-head">' +
          '<img src="' + escapeHtml(logoMark) + '" alt="" width="48" height="48">' +
          '<span class="club-chip">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.1 5.6L20 10.5l-4.7 3.9 1.4 6.1L12 17.2l-4.7 3.3 1.4-6.1L4 10.5l5.9-1.9z"/></svg>' +
            escapeHtml(t("clubMemberChip")) +
          "</span>" +
        "</div>" +
        '<div class="member-id">' +
          '<span class="member-name">' + escapeHtml(state.member.name || memberFirstName()) + "</span>" +
          '<span class="member-since">' + escapeHtml(t("memberSince", { date: memberSinceText(state.member) })) + "</span>" +
        "</div>" +
        '<span class="member-active">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>' +
          escapeHtml(t("memberActive")) +
        "</span>" +
        savedDetailsMarkup(state.member) +
        ordersMarkup(state.member) +
        '<div class="member-foot">' +
          '<button class="text-link" type="button" data-open-drawer>' +
            '<span>' + escapeHtml(t("cartOpen")) + "</span>" +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          "</button>" +
          '<button class="signout" type="button" data-signout>' + escapeHtml(t("memberSignOut")) + "</button>" +
        "</div>";
    } else {
      host.classList.remove("is-member");
      host.innerHTML =
        '<div class="club-card-head">' +
          '<img src="' + escapeHtml(logoMark) + '" alt="" width="48" height="48">' +
          '<span class="club-chip">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>' +
            escapeHtml(t("clubGuestChip")) +
          "</span>" +
        "</div>" +
        "<h3>" + escapeHtml(t("clubCardTitle")) + "</h3>" +
        '<p class="card-sub">' + escapeHtml(t("clubCardSub")) + "</p>" +
        '<div class="club-actions">' +
          '<button class="btn btn-gold" type="button" data-open-auth="join">' + escapeHtml(t("clubJoin")) + "</button>" +
          '<button class="btn btn-light-ghost" type="button" data-open-auth="signin">' + escapeHtml(t("clubSignIn")) + "</button>" +
        "</div>" +
        '<p class="club-privacy">' +
          '<span class="lock">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>' +
            escapeHtml(t("clubPrivacyNote")) +
          "</span>" +
        "</p>";
    }
  }

  function reorder(index) {
    if (!state.member) return;
    const orders = Array.isArray(state.member.orders) ? state.member.orders : [];
    const order = orders[index];
    if (!order) return;
    let missing = false;
    (order.items || []).forEach(function (item) {
      const product = productById(item.id);
      if (product && product.available !== false) {
        state.cart[product.id] = (Number(state.cart[product.id]) || 0) + (Number(item.qty) || 1);
      } else {
        missing = true;
      }
    });
    saveCart();
    state.barDismissed = false;
    renderMenu();
    renderCart();
    updateBar();
    toast(missing ? t("reorderMissing") : t("reorderAdded"));
    openDrawer();
  }

  /* ----------------------------------------------------------------------
     Auth modal
     ---------------------------------------------------------------------- */
  const authState = { mode: "join" };

  function clearAuthErrors() {
    $$("#auth-form .field-error").forEach(function (node) {
      node.textContent = "";
      node.classList.remove("show");
    });
    $$("#auth-form .field").forEach(function (node) { node.classList.remove("invalid"); });
  }

  function setAuthError(errId, fieldId, message) {
    const err = $("#" + errId);
    const field = $("#" + fieldId);
    if (err) { err.textContent = message; err.classList.add("show"); }
    if (field) field.classList.add("invalid");
  }

  function setAuthMode(mode) {
    authState.mode = mode === "signin" ? "signin" : "join";
    const form = $("#auth-form");
    if (!form) return;
    form.classList.toggle("signin-mode", authState.mode === "signin");
    $$(".auth-tab").forEach(function (tab) {
      tab.setAttribute("aria-selected", tab.getAttribute("data-auth-mode") === authState.mode ? "true" : "false");
    });
    const title = $("#auth-title");
    const sub = $("#auth-sub");
    const submit = $("#auth-submit");
    const pass = $("#auth-password");
    if (title) title.textContent = t(authState.mode === "signin" ? "authTitleSignIn" : "authTitleJoin");
    if (sub) sub.textContent = t(authState.mode === "signin" ? "authSubSignIn" : "authSubJoin");
    if (submit) submit.textContent = t(authState.mode === "signin" ? "submitSignIn" : "submitJoin");
    if (pass) pass.setAttribute("placeholder", t(authState.mode === "signin" ? "phPasswordSignIn" : "phPasswordJoin"));
    clearAuthErrors();
  }

  function openAuth(mode) {
    const modal = $("#auth-modal");
    if (!modal) return;
    state.lastFocus = document.activeElement;
    setAuthMode(mode || "join");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    const email = $("#auth-email");
    if (email) setTimeout(function () { email.focus({ preventScroll: true }); }, 60);
  }

  function closeAuth() {
    const modal = $("#auth-modal");
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (!$("#drawer").classList.contains("open")) document.body.classList.remove("locked");
    if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus({ preventScroll: true });
    state.lastFocus = null;
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || "").trim());
  }

  function validPhone(value) {
    return digitsOnly(value).length >= 7;
  }

  function handleAuthSubmit(event) {
    event.preventDefault();
    clearAuthErrors();
    const name = ($("#auth-name") ? $("#auth-name").value : "").trim();
    const email = ($("#auth-email") ? $("#auth-email").value : "").trim();
    const phone = ($("#auth-phone") ? $("#auth-phone").value : "").trim();
    const password = $("#auth-password") ? $("#auth-password").value : "";
    const join = authState.mode === "join";
    let ok = true;

    if (join && name.length < 2) { setAuthError("auth-err-name", "auth-name-field", t("errName")); ok = false; }
    if (!validEmail(email)) { setAuthError("auth-err-email", "auth-email-field", t("errEmail")); ok = false; }
    if (join && !validPhone(phone)) { setAuthError("auth-err-phone", "auth-phone-field", t("errPhone")); ok = false; }
    if (password.length < 6) { setAuthError("auth-err-password", "auth-password-field", t("errPassword")); ok = false; }
    if (!ok) return;

    if (join) {
      if (findCustomerByEmail(email)) {
        setAuthError("auth-err-email", "auth-email-field", t("errExists"));
        return;
      }
      const salt = randomSalt();
      hashPassword(password, salt).then(function (hash) {
        const list = readCustomers();
        const customer = {
          id: "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          name: name,
          email: email,
          phone: phone,
          salt: salt,
          passHash: hash,
          since: new Date().toISOString(),
          address: "",
          orders: []
        };
        list.push(customer);
        writeCustomers(list);
        signInMember(customer);
        prefillCheckout();
        closeAuth();
        toast(t("toastWelcome", { name: customer.name.split(/\s+/)[0] }));
      });
    } else {
      const customer = findCustomerByEmail(email);
      if (!customer) {
        setAuthError("auth-err-email", "auth-email-field", t("errNoAccount"));
        return;
      }
      hashPassword(password, customer.salt || "").then(function (hash) {
        if (hash !== customer.passHash) {
          setAuthError("auth-err-password", "auth-password-field", t("errWrongPassword"));
          return;
        }
        signInMember(customer);
        prefillCheckout();
        closeAuth();
        toast(t("toastSignedIn", { name: customer.name.split(/\s+/)[0] }));
      });
    }
  }

  /* ----------------------------------------------------------------------
     Checkout
     ---------------------------------------------------------------------- */
  function checkoutData() {
    return {
      name: ($("#name") ? $("#name").value : "").trim(),
      phone: ($("#phone") ? $("#phone").value : "").trim(),
      address: ($("#address") ? $("#address").value : "").trim(),
      asap: $("#asap-order") ? $("#asap-order").checked : false,
      day: ($("#delivery-day") ? $("#delivery-day").value : "").trim(),
      time: ($("#delivery-time") ? $("#delivery-time").value : "").trim(),
      maps: ($("#location-link") ? $("#location-link").value : "").trim(),
      change: ($("#change") ? $("#change").value : "").trim(),
      notes: ($("#notes") ? $("#notes").value : "").trim()
    };
  }

  function markInvalid(fieldId, invalid) {
    const field = $("#" + fieldId);
    if (field) field.classList.toggle("invalid", !!invalid);
  }

  function validateCheckout(data) {
    if (!cartLines().length) return { ok: false, message: t("errorCart") };
    let ok = true;
    markInvalid("name-field", !data.name);
    if (!data.name) ok = false;
    markInvalid("phone-field", !data.phone);
    if (!data.phone) ok = false;
    markInvalid("address-field", !data.address);
    if (!data.address) ok = false;
    if (!ok) return { ok: false, message: t("errorDetails") };
    if (!data.asap && (!data.day || !data.time)) {
      markInvalid("day-field", !data.day);
      markInvalid("time-field", !data.time);
      return { ok: false, message: t("errorDateTime") };
    }
    markInvalid("day-field", false);
    markInvalid("time-field", false);
    return { ok: true };
  }

  function orderRef() {
    return "BT-" + Date.now().toString(36).toUpperCase().slice(-6);
  }

  function buildOrderMessage(ref, data) {
    const rows = totals();
    const lines = [];
    lines.push(t("msgTitle"));
    lines.push(t("msgRef") + ": " + ref);
    lines.push("");
    lines.push("· " + t("msgCustomer"));
    lines.push(t("msgName") + ": " + data.name);
    lines.push(t("msgPhone") + ": " + data.phone);
    lines.push(t("msgAddress") + ": " + data.address);
    const when = data.asap
      ? t("msgAsap")
      : [data.day, data.time].filter(Boolean).join(" ");
    lines.push(t("msgDelivery") + ": " + (when || t("msgNone")));
    if (data.maps) lines.push(t("msgMaps") + ": " + data.maps);
    lines.push(t("msgChange") + ": " + (data.change || t("msgNoChange")));
    if (data.notes) lines.push(t("msgNotes") + ": " + data.notes);
    lines.push("");
    lines.push("· " + t("msgSummary"));
    rows.lines.forEach(function (line) {
      lines.push(line.qty + "× " + line.view.name + " — " + money(line.unit) + " " + t("each") + " = " + money(line.line));
    });
    lines.push(t("msgSubtotal") + ": " + money(rows.subtotal));
    if (rows.discount > 0) lines.push(t("msgDiscount") + ": −" + money(rows.discount));
    lines.push(t("msgTotal") + ": " + money(rows.total));
    if (state.member) lines.push(t("msgMember", { name: state.member.name || memberFirstName() }));
    lines.push("");
    lines.push(t("msgConfirm"));
    return lines.join("\n");
  }

  function snapshotOrder(ref, data) {
    const rows = totals();
    return {
      ref: ref,
      date: new Date().toISOString(),
      items: rows.lines.map(function (line) {
        return { id: line.product.id, qty: line.qty, name: line.view.name, unit: line.unit, line: line.line };
      }),
      details: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        asap: data.asap,
        day: data.day,
        time: data.time
      },
      subtotal: rows.subtotal,
      discount: rows.discount,
      total: rows.total
    };
  }

  function afterSend(ref, data) {
    if (state.member) {
      updateCustomer({ name: data.name, phone: data.phone, address: data.address });
      saveMemberOrder(snapshotOrder(ref, data));
      renderClubCard();
    }
    state.cart = {};
    saveCart();
    renderMenu();
    renderCart();
    updateBar();
    closeDrawer();
  }

  function sendOrder(channel) {
    const data = checkoutData();
    const check = validateCheckout(data);
    if (!check.ok) {
      toast(check.message);
      return;
    }
    const ref = orderRef();
    const message = buildOrderMessage(ref, data);

    if (channel === "whatsapp") {
      const url = "https://wa.me/" + (state.whatsapp || CONFIG.whatsapp) + "?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener");
      toast(t("toastWa"));
    } else {
      const url = "mailto:" + (state.email || CONFIG.email) +
        "?subject=" + encodeURIComponent(t("emailSubject")) +
        "&body=" + encodeURIComponent(message);
      window.location.href = url;
      toast(t("toastEmail"));
    }
    afterSend(ref, data);
  }

  function prefillCheckout() {
    if (!state.member) return;
    const name = $("#name");
    const phone = $("#phone");
    const address = $("#address");
    if (name && !name.value && state.member.name) name.value = state.member.name;
    if (phone && !phone.value && state.member.phone) phone.value = state.member.phone;
    if (address && !address.value && state.member.address) address.value = state.member.address;
  }

  function applyContact() {
    state.whatsapp = state.contact.whatsapp || CONFIG.whatsapp;
    state.email = state.contact.email || CONFIG.email;
    $$('[data-contact="whatsapp"]').forEach(function (node) {
      node.textContent = prettyPhone(state.whatsapp);
    });
    $$('[data-contact="email"]').forEach(function (node) {
      node.textContent = state.email;
    });
    $$('[data-contact="email-link"]').forEach(function (node) {
      node.setAttribute("href", "mailto:" + state.email);
    });
    $$('a[href^="https://wa.me/"]').forEach(function (node) {
      const href = node.getAttribute("href") || "";
      const next = href.replace(/^https:\/\/wa\.me\/[0-9]+/, "https://wa.me/" + state.whatsapp);
      if (next !== href) node.setAttribute("href", next);
    });
    if (state.contact.hours) {
      $$('[data-contact="hours"]').forEach(function (node) { node.textContent = state.contact.hours; });
    }
    const social = $("#footer-social");
    if (social) {
      const links = [];
      if (state.contact.instagram) links.push({ label: "Instagram", url: state.contact.instagram });
      if (state.contact.facebook) links.push({ label: "Facebook", url: state.contact.facebook });
      if (links.length) {
        social.innerHTML = links.map(function (link) {
          return '<a href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener" aria-label="' + escapeHtml(link.label) + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor"/></svg>' +
            "</a>";
        }).join("");
        social.hidden = false;
      }
    }
  }

  function applyLogo() {
    const logo = state.logoUrl || DEFAULT_LOGO;
    $$('[data-logo="hero"]').forEach(function (img) {
      img.src = logo;
      img.addEventListener("error", function () {
        if (img.src.indexOf(DEFAULT_LOGO) === -1) img.src = DEFAULT_LOGO;
      });
    });
    $$('[data-logo="mark"]').forEach(function (img) {
      img.src = DEFAULT_MARK;
    });
  }

  function applyLanguage(lang) {
    state.lang = parseLang(lang);
    try { localStorage.setItem(CONFIG.storage.language, state.lang); } catch (err) {}
    applyTranslations();
    applyContact();
    renderMenu();
    renderCart();
    renderClubCard();
    updateAccountTriggers();
    updateBar();
    setAuthMode(authState.mode);
  }

  /* ----------------------------------------------------------------------
     Events
     ---------------------------------------------------------------------- */
  if (!window.CSS) window.CSS = {};
  if (!window.CSS.escape) {
    window.CSS.escape = function (value) {
      return String(value).replace(/[^a-zA-Z0-9_\u00A0-\uFFFF-]/g, function (ch) { return "\\" + ch; });
    };
  }

  function closeNav() {
    const header = $("#site-header");
    const toggle = $("#menu-toggle");
    if (!header || !header.classList.contains("nav-open")) return;
    header.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function whatsappGreeting(kind, extra) {
    if (kind === "plan") return t("waPlan");
    if (kind === "occasion") return t("waOccasionPrefix") + (extra || "").trim();
    return t("waGreeting");
  }

  function goToClubSection() {
    const club = $("#club");
    if (!club) return;
    const startY = window.scrollY || window.pageYOffset || 0;
    const targetY = Math.max(0, club.getBoundingClientRect().top + startY - 96);
    if (club.scrollIntoView) {
      club.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // if smooth scrolling is unavailable or throttled, jump directly
    setTimeout(function () {
      const now = window.scrollY || window.pageYOffset || 0;
      if (Math.abs(now - startY) < 40) window.scrollTo(0, targetY);
    }, 700);
  }

  function bindEvents() {
    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!target || !target.closest) return;
      const hit = function (selector) { return target.closest(selector); };

      const wa = hit(".js-wa");
      if (wa) {
        event.preventDefault();
        const kind = wa.getAttribute("data-wa-kind") || "general";
        const text = whatsappGreeting(kind, wa.textContent || "");
        window.open("https://wa.me/" + (state.whatsapp || CONFIG.whatsapp) + "?text=" + encodeURIComponent(text), "_blank", "noopener");
        return;
      }

      const accountTrigger = hit("[data-account-trigger]");
      if (accountTrigger) {
        if (state.member) {
          goToClubSection();
        } else {
          openAuth("signin");
        }
        return;
      }

      const add = hit("[data-add]");
      if (add) { addToCart(add.getAttribute("data-add")); return; }

      const plus = hit("[data-cart-plus]");
      if (plus) { changeQty(plus.getAttribute("data-cart-plus"), 1); return; }

      const minus = hit("[data-cart-minus]");
      if (minus) { changeQty(minus.getAttribute("data-cart-minus"), -1); return; }

      const openDrawerBtn = hit("[data-open-drawer]");
      if (openDrawerBtn) {
        if (openDrawerBtn.tagName === "A") event.preventDefault();
        openDrawer();
        return;
      }

      const closeDrawerBtn = hit("[data-close-drawer]");
      if (closeDrawerBtn) { closeDrawer(); return; }

      const authTab = hit("[data-auth-mode]");
      if (authTab) { setAuthMode(authTab.getAttribute("data-auth-mode")); return; }

      const openAuthBtn = hit("[data-open-auth]");
      if (openAuthBtn) { openAuth(openAuthBtn.getAttribute("data-open-auth")); return; }

      if (hit("[data-close-auth]")) { closeAuth(); return; }

      const signout = hit("[data-signout]");
      if (signout) { signOutMember(); return; }

      const reorderBtn = hit("[data-reorder]");
      if (reorderBtn) { reorder(Number(reorderBtn.getAttribute("data-reorder"))); return; }

      const barClose = hit("#bar-close");
      if (barClose) { state.barDismissed = true; updateBar(); return; }

      if (hit("#btn-whatsapp")) { sendOrder("whatsapp"); return; }
      if (hit("#btn-email")) { sendOrder("email"); return; }

      if (hit("#menu-toggle")) {
        const header = $("#site-header");
        const toggle = $("#menu-toggle");
        header.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", header.classList.contains("nav-open") ? "true" : "false");
        return;
      }

      if (hit("#main-nav a")) { closeNav(); return; }
    });

    document.addEventListener("change", function (event) {
      const target = event.target;
      if (!target) return;
      if (target.classList && target.classList.contains("lang-select")) {
        applyLanguage(target.value);
        return;
      }
      if (target.id === "asap-order") {
        const drawer = $("#drawer");
        if (drawer) drawer.classList.toggle("is-asap", target.checked);
      }
    });

    document.addEventListener("input", function (event) {
      const target = event.target;
      if (target && target.closest) {
        const field = target.closest(".field");
        if (field) field.classList.remove("invalid");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      const modal = $("#auth-modal");
      if (modal && modal.classList.contains("open")) { closeAuth(); return; }
      if (drawerOpen()) { closeDrawer(); return; }
      closeNav();
    });

    const authForm = $("#auth-form");
    if (authForm) authForm.addEventListener("submit", handleAuthSubmit);

    const checkout = $("#checkout-form");
    if (checkout) checkout.addEventListener("submit", function (event) { event.preventDefault(); });
  }

  /* ----------------------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------------------- */
  let revealTimer = null;

  function revealCheck() {
    const nodes = $$(".reveal:not(.in)");
    if (!nodes.length) {
      if (revealTimer) { clearInterval(revealTimer); revealTimer = null; }
      return;
    }
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    for (let i = 0; i < nodes.length; i++) {
      const rect = nodes[i].getBoundingClientRect();
      if (rect.top < vh * 0.96 && rect.bottom > 0) nodes[i].classList.add("in");
    }
  }

  function observeReveals() {
    revealCheck();
    if (!revealTimer && window.setInterval) revealTimer = window.setInterval(revealCheck, 900);
  }

  /* ----------------------------------------------------------------------
     Init
     ---------------------------------------------------------------------- */
  function init() {
    loadAdmin();
    loadProducts();
    restoreCart();
    pruneCart();
    restoreSession();
    applyTranslations();
    applyContact();
    applyLogo();
    renderMenu();
    renderCart();
    renderClubCard();
    updateAccountTriggers();
    updateBar();
    setAuthMode("join");
    bindEvents();
    observeReveals();

    const header = $("#site-header");
    if (header) {
      const onScroll = function () {
        header.classList.toggle("scrolled", (window.scrollY || window.pageYOffset || 0) > 8);
        revealCheck();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    window.addEventListener("resize", revealCheck);

    loadRemoteAdmin();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
