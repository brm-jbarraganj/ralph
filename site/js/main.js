  function NumerosLetras(e) {

    Tecla = (document.all) ? e.keyCode : e.which;

    if (Tecla==8) return true;

    Patron =/^[a-zA-Z0-9 ]*$/;

    LeerTecla = String.fromCharCode(Tecla);

    return Patron.test(LeerTecla);
}
  function NumerosLetrasCaracteres(e) {

    Tecla = (document.all) ? e.keyCode : e.which;

    if (Tecla==8) return true;
    Patron =/^[a-zA-Z0-9!"#$%&/()=?@]*$/;

    LeerTecla = String.fromCharCode(Tecla);

    return Patron.test(LeerTecla);
}
function Letras(e) {

    Tecla = (document.all) ? e.keyCode : e.which;

    if (Tecla==8) return true;

    Patron =/[A-Za-z\s]/;

    LeerTecla = String.fromCharCode(Tecla);

    return Patron.test(LeerTecla);
}

function Numeros(e) {

    Tecla = (document.all) ? e.keyCode : e.which;

    if (Tecla==8) return true;

    Patron =/\d/;

    LeerTecla = String.fromCharCode(Tecla);

    return Patron.test(LeerTecla);
}
function Decimales(e) {

    Tecla = (document.all) ? e.keyCode : e.which;

    if (Tecla==8) return true;

    Patron =/[0-9.]/;

    LeerTecla = String.fromCharCode(Tecla);

    return Patron.test(LeerTecla);
}


function copypaste(){
    jQuery('*').bind("cut copy paste",function(e) { e.preventDefault();});
}

jQuery.fn.reset = function () {
  $(this).each (function() { this.reset(); });
}


jQuery(document).ready(function() {

    jQuery.validator.addMethod('minStrict', function (value, el, param) {
        return value > param;
    });

     jQuery.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

    jQuery.validator.addMethod("notEqualTo", function(v, e, p) {
      return this.optional(e) || v != p;
    }, "Please specify a different value");

    $.fn.hasAttr = function(name) {
       return this.attr(name) !== undefined;
    };

});

function showErrors(contenedor,mensaje){

    jQuery.validator.setDefaults({
        showErrors: function(map, list) {
            jQuery.each(list, function(index, error) {
                if(index==0 && error.element.type!="password"){
                    error.element.focus();
                }
            });
            var focussed = document.activeElement;
            if (focussed && jQuery(focussed).is("input, textarea, select")) {
                mensaje.html('');
            }
            contenedor.hide();
            if (focussed && jQuery(focussed).is("input, textarea, select")) {
                this.currentElements.removeAttr("title").removeClass("error");
            }else{
                jQuery(focussed).removeClass("error");
            }
            $.each(list, function(index, error) {
                if (focussed && jQuery(focussed).is("input, textarea, select")) {
                    jQuery(error.element).attr("title", error.message).addClass("error");
                }else{
                    jQuery(error.element).addClass("error");
                }
            });
            if (focussed && jQuery(focussed).is("input, textarea, select")) {
                if(jQuery(focussed).hasClass('error')){
                        contenedor.show();
                }
                mensaje.html(jQuery(focussed).attr("title"));
            }
        }
    });
}

(function($) {

    $.fn.serializeAnything = function() {

        var toReturn    = [];
        var els         = $(this).find(':input').get();

        $.each(els, function() {
            if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
                var val = $(this).val();
                toReturn.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( val ) );
            }
        });

        return toReturn.join("&").replace(/%20/g, "+");

    }
    $.fn.charactersmax = function(max,top,right) {

        $(this).before( "<span class='characterscont' style='position: absolute;top: "+top+"px;right: "+(right+50)+"px;color: #FFFFFF;width: 40px;height: 20px;z-index: 5;background: #e8584c;border-radius: 6px;display: block;text-align: center;font-size: 17px;'></span>" );
        $(this).before( "<span class='characters' style='position: absolute;top: "+top+"px;right: "+right+"px;color: #FFFFFF;width: 40px;height: 20px;z-index: 5;background: #e8584c;border-radius: 6px;display: block;text-align: center;font-size: 17px;'></span>" );
        $(".characters" ).html(max);
        $(this).keypress(function(e) {
            if (e.which < 0x20) {
                return;
            }
            if (this.value.length < max) {
                $(".characterscont" ).html(this.value.length+1);
            }
            if (this.value.length == max) {
                e.preventDefault();
            } else if (this.value.length > max) {
                this.value = this.value.substring(0, max);
            }
            if ( this.value.length > ( (max*90)/100 ) ) {
                $(this).css("color","#e8584c");
            }else{
                $(this).css("color","");
            }
        });

    }


})(jQuery);
