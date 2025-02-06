import { describe, expect, it } from '@jest/globals';
import { existsDir, fileTemplate, makeDir } from './makeFiles';
import { resolve } from 'path';
import { mkdir, rmdir } from 'fs';
console.log("Jest working directory:", process.cwd());
describe('makeFiles', () => {
    describe('existsDir', () => {
      it('returns false if dir does not exist', async () => {
        const result = await existsDir('./does-not-exist');
        expect(result).toBe(false);
      });
  
      it('returns true if dir does exist', async () => {
        const result = await existsDir("./dist");
        expect(result).toBe(true);
      });
  
      it('returns false if no input', async () => {
        const result = await existsDir('');
        expect(result).toBe(false);
      });
    });

    describe('fileTemplate', () => {
        it('returns html code containing the specified title', () => {
            const result = fileTemplate("Title Is Correct", "something");
            expect(result).toContain("<title>Title Is Correct</title>")
        })

        it('returns html code containing the specified body', () => {
            const result = fileTemplate("something", "The body is correct");
            expect(result).toContain(`The body is correct`)
        })
    })
})