import {question} from "./useClasse.js";

    //ajouterrepense
let array=[];
    document.querySelector("#plusrepense").addEventListener("click",()=>{

        let div=document.getElementById("divrep");
        div.innerHTML+=`
        <div class="rrr">
            repense: <input type="text" class="form-control" id="repense">

            <select class="form-select" id="status" aria-label="Default select example">
                <option >status de la question</option>
                <option value="true">true</option>
                <option value="false">false</option>
            </select> 
         </div>
          `
    });



//ajouter question
document.querySelector("#ajouterq").addEventListener("click",()=>{

    let type=document.getElementById("type").value;
    let point=document.getElementById("point").value;
    let nom=document.getElementById("nom").value;
    
    // console.log("ana f ajout");
     
    document.querySelectorAll(".rrr").forEach( element => {
        array.push({
          repense:element.querySelector("#repense").value,
          status:element.querySelector("#status").value
        });
    });
    let quest=new question();
    quest=new question(type,point,nom,array);
    quest.ajouterquestion();
});


//afficher data question
document.querySelector("#affiche").addEventListener("click",async()=>{
    let table=document.getElementById("idtable");
    let type=document.getElementById("type").value;
    let quest=new question();
    let dataquestion=await quest.afficherallquestion();

    dataquestion.data.forEach(element => {

        if(element.type==type){
            let re = '';
                element.repenses.forEach(element => {
                    re += `<p>repense:${element.repense} status:${element.status}</p>`;
                });
            table.innerHTML+=`
            <tr>
                <td>${element.id}</td>
                <td>${element.type}</td>
                <td>${element.point}</td>
                <td>${element.nom}</td>
                <td class="x">${re}</td>
            
                <td> 
                    <button class="supprimer btn btn-danger" data-type="${element.id}">supprimer</button>
                    <button class="modifier  btn btn-info"  data-type="${element.id}">modifier</button>
                </td>
            </tr>`;
        }
    });
    DeleteFunction();
    updateFunction();
    ModifieFunction();
});


//supprimer question
const DeleteFunction = () =>{
    document.querySelectorAll('.supprimer').forEach(Element =>{
            Element.addEventListener('click', async ()=>{
                let id=Element.getAttribute('data-type');
                let quest=new question();
                quest.supprimerquestion(id);
            })
        });
}

// modifie une question
const ModifieFunction = () =>{
    document.querySelectorAll('.modifier').forEach(Element =>{
            Element.addEventListener('click', async ()=>{
                let id=Element.getAttribute('data-type');
                let quest=new question();
                let dataquestion=await quest.modifierquestion(id);
                
            })
        });
}

//get info d'un seul personne
// document.querySelectorAll('.supprimer').forEach(Element=>{
//     // console.log("fff");
//     Element.addEventListener('click', async()=>{
//         let id= Element.getAttribute('data-type');
//         let role = chercherole();
//         let persone=new personne();
//         let datapersonne=await persone.affcherpersone(id,role);
//         if(role !=="condidat"){
//             document.getElementById("nom").value= datapersonne.data.nom;
//             document.getElementById("prenom").value = datapersonne.data.prenom;
//             document.getElementById("cin").value = datapersonne.data.cin;
//             document.getElementById("tel").value = datapersonne.data.tel;
//             document.getElementById("email").value = datapersonne.data.email;
//             document.getElementById("password").value = datapersonne.data.password;
//             document.getElementById("id").value =id;
//         }
//         else{
//             document.getElementById("nom").value= Element.nom;
//             document.getElementById("prenom").value = Element.prenom;
//             document.getElementById("cin").value = Element.cin;
//             document.getElementById("tel").value = Element.tel;
//             document.getElementById("email").value = Element.email;
//             document.getElementById("password").value = Element.password;
//             document.getElementById("id").value =id;
//         }
//     })
// });

//modifier question
const updateFunction = () =>{
    document.querySelectorAll('.modifier').forEach(Element =>{
        Element.addEventListener('click', async ()=>{
    
            let type=document.getElementById("type").value;
            let point=document.getElementById("point").value;
            let nom=document.getElementById("nom").value;
             
            let  quest=new question();
             
            document.querySelectorAll(".rrr").forEach(element => {
                array.push({
                  repense:element.querySelector("#repense").value,
                  status:element.querySelector("#status").value
              }
               );
                   let id=Element.getAttribute('data-type');
                    quest=new question(type,point,nom,array);
                    quest.modifierquestion(id);
             
        
             });
        })
    });
}