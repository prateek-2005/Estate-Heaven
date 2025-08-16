import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { connectDB } from './db.js'; 
import authUser from './Routes/Auth.js';

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use('/auth',authUser);

app.use(session({
  secret: 'uH9a#5E$3pY!8&xW2dVw*7R1aQmL0zXrF9Z8uSkqhsdhe',  
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: '352571414618-0pnt0b12ld5t1om0rot6jrvo5epg2k0l.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:8080/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);  
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'], 
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),  
  (req, res) => {
    res.redirect('http://localhost:5173/dashboard');  
  }
);

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  res.send(req.user); 
});

const startServer = async () => {
  try {
    console.log('Attempting to connect to the database...');
    await connectDB();
    console.log('Connected to DB successfully!');

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB:', err.message);
    process.exit(1);
  }
};

startServer();
