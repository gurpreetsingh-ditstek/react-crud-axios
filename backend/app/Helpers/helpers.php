<?php 

function prepareApiResponse($message, $code, $data = array())
{
    return array("message" => $message, "status" => $code, "data" => $data);
}

?>