$document.ready(function() {
    $(.yc-features).on('mouseenter', 'img', function() {
        $(this).find('p').slideDown();
    });
});
