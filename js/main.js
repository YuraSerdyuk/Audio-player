function play0(number) {

    
    var num00 = number.innerText
    var num = num00.substr(0, 1);
    

    //var num = num0 - 1;
    var musics = [
        '',
        'https://d.zaix.ru/8jwN.mp3',
        'https://d.zaix.ru/8jy8.mp3',
        'https://d.zaix.ru/6xKg.mp3'
    ]

    play(num);

    function play(num) {
        /* var audioFileUrl = 'https://s3-us-west-2.amazonaws.com/demo-aud-samp/samples/Cym_Blofeld_1.wav'; */
        var audioFileUrl = musics[num];

        console.log(musics[num]);
        var num = num;
        var context = new (window.AudioContext || window.webkitAudioContext)();

        
        //HTML5 Audio API
        var xhr = new XMLHttpRequest();
        var audioCtx = new AudioContext();
        xhr.open('GET', audioFileUrl);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            context.decodeAudioData(xhr.response, function(audio) {
                var buffer = context. createBufferSource();
                buffer.connect(context.destination);
                buffer.buffer = audio;
                buffer.start(0);
                //buffer.stop(0);
                
                document.getElementById('now').innerHTML = "Now playing: " + num00;

                number.classList.add("hover");

                //TIME OF COMP0SITION
                var Minutes = Math.floor(audio.duration / 60);
                var Seconds = Math.floor(audio.duration % 60)
                if (Seconds < 10) Seconds = '0' + Seconds
                //console.log(Minutes + ":" + Seconds)
                document.getElementById("end_time").innerHTML = Minutes + ":" + Seconds;

                document.getElementById('pos').style.display = 'none';


                
                
                //STOPWATCH
                var timer = 0;
                var hour = 0;
                var minute = 0;
                var second = 0;
                var stopwatch = window.setInterval(function(){
                    ++timer;
                    hour   = Math.floor(timer / 3600);
                    minute = Math.floor((timer - hour * 3600) / 60);
                    second = timer - hour * 3600 - minute * 60;
                    if (hour < 10) hour = '0' + hour;
                    if (minute < 10) minute = '0' + minute;
                    if (second < 10) second = '0' + second;
                    document.getElementById("start_time").innerHTML = minute + ':' + second;
                    if (timer == Math.floor(audio.duration)) {
                        clearInterval(stopwatch);
                        buffer.stop(0);
                    }
                }, 1000);


                document.getElementById('left').addEventListener("click", left);
                function left() {
                    buffer.stop(0);
                    document.getElementById('pos' ).style.display = '';
                    clearInterval(stopwatch);
                    document.getElementById('now').innerHTML = "Now playing: nothing";
                    number.classList.remove("hover");
                    document.getElementById("start_time").innerText = "0:00";
                    document.getElementById("end_time").innerText = "0:00";

                    var num1 = --num;
                    console.log(num1)
                    play(num1);
                }

                document.getElementById('right').addEventListener("click", right);
                function right() {
                    buffer.stop(0);
                    document.getElementById('pos').style.display = '';
                    clearInterval(stopwatch);
                    document.getElementById('now').innerHTML = "Now playing: nothing";
                    number.classList.remove("hover");
                    document.getElementById("start_time").innerText = "0:00";
                    document.getElementById("end_time").innerText = "0:00";

                    var num1 = ++num;
                    console.log(num1)
                    play(num1);
                }


                //STOP BUTTON
                document.getElementById("stop").addEventListener("click", stp);
                function stp() {
                    buffer.stop(0);
                    document.getElementById('pos' ).style.display = '';
                    clearInterval(stopwatch);
                    document.getElementById('now').innerHTML = "Now playing: nothing";
                    number.classList.remove("hover");
                    document.getElementById("start_time").innerText = "0:00";
                    document.getElementById("end_time").innerText = "0:00";
                }


                
                /* window.setInterval(function(){
                    var size = Math.floor(audio.duration);
                    var load = 1286;
                    var sum =load / size;
                    console.log(Math.floor(sum))
                    var res = getComputedStyle(document.getElementById("img_loading"))
                    console.log(res.marginTop)
                    document.getElementById("img_loading").style.marginTop += 'Math.floor(sum)' + 'px';
                }, 1000); */
                

                /* var susresBtn = document.getElementById("stop")
                susresBtn.onclick = function(){
                    buffer.stop(0);
                    console.log(audioCtx.state)
                    if(audioCtx.state === 'running') {
                        console.log()
                        audioCtx.suspend(0)
                    } else if(audioCtx.state === 'suspended') {
                        audioCtx.resume()
                    }
                } */
            });
        };
        xhr.send();
    }
}