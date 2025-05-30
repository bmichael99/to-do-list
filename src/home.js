import "./styles/home.css"

export default function home(){
    const content = document.querySelector(".container");
    content.innerHTML = "";

    const newSection = document.createElement("section")
    newSection.classList.add("home-section");
    newSection.innerHTML = `
    

`;

    content.appendChild(newSection);
}