import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.render("home", { title: "Inicio" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/realTimeProducts", async (req, res) => {
    try {
        res.render("realTimeProducts", { title: "Productos en tiempo real" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/cartProducts", async (req, res) => {
    try {
        res.render("cartProducts", { title: "Carrito de compras" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/descripcionId/:id", async (req, res) => {
    try {
        res.render("descripcionId", { title: "Descripción del artículo" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});
export default router;