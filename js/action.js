import {personne} from './useClasse.js';

    let urll=document.URL;
    let role;


    //recherche role
    function chercherole(){
        if(urll.includes("formateur")){
            role="formateur";
        }else if(urll.includes("condidat")){
            role="condidat";
        }else if(urll.includes("staff")){
            role="staff";
        }else if(urll.includes("apprenant")){
            role="apprenant";
        }else if(urll.includes("auth")){
            role="auth";
        }else if(urll.includes("candidatList")){
            role="listCandidat";
        }else if(urll.includes("login")){
            role="login";
        }
        return role
    }


    function showForm(){
        var btn =document.getElementById("addformateur");
        btn.innerHTML=style
    }
    //ajouter personne

    if(chercherole() == "candidatList" || chercherole() == "staff"  ){
        document.querySelector("#ajouterf").addEventListener("click",async()=>{
            //declaration des variables
            let nom=document.getElementById("nom").value;
            let prenom=document.getElementById("prenom").value;
            let cin=document.getElementById("cin").value;
            let tel=document.getElementById("tel").value;
            let email=document.getElementById("email").value;
            let password=document.getElementById("password").value;
            // console.log(chercherole());
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
    }
    

//affichage data
if(chercherole()!="condidat" && chercherole() !="auth"  && chercherole() != "login"){
    let table=document.getElementById("idtable");
    let persone=new personne();
    let datapersonne=await persone.afficherall(chercherole());    
    
    if(chercherole()!="listCandidat"){
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
            <td> <button class="supprimer  btn btn-danger text-white" data-type="${element.id}">supprimer</button>
               <button class="modifier  btn btn-info  text-white" data-type="${element.id}">modifier</button>
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
        let id= Element.getAttribute('data-type');
        let role = chercherole();
        let persone=new personne();
        let datapersonne=await persone.affcherpersone(id,role);
        if(role !=="condidat"){
            document.getElementById("nom").value= datapersonne.data.nom;
            document.getElementById("prenom").value = datapersonne.data.prenom;
            document.getElementById("cin").value = datapersonne.data.cin;
            document.getElementById("tel").value = datapersonne.data.tel;
            document.getElementById("email").value = datapersonne.data.email;
            document.getElementById("password").value = datapersonne.data.password;
            document.getElementById("id").value =id;
        }
        else{
            document.getElementById("nom").value= Element.nom;
            document.getElementById("prenom").value = Element.prenom;
            document.getElementById("cin").value = Element.cin;
            document.getElementById("tel").value = Element.tel;
            document.getElementById("email").value = Element.email;
            document.getElementById("password").value = Element.password;
            document.getElementById("id").value =id;
        }
    })
});

//modifier des infos d'un personne
document.querySelectorAll('.updatef').forEach(Element =>{
    //Si en clique sur le button modifié
    Element.addEventListener('click', async ()=>{
        // console.log(id);

        let nom=document.getElementById("nom").value;
        let prenom=document.getElementById("prenom").value;
        let cin=document.getElementById("cin").value;
        let tel=document.getElementById("tel").value;
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;

        // let persone=new personne();  
        // let datapersonne= await persone.afficherall(chercherole());
        let personee;

        let role = chercherole();
        //verification de role avant l'ajout
        if(role!="condidat"){
            let dn="test";
            personee=new personne(nom,prenom,cin,tel,dn,email,password,role);
            // let id=Element.getAttribute('data-type');
            let id = document.getElementById("id").value;
            personee.modifierpersonne(id);
        }else{
            //modification des information de condidat en vérifiant l'age <35
            let datenaissance=document.getElementById("datens").value;
            let age=new Date().getFullYear()-new Date(datenaissance).getFullYear();
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
    });
});

console.log(chercherole());

//auth condidat
document.querySelectorAll('#auth').forEach(Element =>{
    let verifdash = 0;
    let verif = 0;
    Element.addEventListener('click', async ()=>{
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        let persone=new personne();
        let dataStaf= await persone.afficherall("staff");
        let dataCandidat= await persone.afficherall("condidat");
       
        let dataFormateur= await persone.afficherall("formateur");
        let dataAdmin= await persone.afficherall("admin");
        let dataApprenant= await persone.afficherall("apprenant");

        if( chercherole()== "login"){
                dataStaf.data.forEach(element => {
                    if(element.email==email && element.password==password){
                        verifdash=1;
                    }
                });

                dataFormateur.data.forEach(element => {
                    if(element.email==email && element.password==password){
                        verifdash=1;
                    }
                });
                dataAdmin.data.forEach(element => {
                    if(element.email==email && element.password==password){
                        verifdash=1;    
                    }
                });
        }
        if(verifdash==1){
            window.location.href = "http://127.0.0.1:5500/";
         }
         else  {
            // window.location.href = "http://127.0.0.1:5500/auth.html";
            alert("ghalat dyal admin") 
            
        }
        
        if( chercherole()== "auth") {
                dataApprenant.data.forEach(element => {
                    if(element.email==email && element.password==password){
                        verif=1;
                    }
                });
                dataCandidat.data.forEach(element => {
                    if(element.email==email && element.password==password){
                        verif=1;
                        // console.log("ana hena")
                    }
                    // console.log(element.email);
                    // console.log(element.password);
                    // console.log(element.id);
                });

        }

        if(verif == 1){
            alert("nta hena")
      
            //  window.location.href = "http://127.0.0.1:5500/home";
         }else{
            alert("les informations son incorrect");
         }
    });
});