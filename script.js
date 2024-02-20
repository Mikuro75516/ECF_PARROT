$(document).ready(function() {
    // Gestion du clic sur les chevrons
    $(document).on('click', '.fa-chevron-down, .fa-chevron-up', function() {
        var container = $(this).parent().next('.filtrer-options');
        if (container.length > 0) {
            // Vérifier si le clic a été sur le chevron "UP" pour masquer les informations
            if ($(this).hasClass('fa-chevron-up')) {
                container.removeClass('show');
            } else {
                // Afficher le contenu de la section
                container.addClass('show');
                // Si le clic a eu lieu sur la section "MARQUES" ou "MODELES"
                var section = container.attr('data-section');
                if (section === 'marques' || section === 'modeles') {
                    // Effectuer une requête AJAX pour récupérer les informations depuis la base de données
                    $.ajax({
                        url: 'page.php',
                        method: 'GET',
                        data: {
                            section: section
                        },
                        success: function(response) {
                            container.html(response);
                        },
                        error: function(xhr, status, error) {
                            console.error(error);
                        }
                    });
                }
            }
        }
        // Basculer entre les icônes de chevrons
        $(this).toggleClass('fa-chevron-down fa-chevron-up');
    });

    // Gestion des changements dans la sélection de la marque
    $('#marque-select').change(function() {
        // Fonction pour récupérer et afficher les résultats depuis la base de données
        function afficherResultats() {
            // Effectuer une requête AJAX pour récupérer les résultats depuis la base de données
            $.ajax({
                url: 'page.php',
                method: 'GET',
                data: {
                    anneeMin: $('#annee-min').val(),
                    anneeMax: $('#annee-max').val(),
                    kilometrageMin: $('#kilometrage-min').val(),
                    kilometrageMax: $('#kilometrage-max').val(),
                    prixMin: $('#prix-min').val(),
                    prixMax: $('#prix-max').val()
                },
                success: function(response) {
                    $('#resultats').html(response);
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }

        afficherResultats();
    });

    // Réinitialisation de la recherche
    $('.reinitialiser-btn').click(function() {
        // Réinitialiser les valeurs des champs de filtre
        $('#annee-min, #annee-max, #kilometrage-min, #kilometrage-max, #prix-min, #prix-max').val('');
        // Réinitialiser l'affichage des sections "MARQUES" et "MODELES"
        $('.marques-container, .modele-container').removeClass('show').empty();
        // Rétablir les icônes de chevrons vers le bas
        $('.fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');
    });

    // Validation du filtre
    $('#valider-filtre').click(function() {
        console.log('Filtre validé !');
    });
});
