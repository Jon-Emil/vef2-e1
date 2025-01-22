import { el } from "./lib/elements.js";
import fs from "node:fs/promises" ;
import path from "node:path";
import { makeDir, makeFile } from './lib/makeFiles.js';

async function readJson(fileName) {
    const fileURL = `./data/${fileName}`;
    console.log("reading: ", fileURL);
    try {
        const data = await fs.readFile(path.resolve(fileURL), 'utf-8');
        return JSON.parse(data);
      } catch (error) {
        console.error(`Error reading file at ${fileURL}: `, error.message);
        return null;
      }
}

async function main() {
    const indexData = await readJson("index.json")

    if (!Array.isArray(indexData)) {
        console.error('index.json is not an array. Check the file format.');
        return [];
      }

    const allData = await Promise.all(
        indexData.map(async (item) => {
          const fileName = item.file;
          const fileData = await readJson(fileName);
          return fileData ? { ...item, content: fileData } : null;
        }),
      );

    const filtered = []
    allData.forEach(item => {
            if(item) {
                if(item.content.questions) {
                    filtered.push(item);
                    return
                }
                console.error("question is null")
                return
            }
            console.error("invalid data")
        }
    )

    generateFiles(filtered);
}


async function generateFiles(contentData) {

    await makeDir("./dist");

    makeFile(generateIndexContent(contentData), "index", "index.html", "./dist");
    contentData.forEach(item => {
        makeFile(generateContent(item), item.title, item.file.split(".")[0] + ".html", "./dist");
    })
    


}

function generateContent(data) {
    let body = `<h1>${data.title}<h1>`;
    const questions = data.content.questions;
    let questionNumber = 1;

    questions.forEach(item => {
        let question = `
        <h3>${item.question}</h3>
        <form>`;
        let answers = item.answers;
        console.log(answers)
        let answerGroup = `${data.title}${questionNumber}`

        try {answers.forEach(option => {
            question = question + `
                <label>
                    <input type="radio" name="${answerGroup}" class="${option.correct}"> ${option.answer}
                </label><br>`
        });
        questionNumber++;
        body = body + question;
        }
        catch(e){
            console.error("invalid question");
        }
    })

    return body
}

function generateIndexContent(data) {
    let body = "<h1>Index<h1>";

    data.forEach(item => {
        const section = `
          <a href="./${item.file.split(".")[0] + ".html"}">${item.title}<a>`;
        body = body + section;
    });

    return body;
}

main();