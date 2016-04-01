;(function(){
  edtr = window.edtr || {}
  var updateTimer
    ,	updateDelay = 500
    , frame = document.querySelector('#demo-frame')
  edtr.demoFrameDocument = frame.contentDocument || frame.contentWindow.document
  window.onunload = function(){
    edtr.saveContent(edtr.cm.getValue())
  }
  edtr.saveContent = function(content){
    window.localStorage.edtr = content
  }
  edtr.getLastSavedContent = function(){
    return window.localStorage.edtr || ''
  }
  edtr.setPreviewContent = function(content){
    var self = this
    self.demoFrameDocument.open(content)
    self.demoFrameDocument.write(content)
    self.demoFrameDocument.close()
  }
  edtr.cm = CodeMirror(document.body, {
    lineNumbers        : true
  , mode               : 'htmlmixed'
  , tabSize            : 2
  , undoDepth          : 1000
  , autofocus          : true
  , autoCloseBrackets  : true
  , matchBrackets      : true
  , cursorScrollMargin : 2
  , lineWrapping       : true
  , tabMode            : 'indent'
  , autoCloseTags      : true
  })
  edtr.cm.on('change', function(instance, change){
    clearTimeout(updateTimer)
    updateTimer = setTimeout(function(){
      edtr.setPreviewContent(instance.getValue())
    }, updateDelay)
  })
  function init(){
    var content = edtr.getLastSavedContent()
    if(!content){ // load demo
      var reqListener = function(){
        content = this.responseText
        edtr.cm.setValue(content)
        edtr.cm.refresh()
        edtr.setPreviewContent(content)
      }
      var oReq = new XMLHttpRequest()
      oReq.onload = reqListener
      oReq.open('get', 'demo.html', true)
      oReq.send()
    }
    else { // load saved content
      edtr.setPreviewContent(content)
      edtr.cm.setValue(content)
      edtr.cm.refresh()
    }
  }
  init()
})()

