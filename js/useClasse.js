const url="http://localhost:3000"

//classe personne 
export class personne{

    //les attributes
    nom;
    prenom;
    cin;
    tel;
    datenaissance;
    email;
    password;
    role;

    //declaration de constructeur
    constructor (n,p,c,t,dn,e,ps,r)
    {
            this.nom=n;
            this.prenom=p;
            this.cin=c;
            this.tel=t;
            this.datenaissance=dn;
            this.email=e;
            this.password=ps;
            this.role=r;
    }

    //ajour d'un nouvelle personne par apport au role
    ajouterpersonne(){
        let  data={
              nom:this.nom,
              prenom:this.prenom,
              cin:this.cin,
              tel:this.tel,
              email:this.email,
              password:this.password
          }
          if(this.role == "condidat"){
            data={
                nom:this.nom,
                prenom:this.prenom,
                cin:this.cin,
                tel:this.tel,
                datenaissance:this.datenaissance,
                email:this.email,
                password:this.password
            }
        }
        axios.post(`${url}/${this.role}`,data);
    }

    //suppression d'un utilisateur
    supprimerpersonne(id,role){
        axios.delete(`${url}/${role}/${id}`);
    }

    //actualisatuon des info utilisateur
    modifierpersonne(id){
       let  data={
              nom:this.nom,
              prenom:this.prenom,
              cin:this.cin,
              tel:this.tel,
              email:this.email,
              password:this.password
          }
          if(this.role == "condidat"){
            data={
                nom:this.nom,
                prenom:this.prenom,
                cin:this.cin,
                tel:this.tel,
                datenaissance:this.datenaissance,
                email:this.email,
                password:this.password
            }
        }
        axios.put(`${url}/${this.role}/${id}`,data);
    }

    //affichage des utilisateurs
    afficherall(role){
        let aff= axios.get(`${url}/${role}`);
        return aff
    }

    //affichage d'utilisateur pour la modification
    affcherpersone(id,role){
        let aff= axios.get(`${url}/${role}/${id}`);
        return aff
    }
}