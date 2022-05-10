import express from "express";
import { promises as fs } from "fs";

const { readFile } = fs;

const router = express.Router();

router.get("/maisModelos", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("car-list.json"));

    let maior = [];
    maior[0] = data[0];

    for (let i = 0; i < data.length; i++) {
      if (data[i].models.length > maior[0].models.length) {
        maior[0] = data[i];
      } else if (data[i].models.length == maior[0].length) {
        maior.push(data[i]);
        console.log("tem igual");
      }
    }

    if (maior.length > 1) {
      if (maior[0].models.length == maior[1].models.length) {
        console.log("tem igual");
        const maisModelos = maior.map((brands) => brands.brand);
        res.send(maisModelos);
      } else {
        console.log("não tem igual");
        maior.splice(1, 1);
        const maisModelos = maior.map((brands) => brands.brand);
        res.send(maisModelos);
      }
    } else {
      const maisModelos = maior.map((brands) => brands.brand);
      res.send(maisModelos);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/menosModelos", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("car-list.json"));

    let menor = [];
    menor[0] = data[0];

    for (let i = 0; i < data.length; i++) {
      if (data[i].models.length < menor[0].models.length) {
        menor[0] = data[i];
      } else if (data[i].models.length == menor[0].length) {
        menor.push(data[i]);
        console.log("tem igual");
      }
    }

    if (menor.length > 1) {
      if (menor[0].models.length == menor[1].models.length) {
        console.log("tem igual");
        const menosModelos = menor.map((brands) => brands.brand);
        res.send(menosModelos);
      } else {
        console.log("não tem igual");
        menor.splice(1, 1);
        const menosModelos = menor.map((brands) => brands.brand);
        res.send(menosModelos);
      }
    } else {
      const menosModelos = menor.map((brands) => brands.brand);
      res.send(menosModelos);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/listaMaisModelos/:id", async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const data = JSON.parse(await readFile("car-list.json"));

    if (id > data.length) {
      id = data.length;
    }

    data.sort((a, b) => {
      if (a.brand < b.brand) {
        return -1;
      }
      if (a.brand > b.brand) {
        return 1;
      }
    });

    data.sort((a, b) => {
      return b.models.length - a.models.length;
    });

    const nomesMarcas = data.map((brands) => brands.brand);
    const quantModelos = data.map((brands) => brands.models.length);
    const listaMaisModelos = [];
    for (let i = 0; i < id; i++) {
      listaMaisModelos[i] = `${nomesMarcas[i]} - ${quantModelos[i]}`;
    }
    res.send(listaMaisModelos);
  } catch (err) {
    next(err);
  }
});

router.get("/listaMenosModelos/:id", async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const data = JSON.parse(await readFile("car-list.json"));

    if (id > data.length) {
      id = data.length;
    }

    data.sort((a, b) => {
      if (a.brand < b.brand) {
        return -1;
      }
      if (a.brand > b.brand) {
        return 1;
      }
    });

    data.sort((a, b) => {
      return a.models.length - b.models.length;
    });

    const nomesMarcas = data.map((brands) => brands.brand);
    const quantModelos = data.map((brands) => brands.models.length);
    const listaMenosModelos = [];
    for (let i = 0; i < id; i++) {
      listaMenosModelos[i] = `${nomesMarcas[i]} - ${quantModelos[i]}`;
    }
    res.send(listaMenosModelos);
  } catch (err) {
    next(err);
  }
});

router.post("/listaModelos", async (req, res, next) => {
  try {
    const marca = req.body.nomeMarca.toUpperCase();
    const data = JSON.parse(await readFile("car-list.json"));

    let listaModelos = data.find((obj) => obj.brand.toUpperCase() === marca);

    listaModelos = listaModelos ? listaModelos.models : [];

    res.send(listaModelos);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
