import {mkdir, stat, writeFile} from 'fs/promises'

export async function existsDir(dir) {
    if (!dir) {
        return false;
    }
    
    try {
        const info = await stat(dir);
        return info.isDirectory(); 
    }
    catch(e) {
      console.error("Error couldnt see if dir exists: ", e);
        return false;
    }
}

export async function makeDir(dir) {
    if(!await existsDir(dir)) {
      await mkdir(dir);
    }
}

export async function makeFile(body, title, name, dir) {
  const dirPath = `./${dir}`
  const filePath = `${dirPath}/${name}`;
  const template = fileTemplate(title, body);

  if (existsDir(dirPath)) {
    await writeFile(filePath, template, { flag: 'w+' });
  }
  else {
    console.error("Dir does not exist: ", dir);
  }
}

export function fileTemplate(title, body) {
  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="styles.css" />
        <title>${title}</title>
      </head>
      <body>
        <main>
          ${body}
        </main>
        <script src="script.js"></script>
      </body>
    </html>`;
}