<?php
$array1 = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
$array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

$arrays = array_filter(
    $array2,
    function ($element) {
        if ($element % 2 == 0) {
            return 1;
        } else return 0;
    }
);
print_r($arrays);
// echo mktime(0,0,0,10,9,2023);