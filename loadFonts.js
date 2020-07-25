if("indexedDB" in window && "Worker" in window){
  const fontLoadWorker = new Worker("/webWorker.js");

	fontLoadWorker.onmessage = fontLoadedEvent => {
    ((name = fontLoadedEvent.data.name, url = fontLoadedEvent.data.url) => {
      if(!Array.from(document.fonts).some(e=>{return e.family === name})){
        let newFont = new FontFace(name, `url("${url}")`, {
          style: 'normal', weight: '400'
        })
        newFont.load().then(function() {
          document.fonts.add(newFont);
        });
        console.log(name + " added");
      }
    })()
  }
}