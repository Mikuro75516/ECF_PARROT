// Fonction pour définir la note en cliquant sur une étoile
function setRating(rating) {
    $('.star').removeClass('selected');
    $('.star:lt(' + rating + ')').addClass('selected');
}

// Fonction pour annuler la note
function annulerNote() {
    $('.star').removeClass('selected');
}

// Fonction pour annuler l'avis
function annulerAvis() {
    $('#commentaire').val('');
    $('#login').val('');
    $('.star').removeClass('selected');
}

// Fonction pour publier l'avis
function publierAvis() {
    var note = $('.star.selected').length;
    var commentaire = $('#commentaire').val();
    var login = $('#login').val();
    // Vérification des champs obligatoires
    if (note === 0) {
        alert('Veuillez sélectionner une note.');
        return;
    }
    if (commentaire === '' || login === '') {
        alert('Veuillez saisir votre commentaire et votre login.');
        return;
    }
    // Envoi de l'avis (vous pouvez ajouter ici votre logique d'envoi de données)
    alert('Votre avis a été publié avec succès !');
    // Réinitialisation des champs après publication de l'avis
    annulerAvis();
}
