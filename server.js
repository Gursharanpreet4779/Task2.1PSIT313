const api_key = '0ea438c8f8195647097a964a95ea79e7-2b755df8-f5bbad18';
const domain = 'sandbox312fab98549245708434b50829f1e31c.mailgun.org';
const mg = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'gursharanpreet4779.be23@chitkara.edu.in',
        to: email,
        subject: 'Welcome to Deakin!',
        text: 'Welcome to Deakin subscription',
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent:", body);
            res.send("Your email was sent successfully");
        }
    });
});

const port = process.env.PORT || 8050;
app.listen(port, () => {
    console.log(`Server is running at port ${port}!!!`);
});
