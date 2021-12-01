import {personne} from './useClasse.js';

    let urll=document.URL;
    let role;

    //recherche role
    function chercherole(){
        if(urll.includes("formateur")==true){
            role="formateur";
        }else if(urll.includes("condidat")==true){
            role="condidat";
        }
        return role
    }

    function showForm(){
        var btn =document.getElementById("addformateur");
        btn.innerHTML=style
    }
    //ajouter personne
    document.querySelector("#ajouterf").addEventListener("click",async()=>{
        //declaration des variables
        let nom=document.getElementById("nom").value;
        let prenom=document.getElementById("prenom").value;
        let cin=document.getElementById("cin").value;
        let tel=document.getElementById("tel").value;
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;

        let persone=new personne();
        let datapersonne= await persone.afficherall(chercherole());
        let personee;
        // console.log(datapersonne);
        let p=0;
    
        datapersonne.data.forEach(element => {
            if(element.cin==cin){
                p=1;
            }
        });
        if(p==1){
            alert("deja existe")
        }else{
            
            if(chercherole()!="condidat"){
                let dn="test";
                personee=new personne(nom,prenom,cin,tel,dn,email,password,chercherole());
                personee.ajouterpersonne();
            }else{
                let datenaissance=document.getElementById("datens").value;
                let age=new Date().getFullYear()-new Date(datenaissance).getFullYear();
                if(age>=18 && age<=35){
                    personee=new personne(nom,prenom,cin,tel,new Date(datenaissance).toLocaleDateString(),email,password,chercherole());
                    personee.ajouterpersonne();
                }else{
                    alert("age entre 18 et 35");
                }
            }
        }
    });

//affichage data
let table=document.getElementById("idtable");
let persone=new personne();
let datapersonne=await persone.afficherall(chercherole());
// document.getElementById("updatef").style.display = "none";


if(chercherole()!="condidat"){
datapersonne.data.forEach(element => {
    table.innerHTML+=`
    <tr>
        <td>`+element.id+`</td>
        <td>`+element.nom+`</td>
        <td>`+element.prenom+`</td>
        <td>`+element.cin+`</td>
        <td>`+element.tel+`</td>
        <td>`+element.email+`</td>
        <td>`+element.password+`</td>
        <td> <button class="supprimer" data-type="${element.id}">supprimer</button>
           <button class="modifier" data-type="${element.id}">modifier</button>
        </td>
    </tr>`
    
});
}else{
    datapersonne.data.forEach(element => {
        table.innerHTML+=`
        <tr>
            <td>`+element.id+`</td>
            <td>`+element.nom+`</td>
            <td>`+element.prenom+`</td>
            <td>`+element.cin+`</td>
            <td>`+element.tel+`</td>
            <td>`+element.datenaissance+`</td>
            <td>`+element.email+`</td>
            <td>`+element.password+`</td>
            <td> <button class="supprimer btn btn-danger text-white" data-type="${element.id}">supprimer</button>
               <button class="modifier btn btn-info text-white" data-type="${element.id}">modifier</button>
            </td>
        </tr>`
    });
}

//supprimer d'un utilisateur
document.querySelectorAll('.supprimer').forEach(Element =>{
    Element.addEventListener('click', async ()=>{
        let id=Element.getAttribute('data-type');
        let role=chercherole();
        let persone=new personne();
        persone.supprimerpersonne(id,role);
    })
});

//get info d'un seul personne
document.querySelectorAll('.modifier').forEach(Element=>{
    // console.log("fff");
    Element.addEventListener('click', async()=>{
        document.getElementById("ajouterf").style.display = "none";

        let id= Element.getAttribute('data-type');
        // console.log('data-type');
        let role = chercherole();
        let persone=new personne();
        let datapersonne=await persone.affcherpersone(id,role);
        console.log(datapersonne);
        if(role !=="condidat"){
            document.getElementById("nom").value= datapersonne.data.nom;
            document.getElementById("prenom").value = datapersonne.data.prenom;
            document.getElementById("cin").value = datapersonne.data.cin;
            document.getElementById("tel").value = datapersonne.data.tel;
            document.getElementById("email").value = datapersonne.data.email;
            document.getElementById("password").value = datapersonne.data.password;
        }
        else{
            document.getElementById("nom").value= Element.nom;
            document.getElementById("prenom").value = Element.prenom;
            document.getElementById("cin").value = Element.cin;
            document.getElementById("tel").value = Element.tel;
            document.getElementById("email").value = Element.email;
            document.getElementById("password").value = Element.password;
        }
    })
});

//modifier des infos d'un personne
document.querySelectorAll('.updatef').forEach(Element =>{
    //Si en clique sur le button modifié
    Element.addEventListener('click', async ()=>{
        let nom=document.getElementById("nom").value;
        let prenom=document.getElementById("prenom").value;
        let cin=document.getElementById("cin").value;
        let tel=document.getElementById("tel").value;
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;

        let persone=new personne();  
        let datapersonne= await persone.afficherall(chercherole());
        let personee;

        //initialisation d'un variable pour la verification de CIN
        let p=0;

        datapersonne.data.forEach(element => {
            //if CIN exist p=1
            if(element.cin==cin){
                p=1;
            }
        });

        //condition pour ne pas modifié les infos si le CIN déjà exist
        if(p==1){
            alert("deja existe")
        }else{
            if(chercherole()!="condidat"){
                let dn="test";
                console.log(chercherole());
                personee=new personne(nom,prenom,cin,tel,dn,email,password,chercherole());
                let id=Element.getAttribute('data-type');
                personee.modifierpersonne(id);
            }else{
                //modification des information de condidat en vérifiant l'age <35
                let datenaissance=document.getElementById("datens").value;
                let age=new Date().getFullYear()-new Date(datenaissance).getFullYear();
                console.log("fffff");
                //if age < 35 modifie
                if(age>=18 && age<=35){
                    personee=new personne(nom,prenom,cin,tel,new Date(datenaissance).toLocaleDateString(),email,password,chercherole());
                    let id=Element.getAttribute('data-type');
                    personee.modifierpersonne(id);
                }
                //sinon message alert 
                else{
                    alert("age entre 18 et 35");
                } 
            }
        }
    });
});

