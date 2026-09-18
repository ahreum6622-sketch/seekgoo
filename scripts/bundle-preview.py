from pathlib import Path
import base64,json,re
root=Path(__file__).resolve().parents[1]
out=root.parent/'seekgoo-preview.html'
def data(path):
 p=root/path
 mime={'svg':'image/svg+xml','png':'image/png','woff':'font/woff'}[p.suffix[1:]]
 return 'data:'+mime+';base64,'+base64.b64encode(p.read_bytes()).decode()
css=(root/'css/style.css').read_text()
# Resolve every local CSS asset; maintain exact source layout.
css=re.sub(r"url\('../(.*?)'\)",lambda m:'url("'+data(m[1])+'")',css)
js='\n'.join((root/f'js/{x}.js').read_text() for x in ['data','recommendation','storage','rooms','analysis','app'])
js=re.sub(r'^import .*?;\n','',js,flags=re.M);js=re.sub(r'\bexport ','',js)
indices=[0,1,2,3,4,5,6,7,9,11,12,17]
assets={f'assets/plants/ref-{i}.png':data(f'assets/plants/ref-{i}.png') for i in indices}
assets.update({f'assets/plants/new-{i:02}.png':data(f'assets/plants/new-{i:02}.png') for i in range(1,31)})
assets.update({f'assets/rooms/{s}.png':data(f'assets/rooms/{s}.png') for s in ['interiors','outdoors']})
js=js.replace('image:`assets/plants/ref-${r[2]}.png`','image:ASSETS[`assets/plants/ref-${r[2]}.png`]')
js=js.replace("image:`assets/plants/new-${String(i+1).padStart(2,'0')}.png`","image:ASSETS[`assets/plants/new-${String(i+1).padStart(2,'0')}.png`]")
js=js.replace('image:`assets/rooms/${sheet}.png`','image:ASSETS[`assets/rooms/${sheet}.png`]')
for path in ['assets/demo/room.png','assets/plants/ref-4.png','assets/plants/ref-0.png','assets/brand/logo-transparent.png']:
 js=js.replace(path,data(path))
js='const ASSETS='+json.dumps(assets)+';\n'+js
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="css/style.css">','<style>'+css+'</style>').replace('href="assets/brand/icon.svg"','href="'+data('assets/brand/icon.svg')+'"').replace('<script type="module" src="js/app.js"></script>','<script>'+js+'</script>')
licenses='\n'.join(p.read_text() for p in (root/'assets/fonts').glob('*.txt'))
html=html.replace('</head>','<!-- Bundled font notices\n'+licenses.replace('--','—')+'\n--></head>')
out.write_text(html)
print('Standalone frontend:',out.name,out.stat().st_size,'bytes; real analysis requires HTTP server + configured API key.')
