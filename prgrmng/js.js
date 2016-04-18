// (c) Copyright 2011 Simone Masiero. Some Rights Reserved.
// This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 License

$(function () {
  $(document).keydown(function (event) {
    Typer.addText(event) // capture keydown; call addText; executed on page load
  })
})

var Typer = {
  text            : null
, accessCountimer : null
, index           : 0    // current cursor position
, speed           : 2
, file            : ''
, accessCount     : 0    // times alt is pressed for Access Granted
, deniedCount     : 0    // times caps is pressed for Access Denied
, init            : function () {
    accessCountimer = setInterval(function () {
      Typer.updLstChr()
    }, 500)             // initialize timer for blinking cursor
    $.get(Typer.file, function (data) {
      Typer.text = data // save the textfile in Typer.text
    })
  }

, content : function () {
    return $('#console').html() // get console content
  }

, write   : function (str) { // append to console content
    $('#console').append(str)
    return false
  }

, addText : function (key) {
    if (key.keyCode == 18) {        // alt key
      Typer.accessCount++
    } else if (key.keyCode == 20) { // caps lock
      Typer.deniedCount++

    } else if (Typer.text) {
      var cont = Typer.content()    // get console content
      if (cont.substring(cont.length - 1, cont.length) == '|') { // if last char is blinking cursor
        $('#console').html($('#console').html().substring(0, cont.length - 1))
      } // remove it before adding the text
      if (key.keyCode != 8) { // if key is not backspace
        Typer.index += Typer.speed // add to the index the speed
      } else {
        if (Typer.index > 0) {
          Typer.index -= Typer.speed
        } //	remove speed for deleting text
      }

      var
        text = $('<div/>').text(Typer.text.substring(0, Typer.index)).html() // stripping html enities
      , rtn  = new RegExp('\n', 'g')  // newline
      , rts  = new RegExp('\\s', 'g') // whitespace
      , rtt  = new RegExp('\\t', 'g') // tab

      // newline to br, tab to 2 space, blank with html blank
      $('#console').html(text.replace(rtn, '<br/>').replace(rtt, '&nbsp;&nbsp;').replace(rts, '&nbsp;'))

      window.scrollBy(0, 50) // scroll to make sure bottom is always visible
    }

    if (key.preventDefault && key.keyCode != 122) { // prevent blocking f11
      key.preventDefault()
    }

    if (key.keyCode != 122) { // prevent other defaults
      key.returnValue = false
    }
  }

, updLstChr: function () {    // blinking cursor
    var cont = this.content()
    if (cont.substring(cont.length - 1, cont.length) == '|') { // if last char is cursor
      $('#console').html($('#console').html().substring(0, cont.length - 1)) // remove it
    } else {
      this.write('|') // write it
    }
  }
}

