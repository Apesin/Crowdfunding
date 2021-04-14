<?php

if (isset($_FILES['campaign-banner']['tmp_name'])) {
    if($_FILES['campaign-banner']['type']=="image/png" || $_FILES['campaign-banner']['type']=="image/jpg" || $_FILES['campaign-banner']['type']=="image/jpeg")
    {
        $time = "fundme".time();
        $target = "upload/".$time.basename($_FILES['campaign-banner']['name']);
        $source = "upload/".$time.basename($_FILES['campaign-banner']['name']);
        move_uploaded_file($_FILES['campaign-banner']['tmp_name'], $target);
        echo $target;
         
    }
    else
    {
        echo "error";
    }
}else{
    echo "error";
}

?>