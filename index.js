/**
 * 
 * @param {document} content 
 * @returns 
 */
function updateContent(content) {
    return $.getJSON('./data.json', (data) => {

        Array.from(content.querySelectorAll('.report-model')).forEach(e=>{
            if (e.id !== data.language){
                e.innerHTML = ""
            }
        })
        return new Promise((res, reject) => {
            json = data;
            try {
                let dValues = Array.from(content.querySelectorAll('d-value')).map((el) => {
                    return new Promise((res, reject) => {
                        let id = el.innerHTML.split('.');
                        $(el).replaceWith(id.reduce((obj, prop) => {
                            if (obj[prop]) {
                                return obj[prop];
                            } else {
                                return null;
                            }
                        }, json));
                        res();
                    })
                });
                let scripts = Array.from(content.querySelectorAll('[jshtml]')).map((el) => {
                    return new Promise((res, reject) => {
                        
                        with(data){
                            let ref = $(el)
                            const result = `${eval(ref.attr('jshtml'))}`
                            console.log(result)
                            el.innerHTML = result
                        }
                        res();
                    })
                })
                Promise.all([dValues, scripts]).then(() => res())
            }
            catch (err) {
                reject(err);
            }
        })
    });
}