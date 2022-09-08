import * as XLSX from 'xlsx'

const SheetJSFT = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm"
].map(x=>`.${x}`).join(",");

export const useCsvUpload = () => {
    const handleFileReader = (file, callback) => {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const workSheetName = wb.SheetNames[0];
            const workSheet = wb.Sheets[workSheetName];
            /* Convert array of arrays */
            const jsonData = XLSX.utils.sheet_to_json(workSheet).map(item => ({
                ...item,
                key: item.__rowNum__,
            }))
            /* Update state */
            callback(jsonData)
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
    }

    return {
        handleFileReader,
        sheetAccepted: SheetJSFT
    }
}
