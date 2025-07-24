import createApp from "./server-setup";

const app = createApp();

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
