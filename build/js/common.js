$(function () {

    $("img, a").on("dragstart", function (event) {
        event.preventDefault();
    });

    $('#nav-footer').on('click', 'li', function () {
        $('#nav-footer').find('li').removeClass('active');
        $(this).addClass('active');
    });

    //swiper init(slider-product)
    var sliderProduct = new Swiper('.swiper-container.slider-product', {
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

    // selectpicker setting
    $('.selectpicker').selectpicker({
        iconBase: 'fa',
        tickIcon: 'fa-check'
    });

    //swiper init(slider-banner)
    var sliderBanner = new Swiper('.swiper-container.slider-banner', {
        slidesPerView: 1,
        spaceBetween: 30,
        paginationClickable: false,
        autoplay: 3000,
        loop: true
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

    // liScroll is a jQuery plugin that transforms any given unordered list into a scrolling News Ticker
    $("ul#ticker").liScroll();

    $(window).load(function () {

        $(".loader_inner").fadeOut();
        $(".loader").delay(400).fadeOut("slow");

    });


    // modal contact-us show event
    $('#modal_contact_us').on('shown.bs.modal', function () {
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
            px.y -= e.popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
            map.panTo(map.unproject(px), {animate: true}); // pan to new center
        });
    });


    $('.link-privacy').on('click', function () {
        $('#modal_register').modal('hide')
            .on('hidden.bs.modal', function () {
                $('#modal_privacy').modal('show');
            });
        $('#modal_terms').modal('hide')
            .on('hidden.bs.modal', function () {
                $('#modal_privacy').modal('show');
            });
    });

});



