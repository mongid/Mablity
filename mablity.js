/*
Copyright (c) 2024 MONGID | Software House

All Rights Reserved.

This software code (Mablity) and its accompanying documentation,including any design,architecture,algorithms,or techniques used therein,are protected by copyright law and international treaties. Unauthorized reproduction,distribution,or modification of this software code,or any portion thereof,may result in severe civil and criminal penalties and will be prosecuted to the maximum extent possible under the law.

No part of this software code may be reproduced in any form or by any means without the prior written permission of the copyright holder. This includes,but is not limited to,electronic,mechanical,photocopying,recording,or otherwise,except as may be expressly permitted by applicable law.

The copyright holder reserves the right to modify this copyright notice at any time,without notice,by posting a revised version on their website or within the software code itself.

If you have any questions or concerns regarding the use of this software code,please contact info@mongid.com.
*/

$(function () {
    // Add the plugin
    if(!$('.mablity').length) {
        $('body').append("<div class='mablity'><div class='mablity-tools'><a href='https://mongid.com' target='_blank' class='rights' lang='en'>Made by MONGID | Software House</a></div><div class='mablity-btn'></div><audio id='clickSound'><source src='images/mablity/click.m4a' type='audio/mpeg'></audio></div>");
        
        if($("html").attr("lang") == "ar") {
            $('.mablity-tools').prepend("<span data-mablity='sizeL'>تكبير الخط</span><span data-mablity='sizeS'>تصغير الخط</span><span data-mablity='invert'>عكس الألوان</span><span data-mablity='cursor'>مؤشر كبير</span><span data-mablity='brightness'>الإضاءة</span><span data-mablity='contrast'>التباين</span><span data-mablity='grayscale'>تدرج رمادي</span><span data-mablity='reset'>إعادة تعيين</span>");
        }else{
            $('.mablity-tools').prepend("<span data-mablity='sizeL'>Enlarge font</span><span data-mablity='sizeS'>Reduce font</span><span data-mablity='invert'>Invert colors</span><span data-mablity='cursor'>Big cursor</span><span data-mablity='brightness'>Brightness</span><span data-mablity='contrast'>Contrast</span><span data-mablity='grayscale'>Grayscale</span><span data-mablity='reset'>Reset</span>");
        }
    }

    $(document).click(function(e) {
        if (!$(e.target).closest('.mablity').length) {
            $(".mablity-btn").show(300);
            $(".mablity-tools").hide(300);
        }
    });

    // Prevent hiding when clicking inside the element
    $(document).on('click',".mablity",function(e){
        e.stopPropagation();
    });

    // Mablity button
    $(document).on('click',".mablity-btn",function(e){
        $(this).hide(300);
        $(".mablity-tools").show(300).css("display","flex");

        var audioElement = document.getElementById('clickSound');
        if (audioElement) { audioElement.play(); }
    });

    // Mablity tools
    var clickCount = 0;
    $(document).on('click',".mablity-tools span",function(e){
        var ths   = $(this);
        var mblty = ths.data("mablity");

        // Add active
        if(mblty.slice(0,4)!="size"){
            if(mblty!="cursor"){
                $(".mablity-tools span:not([data-mablity='cursor']):not([data-mablity='"+mblty+"'])").removeClass('active');
            }

            ths.toggleClass('active');
        }
        
        // Play click sound
        var audioElement = document.getElementById('clickSound');
        if (audioElement) { audioElement.play(); }

        switch (mblty) {
        case "sizeL":
            $('*').each(function(){
                var curSize = parseFloat($(this).css('font-size'));
                $(this).css('font-size', (curSize * 1.2) + 'px');
            });
            ths.removeClass('active');
        break;
        case "sizeS":
            $('*').each(function(){
                var curSize = parseFloat($(this).css('font-size'));
                $(this).css('font-size', (curSize * 0.8) + 'px');
            });
            ths.removeClass('active');
        break;
        case "invert":
            if(ths.hasClass('active')===false){
                $("html").css('filter','');
            }else{
                $("html").css('filter','invert(1)');
            } 
        break;
        case "brightness":            
            if(ths.hasClass('active')){
                clickCount++;
                switch (clickCount % 3) {
                    case 1:
                        $('html').css('filter','brightness(150%)');
                    break;
                    case 2:
                        $('html').css('filter','brightness(50%)');
                    break;
                    case 0:
                        $('html').css('filter','');
                        
                    break;
                }
                ths.removeClass('active');
            }
        break;
        case "contrast":
            if(ths.hasClass('active')){
                clickCount++;
                switch (clickCount % 3) {
                    case 1:
                        $('html').css('filter','contrast(150%)');
                    break;
                    case 2:
                        $('html').css('filter','contrast(50%)');
                    break;
                    case 0:
                        $('html').css('filter','');
                        ths.removeClass('active');
                    break;
                }
                ths.removeClass('active');
            }
        break;
        case "grayscale":
            if(ths.hasClass('active')===false){
                $("html").css('filter','');
            }else{
                $("html").css('filter','grayscale(1)');
            }
        break;
        case "cursor":
            if(ths.hasClass('active')===false){
                $("body").css('cursor','');
            }else{
                $("body").css('cursor','url(mablity/cursor.png), default');
            }
        break;
        case "reset":
            $("html").css('filter','');
            $("body").css('cursor','');
            $(".mablity span").removeClass('active');
            $(".mablity-btn").show(300);
            $(".mablity-tools").hide(300);
        break;
        }
    });
});