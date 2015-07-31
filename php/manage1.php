<?php

$listSort=json_encode($_POST); 
//echo $listSort; 
// ะดศ๋ฮฤผþ
//file_put_contents('test.json', $listSort);
$myfile = fopen("../js/detail.json", "w") or die("Unable to open file!");
fwrite($myfile, $listSort); 

?>