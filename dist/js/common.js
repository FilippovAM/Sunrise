$(function () {

    $("img, a").on("dragstart", function (event) {
        event.preventDefault();
    });


    // animated title index.html
    $('#title-animated').attr("data-text", function (i, d) {
        var $self = $(this),
            $sentence = d.split("|"),
            tot = $sentence.length,
            c = 0;

        // CREATE SPANS INSIDE SPAN
        for (var i = 0; i < tot; i++) $self.append($('<span/>', {text: $sentence[i]}));

        // COLLECT WORDS AND HIDE
        $sentence = $self.find("span").hide();
        $sentence.stop().fadeIn(250);

        // ANIMATE AND LOOP
        (function loop() {
            //$self.animate({ width: $words.eq( c ).width() });
            $sentence.stop().eq(c).fadeOut(250, function () {
                $sentence.stop().eq(c).fadeIn(250).delay(7000).show(0, loop);
            });
            c = ++c % tot;
        }());

    });


    $('#nav-footer').on('click', 'li', function () {
        $('#nav-footer').find('li').removeClass('active');
        $(this).addClass('active');
    });

    //swiper init(slider)
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        spaceBetween: 30,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 50
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 50
            }
        }
    });

    // datetimepicker bootstrap
    $('#datepicker').datepicker({
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        },
        format: 'mm.dd.yyyy'
    });


    // tooltip bootstrap init
    $('[data-toggle-ttoltip="tooltip"]').tooltip();


    //prettyPhoto init
    $("a[rel^='prettyPhoto']").prettyPhoto();


    $(window).load(function () {

        $(".loader_inner").fadeOut();
        $(".loader").delay(400).fadeOut("slow");

        // map
        var map = L.map('map').setView([1.335713, 103.906385], 17);

        var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        OpenStreetMap_BlackAndWhite.addTo(map);

        L.marker([1.335713, 103.906385]).addTo(map)
            .bindPopup('<b>Head Office<b><br>Sunrise & Co (Pte) Ltd')
            .openPopup();

        map.on('popupopen', function (e) {
            var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
            px.y -= e.popup._container.clientHeight / 2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
            map.panTo(map.unproject(px), {animate: true}); // pan to new center
        });
    });


});



