<?php
defined('ABSPATH') || exit;

/**
 * Plugin Name: Lukkan Hintalaskuri
 * Plugin URI: https://lukkan.fi
 * Description: Lasiterassin ja lasitusten suuntaa-antava hintalaskuri. Upota sivulle lyhytkoodilla [lukkan_hintalaskuri].
 * Version: 1.0.0
 * Author: Lukkan / Aluroll Oy
 * Text Domain: lukkan-hintalaskuri
 */

function lukkan_hintalaskuri_enqueue() {
    $ver = '1.0.0';
    $base = plugin_dir_url(__FILE__);
    wp_enqueue_style(
        'lukkan-hintalaskuri-fonts',
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600&family=Inter:wght@400;500;600&display=swap',
        array(),
        null
    );
    wp_enqueue_style('lukkan-hintalaskuri', $base . 'assets/hintalaskuri.css', array('lukkan-hintalaskuri-fonts'), $ver);
    wp_enqueue_script('lukkan-hintalaskuri', $base . 'assets/hintalaskuri.js', array(), $ver, true);
}

function lukkan_hintalaskuri_maybe_enqueue() {
    if (!is_singular()) {
        return;
    }
    $post = get_post();
    if ($post && has_shortcode($post->post_content, 'lukkan_hintalaskuri')) {
        lukkan_hintalaskuri_enqueue();
    }
}
add_action('wp_enqueue_scripts', 'lukkan_hintalaskuri_maybe_enqueue');

function lukkan_hintalaskuri_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'quote_url'   => 'https://lukkan.fi/yhteystiedot/',
            'dealers_url' => 'https://lukkan.fi/jalleenmyyjat/',
        ),
        $atts,
        'lukkan_hintalaskuri'
    );

    if (!wp_style_is('lukkan-hintalaskuri', 'enqueued')) {
        lukkan_hintalaskuri_enqueue();
    }

    $quote_url = esc_url($atts['quote_url']);
    $dealers_url = esc_url($atts['dealers_url']);
    $logo_url = esc_url(plugin_dir_url(__FILE__) . 'assets/lukkan-logo.svg');

    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/calculator-markup.php';
    return ob_get_clean();
}
add_shortcode('lukkan_hintalaskuri', 'lukkan_hintalaskuri_shortcode');
