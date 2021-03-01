import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';

/* AWS Amplify */
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';
import { Auth, Hub } from 'aws-amplify';

import { Provider, useStore } from 'react-redux'
import { createStore } from 'redux'
import axios from 'axios';
import { refresh } from 'ionicons/icons';

Amplify.configure(awsconfig);

function display()
{

    Auth.currentUserInfo()
    .then(data => {
        if (data) {
            let user = data.attributes;
            user.premium = {
                "boulangerie": false,
                "patisserie": false,
            };
            user.aws_id = data.username;
            user.endpoint = "https://mtsqmmjcs3.execute-api.eu-central-1.amazonaws.com/dev";
            user.apiKey = "4hCTz2V9DW1W8rpeIk9r4v8lGKrQXOC4GdwZpXUi";
            user.quizApi = 'http://15.188.52.134/api/recursive?parent_id=0';
            user.publicUrl = 'http://15.188.52.134/';
            user.quiz = [
                {
                    "id": 2,
                    "title": "Boulangerie",
                    "desc": null,
                    "pid": "0",
                    "dirkey": "000002",
                    "level": "1",
                    "type": null,
                    "created_at": "2021-02-22 08:30:48",
                    "updated_at": "2021-02-22 08:30:48",
                    "child_count": 1,
                    "is_passed": 0,
                    "children": [
                        {
                            "id": 3,
                            "title": "group 1",
                            "desc": null,
                            "pid": "2",
                            "dirkey": "000002000003",
                            "level": "2",
                            "type": null,
                            "created_at": "2021-02-22 08:31:14",
                            "updated_at": "2021-02-22 08:31:14",
                            "child_count": 2,
                            "is_passed": 0,
                            "children": [
                                {
                                    "id": 6,
                                    "title": "Le développement des micro-organismes",
                                    "desc": null,
                                    "pid": "3",
                                    "dirkey": "000002000003000006",
                                    "level": "3",
                                    "type": 1,
                                    "created_at": "2021-02-22 08:43:16",
                                    "updated_at": "2021-02-22 08:43:16",
                                    "image": "uploads/61405286_1228433670667353_1701909305327878144_n.jpg",
                                    "child_count": 1,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 8,
                                            "title": "De quoi ont besoin les micro-organismes (M.O) pour vivre et se développer ?",
                                            "desc": "Faux reportez-vous à la page 40 de la BD.",
                                            "pid": "6",
                                            "dirkey": "000002000003000006000008",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-22 08:45:59",
                                            "updated_at": "2021-02-22 08:48:01",
                                            "answers": {
                                                "id": 1,
                                                "directory_id": 8,
                                                "options": "[\"De chaleur\",\"De nourriture.\",\"De salaison.\"]",
                                                "answers": "[\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez-vous à la page 40 de la BD.",
                                                "created_at": "2021-02-22 08:45:59",
                                                "updated_at": "2021-02-22 08:48:01"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                },
                                {
                                    "id": 7,
                                    "title": "examen 1",
                                    "desc": null,
                                    "pid": "3",
                                    "dirkey": "000002000003000007",
                                    "level": "3",
                                    "type": 2,
                                    "created_at": "2021-02-22 08:43:59",
                                    "updated_at": "2021-02-22 08:43:59",
                                    "image": "uploads/61405286_1228433670667353_1701909305327878144_n.jpg",
                                    "child_count": 0,
                                    "is_passed": 0
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 9,
                    "title": "Pâtisserie",
                    "desc": null,
                    "pid": "0",
                    "dirkey": "000009",
                    "level": "1",
                    "type": null,
                    "created_at": "2021-02-24 14:08:12",
                    "updated_at": "2021-02-24 14:08:12",
                    "child_count": 2,
                    "is_passed": 0,
                    "children": [
                        {
                            "id": 10,
                            "title": "GROUP 1",
                            "desc": null,
                            "pid": "9",
                            "dirkey": "000009000010",
                            "level": "2",
                            "type": null,
                            "created_at": "2021-02-24 14:09:05",
                            "updated_at": "2021-02-24 14:09:05",
                            "child_count": 6,
                            "is_passed": 0,
                            "children": [
                                {
                                    "id": 11,
                                    "title": "RECEPTIONNER LES PRODUITS",
                                    "desc": null,
                                    "pid": "10",
                                    "dirkey": "000009000010000011",
                                    "level": "3",
                                    "type": 1,
                                    "created_at": "2021-02-24 14:11:25",
                                    "updated_at": "2021-02-24 14:11:25",
                                    "image": "uploads/image-receptionner-les-produits.jpg",
                                    "child_count": 2,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 12,
                                            "title": "Quels sont les outils de mesure de la masse en pâtisserie ?",
                                            "desc": "Faux reportez vous à la page 6 de la BD",
                                            "pid": "11",
                                            "dirkey": "000009000010000011000012",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:13:21",
                                            "updated_at": "2021-02-24 14:13:21",
                                            "answers": {
                                                "id": 2,
                                                "directory_id": 12,
                                                "options": "[\"La balance \\u00e9lectronique.\",\"La balance m\\u00e9canique.\",\"La balance romaine.\",\"La balance automatique.\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 6 de la BD",
                                                "created_at": "2021-02-24 14:13:21",
                                                "updated_at": "2021-02-24 14:13:21"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 13,
                                            "title": "RECEPTIONNER LES PRODUITS",
                                            "desc": "Faux reportez vous à la page 7 de la BD",
                                            "pid": "11",
                                            "dirkey": "000009000010000011000013",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:17:14",
                                            "updated_at": "2021-02-24 14:17:14",
                                            "answers": {
                                                "id": 3,
                                                "directory_id": 13,
                                                "options": "[\"Thermom\\u00e8tre \\u00e0 mercure.\",\"Thermom\\u00e8tre infrarouge.\",\"Thermom\\u00e8tre \\u00e9lectronique.\",\"Thermom\\u00e8tre \\u00e0 sonde.\"]",
                                                "answers": "[\"1\",\"0\",\"0\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 7 de la BD",
                                                "created_at": "2021-02-24 14:17:14",
                                                "updated_at": "2021-02-24 14:17:14"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                },
                                {
                                    "id": 14,
                                    "title": "L ÉTIQUETAGE",
                                    "desc": null,
                                    "pid": "10",
                                    "dirkey": "000009000010000014",
                                    "level": "3",
                                    "type": 1,
                                    "created_at": "2021-02-24 14:19:41",
                                    "updated_at": "2021-02-24 14:19:41",
                                    "image": "uploads/image-L'étiquetage.jpg",
                                    "child_count": 6,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 15,
                                            "title": "Quelles sont les 3 grandes catégories de dates de consommation ?",
                                            "desc": "Faux reportez vous à la page 9 de la BD",
                                            "pid": "14",
                                            "dirkey": "000009000010000014000015",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:21:43",
                                            "updated_at": "2021-02-24 14:21:43",
                                            "answers": {
                                                "id": 4,
                                                "directory_id": 15,
                                                "options": "[\"DLC : Date Limite de Consommation.\",\"DDM : Date de Durabilit\\u00e9 Minimum.\",\"DCR : Date de Consommation Recommand\\u00e9e.\",\"DCI : Date de Consommation Indiqu\\u00e9e.\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous à la page 9 de la BD",
                                                "created_at": "2021-02-24 14:21:43",
                                                "updated_at": "2021-02-24 14:21:43"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 16,
                                            "title": "Quels produits ne mettons pas en réserve sèche (20°C) ?",
                                            "desc": "Faux reportez vous à la page 26 de la BD",
                                            "pid": "14",
                                            "dirkey": "000009000010000014000016",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:23:47",
                                            "updated_at": "2021-02-24 14:23:47",
                                            "answers": {
                                                "id": 5,
                                                "directory_id": 16,
                                                "options": "[\"Produits sensibles \\u00e0 l\\u2019humidit\\u00e9 (chocolat).\",\"Produits st\\u00e9rilis\\u00e9s (lait et cr\\u00e8me UHT...).\",\"Produits frais viandes, ovoproduits).\",\"Produits secs (farine, sucre etc...).\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 26 de la BD",
                                                "created_at": "2021-02-24 14:23:47",
                                                "updated_at": "2021-02-24 14:23:47"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 17,
                                            "title": "Quels produits ne mettons pas au froid positif (2 à 6 °C) ?",
                                            "desc": "Faux reportez vous à la page26 de la BD",
                                            "pid": "14",
                                            "dirkey": "000009000010000014000017",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:25:12",
                                            "updated_at": "2021-02-24 14:25:12",
                                            "answers": {
                                                "id": 6,
                                                "directory_id": 17,
                                                "options": "[\"Produits sensibles \\u00e0 l\\u2019humidit\\u00e9     (chocolat...).\",\"Produits secs  farine, sel).\",\"Produits sensibles (beurre, lait cru ...).\",\"Produits frais (\\u0153ufs, fruits...).\"]",
                                                "answers": "[\"1\",\"1\",\"0\",\"0\"]",
                                                "comment": "Faux reportez vous à la page26 de la BD",
                                                "created_at": "2021-02-24 14:25:12",
                                                "updated_at": "2021-02-24 14:25:12"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 18,
                                            "title": "La conformité de la livraison est validée en comparant ?",
                                            "desc": "Faux reportez-vous à la page 11 de la BD",
                                            "pid": "14",
                                            "dirkey": "000009000010000014000018",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:26:38",
                                            "updated_at": "2021-02-24 14:26:38",
                                            "answers": {
                                                "id": 7,
                                                "directory_id": 18,
                                                "options": "[\"Le bon de commande.\",\"Le bon de livraison.\",\"Le stock en r\\u00e9serve.\",\"La marchandise livr\\u00e9e.\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez-vous à la page 11 de la BD",
                                                "created_at": "2021-02-24 14:26:38",
                                                "updated_at": "2021-02-24 14:26:38"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 20,
                                            "title": "Quelles mentions apparaissent sur l’étiquetage de marchandise (1ere partie) ?",
                                            "desc": "Faux reportez vous à la page 12 de la BD",
                                            "pid": "14",
                                            "dirkey": "000009000010000014000020",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:28:31",
                                            "updated_at": "2021-02-24 14:30:40",
                                            "answers": {
                                                "id": 8,
                                                "directory_id": 20,
                                                "options": "[\"La d\\u00e9nomination de vente qui d\\u00e9finit le produit.\",\"L\\u2019identification du fabricant.\",\"Le prix de vente.\",\"La date de consommation pour les denr\\u00e9es alimentaires (DLC, DDM, DCR).\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 12 de la BD",
                                                "created_at": "2021-02-24 14:29:01",
                                                "updated_at": "2021-02-24 14:30:40"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 22,
                                            "title": "Quelles mentions apparaissent sur l’étiquetage de marchandises (2 ème partie) ?",
                                            "desc": "Faux reportez-vous à la page 12 de la BD",
                                            "pid": "14",
                                            "dirkey": "000009000010000014000022",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:33:11",
                                            "updated_at": "2021-02-24 18:52:35",
                                            "answers": {
                                                "id": 11,
                                                "directory_id": 22,
                                                "options": "[\"Pour les produits d\\u2019origine animale, l\\u2019estampille des services v\\u00e9t\\u00e9rinaires (ou estampille de salubrit\\u00e9).\",\"La recette d'utilisation.\",\"Le num\\u00e9ro du lot de fabrication, \\u00e0 des fins de tra\\u00e7abilit\\u00e9.\\u00a0\",\"La liste des ingr\\u00e9dients mis en \\u0153uvre par ordre d\\u2019importance d\\u00e9croissante, (y compris les additifs et les ar\\u00f4mes).\\u00a0\"]",
                                                "answers": "[\"0\",\"1\",\"0\",\"0\"]",
                                                "comment": "Faux reportez-vous à la page 12 de la BD",
                                                "created_at": "2021-02-24 14:33:55",
                                                "updated_at": "2021-02-24 18:52:35"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                },
                                {
                                    "id": 24,
                                    "title": "LES DIFFERENTS TYPES D'EMBALLAGE ET DE CONDITIONNEMENT",
                                    "desc": null,
                                    "pid": "10",
                                    "dirkey": "000009000010000024",
                                    "level": "3",
                                    "type": 1,
                                    "created_at": "2021-02-24 14:50:57",
                                    "updated_at": "2021-02-24 14:50:57",
                                    "image": "uploads/Copie de image-les-différents-types-d’emballage.jpg",
                                    "child_count": 5,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 25,
                                            "title": "Quelles sont les différentes formes de suremballage ?",
                                            "desc": "Faux reportez vous à la page 13 de la BD",
                                            "pid": "24",
                                            "dirkey": "000009000010000024000025",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:52:55",
                                            "updated_at": "2021-02-24 14:52:55",
                                            "answers": {
                                                "id": 12,
                                                "directory_id": 25,
                                                "options": "[\"Emballage en plastique souple\\u00a0\",\"Film plastique\\u00a0\",\"Aluminium\",\"Carton\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 13 de la BD",
                                                "created_at": "2021-02-24 14:52:55",
                                                "updated_at": "2021-02-24 14:52:55"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 26,
                                            "title": "Quelles sont les différentes formes d’emballages ?",
                                            "desc": "Faux reportez vous de la page 14 à 16 de la BD",
                                            "pid": "24",
                                            "dirkey": "000009000010000024000026",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:55:05",
                                            "updated_at": "2021-02-24 14:55:05",
                                            "answers": {
                                                "id": 13,
                                                "directory_id": 26,
                                                "options": "[\"Les paniers en osier.\",\"Les emballages plastiques souples.\",\"Les barquettes.\",\"Le papier multicouche.\"]",
                                                "answers": "[\"1\",\"0\",\"0\",\"0\"]",
                                                "comment": "Faux reportez vous de la page 14 à 16 de la BD",
                                                "created_at": "2021-02-24 14:55:05",
                                                "updated_at": "2021-02-24 14:55:05"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 27,
                                            "title": "Quels sont les enjeux de la gestion des déchets ?",
                                            "desc": "Faux reportez-vous à la page 18 de la BD",
                                            "pid": "24",
                                            "dirkey": "000009000010000024000027",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 14:56:28",
                                            "updated_at": "2021-02-24 18:45:39",
                                            "answers": {
                                                "id": 14,
                                                "directory_id": 27,
                                                "options": "[\"Certains polluent la nature et de fa\\u00e7on indirecte, les aliments que nous consommons.\\u00a0\",\"Les d\\u00e9chets non-organiques (plastique, verre...) ont une dur\\u00e9e de vie tr\\u00e8s longue conduisant \\u00e0 un probl\\u00e8me d\\u2019accumulation.\\u00a0\",\"Outre le volume des d\\u00e9chets qui s\\u2019accumulent, certains d\\u2019entre eux sont toxiques.\\u00a0\",\"Certains polluent notre odorat et nous cause des troubles gustatifs au moment de manger.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez-vous à la page 18 de la BD",
                                                "created_at": "2021-02-24 18:45:39",
                                                "updated_at": "2021-02-24 18:45:39"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 28,
                                            "title": "Quelle est la réglementation sur la gestion des déchets ?",
                                            "desc": "Faux reportez vous à la page 19 de la BD",
                                            "pid": "24",
                                            "dirkey": "000009000010000024000028",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 18:48:34",
                                            "updated_at": "2021-02-24 18:48:34",
                                            "answers": {
                                                "id": 15,
                                                "directory_id": 28,
                                                "options": "[\"Tout producteur ou d\\u00e9tenteur d\\u2019un d\\u00e9chet peut le d\\u00e9poser chez le voisin.\",\"Il est tenu d\\u2019en assurer ou d\\u2019en faire assurer la gestion.\\u00a0\",\"Tout producteur ou d\\u00e9tenteur d\\u2019un d\\u00e9chet est responsable de ce d\\u00e9chet.\\u00a0\"]",
                                                "answers": "[\"1\",\"0\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 19 de la BD",
                                                "created_at": "2021-02-24 18:48:34",
                                                "updated_at": "2021-02-24 18:48:34"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 29,
                                            "title": "Quelles sont les différentes formes de suremballage ?",
                                            "desc": "Faux reportez vous à la page 13 de la BD",
                                            "pid": "24",
                                            "dirkey": "000009000010000024000029",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 18:50:11",
                                            "updated_at": "2021-02-24 18:50:11",
                                            "answers": {
                                                "id": 16,
                                                "directory_id": 29,
                                                "options": "[\"Emballage en plastique souple\\u00a0\",\"Film plastique\\u00a0\",\"Carton\\u00a0\",\"Aluminium\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous à la page 13 de la BD",
                                                "created_at": "2021-02-24 18:50:11",
                                                "updated_at": "2021-02-24 18:50:11"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                },
                                {
                                    "id": 30,
                                    "title": "LA TRACABILITE",
                                    "desc": null,
                                    "pid": "10",
                                    "dirkey": "000009000010000030",
                                    "level": "3",
                                    "type": 1,
                                    "created_at": "2021-02-24 18:59:42",
                                    "updated_at": "2021-02-24 18:59:42",
                                    "image": "uploads/Copie de image-la-tracabilité.jpg",
                                    "child_count": 4,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 32,
                                            "title": "Quels sont les outils de la traçabilité ?",
                                            "desc": "Faux reportez vous à la page 23 et 24  de la BD",
                                            "pid": "30",
                                            "dirkey": "000009000010000030000032",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:03:27",
                                            "updated_at": "2021-02-24 19:03:27",
                                            "answers": {
                                                "id": 18,
                                                "directory_id": 32,
                                                "options": "[\"La conservation des bons de livraisons, des factures clients.\\u00a0\",\"La conservation des \\u00e9tiquettes des produits annot\\u00e9es des dates d\\u2019utilisation.\\u00a0\",\"Logiciel de gestion des stocks.\\u00a0\",\"La bonne foi des salari\\u00e9s.\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous à la page 23 et 24  de la BD",
                                                "created_at": "2021-02-24 19:03:27",
                                                "updated_at": "2021-02-24 19:03:27"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 33,
                                            "title": "Combien de temps une entreprise doit-elle conserver les documents de traçabilité.",
                                            "desc": "Faux reportez vous à la page 24 de la BD",
                                            "pid": "30",
                                            "dirkey": "000009000010000030000033",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:05:04",
                                            "updated_at": "2021-02-24 19:05:04",
                                            "answers": {
                                                "id": 19,
                                                "directory_id": 33,
                                                "options": "[\"Jusqu\\u2019\\u00e0 la vente du produit fabriqu\\u00e9\\u00a0\",\"Durant 6 mois apr\\u00e8s la\\u00a0la\\u00a0fabrication du produit.\",\"Durant 6 mois apr\\u00e8s la vente du produit fabriqu\\u00e9 (vrai)\\u00a0\",\"Jusqu\\u2019\\u00e0 la fin de la DLC \\/ DDM du produit fabriqu\\u00e9.\"]",
                                                "answers": "[\"1\",\"1\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous à la page 24 de la BD",
                                                "created_at": "2021-02-24 19:05:04",
                                                "updated_at": "2021-02-24 19:05:04"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 34,
                                            "title": "Qui à la charge de compléter la fiche de tracabilité interne :",
                                            "desc": "Faux reportez-vous à la page 24 de la BD",
                                            "pid": "30",
                                            "dirkey": "000009000010000030000034",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:09:42",
                                            "updated_at": "2021-02-24 19:09:42",
                                            "answers": {
                                                "id": 20,
                                                "directory_id": 34,
                                                "options": "[\"-chaque salari\\u00e9, sous la responsabilit\\u00e9 du chef d\\u2019entreprise.\",\"-chaque salari\\u00e9, sous sa propre responsabilit\\u00e9.\",\"Le commis au vivres.\"]",
                                                "answers": "[\"0\",\"1\",\"1\"]",
                                                "comment": "Faux reportez-vous à la page 24 de la BD",
                                                "created_at": "2021-02-24 19:09:42",
                                                "updated_at": "2021-02-24 19:09:42"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 35,
                                            "title": "Quels sont les rôles de la traçabilité ?",
                                            "desc": "Faux reportez vous à la page 22 de la BD",
                                            "pid": "30",
                                            "dirkey": "000009000010000030000035",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:13:58",
                                            "updated_at": "2021-02-24 19:13:58",
                                            "answers": {
                                                "id": 21,
                                                "directory_id": 35,
                                                "options": "[\"Elle permet de pr\\u00e9server la sant\\u00e9 des consommateurs et de limiter les pertes en cas de risque sanitaire.\\u00a0\",\"Elle permet de justifier un prix de vente \\u00e9lev\\u00e9 aupr\\u00e8s de la client\\u00e8le.\",\"La tra\\u00e7abilit\\u00e9 permet de d\\u00e9terminer l\\u2019origine des composants d\\u2019un produit.\\u00a0\"]",
                                                "answers": "[\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 22 de la BD",
                                                "created_at": "2021-02-24 19:13:58",
                                                "updated_at": "2021-02-24 19:13:58"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                },
                                {
                                    "id": 36,
                                    "title": "STOCKER LES MARCHANDISES",
                                    "desc": null,
                                    "pid": "10",
                                    "dirkey": "000009000010000036",
                                    "level": "3",
                                    "type": 1,
                                    "created_at": "2021-02-24 19:16:09",
                                    "updated_at": "2021-02-24 19:16:09",
                                    "image": "uploads/Copie de Copie de image-Stocker-les-marchandises.jpg",
                                    "child_count": 3,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 37,
                                            "title": "Quels sont les lieux de stockages ?",
                                            "desc": "Faux reportez-vous à la page 25 de la BD",
                                            "pid": "36",
                                            "dirkey": "000009000010000036000037",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:17:36",
                                            "updated_at": "2021-02-24 19:17:36",
                                            "answers": {
                                                "id": 22,
                                                "directory_id": 37,
                                                "options": "[\"La r\\u00e9serve s\\u00e8che.\\u00a0\",\"La r\\u00e9frig\\u00e9ration.\\u00a0\",\"Les espaces sous les plans de travail.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\",\"La cong\\u00e9lation.\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez-vous à la page 25 de la BD",
                                                "created_at": "2021-02-24 19:17:36",
                                                "updated_at": "2021-02-24 19:17:36"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 38,
                                            "title": "Quelles sont les matières premières stockées dans une réserve sèche ?",
                                            "desc": "Faux reportez-vous à la page 26 de la BD",
                                            "pid": "36",
                                            "dirkey": "000009000010000036000038",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:19:21",
                                            "updated_at": "2021-02-24 19:19:21",
                                            "answers": {
                                                "id": 23,
                                                "directory_id": 38,
                                                "options": "[\"Les produits UHT entam\\u00e9s.\\u00a0\",\"Les produits st\\u00e9rilis\\u00e9s avant leur ouverture : lait UHT, cr\\u00e8me UHT.\\u00a0\",\"Les boites de conserves.\\u00a0\",\"Farine, produits sucrant (sucre semoule, fondant, glucose...), sel, fruits ol\\u00e9agineux et d\\u00e9riv\\u00e9s (amande en poudre, hach\\u00e9, pralin\\u00e9...), poudre \\u00e0 lever, chocolat...\\u00a0\"]",
                                                "answers": "[\"1\",\"0\",\"0\",\"0\"]",
                                                "comment": "Faux reportez-vous à la page 26 de la BD",
                                                "created_at": "2021-02-24 19:19:21",
                                                "updated_at": "2021-02-24 19:19:21"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 39,
                                            "title": "Quelles sont les matières premières stockées dans une réserve réfrigérée ?",
                                            "desc": "Faux reportez vous à la page 26 de la BD",
                                            "pid": "36",
                                            "dirkey": "000009000010000036000039",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:20:52",
                                            "updated_at": "2021-02-24 19:20:52",
                                            "answers": {
                                                "id": 24,
                                                "directory_id": 39,
                                                "options": "[\"Les produits entam\\u00e9s : lait, conserves, nappage...\\u00a0\",\"Les produits frais : fruits, l\\u00e9gumes...\\u00a0\",\"Les produits en conserves.\",\"Les marchandises crues ou pasteuris\\u00e9es : lait cru ou pasteuris\\u00e9, cr\\u00e8me fra\\u00eeche ou crue, \\u0153ufs et ovoproduits, beurre, margarine.\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 26 de la BD",
                                                "created_at": "2021-02-24 19:20:52",
                                                "updated_at": "2021-02-24 19:20:52"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                },
                                {
                                    "id": 40,
                                    "title": "EXAMEN 1",
                                    "desc": null,
                                    "pid": "10",
                                    "dirkey": "000009000010000040",
                                    "level": "3",
                                    "type": 2,
                                    "created_at": "2021-02-24 19:22:28",
                                    "updated_at": "2021-02-24 19:22:28",
                                    "image": "uploads/Copie de image-la-tracabilité.jpg",
                                    "child_count": 11,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 41,
                                            "title": "Quels sont les outils de mesure de la masse en pâtisserie ?",
                                            "desc": "Faux reportez vous à la page 6 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000041",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:24:35",
                                            "updated_at": "2021-02-24 19:24:35",
                                            "answers": {
                                                "id": 25,
                                                "directory_id": 41,
                                                "options": "[\"La balance automatique.\",\"La balance m\\u00e9canique.\",\"La balance romaine.\",\"La balance \\u00e9lectronique.\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 6 de la BD",
                                                "created_at": "2021-02-24 19:24:35",
                                                "updated_at": "2021-02-24 19:24:35"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 42,
                                            "title": "Quelles sont les 3 grandes catégories de dates de consommation ?",
                                            "desc": "Faux reportez vous à la page 9 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000042",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:26:08",
                                            "updated_at": "2021-02-24 19:26:08",
                                            "answers": {
                                                "id": 26,
                                                "directory_id": 42,
                                                "options": "[\"DLC : Date Limite de Consommation.\",\"DDM : Date de Durabilit\\u00e9 Minimum.\",\"DCR : Date de Consommation Recommand\\u00e9e.\",\"DCI : Date de Consommation Indiqu\\u00e9e.\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous à la page 9 de la BD",
                                                "created_at": "2021-02-24 19:26:08",
                                                "updated_at": "2021-02-24 19:26:08"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 43,
                                            "title": "Quels produits ne mettons pas au froid positif (2 à 6 °C) ?",
                                            "desc": "Faux reportez vous à la page26 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000043",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:27:51",
                                            "updated_at": "2021-02-24 19:27:51",
                                            "answers": {
                                                "id": 27,
                                                "directory_id": 43,
                                                "options": "[\"Produits secs  farine, sel).\",\"Produits sensibles \\u00e0 l\\u2019humidit\\u00e9     (chocolat...).\",\"Produits sensibles (beurre, lait cru ...).\",\"Produits frais (\\u0153ufs, fruits...).\"]",
                                                "answers": "[\"1\",\"1\",\"0\",\"0\"]",
                                                "comment": "Faux reportez vous à la page26 de la BD",
                                                "created_at": "2021-02-24 19:27:51",
                                                "updated_at": "2021-02-24 19:27:51"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 44,
                                            "title": "Quelles mentions apparaissent sur l’étiquetage de marchandise (1ere partie) ?",
                                            "desc": "Faux reportez vous à la page 12 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000044",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:29:47",
                                            "updated_at": "2021-02-24 19:29:47",
                                            "answers": {
                                                "id": 28,
                                                "directory_id": 44,
                                                "options": "[\"La d\\u00e9nomination de vente qui d\\u00e9finit le produit.\\u00a0\",\"L\\u2019identification du fabricant.\\u00a0\",\"La date de consommation pour les denr\\u00e9es alimentaires (DLC, DDM, DCR).\\u00a0\",\"Le prix de vente.\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous à la page 12 de la BD",
                                                "created_at": "2021-02-24 19:29:47",
                                                "updated_at": "2021-02-24 19:29:47"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 45,
                                            "title": "Quelles mentions apparaissent sur l’étiquetage de marchandises (2 ème partie) ?",
                                            "desc": "Faux reportez-vous à la page 12 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000045",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:31:30",
                                            "updated_at": "2021-02-24 19:31:30",
                                            "answers": {
                                                "id": 29,
                                                "directory_id": 45,
                                                "options": "[\"Le num\\u00e9ro du lot de fabrication, \\u00e0 des fins de tra\\u00e7abilit\\u00e9.\\u00a0\",\"La recette d'utilisation.\",\"La liste des ingr\\u00e9dients mis en \\u0153uvre par ordre d\\u2019importance d\\u00e9croissante, (y compris les additifs et les ar\\u00f4mes).\\u00a0\",\"Pour les produits d\\u2019origine animale, l\\u2019estampille des services v\\u00e9t\\u00e9rinaires (ou estampille de salubrit\\u00e9).\"]",
                                                "answers": "[\"0\",\"1\",\"0\",\"0\"]",
                                                "comment": "Faux reportez-vous à la page 12 de la BD",
                                                "created_at": "2021-02-24 19:31:30",
                                                "updated_at": "2021-02-24 19:31:30"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 46,
                                            "title": "Quelles sont les différentes formes de suremballage ?",
                                            "desc": "Faux reportez vous à la page 13 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000046",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:32:55",
                                            "updated_at": "2021-02-24 19:32:55",
                                            "answers": {
                                                "id": 30,
                                                "directory_id": 46,
                                                "options": "[\"Emballage en plastique souple\\u00a0\",\"Film plastique\\u00a0\",\"Carton\\u00a0\",\"Aluminium\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous à la page 13 de la BD",
                                                "created_at": "2021-02-24 19:32:55",
                                                "updated_at": "2021-02-24 19:32:55"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 47,
                                            "title": "Quels sont les enjeux de la gestion des déchets ?",
                                            "desc": "Faux reportez-vous à la page 18 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000047",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:34:13",
                                            "updated_at": "2021-02-24 19:34:13",
                                            "answers": {
                                                "id": 31,
                                                "directory_id": 47,
                                                "options": "[\"Les d\\u00e9chets non-organiques (plastique, verre...) ont une dur\\u00e9e de vie tr\\u00e8s longue conduisant \\u00e0 un probl\\u00e8me d\\u2019accumulation.\\u00a0\",\"Outre le volume des d\\u00e9chets qui s\\u2019accumulent, certains d\\u2019entre eux sont toxiques.\\u00a0\",\"Certains polluent notre odorat et nous cause des troubles gustatifs au moment de manger.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\",\"Certains polluent la nature et de fa\\u00e7on indirecte, les aliments que nous consommons.\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez-vous à la page 18 de la BD",
                                                "created_at": "2021-02-24 19:34:13",
                                                "updated_at": "2021-02-24 19:34:13"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 48,
                                            "title": "Quelle est la réglementation sur la gestion des déchets ?",
                                            "desc": "Faux reportez vous à la page 19 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000048",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:35:58",
                                            "updated_at": "2021-02-24 19:35:58",
                                            "answers": {
                                                "id": 32,
                                                "directory_id": 48,
                                                "options": "[\"Tout producteur ou d\\u00e9tenteur d\\u2019un d\\u00e9chet peut le d\\u00e9poser chez le voisin.\",\"Il est tenu d\\u2019en assurer ou d\\u2019en faire assurer la gestion.\\u00a0\",\"Tout producteur ou d\\u00e9tenteur d\\u2019un d\\u00e9chet est responsable de ce d\\u00e9chet.\\u00a0\"]",
                                                "answers": "[\"1\",\"0\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 19 de la BD",
                                                "created_at": "2021-02-24 19:35:58",
                                                "updated_at": "2021-02-24 19:35:58"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 49,
                                            "title": "Quels sont les rôles de la traçabilité ?",
                                            "desc": "Faux reportez vous à la page 22 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000049",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:37:06",
                                            "updated_at": "2021-02-24 19:37:06",
                                            "answers": {
                                                "id": 33,
                                                "directory_id": 49,
                                                "options": "[\"La tra\\u00e7abilit\\u00e9 permet de d\\u00e9terminer l\\u2019origine des composants d\\u2019un produit.\\u00a0\",\"Elle permet de justifier un prix de vente \\u00e9lev\\u00e9 aupr\\u00e8s de la client\\u00e8le.\",\"Elle permet de pr\\u00e9server la sant\\u00e9 des consommateurs et de limiter les pertes en cas de risque sanitaire.\\u00a0\"]",
                                                "answers": "[\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 22 de la BD",
                                                "created_at": "2021-02-24 19:37:06",
                                                "updated_at": "2021-02-24 19:37:06"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 50,
                                            "title": "Quels sont les outils de la traçabilité ?",
                                            "desc": "Faux reportez vous à la page 23 et 24  de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000050",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:38:44",
                                            "updated_at": "2021-02-24 19:38:44",
                                            "answers": {
                                                "id": 34,
                                                "directory_id": 50,
                                                "options": "[\"La conservation des bons de livraisons, des factures clients.\\u00a0\",\"La conservation des \\u00e9tiquettes des produits annot\\u00e9es des dates d\\u2019utilisation.\\u00a0\",\"La bonne foi des salari\\u00e9s.\",\"Logiciel de gestion des stocks.\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 23 et 24  de la BD",
                                                "created_at": "2021-02-24 19:38:44",
                                                "updated_at": "2021-02-24 19:38:44"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 51,
                                            "title": "Combien de temps une entreprise doit-elle conserver les documents de traçabilité.",
                                            "desc": "Faux reportez vous à la page 24 de la BD",
                                            "pid": "40",
                                            "dirkey": "000009000010000040000051",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:41:43",
                                            "updated_at": "2021-02-24 19:41:43",
                                            "answers": {
                                                "id": 35,
                                                "directory_id": 51,
                                                "options": "[\"Jusqu\\u2019\\u00e0 la fin de la DLC \\/ DDM du produit fabriqu\\u00e9.\",\"Durant 6 mois apr\\u00e8s la\\u00a0la\\u00a0fabrication du produit.\",\"Jusqu\\u2019\\u00e0 la vente du produit fabriqu\\u00e9\\u00a0\",\"Durant 6 mois apr\\u00e8s la vente du produit fabriqu\\u00e9 (vrai)\\u00a0\"]",
                                                "answers": "[\"1\",\"1\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 24 de la BD",
                                                "created_at": "2021-02-24 19:41:43",
                                                "updated_at": "2021-02-24 19:41:43"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": 52,
                            "title": "GROUP 2",
                            "desc": null,
                            "pid": "9",
                            "dirkey": "000009000052",
                            "level": "2",
                            "type": null,
                            "created_at": "2021-02-24 19:45:45",
                            "updated_at": "2021-02-24 19:45:45",
                            "child_count": 2,
                            "is_passed": 0,
                            "children": [
                                {
                                    "id": 53,
                                    "title": "LA CHAÎNE DU FROID",
                                    "desc": null,
                                    "pid": "52",
                                    "dirkey": "000009000052000053",
                                    "level": "3",
                                    "type": 1,
                                    "created_at": "2021-02-24 19:46:30",
                                    "updated_at": "2021-02-24 19:46:30",
                                    "image": "uploads/Copie de Copie de image-La-chaine-du-froid.jpg",
                                    "child_count": 3,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 54,
                                            "title": "Quel est le rôle de la chaîne du froid ?",
                                            "desc": "Faux reportez vous à la page 27 de la BD",
                                            "pid": "53",
                                            "dirkey": "000009000052000053000054",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:47:58",
                                            "updated_at": "2021-02-24 19:47:58",
                                            "answers": {
                                                "id": 36,
                                                "directory_id": 54,
                                                "options": "[\"Le froid limite voire arr\\u00eate la prolif\\u00e9ration des micro-organismes.\\u00a0\",\"Les produits p\\u00e9rissables doivent \\u00eatre maintenus \\u00e0 moins de 4 \\u00b0C.\\u00a0\",\"Le froid permet d\\u2019allonger la DLC d'un produit.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\",\"Maintenir les aliments r\\u00e9frig\\u00e9r\\u00e9s \\u00e0 une temp\\u00e9rature adapt\\u00e9e qui leur permet de conserver leurs qualit\\u00e9s nutritionnelles, organoleptiques et bact\\u00e9riologiques.\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"1\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 27 de la BD",
                                                "created_at": "2021-02-24 19:47:58",
                                                "updated_at": "2021-02-24 19:47:58"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 55,
                                            "title": "Quelles sont les origines des ruptures de la chaîne du froid ?",
                                            "desc": "Faux  reportez vous à la page 28 de la BD ",
                                            "pid": "53",
                                            "dirkey": "000009000052000053000055",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:49:35",
                                            "updated_at": "2021-02-24 19:49:35",
                                            "answers": {
                                                "id": 37,
                                                "directory_id": 55,
                                                "options": "[\"Marchandises laiss\\u00e9es \\u00e0 temp\\u00e9rature ambiante en attendant le stockage.\\u00a0\",\"Temp\\u00e9rature ext\\u00e9rieure trop chaude.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\",\"Pannes dues \\u00e0 un mat\\u00e9riel mal entretenu ou \\u00e0 des portes mal ferm\\u00e9es.\\u00a0\",\"Marchandises sorties trop t\\u00f4t.\\u00a0\"]",
                                                "answers": "[\"0\",\"1\",\"0\",\"0\"]",
                                                "comment": "Faux  reportez vous à la page 28 de la BD ",
                                                "created_at": "2021-02-24 19:49:35",
                                                "updated_at": "2021-02-24 19:49:35"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 56,
                                            "title": "Identifier les affirmations exactes, La chaine du froid : ",
                                            "desc": "Faux  reportez-vous à la page 27 de la BD",
                                            "pid": "53",
                                            "dirkey": "000009000052000053000056",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:50:45",
                                            "updated_at": "2021-02-24 19:50:45",
                                            "answers": {
                                                "id": 38,
                                                "directory_id": 56,
                                                "options": "[\"Ne concerne que les marchandises surgel\\u00e9es et congel\\u00e9s.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\",\"A pour objectif d\\u2019\\u00e9liminer tous les micro-organismes pathog\\u00e8nes.\\u00a0\",\"Permet de limiter le risque de d\\u00e9veloppement des micro-organismes.\",\"Est indispensable pour assurer la DLC \\/ DLUO des aliments.\"]",
                                                "answers": "[\"1\",\"1\",\"0\",\"0\"]",
                                                "comment": "Faux  reportez-vous à la page 27 de la BD",
                                                "created_at": "2021-02-24 19:50:45",
                                                "updated_at": "2021-02-24 19:50:45"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                },
                                {
                                    "id": 57,
                                    "title": "DECONDITIONNEMENT ET RESTOCKAGE DE MATIÈRE PREMIÈRE",
                                    "desc": null,
                                    "pid": "52",
                                    "dirkey": "000009000052000057",
                                    "level": "3",
                                    "type": 1,
                                    "created_at": "2021-02-24 19:52:24",
                                    "updated_at": "2021-02-24 19:52:24",
                                    "image": "uploads/Copie de Copie de image-Déconditionnement-et-restockage-de-matière-première.jpg",
                                    "child_count": 6,
                                    "is_passed": 0,
                                    "children": [
                                        {
                                            "id": 58,
                                            "title": "Qu’est-ce que le stock minimum ou d’alerte ?",
                                            "desc": "Faux reportez vous de la page 29 à 31 de la BD",
                                            "pid": "57",
                                            "dirkey": "000009000052000057000058",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:54:16",
                                            "updated_at": "2021-02-24 19:54:16",
                                            "answers": {
                                                "id": 39,
                                                "directory_id": 58,
                                                "options": "[\"Il est calcul\\u00e9 en multipliant la consommation journali\\u00e8re au nombre de clients.\",\"Il est calcul\\u00e9 en multipliant la consommation journali\\u00e8re par le d\\u00e9lai de livraison en jours.\\u00a0\",\"Il est calcul\\u00e9 en multipliant la consommation journali\\u00e8re par le prix d\\u2019achat.\"]",
                                                "answers": "[\"1\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous de la page 29 à 31 de la BD",
                                                "created_at": "2021-02-24 19:54:16",
                                                "updated_at": "2021-02-24 19:54:16"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 59,
                                            "title": "Quelles sont les conséquences d’une rupture de stock ?",
                                            "desc": "Faux reportez vous de la page 29 à 31 de la BD",
                                            "pid": "57",
                                            "dirkey": "000009000052000057000059",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:56:05",
                                            "updated_at": "2021-02-24 19:56:05",
                                            "answers": {
                                                "id": 40,
                                                "directory_id": 59,
                                                "options": "[\"La production risque d\\u2019\\u00eatre bloqu\\u00e9e.\",\"Cela va nuire au chiffre d\\u2019affaire.\",\"Mais aussi \\u00e0 l\\u2019image de l\\u2019entreprise.\\u00a0\",\"Le salari\\u00e9 fera moins d\\u2019heure.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous de la page 29 à 31 de la BD",
                                                "created_at": "2021-02-24 19:56:05",
                                                "updated_at": "2021-02-24 19:56:05"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 60,
                                            "title": "Quels sont les 3 contrôles à effectuer pour juger de la qualité des matières premières réceptionnées ?",
                                            "desc": "Faux reportez vous à la page 5 de la BD",
                                            "pid": "57",
                                            "dirkey": "000009000052000057000060",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 19:57:17",
                                            "updated_at": "2021-02-24 19:57:17",
                                            "answers": {
                                                "id": 41,
                                                "directory_id": 60,
                                                "options": "[\"Contr\\u00f4le des dates de conservation.\\u00a0\",\"Contr\\u00f4le de la qualit\\u00e9 gustative des produits.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\",\"Contr\\u00f4le de l\\u2019\\u00e9tat des emballages.\\u00a0\",\"Contr\\u00f4le de la temp\\u00e9rature des produits.\\u00a0\"]",
                                                "answers": "[\"0\",\"1\",\"0\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 5 de la BD",
                                                "created_at": "2021-02-24 19:57:17",
                                                "updated_at": "2021-02-24 19:57:17"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 62,
                                            "title": "Quels sont les produits alimentaires concernés par une DDM (date de durabilité minimum) ?",
                                            "desc": "Faux reportez vous à la page 9 de la BD",
                                            "pid": "57",
                                            "dirkey": "000009000052000057000062",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 20:00:20",
                                            "updated_at": "2021-02-24 20:00:20",
                                            "answers": {
                                                "id": 43,
                                                "directory_id": 62,
                                                "options": "[\"Beurre\",\"Sucre\",\"Farine\",\"Lait \\/ cr\\u00e8me cru.\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous à la page 9 de la BD",
                                                "created_at": "2021-02-24 20:00:20",
                                                "updated_at": "2021-02-24 20:00:20"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 63,
                                            "title": "Citez 3 types de déchets recyclables ?",
                                            "desc": "Faux reportez vous à la page 17 de la BD",
                                            "pid": "57",
                                            "dirkey": "000009000052000057000063",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 20:01:53",
                                            "updated_at": "2021-02-24 20:01:53",
                                            "answers": {
                                                "id": 44,
                                                "directory_id": 63,
                                                "options": "[\"Papier\\/carton.\",\"Polystyr\\u00e8ne\",\"Plastique\",\"M\\u00e9tal\"]",
                                                "answers": "[\"0\",\"1\",\"0\",\"0\"]",
                                                "comment": "Faux reportez vous à la page 17 de la BD",
                                                "created_at": "2021-02-24 20:01:53",
                                                "updated_at": "2021-02-24 20:01:53"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        },
                                        {
                                            "id": 64,
                                            "title": "Quelles informations doivent se trouver sur l’étiquette de traçabilité ?",
                                            "desc": "Faux reportez vous aux pages 22 et 23 de la BD",
                                            "pid": "57",
                                            "dirkey": "000009000052000057000064",
                                            "level": "4",
                                            "type": null,
                                            "created_at": "2021-02-24 20:03:17",
                                            "updated_at": "2021-02-24 20:03:17",
                                            "answers": {
                                                "id": 45,
                                                "directory_id": 64,
                                                "options": "[\"Nom du produit.\\u00a0\",\"Num\\u00e9ro de lot.\",\"Conditions de conservation.\\u00a0\",\"Date limite de consommation.\\u00a0\",\"Le mois et l\\u2019ann\\u00e9e de fabrication.\"]",
                                                "answers": "[\"0\",\"0\",\"0\",\"0\",\"1\"]",
                                                "comment": "Faux reportez vous aux pages 22 et 23 de la BD",
                                                "created_at": "2021-02-24 20:03:17",
                                                "updated_at": "2021-02-24 20:03:17"
                                            },
                                            "child_count": 0,
                                            "is_passed": 0
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];
            const setUser = (state = {}, action: any) => {
                state = action.user;
                return state;
            };
            const store = createStore(setUser);
            const setData = (userData: any) => ({
                type: 'SET_USER',
                id: 0,
                'user': userData});
            store.dispatch(setData(user));
            axios({
                method: 'get',
                url: user.endpoint + "/handleCode?aws_user_id=" + user.aws_id,
                headers: { 'x-api-key': user.apiKey }
            }).then(response => {
              if (response.data.boulangerie) {
                  const setData = (userData: any) => ({
                    type: 'SET_USER',
                    id: 0,
                    'user': userData});
                    user.premium = response.data;
                    store.dispatch(setData(user));
                    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
              }
            }).catch(err => {});
            ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
        } else {
            ReactDOM.render(<Login />, document.getElementById('root'))
        }
    })
    .catch(err => ReactDOM.render(<Login />, document.getElementById('root')));
}
// Listening for auth event and reload view acording to event : On log in, show app, On logout, show login page
Hub.listen('auth', (data) => {
    if (data.payload.data) {
        if (data.payload.event === "signIn") {
            axios({
                method: 'post',
                url: "https://mtsqmmjcs3.execute-api.eu-central-1.amazonaws.com/dev/handleuser",
                headers: { 'x-api-key': "4hCTz2V9DW1W8rpeIk9r4v8lGKrQXOC4GdwZpXUi" },
                data: {
                    "aws_id": data.payload.data.username,
                    "nickname": data.payload.data.attributes.nickname,
                    "phone": data.payload.data.attributes.phone_number,
                    "mail": data.payload.data.attributes.email,
                    "gender": 'monsieur',
                    "first_name": data.payload.data.attributes.name,
                    "last_name": data.payload.data.attributes.family_name,
                }
            }).then(response => {

            }).catch(err => {});
            // ReactDOM.render(<App />, document.getElementById('root'));
        }/** else if (data.payload.event === "signOut") {
            ReactDOM.render(<Login />, document.getElementById('root'))
        }**/
        display();
    }
});

display();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
