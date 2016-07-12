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
        autoplay: 3000,
        loop: true,
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
        autoplay: 5000,
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
        $('#modal_register').modal('hide').on('hidden.bs.modal', function () {
            $('#modal_privacy').modal('show');
        });
        $('#modal_terms').modal('hide').on('hidden.bs.modal', function () {
            $('#modal_privacy').modal('show');
        });
    });

    // send ajax register and show thanks-modal
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        PrettyForms.setFormContainer($(this));
        PrettyForms.Validator.validate($(this).find('#inputFirstName'));
        PrettyForms.Validator.validate($(this).find('#inputLastName'));
        PrettyForms.Validator.validate($(this).find('#inputEmail'));
        PrettyForms.Validator.validate($(this).find('#inputModel'));
        PrettyForms.Validator.validate($(this).find('#inputHologram'));

        if ($(this).find('.has-warning').length == 0) {
            var firstName = $('#inputFirstName').val();
            var lastName = $('#inputLastName').val();
            var email = $('#inputEmail').val();
            var country = $('.inputCountry .bfh-selectbox-option').text();
            var telephone = $('#inputTelephone').val();
            var date = $('#date').val();
            var productType = $('#inputProductType').val();
            var model = $('#inputModel').val();
            var hologram = $('#inputHologram').val();
            var serialNumber = $('#inputSerialNumber').val();
            var dealer = $('#inputDealerShopName').val();
            var dealerReceipt = $('#inputDealerReceipt').val();

            $.ajax({
                url: '/register',
                type: 'POST',
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    country: country,
                    telephone: telephone,
                    date: date,
                    productType: productType,
                    model: model,
                    hologram: hologram,
                    serialNumber: serialNumber,
                    dealer: dealer,
                    dealerReceipt: dealerReceipt
                },

                success: function () {
                    $('#modal_register').modal('hide').on('hidden.bs.modal', function () {
                        $('#modal_thank_for_registering').modal('show');
                    });
                },
                // remove later
                error: function () {
                    $('#modal_register').modal('hide').on('hidden.bs.modal', function () {
                        $('#modal_thank_for_registering').modal('show');
                    });
                }
            })
        }
    });

    // datetime
    $('#datetime').text(function () {
        var today = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var day = days[today.getDay()];
        var month = months[today.getMonth()];
        var dd = today.getDate();

        if (dd < 10) {
            dd = '0' + dd
        }

        return day + ', ' + dd + ' ' + month;
    });

    // width for video container
    var mq = window.matchMedia('screen and (min-width: 768px)');
    if (mq.matches) {
        function widthForVideo() {
            $('.green-container-video').width(function () {
                return ($('.video-container').width() - $('.green-container-slider').width());
            });
        }

        $(window).resize(widthForVideo);
        $(window).on('load', widthForVideo);
    } else {
        // the width of browser is less then 768px
        $('.green-container-video').width('100%');
        $('.video-background .green-container-slider').width('100%');
        sliderBanner.update();
        sliderBanner.slideNext();
    }

});




