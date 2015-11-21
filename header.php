<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<base href="<?php bloginfo( 'template_url' ); ?>/" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
	<link rel="stylesheet" type="text/css" href="dist/css/min/main.min.css">
</head>

<body <?php body_class(); ?>>

	<div class="mainwrap">
		<div class="header">
			<div class="logo_container">
				<h1><img src="dist/images/gulp-ico.png" height="50" width="21" alt="gulp" /><a href="<?php echo site_url(); ?>">Twenty Fifteen With Gulp</a></h1>
			</div>
		</div>

		<nav class="mainnav">
			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'navigation', 'menu' => 'Navigation' ) ); ?>
		</nav>
	