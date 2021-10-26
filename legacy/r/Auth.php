<?php
session_start();
if (!isset($_SESSION['AccessLevel'])){
	$_SESSION['AccessLevel']=9;
}
if (!isset($_SESSION['UserId'])){
	$_SESSION['UserId']=0;
}
if (!isset($_SESSION['UserName'])){
	$_SESSION['UserName']='Гость';
}
$AccLvl=$_SESSION['AccessLevel'];
$UserId=$_SESSION['UserId'];
$UserName=$_SESSION['UserName'];


?>