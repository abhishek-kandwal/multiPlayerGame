module.exports = (express, dir) => {
    const app = express();
    app.get('/', (req, res) => {
        res.sendFile(dir + '/views/index.html');
    });
    app.listen(3000, () => console.log('serving FE'));
}