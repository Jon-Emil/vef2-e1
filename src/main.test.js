import { describe, expect, it } from '@jest/globals';
import { readJson, generateIndexContent, escapeHTML } from './main';

describe('main', () => {
    describe('readJson', () => {
        it('should return null if no such file is in ./data', async () => {
            const result = await readJson('notARealFile');
            expect(result).toEqual(null);
        })

        it('should read valid JSONs', async () => {
            const result = await readJson("testing/1.json");
            expect(result).toEqual({title: 'Valid'});
        })
    })

    describe('generateIndexContent', () => {
        it('Should return template with a specific title', () => {
            const result = generateIndexContent([]);
            expect(result).toContain("<h1>Index<h1>");
        })

        it('Should create links to each .html file based on .json file names its given', () => {
            const result = generateIndexContent(
                [
                    {
                      "title": "HTML",
                      "file": "html.json"
                    },
                    {
                      "title": "CSS",
                      "file": "css.json"
                    }
                ]
            );
            expect(result).toContain("<a href=\"./html.html\">HTML</a>");
            expect(result).toContain("<a href=\"./css.html\">CSS</a>")
        })
    }) 

    describe("escapeHTML", () => {
        it('should change &, < and > with &amp, &lt and &gt', () => {
            const result = escapeHTML("& < >");
            expect(result).toEqual("&amp; &lt; &gt;");
        })

        it('should return an empty string when given an empty string', () => {
            const result = escapeHTML("");
            expect(result).toEqual("");
        })
    })
})