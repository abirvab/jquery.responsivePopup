
(function ($) {

    $.fn.responsivePopup = function (options) {
        var settings = $.extend({
            action: 'open', popupWidth: 200, popupHeight: 150
        }, options);
        makeCenter = function (event) {
            var windowWidth = window.innerWidth < $(window).width() ? window.innerWidth : $(window).width();
            var windowHeight = window.innerHeight < $(window).height() ? window.innerHeight : $(window).height();

            if (Modernizr.mq('screen and (min-width: ' + mqMedium + ')')) {

                $(event.data.self).width(settings.popupWidth);
                $(event.data.self).height(settings.popupHeight);
                $(event.data.self).css({ top: (windowHeight - settings.popupHeight) / 2, left: (windowWidth - settings.popupWidth) / 2 })

            } else {
                $(event.data.self).width(windowWidth - 40);
                var totalHeight = $(event.data.self).find(".popup-header").height() + $(event.data.self).find(".popup-content").height() + $(event.data.self).find(".popup-footer").height();
                if (totalHeight >= settings.popupHeight) {
                    var contentHeight = settings.popupHeight - ($(event.data.self).find(".popup-header").height() + $(event.data.self).find(".popup-footer").height()) - 40;
                    $(event.data.self).find(".popup-content").css({ overflowY: "auto", height: contentHeight })
                }
                if (settings.popupHeight <= totalHeight + 40) {
                    settings.popupHeight = totalHeight + 40;
                }
                if (settings.popupHeight < windowHeight) {
                    $(event.data.self).height(settings.popupHeight);
                } else {
                    $(event.data.self).height(windowHeight - 40);
                    $(event.data.self).css({ overflow: 'auto' });
                }
                $(event.data.self).css({ top: 20, left: 20 });
            }
        }
        if (settings.action === "open") {

            this.css({ display: "block" });
            makeCenter({ data: { self: $(this).find(".popup-area") } });
            $(window).on("resize", { self: $(this).find(".popup-area") }, makeCenter);
            $(window).css({ overflow: "hidden" });


        }

        if (settings.action === "close") {

            this.css({ display: "none" });
            $(window).off("resize", makeCenter);
            $(window).css({ overflow: "auto" });


        }
        var self = this;
        $(this).find(".close-btn,.mask").click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            self.css({ display: "none" });
            $(window).off("resize", makeCenter);
            $(window).css({ overflow: "auto" });
            return false;
        });

        return this;

    };

}(jQuery));
