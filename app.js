/*!
 *
 * Bancha Project : Combining Ext JS and CakePHP (http://banchaproject.org)
 * Copyright 2011-2012 Roland Schuetz
 *
 * Licensed under GNU GENERAL PUBLIC LICENSE
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha.Touch
 * @copyright     Copyright 2011-2012 Roland Schuetz
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.9.4
 * @license       GNU GENERAL PUBLIC LICENSE
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: false, plusplus: true, white: true, sloppy: true */
/*global Ext, Bancha, window */

//<debug>
Ext.Loader.setPath({
    'Ext': '../../src'
});
//</debug>

/**
 * This is a simple Sencha Touch app, showing how to 
 * retrieve & submit data from CakePHP using Bancha Project.
 */
Ext.application({
    name: 'BanchaTouch',

    icon: 'resources/images/iTunesArtwork.png',
    glossOnIcon: true,
    phoneStartupScreen: 'resources/loading/phone_startup.png',
    tabletStartupScreen: 'resources/loading/tablet_startup.png',

    launch: function() {
        //The whole app UI lives in this tab panel
        Ext.Viewport.add({
            xtype: 'tabpanel',
            fullscreen: false,
            tabBarPosition: 'bottom',
            ui: 'dark',
            
            items: [
                // This is the home page, just some simple html
                {
                    title: 'Home',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<img height="173" src="http://banchaproject.org//tl_files/Bancha/images/logo.png" />',
                        "<p>This little App demonstrates how you can use Bancha with Sencha Touch 2</p>"
                    ].join("")
                },

            ]
        });
    }
});
