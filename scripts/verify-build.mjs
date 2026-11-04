import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)])
const routes=walk('src/pages').filter(file=>file.endsWith('.astro')).map(file=>file.replaceAll('\\','/').replace(/^src\/pages\//,'').replace(/\.astro$/,'.html'))
let resources=0
for(const route of routes){
  const file=path.join('dist',route)
  assert.ok(fs.existsSync(file),`Missing built route: ${route}`)
  const html=fs.readFileSync(file,'utf8')
  assert.match(html,/<html\b[^>]*lang="pt-BR"/,`Missing language: ${route}`)
  assert.match(html,/<title>[^<]+<\/title>/,`Missing title: ${route}`)
  assert.match(html,/<link[^>]*rel="canonical"[^>]*href="https:\/\/bibliachimarrao.com.br\//,`Missing canonical: ${route}`)
  for(const match of html.matchAll(/<(?:img|script|link)\b[^>]*?\b(?:src|href)="([^"#]+)"/g)){
    const url=match[1]
    if(!url.startsWith('/')||url.startsWith('//'))continue
    // link tags also include canonical and alternate links, handled above.
    const resource=path.join('dist',decodeURIComponent(url.split(/[?#]/)[0]))
    assert.ok(fs.existsSync(resource),`Missing asset ${url} in ${route}`)
    resources++
  }
}
assert.equal(routes.length,24,'Unexpected public route count; review catalog changes explicitly')
const stamp=fs.readFileSync('dist/carimbo-site.webp')
assert.equal(stamp.toString('ascii',0,4),'RIFF','Stamp must remain a WebP image')
assert.equal(stamp.toString('ascii',8,12),'WEBP')
console.log(`Verified ${routes.length} routes, ${resources} local resource references and WebP endpoint.`)
