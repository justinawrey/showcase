import fs from 'fs'

function getHtmlScaffold(name, chunkUri) {
  return `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
			<title>${name}</title>
			<script src="./${chunkUri}" type="module"></script>
	</head>
	<body>
	</body
</html> 
`;
}

function getEntryScaffold(file) {
  return `
import './css/global.css';
import App from './components/${file}';

const app = new App({
	target: document.body,
});

export default app;
`;
}

function writeHtml(outDir, name, chunkUri) {
  if (!fs.existsSync('./public/components')) {
    fs.mkdirSync('./public/components')
  }
  fs.writeFileSync(`${outDir}/${name}.html`, getHtmlScaffold(name, chunkUri))
}

function writeEntryPoint(file) {
  const fullPath = `./src/$__${file.replace('.svelte', '.js')}`;
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, getEntryScaffold(file));
  }
  return fullPath;
}

function reset(outDir) {
  fs.rmdirSync(outDir, { recursive: true });
}

export default function bundleComponents({ inDir = './src/components', outDir = './public/components' } = {}) {
  const files = fs.readdirSync(inDir);
  const componentInfo = [];

  function cleanFiles() {
    for (const info of componentInfo) {
      fs.unlinkSync(info.entryPath);
    }
  }

  return {
    buildStart() {
      reset(outDir);

      for (const file of files) {
        const entryPath = writeEntryPoint(file);
        const ref = this.emitFile({
          type: 'chunk',
          id: entryPath,
          name: file,
        });

        componentInfo.push({
          componentName: file.replace('.svelte', ''),
          chunkId: ref,
          entryPath,
        });
      }
    },

    generateBundle() {
      for (const info of componentInfo) {
        writeHtml(outDir, info.componentName, this.getFileName(info.chunkId));
      }

      process.on('SIGINT', cleanFiles);
    },

    watchChange() {
      process.off('SIGINT', cleanFiles);
    }
  };
}