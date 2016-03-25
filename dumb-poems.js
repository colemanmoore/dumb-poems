var grammar, voice, VOICE_NAME = 'Junior';

window.onload = function() {
  grammar = new RiGrammar();
  grammar.loadFrom('./grammar.yaml', init);
};

function init() {
  window.speechSynthesis.onvoiceschanged = function() {
    var voices = window.speechSynthesis.getVoices();
    voices.forEach(function(v) {
      if (v.name===VOICE_NAME) {
        voice = v;
      }
    });
    generate();
  };
}

function generate() {
  grammar.expand().split('%').forEach(function(line) {
    $('<div>'+line+'</div>').hide().appendTo('#content').fadeIn(500);
    var msg = new SpeechSynthesisUtterance(line);
    msg.voice = voice;
    window.speechSynthesis.speak(msg);
  });
}

function startOver() {
  $('#content').empty();
  generate();
}