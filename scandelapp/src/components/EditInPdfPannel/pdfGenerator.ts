import { jsPDF } from "jspdf";
import base64code from "./templateB64"; // Assurez-vous que le chemin d'accès est correct

const data = [
    {
        lamp : "Lamp B3080-85U",
        action : "Changer ampoule (LED 60W)",
        place : "14 rue de Thomas Grelier 75015 Paris",
        notes : "Besoin de changer l'ampoule depuis son installation en 2018 par mesure de prévention. Prendre une ampolue LED 60W de type E27"
    },
    {
        lamp : "Lamp B3080-75E",
        action : "Changer les horaires d'utilisation",
        place : "12 rue de Vivien Bozo 75010 Paris",
        notes : "Besoin de changer les horaires d'utilisation de la lampe pour qu'elle s'allume à 19h et s'éteigne à 7h"
    }
];

const author = "M. Guy Claude";
const date = "20/04/2021";
const place = "Paris";

export async function generatePDFDocument() {
    var doc = new jsPDF();

    const base64Str = base64code;
    console.log(base64Str);

    doc.addImage(base64Str, "PNG", 0, 0, 210, 297);


    // boucle sur les datas pour remplir un tableau, chaque ligne correspond à un objet de data
    data.forEach((element, index) => {
        doc = setFontNormal(doc);
        doc.text(addBackLineIfNeeded(element.lamp, 10), 8, 77 + index * 21.5);
        doc.text(addBackLineIfNeeded(element.action, 25), 42, 77 + index * 21.5);
        doc = setFontForPlace(doc);
        doc.text(addBackLineIfNeeded(element.place, 12), 107, 76 + index * 21.5);
        doc.text(addBackLineIfNeeded(element.notes, 40), 133, 76 + index * 21.5);
    });

    // add author
    doc.setFontSize(15);
    doc.setFont("helvetica", "normal");;
    doc.text(addBackLineIfNeeded(author, 30), 140, 27);

    // add date
    doc.text(addBackLineIfNeeded(date, 30), 140, 35);

    // add place
    doc.setFont("helvetica", "bold");;
    doc.text(addBackLineIfNeeded("Scandela - " + place, 100), 25, 287);

    doc.save("a4.pdf");
}

function setFontNormal(doc : jsPDF) :jsPDF {
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");;
    return doc;
}

function setFontForPlace(doc : jsPDF) : jsPDF {
    doc.setFontSize(10);
    return doc;
}

function addBackLineIfNeeded(string : string, maxChar : number) : string {
    for (let i = 0; i < string.length; i++) {
        if (i % maxChar === 0 && i !== 0) {
            string = string.slice(0, i) + "\n" + string.slice(i);
        }
    }
    return string;
}