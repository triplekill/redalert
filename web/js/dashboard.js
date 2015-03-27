var send = function(){
    var addr = $("#addr option:selected").val();
    var cmd = $("#cmd option:selected").val();
    var del = $('#del').val();
    var bri = $('#bri').val();
    var rgb = $('#rgb').val();
    var tout = $('#tout').val();

    R = hexToR(rgb);
    G = hexToG(rgb);
    B = hexToB(rgb);

    rgb = R+','+G+','+B;
    run(addr,cmd,del,bri,rgb,tout);
}

var run = function(addr, cmd, del, bri, rgb, tout) {
    var getCmd = "../lights/lights_cmd.php?cmd=" + cmd + "&del=" + del + "&bri="
            + bri + "&rgb=" + rgb + "&tout=" + tout+ "&addr=" + addr;
    console.log('sending command');
    $.get(getCmd, function(d){
        console.log(d);
    });
}

var pTimeout = 0;

var party = function(){
   run('00 00 00 00 00 00 FF FF','R','20','30','255,100,0','0');

   $.get('../sounds/sound_cmd.php?name=eyemix.mp3');

   clearTimeout(pTimeout);
   pTimeout = setTimeout(function(){
        run('00 00 00 00 00 00 FF FF','G','800','30','255,100,0','0');

        pTimeout = setTimeout(function(){
            run('00 00 00 00 00 00 FF FF','D','40','30','255,100,0','0');
        },15000);
   },15000);
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}