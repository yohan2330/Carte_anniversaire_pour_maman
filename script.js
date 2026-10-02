/* ============ À MODIFIER ============ */
var CONFIG = {
  nom: "Messou Adeline",
  date: "Samedi 24 octobre 2026",
  heure: "20 h",
  lieu: "Restaurant Le Tropézien",
  adresse: "Rue Docteur Blanchard, Abidjan, Côte d'Ivoire",   // aide Google Maps à trouver le bon endroit
  dateLimite: "",              // ex : "2026-10-20" (après ce jour, le formulaire se ferme). Laisse vide sinon.
  formspreeId: "xljdyvbd",             // ex : "xyzabcde" (identifiant Formspree, voir explications)
  googleFormUrl: ""            // OU colle ici le lien de ton Google Form : le bouton remplacera le formulaire
};
/* ==================================== */
(function(){
  var $=function(i){return document.getElementById(i)};
  $('who').textContent=CONFIG.nom; $('heroDate').textContent=CONFIG.date+" · "+CONFIG.heure;
  $('dDate').textContent=CONFIG.date; $('dTime').textContent=CONFIG.heure;
  $('dPlace').textContent=CONFIG.lieu; $('dAddr').textContent=CONFIG.adresse;
  $('mapBtn').href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(CONFIG.lieu+" "+CONFIG.adresse);
  document.title="Anniversaire de "+CONFIG.nom;

  var form=$('form');
  if(CONFIG.dateLimite){
    var lim=new Date(CONFIG.dateLimite+"T23:59:59");
    $('deadlineLine').textContent="Merci de répondre avant le "+lim.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
    if(new Date()>lim){form.style.display='none';$('closed').style.display='block';}
  } else { $('deadlineLine').textContent="Dites-nous si vous serez des nôtres."; }

  if(CONFIG.googleFormUrl){
    form.style.display='none'; $('gfWrap').style.display='block'; $('gfBtn').href=CONFIG.googleFormUrl;
  }
  if(CONFIG.formspreeId) form.action="https://formspree.io/f/"+CONFIG.formspreeId;

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!CONFIG.formspreeId){ alert("Mode démonstration : ajoute ton identifiant Formspree dans CONFIG pour recevoir les réponses."); return; }
    var b=$('send'); b.disabled=true; b.textContent="Envoi…";
    fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
      .then(function(r){ if(!r.ok) throw 0; form.style.display='none'; $('thanks').style.display='block'; })
      .catch(function(){ b.disabled=false; b.textContent="Envoyer ma réponse"; alert("L'envoi a échoué, réessayez s'il vous plaît."); });
  });

  // Pétales qui tombent doucement
  var p=$('petals');
  for(var i=0;i<14;i++){
    var s=document.createElement('div'); s.className='petal';
    s.style.left=Math.random()*100+'%'; s.style.animationDuration=(14+Math.random()*12)+'s';
    s.style.animationDelay=(-Math.random()*20)+'s'; s.style.opacity=.3+Math.random()*.4;
    p.appendChild(s);
  }
})();