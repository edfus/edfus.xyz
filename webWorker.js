const fonts = [
  {
    name: "筑紫A丸ゴシック",
    url: `https://cdn.jsdelivr.net/gh/edfus/storage/fonts/筑紫A丸ゴシック.woff2`,
    unicodeRange: 'U+4E00-9FCB'/*汉字字符集 4E00-9FA5 9FA6-9FCB*/,
    type: "font/woff2"
  },
  {
    name: "Consolas",
    url: `https://cdn.jsdelivr.net/gh/edfus/storage/fonts/Consolas.woff2`,
    unicodeRange: 'U+0000-007F',
    type: "font/woff2"
  }
];

const fontObejectSample = {
  name: "Consolas",
  unicodeRange: 'U+0000-007F',
  type: "font/woff2",
  arrayBuffer: ''
}

// Shared memory and high-resolution timers were effectively disabled at the start of 2018 in light of Spectre.
// In 2020, a new, secure approach has been standardized to re-enable shared memory.

// worker.postMessage(buffer, [buffer]);
// worker.postMessage(obj, [obj.mat2]);
// worker.postMessage(view);
// worker.postMessage(view.buffer, [view.buffer]);
// Average for sending views is 144.12690000608563
// Average for sending ArrayBuffers is 0.3522000042721629
// https://stackoverflow.com/questions/19152772/how-to-pass-large-data-to-web-workers
// https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
// https://mp.weixin.qq.com/s/eTXbqeF8813D5ukGSCV-gg
const openDB = ()=>{
  let request = indexedDB.open('Fonts_Database', 1);
  // omit = 1. unsigned long long
  return new Promise((resolve, reject) => {
    request.onsuccess = event => resolve(event.target.result);
    // onupgradeneeded completed -> onsuccess
    request.onerror = event => reject(Error('woah', event.target.error));
    // request.onblocked = reject(console.error('woah'));
    // This event is triggered when the upgradeneeded should be triggered because of a version change 
    // but the database is still in use (that is, not closed) somewhere
    request.onupgradeneeded = e => {
      // e: IDBVersionChangeEvent e.target/currentTarget: IDBOpenDBRequest
      // keyPath true autoIncrement false
      if(e.oldVersion === 0)
        e.target.result.createObjectStore('fonts', {keyPath: 'name', autoIncrement: false}).createIndex('fontURLindex','url',{unique: true});
        // this method must be called only from a VersionChange transaction mode callback.
    }
  });
}

const blobToArrayBuffer = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      resolve(reader.result);
    });
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
}
const arrayBufferToBlob = (buffer, type) => {
  return new Blob([buffer], {type: type});
}
//https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices
// Storing ArrayBuffers in IndexedDB is very well supported.
// a Blob has a MIME type while an ArrayBuffer does not. 

// Transactions become inactive when control returns to the event loop, 
// and are only active again in callbacks from operations within that transaction.
openDB().then(db => {
  const store = db.transaction("fonts", "readonly").objectStore("fonts");
  fonts.forEach(font => {
    let request = store.get(font.name);
    request.onsuccess = e => {
      let fontData = e.target.result;
      if(fontData !== undefined)
        postMessage({
          name: fontData.name, 
          url: URL.createObjectURL(arrayBufferToBlob(fontData.arrayBuffer, fontData.type)), 
          unicodeRange: fontData.unicodeRange
        });
      else {
        if('connection' in navigator && !navigator.connection.saveData){
          fetch(
            new Request(font.url, 
              { method: 'GET',
                headers: new Headers(),
                mode: 'cors',
                referrer: 'no-referrer',
                redirect: 'follow' 
              })
            ).then(response => {
                  if(response.ok)
                    return response.blob();
                  else console.dir(response)
                })
                //使用blob()从response中读取一个Blob对象
                .then(fontBlob => {
                  //This feature is not available in Service Workers due to its potential to create memory leaks.
                  postMessage({name: font.name, url: URL.createObjectURL(fontBlob), unicodeRange: font.unicodeRange});
                  blobToArrayBuffer(fontBlob).then(arrayBuffer => {
                    const store = db.transaction("fonts", "readwrite").objectStore("fonts");
                    store.add({
                      name: font.name,
                      unicodeRange: font.unicodeRange,
                      type: font.type,
                      arrayBuffer: arrayBuffer
                    });
                    // }, font.name);
                    // The object store uses in-line keys and the key parameter was provided.
                  })
                })
                .catch(error => console.error(error));
        } else {
          console.info("[Metered Network?] Download " + font.name + " cancelled.");
        };
      };
      //URL.revokeObjectURL();
    };
    request.onerror = e => Error(e.error);
  })
})

