<!doctype html>
<html>
    <head>
        <title>
            Stickies
        </title>
        <script src="//codeorigin.jquery.com/jquery-2.0.3.min.js" type="text/javascript"></script>
        <script src="//codeorigin.jquery.com/ui/1.10.3/jquery-ui.min.js" type="text/javascript"></script>
        <?php

            if (file_exists('theme.inc')) {
                include 'theme.inc';
            } else {
                ?><link rel="stylesheet" type="text/css" href="style.css" /><?php
            }

        ?>
    </head>
    <body>
 
        <div id="main_canvas">
            <?php

                if (file_exists('cache.txt')) {
                    include 'cache.txt';
                }

            ?>
        </div>
        <p class="instructions">
            double-click to create
        </p>
        <script>

            $(document).ready(function() {

                $('#main_canvas').dblclick(function(e) {
                    create_sticky(e.pageX, e.pageY);
                })

                $('.sticky').draggable({
                    stop: function( event, ui ) {
                        sync();
                    }
                });

            });

            function create_sticky(x,y) {

                ran = Math.floor(Math.random()*4);
                var color = '';
                switch(ran) {
                    case 0: colorclass = 'note1'; break;
                    case 1: colorclass = 'note2'; break;
                    case 2: colorclass = 'note3'; break;
                    case 3: colorclass = 'note4'; break;
                }
                id = "sticky" + Date.now();
                console.log(id);
                $('#main_canvas').append("<div class='sticky "+colorclass+"' id='"+id+"'><div class='delete'><a href='#' onclick='delete_sticky(\""+id.toString()+"\"); return false;'>x</a></div><span style='opacity: 0.3'>...</span><textarea onchange='change_text(this)'></textarea></div>");
                $('#' + id).css('left',x + 'px');
                $('#' + id).css('top',y + 'px');
                $('#' + id).draggable({
                    stop: function( event, ui ) {
                        sync();
                    }
                });
                sync();

            }

            function delete_sticky(id) {
                $('#' + id).fadeOut('slow',function() {
                    sync();
                });
            }

            function change_text(textarea) {
                $(textarea).text($(textarea).val()).html();
                sync();
            }

            function sync() {
                $.post('back.php',$('#main_canvas').html());
            }

        </script>
        
        </div>
    </body>
</html>