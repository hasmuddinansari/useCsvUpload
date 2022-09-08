# useCsvUpload

`use case`

```js

 const { handleFileReader, sheetAccepted } = useCsvDataExtractor()


const handleChange = async () => {
        const [file] = ref.current.files
        if (file) {
            handleFileReader(file, (data)=>{
               setState(data)
            })
        }
    }


return  <input accepted={sheetAccepted} onChange={handleChange}/>


```
