<?php

require "evAnalyze.php";

$analysis = new evAnalysis($_POST[ev-owners]); //this is super bad, and could get an injection attack, but will work for this example

print_r($analysis->evOwners);

?>