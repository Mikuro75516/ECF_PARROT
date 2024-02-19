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
                transform: $this.index() % 2 === 0 ? 'translateX(-200px) scale(0.8) rotate(-10deg)' : 'translateX(200px) scale(0.8) rotate(10deg)',
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
});
