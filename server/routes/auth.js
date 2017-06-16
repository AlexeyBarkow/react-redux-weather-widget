import { Router } from 'express';
import { passport } from '../passport';

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login'],
    }),
    (req, res) => {
        res.redirect('/');
    },
);
router.get('/fail', (req, res) => {
    res.send('fail');
});

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/fail',
    successRedirect: '/'
}));

router.get('/auth/logout',
    (req, res) => {
        req.logout();
        res.redirect('/');
    });
