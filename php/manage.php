
<?php

$listSort=json_encode($_POST); 
//echo $listSort; 
// Ð´ÈëÎÄ¼þ
//file_put_contents('test.json', $listSort);
$myfile = fopen("../js/photo.json", "w") or die("Unable to open file!");
fwrite($myfile, $listSort); 

?>