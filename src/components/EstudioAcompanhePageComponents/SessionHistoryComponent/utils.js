
export default function FormatStringData(date) {

    if(date === null || date === ""){
        return "";
    }
    var day  = date.split("-")[2];
    var month  = date.split("-")[1];
    //var year  = data.split("-")[0];
  
    return ("0"+day).slice(-2) +  '/' + ("0"+month).slice(-2) ;
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}