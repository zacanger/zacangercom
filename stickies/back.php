<?php

    $contents = file_get_contents("php://input");
    file_put_contents('cache.txt', $contents);