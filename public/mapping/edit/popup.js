var popup_window = document.createElement("window")

var popup_window_header = document.createElement("header")
var popup_window_header_span = document.createElement("span")
    popup_window_header_span.innerHTML = "<menuicon></menuicon> Place marker"

var popup_window_header_closebutton = document.createElement("closebutton")

var popup_window_content = document.createElement("content")

var popup_window_content_latlng = document.createElement("div")

var popup_window_content_latlng_lat = document.createElement("span")

var popup_window_content_latlng_lng = document.createElement("span")

var popup_window_content_form = document.createElement("form")
    popup_window_content_form.setAttribute("method","post")

var popup_window_content_form_divMain = document.createElement("div")

var popup_window_content_form_select = document.createElement("select")
    popup_window_content_form_select.setAttribute("required", "")
    popup_window_content_form_select.setAttribute("autocomplete", "hidden")
    popup_window_content_form_select.addEventListener("change", (e)=>{
        switch (e.target.value) {
            case "other__veteran":
            case "other__datapod":
            case "other__musicPlace":
                popup_window_content_form_inputSub.style.display = "initial"
                popup_window_content_form_selectSub.style.display = "none"
                break;
            case "other__stellarGrace":
                popup_window_content_form_selectSub.style.display = "initial"
                popup_window_content_form_inputSub.style.display = "none"
                break;
            default:
                popup_window_content_form_selectSub.style.display = "none"
                popup_window_content_form_inputSub.style.display = "none"
                break;
        }
    });

var popup_window_content_form_divSub = document.createElement("div")

var popup_window_content_form_selectSub = document.createElement("select")
    popup_window_content_form_selectSub.setAttribute("autocomplete", "hidden")
    popup_window_content_form_selectSub.style.display = "none"

var popup_window_content_form_inputSub = document.createElement("input")
    popup_window_content_form_inputSub.setAttribute("autocomplete", "hidden")
    popup_window_content_form_inputSub.setAttribute("type", "text")
    popup_window_content_form_inputSub.style.display = "none"

var popup_window_content_form_button = document.createElement("button")
    popup_window_content_form_button.setAttribute("type", "submit")
    popup_window_content_form_button.innerHTML="Place marker"


var latlng_cont = document.createElement("div")


popup_window.appendChild(popup_window_header)
    popup_window_header.appendChild(popup_window_header_span)
    popup_window_header.appendChild(popup_window_header_closebutton)
popup_window.appendChild(popup_window_content)
    popup_window_content.appendChild(popup_window_content_latlng)
        popup_window_content_latlng.appendChild(popup_window_content_latlng_lat)
        popup_window_content_latlng.appendChild(popup_window_content_latlng_lng)
    popup_window_content.appendChild(popup_window_content_form)
        popup_window_content_form.appendChild(popup_window_content_form_divMain)
        popup_window_content_form.appendChild(popup_window_content_form_select)
            for (let i = 0; i < optionsList.length; i++){
                var e = document.createElement("option")
                if (optionsList[i]["hr"] != null){
                    e.setAttribute("disabled","disabled")
                    e.style.fontWeight = "bold"
                    e.innerHTML="---------"
                } else if (optionsList[i]["category"] != null){
                    e.setAttribute("disabled","disabled")
                    e.style.color = "black"
                    e.style.fontWeight = "bold"
                    e.innerHTML=optionsList[i]["category"]
                } else {
                    e.setAttribute("value",optionsList[i]["table"])
                    e.style.color = "gray"
                    e.innerHTML=optionsList[i]["text"]
                }
                popup_window_content_form_select.appendChild(e)
            }
        popup_window_content_form.appendChild(popup_window_content_form_divSub)
        popup_window_content_form.appendChild(popup_window_content_form_selectSub)
            const subList = [
                {"type":"gold","text":"Gold"},
                {"type":"silver","text":"Silver"},
                {"type":"normal","text":"Standard"}
            ]
            for (let i = 0; i < subList.length; i++){
                var e = document.createElement("option")
                    e.setAttribute("value",subList[i]["type"])
                    e.style.color = "gray"
                    e.innerHTML=subList[i]["text"]
                popup_window_content_form_selectSub.appendChild(e)
            }
        popup_window_content_form.appendChild(popup_window_content_form_inputSub)
        popup_window_content_form.appendChild(popup_window_content_form_button)

function openPopup(e) {
    lat_variable = e.latlng.lat
    lng_variable = e.latlng.lng
    L.popup()
        .setLatLng(e.latlng)
        .setContent(popup_window_content_form)
        .openOn(map);
};
map.on('click', openPopup);
popup_window_content_form.addEventListener("submit",(event) => {
    event.preventDefault();
    const markerData = {
        "table": popup_window_content_form_select.value,
        "lat": lat_variable,
        "lng": lng_variable,
        "text": popup_window_content_form_inputSub.value,
        "type": popup_window_content_form_selectSub.value
    }
    const request = new XMLHttpRequest;
    request.open("POST","../../api/record.php");
    request.send(JSON.stringify(markerData));
});