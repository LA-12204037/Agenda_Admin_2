const corsOptions = {
    // Permite que cualquier origen acceda a la API
    origin: true,

    // Permite el envío de credenciales (cookies, headers de auth, etc.)
    credentials: true,

    // Métodos permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    // Headers permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],
};

export { corsOptions };
