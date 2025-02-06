import fs from "node:fs/promises" ;
import path from "node:path";
import { makeDir, makeFile } from './lib/makeFiles.js';

export async function readJson(fileName) {
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
        <h3>${escapeHTML(item.question)}</h3>
        <form>`;
        let answers = item.answers;
        let answerGroup = `${data.title}${questionNumber}`

        try {answers.forEach(option => {
            if (option.answer !== undefined) {
                question = question + `
                    <label>
                        <input type="radio" name="${answerGroup}" class="${option.correct}"> ${escapeHTML(option.answer)} </input>
                    </label>`
            }
        });
        questionNumber++;
        body = body + question + `
        </form>`;
        }
        catch(e){
            console.error("invalid question", e);
        }
    })

    return body
}

export function generateIndexContent(data) {
    let body = `<h1>Index<h1>
                <ul>`;

    data.forEach(item => {
        const section = `
          <li><a href="./${item.file.split(".")[0] + ".html"}">${item.title}</a></li>`;
        body = body + section + `
        <ul>`;
    });

    return body;
}

export function escapeHTML(string) {
if (string) {
        return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    
}}

main();