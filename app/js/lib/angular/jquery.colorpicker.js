/*
 * INFORMATION
 * ---------------------------
 * Owner:     jquery.webspirited.com
 * Developer: Matthew Hailwood
 * ---------------------------
 *
 * CHANGELOG:
 * ---------------------------
 * 1.1
 * Fixed bug 01
 * Fixed bug 02
 *
 * ---------------------------
 * Bug Fix Credits:
 * --
 * * Number: 01
 * * Bug:  Initial color should be option "selected" from select
 * * Name: Nico <unknown>
 * --
 * * Number: 02
 * * Bug: Selects Change event should be called on color pick
 * * Name: Bob Farrell <unknown>
 * --
 * * Number: 03
 * * Bug: Change in select should update the picker
 * * Name: Tom Lakovic <lakovic@gmail.com>
 */
(function ($) {
    $.fn.extend({
        colorpicker: function (options) {

            //Settings list and the default values
            var defaults = {
                label: '',
                size: 20,
                count: 6,
                hide: true,
                defaultColor: '000000',
                colors: [
                    'ac725e',
                    'd06b64',
                    'f83a22',
                    'fa573c',
                    'ff7537',
                    'ffad46',
                    '42d692',
                    '16a765',
                    '7bd148',
                    'fbe983',
                    'fad165',
                    '92e1c0',
                    '9fc6e7',
                    '4986e7',
                    '9a9cff',
                    'b99aff',
                    'c2c2c2',
                    'cabdbf',
                    'cca6ac',
                    'f691b2',
                    'cd74e6',
                    'a47ae2',
                    '808080',
                    '000000'
                ],
                onSelectColor: null
            };

            var options = $.extend(defaults, options);
            var obj;
            var colors = options.colors;

            var wrap = $('<span class="colorpicker-wrap"></span>');
            var label = $('<span class="colorpicker-label"></span>');
            var trigger = $('<span class="colorpicker-trigger"></span>');
            var picker = $('<div style="width: ' + (options.size + 4) * options.count + 'px" class="colorpicker-picker"></div>');
            var info = $('<div class="colorpicker-picker-info"></div>');
            var clear = $('<div style="clear:both;"></div>');

            return this.each(function () {
                obj = this;
                if (options.label !== '') {
                    create_label();
                }
                create_trigger();
                create_picker();
                wrap.append(label);
                wrap.append(trigger);
                wrap.append(picker);
                wrap.append(clear);
                $(obj).after(wrap);
                if (options.hide) {
                    $(obj).css({
                        position: 'absolute',
                        left: -10000
                    });
                }
            });

            function create_label() {
                label.text(options.label);
                label.click(function () {
                    trigger.click();
                });
            }

            function create_trigger() {
                trigger.click(function () {
                    var offset = $(this).position();
                    var top = offset.top;
                    var left = offset.left + $(this).width() + 5;
                    $(picker).css({
                        'top': top,
                        'left': left
                    }).fadeIn('slow');
                });
            }

            function create_picker() {
                picker.append(info);
                for (var i in colors) {
                    picker.append('<span class="colorpicker-picker-span ' + (colors[i] == $(obj).children(":selected").text() ? ' active' : '') + '" rel="' + colors[i] + '" style="background-color: #' + colors[i] + '; width: ' + options.size + 'px; height: ' + options.size + 'px;"></span>');
                }
                trigger.css('background-color', '#' + $(obj).children(":selected").text());
                info.text('#' + $(obj).children(":selected").text());
                picker.children(".colorpicker-picker-span").hover(function () {
                    info.text('#' + $(this).attr('rel'));
                }, function () {
                    info.text('#' + picker.children('.colorpicker-picker-span.active').attr('rel'));
                });
                picker.delegate(".colorpicker-picker-span", "click", function () {
                    var color = $(this).attr('rel');
                    if (options.onSelectColor) {
                        options.onSelectColor(color);
                    }
                    picker.fadeOut('fast');
                    $(obj).data('color', color);
                    $(obj).change();
                });
                $(obj).change(function () {
                    var val = $(obj).data('color');
                    info.text('#' + val);
                    picker.children('.colorpicker-picker-span.active').removeClass('active');
                    var active = $(picker).find('span.colorpicker-picker-span[rel="' + val + '"]');
                    $(active).addClass('active');
                    trigger.css('background-color', '#' + val);
                });
                $(obj).after(picker);
            }
        }
    });
})(jQuery);