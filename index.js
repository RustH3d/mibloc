const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Para procesar datos del formulario
app.use(bodyParser.json()); // Para procesar JSON

const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave segura

// Objeto que simula localStorage
let users = {};

// Middleware para autenticar el token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(401); // No hay token, no autorizado

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Token no válido
        req.user = user; // Almacena la información del usuario en la solicitud
        next(); // Continúa con la siguiente función middleware
    });
}

// Ruta de inicio de sesión
app.get('/login', (req, res) => {
    res.send(`
        <html>
          <head>
            <title>Login</title>
          </head>
          <body>
            <h2>Iniciar Sesión</h2>
            <form action="/users/login" method="POST">
              <input type="text" name="username" placeholder="Nombre de usuario" required />
              <input type="password" name="password" placeholder="Contraseña" required />
              <button type="submit">Iniciar Sesión</button>
            </form>
          </body>
        </html>
    `);
});

// Ruta de registro
app.get('/register', (req, res) => {
    res.send(`
        <html>
          <head>
            <title>Registro</title>
          </head>
          <body>
            <h2>Registro</h2>
            <form action="/users/register" method="POST">
              <input type="text" name="username" placeholder="Nombre de usuario" required />
              <input type="email" name="email" placeholder="Correo electrónico" required />
              <input type="password" name="password" placeholder="Contraseña" required />
              <button type="submit">Registrarse</button>
            </form>
          </body>
        </html>
    `);
});

// Ruta para manejar el inicio de sesión
app.post('/users/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario existe y la contraseña es correcta
    const user = users[username];
    if (user && user.password === password) {
        // Generar el token
        const token = jwt.sign({ name: username }, SECRET_KEY);
        res.json({ token });
    } else {
        res.status(401).send('Credenciales inválidas');
    }
});

// Ruta para manejar el registro
app.post('/users/register', (req, res) => {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya está registrado
    if (users[username]) {
        return res.status(400).send('El usuario ya existe');
    }

    // Almacenar el usuario en "localStorage" (objeto en memoria)
    users[username] = { email, password };
    res.send(`Usuario ${username} registrado con éxito.`);
});

// Ruta protegida para obtener notas
app.get('/notes', authenticateToken, async (req, res) => {
    // Simulación de notas
    const notes = [
        { id: 1, content: 'Nota 1', user_id: req.user.name },
        { id: 2, content: 'Nota 2', user_id: req.user.name },
    ];
    res.json(notes.filter(note => note.user_id === req.user.name));
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

