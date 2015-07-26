/**
 * Created by ykz on 2015/7/25.
 */
$(function(){
  var $dragLi = $('.dragLi');
  for(var i = 0 ; i < $dragLi.length ; i++) {
    dnd($dragLi[i]);
  }

  function dnd(list) {
    var original_class = list.className;  // Remember original CSS class
    var entered = 0;                      // Track enters and leaves

    // This handler is invoked when a drag first enters the list. It checks
    // that the drag contains data in a format it can process and, if so,
    // returns false to indicate interest in a drop. In that case, it also
    // highlights the drop target to let the user know of that interest.
    list.ondragenter = function(e) {
      e = e || window.event;  // Standard or IE event
      var from = e.relatedTarget;

      // dragenter and dragleave events bubble, which makes it tricky to
      // know when to highlight or unhighlight the element in a case like
      // this where the <ul> element has <li> children. In browsers that
      // define relatedTarget we can track that.
      // Otherwise, we count enter/leave pairs

      // If we entered from outside the list or if
      // this is the first entrance then we need to do some stuff
      entered++;
      if ((from && !ischild(from, list)) || entered == 1) {

        // All the DnD info is in this dataTransfer object
        var dt = e.dataTransfer;

        // The dt.types object lists the types or formats that the data
        // being dragged is available in. HTML5 says the type has a
        // contains() method. In some browsers it is an array with an
        // indexOf method. In IE8 and before, it simply doesn't exist.
        var types = dt.types;    // What formats data is available in

        // If we don't have any type data or if data is
        // available in plain text format, then highlight the
        // list to let the user know we're listening for drop
        // and return false to let the browser know.
        if (!types ||                                           // IE
          (types.contains && types.contains("text/plain")) || //HTML5
          (types.indexOf && types.indexOf("text/plain")!=-1)) //Webkit
        {
          list.className = original_class + " droppable";
          return false;
        }
        // If we don't recognize the data type, we don't want a drop
        return;   // without canceling
      }
      return false; // If not the first enter, we're still interested
    };

    // This handler is invoked as the mouse moves over the list.
    // We have to define this handler and return false or the drag
    // will be canceled.
    list.ondragover = function(e) { return false; };

    // This handler is invoked when the drag moves out of the list
    // or out of one of its children. If we are actually leaving the list
    // (not just going from one list item to another), then unhighlight it.
    list.ondragleave = function(e) {
      e = e || window.event;
      var to = e.relatedTarget;

      // If we're leaving for something outside the list or if this leave
      // balances out the enters, then unhighlight the list
      entered--;
      if ((to && !ischild(to,list)) || entered <= 0) {
        list.className = original_class;
        entered = 0;
      }
      return false;
    };

    // This handler is invoked when a drop actually happens.
    // We take the dropped text and make it into a new <li> element
    list.ondrop = function(e) {
      e = e || window.event;       // Get the event

      // Get the data that was dropped in plain text format.
      // "Text" is a nickname for "text/plain".
      // IE does not support "text/plain", so we use "Text" here.
      var dt = e.dataTransfer;       // dataTransfer object
      var text = dt.getData("Text"); // Get dropped data as plain text.

      var curElem = e.toElement;
      while(!$(curElem).hasClass('dragLi')){
        curElem = curElem.parentNode;
      }
      // If we got some text, turn it into a new item at list end.

      if (text) {

        var textArr = text.split(",");

        var $new = $('.hidden').clone(true).removeClass('hidden');
        dnd($new[0]);
        $new.find('.imgId').val(textArr[0]).end().find('.imgIndex').val(textArr[1]).end().find('.imgTag').val(textArr[2]).end().find('.imgAddr img').attr('src',textArr[3]).end().find('.imgName').html(textArr[4]).end().insertBefore($(this));

        // Restore the list's original style and reset the entered count
        list.className = original_class;
        entered = 0;

        return false;
      }
    };

    // Make all items that were originally in the list draggable
    /*var items = list.getElementsByTagName("li");
    for(var i = 0; i < items.length; i++)
      items[i].draggable = true;*/

    // And register event handlers for dragging list items.
    // Note that we put these handlers on the list and let events
    // bubble up from the items.

    // This handler is invoked when a drag is initiated within the list.
    list.ondragstart = function(e) {
      var e = e || window.event;
      var target = e.target || e.srcElement;
      // If it bubbled up from something other than a <li>, ignore it
      if (target.tagName !== "LI") return false;
      // Get the all-important dataTransfer object

      var dt = event.dataTransfer;
      var photoInfo='';

      var imgId= $(target).find('.imgId').val();
      var imgIndex= $(target).find('.imgIndex').val();
      var imgTag= $(target).find('.imgTag').val();
      var imgAddr= $(target).find('.imgAddr img').attr('src');
      var imgName= $(target).find('.imgName').html();

      photoInfo = imgId + ',' + imgIndex + ',' + imgTag + ',' + imgAddr + ',' + imgName;

      dt.setData('Text',photoInfo);
      // Tell it we know how to allow copies or moves of the data
      //dt.effectAllowed = "copyMove";
    };

    // This handler is invoked after a successful drop occurs
    list.ondragend = function(e) {
      e = e || window.event;
      var target = e.target || e.srcElement;

      // If the drop was a move, then delete the list item.
      // In IE8, this will be "none" unless you explicitly set it to
      // move in the ondrop handler above.  But forcing it to "move" for
      // IE prevents other browsers from giving the user a choice of a
      // copy or move operation.
      if (e.dataTransfer.dropEffect === "move")
        target.parentNode.removeChild(target);
    };

    // This is the utility function we used in ondragenter and ondragleave.
    // Return true if a is a child of b.
    function ischild(a,b) {
      for(; a; a = a.parentNode) if (a === b) return true;
      return false;
    }
  }

  var uploader = WebUploader.create({

    // 选完文件后，是否自动上传。
    auto: true,

    // swf文件路径
    swf: './js/Uploader.swf',

    // 文件接收服务端，把需要上传的的服务器地址替换成需要的就可以了
    server: 'http://webuploader.duapp.com/server/fileupload.php',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#filePicker',

    // 只允许选择图片文件。
    accept: {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/*'
    }
  });
  uploader.on( 'fileQueued', function( file ) {
    var $li = $(
        '<div id="' + file.id + '" class="file-item thumbnail">' +
        '<img>' +
        '<div class="info">' + file.name + '</div>' +
        '</div>'
      ),
      $img = $li.find('img');


    // $list为容器jQuery实例
    $('#fileList').append( $li );

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb( file, function( error, src ) {
      if ( error ) {
        $img.replaceWith('<span>不能预览</span>');
        return;
      }

      $img.attr( 'src', src );
    }, 100, 100 );
  });
  // 文件上传过程中创建进度条实时显示。
  uploader.on( 'uploadProgress', function( file, percentage ) {
    var $li = $( '#'+file.id ),
      $percent = $li.find('.progress span');

    // 避免重复创建
    if ( !$percent.length ) {
      $percent = $('<p class="progress"><span></span></p>')
        .appendTo( $li )
        .find('span');
    }

    $percent.css( 'width', percentage * 100 + '%' );
  });

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
  uploader.on( 'uploadSuccess', function( file ) {
    $( '#'+file.id ).addClass('upload-state-done');
  });

// 文件上传失败，显示上传出错。
  uploader.on( 'uploadError', function( file ) {
    var $li = $( '#'+file.id ),
      $error = $li.find('div.error');

    // 避免重复创建
    if ( !$error.length ) {
      $error = $('<div class="error"></div>').appendTo( $li );
    }

    $error.text('上传失败');
  });

// 完成上传完了，成功或者失败，先删除进度条。
  uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress').remove();
  });
});