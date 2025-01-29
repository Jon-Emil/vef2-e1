import {mkdir, stat, writeFile} from 'fs/promises'
import {join} from 'path'

async function existsDir(dir) {
    if (!dir) {
        return false;
    }
    
    try {
        const info = await stat(dir);
        return info.isDir(); 
    }
    catch(e) {
        return false;
    }
}

export async function makeDir(dir) {
    if(!await existsDir(dir)) {
        return mkdir(dir);
    }
}

export async function makeFile(body, title, name, dir) {
  const filePath = `./${dir}/${name}`;
  const template = fileTemplate(title, body);

  await writeFile(filePath, template, { flag: 'w+' });
}

function fileTemplate(title, body) {
  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="styles.css" />
        <title>${title}</title>
        <script src="script.js"></script>
      </head>
      <body>
        <main>
          ${body}
        </main>
      </body>
    </html>`;
}