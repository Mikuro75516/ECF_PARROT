$(document).ready(function() {
    // Optimisation : Utilisation d'une seule fonction pour gérer plusieurs événements sur les liens
    $(".voiture.en.avant a").on('click mouseenter mouseover', function(e) {
        switch(e.type) {
            case 'click':
                e.preventDefault();
                var url = $(this).attr('href');
                window.open(url, '_blank');
                e.stopPropagation();
                break;
            case 'mouseenter':
            case 'mouseover':
                $(this).removeAttr('title');
                e.stopPropagation();
                break;
        }
    });

    function isElementInView(element) {
        var $el = $(element);
        var elementTop = $el.offset().top;
        var elementBottom = elementTop + $el.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function animateElements() {
        $('.col').each(function() {
            var $this = $(this);
            var transformProperties = isElementInView($this) ? {
                transform: 'translateX(0) scale(1) rotate(0deg)',
                opacity: 1
            } : {
                transform: `translateX(${ $this.index() % 2 === 0 ? '-200px' : '200px' }) scale(0.8) rotate(${ $this.index() % 2 === 0 ? '-10deg' : '10deg' })`,
                opacity: 0
            };
            $this.css({
                ...transformProperties,
                transition: 'transform 1.5s ease-out, opacity 1.5s ease-out'
            });
        });
    }

    animateElements();
    $(window).scroll(animateElements);

    // Chargement des détails de la voiture lors du clic sur le lien
    $(".voiture.en.avant a").click(function(e) {
        e.preventDefault(); // Empêcher l'ouverture du lien
        var id_voiture = $(this).data('id_voiture');
        
        // Charger les détails de la voiture en utilisant AJAX
        loadCarDetails(id_voiture, $(this).siblings('.car-details'));
    });

    function loadCarDetails(id_voiture, encart) {
        var url = 'page.php' + (id_voiture ? '?id_voiture=' + id_voiture : '');
        fetch(url)
            .then(response => response.text())
            .then(html => {
                encart.html(html).show(); // Afficher les détails
                encart.addClass('selected'); // Ajouter la classe .selected pour afficher les informations
            })
            .catch(error => {
                console.error('Erreur lors du chargement des détails de la voiture:', error);
            });
    }
});
