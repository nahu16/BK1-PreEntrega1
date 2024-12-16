import { Router } from "express";
import DescriptionManager from "../managers/DescriptionManager.js";

const router = Router();
const descriptionManager = new DescriptionManager();

router.get("/", async (req, res) => {
    try {
        const descriptions = await descriptionManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: descriptions });
    } catch (error) {
        res.status(error.code || 500 ).json({ status:"error", message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const descriptions = await descriptionManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: descriptions });
    } catch (error) {
        res.status(error.code || 500 ).json({ status:"error", message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const descriptions = await descriptionManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: descriptions });
    } catch (error) {
        res.status(error.code || 500 ).json({ status:"error", message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const descriptions = await descriptionManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: "success", payload: descriptions });
    } catch (error) {
        res.status(error.code || 500 ).json({ status:"error", message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await descriptionManager.deleteOneById(req.params.id);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(error.code || 500 ).json({ status:"error", message: error.message });
    }
});

export default router;