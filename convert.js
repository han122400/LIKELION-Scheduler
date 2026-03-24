const fs = require('fs');

function htmlToJsx(html) {
  let jsx = html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/viewbox=/gi, 'viewBox=')
    .replace(/<!--[\s\S]*?-->/g, ''); // remove comments

  // auto close void tags
  const voidTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
  voidTags.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
    jsx = jsx.replace(regex, `<${tag}$1 />`);
  });

  // Extract body content
  const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : jsx;

  return bodyContent;
}

['login.html', 'admin.html', 'babylion.html'].forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const jsx = htmlToJsx(html);
  fs.writeFileSync(file.replace('.html', '.jsx'), jsx);
});
