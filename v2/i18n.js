// Refugio del Pintor - V1 Editorial
// Bilingual content dictionary (ES / EN). Default: ES.
// Toggle persisted in localStorage. Used by script.js via window.I18N.

const I18N = {
  es: {
    meta: {
      title: 'Refugio del Pintor · Hospedaje en Tilcara, Quebrada de Humahuaca',
      description: 'No es un hotel. Es un refugio. 13 habitaciones en Tilcara, al pie de la Quebrada de Humahuaca. Reservas directas por WhatsApp.',
      langCode: 'es-AR'
    },
    nav: {
      essence: 'Esencia',
      origin: 'Ricardo',
      place: 'Tilcara',
      rooms: 'Habitaciones',
      gallery: 'Galería',
      reviews: 'Voces',
      location: 'Cómo llegar',
      book: 'Reservar'
    },
    header: {
      brandName: 'del Pintor',
      brandSubline: 'Refugio de Pueblo',
      langSwitch: 'EN',
      langSwitchAria: 'Cambiar idioma a inglés',
      soundOnAria: 'Activar sonido ambiente',
      soundOffAria: 'Silenciar sonido ambiente',
      bookShort: 'Reservar'
    },
    hero: {
      eyebrow: 'Tilcara · Quebrada de Humahuaca',
      tagline: 'No es un hotel.',
      taglineEm: 'Es un refugio.',
      subtitle: 'Trece habitaciones de adobe, piedra y madera, al pie de la Quebrada. Recibidos por quien las construyó.',
      ctaPrimary: 'Reservar por WhatsApp',
      ctaSecondary: 'Conocer el lugar',
      scrollHint: 'Bajar'
    },
    essence: {
      kicker: 'La esencia',
      heading: 'Un lugar donde parar, respirar, y volver a lo esencial.',
      lead: 'Refugio del Pintor nació de una convicción simple: la hospitalidad genuina no necesita artificios.',
      body: 'Solo respeto por el paisaje, identidad propia, y un anfitrión que entienda lo que significa recibir. Acá no hay lobby de mármol ni cadenas. Hay piedra, adobe, madera, y la Quebrada entrando por las ventanas.'
    },
    origin: {
      kicker: 'El origen',
      heading: 'Ricardo Mealla llegó cuando no había nadie.',
      body1: 'Detrás del Refugio está Ricardo, uno de los iniciadores del turismo en Tilcara. Construyó este lugar con una filosofía clara: integrarse al entorno en vez de imponerse sobre él.',
      body2: 'No buscó convertir el paisaje en producto. Buscó ofrecer un espacio donde el paisaje fuera la experiencia. Esa visión original, cruda y honesta, sigue siendo el alma del lugar décadas después.',
      quote: 'Empecé cuando acá no había nadie. Creé algo natural, de raíz, sin modificar nada.',
      quoteAttrib: 'Ricardo Mealla, anfitrión'
    },
    place: {
      kicker: 'El lugar',
      heading: 'Tilcara, corazón de la Quebrada de Humahuaca.',
      body1: 'El Refugio está en Alverro 660, a pasos del centro del pueblo, rodeado del paisaje inconfundible de la Quebrada, declarada Patrimonio de la Humanidad por la UNESCO.',
      body2: 'Tilcara es punto de partida para explorar el Pucará, la Garganta del Diablo, Purmamarca y los cerros multicolores del norte argentino. También es un destino en sí mismo, para quienes buscan ritmo lento, cielos enormes y silencio real.',
      nearbyHeading: 'A pasos del Refugio',
      nearby: [
        { name: 'Pucará de Tilcara', distance: '1,5 km' },
        { name: 'Garganta del Diablo', distance: '3 km' },
        { name: 'Purmamarca y Cerro de los Siete Colores', distance: '24 km' },
        { name: 'Humahuaca', distance: '45 km' }
      ]
    },
    rooms: {
      kicker: 'Las habitaciones',
      heading: 'Trece habitaciones, en dos plantas.',
      lead: 'Cada una con carácter propio. Al reservar podés indicar tu preferencia de planta, sujeto a disponibilidad.',
      detailCta: 'Ver detalle',
      modal: {
        closeLabel: 'Cerrar',
        bathLabel: 'Baño',
        viewLabel: 'Vista',
        amenitiesLabel: 'Incluye',
        bookCta: 'Reservar esta habitación',
        note: 'El mensaje de WhatsApp ya viene con los datos de esta habitación.'
      },
      double: {
        name: 'Doble',
        countLabel: '9 disponibles',
        capacity: 'Para 2 personas',
        body: 'Cama matrimonial o twin, con sommier Queen o King. Baño privado. Para parejas o viajeros que buscan comodidad sin excesos.',
        bath: 'Baño privado con ducha de alta presión.',
        view: 'Disponible en planta alta (vista a la Quebrada) o planta baja (patio interior). Indicá tu preferencia al reservar.',
        amenities: ['WiFi', 'Calefacción', 'Sommier Queen o King', 'Ropa blanca de calidad', 'Amenities'],
        bookingMessage: 'Hola Ricardo, me gustaría consultar disponibilidad para una habitación Doble en el Refugio del Pintor.'
      },
      triple: {
        name: 'Triple',
        countLabel: '3 disponibles',
        capacity: 'Para 3 personas',
        body: 'Tres camas individuales con sommier. Baño privado. Para grupos de amigos o familias pequeñas.',
        bath: 'Baño privado con ducha de alta presión.',
        view: 'Disponible en planta alta (vista a la Quebrada) o planta baja (patio interior). Indicá tu preferencia al reservar.',
        amenities: ['WiFi', 'Calefacción', 'Tres sommiers individuales', 'Ropa blanca de calidad', 'Amenities'],
        bookingMessage: 'Hola Ricardo, me gustaría consultar disponibilidad para una habitación Triple en el Refugio del Pintor.'
      },
      family: {
        name: 'Familiar',
        countLabel: '1 disponible',
        capacity: 'Hasta 5 personas',
        body: 'Dos espacios intercomunicados: el primero con tres camas twin, el segundo con cama matrimonial. Baño compartido entre ambos. Para familias que necesitan amplitud sin perder intimidad.',
        bath: 'Baño compartido entre los dos ambientes.',
        view: 'Disponible en planta alta (vista a la Quebrada) o planta baja (patio interior). Indicá tu preferencia al reservar.',
        amenities: ['WiFi', 'Calefacción', 'Tres twin + matrimonial', 'Ropa blanca de calidad', 'Amenities'],
        bookingMessage: 'Hola Ricardo, me gustaría consultar disponibilidad para la habitación Familiar en el Refugio del Pintor.'
      },
      floorsHeading: 'Plantas y vistas',
      upperLabel: 'Planta alta',
      upperBody: 'Mira hacia la Quebrada. Cerros, cielo abierto, atardeceres que cambian de color cada minuto.',
      lowerLabel: 'Planta baja',
      lowerBody: 'Da al patio interior. Más resguardada, verde, silenciosa.'
    },
    services: {
      kicker: 'Servicios',
      heading: 'Lo necesario, bien hecho.',
      items: [
        { title: 'Baño privado', body: 'En todas las habitaciones, con presión de ducha real.' },
        { title: 'Calefacción', body: 'Para las noches frías de la Quebrada.' },
        { title: 'WiFi', body: 'En todo el refugio.' },
        { title: 'Sommier Queen o King', body: 'Camas que aguantan la trasnoche y la siesta.' },
        { title: 'Ropa blanca de calidad', body: 'Sábanas y toallas que se sienten al tacto.' },
        { title: 'Amenities', body: 'Lo que necesitás, sin packs absurdos.' }
      ]
    },
    breakfast: {
      kicker: 'El desayuno',
      heading: 'Desayuno incluido',
      body: 'Buffet casero cada mañana, incluido en la estadía.'
    },
    gallery: {
      kicker: 'Galería',
      heading: 'El refugio en imágenes.',
      lead: 'Adobe, piedra, madera, textiles del norte. Y la Quebrada de fondo.'
    },
    reviews: {
      kicker: 'Voces',
      heading: 'Lo que dicen los que ya volvieron.',
      lead: 'Reseñas verificadas en Google.',
      items: [
        {
          quote: 'Excelente atención de los anfitriones. El desayuno bárbaro, el jugo de naranja exquisito. Volvería sin duda alguna.',
          author: 'Melisa Daniela Díaz Aban',
          context: 'Vacaciones · Amigos',
          rating: '5/5'
        },
        {
          quote: 'Hotel muy pintoresco. El baño es muy bueno y el agua de la ducha es una maravilla. La atención es increíble. Gracias Patricia, Nora y Juan.',
          author: 'Gabriela PP',
          context: 'Vacaciones · Sola',
          rating: '5/5'
        },
        {
          quote: 'Encantador lugar, muy cálido y cómodo. La atención de todos allí es excelente. El desayuno exquisito, todo casero. Muy recomendable.',
          author: 'Delfina del Castillo',
          context: 'Google',
          rating: '5/5'
        }
      ]
    },
    location: {
      kicker: 'Cómo llegar',
      heading: 'Alverro 660, Tilcara.',
      body: 'A pasos del centro y de la plaza principal. Si llegás en auto, hay estacionamiento cercano. Si llegás en bus, la terminal está a 8 minutos caminando.',
      mapCta: 'Abrir en Google Maps',
      coords: '23°34′37″S 65°23′41″O'
    },
    booking: {
      kicker: 'Reservar',
      heading: 'Sin plataformas. Sin comisiones. Por WhatsApp.',
      body1: 'El Refugio no opera a través de plataformas de reserva intermediarias. La comunicación y la reserva se hacen directo por WhatsApp.',
      body2: 'No es una limitación, es una decisión. Ricardo prefiere el trato personal, conocer a quien llega, responder con su propia voz. Reservar es tan simple como escribir un mensaje.',
      cta: 'Escribir por WhatsApp',
      note: 'Respuesta personal, en general dentro del día.',
      messageTemplate: 'Hola Ricardo, me gustaría consultar disponibilidad en el Refugio del Pintor.'
    },
    footer: {
      tagline: 'No es un hotel. Es un refugio.',
      contactHeading: 'Contacto',
      addressLabel: 'Dirección',
      address: 'Alverro 660, Y4624 Tilcara, Jujuy, Argentina',
      whatsappLabel: 'WhatsApp',
      whatsappDisplay: '+54 9 3884 38-5736',
      phoneLabel: 'Teléfono',
      phoneDisplay: '+54 388 438-5736',
      instagramLabel: 'Instagram',
      instagramHandle: '@delpintorrefugio',
      copyright: '© Refugio del Pintor · Tilcara, Quebrada de Humahuaca',
      creditLine: 'Hecho con respeto por el paisaje.'
    },
    alt: {
      hero: 'Entrada del Refugio del Pintor con el cartel tallado en madera',
      patio: 'Patio interior con mesa de hierro y silla de mimbre frente a paredes de adobe',
      exterior: 'Fachada en piedra y madera con la Quebrada de fondo',
      roomDouble: 'Habitación doble en planta alta con vista a la Quebrada al atardecer',
      roomTriple: 'Habitación triple con paredes ocre y cubrecamas de telar andino',
      roomFamily: 'Cama con almohadón andino y vista a los cerros de Tilcara',
      interiorStone: 'Sala interior con muros de piedra y muebles de madera',
      diningRoom: 'Comedor con paredes ocre, salamandra y mesas de madera'
    }
  },

  en: {
    meta: {
      title: 'Refugio del Pintor · Stay in Tilcara, Quebrada de Humahuaca',
      description: 'Not a hotel. A refuge. 13 rooms in Tilcara, at the foot of the Quebrada de Humahuaca. Book directly on WhatsApp.',
      langCode: 'en'
    },
    nav: {
      essence: 'Essence',
      origin: 'Ricardo',
      place: 'Tilcara',
      rooms: 'Rooms',
      gallery: 'Gallery',
      reviews: 'Voices',
      location: 'Find us',
      book: 'Book'
    },
    header: {
      brandName: 'del Pintor',
      brandSubline: 'A village refuge',
      langSwitch: 'ES',
      langSwitchAria: 'Switch language to Spanish',
      soundOnAria: 'Turn ambient sound on',
      soundOffAria: 'Mute ambient sound',
      bookShort: 'Book'
    },
    hero: {
      eyebrow: 'Tilcara · Quebrada de Humahuaca',
      tagline: 'Not a hotel.',
      taglineEm: 'A refuge.',
      subtitle: 'Thirteen rooms of adobe, stone and timber, at the foot of the Quebrada. Welcomed by the man who built them.',
      ctaPrimary: 'Book on WhatsApp',
      ctaSecondary: 'See the place',
      scrollHint: 'Scroll'
    },
    essence: {
      kicker: 'The essence',
      heading: 'A place to pause, breathe, and return to what matters.',
      lead: 'Refugio del Pintor was born from a simple conviction: genuine hospitality needs no artifice.',
      body: 'Only respect for the landscape, an identity of its own, and a host who knows what it means to welcome someone. No marble lobby, no chain branding. Stone, adobe, timber, and the Quebrada coming in through the windows.'
    },
    origin: {
      kicker: 'The origin',
      heading: 'Ricardo Mealla arrived when no one else was here.',
      body1: 'Behind the Refugio is Ricardo, one of the people who started tourism in Tilcara. He built this place with a clear philosophy: blend into the landscape rather than impose on it.',
      body2: 'He never tried to turn the landscape into a product. He offered a space where the landscape itself was the experience. That raw, honest vision is still the soul of the place, decades later.',
      quote: 'I started when there was no one else here. I built something natural, from the roots, without changing a thing.',
      quoteAttrib: 'Ricardo Mealla, host'
    },
    place: {
      kicker: 'The place',
      heading: 'Tilcara, at the heart of the Quebrada de Humahuaca.',
      body1: 'The Refugio is at Alverro 660, a short walk from the village centre, surrounded by the unmistakable landscape of the Quebrada, a UNESCO World Heritage site.',
      body2: 'Tilcara is the starting point to explore the Pucará, the Garganta del Diablo, Purmamarca and the multicoloured peaks of northern Argentina. It is also a destination in itself, for travellers who come for slow rhythm, vast skies and real silence.',
      nearbyHeading: 'Within reach',
      nearby: [
        { name: 'Pucará de Tilcara', distance: '1.5 km' },
        { name: 'Garganta del Diablo', distance: '3 km' },
        { name: 'Purmamarca and the Seven-Colour Hill', distance: '24 km' },
        { name: 'Humahuaca', distance: '45 km' }
      ]
    },
    rooms: {
      kicker: 'The rooms',
      heading: 'Thirteen rooms, across two floors.',
      lead: 'Each one with its own character. When you book you can request a floor preference, subject to availability.',
      detailCta: 'See detail',
      modal: {
        closeLabel: 'Close',
        bathLabel: 'Bathroom',
        viewLabel: 'View',
        amenitiesLabel: 'Includes',
        bookCta: 'Book this room',
        note: 'The WhatsApp message comes pre-filled with this room\'s details.'
      },
      double: {
        name: 'Double',
        countLabel: '9 available',
        capacity: 'For 2 guests',
        body: 'A matrimonial or twin bed, Queen or King sommier. Private bathroom. For couples or travellers who want comfort without excess.',
        bath: 'Private bathroom with high-pressure shower.',
        view: 'Available on the upper floor (Quebrada view) or the ground floor (inner patio). State your preference when booking.',
        amenities: ['WiFi', 'Heating', 'Queen or King sommier', 'Quality linen', 'Amenities'],
        bookingMessage: 'Hello Ricardo, I would like to check availability for a Double room at Refugio del Pintor.'
      },
      triple: {
        name: 'Triple',
        countLabel: '3 available',
        capacity: 'For 3 guests',
        body: 'Three single beds with sommier. Private bathroom. For groups of friends or small families.',
        bath: 'Private bathroom with high-pressure shower.',
        view: 'Available on the upper floor (Quebrada view) or the ground floor (inner patio). State your preference when booking.',
        amenities: ['WiFi', 'Heating', 'Three single sommiers', 'Quality linen', 'Amenities'],
        bookingMessage: 'Hello Ricardo, I would like to check availability for a Triple room at Refugio del Pintor.'
      },
      family: {
        name: 'Family',
        countLabel: '1 available',
        capacity: 'Up to 5 guests',
        body: 'Two connected spaces: the first with three twin beds, the second with a matrimonial bed. A shared bathroom between them. For families who need room without losing intimacy.',
        bath: 'A shared bathroom between the two spaces.',
        view: 'Available on the upper floor (Quebrada view) or the ground floor (inner patio). State your preference when booking.',
        amenities: ['WiFi', 'Heating', 'Three twin + matrimonial', 'Quality linen', 'Amenities'],
        bookingMessage: 'Hello Ricardo, I would like to check availability for the Family room at Refugio del Pintor.'
      },
      floorsHeading: 'Floors and views',
      upperLabel: 'Upper floor',
      upperBody: 'Looks toward the Quebrada. Mountains, open sky, sunsets that change colour by the minute.',
      lowerLabel: 'Ground floor',
      lowerBody: 'Opens onto the inner patio. More sheltered, green, quiet.'
    },
    services: {
      kicker: 'Services',
      heading: 'What you need, done well.',
      items: [
        { title: 'Private bathroom', body: 'In every room, with proper shower pressure.' },
        { title: 'Heating', body: 'For the cold Quebrada nights.' },
        { title: 'WiFi', body: 'Throughout the refuge.' },
        { title: 'Queen or King sommier', body: 'Beds that hold up to late nights and naps.' },
        { title: 'Quality linen', body: 'Sheets and towels that feel right.' },
        { title: 'Amenities', body: 'What you actually need, no absurd kits.' }
      ]
    },
    breakfast: {
      kicker: 'Breakfast',
      heading: 'Breakfast included',
      body: 'Homemade buffet every morning, included with your stay.'
    },
    gallery: {
      kicker: 'Gallery',
      heading: 'The refuge, in images.',
      lead: 'Adobe, stone, timber, northern textiles. And the Quebrada behind it all.'
    },
    reviews: {
      kicker: 'Voices',
      heading: 'What guests say after they leave.',
      lead: 'Verified Google reviews.',
      items: [
        {
          quote: 'Excellent attention from the hosts. Breakfast was great, the orange juice exquisite. I would return without a doubt.',
          author: 'Melisa Daniela Díaz Aban',
          context: 'Holiday · Friends',
          rating: '5/5'
        },
        {
          quote: 'Very picturesque hotel. The bathroom is excellent and the shower water is a marvel. The service is incredible. Thank you Patricia, Nora and Juan.',
          author: 'Gabriela PP',
          context: 'Holiday · Solo',
          rating: '5/5'
        },
        {
          quote: 'Charming place, very warm and comfortable. The attention from everyone is excellent. Breakfast exquisite, all homemade. Highly recommended.',
          author: 'Delfina del Castillo',
          context: 'Google',
          rating: '5/5'
        }
      ]
    },
    location: {
      kicker: 'Find us',
      heading: 'Alverro 660, Tilcara.',
      body: 'A short walk from the village centre and main square. If you come by car, parking is nearby. If you come by bus, the terminal is an 8-minute walk away.',
      mapCta: 'Open in Google Maps',
      coords: '23°34′37″S 65°23′41″W'
    },
    booking: {
      kicker: 'Book',
      heading: 'No platforms. No commissions. Just WhatsApp.',
      body1: 'The Refugio does not work through booking platforms. Communication and reservations go directly through WhatsApp.',
      body2: 'This is not a limitation, it is a choice. Ricardo prefers the personal exchange, knowing who is coming, answering in his own voice. Booking is as simple as sending a message.',
      cta: 'Message on WhatsApp',
      note: 'Personal reply, usually within the day.',
      messageTemplate: 'Hello Ricardo, I would like to check availability at Refugio del Pintor.'
    },
    footer: {
      tagline: 'Not a hotel. A refuge.',
      contactHeading: 'Contact',
      addressLabel: 'Address',
      address: 'Alverro 660, Y4624 Tilcara, Jujuy, Argentina',
      whatsappLabel: 'WhatsApp',
      whatsappDisplay: '+54 9 3884 38-5736',
      phoneLabel: 'Phone',
      phoneDisplay: '+54 388 438-5736',
      instagramLabel: 'Instagram',
      instagramHandle: '@delpintorrefugio',
      copyright: '© Refugio del Pintor · Tilcara, Quebrada de Humahuaca',
      creditLine: 'Made with respect for the landscape.'
    },
    alt: {
      hero: 'Entrance to Refugio del Pintor with carved wooden sign',
      patio: 'Inner patio with iron table and wicker chair against adobe walls',
      exterior: 'Stone and timber facade with the Quebrada mountains beyond',
      roomDouble: 'Upper-floor double room overlooking the Quebrada at sunset',
      roomTriple: 'Triple room with ochre walls and woven Andean bedcovers',
      roomFamily: 'Bed with Andean pillow and view of the Tilcara hills',
      interiorStone: 'Stone-walled sitting room with wooden furniture',
      diningRoom: 'Dining room with ochre walls, wood-burning stove and wooden tables'
    }
  }
};

function i18nGet(lang, path) {
  const dict = I18N[lang] || I18N.es;
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), dict);
}

window.I18N = I18N;
window.i18nGet = i18nGet;
